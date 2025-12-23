'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import PridAllyForm from '@/components/pridally/PridAllyForm'

export default function PridAllyPage() {
  const router = useRouter()
  
  const handleBack = () => {
    router.push('/auth') // Go back to auth page
  }
  
  const handleFormComplete = () => {
    router.push('/gender_identity') // Redirect to gender confirmation after form completion
  }

  return (
    <PridAllyForm 
      onBack={handleBack}
      onPrydAccess={handleFormComplete}
      onAllyAccess={handleFormComplete}
    />
  )
}