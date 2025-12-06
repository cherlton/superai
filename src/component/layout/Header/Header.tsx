import React, { useState, useEffect } from 'react';
import { cn } from '../../../utils';
import { Container } from '../Container';
import { Button } from '../../common/Button';
import logo from '../../../assets/logo.png';
// 1. Add useLocation to imports
import { useNavigate, useLocation } from 'react-router-dom';

interface NavLink {
    label: string;
    href: string;
    hasDropdown?: boolean;
}

const navLinks: NavLink[] = [
    { label: 'Product', href: '#product', hasDropdown: true },
    { label: 'Enterprise', href: '#enterprise' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Contact us', href: '/contact' },
];

export const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    // 2. Get the current pathname
    const { pathname } = useLocation();

    // Handle scroll styling (changing header background on scroll)
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        // Check immediately in case the page started slightly scrolled
        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    // --- NEW SECTION: Smooth Scroll on Navigation ---
    useEffect(() => {
        // This effect runs when the component mounts (initial load/reload)
        // AND whenever the `pathname` changes (e.g., navigating from '/' to '/contact').

        //We check if there is no hash (like #pricing) in the URL. 
        // If there is a hash, we usually want the browser's default behavior of jumping to that section.
        if (!window.location.hash) {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth' // <--- The key part for "ease"
            });
        }

    }, [pathname]); // Add pathname as a dependency
    // --------------------------------------------------


    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // To handle anchor link clicks (like #pricing) while already on the page
    // and close menu if open
    const handleAnchorClick = () => {
        if (isMobileMenuOpen) setIsMobileMenuOpen(false);
        // Note: For smooth scrolling *to anchors*, you usually need CSS: html { scroll-behavior: smooth; }
    };


    return (
        <>
            {/* Header */}
            <header
                className={cn(
                    'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                    isScrolled || isMobileMenuOpen
                        ? 'bg-white/95 backdrop-blur-lg shadow-sm py-3'
                        : 'bg-transparent py-5'
                )}
            >
                <Container>
                    <nav className="flex items-center justify-between">
                        {/* Logo */}
                        <a href="/" className="flex items-center gap-2 z-50">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center">
                                <img src={logo}
                                    alt="logo" />
                            </div>
                            <span
                                className={cn(
                                    'font-bold text-xl transition-colors',
                                    isScrolled || isMobileMenuOpen ? 'text-neutral-charcoal' : 'text-white'
                                )}
                            >
                                Insight-Sphere
                            </span>
                        </a>

                        {/* Desktop Navigation Links */}
                        <div className="hidden lg:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    // Added click handler for anchor links
                                    onClick={link.href.startsWith('#') ? handleAnchorClick : undefined}
                                    className={cn(
                                        'text-sm font-medium transition-colors hover:text-primary-blue flex items-center gap-1',
                                        isScrolled ? 'text-neutral-dark-gray' : 'text-white/90'
                                    )}
                                >
                                    {link.label}
                                    {link.hasDropdown && (
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    )}
                                </a>
                            ))}
                        </div>

                        {/* Desktop CTA Buttons */}
                        <div className="hidden lg:flex items-center gap-3">
                            <Button
                                onClick={() => navigate('/login')}
                                variant={isScrolled ? 'ghost' : 'outline'}
                                size="sm"
                                className={cn(!isScrolled && 'text-white border-white/30 hover:bg-white/10')}
                            >
                                Log in
                            </Button>
                            <Button
                                onClick={() => navigate('/signup')}

                                variant="primary" size="sm">
                                Sign up
                            </Button>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={toggleMobileMenu}
                            className={cn(
                                'lg:hidden z-50 p-2 rounded-lg transition-colors',
                                isScrolled || isMobileMenuOpen
                                    ? 'text-neutral-charcoal hover:bg-neutral-light-gray'
                                    : 'text-white hover:bg-white/10'
                            )}
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? (
                                // Close Icon (X)
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                // Hamburger Icon
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </nav>
                </Container>
            </header>

            {/* Mobile Menu Overlay */}
            <div
                className={cn(
                    'fixed inset-0 z-40 lg:hidden transition-all duration-300 ease-out',
                    isMobileMenuOpen
                        ? 'opacity-100 pointer-events-auto'
                        : 'opacity-0 pointer-events-none'
                )}
            >
                {/* Backdrop */}
                <div
                    className="absolute inset-0 bg-black/20 backdrop-blur-sm"
                    onClick={toggleMobileMenu}
                />

                {/* Mobile Menu Panel */}
                <div
                    className={cn(
                        'absolute inset-x-0 top-0 bg-white min-h-screen pt-20 pb-8 px-6',
                        'flex flex-col transition-all duration-300 ease-out',
                        isMobileMenuOpen
                            ? 'translate-y-0 opacity-100'
                            : '-translate-y-4 opacity-0'
                    )}
                >
                    {/* Navigation Links */}
                    <nav className="flex-1 py-6">
                        <ul className="space-y-2">
                            {navLinks.map((link, index) => (
                                <li
                                    key={link.label}
                                    className={cn(
                                        'transform transition-all duration-300 ease-out',
                                        isMobileMenuOpen
                                            ? 'translate-y-0 opacity-100'
                                            : 'translate-y-4 opacity-0'
                                    )}
                                    style={{
                                        transitionDelay: isMobileMenuOpen ? `${(index + 1) * 75}ms` : '0ms',
                                    }}
                                >
                                    <a
                                        href={link.href}
                                        className="flex items-center justify-between py-3 text-lg font-medium text-neutral-charcoal hover:text-primary-blue transition-colors"
                                        // Combined handler: close menu AND let default navigation happen
                                        onClick={toggleMobileMenu}
                                    >
                                        <span>{link.label}</span>
                                        {link.hasDropdown && (
                                            <svg className="w-5 h-5 text-neutral-dark-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        )}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Mobile CTA Buttons */}
                    <div
                        className={cn(
                            'space-y-3 pt-6 border-t border-neutral-gray',
                            'transform transition-all duration-300 ease-out',
                            isMobileMenuOpen
                                ? 'translate-y-0 opacity-100'
                                : 'translate-y-4 opacity-0'
                        )}
                        style={{
                            transitionDelay: isMobileMenuOpen ? `${(navLinks.length + 1) * 75}ms` : '0ms',
                        }}
                    >
                        <Button
                            variant="ghost"
                            size="lg"
                            fullWidth
                            className="text-neutral-charcoal justify-center"
                            onClick={() => { toggleMobileMenu(); navigate('/login'); }}
                        >
                            Log in
                        </Button>
                        <Button
                            variant="primary"
                            size="lg"
                            fullWidth
                            className="justify-center"
                            onClick={() => { toggleMobileMenu(); navigate('/signup'); }}
                        >
                            Sign up
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;