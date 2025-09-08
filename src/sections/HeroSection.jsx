import React, { useRef, useCallback } from 'react'

const HeroSection = () => {
    const heroRef = useRef(null)
    const titleRef = useRef(null)
    const subtitleRef = useRef(null)
    const ctaRef = useRef(null)
    const heroImageRef = useRef(null)

    const scrollToSection = useCallback((sectionId) => {
        const element = document.getElementById(sectionId)
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
        }
    }, [])

    return (
        <section
            id="home"
            ref={heroRef}
            className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 overflow-hidden pt-20"
        >
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-0 w-72 h-72 bg-purple-400/15 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-400/15 rounded-full blur-3xl"></div>
            </div>

            <div className="w-full px-6 lg:px-12 xl:px-16 relative z-10 h-full min-h-screen flex items-center py-20">
                <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center w-full max-w-[1600px] mx-auto">
                    {/* Left Content - Takes up more space */}
                    <div className="lg:col-span-7 space-y-8">
                        <div ref={titleRef} className="space-y-6 animate-on-scroll">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
                                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                </svg>
                                Leading Medical Solutions Provider
                            </div>
                            <h1 className="text-5xl lg:text-7xl xl:text-8xl font-bold leading-tight">
                                <span className="block text-slate-900">Professional</span>
                                <span className="block text-gradient-primary">Medical Solutions</span>
                                <span className="block text-slate-900">for Better Health</span>
                            </h1>
                        </div>

                        <div ref={subtitleRef} className="space-y-8 animate-on-scroll">
                            <p className="text-body leading-relaxed text-xl lg:text-2xl max-w-4xl">
                                CETMEDS provides premium eye drops, ear drops, and specialized medical
                                solutions backed by clinical research and trusted by healthcare professionals worldwide.
                            </p>

                            {/* Key Features */}
                            <div className="grid md:grid-cols-3 gap-6 pt-6">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <span className="font-medium text-slate-700">FDA Approved</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <span className="font-medium text-slate-700">ISO Certified</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                        <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <span className="font-medium text-slate-700">25+ Years Experience</span>
                                </div>
                            </div>
                        </div>

                        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-6 pt-8 animate-on-scroll">
                            <button
                                onClick={() => scrollToSection('products')}
                                className="btn-primary group text-lg px-8 py-4"
                            >
                                Explore Our Products
                                <svg className="ml-2 w-6 h-6 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </button>
                            <button
                                onClick={() => scrollToSection('contact')}
                                className="btn-secondary text-lg px-8 py-4"
                            >
                                Contact Specialists
                            </button>
                        </div>
                    </div>

                    {/* Right Content - Expanded Visual Section */}
                    <div className="lg:col-span-5 relative">
                        <div ref={heroImageRef} className="relative animate-on-scroll">
                            {/* Enhanced Hero Cards Layout */}
                            <div className="grid gap-6">
                                {/* Main Hero Card */}
                                <div className="card bg-white/90 border-white/20 p-10 text-center shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-300">
                                    <div className="mx-auto mb-6 w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl">
                                        <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
                                            <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                        </svg>
                                    </div>
                                    <h3 className="heading-tertiary text-slate-800 mb-3">Premium Quality</h3>
                                    <p className="text-body text-sm">Clinically tested and certified for safety and efficacy</p>
                                </div>

                                {/* Secondary Cards */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="card bg-white/80 border-white/20 p-6 text-center shadow-xl transform -rotate-2 hover:rotate-0 transition-transform duration-300">
                                        <div className="mx-auto mb-4 w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                                            <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
                                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                            </svg>
                                        </div>
                                        <h4 className="font-bold text-slate-800 text-sm mb-2">Award Winning</h4>
                                        <p className="text-xs text-slate-600">Industry recognition</p>
                                    </div>

                                    <div className="card bg-white/80 border-white/20 p-6 text-center shadow-xl transform rotate-2 hover:rotate-0 transition-transform duration-300">
                                        <div className="mx-auto mb-4 w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                                            <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
                                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                            </svg>
                                        </div>
                                        <h4 className="font-bold text-slate-800 text-sm mb-2">Trusted</h4>
                                        <p className="text-xs text-slate-600">50k+ patients</p>
                                    </div>
                                </div>
                            </div>

                            {/* Floating stats */}
                            <div className="absolute -top-4 -right-4 card bg-white/95 border-white/30 p-4 shadow-lg transform rotate-12 hover:rotate-6 transition-transform duration-300">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-blue-600">100+</div>
                                    <div className="text-xs text-slate-600">Products</div>
                                </div>
                            </div>

                            <div className="absolute -bottom-4 -left-4 card bg-white/95 border-white/30 p-4 shadow-lg transform -rotate-12 hover:-rotate-6 transition-transform duration-300">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-green-600">15+</div>
                                    <div className="text-xs text-slate-600">Countries</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                <div className="w-6 h-10 border-2 border-blue-400 rounded-full flex justify-center p-2">
                    <div className="w-1 h-3 bg-blue-400 rounded-full"></div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection