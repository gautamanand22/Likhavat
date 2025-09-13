// src/components/Portfolio.tsx
import React from "react";

// Import all 19 images
import work1 from "../assets/1.jpg";
import work2 from "../assets/2.jpg";
import work3 from "../assets/3.jpg";
import work4 from "../assets/4.jpg";
import work5 from "../assets/5.jpg";
import work6 from "../assets/6.jpg";
import work7 from "../assets/7.jpg";
import work8 from "../assets/8.jpg";
import work9 from "../assets/9.jpg";
import work10 from "../assets/10.jpg";
import work11 from "../assets/11.jpg";
import work12 from "../assets/12.jpg";
import work13 from "../assets/13.jpg";
import work14 from "../assets/14.jpg";
import work15 from "../assets/15.jpg";
import work16 from "../assets/16.jpg";
import work17 from "../assets/17.jpg";
import work18 from "../assets/18.jpg";
import work19 from "../assets/19.jpg";

// Types
interface WorkItem {
  id: number;
  image: string;
  title: string;
  category: string;
}

// Portfolio items
const portfolioItems: WorkItem[] = [
  { id: 1, image: work1, title: "Next Generation Technology", category: "IT Services" },
  { id: 2, image: work2, title: "Wings Bhor", category: "NGO" },
  { id: 3, image: work3, title: "Garima Services", category: "Business" },
  { id: 4, image: work4, title: "Upasana Clinic", category: "Healthcare" },
  { id: 5, image: work5, title: "Lalee Caterers", category: "Food & Beverage" },
  { id: 6, image: work6, title: "Charvee's Dance Academy", category: "Education" },
  { id: 7, image: work7, title: "New India Auto", category: "Automotive" },
  { id: 8, image: work8, title: "Bhushan Anand", category: "Consultancy" },
  { id: 9, image: work9, title: "Angel X-ray", category: "Medical Imaging" },
  { id: 10, image: work10, title: "S2S IT Surveillance", category: "Technology" },
  { id: 11, image: work11, title: "NKS & CO", category: "Finance" },
  { id: 12, image: work12, title: "Upasana Dental", category: "Healthcare" },
  { id: 13, image: work13, title: "Nutritional Guide", category: "Wellness" },
  { id: 14, image: work14, title: "Dental Care", category: "Healthcare" },
  { id: 15, image: work15, title: "Charma Ayurvedic Clinic", category: "Healthcare" },
  { id: 16, image: work16, title: "Healthcare Card", category: "Medical" },
  { id: 17, image: work17, title: "New Girls & Boys Hostel", category: "Real Estate" },
  { id: 18, image: work18, title: "Informational Poster", category: "Education" },
  { id: 19, image: work19, title: "Sinha Medico", category: "Pharmacy" },
];

const Portfolio: React.FC = () => {
  return (
    <div className=" text-white">
      {/* Hero Banner */}
      <div
        className="relative h-screen flex items-center justify-center"
        style={{
          backgroundImage: "url('/banner.jpg')", // replace with your banner image path
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content */}
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-9xl font-light tracking-tight" style={{letterSpacing: "0.05em"}}>
           Portfolio
          </h1>
         
        </div>
      </div>

      {/* Portfolio Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
          {portfolioItems.map((item) => (
            <div
              key={item.id}
              className="mb-4 break-inside-avoid group relative overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-auto object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-105"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                <div className="absolute bottom-0 left-0 p-4">
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  <p className="text-sm text-gray-300">{item.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
