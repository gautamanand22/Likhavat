import React, { useRef } from 'react'

const ProductsSection = () => {
    const sectionRef = useRef(null)

    const products = [
        {
            id: 1,
            name: "OptiClear Eye Drops",
            category: "Eye Care",
            description: "Advanced dry eye relief with extended moisture protection",
            features: ["Preservative-free", "Long-lasting relief", "Safe for daily use"],
            color: "from-blue-400 to-cyan-500"
        },
        {
            id: 2,
            name: "AudiCare Ear Drops",
            category: "Ear Care",
            description: "Gentle ear wax removal and infection prevention solution",
            features: ["Non-irritating formula", "Quick action", "Doctor recommended"],
            color: "from-green-400 to-emerald-500"
        },
        {
            id: 3,
            name: "NasalGuard Spray",
            category: "Nasal Care",
            description: "Effective nasal congestion relief with natural ingredients",
            features: ["Natural formula", "Fast-acting", "Non-addictive"],
            color: "from-purple-400 to-violet-500"
        },
        {
            id: 4,
            name: "SkinHeal Ointment",
            category: "Dermatology",
            description: "Advanced wound healing and skin repair treatment",
            features: ["Clinical strength", "Rapid healing", "Minimal scarring"],
            color: "from-orange-400 to-red-400"
        },
        {
            id: 5,
            name: "FlexiJoint Gel",
            category: "Pain Relief",
            description: "Targeted pain relief for joints and muscles",
            features: ["Deep penetration", "Anti-inflammatory", "Non-greasy"],
            color: "from-indigo-400 to-blue-500"
        },
        {
            id: 6,
            name: "GastroEase Tablets",
            category: "Digestive Health",
            description: "Comprehensive digestive support and acid relief",
            features: ["Fast absorption", "Long-lasting", "Gentle formula"],
            color: "from-teal-400 to-cyan-500"
        }
    ]

    return (
        <section
            id="products"
            ref={sectionRef}
            className="py-32 bg-white relative overflow-hidden"
        >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-72 h-72 bg-indigo-400 rounded-full blur-3xl"></div>
            </div>

            <div className="container-custom relative z-10">
                {/* Section Header */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                        Medical Product Range
                    </div>
                    <h2 className="heading-secondary mb-6">
                        Our Medical Product Range
                    </h2>
                    <p className="text-body max-w-3xl mx-auto text-lg">
                        Discover our comprehensive collection of FDA-approved medical solutions,
                        each formulated with precision and backed by clinical research for optimal patient outcomes.
                    </p>
                </div>

                {/* Products Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {products.map((product, index) => (
                        <div
                            key={product.id}
                            className="group card hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white border border-gray-100"
                        >
                            {/* Product Header */}
                            <div className={`h-3 bg-gradient-to-r ${product.color} rounded-t-2xl`}></div>

                            <div className="p-8">
                                {/* Product Icon */}
                                <div className={`w-16 h-16 bg-gradient-to-r ${product.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    <svg width="28" height="28" fill="white" viewBox="0 0 24 24">
                                        <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                    </svg>
                                </div>

                                {/* Product Info */}
                                <div className="mb-4">
                                    <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                                        {product.category}
                                    </span>
                                </div>

                                <h3 className="heading-tertiary mb-3 group-hover:text-blue-600 transition-colors">
                                    {product.name}
                                </h3>

                                <p className="text-body mb-6 leading-relaxed">
                                    {product.description}
                                </p>

                                {/* Features */}
                                <ul className="space-y-2 mb-8">
                                    {product.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center text-sm text-gray-600">
                                            <svg className="w-4 h-4 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA Button */}
                                <button className="w-full btn-outline group-hover:btn-primary transition-all duration-300">
                                    Learn More
                                    <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Call to Action */}
                <div className="text-center">
                    <div className="card bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100 p-12 max-w-4xl mx-auto">
                        <h3 className="heading-tertiary mb-4">Need a Custom Solution?</h3>
                        <p className="text-body mb-8 text-lg max-w-2xl mx-auto">
                            Our team of medical experts can develop customized formulations
                            tailored to your specific healthcare needs and requirements.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="btn-primary">
                                Request Custom Solution
                            </button>
                            <button className="btn-outline">
                                Download Product Catalog
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductsSection