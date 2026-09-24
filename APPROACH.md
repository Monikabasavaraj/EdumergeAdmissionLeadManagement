# Edumerge Admission Lead Management

Admission Lead Management system built for the Edumerge Product Engineering Assignment.

## Features

- Create and manage admission leads
- Track lead source: Website, Walk-in, Phone, WhatsApp, Fair, Campaign and Other
- Track primary and secondary course preferences
- Lead lifecycle and status management
- Priority management
- Counsellor assignment
- Search and filtering
- Lead detail view
- Follow-up scheduling and completion
- Overdue follow-up visibility
- Lead ageing information
- Counsellor workload visibility
- Dashboard and reports

## Tech Stack

- Python
- Django
- Django REST Framework
- SQLite
- React
- Vite
- Axios
- React Router

## Project Structure

- config/ - Django project configuration
- leads/ - Lead management application and REST API
- rontend/ - React frontend
- manage.py - Django management entry point

## Setup

### Backend

`ash
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
cd frontend
npm install
npm run dev

### 2. APPROACH.md

`powershell
@"
# Approach, Architecture and Trade-offs

## Approach

The system is designed around the admission lead lifecycle: capture a lead, assign a counsellor, track course interest and source, manage status changes, schedule follow-ups and provide manager-level visibility.

## Architecture

React Frontend
       |
       | HTTP / REST API
       v
Django REST Framework
       |
       v
SQLite Database

### Backend

Django REST Framework provides APIs for:

- Counsellors
- Leads
- Follow-ups

The backend contains validation for important business rules including duplicate detection, phone validation and Lost-status reason requirements.

### Frontend

React provides:

- Dashboard
- Lead listing
- Search and filters
- Lead creation
- Lead detail
- Counsellor assignment
- Follow-up management
- Reports

Axios handles API communication and React Router handles navigation.

## Data Model

### Counsellor

Stores counsellor name and unique email.

### Lead

Stores:

- Name
- Phone
- Email
- Primary course
- Secondary course
- Source
- Status
- Priority
- Counsellor
- Lost reason
- Created and updated timestamps

### Follow-up

Stores:

- Lead
- Scheduled date
- Notes
- Next action
- Status
- Created timestamp

## Important Edge Cases

1. Duplicate lead submission using the same email and phone is rejected.
2. Invalid phone numbers are rejected.
3. Lost leads require a lost reason.
4. Empty follow-up notes are rejected.
5. Leads can remain unassigned.
6. Multiple follow-ups can exist for the same lead.
7. Overdue pending follow-ups are identified from their scheduled date.

## Trade-offs

### SQLite

SQLite was chosen because it is simple to configure and sufficient for a prototype. A production deployment would use PostgreSQL or a similar database.

### Authentication

Authentication and role-based authorization were kept outside the prototype scope so the implementation could focus on the lead-management workflow.

### REST API

A REST API keeps the frontend and backend separated and allows future integrations.

## Future Improvements

- Role-based access control
- Audit history
- Automated reminders
- WhatsApp and CRM integrations
- Bulk import/export
- Advanced analytics
- Production database
- Automated test coverage
- CI/CD
