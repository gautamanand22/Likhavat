import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Product3DShowcase = ({ product, index }) => {
    const cardRef = useRef(null)
    const imageRef = useRef(null)
    const contentRef = useRef(null)

    useEffect(() => {
        const card = cardRef.current
        const image = imageRef.current
        const content = contentRef.current

        // 3D tilt effect on mouse move
        const handleMouseMove = (e) => {
            const rect = card.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top
            const centerX = rect.width / 2
            const centerY = rect.height / 2
            const rotateX = (y - centerY) / centerY * -10
            const rotateY = (x - centerX) / centerX * 10

            gsap.to(card, {
                rotationX: rotateX,
                rotationY: rotateY,
                transformPerspective: 1000,
                duration: 0.3,
                ease: "power2.out"
            })

            gsap.to(image, {
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out"
            })
        }

        const handleMouseLeave = () => {
            gsap.to(card, {
                rotationX: 0,
                rotationY: 0,
                duration: 0.5,
                ease: "power2.out"
            })

            gsap.to(image, {
                scale: 1,
                duration: 0.5,
                ease: "power2.out"
            })
        }

        // Scroll animation
        gsap.fromTo(card,
            {
                y: 100,
                opacity: 0,
                rotationX: 45,
                scale: 0.8
            },
            {
                y: 0,
                opacity: 1,
                rotationX: 0,
                scale: 1,
                duration: 1,
                delay: index * 0.1,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            }
        )

        card.addEventListener('mousemove', handleMouseMove)
        card.addEventListener('mouseleave', handleMouseLeave)

        return () => {
            card.removeEventListener('mousemove', handleMouseMove)
            card.removeEventListener('mouseleave', handleMouseLeave)
        }
    }, [index])

    return (
        <div
            ref={cardRef}
            className="w-80 h-96 bg-white rounded-3xl shadow-2xl overflow-hidden cursor-pointer preserve-3d group"
            style={{
                boxShadow: `0 25px 50px ${product.color}20`,
                transformStyle: 'preserve-3d'
            }}
        >
            <div className="relative h-64 overflow-hidden">
                <div
                    className="absolute inset-0 bg-gradient-to-br opacity-20"
                    style={{ backgroundColor: product.color }}
                ></div>
                <img
                    ref={imageRef}
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                    <span
                        className="px-3 py-1 rounded-full text-white text-sm font-semibold"
                        style={{ backgroundColor: product.color }}
                    >
                        {product.type}
                    </span>
                </div>

                {/* 3D floating badge */}
                <div
                    className="absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg transform-gpu"
                    style={{
                        backgroundColor: product.color,
                        transform: 'translateZ(20px)'
                    }}
                >
                    {index + 1}
                </div>
            </div>

            <div ref={contentRef} className="p-6 transform-gpu" style={{ transform: 'translateZ(10px)' }}>
                <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    {product.name}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                    {product.description}
                </p>

                <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Features:</h4>
                    <ul className="space-y-1">
                        {product.features.slice(0, 2).map((feature, idx) => (
                            <li key={idx} className="text-sm text-gray-600 flex items-center">
                                <span
                                    className="w-2 h-2 rounded-full mr-2"
                                    style={{ backgroundColor: product.color }}
                                ></span>
                                {feature}
                            </li>
                        ))}
                    </ul>
                </div>

                <button
                    className="w-full py-3 rounded-full font-semibold text-white transition-all duration-300 hover:shadow-lg hover:scale-105"
                    style={{ backgroundColor: product.color }}
                >
                    Learn More
                </button>
            </div>
        </div>
    )
}

export default Product3DShowcase
