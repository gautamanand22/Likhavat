import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ParallaxSection = () => {
    const sectionRef = useRef(null)
    const backgroundRef = useRef(null)
    const contentRef = useRef(null)
    const statsRef = useRef([])
    const certificationsRef = useRef([])

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Simplified parallax background effect
            let parallaxTween = gsap.to(backgroundRef.current, {
                yPercent: -20, // Reduced movement
                ease: "none",
                paused: true
            })

            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                onUpdate: (self) => {
                    parallaxTween.progress(self.progress)
                }
            })

            // Optimized content animation with intersection observer
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }

            const contentObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        gsap.fromTo(entry.target.children,
                            { y: 40, opacity: 0 }, // Reduced movement
                            {
                                y: 0,
                                opacity: 1,
                                duration: 0.8,
                                stagger: 0.1, // Reduced stagger
                                ease: "power2.out"
                            }
                        )
                        contentObserver.unobserve(entry.target)
                    }
                })
            }, observerOptions)

            if (contentRef.current) {
                contentObserver.observe(contentRef.current)
            }

            // Simplified stats animation
            statsRef.current.forEach((stat, index) => {
                if (stat) {
                    const numberElement = stat.querySelector('.stat-number')
                    if (numberElement) {
                        const finalNumber = numberElement.textContent
                        const numericValue = parseInt(finalNumber.replace(/[^\d]/g, ''))

                        ScrollTrigger.create({
                            trigger: stat,
                            start: "top 80%",
                            onEnter: () => {
                                gsap.fromTo(stat,
                                    { scale: 0.9, opacity: 0 },
                                    {
                                        scale: 1,
                                        opacity: 1,
                                        duration: 0.5,
                                        delay: index * 0.05,
                                        ease: "power2.out"
                                    }
                                )

                                // Optimized counter animation
                                if (numericValue > 0) {
                                    let counter = { value: 0 }
                                    gsap.to(counter, {
                                        value: numericValue,
                                        duration: 1.5, // Reduced duration
                                        ease: "power2.out",
                                        onUpdate: () => {
                                            const suffix = finalNumber.includes('K+') ? 'K+' :
                                                finalNumber.includes('M+') ? 'M+' :
                                                    finalNumber.includes('%') ? '%' : '+'
                                            numberElement.textContent = Math.round(counter.value) + suffix
                                        }
                                    })
                                }
                            }
                        })
                    }
                }
            })

            // Simplified certifications animation
            certificationsRef.current.forEach((cert, index) => {
                if (cert) {
                    ScrollTrigger.create({
                        trigger: cert,
                        start: "top 85%",
                        onEnter: () => {
                            gsap.fromTo(cert,
                                { y: 30, opacity: 0 }, // Reduced movement
                                {
                                    y: 0,
                                    opacity: 1,
                                    duration: 0.6,
                                    delay: index * 0.05, // Reduced delay
                                    ease: "power2.out"
                                }
                            )
                        }
                    })
                }
            })

            return () => {
                contentObserver.disconnect()
            }

        }, sectionRef)

        return () => ctx.revert()
    }, [])

    const certifications = [
        { name: "FDA Approved", icon: "✓", description: "Food and Drug Administration certified" },
        { name: "ISO 9001", icon: "🏆", description: "Quality management systems" },
        { name: "GMP Certified", icon: "⚕️", description: "Good Manufacturing Practice" },
        { name: "WHO Listed", icon: "🌍", description: "World Health Organization recognized" }
    ]

    return (
        <section
            ref={sectionRef}
            className="section bg-gradient-to-br from-blue-900 via-blue-800 to-green-900 overflow-hidden snap-start"
        >
            {/* Parallax Background Elements */}
            <div
                ref={backgroundRef}
                className="absolute inset-0 opacity-10"
            >
                <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/6 w-80 h-80 bg-white rounded-full filter blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white rounded-full filter blur-3xl"></div>
            </div>

            {/* Medical Pattern Overlay */}
            <div className="absolute inset-0 opacity-5">
                <div
                    className="w-full h-full"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='white' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
                        backgroundSize: '40px 40px'
                    }}
                ></div>
            </div>

            <div className="container-custom relative z-10">
                <div ref={contentRef} className="text-center mb-20">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-6">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                        Trusted by Healthcare
                        <span className="block text-secondary-300">Professionals Worldwide</span>
                    </h2>

                    <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                        Join thousands of medical professionals who rely on CETMEDS for
                        safe, effective, and clinically proven medical solutions.
                    </p>
                </div>

                {/* Trust Statistics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
                    {[
                        { number: "500+", label: "Partner Hospitals", icon: "🏥" },
                        { number: "2000+", label: "Medical Clinics", icon: "🏢" },
                        { number: "50K+", label: "Healthcare Professionals", icon: "👨‍⚕️" },
                        { number: "99.8%", label: "Patient Satisfaction", icon: "❤️" }
                    ].map((stat, index) => (
                        <div
                            key={index}
                            ref={(el) => statsRef.current[index] = el}
                            className="text-center bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
                        >
                            <div className="text-3xl mb-3">{stat.icon}</div>
                            <div className="stat-number text-3xl md:text-4xl font-bold text-white mb-2">
                                {stat.number}
                            </div>
                            <div className="text-white/70 font-medium text-sm">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Certifications */}
                <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-12">
                        Quality Certifications & Standards
                    </h3>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {certifications.map((cert, index) => (
                            <div
                                key={index}
                                ref={(el) => certificationsRef.current[index] = el}
                                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20 hover:bg-white/20 transition-all duration-300"
                            >
                                <div className="text-4xl mb-4">{cert.icon}</div>
                                <h4 className="text-lg font-semibold text-white mb-2">
                                    {cert.name}
                                </h4>
                                <p className="text-white/70 text-sm">
                                    {cert.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Call to Action */}
                <div className="text-center mt-16">
                    <button className="btn-primary bg-white text-primary-900 hover:bg-white/90">
                        Partner With Us
                        <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    )
}

export default ParallaxSection