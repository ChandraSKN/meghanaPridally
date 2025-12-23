'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import SafeGuardingPage from '@/components/pridally/SafeGuarding'

export default function PridAllyPage() {
    const router = useRouter()

    const handleBack = () => {
        router.push('/') // Go back to home page
    }

  return (
    <SafeGuardingPage onBack={handleBack} />
  )
}