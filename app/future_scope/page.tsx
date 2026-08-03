'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import FutureScopePage from '@/components/pridally/FutureScope'

export default function FutureScopeRoutePage() {
  const router = useRouter()

  return (
    <FutureScopePage onGetStarted={() => router.push('/auth')} />
  )
}
