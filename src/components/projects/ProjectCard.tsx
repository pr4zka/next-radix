'use client'

import { Card, Heading, Text } from "@radix-ui/themes"
import { Poject } from "@prisma/client"
import { useRouter } from 'next/navigation'

interface Props {
    project: Poject
}


function ProjectCard({project}: Props) {

    const router = useRouter()


  return (
    <Card key={project.id} className='hover:cursor-pointer hover:opacity-80'
    onClick={() => router.push(`/dashboard/tasks/${project.id}`)}
    >
    <Heading>{project.title} {project.userId}</Heading>
      <Text className='text-slate-300'>{project.description}</Text>
    </Card>
  )
}

export default ProjectCard