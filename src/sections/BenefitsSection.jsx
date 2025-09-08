import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { benefits } from '../constants'

gsap.registerPlugin(ScrollTrigger)

const BenefitsSection = () => {
    const sectionRef = useRef(null)
    const titleRef = useRef(null)
    const benefitsRef = useRef([])
    const videoRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Title animation
            gsap.fromTo(titleRef.current.children,
                { y: 60, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    scrollTrigger: {
                        trigger: titleRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            )

            // Benefits cards animation
            benefitsRef.current.forEach((benefit, index) => {
                if (benefit) {
                    gsap.fromTo(benefit,
                        {
                            y: 80,
                            opacity: 0,
                            scale: 0.9
                        },
                        {
                            y: 0,
                            opacity: 1,
                            scale: 1,
                            duration: 0.8,
                            delay: index * 0.15,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: benefit,
                                start: "top 85%",
                                toggleActions: "play none none reverse"
                            }
                        }
                    )

                    // Hover animations
                    benefit.addEventListener('mouseenter', () => {
                        gsap.to(benefit, {
                            y: -12,
                            scale: 1.03,
                            duration: 0.3,
                            ease: "power2.out"
                        })
                    })

                    benefit.addEventListener('mouseleave', () => {
                        gsap.to(benefit, {
                            y: 0,
                            scale: 1,
                            duration: 0.3,
                            ease: "power2.out"
                        })
                    })
                }
            })

            // Video section animation
            if (videoRef.current) {
                gsap.fromTo(videoRef.current,
                    { scale: 0.8, opacity: 0 },
                    {
                        scale: 1,
                        opacity: 1,
                        duration: 1,
                        scrollTrigger: {
                            trigger: videoRef.current,
                            start: "top 80%",
                            toggleActions: "play none none reverse"
                        }
                    }
                )
            }

        }, sectionRef)

        return () => ctx.revert()
    }, [])

    const enhancedBenefits = [
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: "Clinically Proven",
            description: "All our products undergo rigorous clinical trials and testing to ensure maximum safety and efficacy for patient care.",
            color: "primary"
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            ),
            title: "FDA Approved",
            description: "Manufactured under strict FDA guidelines with the highest quality standards and regulatory compliance for patient safety.",
            color: "secondary"
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            ),
            title: "Natural Ingredients",
            description: "Formulated with carefully selected natural, preservative-free ingredients for gentle yet effective treatment.",
            color: "accent"
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
            title: "Fast-Acting Relief",
            description: "Quick-acting formulations designed to provide immediate symptom relief and improved patient comfort.",
            color: "medical"
        }
    ]

    return (
        <section
            id="benefits"
            ref={sectionRef}
            className="section bg-gradient-to-br from-gray-50 to-blue-50 snap-start"
        >
            <div className="container-custom w-full">
                {/* Section Header */}
                <div ref={titleRef} className="text-center mb-20">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-2xl mb-6">
                        <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h2 className="heading-secondary mb-6">
                        <span>Why Healthcare Professionals</span>
                        <span className="block text-gradient-primary">Choose CETMEDS</span>
                    </h2>
                    <p className="text-body max-w-3xl mx-auto">
                        Experience the difference with our scientifically proven formulations
                        and unwavering commitment to excellence in medical care.
                    </p>
                </div>

                {/* Benefits Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                    {enhancedBenefits.map((benefit, index) => (
                        <div
                            key={index}
                            ref={(el) => benefitsRef.current[index] = el}
                            className="card-elevated text-center p-8 group cursor-pointer"
                        >
                            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 text-${benefit.color}-600 bg-${benefit.color}-100 group-hover:scale-110 transition-transform duration-300`}>
                                {benefit.icon}
                            </div>
                            <h3 className="heading-tertiary mb-4 text-neutral-900">
                                {benefit.title}
                            </h3>
                            <p className="text-caption text-neutral-600 leading-relaxed">
                                {benefit.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Video Section */}
                <div
                    ref={videoRef}
                    className="bg-white rounded-3xl shadow-strong overflow-hidden"
                >
                    <div className="grid lg:grid-cols-2 gap-0">
                        {/* Video Content */}
                        <div className="relative bg-gradient-to-br from-primary-900 to-secondary-900 flex items-center justify-center min-h-96">
                            <div className="text-center text-white p-8">
                                <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6 cursor-pointer hover:bg-white/30 transition-colors duration-300">
                                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                                    See CETMEDS in Action
                                </h3>
                                <p className="text-white/80 mb-6">
                                    Watch how our products are making a difference in healthcare facilities worldwide.
                                </p>
                                <button className="btn-secondary bg-transparent border-white text-white hover:bg-white hover:text-primary-900">
                                    Watch Video
                                </button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-8 md:p-12 flex flex-col justify-center">
                            <h3 className="heading-tertiary mb-6 text-neutral-900">
                                Trusted by Medical Professionals
                            </h3>
                            <p className="text-body mb-6">
                                Our commitment to quality and innovation has made CETMEDS the preferred
                                choice for healthcare professionals across 50+ countries.
                            </p>

                            <div className="space-y-4 mb-8">
                                {[
                                    "15+ years of medical excellence",
                                    "1M+ patients successfully treated",
                                    "99.8% healthcare professional satisfaction",
                                    "Continuous research & development"
                                ].map((point, index) => (
                                    <div key={index} className="flex items-center">
                                        <div className="w-2 h-2 bg-primary-600 rounded-full mr-4"></div>
                                        <span className="text-neutral-700">{point}</span>
                                    </div>
                                ))}
                            </div>

                            <button className="btn-primary self-start">
                                Learn More About Our Quality Standards
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BenefitsSection
