# theskinnovo | Dr. Navodita Gupta - Email Setup

## Email Functionality

The application includes a backend server that sends emails when users fill out the appointment form:

- **Doctor Notification**: Email sent to the doctor with patient details
- **Patient Confirmation**: Optional confirmation email to the patient (if email provided)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Email Settings

Create a `.env` file in the root directory:

```env
# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
DOCTOR_EMAIL=doctor@theskinnovo.com

# Server Configuration
PORT=5000
```

**Important**: You need to:
1. Use a Gmail account for `EMAIL_USER`
2. Generate an App Password for Gmail (not your regular password):
   - Go to Google Account settings
   - Enable 2-factor authentication
   - Generate an App Password for "Mail"
   - Use this App Password for `EMAIL_PASS`

### 3. Run the Application

**Development Mode (both frontend and backend):**
```bash
npm run dev
```

**Separate terminals:**
```bash
# Terminal 1 - Backend server
npm run server

# Terminal 2 - Frontend
npm start
```

### 4. Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Available Scripts

### `npm start`
Runs the React app in development mode on http://localhost:3000

### `npm run server`
Runs the Express backend server on http://localhost:5000

### `npm run dev`
Runs both frontend and backend simultaneously

### `npm run build`
Builds the React app for production

### `npm test`
Launches the test runner

## Email Endpoints

### POST `/send-appointment`

Sends appointment request emails.

**Request Body:**
```json
{
  "name": "Patient Name",
  "phone": "1234567890",
  "email": "patient@email.com",
  "service": "Chemical Peel",
  "message": "Additional message"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Appointment request sent successfully!"
}
```

## Deployment

For production deployment:

1. Set production environment variables
2. Build the React app: `npm run build`
3. Deploy the backend server (Heroku, Vercel, etc.)
4. Update the frontend API URL to your production server

## Technologies Used

- React 19
- TypeScript
- Tailwind CSS
- Express.js
- Nodemailer
- Lucide React Icons

## Support

For issues or questions, please contact the development team.
