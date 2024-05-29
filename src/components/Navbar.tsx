'use client'
import { Heading, Link, Flex, Container, DropdownMenu, Button } from "@radix-ui/themes"
import { CaretDownIcon } from '@radix-ui/react-icons'
import NextLink  from 'next/link'
import { signOut, useSession } from "next-auth/react"



function Navbar() {

    const {data: session, status} = useSession()

  if(status === 'loading') return null
  
 return (
  <nav className="py-4 bg-sky-900">
     <Container >
     <Flex justify="between" align="center">
          <NextLink href="/">
            <Heading size="3">Dashboard</Heading>
          </NextLink>
         <ul className="flex gap-x-4 items-center">
           { !session && (
              <>
                  <li>
                    <Link asChild>
                        <NextLink href='/auth/login'>Login</NextLink>
                    </Link>
                    </li>
              </>
           )}
           { session && (
            <>
             <li>
                <Link asChild>
                    <NextLink href='/dashboard'>Dashboard</NextLink>
                </Link>
            </li>
            <li>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                    <Button variant="soft">
                    {session?.user?.name?.toUpperCase() || 'User'}
                    <CaretDownIcon />
                    </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    <DropdownMenu.Item>My Profile</DropdownMenu.Item>
                    <DropdownMenu.Separator />

                    <DropdownMenu.Item>Settings</DropdownMenu.Item>
                    <DropdownMenu.Separator />
                    <DropdownMenu.Item color="red" onClick={() => signOut()}>
                    Logout
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
                </DropdownMenu.Root>
            </li>
            </>
           )}
         </ul>
    </Flex>
   </Container>
  </nav>
  )
}

export default Navbar