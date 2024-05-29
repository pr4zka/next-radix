'use client'
import {PersonIcon , LockClosedIcon } from '@radix-ui/react-icons'
import { Flex, TextField, Button, Text } from '@radix-ui/themes'
import {Controller, useForm} from 'react-hook-form'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

interface SigninFormProps {
    username: string;
    password: string;
}

function SigninForm() {

    const {control, handleSubmit, formState: {errors}} = useForm({
        values: {
            username: '',
            password: ''
        }
    })
    const router = useRouter()
   const onSubmit = handleSubmit(async (data: SigninFormProps) => {
       const res =  await signIn('credentials', {
                redirect: false,
                username: data.username,
                password: data.password,
         })
       if(!res?.ok){
         toast.error(`Ocurrio un error: ${res?.error} ${res?.status}`)
       }else{
           toast.success('Inicio de sesion exitoso')
           router.push('/dashboard')
       }
   })
  return (
     <form onSubmit={onSubmit} >
           <Flex direction="column" gap="2">
                <label>Username</label>
                <TextField.Root>
                    <TextField.Slot>
                        <PersonIcon height="16" width="16"/>
                    </TextField.Slot>
                    <Controller 
                    name='username'
                    control={control}
                    rules={{required: 'Username is required'}}
                    render={({field}) => {
                        return (
                            <TextField.Input placeholder='Example' autoFocus {...field}/>
                        )
                    }}/>
                </TextField.Root>
                {errors.username && <Text color='red' className='text-xs'>{errors.username.message}</Text>}
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
                <Button type='submit' variant='solid' color='blue' className='bg-sky-400 rounded-lg cursor-pointer'>Iniciar Sesion</Button>
            </Flex>
     </form>
  )
}

export default SigninForm
