'use client'

import React, { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

const ClientProviders = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Toaster />
      {children}</>
  )
}

export default ClientProviders
