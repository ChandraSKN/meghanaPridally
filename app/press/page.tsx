'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import PressForm from '@/components/pridally/PressForm'

export default function PridAllyPage() {
    const router = useRouter()

    const handleBack = () => {
        router.push('/') // Go back to home page
    }

  return (
    <PressForm onBack={handleBack} />
  )
}