'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import PridAllyForm from '@/components/auth/PridAllyForm'
export default function PridAllyPage() {
  const router = useRouter()
  
  const handleBack = () => {
    router.push('/auth') // Go back to auth page
  }
  
  return (
    <PridAllyForm
      onBack={handleBack}
      onPrydAccess={() => router.push('/gender_identity?pathway=pryd')}
      onAllyAccess={() => router.push('/gender_identity?pathway=ally')}
    />
  )
}