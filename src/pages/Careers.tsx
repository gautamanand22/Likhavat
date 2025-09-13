import React from 'react';
import { Clock, Building } from 'lucide-react';
import { PageHero, SectionTitle } from './Hero';

const CareersPage: React.FC = () => {
    const jobOpenings = [
        { title: 'Senior Graphic Designer', location: 'Remote', type: 'Full-time', description: 'Seeking a creative and experienced designer to lead high-profile client projects.' },
        { title: 'Print Production Specialist', location: 'New York, NY', type: 'Full-time', description: 'A hands-on role for a detail-oriented individual with a passion for print technology.' },
        { title: 'Junior Account Manager', location: 'New York, NY', type: 'Part-time', description: 'An exciting opportunity for a budding professional to support our client relations team.' },
    ];

    return (
        <div className="bg-white text-gray-700 font-sans">
            <PageHero title="Join Our Team" subtitle="We're looking for passionate, creative, and driven individuals to help us shape the future of print." imageUrl="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop" />
            
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <SectionTitle>Why Work With Us?</SectionTitle>
                        <p className="mt-6 text-lg leading-relaxed">
                            We believe that a great company is built by great people. We foster a collaborative, creative, and supportive environment where every team member has the opportunity to grow and make an impact. We offer competitive salaries, comprehensive benefits, and a culture that values work-life balance and continuous learning.
                        </p>
                    </div>
                </div>
            </section>

            <section className="bg-gray-50 py-16 md:py-24">
                <div className="container mx-auto px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <SectionTitle>Current Openings</SectionTitle>
                        <div className="mt-12 space-y-8">
                            {jobOpenings.map((job, index) => (
                                <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                                    <div>
                                        <h3 className="text-xl font-serif text-gray-800">{job.title}</h3>
                                        <div className="flex items-center space-x-4 text-gray-500 mt-2 text-sm">
                                            <span className="flex items-center"><Building className="h-4 w-4 mr-1.5" /> {job.location}</span>
                                            <span className="flex items-center"><Clock className="h-4 w-4 mr-1.5" /> {job.type}</span>
                                        </div>
                                        <p className="mt-3 text-gray-600 max-w-2xl">{job.description}</p>
                                    </div>
                                    <button className="mt-4 sm:mt-0 px-6 py-2 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-900 transition-colors duration-300 shrink-0">
                                        Apply Now
                                    </button>
                                </div>
                            ))}
                        </div>
                         <div className="text-center mt-12">
                            <p className="text-lg">Don't see a role that fits? We're always looking for talent.</p>
                            <a href="mailto:careers@likawai.com" className="mt-2 inline-block text-gray-800 font-semibold hover:underline">
                                Send us your resume
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CareersPage;
