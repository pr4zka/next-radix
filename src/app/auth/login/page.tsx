import React from 'react';
import { Card, Container, Heading, Flex, Text, Link } from '@radix-ui/themes';
import NavLink from 'next/link';
import SigninForm from '@/components/auth/SigninForm';

function LoginPage() {
  return (
    <>
      <Container size='1' height='100%' className='p-3 md:p-0'>
        <Flex className='h-[calc(100vh-10rem)] w-full items-center'>
          <Card className='w-full p-7'>
            <Heading align="center">Inicia Sesion</Heading>
            <SigninForm />
          </Card>
        </Flex>
      </Container>
    </>
  );
}

export default LoginPage;