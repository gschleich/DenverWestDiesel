# How to Change Email Sender to denverwestdiesel@gmail.com

Currently, emails are being sent FROM `bluegarrett13@gmail.com` because that's the account that authorized the script. To send FROM `denverwestdiesel@gmail.com`, you need to re-authorize the script with that account.

## Step-by-Step Instructions

### Step 1: Sign Out of Current Account
1. In your browser, click your profile picture (top right)
2. Click **"Sign out"** or **"Add another account"**
3. Make sure you're signed out of `bluegarrett13@gmail.com` in the browser

### Step 2: Sign In with denverwestdiesel@gmail.com
1. Sign in with `denverwestdiesel@gmail.com`
2. Make sure this is the active account in your browser

### Step 3: Open Your Google Sheet
1. Go to your Google Sheet: "Denver West Diesel Quotes"
2. Make sure you're signed in as `denverwestdiesel@gmail.com`
3. Check the top right corner - it should show `denverwestdiesel@gmail.com`

### Step 4: Open Apps Script
1. In your Google Sheet, go to **Extensions** > **Apps Script**
2. Make sure you're still signed in as `denverwestdiesel@gmail.com` in Apps Script

### Step 5: Revoke Old Authorization (Optional but Recommended)
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Click **"Third-party apps with account access"**
3. Find "Quote Form Handler" or any Apps Script entries
4. Click **"Remove access"** for all of them
5. This ensures a clean re-authorization

### Step 6: Re-authorize with denverwestdiesel@gmail.com
1. In Apps Script editor, select `testEmail` from the function dropdown
2. Click **Run** (▶️)
3. When the authorization popup appears:
   - Make sure it shows `denverwestdiesel@gmail.com` as the account
   - Click **"Review permissions"**
   - Click **"Advanced"** > **"Go to Quote Form Handler (unsafe)"**
   - Click **"Allow"**

### Step 7: Test
1. After authorization, the script should run
2. Check your email - it should now be FROM `denverwestdiesel@gmail.com`
3. Verify it's sent TO both `bluegarrett13@gmail.com` and `denverwestdiesel@gmail.com`

### Step 8: Update Deployment
1. After testing works, create a new deployment:
   - **Deploy** > **Manage deployments**
   - Click **Edit** (pencil icon) on your existing deployment
   - Click **New version**
   - Click **Deploy**
2. This ensures the web app uses the new authorization

## Alternative: Use GmailApp (If MailApp Doesn't Work)

If for some reason MailApp still sends from the wrong account, we can switch to GmailApp which might give better control. Let me know if you need this alternative approach.

## Important Notes

- The script must be authorized with the account you want to send FROM
- Both accounts (`bluegarrett13@gmail.com` and `denverwestdiesel@gmail.com`) will still receive emails
- Replies will go to `denverwestdiesel@gmail.com` (reply-to is already set correctly)
- Once re-authorized, all future emails will be FROM `denverwestdiesel@gmail.com`

## Troubleshooting

**If you can't sign in with denverwestdiesel@gmail.com:**
- Make sure you have access to that account
- You may need to share the Google Sheet with `denverwestdiesel@gmail.com` first
- Or transfer ownership of the sheet to `denverwestdiesel@gmail.com`

**If authorization doesn't work:**
- Make sure you're signed in with the correct account in your browser
- Clear browser cache and cookies
- Try in an incognito/private window

