import { Bus, Calculator, Shield, Clock, Users, TrendingUp, FileText, Headphones } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

export default function ServicesPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Our Services
            </h1>
            <p className="mt-6 text-lg leading-8 text-blue-100 max-w-3xl mx-auto">
              Comprehensive bus financing solutions designed to help your transportation 
              business grow and succeed
            </p>
          </div>
        </div>
      </div>

      {/* Main Services */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600">What We Offer</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Complete financing solutions
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              From initial consultation to final payment, we provide end-to-end support 
              for all your bus financing needs.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {/* Higher Purchase */}
              <div className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-900/5 p-8">
                <div className="flex items-center gap-x-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600">
                    <Bus className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold leading-7 text-gray-900">Higher Purchase</h3>
                </div>
                <p className="text-base leading-7 text-gray-600 mb-6">
                  Our flagship service offering flexible higher purchase agreements for buses 
                  of all sizes and types. Perfect for businesses looking to expand their fleet 
                  while maintaining operational cash flow.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-x-3">
                    <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                    <span className="text-sm text-gray-600">Competitive interest rates</span>
                  </li>
                  <li className="flex items-center gap-x-3">
                    <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                    <span className="text-sm text-gray-600">Flexible payment terms</span>
                  </li>
                  <li className="flex items-center gap-x-3">
                    <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                    <span className="text-sm text-gray-600">Quick approval process</span>
                  </li>
                  <li className="flex items-center gap-x-3">
                    <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                    <span className="text-sm text-gray-600">No hidden fees</span>
                  </li>
                </ul>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">From 12% APR</span>
                  <Link to="/contact">
                    <Button>Get Started</Button>
                  </Link>
                </div>
              </div>

              {/* Fleet Management */}
              <div className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-900/5 p-8">
                <div className="flex items-center gap-x-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-600">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold leading-7 text-gray-900">Fleet Management</h3>
                </div>
                <p className="text-base leading-7 text-gray-600 mb-6">
                  Comprehensive fleet management services to help you optimize operations, 
                  reduce costs, and maximize the value of your bus fleet investment.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-x-3">
                    <div className="h-2 w-2 rounded-full bg-green-600"></div>
                    <span className="text-sm text-gray-600">Maintenance scheduling</span>
                  </li>
                  <li className="flex items-center gap-x-3">
                    <div className="h-2 w-2 rounded-full bg-green-600"></div>
                    <span className="text-sm text-gray-600">Insurance management</span>
                  </li>
                  <li className="flex items-center gap-x-3">
                    <div className="h-2 w-2 rounded-full bg-green-600"></div>
                    <span className="text-sm text-gray-600">Performance tracking</span>
                  </li>
                  <li className="flex items-center gap-x-3">
                    <div className="h-2 w-2 rounded-full bg-green-600"></div>
                    <span className="text-sm text-gray-600">Cost optimization</span>
                  </li>
                </ul>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">Custom Pricing</span>
                  <Link to="/contact">
                    <Button variant="outline">Learn More</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600">How It Works</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Simple 4-step process
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 mb-4">
                  <span className="text-xl font-bold text-white">1</span>
                </div>
                <h3 className="text-lg font-semibold leading-7 text-gray-900">Application</h3>
                <p className="mt-4 text-base leading-7 text-gray-600">
                  Submit your application with basic business information and requirements
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 mb-4">
                  <span className="text-xl font-bold text-white">2</span>
                </div>
                <h3 className="text-lg font-semibold leading-7 text-gray-900">Review</h3>
                <p className="mt-4 text-base leading-7 text-gray-600">
                  Our team reviews your application and conducts necessary assessments
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 mb-4">
                  <span className="text-xl font-bold text-white">3</span>
                </div>
                <h3 className="text-lg font-semibold leading-7 text-gray-900">Approval</h3>
                <p className="mt-4 text-base leading-7 text-gray-600">
                  Receive approval and finalize terms of your financing agreement
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 mb-4">
                  <span className="text-xl font-bold text-white">4</span>
                </div>
                <h3 className="text-lg font-semibold leading-7 text-gray-900">Funding</h3>
                <p className="mt-4 text-base leading-7 text-gray-600">
                  Get your buses and start growing your transportation business
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Why Choose Us</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Benefits that set us apart
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600 mb-4">
                  <Calculator className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold leading-7 text-gray-900">Competitive Rates</h3>
                <p className="mt-4 text-base leading-7 text-gray-600">
                  We offer some of the most competitive interest rates in the industry, 
                  helping you save money on your financing.
                </p>
              </div>
              <div className="flex flex-col">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600 mb-4">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold leading-7 text-gray-900">Fast Processing</h3>
                <p className="mt-4 text-base leading-7 text-gray-600">
                  Our streamlined process ensures quick approval and funding, so you can 
                  get your buses on the road faster.
                </p>
              </div>
              <div className="flex flex-col">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600 mb-4">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold leading-7 text-gray-900">Secure & Reliable</h3>
                <p className="mt-4 text-base leading-7 text-gray-600">
                  Your financial information is protected with bank-level security, 
                  and our services are backed by years of experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Services */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Additional Support</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              We're here to help you succeed
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-900/5 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600 mb-4">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold leading-7 text-gray-900">Documentation Support</h3>
                <p className="mt-4 text-base leading-7 text-gray-600">
                  We help you gather and organize all necessary documents for a smooth 
                  application process.
                </p>
              </div>
              <div className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-900/5 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600 mb-4">
                  <Headphones className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold leading-7 text-gray-900">24/7 Support</h3>
                <p className="mt-4 text-base leading-7 text-gray-600">
                  Our customer support team is available around the clock to answer 
                  your questions and provide assistance.
                </p>
              </div>
              <div className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-900/5 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600 mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold leading-7 text-gray-900">Business Consulting</h3>
                <p className="mt-4 text-base leading-7 text-gray-600">
                  Get expert advice on fleet expansion, route optimization, and business 
                  growth strategies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to get started?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-blue-100">
              Contact our team today to discuss your bus financing needs and discover 
              how we can help you grow your transportation business.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link to="/contact">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  Contact Us
                </Button>
              </Link>
              <Link to="/about">
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