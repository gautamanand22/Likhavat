import React from 'react';
import { Mail, Clock, Phone } from 'lucide-react';
import img from '../assets/img/new-img/section 3 - about founder replacement.jpg';

// A reusable Input component with a floating label style to match the new design
const FloatingLabelInput: React.FC<{ id: string; name: string; type: string; autoComplete: string; children: string; }> = ({ id, name, type, autoComplete, children }) => (
    <div className="relative">
        <input
            id={id}
            name={name}
            type={type}
            autoComplete={autoComplete}
            className="peer w-full py-2 bg-transparent border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-gray-800"
            placeholder={children}
        />
        <label
            htmlFor={id}
            className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-500 peer-focus:text-sm"
        >
            {children}
        </label>
    </div>
);

// A reusable Textarea component with the same floating label style
const FloatingLabelTextarea: React.FC<{ id: string; name: string; children: string; }> = ({ id, name, children }) => (
    <div className="relative">
        <textarea
            id={id}
            name={name}
            rows={4}
            className="peer w-full py-2 bg-transparent border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-gray-800"
            placeholder={children}
        ></textarea>
        <label
            htmlFor={id}
            className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-500 peer-focus:text-sm"
        >
            {children}
        </label>
    </div>
);


const ContactPage: React.FC = () => {
    return (
        <div className="bg-gray-100 font-sans flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-6xl mx-auto">
                <div className=" overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
                    
                    {/* Left side: Image */}
                    <div className="relative hidden lg:block">
                        <img 
                            className="absolute inset-0 h-full w-full object-cover" 
                            src={img}
                            alt="A modern, sunlit interior" 
                        />
                    </div>

                    {/* Right side: Form and Details */}
                    <div className="p-8 sm:p-12">
                        <h2 className="text-3xl font-serif font-bold text-gray-900 tracking-tight text-center mb-2">Contact Us</h2>
                        <p className="text-center text-gray-600 mb-10">Have a question? We'd love to hear from you.</p>

                        <form action="#" method="POST" className="space-y-8">
                            <FloatingLabelInput id="name" name="name" type="text" autoComplete="name">
                                Your Name
                            </FloatingLabelInput>
                            
                            <FloatingLabelInput id="email" name="email" type="email" autoComplete="email">
                                Your Email
                            </FloatingLabelInput>

                            <FloatingLabelInput id="subject" name="subject" type="text" autoComplete="off">
                                Subject
                            </FloatingLabelInput>
                            
                            <FloatingLabelTextarea id="message" name="message">
                                Your Message
                            </FloatingLabelTextarea>
                            
                            <div>
                                <button type="submit" className="w-full mt-4 px-8 py-3 bg-transparent text-gray-800 font-semibold border-2 border-gray-800 rounded-md hover:bg-gray-900 transition-colors duration-300 uppercase tracking-widest">
                                    Send Message
                                </button>
                            </div>
                        </form>

                      
                    </div>
                </div>

                  {/* Updated Contact Details Section */}
                        <div className="mt-12 pt-8 border-t border-gray-200">
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                               {/* Card 1: Contact Methods */}
                               <div className="border border-gray-200 rounded-lg p-6 text-center flex flex-col h-full">
                                   <div className="flex-grow">
                                       <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-black text-white mb-4">
                                           <Phone className="h-6 w-6" />
                                       </div>
                                       <h3 className="text-xl font-serif font-semibold text-gray-900">Call Us</h3>
                                       <div className="mt-4 text-gray-800 font-medium space-y-1">
                                           <p><a href="tel:+12125550123" className="hover:underline">US: (212) 555-0123</a></p>
                                           <p><a href="tel:+442071234567" className="hover:underline">UK: 020 7123 4567</a></p>
                                       </div>
                                   </div>
                                   <div className="mt-6 text-gray-600 text-sm">
                                       <p>Monday to Friday 8am–10pm</p>
                                       <p>Saturday 9am–5pm</p>
                                   </div>
                               </div>

                               {/* Card 2: Email */}
                               <div className="border border-gray-200 rounded-lg p-6 text-center flex flex-col h-full">
                                   <div className="flex-grow">
                                       <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-black text-white mb-4">
                                           <Mail className="h-6 w-6" />
                                       </div>
                                       <h3 className="text-xl font-serif font-semibold text-gray-900">Email Us</h3>
                                       <p className="mt-4 text-gray-600 max-w-xs mx-auto">
                                           For inquiries about orders, support, and more, drop us a line.
                                       </p>
                                       <p className="mt-4 text-gray-800 font-medium">
                                           <a href="mailto:hello@likawai.com" className="hover:underline">hello@likawai.com</a>
                                       </p>
                                   </div>
                                    <div className="mt-6 text-gray-600 text-sm">
                                       <p>We aim to reply within 24 hours.</p>
                                   </div>
                               </div>
                           </div>
                        </div>
            </div>
        </div>
    );
};

export default ContactPage;
