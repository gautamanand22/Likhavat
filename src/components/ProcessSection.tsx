import React from "react";
import LazyImage from "./LazyImage";
import img1 from "../assets/img/design.jpg";
import img2 from "../assets/img/pay.avif";
import img3 from "../assets/img/delivery.avif";

const ServicesOverview = () => {
  const services = [
    {
      title: "Describe Your Design ",
      description:
        "Tell us your idea and how you envision the product. We’ll craft a prototype that brings your vision to life.",
      image: img1,
    },
    {
      title: "Confirm & Pay ",
      description:
        "Review the final design and matter. Once you're happy, make the payment—online or in person.",
      image: img2,
    },
    {
      title: "Grab or Get Delivered",
      description:
        "Pick up your finished product from our shop—or let us deliver it to your doorstep.",
      image: img3,
    },
 
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 pb-16 pt-6">
      <h2 className="font-georgia text-3xl md:text-4xl  font-light text-center mb-12 leading-snug">
      PROCESS <br />
Just 3 Easy Steps
      </h2>
      
 
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14">
        {services.map((service, index) => {
          const isTall = index === 0 || index === 2;
          const imageHeight = isTall ? "h-[420px]" : "h-[240px]";
          const verticalOffset = !isTall ? "mt-16" : "";

          return (
            <div key={index} className={` ${verticalOffset}`}>
              <LazyImage
                src={service.image}
                alt={service.title}
                className={`w-full object-cover mb-4 rounded-sm ${imageHeight}`}
              />
              <h3 className="text-2xl  font-semibold mb-2">
                {service.title}
              </h3>
              <p className="text-sm text-gray-800">{service.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ServicesOverview;
