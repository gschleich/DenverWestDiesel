# Google Sheets Integration Setup Guide

This guide will help you set up Google Sheets to receive form submissions from your Denver West Diesel quote form.

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Denver West Diesel Quotes" (or any name you prefer)

## Step 2: Set Up Column Headers

In Row 1 of your Google Sheet, add these column headers (in this exact order):

| Column | Header |
|--------|--------|
| A | Timestamp |
| B | First Name |
| C | Last Name |
| D | Phone |
| E | Email |
| F | Make |
| G | Model |
| H | Year |
| I | VIN |
| J | Engine Serial Number |
| K | Problem Description |
| L | Other Information |

## Step 3: Create Google Apps Script

1. In your Google Sheet, click **Extensions** > **Apps Script**
2. Delete any default code in the editor
3. Copy the entire contents of `google-apps-script.js` from this project
4. Paste it into the Apps Script editor
5. Save the project (Ctrl+S or Cmd+S on Windows, Cmd+S on Mac)
6. Name the project "Quote Form Handler" (or any name you prefer)

## Step 4: Deploy as Web App

1. In the Apps Script editor, click **Deploy** > **New deployment**
2. Click the gear icon (⚙️) next to "Select type"
3. Choose **Web app**
4. Configure the deployment:
   - **Description**: "Quote Form Handler"
   - **Execute as**: "Me" (your email address)
   - **Who has access**: **"Anyone"** (this is important - it allows your website to submit data)
5. Click **Deploy**
6. **Copy the Web App URL** that appears - you'll need this in the next step

**Note**: The first time you deploy, Google may ask you to authorize the script. Click "Authorize access" and follow the prompts to grant necessary permissions.

## Step 5: Update Your Website Code

1. Open `script.js` in your project
2. Find this line:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';
   ```
3. Replace `'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE'` with the Web App URL you copied in Step 4
4. Save the file

Example:
```javascript
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz.../exec';
```

## Step 6: Test the Integration

1. Open your website in a browser
2. Fill out the quote form with test data
3. Submit the form
4. Check your Google Sheet - you should see a new row with the submitted data

## Troubleshooting

### Form submits but no data appears in the sheet
- Make sure the Apps Script is deployed as a Web App (not just saved)
- Verify "Who has access" is set to "Anyone"
- Check that the column headers in your sheet match the expected format
- Open the Apps Script editor and check the "Executions" tab for any errors

### Getting CORS errors
- This is normal when using `no-cors` mode. The form will still submit successfully even if you see CORS warnings in the console.

### Need to update the script
- If you make changes to the Apps Script code, you need to create a **new deployment** (Deploy > Manage deployments > Edit > New version) for the changes to take effect.

## Security Note

The Web App URL will be visible in your website's JavaScript code. This is normal and expected. The script is configured to only accept POST requests and write data to your sheet. However, you may want to add additional validation in the Apps Script if needed.

## Need Help?

If you encounter issues:
1. Check the Apps Script execution logs (View > Executions in the Apps Script editor)
2. Verify your Google Sheet has the correct column headers
3. Make sure the Web App URL in `script.js` is correct and the deployment is active

