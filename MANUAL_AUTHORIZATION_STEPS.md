# Manual Authorization Steps - Fix Permission Error

You're seeing this error because the script hasn't been authorized to send emails yet. Follow these steps **exactly**:

## Method 1: Trigger Authorization via Test Function

### Step 1: Run the Test Function
1. In Apps Script editor, make sure `testEmail` is selected in the function dropdown (top center)
2. Click the **Run** button (▶️) or press `Ctrl+Enter` / `Cmd+Enter`

### Step 2: Authorization Popup Should Appear
**If a popup appears:**
- Click **"Review permissions"** or **"Authorize access"**
- Select your Google account (`bluegarrett13@gmail.com`)
- If you see "Google hasn't verified this app":
  - Click **"Advanced"** at the bottom
  - Click **"Go to Quote Form Handler (unsafe)"**
  - Click **"Allow"**
- Grant all requested permissions

**If NO popup appears**, try Method 2 below.

## Method 2: Force Authorization by Checking Permissions

### Step 1: Check Current Permissions
1. In Apps Script editor, click **View** > **Executions**
2. Look at the most recent execution
3. If it shows "Authorization required" or similar, click on it

### Step 2: Manual Authorization
1. Go to [Google Account Permissions](https://myaccount.google.com/permissions)
2. Look for "Quote Form Handler" or any Apps Script entries
3. If you see it listed, click on it to see what permissions it has
4. If email permissions are missing, remove it and re-authorize

### Step 3: Re-run with Fresh Authorization
1. Go back to Apps Script editor
2. Select `testEmail` function
3. Click **Run**
4. This time, the authorization popup **should** appear
5. Complete the authorization flow

## Method 3: Use GmailApp Instead (Alternative)

If `MailApp` continues to have issues, we can switch to `GmailApp` which sometimes has better authorization handling. Let me know if you want to try this approach.

## Method 4: Check Project Settings

Sometimes the issue is with the project's OAuth settings:

1. In Apps Script editor, click the **Project Settings** icon (⚙️) on the left sidebar
2. Scroll down to **"OAuth scopes"**
3. You should see: `https://www.googleapis.com/auth/script.send_mail`
4. If it's not there, the script hasn't requested it yet
5. Run `testEmail()` again to trigger the scope request

## Method 5: Clear and Re-authorize

If nothing else works:

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Click **"Third-party apps with account access"**
3. Find "Quote Form Handler" or any Apps Script entries
4. Click **"Remove access"** for all of them
5. Go back to Apps Script editor
6. Run `testEmail()` function again
7. Complete the full authorization flow

## Verify Authorization Worked

After authorizing, you should see in the execution log:
- `=== Email Test SUCCESS ===`
- `Email sent successfully to: bluegarrett13@gmail.com`

And you should receive an email in your inbox.

## Still Not Working?

If you've tried all methods and still get permission errors:

1. **Check which account you're signed in with:**
   - In Apps Script, look at the top right corner
   - Make sure it shows `bluegarrett13@gmail.com`
   - If it shows a different account, sign out and sign back in with the correct account

2. **Check if 2-Step Verification is enabled:**
   - Sometimes this can cause issues
   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Make sure 2-Step Verification is set up (it should be)

3. **Try a different browser:**
   - Sometimes browser extensions or settings can block the authorization popup
   - Try Chrome in incognito mode, or a different browser

4. **Check browser popup blocker:**
   - Make sure popup blockers aren't preventing the authorization window
   - Temporarily disable browser extensions

## What Should Happen

When authorization works correctly:
1. You run `testEmail()`
2. A popup appears asking for permissions
3. You grant permissions
4. Script runs successfully
5. You receive an email
6. Future form submissions will automatically send emails

---

**The key is**: The authorization popup MUST appear and you MUST complete it. If it doesn't appear, try the methods above to force it.

