'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import WhyPridallyPage from '@/components/pridally/WhyPridallyPage';

export default function WhyPridallyRoutePage() {
  const router = useRouter()

  return (
    <WhyPridallyPage onGetStarted={() => router.push('/auth')} />
  )
}
