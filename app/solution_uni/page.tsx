'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import SolutionUniPage from '@/components/pridally/solutionUniForm'

export default function PridAllyPage() {
    const router = useRouter()

    const handleBack = () => {
        router.push('/') // Go back to home page
    }

  return (
    <SolutionUniPage onBack={handleBack} />
  )
}