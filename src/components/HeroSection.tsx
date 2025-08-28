"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Star, Smile } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "./ui/button"

export default function HeroSection() {
  return (
<section className="relative bg-gradient-to-r from-gray-100 to-red-200 py-20">
  <div className="container mx-auto px-6 lg:px-12">
    <div className="flex flex-col lg:flex-row items-start justify-between gap-12">
      {/* Text Content */}
      <div className="max-w-2xl flex-1">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
          Bus Higher Purchase{" "}
          <span className="text-primary underline decoration-primary">
            Solutions
          </span>
        </h1>
        <p className="mt-6 text-lg text-gray-600">
          Annhurst Transport Service Limited provides comprehensive bus financing solutions 
          for transportation businesses. Get your fleet on the road with our flexible 
          higher purchase options.
        </p>
      <div className="flex flex-col sm:flex-row gap-4 mb-3 mt-8">
        <Link to="/services">
          <Button size="lg" className="bg-gradient-to-r from-gray-600 to-primary-light text-gray-200 hover:from-primary-dark hover:to-primary-dark">
            Explore Services
          </Button>
        </Link>
        <Link to="/contact">
          <Button variant="ghost" size="lg" className="border-2 border-primary text-primary hover:bg-primary-dark hover:text-gray-200 hover:border-none">
            Get Started
          </Button>
        </Link>
      </div> 
      </div>

      {/* Cards Row */}
      <div className="flex flex-col md:flex-row gap-6 flex-1 justify-center lg:justify-end">
        {/* Investment Success Card */}
        <Card className="w-64 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Investment Success</h3>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-primary font-semibold">High Returns</span>
              <span className="text-gray-500">Bus Investment ROI</span>
            </div>
            <Progress value={80} className="mt-3" />
          </CardContent>
        </Card>

        {/* Customer Satisfaction Card */}
        <Card className="w-64 shadow-md">
          <CardContent className="p-6 text-center">
            <div className="flex flex-col items-center gap-2">
              <Smile className="w-6 h-6 text-gray-800" />
              <h3 className="font-semibold">Customer Satisfaction</h3>
              <p className="text-3xl font-bold text-primary">98%</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>

    {/* Metrics Row */}
    <div className="mt-14 flex gap-12 text-primary font-bold text-2xl">
      <div className="text-center">4+<br />
          <span className="text-gray-600 underline decoration-primary text-xs">
            Years of excellence
          </span>
      </div>
      <div className="text-center">100% <br/>
          <span className="text-gray-600 underline decoration-primary text-xs">
              On-Time Payments
          </span>
      </div>
      <div className="text-center">24/7 <br/>
          <span className="text-gray-600 underline decoration-primary text-xs">
              Customer Support
          </span>
      </div>     
    </div>
  </div>
</section>

  )
}
