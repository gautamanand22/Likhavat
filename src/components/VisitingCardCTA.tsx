import React from 'react';
import { Link } from 'react-router-dom';

const VisitingCardCTA: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Create Your Own Visiting Card
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Design professional visiting cards instantly with our online editor. 
            Choose from multiple templates, customize colors, and get print-ready designs in minutes.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="font-semibold text-gray-900">Easy Design</h3>
              <p className="text-sm text-gray-600">User-friendly editor with real-time preview</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="font-semibold text-gray-900">Instant Results</h3>
              <p className="text-sm text-gray-600">Create professional cards in minutes</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🖨️</span>
              </div>
              <h3 className="font-semibold text-gray-900">Print Ready</h3>
              <p className="text-sm text-gray-600">High-quality designs ready for printing</p>
            </div>
          </div>
          
          <div className="space-y-4 md:space-y-0 md:space-x-4 md:flex md:justify-center">
            <Link
              to="/visiting-card-designer"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Start Designing Now
            </Link>
            <Link
              to="/contact"
              className="inline-block border border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Get Professional Help
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisitingCardCTA;
