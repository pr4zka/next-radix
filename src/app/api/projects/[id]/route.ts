import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import { Prisma } from "@prisma/client";
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const projectDelete = await prisma.poject.delete({
      where: {
        id: parseInt(params.id),
      },
    });
    return NextResponse.json({ projectDelete }, { status: 200 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          { error: "Project not found" },
          { status: 404 }
        );
      }
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
export async function GET(request: Request, {params} : {params: {id: string}}) {
   const project = await prisma.poject.findUnique({where: {id: parseInt(params.id)}})
   if(!project) {
    return NextResponse.json({error: 'Project not found'}, {status: 404})
   }
   return NextResponse.json(project)
}

export async function PUT(request: Request, {params} : {params: {id: string}}) {
  const body = await request.json()
  const project = await prisma.poject.update({
    where: {
        id: parseInt(params.id)
    },
    data: {
        title: body.title,
        description: body.description
    }
  })
  return NextResponse.json(project)   
}