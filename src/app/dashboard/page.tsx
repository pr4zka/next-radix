'use client'

import {  Button, Container, Heading } from '@radix-ui/themes'
import {useRouter} from 'next/navigation'
import React from 'react'

function DashboardPage() {
 const router = useRouter()
  return (
    <Container>
      <div className='flex justify-between py-4'>
        <Heading>Task</Heading>
        <Button onClick={() => router.push('/dashboard/tasks/new')}>Add Task</Button>
        </div>
    </Container>
  )
}

export default DashboardPage