'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import AuthForm from '@/components/auth/AuthForm'

export default function AuthPage() {
  const router = useRouter()
  
  const handleBack = () => {
    router.push('/') // Go back to landing page
  }
  
  const handleSignUpRedirect = () => {
    router.push('/pridally') // Redirect after signup
  }
  
  const handleSignInSuccess = () => {
    router.push('/dashboard') // Redirect after successful signin
  }

  return (
    <AuthForm 
      onBack={handleBack}
      onSignUpRedirect={handleSignUpRedirect}
      onSignInSuccess={handleSignInSuccess}
    />
  )
}