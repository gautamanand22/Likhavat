import React from 'react';

// SVG Icon Components
const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className || "w-6 h-6"}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
    />
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className || "w-6 h-6"}
    >
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className || "w-6 h-6"}
    >
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919C8.416 2.175 8.796 2.163 12 2.163zm0 1.441c-3.116 0-3.478.012-4.695.068-2.618.12-3.832 1.325-3.95 3.95-.056 1.218-.067 1.571-.067 4.67s.011 3.452.067 4.67c.118 2.623 1.332 3.832 3.95 3.95 1.217.056 1.579.068 4.695.068s3.478-.012 4.695-.068c2.618-.118 3.832-1.327 3.95-3.95.056-1.218.067-1.571.067-4.67s-.011-3.452-.067-4.67c-.118-2.623-1.332-3.832-3.95-3.95C15.478 3.615 15.116 3.604 12 3.604z" />
        <path d="M12 6.865a5.135 5.135 0 100 10.27 5.135 5.135 0 000-10.27zm0 8.468a3.333 3.333 0 110-6.666 3.333 3.333 0 010 6.666z" />
        <path d="M16.965 6.57a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5z" />
    </svg>
);


const SeahorseLogo = ({ className }: { className?: string }) => (
    <svg 
        className={className || "w-24 h-24"} 
        viewBox="0 0 100 100" 
        xmlns="http://www.w3.org/2000/svg"
        fill="#D4AF37" // Gold-like color
    >
        <path d="M63.8,22.2c-2.4-2.4-5.6-3.8-9-3.8c-3.4,0-6.6,1.3-9,3.8c-4.5,4.5-5.2,11.5-2,16.8l-7.2,7.2c-1.2,1.2-1.9,2.8-1.9,4.5 v11.8c0,2.6,2.1,4.7,4.7,4.7h2.4c-0.5,1.5-0.8,3.1-0.8,4.7c0,6.2,5,11.2,11.2,11.2s11.2-5,11.2-11.2c0-1.6-0.3-3.2-0.8-4.7h2.4 c2.6,0,4.7-2.1,4.7-4.7V50.6c0-1.7-0.7-3.3-1.9-4.5l-7.2-7.2C69,33.7,68.3,26.7,63.8,22.2z M54.8,24.4c2.5,0,4.8,1,6.5,2.7 c3.2,3.2,3.8,8.2,1.5,12.2l-2.4,4.2L58,41.1l-4.2-2.4C49.6,36.5,49,31.5,52.1,28.3C52.9,27.5,53.8,24.4,54.8,24.4z M46.5,45.4 l10.6,6.1v8.9H46.5V45.4z M58.1,70.5c-3.4,0-6.2-2.8-6.2-6.2s2.8-6.2,6.2-6.2s6.2,2.8,6.2,6.2S61.5,70.5,58.1,70.5z"/>
    </svg>
);


// Reusable component for footer link columns
interface LinkColumnProps {
  title: string;
  links: string[];
}

const LinkColumn: React.FC<LinkColumnProps> = ({ title, links }) => (
  <div>
    <h3 className="text-sm font-semibold text-gray-800 tracking-wider uppercase mb-4">{title}</h3>
    <ul className="space-y-2">
      {links.map((link) => (
        <li key={link}>
          <a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
            {link}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

// The main Footer Component
const Footer: React.FC = () => {
  const shopLinks = ['NEW THIS SEASON', 'ALL PRODUCTS', 'ESSENTIALS'];
  const connectLinks = ['INSTAGRAM', 'FACEBOOK', 'PINTEREST'];
  const legalLinks = ['SHIPPING', 'RETURN'];
  const ourStoryLinks = ['BLOG', 'ABOUT US'];
  const bottomLinks = ['Privacy policy', 'Refund policy', 'Terms of service', 'Shipping policy', 'Contact information'];

  return (
    <footer className="bg-white text-gray-500 font-light">
      <div className="container mx-auto px-6 sm:px-8 lg:px-16 pt-20 pb-8">
        {/* Top section with links and newsletter */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
          <div className="sm:col-span-1 md:col-span-1">
            <LinkColumn title="Shop" links={shopLinks} />
          </div>
          <div className="sm:col-span-1 md:col-span-1">
            <LinkColumn title="Connect" links={connectLinks} />
          </div>
          <div className="sm:col-span-1 md:col-span-1">
            <LinkColumn title="Legal" links={legalLinks} />
          </div>
          <div className="sm:col-span-1 md:col-span-1">
            <LinkColumn title="Our Story" links={ourStoryLinks} />
          </div>
          <div className="sm:col-span-2 md:col-span-3 lg:col-span-1">
            <h3 className="text-sm font-semibold text-gray-800 tracking-wider uppercase mb-4">Sign up for our newsletter</h3>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex items-center border-b border-gray-500 py-2"
            >
              <input
                type="email"
                placeholder="Email address"
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none placeholder-gray-400"
                aria-label="Email address"
              />
              <button
                type="submit"
                className="flex-shrink-0 text-gray-500 hover:text-gray-900"
              >
                <ArrowRightIcon className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>

        {/* Logo Section */}
        <div className="text-center my-10">
            <div className="inline-block">
                <p className="font-medium text-2xl text-gray-800">LIKHAWAT</p>
                <span className="font-medium text-pink-500">Printing Press</span>
            </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200">
        <div className="container mx-auto px-6 sm:px-8 lg:px-16 py-4">
            <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 space-y-4 sm:space-y-0">
                <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
                    <span>© 2025 Steel Noire, Powered by Shopify</span>
                    <div className="hidden sm:flex space-x-4">
                        {bottomLinks.map(link => (
                             <a key={link} href="#" className="hover:text-gray-900">{link}</a>
                        ))}
                    </div>
                </div>
                <div className="flex space-x-5">
                    <a href="#" aria-label="Facebook" className="text-gray-500 hover:text-gray-900">
                        <FacebookIcon className="h-5 w-5" />
                    </a>
                    <a href="#" aria-label="Instagram" className="text-gray-500 hover:text-gray-900">
                        <InstagramIcon className="h-5 w-5" />
                    </a>
                </div>
            </div>
             <div className="flex sm:hidden flex-wrap justify-center items-center space-x-4 mt-4">
                {bottomLinks.map(link => (
                    <a key={link} href="#" className="hover:text-gray-900 text-xs">{link}</a>
                ))}
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
