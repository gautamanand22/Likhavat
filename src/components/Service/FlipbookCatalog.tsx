import React from 'react';
import HTMLFlipBook from 'react-pageflip';
import LazyImage from '../LazyImage';

type FlipbookCatalogProps = {
  pages: {
    src: string;
    title: string;
    link?: string;
  }[];
};

const FlipbookCatalog: React.FC<FlipbookCatalogProps> = ({ pages }) => {
  return (
    <div className="w-full px-4 pb-10">
      {/* Desktop/Tablet Flipbook */}
      <div className="hidden md:flex justify-center">
        <HTMLFlipBook
          width={550}
          height={700}
          size="stretch"
          minWidth={280}
          maxWidth={1000}
          minHeight={400}
          maxHeight={1536}
          showCover={true}
          mobileScrollSupport={true}
          drawShadow={true}
          flippingTime={1000}
          useMouseEvents={true}
          clickEventForward={true}
          usePortrait={false}
          startPage={0}
          autoSize={false}
          maxShadowOpacity={0.5}
          style={{}}
          startZIndex={0}
          swipeDistance={30}
          showPageCorners={true}
          disableFlipByClick={false}
          className="flipbook"
        >
          {pages.map((page, idx) => (
            <div key={idx} className="relative w-full h-full overflow-hidden">
              <LazyImage
                src={page.src}
                alt={`Page ${idx + 1}`}
                className="w-full h-full object-cover"
                priority={idx < 2}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-30 text-white text-center px-6">
                <h3 className="text-2xl font-semibold drop-shadow mb-10">
                  {page.title}
                </h3>
                <a
                  href={page.link || '#'}
                  className="bg-white text-black px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transition duration-300"
                >
                  Read More
                </a>
              </div>
            </div>
          ))}
        </HTMLFlipBook>
      </div>

      {/* Mobile Card Layout */}
      <div className="block md:hidden space-y-6">
        {pages.map((page, idx) => (
          <div
            key={idx}
            className="relative w-full rounded-lg overflow-hidden shadow-lg"
          >
            <LazyImage
              src={page.src}
              alt={`Page ${idx + 1}`}
              className="w-full h-auto object-cover"
              priority={idx < 2}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-30 text-white text-center px-4 py-6">
              <h3 className="text-xl font-semibold drop-shadow mb-3">
                {page.title}
              </h3>
              <a
                href={page.link || '#'}
                className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transition duration-300"
              >
                Read More
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlipbookCatalog;
