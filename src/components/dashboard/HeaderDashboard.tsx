'use client'

import {  Button, Container, Heading } from '@radix-ui/themes'
import {useRouter} from 'next/navigation'
import React from 'react'

function HeaderDashboardPage() {
 const router = useRouter()
  return (
    <Container>
      <div className='flex justify-between py-4 items-center mb-4s'>
        <Heading>Projects</Heading>
        <Button onClick={() => router.push('/dashboard/tasks/new')}>Add Project</Button>
        </div>
    </Container>
  )
}

export default HeaderDashboardPage