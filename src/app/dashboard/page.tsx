import { Container } from '@radix-ui/themes';
import HeaderDashboardPage from '@/components/dashboard/HeaderDashboard';

async function DashboardPage() {
	return (
		<Container className="mt-10 px-10 md:px-0">
			<HeaderDashboardPage />
		</Container>
	);
}

export default DashboardPage;
