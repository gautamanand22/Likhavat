import React, { useRef } from 'react'

const StatsSection = () => {
    const sectionRef = useRef(null)

    const stats = [
        {
            number: "25+",
            label: "Years of Experience",
            description: "Serving healthcare professionals worldwide",
            icon: (
                <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
            )
        },
        {
            number: "100+",
            label: "Medical Products",
            description: "Comprehensive healthcare solutions",
            icon: (
                <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
            )
        },
        {
            number: "50k+",
            label: "Satisfied Patients",
            description: "Trusted by healthcare providers globally",
            icon: (
                <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
            )
        },
        {
            number: "15+",
            label: "Countries Served",
            description: "Global reach with local expertise",
            icon: (
                <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
            )
        }
    ]

    return (
        <section
            ref={sectionRef}
            className="py-32 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden"
        >
            {/* Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl"></div>
            </div>

            <div className="container-custom relative z-10">
                {/* Section Header */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                        Our Track Record
                    </div>
                    <h2 className="heading-secondary mb-6">
                        Trusted Healthcare Partner
                    </h2>
                    <p className="text-body max-w-3xl mx-auto text-lg">
                        With over two decades of excellence in medical solutions,
                        CETMEDS has established itself as a leading provider of quality healthcare products.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="text-center group"
                        >
                            <div className="card bg-white/80 backdrop-blur-sm border-white/20 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                                {/* Icon */}
                                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                    {stat.icon}
                                </div>

                                {/* Number */}
                                <div className="mb-4">
                                    <span className="text-5xl font-bold text-gradient-primary">
                                        {stat.number}
                                    </span>
                                </div>

                                {/* Label */}
                                <h3 className="heading-tertiary mb-3 text-slate-800">
                                    {stat.label}
                                </h3>

                                {/* Description */}
                                <p className="text-body leading-relaxed">
                                    {stat.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-20">
                    <div className="card bg-white/90 border-white/20 p-12 max-w-4xl mx-auto shadow-xl">
                        <h3 className="heading-tertiary mb-4">Ready to Partner with Us?</h3>
                        <p className="text-body mb-8 text-lg max-w-2xl mx-auto">
                            Join thousands of healthcare professionals who trust CETMEDS
                            for their medical solution needs. Experience the difference quality makes.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="btn-primary">
                                Become a Partner
                            </button>
                            <button className="btn-outline">
                                View Case Studies
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default StatsSection
