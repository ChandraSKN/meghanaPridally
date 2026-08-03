'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import SolutionIndiPage from '@/components/pridally/solutionIndiForm';

export default function SolutionIndividualPage() {
  const router = useRouter()

  return (
    <SolutionIndiPage onGetStarted={() => router.push('/auth')} />
  )
}
