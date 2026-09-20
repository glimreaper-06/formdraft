# FormDraft

FormDraft is a simple local AI writing assistant that turns basic information into properly formatted letters, requests, and applications.

It is powered by **Tether's QVAC SDK**, allowing the AI inference to run directly on the user's device instead of relying on a cloud AI service.

## What FormDraft Does

FormDraft helps users create documents without having to start from a blank page.

The user provides a few details such as:

- Document type
- Recipient
- Purpose
- Reason
- Date
- Additional details

FormDraft then uses QVAC to generate a complete draft based on the information provided.

### Supported Document Types

- Request Letter
- Excuse Letter
- Application
- Permission Letter
- Complaint
- School Letter
- Business Request
- Recommendation Request
- Other

The generated document can also be copied using the **Copy Draft** button.

## Why QVAC?

FormDraft uses QVAC so that the AI model can run locally on the user's device.

This means the document generation does not depend on a cloud AI API or an external AI server.

The project uses QVAC's:

- `loadModel()` function to load the local AI model
- `completion()` function to generate the document

## QVAC SDK Version

```text
@qvac/sdk 0.19.1