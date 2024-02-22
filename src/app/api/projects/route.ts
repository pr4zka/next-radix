import { NextResponse } from 'next/server'
import prisma from '@/libs/prisma'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]/route'



export async function POST(request: Request) {
    const data = await request.json()
    const session = await getServerSession(authOptions)
    if(!session){
        return NextResponse.json({message: {Unauthorized: 'You must be logged in to create a project'}}, {status: 401})
    }
    const res = await prisma.poject.create({
        data: {
            ...data,
            user:{
                connect: {
                    id: parseInt(session?.user.id)
                }
            }
        }
        
    })
    return NextResponse.json(res, {status: 201})
} 