'use client'

import { TextArea, TextField, Container, Button, Flex, Card, Heading } from '@radix-ui/themes'
import axios from 'axios'
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useRouter, useParams } from 'next/navigation'
import { TrashIcon } from '@radix-ui/react-icons'
import {toast} from 'sonner'

function TaskPage() {

 const {control, handleSubmit, setValue} = useForm({values: {
  
    title: '',
    description: ''
 
 }})

 const router = useRouter()
 const params = useParams() as {taskId: string}

 const onSubmit = handleSubmit( async (data) => {
  if(params.taskId){
    const updated =  await axios.put(`/api/projects/${params.taskId}`, data)
    if(updated.status === 200){
      router.push('/dashboard')
      router.refresh()
    }
  } else {
   const res =  await axios.post('/api/projects', data)
    if(res.status === 201){
      router.push('/dashboard')
      router.refresh()
    }
  }
})

  const handleDeleted = async (taskId: string) => {
   const res = await axios.delete(`/api/projects/${taskId}`)
   if (res.status === 200){
      toast.success('Project Deleted')
   }
      router.push('/dashboard')
      router.refresh()
    
   
  }
   useEffect(() => {
      const fetchProject = async () => {
        if(params.taskId){
          const project = await axios.get(`/api/projects/${params.taskId}`)
           if(project.status === 200){
              setValue('title', project.data.title)
              setValue('description', project.data.description)
           }
        }
   }
   fetchProject()
   })

  return (
    <div>
    <Container height='100%' size='1' className='p-3 md:p-0'>
         <Flex className='h-[calc(100vh-10rem)] w-full items-center'>
            <Card className='w-full p-7'>
                  <form className='flex flex-col gap-y-5' onSubmit={onSubmit}>
                  <Heading>{params.taskId ? "Edit Project" : "Create Project"}</Heading>
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
                   <Button type='submit' color='blue'>{params.taskId ? "Edit Project" : "Save Project"}</Button>
                </form>
                   <div className='flex justify-end my-4s'> {
                  params.taskId && (
                    <Button color='red' onClick={() => handleDeleted(params.taskId)}> <TrashIcon /> Delete Project</Button>
                  )
                }</div>
                  </Card> 
         </Flex>
    </Container>

</div>
  )
} 

export default TaskPage
