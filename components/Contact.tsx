'use client'

import { useState } from 'react'
import { createMessage } from '@/lib/messageUtils'
import MapComponent from './MapComponent'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('All fields are required')
      setIsLoading(false)
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address')
      setIsLoading(false)
      return
    }

    try {
      const { data, error: dbError } = await createMessage(formData.name, formData.email, formData.message)

      if (dbError) {
        setError('Failed to submit message. Please try again.')
        console.error('DB error:', dbError)
        setIsLoading(false)
        return
      }

      setSubmitted(true)
      setFormData({ name: '', email: '', message: '' })

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitted(false)
      }, 5000)
    } catch (err) {
      console.error('Error sending message:', err)
      setError(String(err) || 'An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Get in Touch</h2>
          <p className="text-lg text-slate-700 max-w-2xl mx-auto">
            Have a question or want to collaborate with us? Reach out to the S3 Lab team. We'd love to hear from you!
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Map */}
          <div className="rounded-2xl overflow-hidden shadow-lg h-96 lg:h-full min-h-96">
            <MapComponent />
          </div>

          {/* Right Column - Contact Form */}
          <div className="glass rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-primary mb-6">Send us a Message</h3>

            {submitted && (
              <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg border border-green-300">
                <p className="font-semibold">✓ Message sent successfully!</p>
                <p className="text-sm mt-1">We'll get back to you soon.</p>
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg border border-red-300">
                <p className="font-semibold">Error</p>
                <p className="text-sm mt-1">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  disabled={isLoading}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-colors disabled:opacity-50"
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  disabled={isLoading}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-colors disabled:opacity-50"
                />
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message..."
                  disabled={isLoading}
                  rows={5}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-colors resize-none disabled:opacity-50"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-colors duration-200"
              >
                {isLoading ? 'Sending...' : 'Send Message'}
              </button>
            </form>

            {/* Contact Info */}
            <div className="mt-8 pt-8 border-t border-white/20">
              <p className="text-sm text-slate-600 mb-4">
                <span className="font-semibold text-slate-700">📧 Email:</span> contact@s3lab.iitbhilai.ac.in
              </p>
              <p className="text-sm text-slate-600">
                <span className="font-semibold text-slate-700">📍 Location:</span> IIT Bhilai, Raipur, India
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
