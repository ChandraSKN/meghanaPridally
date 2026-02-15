'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import SolutionIndiPage from '@/components/pridally/solutionIndiForm';

export default function IndividualPage() {
    const router = useRouter()

    const handleBack = () => {
        router.push('/') // Go back to home page
    }

  return (
    <SolutionIndiPage onGetStarted={handleBack} />
  )
}