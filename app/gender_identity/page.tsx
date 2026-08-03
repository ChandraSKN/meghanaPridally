'use client'

import React, { Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import GenderIdentityForm from '@/components/pridally/GenderIdentityForm'

function GenderIdentityPageInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathwayType = searchParams.get('pathway') === 'ally' ? 'ally' : 'pryd'

  const handleBack = () => {
    router.push('/pridally') // Go back to pathway selection
  }

  const handleFormComplete = () => {
    router.push('/dashboard')
  }

  return (
    <GenderIdentityForm
      onBack={handleBack}
      pathwayType={pathwayType}
      onComplete={handleFormComplete}
    />
  )
}

export default function GenderIdentityPage() {
  return (
    <Suspense fallback={null}>
      <GenderIdentityPageInner />
    </Suspense>
  )
}
