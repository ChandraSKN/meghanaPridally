'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import GenderIdentityForm from '@/components/pridally/GenderIdentityForm'

export default function PridAllyPage() {
  const router = useRouter()
  
  const handleBack = () => {
    router.push('/gender_identity') // Go back to gender identity page
  }
  
  const handleFormComplete = () => {
    router.push('/dashboard') // Redirect to dashboard after form completion
  }

  return (
    <GenderIdentityForm 
      onBack={handleBack}
      onComplete={handleFormComplete}
    />
  )
}