'use client'

import React, { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import LandingPage from '@/components/landing/LandingPage'
import AuthForm from '@/components/auth/AuthForm'
import PridAllyForm from '@/components/auth/PridAllyForm'
import GenderIdentityForm from '@/components/auth/GenderIdentityForm'
import Dashboard from '@/components/dashboard/Dashboard'

export default function HomePage() {
  const { isAuthenticated } = useAuth()
  const [showAuth, setShowAuth] = useState(false)
  const [showPridAlly, setShowPridAlly] = useState(false)
  const [showGenderIdentity, setShowGenderIdentity] = useState(false)
  const [pathwayType, setPathwayType] = useState<'pryd' | 'ally'>('pryd')

  if (isAuthenticated) {
    return <Dashboard />
  }

  if (showGenderIdentity) {
    return <GenderIdentityForm 
      onBack={() => setShowGenderIdentity(false)} 
      pathwayType={pathwayType}
    />
  }

  if (showPridAlly) {
    return <PridAllyForm 
      onBack={() => setShowPridAlly(false)} 
      onPrydAccess={() => {
        setPathwayType('pryd')
        setShowGenderIdentity(true)
      }}
      onAllyAccess={() => {
        setPathwayType('ally')
        setShowGenderIdentity(true)
      }}
    />
  }

  if (showAuth) {
    return <AuthForm 
      onBack={() => setShowAuth(false)} 
      onSignUpRedirect={() => setShowPridAlly(true)}
    />
  }

  return <LandingPage onGetStarted={() => setShowAuth(true)} />
}
