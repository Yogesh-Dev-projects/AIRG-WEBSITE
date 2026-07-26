/**
 * Google Apps Script to log payments, upload screenshots to Google Drive, 
 * and handle verification status changes.
 */

// CONFIGURATION: Set your website's deployed Vercel URL and the shared verification token.
var WEBSITE_URL = "https://airg-website-delta.vercel.app"; // Change this to your live website URL
var VERIFY_SECRET = "aig_sheet_verify_secret_2026_key"; // Must match PAYMENT_VERIFY_SECRET in your website's environment variables (.env)

function doPost(e) {
  try {
    var jsonString = e.postData.contents;
    var data = JSON.parse(jsonString);
    
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Create headers if they don't exist yet
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp", 
        "Order ID / Type", 
        "Customer Name", 
        "Email", 
        "Phone Number", 
        "Amount (INR)", 
        "UTR / Ref Number", 
        "Screenshot URL",
        "Verification Status"
      ]);
      sheet.getRange(1, 1, 1, 9).setFontWeight("bold").setBackground("#e82e32").setFontColor("#ffffff");
    }
    
    var timestamp = new Date();
    var orderTypeLabel = data.orderId ? data.orderId : "Wallet Recharge";
    var customerName = data.customerName || "N/A";
    var email = data.email || "N/A";
    var phone = data.phone || "N/A";
    var amount = data.amount || 0;
    var utr = data.utr || "N/A";
    var screenshotUrl = "";
    
    // If screenshot contains Base64 image data, upload it to Google Drive
    if (data.screenshot && data.screenshot.indexOf("data:") === 0) {
      try {
        var parts = data.screenshot.split(",");
        var meta = parts[0]; // e.g. "data:image/png;base64"
        var base64Data = parts[1];
        
        var contentType = meta.split(":")[1].split(";")[0];
        var extension = contentType.split("/")[1] || "png";
        
        var decoded = Utilities.base64Decode(base64Data);
        var blob = Utilities.newBlob(decoded, contentType, (data.orderId || "payment") + "_" + utr + "." + extension);
        
        // Save to your Google Drive root folder (or you can create a specific folder)
        var file = DriveApp.createFile(blob);
        
        // Enable sharing so anyone with link can view the receipt screenshot
        file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
        screenshotUrl = file.getUrl();
      } catch (uploadError) {
        screenshotUrl = "Upload Error: " + uploadError.toString();
      }
    } else {
      screenshotUrl = data.screenshot || "";
    }
    
    // Add the payment row with default "Pending" verification status
    sheet.appendRow([
      timestamp,
      orderTypeLabel,
      customerName,
      email,
      phone,
      amount,
      utr,
      screenshotUrl,
      "Pending"
    ]);
    
    // Set up dropdown list for the status cell
    var lastRow = sheet.getLastRow();
    var statusCell = sheet.getRange(lastRow, 9);
    var rule = SpreadsheetApp.newDataValidation()
      .requireValueInList(["Pending", "Verified", "Rejected"], true)
      .setAllowInvalid(false)
      .build();
    statusCell.setDataValidation(rule);
    
    return ContentService.createTextOutput(JSON.stringify({ success: true, message: "Logged to sheet and uploaded successfully" }))
                         .setMimeType(ContentService.MimeType.JSON);
                         
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
                         .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handle edits in the Google Sheet.
 * (Needs to be set up as an Installable Edit Trigger to allow UrlFetchApp network requests)
 */
function handleSheetEdit(e) {
  var range = e.range;
  var sheet = range.getSheet();
  
  // Make sure we are on the first sheet and editing column 9 (Verification Status)
  if (range.getColumn() === 9 && range.getRow() > 1) {
    var row = range.getRow();
    var statusValue = range.getValue();
    
    // Get Order ID / Type (Column 2) and Amount (Column 6)
    var orderId = sheet.getRange(row, 2).getValue().toString();
    var amount = sheet.getRange(row, 6).getValue();
    
    // Call our website backend API to update database and credit the balance
    var apiUrl = WEBSITE_URL + "/api/payment/admin-verify";
    
    var payload = {
      orderId: orderId,
      status: statusValue,
      secret: VERIFY_SECRET
    };
    
    var options = {
      method: "post",
      contentType: "application/json",
      payload: JSON.stringify(payload),
      muteHttpExceptions: true
    };
    
    try {
      var response = UrlFetchApp.fetch(apiUrl, options);
      var responseText = response.getContentText();
      Logger.log("API Response: " + responseText);
      
      // Visually color-code the cell based on the status
      if (statusValue === "Verified") {
        range.setBackground("#d4edda").setFontColor("#155724"); // Green background, dark green text
      } else if (statusValue === "Rejected") {
        range.setBackground("#f8d7da").setFontColor("#721c24"); // Red background, dark red text
      } else {
        range.setBackground("#fff3cd").setFontColor("#856404"); // Yellow background, dark yellow text
      }
      
    } catch (apiError) {
      Logger.log("Failed to notify website API: " + apiError.toString());
      // Revert the edit or alert the editor
      SpreadsheetApp.getUi().alert("Error: Failed to notify website. Check sheet script logs. Detail: " + apiError.toString());
    }
  }
}
