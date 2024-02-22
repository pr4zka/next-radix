'use client'

import { TextArea, TextField, Container, Button, Flex, Card, Heading } from '@radix-ui/themes'
import axios from 'axios'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'

function TaskPage() {

 const {control, handleSubmit} = useForm({values: {
  
    title: '',
    description: ''
 
 }})

const onSubmit = handleSubmit( async (data) => {
   const res =  await axios.post('/api/projects', data)
   console.log(res)
})

  return (
    <div>
    <Container height='100%' size='1' className='p-3 md:p-0'>
         <Flex className='h-screen w-full items-center'>
            <Card className='w-full p-7'>
                  <form className='flex flex-col gap-y-5' onSubmit={onSubmit}>
                  <Heading>Create Project</Heading>
                  <label>Project Title</label>

                  <Controller
                    name='title'
                    control={control} 
                    render={({field}) => {
                      return <TextField.Input size='1' placeholder='Task Name' {...field}/>
                    }}
                  />

                    <label>Project Description</label>
                    <Controller 
                      name='description'
                      control={control}
                      render={({field}) => {
                        return <TextArea size='1' placeholder='Task Description' {...field}/>
                      
                      }}
                    />
                   <Button type='submit'>Save Task</Button>
                </form>
                  </Card>
         </Flex>
    </Container>

</div>
  )
} 

export default TaskPage
