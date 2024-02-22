import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import prisma from '@/libs/prisma'


export async function POST(request: Request){
  const salt = await bcrypt.genSalt(10)
  const data =  await request.json()
  data.password = await bcrypt.hash(data.password, salt)
  const newUser = await prisma?.user.create({
    data: data
  })
  const {password, ...user} = newUser
  return NextResponse.json(user, {
    status: 201
  })
}