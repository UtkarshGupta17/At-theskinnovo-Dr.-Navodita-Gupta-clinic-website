require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.SERVER_PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail address
    pass: process.env.EMAIL_PASS  // Your Gmail app password
  }
});

// Email endpoint
app.post('/send-appointment', async (req, res) => {
  console.log('=== Email Request Received ===');
  console.log('Request body:', req.body);
  
  const { name, phone, email, service, message } = req.body;

  // Check environment variables
  console.log('Environment variables:');
  console.log('EMAIL_USER:', process.env.EMAIL_USER ? 'Set' : 'Not set');
  console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? 'Set' : 'Not set');
  console.log('DOCTOR_EMAIL:', process.env.DOCTOR_EMAIL || 'Not set');

  try {
    // Email to doctor
    const doctorMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.DOCTOR_EMAIL || 'utkarshpengoriya@gmail.com', // Use environment variable
      subject: `New Appointment Request - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h2 style="color: #14b8a6; margin: 0;">theskinnovo | Dr. Navodita Gupta</h2>
            <p style="color: #666; margin: 5px 0;">New Appointment Request</p>
          </div>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #333; margin-top: 0;">Patient Details:</h3>
            <p style="margin: 8px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 8px 0;"><strong>Phone:</strong> ${phone}</p>
            <p style="margin: 8px 0;"><strong>Email:</strong> ${email || 'Not provided'}</p>
            <p style="margin: 8px 0;"><strong>Preferred Service:</strong> ${service || 'Not specified'}</p>
            ${message ? `<p style="margin: 8px 0;"><strong>Message:</strong> ${message}</p>` : ''}
          </div>
          
          <div style="background-color: #e6fffa; padding: 15px; border-radius: 8px; border-left: 4px solid #14b8a6;">
            <p style="margin: 0; color: #0d9488;"><strong>Action Required:</strong> Please contact the patient to confirm the appointment.</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
            <p style="color: #666; font-size: 12px; margin: 0;">This email was sent automatically from theskinnovo appointment form</p>
          </div>
        </div>
      `
    };

    console.log('Sending doctor email to:', process.env.DOCTOR_EMAIL || 'utkarshpengoriya@gmail.com');

    // Send doctor email
    const doctorResult = await transporter.sendMail(doctorMailOptions);
    console.log('Doctor email sent successfully:', doctorResult.messageId);

    // Confirmation email to patient (if email provided)
    let patientResult = null;
    if (email) {
      const patientMailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Appointment Request Received - theskinnovo | Dr. Navodita Gupta',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h2 style="color: #14b8a6; margin: 0;">theskinnovo | Dr. Navodita Gupta</h2>
              <p style="color: #666; margin: 5px 0;">Thank You for Your Appointment Request</p>
            </div>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #333; margin-top: 0;">Your Request Details:</h3>
              <p style="margin: 8px 0;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 8px 0;"><strong>Phone:</strong> ${phone}</p>
              <p style="margin: 8px 0;"><strong>Service:</strong> ${service || 'Not specified'}</p>
            </div>
            
            <div style="background-color: #e6fffa; padding: 15px; border-radius: 8px; border-left: 4px solid #14b8a6;">
              <p style="margin: 0; color: #0d9488;"><strong>Next Steps:</strong> Our team will contact you shortly to confirm your appointment.</p>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
              <p style="color: #666; font-size: 12px; margin: 0;">Contact us: +91 70171 27471 | Bhopal, Madhya Pradesh</p>
            </div>
          </div>
        `
      };

      console.log('Sending patient confirmation email to:', email);
      patientResult = await transporter.sendMail(patientMailOptions);
      console.log('Patient email sent successfully:', patientResult.messageId);
    }

    console.log('=== Email Request Completed Successfully ===');
    res.status(200).json({ 
      success: true, 
      message: 'Appointment request sent successfully!' 
    });

  } catch (error) {
    console.error('=== Email Error Details ===');
    console.error('Error type:', error.name);
    console.error('Error message:', error.message);
    console.error('Full error:', error);
    
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send appointment request. Please try again.',
      error: error.message 
    });
  }
});

// Serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
