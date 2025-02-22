import Link from 'next/link';
import { SignedIn, SignedOut, UserButton, SignInButton, SignOutButton } from '@clerk/nextjs';

const NavBar = () => {
    return (
        <nav className="bg-sky-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-2xl font-bold">
                    <Link href="/">MailGenie</Link>
                </div>
                <div className="space-x-4 flex items-center">
                    <Link href="/" className="text-white hover:text-gray-300">Home</Link>
                    {/*<Link href="/features" className="text-white hover:text-gray-300">Features</Link>*/}
                    {/*<Link href="/pricing" className="text-white hover:text-gray-300">Pricing</Link>*/}
                    <Link href="/dashboard" className="text-white hover:text-gray-300">Dashboard</Link>

                    <SignedOut>
                        <SignInButton>
                            <button className="text-white hover:text-gray-300">Sign In</button>
                        </SignInButton>
                    </SignedOut>

                    <SignedIn>
                        <UserButton afterSignOutUrl="/" />
                        <SignOutButton>
                            <button className="text-white hover:text-gray-300">Sign Out</button>
                        </SignOutButton>
                    </SignedIn>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;