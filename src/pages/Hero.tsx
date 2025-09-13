import React from 'react';

// src/components/SectionTitle.tsx
export const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-3xl md:text-4xl font-serif text-center text-gray-800 tracking-wider">
    {children}
  </h2>
);

export const PageHero: React.FC<{ title: string; subtitle: string; imageUrl: string }> = ({ title, subtitle, imageUrl }) => (
    <div className="relative h-screen bg-gray-200">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white p-4">
            <h1 className="text-4xl md:text-[7rem] font-serif tracking-wider">{title}</h1>
            <p className="mt-20 max-w-2xl mx-auto text-2xl text-gray-200">
              {subtitle}
            </p>
          </div>
        </div>
    </div>
);
