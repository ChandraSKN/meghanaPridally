'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import SolutionNHSPage from '@/components/pridally/solutionNHSForm'

export default function PridAllyPage() {
    const router = useRouter()

    const handleBack = () => {
        router.push('/') // Go back to home page
    }

  return (
    <SolutionNHSPage onBack={handleBack} />
  )
}