'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import PressForm from '@/components/pridally/PressForm'

export default function PressPage() {
  const router = useRouter()

  const handleBack = () => {
    router.push('/') // or router.back()
  }

  const handleGetStarted = () => {
    router.push('/auth')
  }

  return (
    <PressForm
      onBack={handleBack}
      onGetStarted={handleGetStarted}
    />
  )
}
