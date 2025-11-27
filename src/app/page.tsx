'use client'

import Link from 'next/link'
import { ArrowRight, Sparkles, Zap, Shield } from 'lucide-react'
import { Button } from '@/components/button'
import { Card, CardTitle, CardDescription, IconBadge } from '@/components/ui'
import { LoadingSpinner, ErrorMessage, SuccessMessage } from '@/components/ui'
import { Avatar } from '@/components/ui'
import { useFetch } from '@/hooks'

// Feature card component using shared Card and IconBadge components
function FeatureCard({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) {
  return (
    <Card>
      <IconBadge icon={Icon} className="mb-4" />
      <CardTitle className="mb-2">{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </Card>
  )
}

// Stats card using shared Card component
function StatsCard({ value, label }: { value: string, label: string }) {
  return (
    <Card>
      <div className="text-3xl font-bold text-primary-600 mb-1">{value}</div>
      <div className="text-gray-600">{label}</div>
    </Card>
  )
}

// Testimonial card using shared Card and Avatar components
function TestimonialCard({ quote, author, role }: { quote: string, author: string, role: string }) {
  return (
    <Card>
      <p className="text-gray-700 italic mb-4">&ldquo;{quote}&rdquo;</p>
      <div className="flex items-center">
        <Avatar name={author} size="md" className="mr-3" />
        <div>
          <div className="font-semibold text-gray-900">{author}</div>
          <div className="text-sm text-gray-500">{role}</div>
        </div>
      </div>
    </Card>
  )
}

export default function HomePage() {
  // Using the shared useFetch hook to eliminate duplicated fetch logic
  const { data, error, isLoading } = useFetch<{ message: string }>('/api')

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Experience the Power of <span className="text-primary-600">AI</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Harness the multimodal capabilities of Google AI Studio to build intelligent applications.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/dashboard">
              <Button variant="primary" size="lg">
                Get Started <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={Sparkles}
              title="AI-Powered"
              description="Leverage cutting-edge AI technology to enhance your workflow and productivity."
            />
            <FeatureCard
              icon={Zap}
              title="Lightning Fast"
              description="Experience blazing fast performance with our optimized infrastructure."
            />
            <FeatureCard
              icon={Shield}
              title="Secure"
              description="Your data is protected with enterprise-grade security measures."
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6">
            <StatsCard value="10K+" label="Active Users" />
            <StatsCard value="99.9%" label="Uptime" />
            <StatsCard value="50M+" label="API Calls/Day" />
            <StatsCard value="24/7" label="Support" />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">What Our Users Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="This platform has transformed how we work with AI. Absolutely incredible!"
              author="Sarah Johnson"
              role="CTO, TechCorp"
            />
            <TestimonialCard
              quote="The easiest integration I've ever done. Highly recommended!"
              author="Michael Chen"
              role="Lead Developer, StartupXYZ"
            />
            <TestimonialCard
              quote="Outstanding support team and robust API. A game changer for us."
              author="Emily Davis"
              role="Product Manager, InnovateCo"
            />
          </div>
        </div>
      </section>

      {/* API Status */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">API Status</h2>
          {isLoading && <LoadingSpinner message="Loading..." />}
          {error && <ErrorMessage message={error} />}
          {data && <SuccessMessage message={data.message} />}
        </div>
      </section>
    </main>
  )
}
