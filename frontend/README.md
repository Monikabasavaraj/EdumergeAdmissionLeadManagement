# Edumerge Admission Lead Management

A web-based admission lead management system built for the Edumerge Product Engineering Assignment.

## Features

- Admission lead creation
- Lead source tracking
- Primary and secondary course preferences
- Lead lifecycle/status management
- Lead priority
- Counsellor assignment
- Lead search
- Status/source/priority filters
- Lead ageing analysis
- Follow-up scheduling
- Follow-up completion tracking
- Overdue follow-up visibility
- Counsellor workload visibility
- Lead detail page
- Follow-up history
- Dashboard reporting

## Tech Stack

### Backend
- Python
- Django
- Django REST Framework
- SQLite

### Frontend
- React
- Vite
- Axios
- React Router

## Project Structure

```text
Edumerge_Admission_Lead_Management/
├── config/
├── leads/
├── frontend/
│   └── src/
│       ├── pages/
│       ├── services/
│       ├── App.jsx
│       └── main.jsx
├── manage.py
├── requirements.txt
├── README.md
├── APPROACH.md
└── AI_USAGE_REPORT.md


---

### 2. Create `APPROACH.md`

```markdown
# Product Engineering Approach

## 1. Problem Understanding

The system is designed to manage admission enquiries coming from multiple channels such as website enquiries, walk-ins, phone calls, WhatsApp, fairs and campaigns.

The main workflow is:

Lead Creation
→ Counsellor Assignment
→ Contact/Follow-up
→ Interest/Application
→ Conversion or Lost

The system also provides management visibility into lead ageing, follow-ups, sources and counsellor workload.

## 2. Architecture

The application uses a simple client-server architecture.

```text
React Frontend
      |
      | REST API
      v
Django REST Framework
      |
      v
SQLite Database




---

### 3. Create `AI_USAGE_REPORT.md`

Be **honest** here—don't claim AI-generated code that wasn't actually used. Based on our development process, you can document the assistance you actually used.

```markdown
# AI Usage Report

## 1. AI Usage

AI assistance was used during development of this assignment to accelerate implementation and review.

The AI was used for:

- Breaking the assignment into implementation steps
- Designing the lead/counsellor/follow-up data model
- Generating and improving Django REST API code
- Generating React components
- Implementing frontend navigation
- Implementing validation logic
- Implementing dashboard calculations
- Implementing lead filtering/search
- Reviewing edge cases
- Preparing project documentation

## 2. Examples of AI Requests

Examples of prompts used during development included:

- "Build an admission lead management system using Django REST Framework and React."
- "Create Django models for counsellors, leads and follow-ups."
- "Add validation for duplicate leads and Lost status."
- "Create a React dashboard showing lead ageing and counsellor workload."
- "Create a lead detail page with follow-up history."
- "Add search and filtering to the leads page."
- "Review the application for important edge cases."

## 3. AI-Generated or AI-Assisted Code

AI assistance was used to generate or modify portions of:

- Django models
- Django serializers
- API viewsets
- URL routing
- React pages
- React Router configuration
- Axios API configuration
- Dashboard calculations
- Form validation
- Lead filtering

The generated code was reviewed and integrated into the project manually.

## 4. Incorrect or Incomplete AI Output

AI-generated code was treated as a development aid rather than automatically trusted.

Examples of areas requiring verification included:

- React Router paths
- API request URLs
- Django model migrations
- Frontend/backend field consistency
- Validation behaviour
- Follow-up lead ID matching
- Lost-lead validation

These were checked by running the application and testing the relevant workflows.

## 5. How Issues Were Identified

Issues were identified through:

- Running Django migrations
- Starting the Django development server
- Starting the React development server
- Testing API operations
- Testing forms
- Testing filtering
- Testing counsellor assignment
- Testing follow-up creation
- Testing dashboard calculations

## 6. Human Verification

The final implementation should be manually verified before submission.

Important checks:

- Lead creation works.
- Duplicate validation works.
- Counsellor assignment works.
- Follow-ups can be created.
- Follow-ups can be completed.
- Dashboard values update.
- Lead detail pages load correctly.
- Filters return the expected records.
- Production frontend build succeeds.

## 7. AI Limitations

AI-generated code may contain assumptions or implementation mistakes.

Therefore, generated code was reviewed against the assignment requirements and tested through the running application rather than being accepted without verification.