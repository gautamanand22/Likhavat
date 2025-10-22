import React from 'react';
import FlipbookCatalog from './FlipbookCatalog';

import img1 from '../../assets/img/offset.jpg';
import img2 from '../../assets/img/visiting.jpg';
import img3 from '../../assets/img/letter.png';
import img4 from '../../assets/img/merchandise.png';
import img5 from '../../assets/img/manual.jpg';
import img6 from '../../assets/img/pamplate.png';
import img7 from '../../assets/img/book.png';
import img8 from '../../assets/img/cloth.png';
import img9 from '../../assets/img/tshirt.png';
import img10 from '../../assets/img/banner.png';



const pages  = [
  { src: img1, title: 'Offset Printing',  link: '/services' },
  { src: img2, title: 'Visiting Card Printing', link: '/services' },
  { src: img3, title: 'Letter Head Printing', link: '/services' },
  { src: img4, title: 'Merchandise Printing', link: '/services' },
  { src: img5, title: 'Manual Printing', link: '/services' },
  { src: img6, title: 'Pamplet Printing', link: '/services' },
  { src: img7, title: 'Book Printing', link: '/services' },
  { src: img8, title: 'Cloth Printing', link: '/services' },
   { src: img9, title: 'Tshirt Printing', link: '/services' },
   { src: img10, title: 'Banner Printing', link: '/services' },
   
];

const ServiceSection: React.FC = () => {
  return (
    <section className="py-16 px-4 max-w-screen-xl mx-auto">
      <h2 className="text-3xl sm:text-4xl font-light uppercase tracking-wider text-center mb-12">
        Our Services
      </h2>

       <FlipbookCatalog pages={pages} />
    </section>
  );
};

export default ServiceSection;
