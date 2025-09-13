import React from 'react';

// Using lucide-react for icons. You might need to install it:
// npm install lucide-react
// yarn add lucide-react
import { Award, Target, Users, Eye, PenTool, Milestone } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// --- DUMMY DATA (Replace with your actual content) ---

const teamMembers = [
  {
    name: 'Alexandra Chen',
    role: 'Founder & Lead Designer',
    bio: 'With a passion for tactile materials and minimalist aesthetics, Alexandra founded our company to bring bespoke printing to the forefront of design.',
    imageUrl: 'https://placehold.co/400x400/e2e8f0/334155?text=Alexandra',
  },
  {
    name: 'Benjamin Carter',
    role: 'Head of Operations',
    bio: 'Benjamin ensures that every project, from conception to completion, is executed flawlessly and exceeds client expectations.',
    imageUrl: 'https://placehold.co/400x400/e2e8f0/334155?text=Benjamin',
  },
  {
    name: 'Chloe Davis',
    role: 'Client Relations Manager',
    bio: 'Chloe is the bridge between our clients\' visions and our creative team, ensuring a seamless and collaborative experience.',
    imageUrl: 'https://placehold.co/400x400/e2e8f0/334155?text=Chloe',
  },
];

const timelineEvents = [
  {
    year: '2018',
    title: 'The Spark of an Idea',
    description: 'Our founder, inspired by traditional printmaking, envisioned a modern studio dedicated to quality and customization.',
  },
  {
    year: '2019',
    title: 'Studio Founded',
    description: 'We opened our first small studio, equipped with state-of-the-art technology and a passion for the craft.',
  },
  {
    year: '2021',
    title: 'First Major Collaboration',
    description: 'Partnered with a leading interior design firm, solidifying our reputation for excellence and creativity.',
  },
  {
    year: '2023',
    title: 'Expanding Our Horizons',
    description: 'Moved into a larger facility to accommodate growing demand and expand our range of services.',
  },
];


// --- REACT COMPONENTS ---

// Helper component for section titles
const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-3xl md:text-4xl font-serif text-center text-gray-800 tracking-wider">
    {children}
  </h2>
);

// Main About Us Page Component
const AboutUsPage: React.FC = () => {
  return (
   <>
   <Header/>

 <div className="bg-white text-gray-700 font-sans">
      {/* Hero Section */}
      <div className="relative h-screen bg-gray-200">
        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
          alt="Our Team"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white p-4">
            <h1 className="text-4xl md:text-[7rem] font-serif tracking-wider">About Us</h1>
            <p className="mt-20 max-w-2xl mx-auto text-lg text-gray-200">
              We are a collective of designers, artisans, and visionaries dedicated to the art of premium printing.
            </p>
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <SectionTitle>Our Story</SectionTitle>
            <p className="mt-6 text-lg leading-relaxed">
              Founded on the principle that quality printing can transform ideas into tangible elegance, LIKAWAI began as a small workshop with a grand vision. We saw a need for a printing partner that valued craftsmanship as much as technology. Today, we blend cutting-edge techniques with a timeless commitment to detail, helping businesses and individuals tell their stories through beautiful, customized prints.
            </p>
          </div>
        </div>
      </section>

      {/* Our Philosophy Section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <SectionTitle>Our Philosophy</SectionTitle>
            <p className="mt-6 text-lg">
              Three core pillars guide every project we undertake.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-white p-5 rounded-full shadow-sm mb-4">
                <Award className="h-8 w-8 text-gray-700" />
              </div>
              <h3 className="text-xl font-semibold font-serif text-gray-800 mb-2">Uncompromising Quality</h3>
              <p>From paper selection to the final press, we ensure every detail is perfect. Quality isn't a goal; it's our guarantee.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-white p-5 rounded-full shadow-sm mb-4">
                <PenTool className="h-8 w-8 text-gray-700" />
              </div>
              <h3 className="text-xl font-semibold font-serif text-gray-800 mb-2">Bespoke Craftsmanship</h3>
              <p>Your vision is unique. Our process is tailored to bring your specific ideas to life with precision and creative flair.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-white p-5 rounded-full shadow-sm mb-4">
                <Users className="h-8 w-8 text-gray-700" />
              </div>
              <h3 className="text-xl font-semibold font-serif text-gray-800 mb-2">Collaborative Partnership</h3>
              <p>We work with you, not just for you. Your success is our success, and we build lasting relationships based on trust and shared goals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
             <SectionTitle>Meet the Minds Behind the Magic</SectionTitle>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {teamMembers.map((member) => (
              <div key={member.name} className="text-center">
                <div className="relative w-full aspect-square mx-auto mb-4">
                   <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="w-full h-full object-cover rounded-lg shadow-md"
                  />
                </div>
                <h3 className="text-xl font-semibold font-serif text-gray-800">{member.name}</h3>
                <p className="text-gray-500 mb-2">{member.role}</p>
                <p className="text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <SectionTitle>Our Journey</SectionTitle>
          </div>
          <div className="relative max-w-2xl mx-auto">
            {/* The vertical line */}
            <div className="absolute left-1/2 top-0 h-full w-0.5 bg-gray-200 -translate-x-1/2"></div>
            
            {timelineEvents.map((event, index) => (
              <div key={index} className="relative mb-12 flex items-center">
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left ml-auto'}`}>
                  <p className="font-bold text-gray-500">{event.year}</p>
                  <h3 className="text-lg font-serif font-semibold text-gray-800 mt-1">{event.title}</h3>
                  <p className="text-gray-600 mt-1">{event.description}</p>
                </div>
                {/* The circle on the line */}
                <div className="absolute left-1/2 -translate-x-1/2 bg-white border-2 border-gray-300 rounded-full h-4 w-4 z-10"></div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Call to Action Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-serif text-gray-800">
            Ready to bring your vision to life?
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-lg">
            Let's discuss how our passion for print can elevate your brand.
          </p>
          <button className="mt-8 px-8 py-3 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-900 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-opacity-50">
            Get In Touch
          </button>
        </div>
      </section>
    </div>

   <Footer/>
   </>
  );
};

export default AboutUsPage;