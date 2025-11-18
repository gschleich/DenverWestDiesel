# Free Email Notifications Setup (Google Apps Script)

This guide will help you set up **free** email notifications using Google Apps Script - no paid services required!

## How It Works

When someone submits a quote form on your website:
1. The data is saved to your Google Sheet ✅
2. An email notification is automatically sent to you ✅
3. All completely FREE using Google Apps Script! 🎉

## Setup Steps

### Step 1: Update Your Google Apps Script

1. Open your Google Sheet ("Denver West Diesel Quotes")
2. Go to **Extensions** > **Apps Script**
3. Copy the updated code from `google-apps-script.js` and paste it into the editor
4. **Important**: Find the `sendEmailNotification` function and customize the email address:
   ```javascript
   const NOTIFICATION_EMAIL = 'denverwestdiesel@gmail.com';
   ```
   - Change this to your email address
   - Or use multiple emails: `'email1@gmail.com, email2@gmail.com'`
5. Save the project (Ctrl+S or Cmd+S)

### Step 2: Create a New Deployment

Since you already have a deployment, you need to create a **new version**:

1. Click **Deploy** > **Manage deployments**
2. Click the **edit icon** (pencil) next to your existing deployment
3. Click **New version**
4. Click **Deploy**
5. **Important**: Make sure "Who has access" is still set to **"Anyone"**

### Step 3: Authorize Email Permissions

The first time the script sends an email, Google will ask for permission:

1. Submit a test quote from your website
2. Go back to Apps Script editor
3. You may see a prompt to authorize - click **"Authorize access"**
4. Sign in with your Google account
5. Click **"Advanced"** > **"Go to [Project Name] (unsafe)"** (this is safe - it's your own script)
6. Click **"Allow"** to grant email sending permissions

### Step 4: Test It!

1. Submit a test quote from your website
2. Check your email inbox
3. You should receive a beautifully formatted email with all the quote details!

## Email Features

The email includes:
- ✅ Formatted timestamp (Mountain Time)
- ✅ Contact information (name, phone, email)
- ✅ Vehicle details (make, model, year, VIN, engine serial)
- ✅ Service request description
- ✅ Additional information (if provided)
- ✅ Professional HTML formatting
- ✅ Plain text version for email clients that don't support HTML

## Customization

### Change Email Recipient

Edit line 129 in `google-apps-script.js`:
```javascript
const NOTIFICATION_EMAIL = 'your-email@gmail.com';
```

### Send to Multiple Recipients

Separate emails with commas:
```javascript
const NOTIFICATION_EMAIL = 'email1@gmail.com, email2@gmail.com, email3@gmail.com';
```

### Use Script Owner's Email

Uncomment line 132:
```javascript
const NOTIFICATION_EMAIL = Session.getActiveUser().getEmail();
```

## Troubleshooting

### Email not sending

1. **Check authorization**: Make sure you've authorized the script to send emails
   - Go to Apps Script editor
   - Check for any authorization prompts
   - View > Executions to see if there are errors

2. **Check email address**: Make sure `NOTIFICATION_EMAIL` is set correctly

3. **Check spam folder**: Sometimes emails go to spam on first send

4. **Check execution logs**: 
   - In Apps Script editor, go to **View** > **Executions**
   - Look for any errors in the logs

### Form submits but no email

- The form submission will still work even if email fails
- Check the Apps Script execution logs for email errors
- Make sure you've authorized email permissions

## Limits

Google Apps Script has free daily limits:
- **100 emails per day** (for personal Gmail accounts)
- **1,500 emails per day** (for Google Workspace accounts)

This should be more than enough for quote notifications!

## Advantages Over Paid Services

✅ **Completely FREE**
✅ **No monthly fees**
✅ **No credit card required**
✅ **Integrated with your existing setup**
✅ **Full control over email formatting**
✅ **Works automatically with your form**

## Need Help?

If you encounter issues:
1. Check the Apps Script execution logs (View > Executions)
2. Make sure email permissions are authorized
3. Verify the `NOTIFICATION_EMAIL` is correct
4. Test with a simple email first to ensure it works

