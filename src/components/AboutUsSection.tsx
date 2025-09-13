import React from 'react';
import imgABout from '../assets/img/about.jpg';

const AboutUsSection: React.FC = () => {
  return (
    <section className="w-full">
      {/* Top Quote Section */}
      <div className="text-center border-b border-gray-200 pb-10 pt-16 max-w-4xl mx-auto px-4">
        <h2 className="text-xl font-semibold tracking-widest mb-4 text-gray-800">ABOUT LIKHAWAT</h2>
        <p className="text-gray-700 text-lg leading-relaxed mb-10">
          Welcome to our printing press business, where we transform your ideas into captivating printed materials. With state-of-the-art technology and a skilled team, we offer a wide range of printing services for businesses and individuals alike. From business cards to brochures, flyers to posters, we deliver exceptional quality and vibrant colors that make your brand stand out.
        </p>
        <a href='/about-us' className="mt-10 px-6 py-2 bg-black text-white font-medium text-sm hover:bg-gray-800 transition" style={{marginTop: '20px'}}>
          READ MORE
        </a>
      </div>

      {/* Founder Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 py-20 lg:py-28">
        {/* Left Content */}
        <div className="px-6 lg:px-16 flex flex-col justify-center">
          <h3 className="text-3xl font-bold mb-6 text-gray-900 text-center">
            Meet the man of the hour!
          </h3>
          <p className="text-gray-700 leading-relaxed mb-6 text-center">
          Founded in 2002, Likhavat Printing Press has been a cornerstone of the printing industry, delivering high-quality printing solutions with unwavering dedication and precision. What began as a modest venture driven by a passion for craftsmanship has evolved into a trusted name synonymous with excellence, innovation, and customer satisfaction
          </p>
          <p className="text-gray-900 font-medium text-center">Gautam Anand</p>
          <p className="text-gray-600 text-sm text-center">Founder</p>
        </div>

        {/* Right Image */}
        <div className="h-full w-full">
          <img
            src={imgABout}
            alt="Founder"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
