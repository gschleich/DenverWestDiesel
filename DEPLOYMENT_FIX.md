# Fix: Form Not Working on Live Website

## The Problem

The form works locally but fails on the live website because `config.js` is missing on your server.

## Why This Happens

- `config.js` contains your Google Script URL
- It's in `.gitignore` (so it's NOT committed to git)
- Your live server doesn't have this file
- The website can't find `GOOGLE_SCRIPT_URL`, so the form fails

## Solution: Add config.js to Your Live Server

### Option 1: Upload config.js Manually (Recommended)

1. **Get your Google Script URL:**
   - Go to your Google Apps Script
   - Deploy > Manage deployments
   - Copy the Web App URL

2. **Create config.js on your server:**
   - On your hosting server (where denverwestdiesel.com is hosted)
   - Create a file named `config.js` in the same directory as `index.html`
   - Add this content (replace with your actual URL):

```javascript
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_ACTUAL_URL_HERE/exec';
```

3. **Upload the file:**
   - Use FTP, cPanel File Manager, or your hosting provider's file upload tool
   - Make sure `config.js` is in the root directory (same place as `index.html`)

4. **Test:**
   - Visit `denverwestdiesel.com/config.js` in your browser
   - You should see the JavaScript code (not an error page)
   - If you see 404, the file isn't in the right location

### Option 2: Use Your Local config.js

1. **Copy your local config.js:**
   - Open `/Users/garrettschleich/Desktop/DenverWestDiesel/config.js`
   - Copy the entire contents

2. **Upload to server:**
   - Create `config.js` on your live server
   - Paste the contents
   - Make sure it has your actual Google Script URL

### Option 3: Temporary Workaround (Not Recommended)

If you can't upload `config.js` right away, you can temporarily put the URL directly in `script.js`:

1. Open `script.js`
2. Find the line that checks for `GOOGLE_SCRIPT_URL`
3. Add this line right after the check:

```javascript
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_URL_HERE/exec';
```

⚠️ **Warning:** This makes the URL public in your git repository. Only use this as a temporary fix, then switch back to `config.js`.

## Verify It's Working

1. Visit your live website
2. Open browser console (F12 or right-click > Inspect > Console)
3. Type: `GOOGLE_SCRIPT_URL`
4. You should see your URL (not `undefined`)

## Common Issues

### "config.js not found" error
- Make sure the file exists on your server
- Check the file path matches where `index.html` is
- Verify file permissions (should be readable)

### "GOOGLE_SCRIPT_URL is undefined"
- The file isn't loading
- Check browser console for 404 errors
- Verify the file is accessible at `yoursite.com/config.js`

### Still getting errors
- Check browser console for specific error messages
- Verify your Google Script URL is correct
- Make sure your Google Apps Script deployment is active

## Your Current config.js Content

Based on your local file, your `config.js` should contain:

```javascript
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxLLgSfR-Qjij0NAFghTHQfef3ZUbMfjJNm_Zzri3EVBDPp1cq9CHukABti1gIwpOHCnA/exec';
```

Copy this exact content to your live server's `config.js` file.

