import { NavLinks } from '@/constants';
import { getCurrentUser } from '@/lib/session';
import Image from 'next/image';
import Link from 'next/link';
import AuthProviders from './AuthProviders';
import ProfileMenu from './ProfileMenu';

const Navbar = async () => {
	const session = await getCurrentUser();

	return (
		<nav className='flex_between navbar'>
			<div className='flex-1 flex_start gap-10'>
				<Link href='/'>
					<Image src='/logo.svg' width={115} height={43} alt='Logo' />
				</Link>

				<ul className='hidden xl:flex text-small gap-7'>
					{NavLinks.map((link) => (
						<Link href={link.href} key={link.key}>
							{link.text}
						</Link>
					))}
				</ul>
			</div>

			<div className='gap-4 flex_center'>
				{session?.user ? (
					<>
						<ProfileMenu session={session} />
						<Link href='/create-project'>Share Link</Link>
					</>
				) : (
					<AuthProviders />
				)}
			</div>
		</nav>
	);
};

export default Navbar;
