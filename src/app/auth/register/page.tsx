import SigninForm from '@/components/auth/SigninForm'
import { Card, Container, Heading, Flex, Text, Link } from '@radix-ui/themes'
import React from 'react'
import NavLink from 'next/link'
import SignupForm from '@/components/auth/SignupForm'

function RegisterPage() {
  return (
    <>
     <Container size='1' height='100%' className='p-3 md:p-0'>
     <Flex className='h-screen w-full items-center'>
     <Card className='w-full p-7'>
            <Heading align="center">Regista un Usuario</Heading>
            <SignupForm />
            <Flex justify="between" my="4">
              <Text>Already have an Account?</Text>
              <Link asChild>
                 <NavLink href="/auth/login">
                 Sign In
                 </NavLink>
              </Link>
            </Flex>
        </Card>
     </Flex>
    </Container>
    </>
  )
}

export default RegisterPage