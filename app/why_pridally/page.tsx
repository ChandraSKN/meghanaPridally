'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import WhyPridallyPage from '@/components/pridally/WhyPridallyPage';

export default function PridAllyPage() {
    const router = useRouter()

    const handleBack = () => {
        router.push('/') // Go back to home page
    }

  return (
    <WhyPridallyPage onGetStarted={handleBack} />
  )
}