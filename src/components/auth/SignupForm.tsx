'use client'
import { LockClosedIcon, PersonIcon } from '@radix-ui/react-icons'
import { Flex, TextField, Button, Text } from '@radix-ui/themes'
import {Controller, useForm} from 'react-hook-form'
import React from 'react'
import axios from 'axios'
import { signIn } from 'next-auth/react'
import {useRouter} from 'next/navigation'



function SignupForm() {
    
    const {control, handleSubmit, formState: {errors}} = useForm({
        values: {
            name: '',
            email: '',
            password: ''
        }
    })
  const router = useRouter()
  const onSubmit = handleSubmit( async (data) => {
       const res = await axios.post('/api/auth/register', data)
       if (res.status === 201){
          const result = await signIn('credentials', {
            redirect: false,
                email: res.data.email,
                password: data.password,
           })
           
          if (result && !result.ok){
            console.log(result.error)
              return
          }
          router.push('/dashboard')
       }
  })

    return (
     <form onSubmit={onSubmit}>
           <Flex direction="column" gap="2">
      <label htmlFor="">Name: </label>
      <TextField.Root>
        <TextField.Slot>
            <PersonIcon height="16" width="16"/>
        </TextField.Slot>
        <Controller 
         name='name'
           control={control}
           rules={{required: 'Name is required'}}
           render={({field}) => {
              return (<TextField.Input type='text' placeholder='Write username' autoFocus {...field}/>)
           }}
        />
      </TextField.Root>
      {errors.name && <Text color='red'>{errors.name?.message}</Text>}
      <label htmlFor="">Email: </label>
      <TextField.Root>
        <TextField.Slot>
            <PersonIcon height="16" width="16"/>
        </TextField.Slot>
        <Controller 
          name='email'
          control={control}
          rules={{required: 'Email is required'}}
         render={({field}) => {
             return (<TextField.Input type='email' placeholder='email@domain.com' {...field}/>)
         }}
        />
      </TextField.Root>
      {errors.email && <Text color='red'>{errors.email?.message}</Text>}
      <label htmlFor="">Password</label>
      <TextField.Root>
        <TextField.Slot>
            <LockClosedIcon height="16" width="16"/>
        </TextField.Slot>
        <Controller 
         name='password'  
         control={control}
         rules={{required: 'Password is required'}}
         render={({field}) => {
                return (<TextField.Input type='password' placeholder='********' {...field}/>)
            
          }}
        />
      </TextField.Root>
      {errors.password && <Text color='red'>{errors.password?.message}</Text>}
      <Button type='submit' variant='solid' color='blue' className='bg-sky-400 rounded-lg'>Sign in</Button>
   </Flex>
     </form>
  )
}

export default SignupForm
