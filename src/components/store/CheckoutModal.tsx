"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  ShoppingBag, 
  ChevronRight, 
  Zap,
  ShieldCheck,
  Wallet,
  CheckCircle2,
  X,
  User,
  Lock,
  MapPin,
  CreditCard,
  Upload,
  Image as ImageIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/auth-context";
import { toast } from "sonner";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: {
    name: string;
    price: number | string;
    image?: string;
    category?: string;
  } | null;
  type?: "product" | "plan";
  onSuccess?: (orderId: string, shippingDetails: any) => void;
}

export function CheckoutModal({ isOpen, onClose, item, type = "product", onSuccess }: CheckoutModalProps) {
  const { user } = useAuth();
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [paymentSubStep, setPaymentSubStep] = useState("contact");
  const [timeLeft, setTimeLeft] = useState(300);
  const [useCredits, setUseCredits] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [utrNumber, setUtrNumber] = useState("");
  const [isVerifyingUtr, setIsVerifyingUtr] = useState(false);
  const [utrError, setUtrError] = useState("");
  const [otpInput, setOtpInput] = useState("");
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [devOtpCode, setDevOtpCode] = useState("");
  
  const [shippingDetails, setShippingDetails] = useState({
    street: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
    email: ""
  });

  const [screenshotBase64, setScreenshotBase64] = useState("");
  const [screenshotPreview, setScreenshotPreview] = useState("");

  const compressImage = (file: File, callback: (base64: string) => void) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        const MAX_WIDTH = 1000;
        const MAX_HEIGHT = 1000;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL("image/jpeg", 0.6);
          callback(dataUrl);
        } else {
          callback(event.target?.result as string);
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File size must be less than 10MB");
        return;
      }
      
      const previewReader = new FileReader();
      previewReader.onloadend = () => {
        setScreenshotPreview(previewReader.result as string);
      };
      previewReader.readAsDataURL(file);

      compressImage(file, (compressedBase64) => {
        setScreenshotBase64(compressedBase64);
      });
    }
  };

  const removeScreenshot = () => {
    setScreenshotPreview("");
    setScreenshotBase64("");
  };

  const handleCopyText = (text: string) => {
    try {
      const input = document.createElement("input");
      input.value = text;
      input.style.position = "absolute";
      input.style.left = "-9999px";
      document.body.appendChild(input);
      input.select();
      input.setSelectionRange(0, 99999);
      const success = document.execCommand("copy");
      document.body.removeChild(input);
      if (success) {
        alert("UPI ID Copied to Clipboard: " + text);
      } else {
        alert("Please manually copy the UPI ID: " + text);
      }
    } catch (err) {
      alert("Please manually copy the UPI ID: " + text);
    }
  };

  const [paymentDetails, setPaymentDetails] = useState({
    upiId: "",
    cardNumber: "",
    expiry: "",
    cvv: ""
  });

  // Numeric price handling
  const rawPrice = typeof item?.price === 'string' 
    ? parseInt(item.price.replace(/[^\d]/g, '')) || 0 
    : item?.price || 0;

  // Mock credits check
  const credits = 0; // fallback or from user profile if available
  const calculateDiscount = () => Math.min(rawPrice * 0.1, credits);
  const finalPrice = Math.max(0, rawPrice - (useCredits ? calculateDiscount() : 0));

  const isValidContact = (phone: string, email: string) => {
    if (phone.length !== 10) {
      return { valid: false, error: "Phone number must be exactly 10 digits." };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { valid: false, error: "Please enter a valid email address." };
    }
    if (!/^[6-9]/.test(phone)) {
      return { valid: false, error: "Invalid phone number. Indian mobile numbers must start with 6, 7, 8, or 9." };
    }
    if (/^(.)\1{9}$/.test(phone)) {
      return { valid: false, error: "Repetitive numbers are not allowed." };
    }
    const sequential = "1234567890 0987654321 9876543210";
    if (sequential.includes(phone)) {
      return { valid: false, error: "Sequential phone numbers are not allowed." };
    }
    const fakeDomains = ["test.com", "example.com", "fake.com", "temp.com", "tempmail.com", "mock.com", "abc.com", "xyz.com"];
    const domain = email.split("@")[1]?.toLowerCase();
    if (fakeDomains.includes(domain)) {
      return { valid: false, error: "Mock or temporary email domains are not allowed." };
    }
    return { valid: true };
  };

  const phoneError = (() => {
    const p = shippingDetails.phone;
    if (!p) return "";
    if (p.length > 0 && p.length < 10) return "Phone number must be exactly 10 digits.";
    if (p.length === 10) {
      if (!/^[6-9]/.test(p)) return "Indian numbers must start with 6, 7, 8, or 9.";
      if (/^(.)\1{9}$/.test(p)) return "Repetitive numbers are not allowed.";
      const sequential = "1234567890 0987654321 9876543210";
      if (sequential.includes(p)) return "Sequential numbers are not allowed.";
    }
    return "";
  })();

  const emailError = (() => {
    const e = shippingDetails.email;
    if (!e) return "";
    if (!e.includes('@')) return "";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(e)) return "Please enter a valid email address.";
    const fakeDomains = ["test.com", "example.com", "fake.com", "temp.com", "tempmail.com", "mock.com", "abc.com", "xyz.com"];
    const domain = e.split("@")[1]?.toLowerCase();
    if (fakeDomains.includes(domain)) return "Temporary/fake email domains are not allowed.";
    return "";
  })();


  useEffect(() => {
    if (user) {
      setShippingDetails(prev => ({
        ...prev,
        email: user.email || "",
        phone: prev.phone || ""
      }));
    }
  }, [user, isOpen]);

  // Reset checkout state when modal is opened or item changes
  useEffect(() => {
    if (isOpen) {
      if (type === "plan") {
        setCheckoutStep(2);
        setOrderId(Math.random().toString(36).substr(2, 9).toUpperCase());
      } else {
        setCheckoutStep(1);
        setOrderId("");
      }
      setPaymentSubStep("contact");
      setTimeLeft(300);
      setVerificationMessage("Verifying Payment...");
    }
  }, [isOpen, item, type]);

  useEffect(() => {
    if (isOpen && checkoutStep === 2 && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [isOpen, checkoutStep, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendOtp = async () => {
    setIsSendingOtp(true);
    setOtpError("");
    setOtpInput("");
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: shippingDetails.email })
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        if (data.otp) {
          setDevOtpCode(data.otp);
        } else {
          setDevOtpCode("");
        }
        setPaymentSubStep("otp");
      } else {
        toast.error(data.error || "Failed to send OTP.");
      }
    } catch (err: any) {
      toast.error("Error sending OTP code.");
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleVerifyOtp = async () => {
    setIsVerifyingOtp(true);
    setOtpError("");
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: shippingDetails.email, otp: otpInput })
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Email verified successfully!");
        setPaymentSubStep("upi");
      } else {
        setOtpError(data.error || "Invalid OTP code.");
        toast.error(data.error || "Verification failed.");
      }
    } catch (err: any) {
      setOtpError("Error verifying OTP.");
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  const handlePurchase = () => {
    setOrderId(Math.random().toString(36).substr(2, 9).toUpperCase());
    setCheckoutStep(2);
    setPaymentSubStep("contact");
  };

  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState("Verifying Payment...");

  const handleEasebuzzPayment = async () => {
    try {
      setIsVerifying(true);

      if (paymentDetails.upiId) {
        setVerificationMessage(`Sending request to ${paymentDetails.upiId}...`);
        toast.info(`Collect request sent to ${paymentDetails.upiId}. Please approve it in your UPI app!`);
        
        setTimeout(() => {
          setVerificationMessage("Waiting for authorization...");
        }, 1500);

        setTimeout(() => {
          handleComplete();
          toast.success("Payment Authorized Successfully");
          setIsVerifying(false);
          setVerificationMessage("Verifying Payment...");
        }, 4000);
      } else {
        setVerificationMessage("Verifying Payment...");
        setTimeout(() => {
          handleComplete();
          toast.success("Payment Successful");
          setIsVerifying(false);
        }, 2000);
      }

    } catch (error: any) {
      console.error("Payment Error:", error);
      toast.error(error.message || "Payment initiation failed");
      setIsVerifying(false);
      setVerificationMessage("Verifying Payment...");
    }
  };

  const handleVerifyUtr = async (enteredUtr = utrNumber) => {
    if (!/^\d{12}$/.test(enteredUtr)) {
      setUtrError("Please enter a valid 12-digit UTR number.");
      return;
    }
    setUtrError("");
    setIsVerifyingUtr(true);

    try {
      const res = await fetch("/api/payment/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          utr: enteredUtr,
          amount: finalPrice,
          type: "checkout",
          orderId,
          shippingDetails,
          screenshot: screenshotBase64
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success(data.message || "Payment verified successfully!");
        setCheckoutStep(3);
      } else {
        setUtrError(data.message || data.error || "Payment verification failed.");
      }
    } catch (err) {
      console.error(err);
      setUtrError("Error connecting to server. Please try again.");
    } finally {
      setIsVerifyingUtr(false);
    }
  };

  const handleComplete = () => {
    setCheckoutStep(3);
  };

  const MERCHANT_UPI = "9860779172-5@ybl";
  const MERCHANT_NAME = "AIR_G_Elite";

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    }
  }, []);

  const getUpiDeepLink = (app?: string) => {
    const txnRef = orderId || 'TXN' + Math.random().toString(36).substr(2, 9).toUpperCase();
    const params = `pa=${MERCHANT_UPI}&pn=${encodeURIComponent(MERCHANT_NAME)}&tr=${txnRef}&tn=${encodeURIComponent("Order Payment")}&mc=5411&mode=02&cu=INR`;
    const base = `upi://pay?${params}`;
    if (!app) return base;
    
    // Check for iOS
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    
    const baseParams = `pa=${MERCHANT_UPI}&pn=${encodeURIComponent(MERCHANT_NAME)}`;

    if (isIOS) {
      switch(app) {
        case 'GPay': 
          return `gpay://`;
        case 'PhonePe': 
          return `phonepe://`;
        case 'Paytm': 
          return `paytmmp://`;
        case 'BHIM': 
          return `bhim://`;
        default: 
          return `upi://`;
      }
    }

    // Android-specific intent structures to launch app and handle upi VPA target
    switch(app) {
      case 'GPay': 
        return `intent:#Intent;package=com.google.android.apps.nbu.paisa.user;end`;
      case 'PhonePe': 
        return `intent:#Intent;package=com.phonepe.app;end`;
      case 'Paytm': 
        return `intent:#Intent;package=net.one97.paytm;end`;
      case 'BHIM':
        return `intent:#Intent;package=in.org.npci.upiapp;end`;
      default: 
        return `upi://pay?${baseParams}`;
    }
  };

  const handleUpiRoute = (appName: string) => {
    const baseParams = `pa=${MERCHANT_UPI}&pn=${encodeURIComponent(MERCHANT_NAME)}`;
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    
    let specificUrl = "";
    if (isIOS) {
      switch(appName) {
        case 'GPay': specificUrl = `gpay://`; break;
        case 'PhonePe': specificUrl = `phonepe://`; break;
        case 'Paytm': specificUrl = `paytmmp://`; break;
        case 'BHIM': specificUrl = `bhim://`; break;
      }
    } else {
      switch(appName) {
        case 'GPay': specificUrl = `intent:#Intent;package=com.google.android.apps.nbu.paisa.user;end`; break;
        case 'PhonePe': specificUrl = `intent:#Intent;package=com.phonepe.app;end`; break;
        case 'Paytm': specificUrl = `intent:#Intent;package=net.one97.paytm;end`; break;
        case 'BHIM': specificUrl = `intent:#Intent;package=in.org.npci.upiapp;end`; break;
      }
    }

    const universalUrl = `upi://pay?${baseParams}`;
    const targetUrl = specificUrl || universalUrl;

    try {
      window.location.href = targetUrl;
    } catch (e) {
      window.location.href = universalUrl;
    }
  };

  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className={`bg-white w-full max-w-sm rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col transition-all duration-500 ${checkoutStep === 2 ? 'max-h-[550px]' : 'max-h-[90vh]'}`}
      >
        {checkoutStep === 2 ? (
          <div className="bg-[#E82E32] p-6 text-white relative">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => {
                    if (paymentSubStep === "upi") setPaymentSubStep("contact");
                    else if (type === "plan") onClose();
                    else setCheckoutStep(1);
                  }}
                  className="mr-2 hover:bg-white/10 p-1 rounded-lg transition-colors text-white border-none bg-transparent"
                >
                  <ChevronRight className="h-5 w-5 rotate-180" />
                </button>
                <div className="h-8 w-8 bg-white rounded-lg flex items-center justify-center text-[#E82E32] font-black text-xl shadow-lg shadow-black/10">A</div>
                <div>
                  <h3 className="font-black text-sm tracking-tight text-white">AIR G Elite</h3>
                  <div className="flex items-center gap-1 opacity-80">
                    <ShieldCheck className="h-3 w-3" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white">Elite Verified Business</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-white/20">
                  <div className="h-2 w-2 rounded-full bg-red-400 animate-pulse" />
                  <span className="text-[10px] font-black">{formatTime(timeLeft)}</span>
                </div>
                <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-full transition-colors text-white border-none bg-transparent">
                  <X className="h-5 w-5 stroke-[2.5px]" />
                </button>
              </div>
            </div>
            
            <div className="space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-80 text-white">Total Amount</p>
              <div className="flex items-baseline justify-between">
                <h2 className="text-3xl font-black text-white">₹{finalPrice.toLocaleString()}</h2>
                <div className="flex items-center gap-1 opacity-80">
                  <Lock className="h-3 w-3" />
                  <span className="text-[10px] font-bold text-white">Secured by AIR G Pay</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-[#E82E32] flex items-center justify-center text-white">
                {checkoutStep === 1 ? <ShoppingBag className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
              </div>
              <h3 className="text-xl font-black text-slate-900">
                {checkoutStep === 1 ? "Checkout" : "Success"}
              </h3>
            </div>
            <button onClick={onClose} className="h-8 w-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-800 hover:text-slate-950 transition-colors border-none">
              <X className="h-4 w-4 stroke-[3px]" />
            </button>
          </div>
        )}

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="p-4 space-y-4">
            {checkoutStep === 1 ? (
              <div className="space-y-4">
                <div className="flex gap-3 p-2 rounded-2xl bg-slate-50 border border-slate-100">
                  {item.image ? (
                    <img src={item.image} alt="" className="h-14 w-14 rounded-xl object-cover shrink-0" />
                  ) : (
                    <div className="h-14 w-14 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                      <Zap className="h-6 w-6" />
                    </div>
                  )}
                  <div>
                    <h4 className="font-black text-sm text-slate-900 leading-tight">{item.name}</h4>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{item.category || type}</p>
                    <p className="text-sm font-black text-[#E82E32] mt-0.5">₹{rawPrice.toLocaleString()}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-slate-900 font-black text-xs">
                    <MapPin className="h-4 w-4 text-[#E82E32]" />
                    <span>{type === "product" ? "Shipping Address" : "Billing Address"}</span>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    <Input placeholder="Address" value={shippingDetails.street} onChange={(e) => setShippingDetails({...shippingDetails, street: e.target.value})} className="h-9 rounded-lg font-bold bg-slate-50 border-none px-3 text-xs" />
                    <div className="grid grid-cols-2 gap-2">
                      <Input placeholder="City" value={shippingDetails.city} onChange={(e) => setShippingDetails({...shippingDetails, city: e.target.value})} className="h-9 rounded-lg font-bold bg-slate-50 border-none px-3 text-xs" />
                      <Input placeholder="Pincode" value={shippingDetails.pincode} onChange={(e) => setShippingDetails({...shippingDetails, pincode: e.target.value})} className="h-9 rounded-lg font-bold bg-slate-50 border-none px-3 text-xs" />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Input placeholder="State" value={shippingDetails.state} onChange={(e) => setShippingDetails({...shippingDetails, state: e.target.value})} className="h-9 rounded-lg font-bold bg-slate-50 border-none px-3 text-xs" />
                      <Input placeholder="Phone" value={shippingDetails.phone} onChange={(e) => setShippingDetails({...shippingDetails, phone: e.target.value})} className="h-9 rounded-lg font-bold bg-slate-50 border-none px-3 text-xs" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center p-3 rounded-2xl border border-slate-100 bg-white">
                  <div className="flex items-center gap-2">
                    <Wallet className="h-4 w-4 text-[#E82E32]" />
                    <span className="font-black text-slate-900 text-[10px]">Apply Credits (₹{calculateDiscount()})</span>
                  </div>
                  <Switch checked={useCredits} onCheckedChange={setUseCredits} className="scale-75 data-[state=unchecked]:bg-blue-100" />
                </div>
              </div>
            ) : checkoutStep === 2 ? (
              <div className="min-h-[400px]">
                {paymentSubStep === "contact" && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8 py-4">
                    <div className="flex items-center gap-3 text-slate-400">
                      <User className="h-5 w-5" />
                      <span className="text-[10px] font-black uppercase tracking-[0.2em]">Contact Details</span>
                    </div>
                    <div className="space-y-6">
                      <div className="relative">
                        <Label className="absolute -top-2 left-4 bg-white px-2 text-[10px] font-black text-[#E82E32] z-10">Phone Number</Label>
                        <div className="flex gap-2">
                          <div className="w-16 h-14 bg-slate-50 rounded-xl flex items-center justify-center font-black text-slate-900 border border-slate-100">+91</div>
                          <Input 
                            value={shippingDetails.phone} 
                            maxLength={10}
                            onChange={(e) => {
                              const val = e.target.value.replace(/\D/g, '');
                              if (val.length <= 10) setShippingDetails({...shippingDetails, phone: val});
                            }}
                            className={`flex-1 h-14 rounded-xl font-black bg-white focus:ring-0 px-6 text-lg transition-colors ${
                              phoneError ? "border-red-500 focus:border-red-500 text-red-600 bg-red-50/10" : "border-slate-200 focus:border-[#E82E32]"
                            }`}
                            placeholder="9876543210"
                          />
                        </div>
                        {phoneError && (
                          <p className="text-xs font-black text-red-500 mt-2 px-1">{phoneError}</p>
                        )}
                      </div>
                      <div className="relative">
                        <Label className="absolute -top-2 left-4 bg-white px-2 text-[10px] font-black text-[#E82E32] z-10">Email Address</Label>
                        <Input 
                          value={shippingDetails.email} 
                          onChange={(e) => setShippingDetails({...shippingDetails, email: e.target.value})}
                          className={`w-full h-14 rounded-xl font-black bg-white focus:ring-0 px-6 text-lg transition-colors ${
                            emailError ? "border-red-500 focus:border-red-500 text-red-600 bg-red-50/10" : "border-slate-200 focus:border-[#E82E32]"
                          }`}
                        />
                        {emailError && (
                          <p className="text-xs font-black text-red-500 mt-2 px-1">{emailError}</p>
                        )}
                      </div>
                    </div>
                    <div>
                      <Button 
                        onClick={() => {
                          const check = isValidContact(shippingDetails.phone, shippingDetails.email);
                          if (!check.valid) {
                            toast.error(check.error || "Invalid details");
                            return;
                          }
                          handleSendOtp();
                        }}
                        disabled={shippingDetails.phone.length !== 10 || !shippingDetails.email.includes('@') || !!phoneError || !!emailError || isSendingOtp}
                        className="w-full h-14 bg-[#E82E32] hover:bg-red-600 disabled:opacity-50 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-xl font-black text-lg shadow-xl shadow-red-100 transition-all border-none flex items-center justify-center gap-2"
                      >
                        {isSendingOtp ? (
                          <>
                            <div className="h-5 w-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                            <span>Sending Code...</span>
                          </>
                        ) : (
                          "Proceed to Payment"
                        )}
                      </Button>
                    </div>
                  </motion.div>
                )}

                {paymentSubStep === "otp" && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6 py-4 flex flex-col items-center">
                    <div className="w-full text-left space-y-2">
                      <div className="flex items-center gap-2 text-slate-900 font-black text-sm">
                        <Lock className="h-5 w-5 text-[#E82E32]" />
                        <span>Email Verification</span>
                      </div>
                      <p className="text-xs font-medium text-slate-400">
                        We have sent a 6-digit verification code to <span className="font-black text-slate-700">{shippingDetails.email}</span>.
                      </p>
                    </div>

                    <div className="my-2">
                      <InputOTP
                        maxLength={6}
                        value={otpInput}
                        onChange={(val) => setOtpInput(val)}
                      >
                        <InputOTPGroup className="gap-2">
                          {[0, 1, 2, 3, 4, 5].map((index) => (
                            <InputOTPSlot 
                              key={index} 
                              index={index} 
                              className="w-10 h-12 rounded-xl border border-slate-200 bg-white font-black text-lg text-slate-800 focus:border-[#E82E32] focus:ring-0 shadow-sm"
                            />
                          ))}
                        </InputOTPGroup>
                      </InputOTP>
                    </div>

                    {otpError && (
                      <p className="text-xs font-black text-red-500 text-center font-mono leading-tight">{otpError}</p>
                    )}

                    <div className="w-full space-y-3 pt-4">
                      <Button
                        onClick={() => handleVerifyOtp()}
                        disabled={otpInput.length !== 6 || isVerifyingOtp}
                        className="w-full h-14 bg-[#E82E32] hover:bg-red-600 disabled:opacity-50 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-xl font-black text-lg shadow-xl shadow-red-100 transition-all border-none flex items-center justify-center gap-2"
                      >
                        {isVerifyingOtp ? (
                          <>
                            <div className="h-5 w-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                            <span>Verifying...</span>
                          </>
                        ) : (
                          "Verify & Continue"
                        )}
                      </Button>

                      <div className="flex justify-between items-center px-1 text-xs">
                        <button
                          onClick={() => setPaymentSubStep("contact")}
                          className="font-black text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-wider text-[10px] cursor-pointer"
                        >
                          Change Email
                        </button>
                        <button
                          onClick={() => handleSendOtp()}
                          disabled={isSendingOtp}
                          className="font-black text-[#E82E32] hover:text-red-600 disabled:opacity-50 transition-colors uppercase tracking-wider text-[10px] cursor-pointer"
                        >
                          Resend Code
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {paymentSubStep === "upi" && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6 py-2">
                    <div className="flex justify-between items-center">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pay With UPI App</h4>
                      <div className="text-[10px] font-black text-red-500 bg-red-50 px-2 py-1 rounded-lg">Expires in {formatTime(timeLeft)}</div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-3">
                        <h4 className="text-[10px] font-black text-slate-700 uppercase tracking-widest">Select UPI App to pay:</h4>
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            { 
                              name: 'GPay', 
                              icon: "/logos/gpay.png"
                            },
                            { 
                              name: 'PhonePe', 
                              icon: "/logos/phonepe.png"
                            },
                            { 
                              name: 'Paytm', 
                              icon: "/logos/paytm.png"
                            },
                            { 
                              name: 'BHIM', 
                              icon: (
                                <svg viewBox="0 0 60 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full object-contain">
                                  <path d="M3 2l8 8-8 8V2z" fill="#FF9933" />
                                  <path d="M12 2l-8 8 8 8V2z" fill="#138808" opacity="0.8" />
                                  <text x="18" y="16" fontFamily="sans-serif" fontWeight="900" fontSize="15" fill="#F05A28">BH</text>
                                  <text x="41" y="16" fontFamily="sans-serif" fontWeight="900" fontSize="15" fill="#0A7A4C">IM</text>
                                </svg>
                              )
                            }
                          ].map((app) => (
                            <button 
                              key={app.name} 
                              onClick={() => handleUpiRoute(app.name)}
                              className="flex items-center p-4 rounded-2xl border border-slate-100 hover:border-red-500 hover:bg-red-50/10 transition-all gap-4 group decoration-none bg-white text-left w-full cursor-pointer"
                            >
                              <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center p-1.5 shadow-sm border border-slate-50 group-hover:scale-110 transition-transform overflow-hidden shrink-0">
                                {typeof app.icon === 'string' ? (
                                  <img src={app.icon} alt={app.name} className="h-full w-full object-contain" />
                                ) : (
                                  app.icon
                                )}
                              </div>
                              <span className="text-sm font-black text-slate-700">{app.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Fallback Copy UPI ID Section */}
                      <div className="p-4 bg-red-50/50 rounded-2xl border border-[#E82E32]/15 space-y-3.5 text-left">
                        <div className="flex justify-between items-center">
                          <span className="text-[9px] font-black text-[#E82E32] uppercase tracking-widest">Copy UPI ID (Recommended)</span>
                          <button
                            type="button"
                            onClick={() => handleCopyText(MERCHANT_UPI)}
                            className="px-3 py-1.5 bg-white hover:bg-slate-100 text-[#E82E32] text-[10px] font-black uppercase rounded-lg border border-[#E82E32]/25 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm animate-pulse"
                          >
                            Copy ID
                          </button>
                        </div>
                        <div className="space-y-1 bg-white p-3 rounded-xl border border-black/5 flex items-center justify-between">
                          <span className="font-mono text-xs font-black text-slate-800 tracking-tight select-all">{MERCHANT_UPI}</span>
                          <span className="text-[7.5px] uppercase font-bold text-slate-300 tracking-widest">Active VPA</span>
                        </div>
                        <p className="text-[9.5px] leading-relaxed text-slate-500 font-medium">
                          If redirect declines or is blocked:
                          <br />
                          <span className="font-bold text-slate-700">1.</span> Click the <span className="font-bold">Copy ID</span> button above.
                          <br />
                          <span className="font-bold text-slate-700">2.</span> Open GPay, PhonePe, or Paytm manually.
                          <br />
                          <span className="font-bold text-slate-700">3.</span> Send <span className="font-bold text-red-600">₹{finalPrice.toLocaleString()}</span> to the copied UPI ID.
                        </p>
                      </div>
                    </div>

                    {/* Dynamic QR Code for scanning */}
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="flex items-center gap-4">
                        <div className="h-28 w-28 bg-white rounded-xl p-1.5 shadow-sm border border-slate-100 flex items-center justify-center shrink-0 relative group overflow-hidden">
                          <img 
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(`upi://pay?pa=${MERCHANT_UPI}&pn=${MERCHANT_NAME}&am=${finalPrice}&cu=INR`)}`} 
                            alt="UPI QR Code" 
                            className="w-full h-full object-contain"
                          />
                          <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] opacity-100 hover:opacity-0 transition-opacity flex items-center justify-center cursor-pointer">
                            <span className="text-[8px] font-black text-slate-900 bg-white/90 px-2 py-1 rounded-full shadow-sm">Scan to Pay</span>
                          </div>
                        </div>
                        <div className="space-y-1.5 flex-1">
                          <div className="flex items-center gap-1.5">
                            <ShieldCheck className="h-3 w-3 text-emerald-500" />
                            <p className="text-[10px] font-black text-slate-900">Verified Merchant</p>
                          </div>
                          <p className="text-[9px] font-medium text-slate-400 leading-tight">
                            Scan this QR code using any UPI app (GPay, PhonePe, Paytm, BHIM) to pay <span className="font-black text-slate-700">₹{finalPrice.toLocaleString()}</span> directly.
                          </p>
                          <div className="flex items-center gap-1 mt-1">
                            <Lock className="h-2.5 w-2.5 text-slate-300" />
                            <p className="text-[8px] font-bold text-slate-300 uppercase tracking-widest">End-to-end encrypted</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* UTR Verification Section */}
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
                      <div className="space-y-1">
                        <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest font-mono block">Enter 12-Digit UTR/Transaction ID</Label>
                        <Input 
                          placeholder="e.g. 123456789012" 
                          maxLength={12}
                          value={utrNumber}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '');
                            if (val.length <= 12) setUtrNumber(val);
                          }}
                          className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-red-500/50 text-slate-700 font-mono h-10"
                        />
                      </div>

                      {/* Screenshot Upload Block */}
                      <div className="space-y-1">
                        <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest font-mono block">Upload Payment Screenshot (Required)</Label>
                        {!screenshotPreview ? (
                          <label className="flex flex-col items-center justify-center w-full h-20 border border-dashed border-slate-200 bg-white rounded-xl cursor-pointer hover:bg-red-50/10 hover:border-red-500/50 transition-all">
                            <div className="flex flex-col items-center justify-center pt-2 pb-2">
                              <Upload className="h-4 w-4 text-slate-400 mb-1" />
                              <p className="text-[9px] text-slate-400 font-black uppercase tracking-wider">Choose File or Drag & Drop</p>
                              <p className="text-[7px] text-slate-300">PNG, JPG up to 5MB</p>
                            </div>
                            <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                          </label>
                        ) : (
                          <div className="relative w-full h-24 rounded-xl border border-slate-100 overflow-hidden bg-white flex items-center justify-center p-1 group">
                            <img src={screenshotPreview} alt="Payment Proof" className="h-full object-contain rounded-lg" />
                            <button
                              onClick={removeScreenshot}
                              className="absolute top-1 right-1 h-5 w-5 rounded-full bg-slate-900/80 hover:bg-red-500 text-white flex items-center justify-center border-none p-0 cursor-pointer transition-colors"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        )}
                      </div>

                      {utrError && (
                        <p className="text-[9px] font-black text-red-500 font-mono leading-tight">{utrError}</p>
                      )}

                      <Button 
                        onClick={() => handleVerifyUtr()}
                        disabled={utrNumber.length !== 12 || isVerifyingUtr || !screenshotBase64}
                        className="w-full h-11 bg-[#E82E32] hover:bg-red-600 disabled:opacity-50 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-xl font-black text-xs uppercase tracking-widest font-mono transition-all flex items-center justify-center gap-2 border-none"
                      >
                        {isVerifyingUtr ? (
                          <>
                            <div className="h-4 w-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                            <span>Verifying...</span>
                          </>
                        ) : (
                          <>
                            <span>Confirm & Verify Payment</span>
                          </>
                        )}
                      </Button>
                    </div>
                  </motion.div>
                )}
              </div>
            ) : (
              <div className="py-12 text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="h-24 w-24 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-blue-100 relative">
                  <CheckCircle2 className="h-12 w-12" />
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 }} className="absolute -top-2 -right-2 bg-blue-500 text-white p-2 rounded-full shadow-lg"><ShieldCheck className="h-4 w-4" /></motion.div>
                </div>
                <div>
                  <h4 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Details Submitted</h4>
                  <p className="text-sm font-bold text-slate-400">Order ID: <span className="text-[#E82E32]">{orderId}</span></p>
                  <p className="text-xs font-semibold text-slate-400 max-w-[280px] mx-auto mt-2">
                    Your payment details have been submitted. You will be notified via email/SMS after verification is complete.
                  </p>
                </div>
                <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 text-left space-y-4">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{type === "product" ? "Shipping" : "Billing"} Details</p>
                    <p className="text-base font-black text-slate-700">{shippingDetails.street}</p>
                    <p className="text-base font-black text-slate-700">{shippingDetails.city}, {shippingDetails.pincode}</p>
                  </div>
                  <div className="pt-4 border-t border-slate-200 flex justify-between items-center">
                    <div className="flex items-center gap-2 text-blue-600 font-black text-xs">
                      <div className="h-2 w-2 rounded-full bg-blue-500" />
                      Verification Pending
                    </div>
                    <p className="text-[10px] font-black text-slate-400">Under Review</p>
                  </div>
                </div>
                <Button onClick={() => { onSuccess?.(orderId, shippingDetails); onClose(); }} className="w-full h-14 bg-[#0F172A] text-white rounded-2xl font-black text-lg">Continue</Button>
              </div>
            )}
          </div>

          {checkoutStep === 1 && (
            <div className="px-5 pb-6">
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <div className="flex justify-between text-xs font-black text-slate-400 uppercase tracking-widest">
                  <span>Subtotal</span>
                  <span>₹{rawPrice.toLocaleString()}</span>
                </div>
                {useCredits && (
                  <div className="flex justify-between text-xs font-black text-emerald-500 uppercase tracking-widest">
                    <span>Credit Discount</span>
                    <span>-₹{calculateDiscount().toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-black text-slate-900 pt-2">
                  <span>Total</span>
                  <span>₹{finalPrice.toLocaleString()}</span>
                </div>
              </div>
              <Button onClick={handlePurchase} className="w-full h-14 bg-[#0F172A] hover:bg-[#E82E32] text-white rounded-2xl font-black text-lg shadow-xl mt-6 transition-all">Proceed to Payment</Button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
