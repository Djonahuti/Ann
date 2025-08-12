import { Link } from 'react-router-dom'
import { Bus, Shield, Clock, Users, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Bus Higher Purchase
              <span className="block text-blue-200">Solutions</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-blue-100 max-w-3xl mx-auto">
              Annhurst Global Service Limited provides comprehensive bus financing solutions 
              for transportation businesses. Get your fleet on the road with our flexible 
              higher purchase options.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link to="/services">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  Explore Services
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Why Choose Us</h2>
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
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <Shield className="h-5 w-5 flex-none text-blue-600" aria-hidden="true" />
                  Secure Financing
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Our secure financing options ensure you get the best rates while maintaining 
                    financial stability for your business.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <Clock className="h-5 w-5 flex-none text-blue-600" aria-hidden="true" />
                  Quick Approval
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Fast approval process with minimal documentation requirements. 
                    Get your buses on the road in record time.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <Users className="h-5 w-5 flex-none text-blue-600" aria-hidden="true" />
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
            <h2 className="text-base font-semibold leading-7 text-blue-600">Our Services</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Comprehensive bus financing solutions
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-900/5 p-8">
                <div className="flex items-center gap-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                    <Bus className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold leading-7 text-gray-900">Higher Purchase</h3>
                </div>
                <p className="mt-4 text-base leading-7 text-gray-600">
                  Flexible higher purchase agreements with competitive interest rates. 
                  Own your buses while maintaining cash flow for operations.
                </p>
                <div className="mt-6">
                  <Link to="/services" className="text-blue-600 hover:text-blue-500 font-medium">
                    Learn more →
                  </Link>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-900/5 p-8">
                <div className="flex items-center gap-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-600">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold leading-7 text-gray-900">Fleet Management</h3>
                </div>
                <p className="mt-4 text-base leading-7 text-gray-600">
                  Comprehensive fleet management services including maintenance scheduling, 
                  insurance, and operational support.
                </p>
                <div className="mt-6">
                  <Link to="/services" className="text-green-600 hover:text-green-500 font-medium">
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
                <dd className="order-first text-3xl font-bold tracking-tight text-gray-900">500+</dd>
              </div>
              <div className="flex flex-col bg-gray-400/5 p-8">
                <dt className="text-sm font-semibold leading-6 text-gray-600">Happy Clients</dt>
                <dd className="order-first text-3xl font-bold tracking-tight text-gray-900">200+</dd>
              </div>
              <div className="flex flex-col bg-gray-400/5 p-8">
                <dt className="text-sm font-semibold leading-6 text-gray-600">Years Experience</dt>
                <dd className="order-first text-3xl font-bold tracking-tight text-gray-900">15+</dd>
              </div>
              <div className="flex flex-col bg-gray-400/5 p-8">
                <dt className="text-sm font-semibold leading-6 text-gray-600">Success Rate</dt>
                <dd className="order-first text-3xl font-bold tracking-tight text-gray-900">98%</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to expand your fleet?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-blue-100">
              Get in touch with our team today and discover how we can help you 
              grow your transportation business.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link to="/contact">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  Contact Us
                </Button>
              </Link>
              <Link to="/services">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
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