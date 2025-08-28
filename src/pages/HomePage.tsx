import { Link } from 'react-router-dom'
import { Bus, Shield, Clock, Users, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import HeroSection from '@/components/HeroSection'

export default function HomePage() {
  return (
    <div className="playfair-display">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary-light">Why Choose Us</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need for your bus fleet
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We understand the challenges of running a transportation business. That's why we've 
              designed our services to be flexible, reliable, and tailored to your needs.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:rounded-lg hover:p-4">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <Shield className="h-5 w-5 flex-none text-primary" aria-hidden="true" />
                  Secure Financing
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Our secure financing options ensure you get the best rates while maintaining 
                    financial stability for your business.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:rounded-lg hover:p-4">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <Clock className="h-5 w-5 flex-none text-primary" aria-hidden="true" />
                  Quick Approval
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Fast approval process with minimal documentation requirements. 
                    Get your buses on the road in record time.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:rounded-lg hover:p-4">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <Users className="h-5 w-5 flex-none text-primary" aria-hidden="true" />
                  Expert Support
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Our team of transportation finance experts is here to guide you 
                    through every step of the process.
                  </p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Services Overview */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Our Services</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Comprehensive bus financing solutions
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-900/5 p-8 transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:border-2 hover:border-primary">
                <div className="flex items-center gap-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                    <Bus className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold leading-7 text-gray-900">Higher Purchase</h3>
                </div>
                <p className="mt-4 text-base leading-7 text-gray-600">
                  Flexible higher purchase agreements with competitive interest rates. 
                  Own your buses while maintaining cash flow for operations.
                </p>
                <div className="mt-6">
                  <Link to="/services" className="text-primary hover:text-primary-dark font-medium">
                    Learn more →
                  </Link>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-900/5 p-8 transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:border-2 hover:border-primary">
                <div className="flex items-center gap-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold leading-7 text-gray-900">Fleet Management</h3>
                </div>
                <p className="mt-4 text-base leading-7 text-gray-600">
                  Comprehensive fleet management services including maintenance scheduling, 
                  insurance, and operational support.
                </p>
                <div className="mt-6">
                  <Link to="/services" className="text-primary hover:text-primary-dark font-medium">
                    Learn more →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Trusted by transportation businesses
              </h2>
              <p className="mt-4 text-lg leading-8 text-gray-600">
                Join hundreds of successful companies who have grown their fleet with us
              </p>
            </div>
            <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col bg-gray-400/5 p-8">
                <dt className="text-sm font-semibold leading-6 text-gray-600">Buses Financed</dt>
                <dd className="order-first text-3xl font-bold tracking-tight text-primary">500+</dd>
              </div>
              <div className="flex flex-col bg-gray-400/5 p-8">
                <dt className="text-sm font-semibold leading-6 text-gray-600">Happy Clients</dt>
                <dd className="order-first text-3xl font-bold tracking-tight text-primary">200+</dd>
              </div>
              <div className="flex flex-col bg-gray-400/5 p-8">
                <dt className="text-sm font-semibold leading-6 text-gray-600">Years Experience</dt>
                <dd className="order-first text-3xl font-bold tracking-tight text-primary">4+</dd>
              </div>
              <div className="flex flex-col bg-gray-400/5 p-8">
                <dt className="text-sm font-semibold leading-6 text-gray-600">Success Rate</dt>
                <dd className="order-first text-3xl font-bold tracking-tight text-primary">98%</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-gray-600 to-primary-light shimmer-effect">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to expand your fleet?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-red-100">
              Get in touch with our team today and discover how we can help you 
              grow your transportation business.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link to="/contact">
                <Button size="lg" className="bg-gradient-to-r from-gray-600 to-primary-light text-gray-200 hover:from-white hover:to-white hover:text-primary transform transition duration-300 ease-in-out hover:scale-105">
                  Contact Us
                </Button>
              </Link>
              <Link to="/services">
                <Button variant="ghost" size="lg" className="border-2 border-white text-gray-200 hover:bg-white hover:text-primary hover:border-none transform transition duration-300 ease-in-out hover:scale-105">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 