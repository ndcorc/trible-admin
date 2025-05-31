import { type ReactNode } from 'react'

interface AuthLayoutProps {
  children: ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary-600 relative">
        <div className="flex flex-col justify-center px-12 text-white">
          <div className="max-w-md">
            <h1 className="text-4xl font-bold mb-6">Welcome to Admin Panel</h1>
            <p className="text-xl text-primary-100 mb-8">
              Manage your application with powerful tools and insights.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-white rounded-full" />
                <span className="text-primary-100">Real-time analytics</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-white rounded-full" />
                <span className="text-primary-100">User management</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-white rounded-full" />
                <span className="text-primary-100">Secure authentication</span>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 opacity-90" />

        {/* Decorative shapes */}
        <div className="absolute top-10 right-10 w-20 h-20 bg-white opacity-10 rounded-full" />
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-white opacity-5 rounded-full" />
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-white opacity-10 rounded-full" />
      </div>

      {/* Right side - Auth form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Admin Panel</h2>
            <p className="mt-2 text-gray-600">
              Sign in to access your dashboard
            </p>
          </div>

          {children}

          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500">
              By signing in, you agree to our Terms of Service and Privacy
              Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
