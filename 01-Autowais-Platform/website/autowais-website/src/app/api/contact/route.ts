import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const { name, email, company, message, subject } = await req.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Create Zoho Mail transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.ZOHO_EMAIL,
        pass: process.env.ZOHO_PASSWORD,
      },
    });

    // Email content for AUTOWAIS team
    const adminEmailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #10b981, #059669); padding: 20px; border-radius: 8px 8px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
        </div>
        
        <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb;">
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #10b981; margin-top: 0;">Contact Details</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
            ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ''}
          </div>
          
          <div style="background: white; padding: 20px; border-radius: 8px;">
            <h2 style="color: #10b981; margin-top: 0;">Message</h2>
            <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background: #ecfdf5; border-radius: 8px; border-left: 4px solid #10b981;">
            <p style="margin: 0; font-size: 14px; color: #065f46;">
              <strong>Next Steps:</strong> Respond to this inquiry within 24 hours to maintain excellent customer service standards.
            </p>
          </div>
        </div>
      </div>
    `;

    // Email content for customer confirmation
    const customerEmailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #10b981, #059669); padding: 20px; border-radius: 8px 8px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">Thank You for Contacting AUTOWAIS</h1>
        </div>
        
        <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb;">
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #10b981; margin-top: 0;">Hi ${name},</h2>
            <p>Thank you for reaching out to AUTOWAIS. We've received your message and our team will review it shortly.</p>
            
            <p><strong>What happens next?</strong></p>
            <ul style="color: #374151; line-height: 1.6;">
              <li>Our team will review your inquiry within 24 hours</li>
              <li>We'll respond with either a detailed answer or schedule a consultation call</li>
              <li>For urgent matters, feel free to call us directly</li>
            </ul>
          </div>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #10b981; margin-top: 0;">Your Message Summary:</h3>
            <p><strong>Subject:</strong> ${subject || 'General Inquiry'}</p>
            <p><strong>Message:</strong></p>
            <p style="background: #f3f4f6; padding: 15px; border-radius: 4px; white-space: pre-wrap;">${message}</p>
          </div>
          
          <div style="background: white; padding: 20px; border-radius: 8px; text-align: center;">
            <h3 style="color: #10b981; margin-top: 0;">About AUTOWAIS</h3>
            <p>We're your complete technology solutions partner, transforming businesses through innovative technology. From complex integrations to cutting-edge innovations, we deliver results that drive real growth.</p>
            
            <div style="margin-top: 20px;">
              <a href="mailto:karl.hallis@autowais.com" style="color: #10b981; text-decoration: none; margin: 0 10px;">📧 karl.hallis@autowais.com</a>
              <span style="color: #6b7280;">|</span>
              <a href="https://autowais.com" style="color: #10b981; text-decoration: none; margin: 0 10px;">🌐 www.autowais.com</a>
            </div>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px;">
          <p>© 2024 AUTOWAIS. All rights reserved.</p>
        </div>
      </div>
    `;

    // Send email to AUTOWAIS team
    const adminMailOptions = {
      from: `"AUTOWAIS Contact Form" <${process.env.ZOHO_EMAIL}>`,
      to: process.env.ZOHO_EMAIL,
      subject: `New Contact: ${subject || 'General Inquiry'} - ${name}`,
      html: adminEmailContent,
      replyTo: email,
    };

    // Send confirmation email to customer
    const customerMailOptions = {
      from: `"AUTOWAIS" <${process.env.ZOHO_EMAIL}>`,
      to: email,
      subject: 'Thank you for contacting AUTOWAIS - We\'ll be in touch soon!',
      html: customerEmailContent,
    };

    // Send both emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(customerMailOptions);

    return NextResponse.json(
      { 
        message: 'Contact form submitted successfully! We\'ll be in touch within 24 hours.',
        success: true 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to send message. Please try again or contact us directly.',
        success: false 
      },
      { status: 500 }
    );
  }
} 