'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import SafeGuardingPage from '@/components/pridally/SafeGuarding'

export default function SafeguardingPage() {
  const router = useRouter()

  return (
    <SafeGuardingPage
      onBack={() => router.push('/')}
      onGetStarted={() => router.push('/auth')}
    />
  )
}
