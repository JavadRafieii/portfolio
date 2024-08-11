import { usePathname } from 'next/navigation'

const navbar = [
    { id: 1, content: "Home", link: "/" },
    { id: 2, content: "About", link: "/About" },
    { id: 3, content: "Services", link: "/Services" },
    { id: 4, content: "Portfolios", link: "/Portfolios" },
    { id: 5, content: "Contact", link: "/Contact" },
]

function Header() {

    const pathname = usePathname();

    return (
        <header className="absolute top-0 left-0 w-full z-50">
            <nav className="container py-5">
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-5">
                        <a href="/" className="sora-800 text-6xl text-primary-white">
                            JR
                        </a>
                        <a href="/" className="sora-600 text-primary-white text-base">info@javadrafiei.ir</a>
                    </div>
                    <div className="flex items-center space-x-12">
                        <ul className="flex space-x-12">
                            {navbar.map(item => (
                                <li key={item.id} className={`sora-600 text-primary-white text-base hover ${pathname === `${item.link}` ? 'focus' : ''}`} >
                                    <a href={item.link}>{item.content}</a>
                                </li>
                            ))}
                        </ul>
                        <a href="/" className="sora-600 text-primary-white py-3 px-9 rounded-full bg-primary-gradient-dark hire">Hire me!</a>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;