import React from 'react'
import { useSnapScroll } from '../hooks/useSnapScroll'

const ScrollNavigation = () => {
    const { currentSection, totalSections, scrollToSection } = useSnapScroll()

    const sections = [
        { id: 'home', name: 'Home', icon: '🏠' },
        { id: 'products', name: 'Products', icon: '💊' },
        { id: 'parallax', name: 'Trust', icon: '✨' },
        { id: 'benefits', name: 'Benefits', icon: '✅' },
        { id: 'testimonials', name: 'Reviews', icon: '💬' },
        { id: 'contact', name: 'Contact', icon: '📞' }
    ]

    return (
        <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 shadow-lg">
                <div className="flex flex-col space-y-3">
                    {sections.map((section, index) => (
                        <button
                            key={section.id}
                            onClick={() => scrollToSection(index)}
                            className={`
                group relative w-4 h-4 rounded-full transition-all duration-300
                ${index === currentSection
                                    ? 'bg-primary-500 scale-125'
                                    : 'bg-white/40 hover:bg-white/60 hover:scale-110'
                                }
              `}
                            title={section.name}
                        >
                            {/* Tooltip */}
                            <div className="absolute right-8 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                <div className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap shadow-lg">
                                    <span className="mr-2">{section.icon}</span>
                                    {section.name}
                                    <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-900 border-y-4 border-y-transparent"></div>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Progress Indicator */}
                <div className="mt-4 pt-4 border-t border-white/20">
                    <div className="text-xs text-white/70 text-center">
                        {currentSection + 1} / {sections.length}
                    </div>
                    <div className="mt-2 h-1 bg-white/20 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-primary-500 transition-all duration-300 rounded-full"
                            style={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ScrollNavigation
