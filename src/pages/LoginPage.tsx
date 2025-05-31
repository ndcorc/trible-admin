import { LoginForm } from '@/features/auth/components'

export function LoginPage() {
  return (
    <div className="space-y-6">
      <LoginForm />

      <div className="text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{' '}
          <a
            href="#"
            className="text-primary-600 hover:text-primary-500 font-medium"
          >
            Contact your administrator
          </a>
        </p>
      </div>
    </div>
  )
}
