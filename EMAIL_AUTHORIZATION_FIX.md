# Fix: Email Authorization Issue

## The Problem

You're seeing this error:
```
You do not have permission to call MailApp.sendEmail. 
Required permissions: https://www.googleapis.com/auth/script.send_mail
```

This means the script hasn't been authorized to send emails yet.

## The Solution: Authorize the Script

### Step 1: Open Apps Script Editor
1. Open your Google Sheet ("Denver West Diesel Quotes")
2. Go to **Extensions** > **Apps Script**

### Step 2: Run the Test Function
1. In the Apps Script editor, look at the top center for a dropdown that says "Select function"
2. Click the dropdown and select **`testEmail`**
3. Click the **Run** button (▶️ play icon) or press `Ctrl+Enter` (Windows) / `Cmd+Enter` (Mac)

### Step 3: Authorize Permissions
When you run the function, Google will ask for authorization:

1. **First popup**: Click **"Review permissions"** or **"Authorize access"**

2. **Select your Google account**: Choose `bluegarrett13@gmail.com`

3. **"Google hasn't verified this app" warning** (this is normal for personal scripts):
   - Click **"Advanced"** at the bottom left
   - Click **"Go to Quote Form Handler (unsafe)"** 
     - ⚠️ This is SAFE - it's your own script, not a third-party app
   - Click **"Allow"**

4. **Grant permissions**: 
   - You'll see what permissions the script needs
   - Click **"Allow"** to grant email sending permissions

### Step 4: Verify It Works
1. After authorization, the script will run automatically
2. Check the **Execution log**:
   - Click **View** > **Logs** (or press `Ctrl+Enter` / `Cmd+Enter`)
   - You should see: `=== Email Test SUCCESS ===`
3. Check your email inbox at `bluegarrett13@gmail.com`
   - You should receive a test email with quote form details

## Why This Happens

When you first add email functionality to a Google Apps Script, Google requires explicit authorization to send emails. This is a security feature to prevent unauthorized email sending.

The scope `https://www.googleapis.com/auth/script.send_mail` is automatically requested when you use `MailApp.sendEmail()`, but you need to grant it through the authorization flow.

## Troubleshooting

### Still Getting Permission Errors?

1. **Make sure you're signed in with the correct account**
   - The script must be authorized with the same Google account that owns the script
   - Check: In Apps Script, look at the top right - make sure it shows `bluegarrett13@gmail.com`

2. **Try running the function again**
   - Sometimes the authorization needs to complete fully
   - Run `testEmail()` a second time after authorizing

3. **Check execution logs for detailed errors**
   - Go to **View** > **Executions**
   - Click on the most recent execution
   - Look for any error messages

4. **Revoke and re-authorize** (if needed):
   - Go to [Google Account Security](https://myaccount.google.com/permissions)
   - Find "Quote Form Handler" or "Apps Script"
   - Click "Remove access"
   - Then run `testEmail()` again to re-authorize

### "Unverified App" Warning

This is **completely normal** for personal Google Apps Script projects. Google shows this warning for any script that hasn't gone through their verification process (which is only required for public apps). Since this is your personal script, you can safely proceed.

## After Authorization Works

Once the test email works:
1. ✅ Your script is now authorized to send emails
2. ✅ Form submissions will automatically send email notifications
3. ✅ No need to authorize again (unless you revoke permissions)

## Next Steps

After `testEmail()` works successfully:
1. Submit a real quote from your website
2. Check that you receive the email notification
3. The email will be sent automatically for every form submission

---

**Reference**: [Google OAuth 2.0 Scopes](https://developers.google.com/identity/protocols/oauth2/scopes)

