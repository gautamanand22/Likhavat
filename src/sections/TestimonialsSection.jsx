import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { testimonials } from '../constants'

gsap.registerPlugin(ScrollTrigger)

const TestimonialsSection = () => {
    const sectionRef = useRef(null)
    const titleRef = useRef(null)
    const carouselRef = useRef(null)
    const testimonialsRef = useRef([])
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Title animation
            gsap.fromTo(titleRef.current,
                { y: 100, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    scrollTrigger: {
                        trigger: titleRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            )

            // Initial testimonials setup
            testimonialsRef.current.forEach((testimonial, index) => {
                if (testimonial) {
                    gsap.set(testimonial, {
                        x: index * 100 + "%",
                        opacity: index === 0 ? 1 : 0.3,
                        scale: index === 0 ? 1 : 0.8
                    })
                }
            })

            // Auto-rotate testimonials
            const interval = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % testimonials.length)
            }, 5000)

            return () => clearInterval(interval)

        }, sectionRef)

        return () => ctx.revert()
    }, [])

    useEffect(() => {
        // Animate testimonials on index change
        testimonialsRef.current.forEach((testimonial, index) => {
            if (testimonial) {
                const isActive = index === currentIndex
                const distance = index - currentIndex

                gsap.to(testimonial, {
                    x: distance * 100 + "%",
                    opacity: isActive ? 1 : 0.3,
                    scale: isActive ? 1 : 0.8,
                    duration: 0.8,
                    ease: "power2.out"
                })
            }
        })
    }, [currentIndex])

    const goToSlide = (index) => {
        setCurrentIndex(index)
    }

    return (
        <section
            id="testimonials"
            ref={sectionRef}
            className="section bg-gradient-to-br from-gray-50 to-blue-50 overflow-hidden snap-start"
        >
            <div className="container mx-auto px-6 w-full">
                {/* Title */}
                <div
                    ref={titleRef}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl md:text-7xl font-bold text-gray-800 mb-6">
                        What <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Experts</span> Say
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Trusted by healthcare professionals and patients worldwide.
                        Read what they have to say about CETMEDS products.
                    </p>
                </div>

                {/* Testimonials Carousel */}
                <div className="relative max-w-4xl mx-auto">
                    <div
                        ref={carouselRef}
                        className="relative h-96 overflow-hidden rounded-3xl"
                    >
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={testimonial.id}
                                ref={(el) => testimonialsRef.current[index] = el}
                                className="absolute inset-0 bg-white rounded-3xl shadow-2xl p-8 md:p-12 flex flex-col justify-center"
                            >
                                <div className="flex items-center mb-6">
                                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                                        {testimonial.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-800">{testimonial.name}</h3>
                                        <p className="text-gray-600">{testimonial.role}</p>
                                    </div>
                                </div>

                                <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6 italic">
                                    "{testimonial.text}"
                                </blockquote>

                                <div className="flex items-center">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className="w-6 h-6 text-yellow-400 fill-current"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                        </svg>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Navigation Dots */}
                    <div className="flex justify-center mt-8 space-x-3">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
                                    ? 'bg-blue-500 scale-125'
                                    : 'bg-gray-300 hover:bg-gray-400'
                                    }`}
                            />
                        ))}
                    </div>

                    {/* Navigation Arrows */}
                    <button
                        onClick={() => goToSlide((currentIndex - 1 + testimonials.length) % testimonials.length)}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors duration-300"
                    >
                        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <button
                        onClick={() => goToSlide((currentIndex + 1) % testimonials.length)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors duration-300"
                    >
                        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                {/* Call to Action */}
                <div className="text-center mt-16">
                    <button className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-transform duration-300">
                        Join Thousands of Satisfied Customers
                    </button>
                </div>
            </div>
        </section>
    )
}

export default TestimonialsSection
