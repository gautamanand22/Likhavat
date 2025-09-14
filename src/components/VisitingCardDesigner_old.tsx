import React, { useState, useRef } from 'react';

interface CardData {
  name: string;
  title: string;
  company: string;
  phone: string;
  email: string;
  address: string;
  website: string;
  bgColor: string;
  textColor: string;
  accentColor: string;
  template: 'modern' | 'classic' | 'minimal' | 'elegant' | 'creative' | 'corporate' | 'gradient' | 'dark' | 'colorful' | 'professional' | 'artistic' | 'tech' | 'luxury' | 'geometric' | 'nature' | 'bold' | 'vintage' | 'futuristic';
  cornerStyle: 'normal' | 'rounded' | 'sharp';
}

interface CardElement {
  id: string;
  type: 'text' | 'qr' | 'logo' | 'icon' | 'shape';
  content: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  style: any;
  side: 'front' | 'back';
}

const VisitingCardDesigner: React.FC = () => {
  const [cardData, setCardData] = useState<CardData>({
    name: 'John Doe',
    title: 'Senior Manager',
    company: 'Your Company Name',
    phone: '+91 79798 31185',
    email: 'john.doe@company.com',
    address: '123 Business Street, City - 400001',
    website: 'www.yourcompany.com',
    bgColor: '#ffffff',
    textColor: '#333333',
    accentColor: '#007bff',
    template: 'modern',
    cornerStyle: 'rounded'
  });

  const [currentView, setCurrentView] = useState<'front' | 'back'>('front');
  const [cardElements, setCardElements] = useState<CardElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<CardElement | null>(null);
  const [draggedElement, setDraggedElement] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const templates = [
    { id: 'modern', name: 'Modern', preview: '🌟', desc: 'Clean lines with gradient accent' },
    { id: 'classic', name: 'Classic', preview: '📋', desc: 'Traditional business style' },
    { id: 'minimal', name: 'Minimal', preview: '⚪', desc: 'Simple and clean design' },
    { id: 'elegant', name: 'Elegant', preview: '💎', desc: 'Sophisticated and refined' },
    { id: 'creative', name: 'Creative', preview: '🎨', desc: 'Artistic with unique shapes' },
    { id: 'corporate', name: 'Corporate', preview: '🏢', desc: 'Professional business look' },
    { id: 'gradient', name: 'Gradient', preview: '🌈', desc: 'Colorful gradient background' },
    { id: 'dark', name: 'Dark Theme', preview: '🌙', desc: 'Dark background with contrast' },
    { id: 'colorful', name: 'Colorful', preview: '🎯', desc: 'Vibrant and eye-catching' },
    { id: 'professional', name: 'Professional', preview: '💼', desc: 'Executive business style' },
    { id: 'artistic', name: 'Artistic', preview: '🎭', desc: 'Creative patterns and design' },
    { id: 'tech', name: 'Tech', preview: '⚡', desc: 'Modern technology theme' },
    { id: 'luxury', name: 'Luxury', preview: '👑', desc: 'Premium gold accents' },
    { id: 'geometric', name: 'Geometric', preview: '🔷', desc: 'Angular shapes and lines' },
    { id: 'nature', name: 'Nature', preview: '🌿', desc: 'Organic and natural feel' },
    { id: 'bold', name: 'Bold', preview: '🔥', desc: 'Strong typography and colors' },
    { id: 'vintage', name: 'Vintage', preview: '📜', desc: 'Classic retro styling' },
    { id: 'futuristic', name: 'Futuristic', preview: '🚀', desc: 'Modern sci-fi aesthetic' },
  ];

  const handleInputChange = (field: keyof CardData, value: string) => {
    setCardData(prev => ({ ...prev, [field]: value }));
  };

  const addElement = (type: CardElement['type']) => {
    const newElement: CardElement = {
      id: Date.now().toString(),
      type,
      content: type === 'qr' ? 'QR Code' : type === 'text' ? 'Sample Text' : type === 'icon' ? '⭐' : type === 'shape' ? 'circle' : 'Logo',
      position: { x: 50, y: 50 },
      size: { width: type === 'qr' ? 60 : 80, height: type === 'qr' ? 60 : 30 },
      style: { color: cardData.textColor, fontSize: '12px' },
      side: currentView
    };
    setCardElements(prev => [...prev, newElement]);
  };

  const updateElement = (id: string, updates: Partial<CardElement>) => {
    setCardElements(prev => prev.map(el => el.id === id ? { ...el, ...updates } : el));
  };

  const deleteElement = (id: string) => {
    setCardElements(prev => prev.filter(el => el.id !== id));
    setSelectedElement(null);
  };

  const handleElementDrag = (id: string, position: { x: number; y: number }) => {
    updateElement(id, { position });
  };

  const renderElement = (element: CardElement) => {
    const baseStyle = {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: element.style.fontSize || '12px',
      color: element.style.color || cardData.textColor,
      backgroundColor: element.style.backgroundColor || 'transparent',
      border: element.style.border || 'none',
      borderRadius: element.style.borderRadius || '0px',
      overflow: 'hidden'
    };

    switch (element.type) {
      case 'text':
        return (
          <div style={baseStyle}>
            {element.content}
          </div>
        );
      case 'qr':
        return (
          <div
            style={{
              ...baseStyle,
              backgroundColor: '#000',
              color: '#fff',
              fontSize: '8px',
              position: 'relative'
            }}
          >
            <div style={{
              position: 'absolute',
              inset: '2px',
              backgroundColor: '#fff',
              display: 'grid',
              gridTemplateColumns: 'repeat(8, 1fr)',
              gridTemplateRows: 'repeat(8, 1fr)',
              gap: '1px'
            }}>
              {Array.from({ length: 64 }, (_, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: Math.random() > 0.5 ? '#000' : '#fff'
                  }}
                />
              ))}
            </div>
            <div style={{
              position: 'absolute',
              bottom: '-2px',
              left: '0',
              right: '0',
              fontSize: '6px',
              textAlign: 'center',
              backgroundColor: '#fff',
              color: '#000',
              padding: '1px'
            }}>
              QR
            </div>
          </div>
        );
      case 'icon':
        return (
          <div style={baseStyle}>
            {element.content || '⭐'}
          </div>
        );
      case 'shape':
        const shapeStyle = {
          ...baseStyle,
          backgroundColor: element.style.backgroundColor || cardData.accentColor
        };

        if (element.content === 'circle') {
          shapeStyle.borderRadius = '50%';
        } else if (element.content === 'triangle') {
          return (
            <div style={{
              ...baseStyle,
              backgroundColor: 'transparent'
            }}>
              <div style={{
                width: 0,
                height: 0,
                borderLeft: `${element.size.width / 2}px solid transparent`,
                borderRight: `${element.size.width / 2}px solid transparent`,
                borderBottom: `${element.size.height}px solid ${element.style.backgroundColor || cardData.accentColor}`
              }} />
            </div>
          );
        }

        return <div style={shapeStyle}></div>;
      default:
        return (
          <div style={baseStyle}>
            {element.content || 'Element'}
          </div>
        );
    }
  };

  const getCornerRadius = () => {
    switch (cardData.cornerStyle) {
      case 'rounded': return '12px';
      case 'sharp': return '0px';
      case 'normal': return '6px';
      default: return '6px';
    }
  };

  const downloadCard = () => {
    if (cardRef.current) {
      alert('Download functionality will be implemented with print-ready PDF generation');
    }
  };

  const printCard = () => {
    window.print();
  };

  const getTemplateStyle = () => {
    const baseStyle = {
      backgroundColor: cardData.bgColor,
      color: cardData.textColor,
      overflow: 'hidden' as const,
      position: 'relative' as const,
      borderRadius: getCornerRadius(),
    };

    switch (cardData.template) {
      case 'modern':
        return {
          ...baseStyle,
          background: `linear-gradient(135deg, ${cardData.bgColor} 0%, #f8f9fa 100%)`,
          borderLeft: `6px solid ${cardData.accentColor}`,
          boxShadow: `0 4px 20px ${cardData.accentColor}20`,
        };
      case 'classic':
        return {
          ...baseStyle,
          border: `3px solid ${cardData.textColor}`,
          borderRadius: cardData.cornerStyle === 'sharp' ? '0px' : getCornerRadius(),
          fontFamily: 'serif',
          background: `repeating-linear-gradient(0deg, ${cardData.bgColor}, ${cardData.bgColor} 2px, transparent 2px, transparent 4px)`,
        };
      case 'minimal':
        return {
          ...baseStyle,
          border: `1px solid ${cardData.accentColor}40`,
          boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
        };
      case 'elegant':
        return {
          ...baseStyle,
          background: `radial-gradient(ellipse at top, ${cardData.bgColor}, #f9f9f9)`,
          border: `2px solid ${cardData.accentColor}`,
          fontFamily: 'serif',
          boxShadow: `0 10px 30px ${cardData.accentColor}15`,
        };
      case 'creative':
        return {
          ...baseStyle,
          background: `conic-gradient(from 45deg, ${cardData.bgColor}, ${cardData.accentColor}30, ${cardData.bgColor})`,
          borderRadius: cardData.cornerStyle === 'rounded' ? '20px 8px 20px 8px' : getCornerRadius(),
          border: `2px solid ${cardData.accentColor}`,
          transform: 'rotate(-1deg)',
        };
      case 'corporate':
        return {
          ...baseStyle,
          background: `linear-gradient(135deg, ${cardData.accentColor} 0%, ${cardData.accentColor}90 25%, ${cardData.bgColor} 25%)`,
          border: 'none',
        };
      case 'gradient':
        return {
          ...baseStyle,
          background: `linear-gradient(135deg, ${cardData.accentColor}, #667eea, #764ba2)`,
          color: 'white',
          border: 'none',
          boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)',
        };
      case 'dark':
        return {
          ...baseStyle,
          background: `linear-gradient(135deg, #1a1a1a, #2d2d2d)`,
          color: '#ffffff',
          border: `2px solid ${cardData.accentColor}`,
          boxShadow: `0 0 25px ${cardData.accentColor}40`,
        };
      case 'colorful':
        return {
          ...baseStyle,
          background: `conic-gradient(from 0deg at 50% 50%, ${cardData.accentColor}20, ${cardData.bgColor} 120deg, ${cardData.accentColor}10 240deg, ${cardData.bgColor})`,
          border: `3px solid ${cardData.accentColor}`,
          boxShadow: `0 8px 25px ${cardData.accentColor}25`,
        };
      case 'professional':
        return {
          ...baseStyle,
          background: cardData.bgColor,
          borderTop: `8px solid ${cardData.accentColor}`,
          borderBottom: `2px solid ${cardData.accentColor}40`,
          boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
        };
      case 'artistic':
        return {
          ...baseStyle,
          background: `radial-gradient(circle at 20% 80%, ${cardData.accentColor}20 0%, transparent 50%), radial-gradient(circle at 80% 20%, ${cardData.accentColor}15 0%, transparent 50%), ${cardData.bgColor}`,
          borderRadius: cardData.cornerStyle === 'rounded' ? '25px 8px 25px 8px' : getCornerRadius(),
          border: `2px solid ${cardData.accentColor}60`,
        };
      case 'tech':
        return {
          ...baseStyle,
          background: `linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)`,
          color: '#00ff88',
          border: '2px solid #00ff88',
          borderRadius: cardData.cornerStyle === 'sharp' ? '4px' : getCornerRadius(),
          boxShadow: '0 0 30px rgba(0,255,136,0.3), inset 0 0 30px rgba(0,255,136,0.1)',
        };
      case 'luxury':
        return {
          ...baseStyle,
          background: `linear-gradient(135deg, #ffd700 0%, #fff 30%, #ffd700 100%)`,
          border: '3px solid #ffd700',
          color: '#333',
          boxShadow: '0 12px 35px rgba(255,215,0,0.4), 0 0 20px rgba(255,215,0,0.2)',
        };
      case 'geometric':
        return {
          ...baseStyle,
          background: `linear-gradient(45deg, ${cardData.bgColor} 25%, transparent 25%), linear-gradient(-45deg, ${cardData.bgColor} 25%, transparent 25%), linear-gradient(45deg, transparent 75%, ${cardData.accentColor}20 75%), linear-gradient(-45deg, transparent 75%, ${cardData.accentColor}20 75%)`,
          backgroundSize: '20px 20px',
          border: `2px solid ${cardData.accentColor}`,
          borderRadius: cardData.cornerStyle === 'sharp' ? '0px' : getCornerRadius(),
        };
      case 'nature':
        return {
          ...baseStyle,
          background: `radial-gradient(ellipse at center, ${cardData.bgColor} 0%, #e8f5e8 100%)`,
          border: `3px solid #2d5a2d`,
          borderRadius: cardData.cornerStyle === 'rounded' ? '20px' : getCornerRadius(),
          color: '#2d5a2d',
        };
      case 'bold':
        return {
          ...baseStyle,
          background: `linear-gradient(45deg, ${cardData.accentColor} 0%, ${cardData.bgColor} 50%, ${cardData.accentColor} 100%)`,
          border: `4px solid ${cardData.textColor}`,
          fontWeight: 'bold',
          transform: 'skew(-2deg)',
        };
      case 'vintage':
        return {
          ...baseStyle,
          background: `radial-gradient(ellipse at center, #f4f1e8 0%, #e8dcc0 100%)`,
          border: '4px double #8b4513',
          borderRadius: cardData.cornerStyle === 'sharp' ? '0px' : getCornerRadius(),
          color: '#8b4513',
          fontFamily: 'serif',
          boxShadow: 'inset 0 0 20px rgba(139,69,19,0.1)',
        };
      case 'futuristic':
        return {
          ...baseStyle,
          background: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`,
          border: '2px solid #00ffff',
          borderRadius: cardData.cornerStyle === 'sharp' ? '2px' : getCornerRadius(),
          color: '#00ffff',
          boxShadow: '0 0 25px rgba(0,255,255,0.5), inset 0 0 25px rgba(0,255,255,0.1)',
          transform: 'perspective(500px) rotateY(5deg)',
        };
      default:
        return baseStyle;
    }
  };

  const renderCardContent = (side: 'front' | 'back') => {
    const textColor = ['gradient', 'dark', 'tech', 'futuristic'].includes(cardData.template) ? 'white' :
      ['vintage', 'nature'].includes(cardData.template) ? '#8b4513' :
        cardData.template === 'luxury' ? '#333' : cardData.textColor;

    // Get elements for this side
    const sideElements = cardElements.filter(el => el.side === side);

    if (side === 'front') {
      return (
        <div className="h-full flex flex-col justify-between relative">
          {/* Decorative Elements */}
          {cardData.template === 'modern' && (
            <div className="absolute top-2 right-2 w-16 h-16 rounded-full opacity-10" style={{ backgroundColor: cardData.accentColor }}></div>
          )}
          {cardData.template === 'geometric' && (
            <div className="absolute top-0 right-0 w-0 h-0 border-l-[30px] border-b-[30px] border-l-transparent opacity-20" style={{ borderBottomColor: cardData.accentColor }}></div>
          )}
          {cardData.template === 'luxury' && (
            <>
              <div className="absolute top-2 left-2 text-2xl opacity-30">💎</div>
              <div className="absolute bottom-2 right-2 text-xl opacity-20">✨</div>
            </>
          )}
          {cardData.template === 'nature' && (
            <div className="absolute top-2 right-2 text-2xl opacity-30">🌿</div>
          )}
          {cardData.template === 'tech' && (
            <>
              <div className="absolute top-1 right-1 w-2 h-2 bg-current opacity-30 rounded-full"></div>
              <div className="absolute top-4 right-2 w-1 h-1 bg-current opacity-50 rounded-full"></div>
              <div className="absolute top-2 right-6 w-1 h-1 bg-current opacity-40 rounded-full"></div>
            </>
          )}

          <div className="z-10 relative">
            <h3 className={`${cardData.template === 'bold' ? 'text-2xl' : 'text-xl'} font-bold mb-1`} style={{ color: textColor }}>
              {cardData.name}
            </h3>
            <p className={`text-sm opacity-80 mb-2 ${cardData.template === 'vintage' ? 'italic' : ''}`} style={{ color: textColor }}>
              {cardData.title}
            </p>
            <p className={`${cardData.template === 'bold' ? 'text-xl' : 'text-lg'} font-semibold ${cardData.template === 'creative' ? 'transform -skew-x-6' : ''}`} style={{ color: textColor }}>
              {cardData.company}
            </p>
          </div>

          <div className={`text-xs space-y-1 z-10 relative ${cardData.template === 'futuristic' ? 'font-mono' : ''}`} style={{ color: textColor }}>
            <p className="flex items-center">
              <span className="mr-2">📞</span>
              <span>{cardData.phone}</span>
            </p>
            <p className="flex items-center">
              <span className="mr-2">✉️</span>
              <span>{cardData.email}</span>
            </p>
          </div>

          {/* Draggable Elements */}
          {sideElements.map(element => (
            <div
              key={element.id}
              className={`absolute cursor-move ${selectedElement?.id === element.id ? 'ring-2 ring-blue-500' : ''}`}
              style={{
                left: `${element.position.x}px`,
                top: `${element.position.y}px`,
                width: `${element.size.width}px`,
                height: `${element.size.height}px`,
                ...element.style
              }}
              draggable
              onDragEnd={(e) => {
                const rect = e.currentTarget.parentElement?.getBoundingClientRect();
                if (rect) {
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  handleElementDrag(element.id, { x: Math.max(0, Math.min(x, 384 - element.size.width)), y: Math.max(0, Math.min(y, 224 - element.size.height)) });
                }
              }}
              onClick={() => setSelectedElement(element)}
            >
              {renderElement(element)}
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <div className="h-full flex flex-col justify-between relative">
          {/* Back side decorative elements */}
          {cardData.template === 'luxury' && (
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `radial-gradient(circle, ${cardData.accentColor} 1px, transparent 1px)`, backgroundSize: '20px 20px' }}></div>
          )}
          {cardData.template === 'tech' && (
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, currentColor 10px, currentColor 11px)' }}></div>
          )}

          <div className="text-center z-10 relative">
            <div className={`${cardData.template === 'vintage' ? 'w-20 h-20' : 'w-16 h-16'} rounded-full mx-auto mb-4 flex items-center justify-center text-2xl`}
              style={{ backgroundColor: `${cardData.accentColor}20`, color: cardData.accentColor }}>
              {cardData.template === 'tech' ? '⚡' :
                cardData.template === 'luxury' ? '👑' :
                  cardData.template === 'nature' ? '🌿' :
                    cardData.template === 'vintage' ? '📜' :
                      cardData.template === 'futuristic' ? '🚀' : '🏢'}
            </div>
            <h3 className={`${cardData.template === 'bold' ? 'text-xl' : 'text-lg'} font-bold mb-2`} style={{ color: textColor }}>
              {cardData.company}
            </h3>
            {cardData.template === 'luxury' && (
              <div className="text-xs opacity-60 mb-2" style={{ color: textColor }}>
                ── Premium Services ──
              </div>
            )}
          </div>

          <div className="z-10 relative">
            <div className={`text-xs space-y-1 mb-4 ${cardData.template === 'futuristic' ? 'font-mono' : ''}`} style={{ color: textColor }}>
              <p className="flex items-center">
                <span className="mr-2">📍</span>
                <span>{cardData.address}</span>
              </p>
              <p className="flex items-center">
                <span className="mr-2">🌐</span>
                <span>{cardData.website}</span>
              </p>
            </div>

            {/* Draggable Elements for back side */}
            {sideElements.map(element => (
              <div
                key={element.id}
                className={`absolute cursor-move ${selectedElement?.id === element.id ? 'ring-2 ring-blue-500' : ''}`}
                style={{
                  left: `${element.position.x}px`,
                  top: `${element.position.y}px`,
                  width: `${element.size.width}px`,
                  height: `${element.size.height}px`,
                  ...element.style
                }}
                draggable
                onDragEnd={(e) => {
                  const rect = e.currentTarget.parentElement?.getBoundingClientRect();
                  if (rect) {
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    handleElementDrag(element.id, { x: Math.max(0, Math.min(x, 384 - element.size.width)), y: Math.max(0, Math.min(y, 224 - element.size.height)) });
                  }
                }}
                onClick={() => setSelectedElement(element)}
              >
                {renderElement(element)}
              </div>
            ))}

            <div className="text-center">
              <p className="text-xs opacity-70 mb-2" style={{ color: textColor }}>
                {cardData.template === 'tech' ? 'SCAN QR CODE' : 'Scan for digital contact'}
              </p>
              <div className={`${cardData.template === 'vintage' ? 'w-16 h-16' : 'w-12 h-12'} border-2 mx-auto grid grid-cols-3 gap-0.5 p-1`}
                style={{ borderColor: textColor, opacity: 0.5 }}>
                {[...Array(9)].map((_, i) => (
                  <div key={i} className={`${Math.random() > 0.5 ? 'bg-current' : ''} rounded-sm`} style={{ opacity: 0.7 }}></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
      <div className="h-full flex flex-col">

        {/* Header */}
        <div className="text-center py-4 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
          <h1 className="text-2xl font-bold text-gray-800">Professional Visiting Card Designer</h1>
          <p className="text-sm text-gray-600">Create stunning business cards with advanced design tools</p>
        </div>

        {/* Main Layout - Single View */}
        <div className="flex-1 grid grid-cols-12 gap-4 p-4 h-full overflow-hidden">

          {/* Left Panel - Controls */}
          <div className="col-span-3 space-y-3 overflow-y-auto">

            {/* Card Information */}
            <div className="bg-white rounded-lg shadow-md p-3">
              <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                Card Details
              </h3>
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={cardData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Job Title"
                  value={cardData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Company"
                  value={cardData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Phone"
                  value={cardData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={cardData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Address"
                  value={cardData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Website"
                  value={cardData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Colors & Style */}
            <div className="bg-white rounded-lg shadow-md p-3">
              <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                Colors & Style
              </h3>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Background</label>
                    <input
                      type="color"
                      value={cardData.bgColor}
                      onChange={(e) => handleInputChange('bgColor', e.target.value)}
                      className="w-full h-6 border border-gray-300 rounded cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Text</label>
                    <input
                      type="color"
                      value={cardData.textColor}
                      onChange={(e) => handleInputChange('textColor', e.target.value)}
                      className="w-full h-6 border border-gray-300 rounded cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Accent</label>
                    <input
                      type="color"
                      value={cardData.accentColor}
                      onChange={(e) => handleInputChange('accentColor', e.target.value)}
                      className="w-full h-6 border border-gray-300 rounded cursor-pointer"
                    />
                  </div>
                </div>

                {/* Corner Style */}
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Corner Style</label>
                  <div className="grid grid-cols-3 gap-1">
                    {(['normal', 'rounded', 'sharp'] as const).map((style) => (
                      <button
                        key={style}
                        onClick={() => handleInputChange('cornerStyle', style)}
                        className={`p-1 rounded border text-xs transition-all ${cardData.cornerStyle === style
                            ? 'bg-blue-500 text-white border-blue-500'
                            : 'bg-gray-50 text-gray-700 border-gray-300 hover:border-blue-400'
                          }`}
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Elements Panel */}
            <div className="bg-white rounded-lg shadow-md p-3">
              <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Add Elements
              </h3>
              <div className="grid grid-cols-2 gap-2 mb-3">
                <button
                  onClick={() => addElement('text')}
                  className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded hover:from-blue-600 hover:to-blue-700 transition-all flex flex-col items-center text-xs"
                >
                  <span className="text-sm mb-1">📝</span>
                  Text
                </button>
                <button
                  onClick={() => addElement('qr')}
                  className="p-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded hover:from-green-600 hover:to-green-700 transition-all flex flex-col items-center text-xs"
                >
                  <span className="text-sm mb-1">📱</span>
                  QR Code
                </button>
                <button
                  onClick={() => addElement('icon')}
                  className="p-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded hover:from-purple-600 hover:to-purple-700 transition-all flex flex-col items-center text-xs"
                >
                  <span className="text-sm mb-1">🎯</span>
                  Icon
                </button>
                <button
                  onClick={() => addElement('shape')}
                  className="p-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded hover:from-orange-600 hover:to-orange-700 transition-all flex flex-col items-center text-xs"
                >
                  <span className="text-sm mb-1">🔺</span>
                  Shape
                </button>
              </div>

              {/* Selected Element Properties */}
              {selectedElement && (
                <div className="p-2 bg-gray-50 rounded border">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-medium text-gray-700">Edit Element</h4>
                    <button
                      onClick={() => setSelectedElement(null)}
                      className="text-gray-400 hover:text-gray-600 text-xs"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="space-y-2">
                    {selectedElement.type === 'text' && (
                      <input
                        type="text"
                        value={selectedElement.content || ''}
                        onChange={(e) => updateElement(selectedElement.id, { content: e.target.value })}
                        placeholder="Enter text"
                        className="w-full p-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-blue-500"
                      />
                    )}
                    <div className="flex gap-1">
                      <input
                        type="number"
                        value={selectedElement.size.width}
                        onChange={(e) => updateElement(selectedElement.id, {
                          size: { ...selectedElement.size, width: parseInt(e.target.value) || 80 }
                        })}
                        placeholder="W"
                        className="flex-1 p-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-blue-500"
                      />
                      <input
                        type="number"
                        value={selectedElement.size.height}
                        onChange={(e) => updateElement(selectedElement.id, {
                          size: { ...selectedElement.size, height: parseInt(e.target.value) || 30 }
                        })}
                        placeholder="H"
                        className="flex-1 p-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <button
                      onClick={() => deleteElement(selectedElement.id)}
                      className="w-full p-1 bg-red-500 text-white rounded text-xs hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Center Panel - Card Preview */}
          <div className="col-span-6 flex flex-col items-center justify-center">

            {/* Front/Back Toggle */}
            <div className="mb-4">
              <div className="flex bg-white rounded-full shadow-lg p-1">
                <button
                  onClick={() => setCurrentView('front')}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-300 text-sm ${currentView === 'front'
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'text-gray-600 hover:text-blue-500'
                    }`}
                >
                  Front Side
                </button>
                <button
                  onClick={() => setCurrentView('back')}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-300 text-sm ${currentView === 'back'
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'text-gray-600 hover:text-blue-500'
                    }`}
                >
                  Back Side
                </button>
              </div>
            </div>

            {/* Main Card Preview */}
            <div className="relative">
              <div
                ref={cardRef}
                className="w-96 h-56 p-6 shadow-2xl transition-all duration-500 relative cursor-pointer select-none"
                style={getTemplateStyle()}
                onClick={() => setSelectedElement(null)}
              >
                {renderCardContent(currentView)}
              </div>

              {/* Card indicator */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                  {currentView === 'front' ? '📄 Front Side' : '📄 Back Side'}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 mt-8">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center text-sm shadow-md">
                <span className="mr-1">💾</span>
                Save
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center text-sm shadow-md">
                <span className="mr-1">🖨️</span>
                Print
              </button>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center text-sm shadow-md">
                <span className="mr-1">📤</span>
                Export
              </button>
            </div>
          </div>

          {/* Right Panel - Templates */}
          <div className="col-span-3">
            <div className="bg-white rounded-lg shadow-md p-3 h-full">
              <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                Choose Template
              </h3>
              <div className="grid grid-cols-2 gap-2 h-full overflow-y-auto pb-12">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => handleInputChange('template', template.id)}
                    className={`group relative overflow-hidden rounded-lg border-2 transition-all duration-300 aspect-[3/2] ${cardData.template === template.id
                        ? 'border-blue-500 shadow-lg ring-2 ring-blue-200'
                        : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
                      }`}
                  >
                    <div className="w-full h-full p-1">
                      <div
                        className="w-full h-full rounded-sm shadow-sm"
                        style={{
                          ...getTemplateStyle(),
                          transform: 'scale(0.9)',
                          transformOrigin: 'center',
                        }}
                      >
                        <div className="p-1 h-full flex flex-col justify-between" style={{ fontSize: '5px', lineHeight: '6px' }}>
                          <div>
                            <div className="font-bold mb-1">{cardData.name || 'John Doe'}</div>
                            <div className="opacity-80">{cardData.title || 'Designer'}</div>
                          </div>
                          <div className="text-right">
                            <div>{template.preview}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-1">
                      <div className="text-white text-xs font-medium truncate">{template.name}</div>
                    </div>
                    {cardData.template === template.id && (
                      <div className="absolute top-1 right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  <div className="space-y-6">
    {/* Personal Info Section */}
    <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
        Personal Information
      </h3>
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Full Name
          </label>
          <input
            type="text"
            value={cardData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Job Title
          </label>
          <input
            type="text"
            value={cardData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
            placeholder="Your professional title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Company Name
          </label>
          <input
            type="text"
            value={cardData.company}
            onChange={(e) => handleInputChange('company', e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
            placeholder="Your company or organization"
          />
        </div>
      </div>
    </div>

    {/* Contact Info Section */}
    <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
        Contact Information
      </h3>
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Phone Number
          </label>
          <input
            type="text"
            value={cardData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
            placeholder="+91 79798 31185"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Email Address
          </label>
          <input
            type="email"
            value={cardData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
            placeholder="your.email@company.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Address
          </label>
          <input
            type="text"
            value={cardData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
            placeholder="Street, City, PIN Code"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Website
          </label>
          <input
            type="text"
            value={cardData.website}
            onChange={(e) => handleInputChange('website', e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
            placeholder="www.yourcompany.com"
          />
        </div>
      </div>
    </div>

    {/* Color Customization Section */}
    <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
        <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
        Color Customization
      </h3>
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-2">
            Background
          </label>
          <div className="relative">
            <input
              type="color"
              value={cardData.bgColor}
              onChange={(e) => handleInputChange('bgColor', e.target.value)}
              className="w-full h-10 border-2 border-gray-200 rounded-lg cursor-pointer"
            />
            <div className="absolute inset-0 rounded-lg pointer-events-none border border-gray-300"></div>
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-2">
            Text Color
          </label>
          <div className="relative">
            <input
              type="color"
              value={cardData.textColor}
              onChange={(e) => handleInputChange('textColor', e.target.value)}
              className="w-full h-10 border-2 border-gray-200 rounded-lg cursor-pointer"
            />
            <div className="absolute inset-0 rounded-lg pointer-events-none border border-gray-300"></div>
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-2">
            Accent Color
          </label>
          <div className="relative">
            <input
              type="color"
              value={cardData.accentColor}
              onChange={(e) => handleInputChange('accentColor', e.target.value)}
              className="w-full h-10 border-2 border-gray-200 rounded-lg cursor-pointer"
            />
            <div className="absolute inset-0 rounded-lg pointer-events-none border border-gray-300"></div>
          </div>
        </div>
      </div>
    </div>

    {/* Corner Style Section */}
    <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
        Corner Style
      </h3>
      <div className="grid grid-cols-3 gap-2">
        {(['normal', 'rounded', 'sharp'] as const).map((style) => (
          <button
            key={style}
            onClick={() => handleInputChange('cornerStyle', style)}
            className={`p-3 rounded-lg border-2 transition-all duration-200 flex flex-col items-center ${cardData.cornerStyle === style
                ? 'bg-blue-500 text-white border-blue-500'
                : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
              }`}
          >
            <div className={`w-6 h-6 mb-1 bg-gray-300 ${style === 'normal' ? 'rounded' :
                style === 'rounded' ? 'rounded-full' :
                  'rounded-none'
              }`}></div>
            <span className="text-xs capitalize">{style}</span>
          </button>
        ))}
      </div>
    </div>

    {/* Elements Section */}
    <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
        Add Elements ({currentView === 'back' ? 'Back' : 'Front'})
      </h3>
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => addElement('text')}
          className="p-3 bg-white border-2 border-gray-300 rounded-lg hover:border-green-400 transition-all duration-200 flex flex-col items-center"
        >
          <span className="text-lg mb-1">📝</span>
          <span className="text-xs font-medium">Text</span>
        </button>
        <button
          onClick={() => addElement('qr')}
          className="p-3 bg-white border-2 border-gray-300 rounded-lg hover:border-green-400 transition-all duration-200 flex flex-col items-center"
        >
          <span className="text-lg mb-1">📱</span>
          <span className="text-xs font-medium">QR Code</span>
        </button>
        <button
          onClick={() => addElement('icon')}
          className="p-3 bg-white border-2 border-gray-300 rounded-lg hover:border-green-400 transition-all duration-200 flex flex-col items-center"
        >
          <span className="text-lg mb-1">🎯</span>
          <span className="text-xs font-medium">Icon</span>
        </button>
        <button
          onClick={() => addElement('shape')}
          className="p-3 bg-white border-2 border-gray-300 rounded-lg hover:border-green-400 transition-all duration-200 flex flex-col items-center"
        >
          <span className="text-lg mb-1">🔺</span>
          <span className="text-xs font-medium">Shape</span>
        </button>
      </div>

      {/* Selected Element Properties */}
      {selectedElement && (
        <div className="mt-4 p-3 bg-white rounded-lg border border-gray-200">
          <h4 className="text-xs font-medium text-gray-600 mb-2">
            Element Properties
          </h4>
          <div className="space-y-2">
            {selectedElement.type === 'text' && (
              <input
                type="text"
                value={selectedElement.content || ''}
                onChange={(e) => updateElement(selectedElement.id, { content: e.target.value })}
                placeholder="Enter text"
                className="w-full p-2 border border-gray-300 rounded text-xs"
              />
            )}
            <div className="flex gap-2">
              <input
                type="number"
                value={selectedElement.size.width}
                onChange={(e) => updateElement(selectedElement.id, {
                  size: { ...selectedElement.size, width: parseInt(e.target.value) }
                })}
                placeholder="Width"
                className="flex-1 p-2 border border-gray-300 rounded text-xs"
              />
              <input
                type="number"
                value={selectedElement.size.height}
                onChange={(e) => updateElement(selectedElement.id, {
                  size: { ...selectedElement.size, height: parseInt(e.target.value) }
                })}
                placeholder="Height"
                className="flex-1 p-2 border border-gray-300 rounded text-xs"
              />
            </div>
            <button
              onClick={() => deleteElement(selectedElement.id)}
              className="w-full p-2 bg-red-500 text-white rounded text-xs hover:bg-red-600"
            >
              Delete Element
            </button>
          </div>
        </div>
      )}
    </div>
  </div>
          </div >
        </div >
      </div >
    </div >
  );
};

export default VisitingCardDesigner;
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="w-3 h-3 bg-orange-400 rounded-full mr-3"></span>
              Choose Template
            </h3>
            <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto custom-scrollbar">
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => handleInputChange('template', template.id)}
                  className={`group p-3 border-2 rounded-xl text-left transition-all duration-300 hover:scale-105 ${
                    cardData.template === template.id
                      ? 'border-blue-500 bg-blue-50 shadow-lg'
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-2xl group-hover:scale-110 transition-transform">{template.preview}</span>
                    <div>
                      <span className="text-sm font-semibold text-gray-800">{template.name}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">{template.desc}</p>
                </button>
              ))}
            </div>
          </div >

  {/* Preview Panel */ }
  < div className = "xl:col-span-1 bg-white rounded-xl shadow-xl p-6" >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800 flex items-center">
                <span className="w-3 h-3 bg-green-400 rounded-full mr-3"></span>
                Live Preview
              </h2>
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setCurrentView('front')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    currentView === 'front'
                      ? 'bg-white text-blue-600 shadow-md transform scale-105'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Front
                </button>
                <button
                  onClick={() => setCurrentView('back')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    currentView === 'back'
                      ? 'bg-white text-blue-600 shadow-md transform scale-105'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Back
                </button>
              </div>
            </div>
            
            <div className="flex flex-col items-center">
              {/* Main Card Preview */}
              <div className="relative perspective-1000 mb-6">
                <div
                  ref={cardRef}
                  className="w-96 h-56 p-6 rounded-lg shadow-2xl print:shadow-none print:border print:border-gray-300 transition-all duration-500 relative transform hover:scale-105"
                  style={getTemplateStyle()}
                >
                  {renderCardContent(currentView)}
                </div>
                
                {/* Card type indicator */}
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-1 rounded-full text-xs font-medium shadow-lg">
                    {currentView === 'front' ? '📄 Front Side' : '📄 Back Side'}
                  </span>
                </div>
              </div>

              {/* Mini Preview Cards */}
              <div className="flex space-x-4 mb-8">
                <div className="text-center">
                  <div
                    className="w-24 h-14 rounded-md shadow-lg cursor-pointer border-2 transition-all duration-300 hover:scale-110 transform"
                    style={{
                      ...getTemplateStyle(),
                      transform: 'scale(0.25)',
                      transformOrigin: 'center',
                      borderColor: currentView === 'front' ? '#3B82F6' : '#E5E7EB',
                      width: '96px',
                      height: '56px',
                    }}
                    onClick={() => setCurrentView('front')}
                  >
                    <div className="p-2 h-full" style={{ fontSize: '6px', lineHeight: '8px' }}>
                      {renderCardContent('front')}
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 mt-2 block font-medium">Front</span>
                </div>
                
                <div className="text-center">
                  <div
                    className="w-24 h-14 rounded-md shadow-lg cursor-pointer border-2 transition-all duration-300 hover:scale-110 transform"
                    style={{
                      ...getTemplateStyle(),
                      transform: 'scale(0.25)',
                      transformOrigin: 'center',
                      borderColor: currentView === 'back' ? '#3B82F6' : '#E5E7EB',
                      width: '96px',
                      height: '56px',
                    }}
                    onClick={() => setCurrentView('back')}
                  >
                    <div className="p-2 h-full" style={{ fontSize: '6px', lineHeight: '8px' }}>
                      {renderCardContent('back')}
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 mt-2 block font-medium">Back</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 gap-3 w-full mb-6">
                <button
                  onClick={printCard}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  🖨️ Print Both Sides
                </button>
                <button
                  onClick={downloadCard}
                  className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  📄 Download PDF
                </button>
                <button
                  className="w-full px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-lg hover:from-orange-700 hover:to-orange-800 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                  onClick={() => alert('Contact us for professional printing services!')}
                >
                  🛒 Order Print
                </button>
              </div>

              {/* Template Info */}
              <div className="text-center bg-gray-50 rounded-xl p-4 w-full">
                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center justify-center">
                  <span className="mr-2">{templates.find(t => t.id === cardData.template)?.preview}</span>
                  {templates.find(t => t.id === cardData.template)?.name} Template
                </h3>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                  <div className="flex items-center justify-center py-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                    Double-sided design
                  </div>
                  <div className="flex items-center justify-center py-1">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                    Professional layout
                  </div>
                  <div className="flex items-center justify-center py-1">
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                    Custom colors
                  </div>
                  <div className="flex items-center justify-center py-1">
                    <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
                    Print-ready format
                  </div>
                </div>
              </div>
            </div>
          </div >
        </div >

  {/* Call to Action */ }
  < div className = "mt-16 text-center bg-blue-50 rounded-lg p-8" >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Need Professional Printing?
          </h3>
          <p className="text-gray-600 mb-6">
            Get high-quality visiting cards printed with premium paper and finishes
          </p>
          <div className="space-x-4">
            <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Contact Us for Printing
            </button>
            <button className="px-8 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
              View Pricing
            </button>
          </div>
        </div >
      </div >

  {/* Enhanced Styles */ }
  < style > {`
        @media print {
          body * {
            visibility: hidden;
          }
          .print-area, .print-area * {
            visibility: visible;
          }
          .print-area {
            position: absolute;
            left: 0;
            top: 0;
          }
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        .template-preview {
          transition: all 0.3s ease;
        }
        .template-preview:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #CBD5E0 #F7FAFC;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #F7FAFC;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #CBD5E0;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #A0AEC0;
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: .5;
          }
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .card-hover-effect {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .card-hover-effect:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
        }
        .gradient-border {
          background: linear-gradient(white, white) padding-box,
                      linear-gradient(45deg, #667eea, #764ba2) border-box;
          border: 2px solid transparent;
        }
      `}</style >
    </div >
  );
};

export default VisitingCardDesigner;
