import React, { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'

const NavBar = () => {
    const navRef = useRef(null)
    const logoRef = useRef(null)
    const menuRef = useRef(null)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    // Optimized scroll handler with minimal processing
    const handleScroll = useCallback(() => {
        const scrollY = window.scrollY
        const newIsScrolled = scrollY > 20

        if (newIsScrolled !== isScrolled) {
            setIsScrolled(newIsScrolled)
        }
    }, [isScrolled])

    useEffect(() => {
        // Minimal initial animation
        gsap.fromTo(navRef.current,
            { y: -50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
        )

        // Ultra-optimized scroll listener
        let ticking = false
        const onScroll = () => {
            if (!ticking) {
                ticking = true
                requestAnimationFrame(() => {
                    handleScroll()
                    ticking = false
                })
            }
        }

        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [handleScroll])

    // Instant navbar background transition (no animation)
    useEffect(() => {
        // Remove this effect since we're handling it inline
    }, [isScrolled])

    const navItems = [
        { name: 'Home', href: '#home' },
        { name: 'Products', href: '#products' },
        { name: 'Benefits', href: '#benefits' },
        { name: 'Testimonials', href: '#testimonials' },
        { name: 'Contact', href: '#contact' }
    ]

    const handleNavClick = useCallback((href) => {
        const element = document.querySelector(href)
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
        }
        setIsMenuOpen(false)
    }, [])

    const toggleMenu = useCallback(() => {
        setIsMenuOpen(prev => !prev)
    }, [])

    return (
        <nav
            ref={navRef}
            className="fixed top-0 left-0 w-full z-[100] border-b transition-all duration-300"
            style={{
                borderBottomWidth: '1px',
                borderBottomStyle: 'solid',
                backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                boxShadow: isScrolled ? '0 4px 20px rgba(0, 0, 0, 0.1)' : '0 2px 15px rgba(0, 0, 0, 0.08)',
                borderBottomColor: isScrolled ? 'rgba(226, 232, 240, 0.8)' : 'rgba(255, 255, 255, 0.3)'
            }}
        >
            <div className="container-custom">
                <div className="flex justify-between items-center py-4">
                    {/* Logo */}
                    <div
                        ref={logoRef}
                        className="flex items-center space-x-3 cursor-pointer transition-transform duration-300 hover:scale-105"
                        onClick={() => handleNavClick('#home')}
                    >
                        <div className="relative">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                </svg>
                            </div>
                            <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                        </div>
                        <div>
                            <span className={`text-xl font-bold transition-colors duration-300 ${isScrolled ? 'text-slate-900' : 'text-slate-900'
                                }`}>
                                CETMEDS
                            </span>
                            <div className={`text-xs transition-colors duration-300 ${isScrolled ? 'text-slate-600' : 'text-slate-700'
                                }`}>
                                Medical Solutions
                            </div>
                        </div>
                    </div>

                    {/* Desktop Menu */}
                    <div ref={menuRef} className="hidden lg:flex items-center space-x-1">
                        {navItems.map((item, index) => (
                            <button
                                key={index}
                                onClick={() => handleNavClick(item.href)}
                                className={`nav-link transition-all duration-300 ${isScrolled
                                    ? 'text-slate-700 hover:text-blue-600'
                                    : 'text-slate-700 hover:text-blue-600'
                                    }`}
                            >
                                {item.name}
                            </button>
                        ))}
                        <button
                            onClick={() => handleNavClick('#contact')}
                            className="btn-primary ml-4"
                        >
                            Get Started
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className={`lg:hidden p-2 rounded-lg transition-all duration-300 ${isScrolled
                            ? 'text-slate-900 hover:bg-slate-100'
                            : 'text-slate-900 hover:bg-slate-100'
                            }`}
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="lg:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl shadow-xl border-t border-slate-200">
                        <div className="container-custom py-6">
                            <div className="space-y-1">
                                {navItems.map((item, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleNavClick(item.href)}
                                        className="block w-full text-left text-slate-700 hover:text-blue-600 hover:bg-slate-50 py-3 px-4 rounded-lg font-medium transition-all duration-300"
                                    >
                                        {item.name}
                                    </button>
                                ))}
                                <div className="pt-4 mt-4 border-t border-slate-200">
                                    <button
                                        onClick={() => handleNavClick('#contact')}
                                        className="btn-primary w-full"
                                    >
                                        Get Started
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default NavBar