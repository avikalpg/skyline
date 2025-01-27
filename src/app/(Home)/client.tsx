'use client'

import React from 'react'
import dynamic from 'next/dynamic'

const Home = dynamic(() => import('./Home'), { ssr: false })

export function ClientOnly() {
	return <Home />
}