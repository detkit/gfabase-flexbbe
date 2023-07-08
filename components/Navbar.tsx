import { NavLinks } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';
import AuthProviders from './AuthProviders';

const Navbar = () => {
	const session = {};

	return (
		<nav className='flex_between navbar'>
			<div className='flex-1 flex_start gpa-10'>
				<Link href='/'>
					<Image src='/logo.svg' width={115} height={43} alt='Logo' />
				</Link>

				<ul className='xl:flex hidden text-small gap-7'>
					{NavLinks.map((link) => (
						<Link href={link.href} key={link.key}>
							{link.text}
						</Link>
					))}
				</ul>
			</div>

			<div className='flex_center gap-4'>
				{session ? (
					<>
						UserPhoto
						<Link href='/cerate-project'>Share Link</Link>
					</>
				) : (
					<AuthProviders />
				)}
			</div>
		</nav>
	);
};

export default Navbar;
