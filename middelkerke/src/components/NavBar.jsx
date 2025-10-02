import Link from "next/link";

export default function NavBar() {
    return (
        <nav className="bg-red-600 p-4">
            <ul className="flex space-x-6 text-white">
                <li>
                    <Link href="/">Home</Link>
                    
                </li>
                <li>
                    <Link href="/Login">Login</Link>
                </li>
            </ul>
        </nav>
    )

}