'use client'
import { EnvelopeClosedIcon, LockClosedIcon } from '@radix-ui/react-icons'
import { Flex, TextField, Button, Text } from '@radix-ui/themes'
import {Controller, useForm} from 'react-hook-form'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface SigninFormProps {
    email: string;
    password: string;
}

function SigninForm() {

    const {control, handleSubmit, formState: {errors}} = useForm({
        values: {
            email: '',
            password: ''
        }
    })
    const router = useRouter()
   const onSubmit = handleSubmit(async (data: SigninFormProps) => {
       const res =  await signIn('credentials', {
                redirect: false,
                email: data.email,
                password: data.password,
         })
         console.log(res)
       if(!res?.ok){
         throw new Error('Error signing in')
       }
       router.push('/dashboard')
   })
  return (
     <form onSubmit={onSubmit} >
           <Flex direction="column" gap="2">
                <label>Email</label>
                <TextField.Root>
                    <TextField.Slot>
                        <EnvelopeClosedIcon height="16" width="16"/>
                    </TextField.Slot>
                    <Controller 
                    name='email'
                    control={control}
                    rules={{required: 'Email is required'}}
                    render={({field}) => {
                        return (
                            <TextField.Input type='email' placeholder='email@domain.com' autoFocus {...field}/>
                        )
                    }}/>
                </TextField.Root>
                {errors.email && <Text color='red' className='text-xs'>{errors.email.message}</Text>}
                <label>Password</label>
                <TextField.Root>
                    <TextField.Slot>
                        <LockClosedIcon height="16" width="16"/>
                    </TextField.Slot>
                    <Controller 
                    name='password'
                    control={control}
                    rules={{required: 'Password is required'}}
                    render={({field}) => {
                        return (
                            <TextField.Input type='password' placeholder='********' {...field}/>
                        )
                    
                    }}
                    />
                </TextField.Root>
                {errors.password && <Text color='red' className='text-xs'>{errors.password.message}</Text>}
                <Button type='submit' variant='solid' color='blue' className='bg-sky-400 rounded-lg'>Sign in</Button>
            </Flex>
     </form>
  )
}

export default SigninForm
