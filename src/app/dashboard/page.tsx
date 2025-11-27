'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Home, BarChart3, Settings, Users, CreditCard, Bell, LogOut } from 'lucide-react'
import { Button } from '@/components/button'
import { Card, Badge, Avatar, ProgressBar } from '@/components/ui'
import { LoadingSpinner, ErrorMessage } from '@/components/ui'
import { useFetch } from '@/hooks'

// Sidebar link using shared styling approach
function SidebarLink({ icon: Icon, label, href, active }: { icon: React.ElementType, label: string, href: string, active?: boolean }) {
  return (
    <Link 
      href={href}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
        active 
          ? 'bg-primary-50 text-primary-600' 
          : 'text-gray-600 hover:bg-gray-50'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium">{label}</span>
    </Link>
  )
}

// Metric card using shared Card component
function MetricCard({ title, value, change, changeType }: { title: string, value: string, change: string, changeType: 'positive' | 'negative' }) {
  return (
    <Card>
      <div className="text-gray-500 text-sm mb-1">{title}</div>
      <div className="text-3xl font-bold text-gray-900 mb-2">{value}</div>
      <div className={`text-sm ${changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
        {changeType === 'positive' ? '↑' : '↓'} {change} from last month
      </div>
    </Card>
  )
}

// Activity item using shared Card component
function ActivityItem({ title, description, time }: { title: string, description: string, time: string }) {
  return (
    <Card>
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-semibold text-gray-900">{title}</h4>
        <span className="text-xs text-gray-400">{time}</span>
      </div>
      <p className="text-gray-600 text-sm">{description}</p>
    </Card>
  )
}

// Project card using shared Card, Badge, and ProgressBar components
function ProjectCard({ name, status, progress }: { name: string, status: 'active' | 'completed' | 'pending', progress: number }) {
  return (
    <Card>
      <div className="flex justify-between items-center mb-3">
        <h4 className="font-semibold text-gray-900">{name}</h4>
        <Badge variant={status}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      </div>
      <ProgressBar value={progress} />
      <div className="text-sm text-gray-500 mt-2">{progress}% complete</div>
    </Card>
  )
}

interface DashboardData {
  metrics: { revenue: string; users: string; orders: string; growth: string }
  activities: { title: string; description: string; time: string }[]
  projects: { name: string; status: 'active' | 'completed' | 'pending'; progress: number }[]
}

export default function DashboardPage() {
  // Using the shared useFetch hook for API calls
  const { isLoading: apiLoading, error: apiError } = useFetch<{ message: string }>('/api')
  
  // Local state for dashboard data (simulated)
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Simulating dashboard data fetch
    const loadDashboardData = async () => {
      try {
        setIsLoading(true)
        // Simulating API delay
        await new Promise(resolve => setTimeout(resolve, 500))
        setDashboardData({
          metrics: { revenue: '$125,430', users: '2,847', orders: '1,234', growth: '23%' },
          activities: [
            { title: 'New user signup', description: 'John Doe created an account', time: '2 min ago' },
            { title: 'Order completed', description: 'Order #1234 was delivered', time: '15 min ago' },
            { title: 'Payment received', description: 'Invoice #5678 was paid', time: '1 hour ago' },
          ],
          projects: [
            { name: 'AI Integration', status: 'active', progress: 75 },
            { name: 'Mobile App', status: 'pending', progress: 30 },
            { name: 'API v2', status: 'completed', progress: 100 },
          ]
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setIsLoading(false)
      }
    }
    loadDashboardData()
  }, [])

  const combinedError = error || apiError

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 p-4">
        <div className="mb-8">
          <h1 className="text-xl font-bold text-gray-900">AI Dashboard</h1>
        </div>
        <nav className="space-y-1">
          <SidebarLink icon={Home} label="Home" href="/" />
          <SidebarLink icon={BarChart3} label="Analytics" href="/dashboard" active />
          <SidebarLink icon={Users} label="Users" href="/dashboard" />
          <SidebarLink icon={CreditCard} label="Billing" href="/dashboard" />
          <SidebarLink icon={Settings} label="Settings" href="/dashboard" />
        </nav>
        <div className="absolute bottom-4 left-4 right-4">
          <Button variant="outline" size="sm" className="w-full">
            <LogOut className="w-4 h-4 mr-2" /> Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
            <p className="text-gray-500">Welcome back! Here&apos;s what&apos;s happening.</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50">
              <Bell className="w-5 h-5 text-gray-600" />
            </button>
            <Avatar name="John Doe" size="md" />
          </div>
        </div>

        {/* Loading/Error States using shared components */}
        {(isLoading || apiLoading) && (
          <div className="py-20">
            <LoadingSpinner message="Loading dashboard..." />
          </div>
        )}

        {combinedError && (
          <div className="mb-8">
            <ErrorMessage message={combinedError} />
          </div>
        )}

        {dashboardData && !isLoading && (
          <>
            {/* Metrics Grid */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <MetricCard title="Total Revenue" value={dashboardData.metrics.revenue} change="12%" changeType="positive" />
              <MetricCard title="Active Users" value={dashboardData.metrics.users} change="8%" changeType="positive" />
              <MetricCard title="Orders" value={dashboardData.metrics.orders} change="3%" changeType="negative" />
              <MetricCard title="Growth" value={dashboardData.metrics.growth} change="15%" changeType="positive" />
            </div>

            {/* Two Column Layout */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Recent Activity */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {dashboardData.activities.map((activity, index) => (
                    <ActivityItem key={index} {...activity} />
                  ))}
                </div>
              </div>

              {/* Projects */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Projects</h3>
                <div className="space-y-4">
                  {dashboardData.projects.map((project, index) => (
                    <ProjectCard key={index} {...project} />
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
