'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import PressForm from '@/components/pridally/PressForm'

export default function PressPage() {
  const router = useRouter()

  return (
    <PressForm
      onBack={() => router.push('/')}
      onGetStarted={() => router.push('/auth')}
    />
  )
}