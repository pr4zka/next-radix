import { Container } from '@radix-ui/themes';
import Link from 'next/link';
import { authOptions } from '@/libs/authOptions';
import { getServerSession } from 'next-auth';
import {redirect} from 'next/navigation'

export default async function HomePage() {

	const session = await getServerSession(authOptions)
	if(session){
     return redirect('/dashboard')
	}else {
		return redirect('/auth/login')
	}
}
