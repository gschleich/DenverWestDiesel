/**
 * Google Apps Script for Denver West Diesel Quote Form
 * 
 * SETUP INSTRUCTIONS:
 * 
 * 1. Create a new Google Sheet:
 *    - Go to https://sheets.google.com
 *    - Create a new spreadsheet
 *    - Name it "Denver West Diesel Quotes" (or any name you prefer)
 * 
 * 2. Set up the header row in your Google Sheet (Row 1):
 *    - Column A: Timestamp
 *    - Column B: First Name
 *    - Column C: Last Name
 *    - Column D: Phone
 *    - Column E: Email
 *    - Column F: Make
 *    - Column G: Model
 *    - Column H: Year
 *    - Column I: VIN
 *    - Column J: Engine Serial Number
 *    - Column K: Problem Description
 *    - Column L: Other Information
 * 
 * 3. Create the Google Apps Script:
 *    - In your Google Sheet, go to Extensions > Apps Script
 *    - Delete any default code
 *    - Copy and paste this entire file into the Apps Script editor
 *    - Save the project (Ctrl+S or Cmd+S)
 *    - Name it "Quote Form Handler" (or any name you prefer)
 * 
 * 4. Deploy as a Web App:
 *    - Click "Deploy" > "New deployment"
 *    - Click the gear icon (⚙️) next to "Select type" and choose "Web app"
 *    - Set the following:
 *      * Description: "Quote Form Handler"
 *      * Execute as: "Me"
 *      * Who has access: "Anyone" (this allows your website to submit data)
 *    - Click "Deploy"
 *    - Copy the Web App URL that appears
 * 
 * 5. Update your website:
 *    - Open script.js in your project
 *    - Find the line: const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';
 *    - Replace 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE' with the Web App URL you copied
 *    - Save the file
 * 
 * 6. Test the form:
 *    - Submit a test quote from your website
 *    - Check your Google Sheet to see if the data appears
 * 
 * NOTE: The first time you deploy, Google may ask you to authorize the script.
 * Click "Authorize access" and follow the prompts. You'll need to authorize
 * email sending permissions as well.
 * 
 * 7. Email Notifications:
 *    - By default, emails are sent to denverwestdiesel@gmail.com
 *    - To customize the recipient, edit the sendEmailNotification function
 *    - Look for the NOTIFICATION_EMAIL variable and modify as needed
 *    - You can send to multiple recipients by separating emails with commas
 */

/**
 * Format date to Mountain Standard Time
 * Format: "Monday, November 17, 2025, 5:32 PM"
 */
function formatMountainTime(dateString) {
  try {
    const date = new Date(dateString);
    // Convert to Mountain Time (America/Denver timezone)
    const mountainTime = Utilities.formatDate(date, "America/Denver", "EEEE, MMMM d, yyyy, h:mm a");
    return mountainTime;
  } catch (error) {
    // Fallback to current time in Mountain Time if parsing fails
    const now = new Date();
    return Utilities.formatDate(now, "America/Denver", "EEEE, MMMM d, yyyy, h:mm a");
  }
}

/**
 * Format phone number to XXX-XXX-XXXX
 * Handles various input formats (with/without dashes, parentheses, spaces, etc.)
 */
function formatPhoneNumber(phone) {
  if (!phone || phone.trim() === '') {
    return 'N/A';
  }
  
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '');
  
  // If we have 10 digits, format as XXX-XXX-XXXX
  if (digits.length === 10) {
    return digits.substring(0, 3) + '-' + digits.substring(3, 6) + '-' + digits.substring(6);
  }
  
  // If we have 11 digits and starts with 1, format as 1-XXX-XXX-XXXX
  if (digits.length === 11 && digits[0] === '1') {
    return '1-' + digits.substring(1, 4) + '-' + digits.substring(4, 7) + '-' + digits.substring(7);
  }
  
  // If it doesn't match expected format, return as-is (or could return N/A)
  return phone;
}

/**
 * Helper function to return "N/A" for empty optional fields
 */
function getValueOrNA(value) {
  if (!value || value.trim() === '') {
    return 'N/A';
  }
  return value;
}

/**
 * Send email notification when a new quote is submitted
 * 
 * TO CUSTOMIZE THE RECIPIENT EMAIL:
 * Edit the NOTIFICATION_EMAIL variable below with your email address
 * You can use multiple emails separated by commas: 'email1@example.com, email2@example.com'
 */
