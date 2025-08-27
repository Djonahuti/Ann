import { useState } from 'react'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    service: 'higher-purchase'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      toast("Message sent successfully!\nWe'll get back to you within 24 hours.")
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: '',
        service: 'higher-purchase'
      })
      setIsSubmitting(false)
    }, 1000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="bg-white playfair-display">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-gray-100 to-red-200">
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Contact <span className='text-primary'>Us</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-800 max-w-3xl mx-auto">
              Ready to expand your bus fleet? Get in touch with our team today and 
              discover how we can help you grow your transportation business.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Form & Info */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">
                Send us a message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-2"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="company">Company Name</Label>
                    <Input
                      id="company"
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={handleChange}
                      className="mt-2"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="service">Service of Interest</Label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-primary focus:outline-none focus:ring-primary"
                  >
                    <option value="higher-purchase">Bus Higher Purchase</option>
                    <option value="fleet-management">Fleet Management</option>
                    <option value="consulting">Business Consulting</option>
                    <option value="other">Other Services</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="mt-2"
                    placeholder="Tell us about your bus financing needs..."
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">
                Get in touch
              </h2>
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Phone</h3>
                    <p className="mt-2 text-gray-600">
                      <a href="tel:+2341234567890" className="hover:text-primary">
                        +234 809 318 3556
                      </a>
                    </p>
                    <p className="text-gray-600">
                      <a href="tel:+2349876543210" className="hover:text-primary">
                        +234 816 746 2350
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Email</h3>
                    <p className="mt-2 text-gray-600">
                      <a href="mailto:info@annhurstglobal.com" className="hover:text-primary">
                        customerservices@annhurst-gsl.com
                      </a>
                    </p>
                    <p className="text-gray-600">
                      <a href="mailto:sales@annhurstglobal.com" className="hover:text-primary">
                        Info@annhurst-gsl.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Office Address</h3>
                    <p className="mt-2 text-gray-600">
                      13B Obafemi Anibaba<br />
                      Admiralty Way Lekki<br />
                      Lagos, Nigeria
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Business Hours</h3>
                    <p className="mt-2 text-gray-600">
                      Monday - Friday: 8:00 AM - 6:00 PM<br />
                      Saturday: 9:00 AM - 2:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Contact */}
              <div className="mt-12 p-6 bg-gray-50 rounded-2xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Need immediate assistance?
                </h3>
                <p className="text-gray-600 mb-4">
                  Our customer support team is available to help you with urgent inquiries 
                  and quick questions about our services.
                </p>
                <div className="flex space-x-4">
                  <Button className="flex-1 bg-primary text-gray-200 hover:bg-primary-dark">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Now
                  </Button>
                  <Button variant="outline" className="flex-1 border-primary text-primary hover:bg-primary-light hover:text-gray-200">
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center mb-16">
            <h2 className="text-base font-semibold leading-7 text-primary">Find Us</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Visit our office
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Located in the heart of Lagos business district, our office is easily 
              accessible and ready to welcome you.
            </p>
          </div>
          
          {/* Placeholder for map */}
          <div className="aspect-[16/9] rounded-2xl overflow-hidden shadow-lg">
            <iframe
              title="AnnHurst Global Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15858.389721507043!2d3.437834379081!3d6.4457033684787985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf4f9137e9329%3A0xfcc2ef66eb8f604b!2s13B%20Obafemi%20Anibaba%20St%2C%20Island%2C%20Lagos%20105102%2C%20Lagos!5e0!3m2!1sen!2sng!4v1756320380727!5m2!1sen!2sng"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center mb-16">
            <h2 className="text-base font-semibold leading-7 text-primary">FAQ</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Frequently asked questions
            </p>
          </div>
          
          <div className="mx-auto max-w-4xl">
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  What documents do I need to apply for bus financing?
                </h3>
                <p className="text-gray-600">
                  You'll need your business registration documents, financial statements, 
                  driver's license, and proof of income. Our team will provide a complete 
                  checklist during your initial consultation.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  How long does the approval process take?
                </h3>
                <p className="text-gray-600">
                  Typically, we can provide approval within 2-3 business days for complete 
                  applications. The entire process from application to funding usually takes 
                  1-2 weeks.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  What types of buses do you finance?
                </h3>
                <p className="text-gray-600">
                  We finance all types of buses including minibuses, coaches, school buses, 
                  and luxury buses. We work with both new and used vehicles from reputable manufacturers.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Do you offer refinancing options?
                </h3>
                <p className="text-gray-600">
                  Yes, we offer refinancing solutions for existing bus loans. This can help 
                  you get better rates or more favorable terms. Contact us to discuss your options.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 