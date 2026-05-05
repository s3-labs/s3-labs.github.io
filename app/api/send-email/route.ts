import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

interface ContactFormData {
  name: string
  email: string
  message: string
}

const RESEND_KEY = process.env.RESEND_API_KEY || process.env.NEXT_PUBLIC_RESEND_API_KEY || ''

export async function POST(request: NextRequest) {
  try {
    if (!RESEND_KEY) {
      console.error('Missing RESEND_API_KEY')
      return NextResponse.json({ message: 'Email service not configured' }, { status: 500 })
    }

    const body: ContactFormData = await request.json()
    const { name, email, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ message: 'Invalid email address' }, { status: 400 })
    }

    const adminEmail = 'jruchi487@gmail.com'

    // Build safe HTML string
    const html = `<!doctype html>
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #1e40af;">New Message from Contact Form</h2>
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap; background-color: white; padding: 15px; border-radius: 4px; border-left: 4px solid #1e40af;">${escapeHtml(message)}</p>
        </div>
        <p style="color: #666; font-size: 12px; margin-top: 30px;">This email was sent from the S3 Lab website contact form.</p>
      </div>`

    const resend = new Resend(RESEND_KEY)

    await resend.emails.send({
      from: 'S3 Lab Contact <onboarding@resend.dev>',
      to: adminEmail,
      subject: `New Contact Form Submission from ${escapeHtml(name)}`,
      html,
    })

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 })
  } catch (error: any) {
    console.error('API error:', error)
    const message = error?.message || 'An error occurred while sending the email'
    return NextResponse.json({ message }, { status: 500 })
  }
}

function escapeHtml(str: string) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
