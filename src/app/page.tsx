import { Container } from '@radix-ui/themes';
import Link from 'next/link';
import { authOptions } from '@/libs/authOptions';
import { getServerSession } from 'next-auth';
import {redirect} from 'next/navigation'

export default async function HomePage() {

	const session = await getServerSession(authOptions)
	if(session){
     return redirect('/dashboard')
	}

	return (
		<Container className="px-5s md:px-0">
			<header className="my-4 bg-slate-700 p-10 rounded-md">
				<h1 className="text-7xl my-10">next auth radix</h1>
				<p className="mb-5">
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia in distinctio error alias repellat
					necessitatibus natus magnam non ipsum a officiis assumenda maiores repudiandae ab asperiores quod
					nemo, eveniet quae.
				</p>
				<Link href="/auth/login" className="text-2xl text-white bg-blue-900 p-2 rounded-md mt-10">
					Ingresa
				</Link>
			</header>
		</Container>
	);
}