function sendEmailNotification(data, formattedTimestamp, formattedPhone) {
  try {
    // ============================================
    // CUSTOMIZE THIS: Set your notification email address(es)
    // ============================================
    // Send to multiple recipients
    const NOTIFICATION_EMAIL = 'bluegarrett13@gmail.com, denverwestdiesel@gmail.com';
    
    // Reply-to address (where replies will go)
    const REPLY_TO_EMAIL = 'denverwestdiesel@gmail.com';
    
    // NOTE: Emails are sent FROM the Google account that authorized the script.
    // To send FROM denverwestdiesel@gmail.com, you must authorize the script
    // with that account, not bluegarrett13@gmail.com.
    // ============================================
    
    const subject = `🚨 New Quote Request from ${data.firstName || ''} ${data.lastName || ''} 🚨`.trim();
    
    // Create formatted HTML email body
    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2c3e50; border-bottom: 3px solid #3498db; padding-bottom: 10px;">
          New Quote Request - Denver West Diesel
        </h2>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <p style="margin: 5px 0; color: #555;"><strong>Submitted:</strong> ${formattedTimestamp}</p>
        </div>
        
        <h3 style="color: #2c3e50; margin-top: 30px;">Contact Information</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 8px; background-color: #ecf0f1; font-weight: bold; width: 40%;">Name:</td>
            <td style="padding: 8px;">${data.firstName || ''} ${data.lastName || ''}</td>
          </tr>
          <tr>
            <td style="padding: 8px; background-color: #ecf0f1; font-weight: bold;">Phone:</td>
            <td style="padding: 8px;">${formattedPhone}</td>
          </tr>
          <tr>
            <td style="padding: 8px; background-color: #ecf0f1; font-weight: bold;">Email:</td>
            <td style="padding: 8px;"><a href="mailto:${data.email || ''}">${data.email || ''}</a></td>
          </tr>
        </table>
        
        <h3 style="color: #2c3e50; margin-top: 30px;">Vehicle Information</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 8px; background-color: #ecf0f1; font-weight: bold; width: 40%;">Make:</td>
            <td style="padding: 8px;">${data.make || ''}</td>
          </tr>
          <tr>
            <td style="padding: 8px; background-color: #ecf0f1; font-weight: bold;">Model:</td>
            <td style="padding: 8px;">${data.model || ''}</td>
          </tr>
          <tr>
            <td style="padding: 8px; background-color: #ecf0f1; font-weight: bold;">Year:</td>
            <td style="padding: 8px;">${data.year || ''}</td>
          </tr>
          <tr>
            <td style="padding: 8px; background-color: #ecf0f1; font-weight: bold;">VIN:</td>
            <td style="padding: 8px;">${getValueOrNA(data.vin)}</td>
          </tr>
          <tr>
            <td style="padding: 8px; background-color: #ecf0f1; font-weight: bold;">Engine Serial Number:</td>
            <td style="padding: 8px;">${getValueOrNA(data.engineSerial)}</td>
          </tr>
        </table>
        
        <h3 style="color: #2c3e50; margin-top: 30px;">Service Request</h3>
        <div style="background-color: #fff3cd; padding: 15px; border-left: 4px solid #ffc107; margin-bottom: 20px;">
          <p style="margin: 0; white-space: pre-wrap;">${data.problem || 'N/A'}</p>
        </div>
        
        ${data.other && data.other.trim() !== '' ? `
        <h3 style="color: #2c3e50; margin-top: 30px;">Additional Information</h3>
        <div style="background-color: #e7f3ff; padding: 15px; border-left: 4px solid #2196F3; margin-bottom: 20px;">
          <p style="margin: 0; white-space: pre-wrap;">${data.other}</p>
        </div>
        ` : ''}
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #ecf0f1; text-align: center; color: #7f8c8d; font-size: 12px;">
          <p>This is an automated notification from the Denver West Diesel quote form.</p>
        </div>
      </div>
    `;
    
    // Create plain text version for email clients that don't support HTML
    const plainTextBody = `
New Quote Request - Denver West Diesel

Submitted: ${formattedTimestamp}

CONTACT INFORMATION
Name: ${data.firstName || ''} ${data.lastName || ''}
Phone: ${formattedPhone}
Email: ${data.email || ''}

VEHICLE INFORMATION
Make: ${data.make || ''}
Model: ${data.model || ''}
Year: ${data.year || ''}
VIN: ${getValueOrNA(data.vin)}
Engine Serial Number: ${getValueOrNA(data.engineSerial)}

SERVICE REQUEST
${data.problem || 'N/A'}

${data.other && data.other.trim() !== '' ? `ADDITIONAL INFORMATION\n${data.other}\n` : ''}
---
This is an automated notification from the Denver West Diesel quote form.
    `.trim();
    
    // Log email attempt
    Logger.log('Attempting to send email to: ' + NOTIFICATION_EMAIL);
    Logger.log('Subject: ' + subject);
    
    // Try to send the email - this will trigger authorization if needed
    try {
      MailApp.sendEmail({
        to: NOTIFICATION_EMAIL,
        replyTo: REPLY_TO_EMAIL,
        subject: subject,
        htmlBody: htmlBody,
        body: plainTextBody
      });
    } catch (authError) {
      // If it's an authorization error, provide helpful message
      if (authError.toString().includes('permission') || authError.toString().includes('authorization')) {
        Logger.log('');
        Logger.log('=== AUTHORIZATION REQUIRED ===');
        Logger.log('The script needs permission to send emails.');
        Logger.log('Please follow these steps:');
        Logger.log('1. Stop this execution');
        Logger.log('2. Run testEmail() function again');
        Logger.log('3. When the authorization popup appears, click "Review permissions"');
        Logger.log('4. Select your Google account');
        Logger.log('5. Click "Advanced" > "Go to [Project Name] (unsafe)"');
        Logger.log('6. Click "Allow" to grant email permissions');
        Logger.log('');
        throw authError; // Re-throw to show the error
      }
      throw authError; // Re-throw other errors
    }
    
    Logger.log('Email sent successfully to: ' + NOTIFICATION_EMAIL);
    return true;
  } catch (error) {
    // Log error with full details
    Logger.log('ERROR sending email notification: ' + error.toString());
    Logger.log('Error stack: ' + error.stack);
    console.error('Error sending email notification:', error);
    return false;
  }
}

/**
 * Security: Rate limiting and spam protection
 * Stores recent submissions in PropertiesService to prevent abuse
 */
function checkRateLimit(email, phone) {
  const properties = PropertiesService.getScriptProperties();
  const now = new Date().getTime();
  const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds
  const MAX_SUBMISSIONS_PER_HOUR = 3; // Maximum submissions per email/phone per hour
  
  // Check email rate limit
  if (email) {
    const emailKey = 'submission_' + email.toLowerCase();
    const emailData = properties.getProperty(emailKey);
    
    if (emailData) {
      const submissions = JSON.parse(emailData);
      const recentSubmissions = submissions.filter(time => (now - time) < RATE_LIMIT_WINDOW);
      
      if (recentSubmissions.length >= MAX_SUBMISSIONS_PER_HOUR) {
        Logger.log('Rate limit exceeded for email: ' + email);
        return false;
      }
      
      recentSubmissions.push(now);
      properties.setProperty(emailKey, JSON.stringify(recentSubmissions));
    } else {
      properties.setProperty(emailKey, JSON.stringify([now]));
    }
  }
  
  // Check phone rate limit
  if (phone) {
    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length >= 10) {
      const phoneKey = 'submission_phone_' + phoneDigits.substring(phoneDigits.length - 10);
      const phoneData = properties.getProperty(phoneKey);
      
      if (phoneData) {
        const submissions = JSON.parse(phoneData);
        const recentSubmissions = submissions.filter(time => (now - time) < RATE_LIMIT_WINDOW);
        
        if (recentSubmissions.length >= MAX_SUBMISSIONS_PER_HOUR) {
          Logger.log('Rate limit exceeded for phone: ' + phone);
          return false;
        }
        
        recentSubmissions.push(now);
        properties.setProperty(phoneKey, JSON.stringify(recentSubmissions));
      } else {
        properties.setProperty(phoneKey, JSON.stringify([now]));
      }
    }
  }
  
  return true;
}

/**
 * Security: Basic input validation and spam detection
 */
function validateSubmission(data) {
  // Check for required fields
  if (!data.firstName || !data.lastName || !data.email || !data.phone || !data.problem) {
    return { valid: false, error: 'Missing required fields' };
  }
  
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return { valid: false, error: 'Invalid email format' };
  }
  
  // Check for suspicious content (basic spam detection)
  const spamKeywords = ['viagra', 'casino', 'lottery', 'winner', 'click here', 'free money'];
  const problemText = (data.problem || '').toLowerCase();
  const otherText = (data.other || '').toLowerCase();
  const combinedText = problemText + ' ' + otherText;
  
  for (const keyword of spamKeywords) {
    if (combinedText.includes(keyword)) {
      Logger.log('Potential spam detected: ' + keyword);
      // Don't reject, but log for review
    }
  }
  
  // Validate field lengths (prevent extremely long inputs)
  if (data.problem && data.problem.length > 5000) {
    return { valid: false, error: 'Problem description too long' };
  }
  
  if (data.other && data.other.length > 5000) {
    return { valid: false, error: 'Additional information too long' };
  }
  
  return { valid: true };
}

function doPost(e) {
  try {
    // Parse the JSON data from the POST request
    const data = JSON.parse(e.postData.contents);
    
    // Security: Validate input
    const validation = validateSubmission(data);
    if (!validation.valid) {
      Logger.log('Validation failed: ' + validation.error);
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: 'Invalid submission data'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Security: Check rate limiting
    if (!checkRateLimit(data.email, data.phone)) {
      Logger.log('Rate limit exceeded for submission');
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: 'Too many submissions. Please try again later.'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Get the active spreadsheet
    // Replace 'YOUR_SPREADSHEET_ID' with your actual Google Sheet ID
    // You can find the Sheet ID in the URL: https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit
    // OR use SpreadsheetApp.getActiveSpreadsheet() if the script is bound to the sheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Format timestamp to Mountain Time
    const timestamp = formatMountainTime(data.timestamp || new Date().toISOString());
    
    // Format phone number
    const formattedPhone = formatPhoneNumber(data.phone);
    
    // Prepare the row data in the correct order
    // Optional fields (vin, engineSerial, other) will show "N/A" if blank
    const rowData = [
      timestamp,
      data.firstName || '',
      data.lastName || '',
      formattedPhone,
      data.email || '',
      data.make || '',
      data.model || '',
      data.year || '',
      getValueOrNA(data.vin),
      getValueOrNA(data.engineSerial),
      data.problem || '',
      getValueOrNA(data.other)
    ];
    
    // Append the row to the sheet
    sheet.appendRow(rowData);
    
    // Send email notification (don't fail if email fails)
    try {
      Logger.log('Attempting to send email notification...');
      const emailResult = sendEmailNotification(data, timestamp, formattedPhone);
      if (emailResult) {
        Logger.log('Email notification sent successfully');
      } else {
        Logger.log('Email notification failed (check logs above)');
      }
    } catch (emailError) {
      Logger.log('Email notification exception: ' + emailError.toString());
      Logger.log('Email error stack: ' + emailError.stack);
      console.error('Email notification failed (form still submitted):', emailError);
    }
    
    // Return a success response
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Quote submitted successfully'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Log the error for debugging
    console.error('Error processing form submission:', error);
    
    // Return an error response
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional: Test function to verify the script works
// You can run this from the Apps Script editor to test
function testSubmission() {
  const testData = {
    timestamp: new Date().toISOString(),
    firstName: 'Test',
    lastName: 'User',
    phone: '1234567890', // Will be formatted to 123-456-7890
    email: 'test@example.com',
    make: 'Ford',
    model: 'F-250',
    year: '2020',
    vin: 'TEST123456',
    engineSerial: 'ENG123',
    problem: 'Test problem description',
    other: 'Test other information'
  };
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(mockEvent);
  Logger.log(result.getContent());
}

/**
 * SIMPLE EMAIL TEST FUNCTION
 * 
 * IMPORTANT: This function will trigger the authorization flow for sending emails.
 * 
 * Step-by-step authorization:
 * 1. Click on the function name "testEmail" in the dropdown (top center of editor)
 * 2. Click the "Run" button (play icon ▶️)
 * 3. A popup will appear asking for authorization - click "Review permissions"
 * 4. Select your Google account (bluegarrett13@gmail.com)
 * 5. You may see "Google hasn't verified this app" - this is normal for personal scripts
 *    - Click "Advanced" at the bottom
 *    - Click "Go to Quote Form Handler (unsafe)" - this is safe, it's your own script
 * 6. Click "Allow" to grant email sending permissions
 * 7. The script will run and send a test email
 * 8. Check the Execution log (View > Logs or Ctrl+Enter) for results
 * 9. Check your email inbox at bluegarrett13@gmail.com
 * 
 * If you still get permission errors after authorizing:
 * - Make sure you're signed in with the correct Google account
 * - Try running the function again (sometimes it needs to run twice)
 * - Check View > Executions to see detailed error messages
 */
function testEmail() {
  try {
    Logger.log('=== Starting Email Test ===');
    Logger.log('Current user: ' + Session.getActiveUser().getEmail());
    
    const testData = {
      firstName: 'Test',
      lastName: 'User',
      phone: '7205551234',
      email: 'test@example.com',
      make: 'Ford',
      model: 'F-250',
      year: '2020',
      vin: 'TEST123',
      engineSerial: 'ENG123',
      problem: 'This is a test email to verify email notifications are working.',
      other: 'If you receive this, email notifications are working correctly!'
    };
    
    const timestamp = formatMountainTime(new Date().toISOString());
    const formattedPhone = formatPhoneNumber(testData.phone);
    
    Logger.log('Calling sendEmailNotification...');
    const result = sendEmailNotification(testData, timestamp, formattedPhone);
    
    if (result) {
      Logger.log('=== Email Test SUCCESS ===');
      Logger.log('Check your inbox at bluegarrett13@gmail.com');
    } else {
      Logger.log('=== Email Test FAILED ===');
      Logger.log('Check the error logs above for details');
    }
  } catch (error) {
    Logger.log('=== Email Test ERROR ===');
    Logger.log('Error: ' + error.toString());
    Logger.log('Stack: ' + error.stack);
    throw error;
  }
}

