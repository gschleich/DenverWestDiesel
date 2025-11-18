# Security Guide for Public Hosting

This guide explains how sensitive information is protected when your code is publicly hosted (e.g., GitHub Pages).

## What's Protected

### ✅ Protected (Not in Git)
- **`config.js`** - Contains your Google Apps Script Web App URL
  - This file is in `.gitignore` and will NOT be committed
  - Only you have access to this file on your server

### ⚠️ Public (In Git)
- **`config.js.example`** - Template file (safe to commit)
- **`script.js`** - Form submission logic (no sensitive data)
- **`index.html`** - Website HTML (no sensitive data)
- **`google-apps-script.js`** - Contains email addresses (see below)

## Security Measures Implemented

### 1. Configuration File Separation
- Sensitive URLs are stored in `config.js` (gitignored)
- Template file `config.js.example` shows the structure without real values
- The actual `config.js` must be created manually on your server

### 2. Google Apps Script Security
The Google Apps Script includes:
- **Rate Limiting**: Maximum 3 submissions per email/phone per hour
- **Input Validation**: Validates email format, field lengths, required fields
- **Spam Detection**: Basic keyword filtering (logs suspicious content)
- **Error Handling**: Prevents information leakage in error messages

### 3. Email Address Protection
Email addresses in `google-apps-script.js`:
- These are visible in the code but are not critical security risks
- The script URL is the more sensitive piece (now protected in config.js)
- Consider: Email addresses are often public anyway (on your website)

## Setup Instructions

### For Local Development:
1. Copy `config.js.example` to `config.js`
2. Replace `YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE` with your actual URL
3. The `config.js` file will NOT be committed to git

### For Production/Deployment:
1. On your hosting server, create `config.js` with your actual URL
2. Make sure `config.js` is NOT in your git repository
3. The website will load `config.js` from your server (not from git)

## Additional Security Recommendations

### 1. Google Apps Script Deployment Settings
- ✅ Set "Who has access" to "Anyone" (required for web forms)
- ✅ The script URL is long and random (hard to guess)
- ⚠️ Consider adding IP whitelisting if possible (advanced)

### 2. Google Sheet Protection
- Make your Google Sheet private (only you can view it)
- The script can still write to it even if it's private
- This protects customer data from being publicly accessible

### 3. Rate Limiting
- Already implemented: 3 submissions per email/phone per hour
- Adjust `MAX_SUBMISSIONS_PER_HOUR` in `google-apps-script.js` if needed
- Adjust `RATE_LIMIT_WINDOW` to change the time window

### 4. Monitoring
- Check your Google Sheet regularly for suspicious submissions
- Review execution logs in Apps Script (View > Executions)
- Set up email alerts for unusual activity (if needed)

### 5. Future Enhancements (Optional)
- Add CAPTCHA to the form (reCAPTCHA)
- Add honeypot fields (hidden fields that bots might fill)
- Implement IP-based rate limiting (requires more complex setup)
- Add authentication token validation

## What If Someone Finds Your Script URL?

If someone discovers your Google Apps Script Web App URL:

1. **Rate limiting protects you**: They can't spam submissions (max 3/hour per email)
2. **Validation protects you**: Invalid data is rejected
3. **You can regenerate**: Create a new deployment to get a new URL
4. **Monitor your sheet**: Check for suspicious activity

## Best Practices

1. ✅ **Never commit `config.js`** - Always keep it in `.gitignore`
2. ✅ **Use `config.js.example`** - Shows structure without sensitive data
3. ✅ **Review submissions regularly** - Check your Google Sheet
4. ✅ **Keep Google Sheet private** - Only you should have access
5. ✅ **Monitor execution logs** - Watch for errors or abuse
6. ✅ **Update regularly** - Keep your code updated with security improvements

## Troubleshooting

### "Form is not properly configured" Error
- Make sure `config.js` exists on your server
- Check that `GOOGLE_SCRIPT_URL` is set correctly
- Verify the file is being loaded (check browser console)

### Rate Limit Errors
- Wait 1 hour between submissions from the same email/phone
- This is intentional to prevent spam
- Adjust limits in `google-apps-script.js` if needed

### Submissions Not Working
- Check browser console for errors
- Verify `config.js` is loaded before `script.js`
- Check Google Apps Script execution logs

## Summary

Your sensitive information is protected by:
1. ✅ `config.js` is gitignored (not in repository)
2. ✅ Google Apps Script has rate limiting and validation
3. ✅ Google Sheet should be kept private
4. ✅ Long, random script URLs are hard to guess

The main thing to remember: **Never commit `config.js` to git!**

