'use client'

import React from 'react'
import dynamic from 'next/dynamic'

const SkylinePage = dynamic(() => import('./SkylinePage'), { ssr: false })

export function ClientOnly({ username }: { username: string }) {
	return <SkylinePage username={username} />
}