/**
 * Google Apps Script to automatically generate the AI Instructor Application Form in Google Drive.
 * 
 * HOW TO USE:
 * 1. Go to https://script.google.com
 * 2. Click "New Project"
 * 3. Delete any code in the editor and paste this script.
 * 4. Click the "Save" icon (or Ctrl+S) and name the project (e.g. "Create AI Instructor Form").
 * 5. Click the "Run" button at the top toolbar.
 * 6. Grant the necessary permissions when prompted.
 * 7. View the Execution Log below the editor to get the direct links to view and edit your new form!
 */

function createAIInstructorForm() {
  // Create a new Form
  var form = FormApp.create('AI Instructor Application Form');
  
  // Set Title and Description
  form.setTitle('AI Instructor Application Form');
  form.setDescription('Please fill out this form to apply for the AI Instructor position at AIR G.');
  
  // Configure basic form settings
  form.setAllowResponseEdits(false);
  form.setLimitOneResponsePerEmail(true);
  form.setCollectEmail(true); // Automatically collect email address if preferred, but we also add a field.

  console.log('Creating form fields...');

  // 1. Full Name
  form.addTextItem()
      .setTitle('Full Name')
      .setRequired(true);

  // 2. Email Address
  form.addTextItem()
      .setTitle('Email Address')
      .setRequired(true);

  // 3. Mobile Number
  form.addTextItem()
      .setTitle('Mobile Number')
      .setRequired(true);

  // 4. Current City
  form.addTextItem()
      .setTitle('Current City')
      .setRequired(true);

  // 5. Highest Qualification
  form.addTextItem()
      .setTitle('Highest Qualification')
      .setRequired(true);

  // 6. Do you have experience teaching AI, ML, Data Science, or Programming?
  form.addMultipleChoiceItem()
      .setTitle('Do you have experience teaching AI, ML, Data Science, or Programming?')
      .setChoiceValues(['Yes', 'No'])
      .setRequired(true);

  // 7. Briefly describe your teaching or technical experience.
  form.addParagraphTextItem()
      .setTitle('Briefly describe your teaching or technical experience.')
      .setRequired(false);

  // 8. Which AI-related topics can you teach?
  form.addCheckboxItem()
      .setTitle('Which AI-related topics can you teach?')
      .setChoiceValues([
        'Generative AI',
        'Prompt Engineering',
        'Machine Learning',
        'Deep Learning',
        'Data Science',
        'Python Programming',
        'Computer Vision',
        'NLP',
        'Other'
      ])
      .setRequired(true);

  // 9. Rate your AI knowledge.
  form.addScaleItem()
      .setTitle('Rate your AI knowledge.')
      .setBounds(1, 5)
      .setLabels('Beginner', 'Expert')
      .setRequired(true);

  // 10. Are you available for:
  form.addCheckboxItem()
      .setTitle('Are you available for:')
      .setChoiceValues(['Weekdays', 'Weekends', 'Both'])
      .setRequired(true);

  // 11. Expected Salary/Stipend
  form.addTextItem()
      .setTitle('Expected Salary/Stipend')
      .setRequired(true);

  // 12. Why would you like to become an AI Instructor?
  form.addParagraphTextItem()
      .setTitle('Why would you like to become an AI Instructor?')
      .setRequired(true);

  // 13. Declaration
  form.addCheckboxItem()
      .setTitle('Declaration')
      .setChoiceValues(['I confirm that the information provided is correct.'])
      .setRequired(true);

  // Get URLs
  var publishedUrl = form.getPublishedUrl();
  var editUrl = form.getEditUrl();

  console.log('========================================================================');
  console.log('SUCCESS! Your Google Form has been created.');
  console.log('------------------------------------------------------------------------');
  console.log('1. Link to FILL OUT the form (Send to applicants):');
  console.log(publishedUrl);
  console.log('------------------------------------------------------------------------');
  console.log('2. Link to EDIT/VIEW responses (For your admin use):');
  console.log(editUrl);
  console.log('========================================================================');
}
