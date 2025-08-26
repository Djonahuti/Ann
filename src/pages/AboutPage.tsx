import { Bus, Target, Eye, Users, Award, Globe } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className='playfair-display'>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-gray-100 to-red-200">
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              About <span className='text-primary'>Annhurst Transport</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-800 max-w-3xl mx-auto">
              Leading the way in bus higher purchase solutions across Nigeria and beyond
            </p>
          </div>
        </div>
      </div>

      {/* Company Story */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                  Our Story
                </h2>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Founded with a vision to democratize investment opportunities in Nigeria, Annhurst Global Services Limited has been at the forefront of providing accessible, profitable investment options for individuals and businesses across the country.
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  With over 4 years of proven excellence, we have built a reputation for reliability, transparency, and consistent returns. Our expertise spans across transportation, real estate, and business expansion sectors, making us your one-stop solution for investment opportunities.
                </p>
              </div>
              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl bg-gray-900/5 object-cover">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-text-primary/20 to-blue-800/20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Bus className="w-32 h-32 text-primary" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Our Purpose</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Driving growth in transportation
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
              <div className="flex flex-col">
                <div className="flex items-center gap-x-3 mb-4">
                  <Target className="h-8 w-8 text-primary" />
                  <h3 className="text-xl font-semibold text-gray-900">Our Mission</h3>
                </div>
                <p className="text-lg leading-8 text-gray-600">
                  To provide accessible, reliable, and innovative financing solutions that 
                  empower transportation businesses to grow their fleets and expand their 
                  operations, contributing to economic development across Nigeria.
                </p>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-x-3 mb-4">
                  <Eye className="h-8 w-8 text-primary" />
                  <h3 className="text-xl font-semibold text-gray-900">Our Vision</h3>
                </div>
                <p className="text-lg leading-8 text-gray-600">
                  To be the leading provider of transportation financing solutions in West Africa, 
                  recognized for our innovation, reliability, and commitment to customer success.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Our Values</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              The principles that guide us
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-text-primary mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold leading-7 text-gray-900">Customer First</h3>
                <p className="mt-4 text-base leading-7 text-gray-600">
                  We put our customers at the heart of everything we do, ensuring their 
                  success is our priority.
                </p>
              </div>
              <div className="flex flex-col">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-text-primary mb-4">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold leading-7 text-gray-900">Excellence</h3>
                <p className="mt-4 text-base leading-7 text-gray-600">
                  We strive for excellence in all aspects of our business, from customer 
                  service to financial solutions.
                </p>
              </div>
              <div className="flex flex-col">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-text-primary mb-4">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold leading-7 text-gray-900">Innovation</h3>
                <p className="mt-4 text-base leading-7 text-gray-600">
                  We continuously innovate our services to meet the evolving needs of 
                  the transportation industry.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Our Team</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Meet the experts behind our success
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our team of experienced professionals brings together decades of expertise 
              in transportation finance, customer service, and business development.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto h-32 w-32 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                  <Users className="h-16 w-16 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Management Team</h3>
                <p className="text-gray-600">Strategic leadership and vision</p>
              </div>
              <div className="text-center">
                <div className="mx-auto h-32 w-32 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                  <Users className="h-16 w-16 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Finance Experts</h3>
                <p className="text-gray-600">Specialized in transportation financing</p>
              </div>
              <div className="text-center">
                <div className="mx-auto h-32 w-32 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                  <Users className="h-16 w-16 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Customer Support</h3>
                <p className="text-gray-600">Dedicated to your success</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Our impact in numbers
              </h2>
            </div>
            <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col bg-gray-400/5 p-8">
                <dt className="text-sm font-semibold leading-6 text-gray-600">Years in Business</dt>
                <dd className="order-first text-3xl font-bold tracking-tight text-primary">4+</dd>
              </div>
              <div className="flex flex-col bg-gray-400/5 p-8">
                <dt className="text-sm font-semibold leading-6 text-gray-600">Buses Financed</dt>
                <dd className="order-first text-3xl font-bold tracking-tight text-primary">500+</dd>
              </div>
              <div className="flex flex-col bg-gray-400/5 p-8">
                <dt className="text-sm font-semibold leading-6 text-gray-600">Satisfied Clients</dt>
                <dd className="order-first text-3xl font-bold tracking-tight text-primary">200+</dd>
              </div>
              <div className="flex flex-col bg-gray-400/5 p-8">
                <dt className="text-sm font-semibold leading-6 text-gray-600">Team Members</dt>
                <dd className="order-first text-3xl font-bold tracking-tight text-primary">25+</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
} 