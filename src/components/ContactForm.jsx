import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    _honeypot: "",
  })
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null)
  const [message, setMessage] = useState("")

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus(null)
    setMessage("")

    // Basic honeypot check for spam prevention
    if (formData._honeypot) {
      setMessage("Spam detected! Your message was not sent.")
      setStatus("error")
      setLoading(false)
      return
    }

    try {
      // Using Resend API directly (client-side)
      // Note: In production, you should use a Supabase Edge Function to keep API key secure
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: import.meta.env.VITE_CONTACT_FORM_FROM_EMAIL,
          to: import.meta.env.VITE_CONTACT_FORM_TO_EMAIL,
          subject: `New Contact from ${formData.name}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${formData.name}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Subject:</strong> ${formData.subject}</p>
            <p><strong>Message:</strong></p>
            <p>${formData.message}</p>
          `
        })
      })

      if (response.ok) {
        setStatus("success")
        setMessage("Your message has been sent successfully!")
        setFormData({ name: "", email: "", subject: "", message: "", _honeypot: "" })
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      setStatus("error")
      setMessage("An unexpected error occurred. Please try again later.")
      console.error("Contact form submission error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-base font-medium text-foreground mb-2">
          Name
        </label>
        <Input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Your Name"
          disabled={loading}
          className="transition-all duration-200 ease-in-out
                     border-b-2 border-transparent focus:border-primary
                     hover:border-primary/70 hover:bg-muted/30 focus:bg-muted/50 focus:ring-0"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-base font-medium text-foreground mb-2">
          Email
        </label>
        <Input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="your@email.com"
          disabled={loading}
          className="transition-all duration-200 ease-in-out
                     border-b-2 border-transparent focus:border-primary
                     hover:border-primary/70 hover:bg-muted/30 focus:bg-muted/50 focus:ring-0"
        />
      </div>
      <div>
        <label htmlFor="subject" className="block text-base font-medium text-foreground mb-2">
          Subject
        </label>
        <Input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Subject of your message"
          disabled={loading}
          className="transition-all duration-200 ease-in-out
                     border-b-2 border-transparent focus:border-primary
                     hover:border-primary/70 hover:bg-muted/30 focus:bg-muted/50 focus:ring-0"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-base font-medium text-foreground mb-2">
          Message
        </label>
        <Textarea
          id="message"
          name="message"
          rows={6}
          value={formData.message}
          onChange={handleChange}
          required
          placeholder="Your message here..."
          disabled={loading}
          className="transition-all duration-200 ease-in-out
                     border-b-2 border-transparent focus:border-primary
                     hover:border-primary/70 hover:bg-muted/30 focus:bg-muted/50 focus:ring-0"
        />
      </div>

      {/* Honeypot field for basic spam protection (hidden from users) */}
      <input
        type="text"
        name="_honeypot"
        value={formData._honeypot}
        onChange={handleChange}
        style={{ display: "none" }}
        aria-hidden="true"
        tabIndex={-1}
        autoComplete="off"
      />

      <Button type="submit" size="lg" className="w-full" disabled={loading}>
        {loading ? "Sending..." : "Send Message"}
        <Send className="h-5 w-5 ml-2" />
      </Button>

      {/* Display status message based on the 'status' state */}
      {status && (
        <p
          className={`mt-4 text-center ${
            status === "success" ? "text-green-500" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  )
}
