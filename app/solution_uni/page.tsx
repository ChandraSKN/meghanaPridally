'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import SolutionUniPage from '@/components/pridally/solutionUniForm'

export default function SolutionUniRoutePage() {
  const router = useRouter()

  return (
    <SolutionUniPage onGetStarted={() => router.push('/auth')} />
  )
}
