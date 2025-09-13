import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const stats = [
  { label: "years of experience", end: 23 },
  { label: "Projects Delivered", end: 10, suffix: "k +" },
 
  { label: "Happy Client", end: 5, suffix: " K" },
];

const StatsSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <section
      ref={ref}
      className="bg-white pb-24 w-full overflow-hidden px-4 sm:px-6 lg:px-8"
    >
      <div className="w-full flex justify-between items-center flex-wrap md:flex-nowrap gap-y-10 md:gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="relative flex-1 min-w-[140px] flex items-center justify-center"
          >
            {/* Label over faded number */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-center px-2">
              <p className="text-sm sm:text-base md:text-lg  text-black" style={{fontWeight: '400'}}>
                {stat.label}
              </p>
            </div>

            {/* Faded number in background */}
            <div className="text-[80px] sm:text-[100px] md:text-[120px] lg:text-[140px] font-light text-black opacity-5 leading-none text-center">
              {inView && (
                <CountUp end={stat.end} suffix={stat.suffix || ""} duration={2} />
              )}
            </div>

            {/* Divider for desktop only */}
            {index !== stats.length - 1 && (
              <div className="hidden md:block absolute top-1/2 right-0 transform -translate-y-1/2 h-16 w-px bg-gray-300" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
