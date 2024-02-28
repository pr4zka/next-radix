import {Container, Grid} from '@radix-ui/themes'
import HeaderDashboardPage from '@/components/dashboard/HeaderDashboard'
import prisma from '@/libs/prisma'
import {getServerSession} from 'next-auth/next'
import { authOptions } from '@/libs/authOptions'
import ProjectCard from '@/components/projects/ProjectCard'

async function laodProjects() {
  const session = await getServerSession(authOptions)
  if(!session){
    return []
  }
 return await prisma.poject.findMany({
  where: {
    userId: parseInt(session.user.id)
  }
 })
 
}

async function DashboardPage() {
   const projects = await laodProjects()
  return (
    <Container className='mt-10 px-10 md:px-0'>
       <HeaderDashboardPage />
       <Grid columns={{md: "12"}} gap="2">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
       </Grid>
   </Container>
  )
}

export default DashboardPage