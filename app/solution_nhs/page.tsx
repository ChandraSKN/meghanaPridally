'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import SolutionNHSPage from '@/components/pridally/solutionNHSForm'

export default function SolutionNHSRoutePage() {
  const router = useRouter()

  return (
    <SolutionNHSPage onGetStarted={() => router.push('/auth')} />
  )
}
