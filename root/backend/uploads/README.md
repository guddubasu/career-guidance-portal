# Uploads Directory

This directory is used to store uploaded resume and document files for AI analysis.

Files in this directory are temporary and are deleted after processing or when the user deletes them from the system.

## Security Notes

- Only PDF, TXT, and MD files are accepted
- Maximum file size is 10MB
- Files are isolated per user via MongoDB
