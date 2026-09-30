'use client'

import { useState } from 'react';
import { Send, CheckCircle2, MessageSquare } from 'lucide-react';

export function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('Tool Suggestion');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert('Please fill out all required fields.');
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-moss-500/10 text-moss-600 text-xs font-bold">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Get in Touch</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-ink">
          Contact the WrenchlyTools Team
        </h1>
        <p className="text-sm text-stone-600 max-w-lg mx-auto">
          Have a tool recommendation, bug report, or partnership inquiry? We&apos;d love to hear from you.
        </p>
      </div>

      <div className="p-8 rounded-3xl bg-white border border-line shadow-sm">
        {submitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-ink">Message Received!</h3>
            <p className="text-xs text-stone-600 max-w-sm mx-auto">
              Thank you for reaching out, {name}. Our engineering and product team will review your message shortly.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setMessage('');
              }}
              className="px-4 py-2 bg-moss-500 text-white text-xs font-bold rounded-xl"
            >
              Send Another Note
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-name" className="block text-xs font-semibold text-stone-600 mb-1">
                  Your Name *
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Vance"
                  className="w-full px-3 py-2 text-sm rounded-xl border border-line bg-stone-50"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-xs font-semibold text-stone-600 mb-1">
                  Email Address *
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@example.com"
                  className="w-full px-3 py-2 text-sm rounded-xl border border-line bg-stone-50"
                />
              </div>
            </div>

            <div>
              <label htmlFor="contact-category" className="block text-xs font-semibold text-stone-600 mb-1">
                Subject Category
              </label>
              <select
                id="contact-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-line bg-stone-50"
              >
                <option value="Tool Suggestion">Suggest a New Tool</option>
                <option value="Bug Report">Report a Bug / Glitch</option>
                <option value="Feedback">General Feedback</option>
                <option value="Partnership">Partnership &amp; Inquiries</option>
              </select>
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-xs font-semibold text-stone-600 mb-1">
                Your Message *
              </label>
              <textarea
                id="contact-message"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                placeholder="Describe your suggestion or feedback in detail..."
                className="w-full p-3 text-sm rounded-xl border border-line bg-stone-50"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-moss-500 hover:bg-moss-600 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
