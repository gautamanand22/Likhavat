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
    phone: '+91 98765 43210',
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
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const templates = [
    { id: 'modern', name: 'Modern', preview: '🌟', desc: 'Clean lines with gradient accent' },
    { id: 'classic', name: 'Classic', preview: '📋', desc: 'Traditional business style' },
    { id: 'minimal', name: 'Minimal', preview: '⚪', desc: 'Simple and clean design' },
    { id: 'elegant', name: 'Elegant', preview: '💎', desc: 'Sophisticated and refined' },
    { id: 'creative', name: 'Creative', preview: '🎨', desc: 'Artistic and vibrant' },
    { id: 'corporate', name: 'Corporate', preview: '🏢', desc: 'Professional business look' },
    { id: 'gradient', name: 'Gradient', preview: '🌈', desc: 'Colorful gradient background' },
    { id: 'dark', name: 'Dark', preview: '🌙', desc: 'Dark theme with bright accents' },
    { id: 'colorful', name: 'Colorful', preview: '🎪', desc: 'Bold and vibrant colors' },
    { id: 'professional', name: 'Professional', preview: '💼', desc: 'Serious business design' },
    { id: 'artistic', name: 'Artistic', preview: '🖼️', desc: 'Creative artistic layout' },
    { id: 'tech', name: 'Tech', preview: '💻', desc: 'Modern technology theme' },
    { id: 'luxury', name: 'Luxury', preview: '👑', desc: 'Premium gold design' },
    { id: 'geometric', name: 'Geometric', preview: '🔷', desc: 'Geometric patterns' },
    { id: 'nature', name: 'Nature', preview: '🌿', desc: 'Natural green theme' },
    { id: 'bold', name: 'Bold', preview: '⚡', desc: 'Strong and impactful' },
    { id: 'vintage', name: 'Vintage', preview: '📜', desc: 'Classic retro style' },
    { id: 'futuristic', name: 'Futuristic', preview: '🚀', desc: 'Modern sci-fi design' }
  ];

  const handleInputChange = (field: keyof CardData, value: any) => {
    setCardData(prev => ({ ...prev, [field]: value }));
  };

  const addElement = (type: CardElement['type']) => {
    const newElement: CardElement = {
      id: `${type}_${Date.now()}`,
      type,
      content: type === 'text' ? 'New Text' : type === 'qr' ? 'QR Code' : type,
      position: { x: 50, y: 50 },
      size: { width: type === 'qr' ? 60 : 100, height: type === 'qr' ? 60 : 30 },
      style: { color: cardData.textColor, fontSize: 14 },
      side: currentView
    };
    setCardElements(prev => [...prev, newElement]);
    setSelectedElement(newElement);
  };

  const updateElement = (id: string, updates: Partial<CardElement>) => {
    setCardElements(prev => prev.map(el => el.id === id ? { ...el, ...updates } : el));
    if (selectedElement?.id === id) {
      setSelectedElement(prev => prev ? { ...prev, ...updates } : null);
    }
  };

  const deleteElement = (id: string) => {
    setCardElements(prev => prev.filter(el => el.id !== id));
    if (selectedElement?.id === id) {
      setSelectedElement(null);
    }
  };

  const handleMouseDown = (e: React.MouseEvent, element: CardElement) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedElement(element);
    setIsDragging(true);
    
    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !selectedElement || !cardRef.current) return;
    
    const cardRect = cardRef.current.getBoundingClientRect();
    const newX = e.clientX - cardRect.left - dragOffset.x;
    const newY = e.clientY - cardRect.top - dragOffset.y;
    
    // Keep element within card bounds
    const maxX = 384 - selectedElement.size.width; // Card width minus element width
    const maxY = 224 - selectedElement.size.height; // Card height minus element height
    
    const constrainedX = Math.max(0, Math.min(newX, maxX));
    const constrainedY = Math.max(0, Math.min(newY, maxY));
    
    updateElement(selectedElement.id, {
      position: { x: constrainedX, y: constrainedY }
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const renderQRCode = () => {
    // Simple QR code pattern using CSS
    return (
      <div className="w-full h-full bg-white border border-gray-300 relative overflow-hidden">
        <div className="absolute inset-1 grid grid-cols-8 grid-rows-8 gap-px">
          {Array.from({ length: 64 }, (_, i) => {
            const isBlack = Math.random() > 0.4; // 60% chance of black squares
            return (
              <div
                key={i}
                className={`${isBlack ? 'bg-black' : 'bg-white'}`}
              />
            );
          })}
        </div>
        {/* Corner markers */}
        <div className="absolute top-1 left-1 w-3 h-3 border-2 border-black">
          <div className="w-1 h-1 bg-black m-auto mt-px"></div>
        </div>
        <div className="absolute top-1 right-1 w-3 h-3 border-2 border-black">
          <div className="w-1 h-1 bg-black m-auto mt-px"></div>
        </div>
        <div className="absolute bottom-1 left-1 w-3 h-3 border-2 border-black">
          <div className="w-1 h-1 bg-black m-auto mt-px"></div>
        </div>
      </div>
    );
  };

  const renderElement = (element: CardElement) => {
    switch (element.type) {
      case 'text':
        return (
          <div 
            className="w-full h-full flex items-center"
            style={{
              fontSize: `${element.style.fontSize || 14}px`,
              color: element.style.color || cardData.textColor,
              fontWeight: element.style.fontWeight || 'normal',
              fontStyle: element.style.fontStyle || 'normal',
              textDecoration: element.style.textDecoration || 'none',
            }}
          >
            {element.content}
          </div>
        );
      case 'qr':
        return renderQRCode();
      default:
        return <div>{element.content}</div>;
    }
  };

  const getTemplateStyle = () => {
    const baseStyle = {
      backgroundColor: cardData.bgColor,
      color: cardData.textColor,
      borderRadius: cardData.cornerStyle === 'rounded' ? '12px' : cardData.cornerStyle === 'sharp' ? '0px' : '4px',
    };

    switch (cardData.template) {
      case 'modern':
        return {
          ...baseStyle,
          background: `linear-gradient(135deg, ${cardData.bgColor} 0%, ${cardData.accentColor}20 100%)`,
          borderLeft: `4px solid ${cardData.accentColor}`,
        };
      case 'classic':
        return {
          ...baseStyle,
          border: `2px solid ${cardData.textColor}`,
          borderRadius: '0px',
          fontFamily: 'serif',
        };
      case 'minimal':
        return {
          ...baseStyle,
          border: `1px solid ${cardData.accentColor}40`,
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        };
      case 'elegant':
        return {
          ...baseStyle,
          background: `linear-gradient(135deg, ${cardData.bgColor} 0%, ${cardData.accentColor}10 100%)`,
          border: `1px solid ${cardData.accentColor}30`,
          boxShadow: `0 6px 20px ${cardData.accentColor}15`,
        };
      case 'creative':
        return {
          ...baseStyle,
          background: `conic-gradient(from 45deg, ${cardData.accentColor}, ${cardData.textColor}, ${cardData.bgColor})`,
          color: 'white',
          borderRadius: '50% 10% 50% 10%',
        };
      case 'corporate':
        return {
          ...baseStyle,
          background: `linear-gradient(135deg, ${cardData.accentColor} 0%, ${cardData.textColor} 100%)`,
          color: 'white',
          border: `2px solid ${cardData.accentColor}`,
        };
      case 'gradient':
        return {
          ...baseStyle,
          background: `linear-gradient(135deg, ${cardData.accentColor}, ${cardData.textColor})`,
          color: 'white',
          border: 'none',
          boxShadow: `0 5px 15px ${cardData.accentColor}30`,
        };
      case 'dark':
        return {
          ...baseStyle,
          background: `linear-gradient(135deg, #1a1a1a, #2d2d2d)`,
          color: '#ffffff',
          border: `1px solid ${cardData.accentColor}`,
          boxShadow: `0 0 12px ${cardData.accentColor}40`,
        };
      case 'colorful':
        return {
          ...baseStyle,
          background: `linear-gradient(45deg, ${cardData.accentColor}, #ff6b6b, #4ecdc4, #45b7d1)`,
          color: 'white',
          borderRadius: '8px',
          boxShadow: `0 8px 25px ${cardData.accentColor}30`,
        };
      case 'professional':
        return {
          ...baseStyle,
          background: `linear-gradient(135deg, #2c3e50 0%, #34495e 100%)`,
          color: '#ecf0f1',
          border: '2px solid #34495e',
          boxShadow: '0 6px 20px rgba(44, 62, 80, 0.3)',
        };
      case 'artistic':
        return {
          ...baseStyle,
          background: `radial-gradient(circle at 30% 70%, ${cardData.accentColor}, #4ecdc4, #45b7d1)`,
          color: 'white',
          borderRadius: '20% 5% 20% 5%',
          transform: 'rotate(-1deg)',
        };
      case 'tech':
        return {
          ...baseStyle,
          background: `linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)`,
          color: '#00ff88',
          border: '1px solid #00ff88',
          borderRadius: '2px',
          boxShadow: '0 0 15px rgba(0,255,136,0.3)',
        };
      case 'luxury':
        return {
          ...baseStyle,
          background: `linear-gradient(135deg, #ffd700 0%, ${cardData.bgColor} 30%, #ffd700 100%)`,
          border: '2px solid #ffd700',
          color: '#333',
          boxShadow: '0 6px 18px rgba(255,215,0,0.4)',
        };
      case 'geometric':
        return {
          ...baseStyle,
          background: `linear-gradient(45deg, transparent 30%, ${cardData.accentColor} 30%, ${cardData.accentColor} 70%, transparent 70%), linear-gradient(-45deg, transparent 30%, #00d4aa 30%, #00d4aa 70%, transparent 70%)`,
          backgroundColor: cardData.bgColor,
          border: `1px solid ${cardData.accentColor}`,
        };
      case 'nature':
        return {
          ...baseStyle,
          background: `linear-gradient(135deg, #667eea 0%, #764ba2 50%, #84fab0 100%)`,
          color: 'white',
          borderRadius: '15px 5px',
          boxShadow: '0 8px 25px rgba(132, 250, 176, 0.3)',
        };
      case 'bold':
        return {
          ...baseStyle,
          background: `linear-gradient(135deg, #ff416c, #ff4b2b)`,
          color: 'white',
          border: '3px solid #ff416c',
          borderRadius: '0px',
          fontWeight: 'bold',
          boxShadow: '0 8px 25px rgba(255, 65, 108, 0.4)',
        };
      case 'vintage':
        return {
          ...baseStyle,
          background: `linear-gradient(135deg, #d2b48c 0%, #deb887 100%)`,
          color: '#8b4513',
          border: '3px double #8b4513',
          borderRadius: '8px',
          fontFamily: 'serif',
          boxShadow: '0 6px 20px rgba(139, 69, 19, 0.2)',
        };
      case 'futuristic':
        return {
          ...baseStyle,
          background: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`,
          color: '#00ffff',
          border: '1px solid #00ffff',
          borderRadius: '0px',
          boxShadow: '0 0 20px rgba(0, 255, 255, 0.3), inset 0 0 20px rgba(0, 255, 255, 0.1)',
        };
      default:
        return baseStyle;
    }
  };

  const getTemplatePreviewStyle = (templateId: string) => {
    const baseStyle = {
      backgroundColor: '#ffffff',
      color: '#333333',
      overflow: 'hidden' as const,
      position: 'relative' as const,
      borderRadius: '4px',
    };

    switch (templateId) {
      case 'modern':
        return {
          ...baseStyle,
          background: `linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)`,
          borderLeft: `4px solid #007bff`,
        };
      case 'classic':
        return {
          ...baseStyle,
          border: `2px solid #333333`,
          borderRadius: '0px',
        };
      case 'gradient':
        return {
          ...baseStyle,
          background: `linear-gradient(135deg, #007bff, #667eea)`,
          color: 'white',
        };
      case 'dark':
        return {
          ...baseStyle,
          background: `linear-gradient(135deg, #1a1a1a, #2d2d2d)`,
          color: '#ffffff',
          border: `1px solid #007bff`,
        };
      case 'elegant':
        return {
          ...baseStyle,
          background: `linear-gradient(135deg, #f8f8ff 0%, #e6e6fa 100%)`,
          border: '1px solid #ddd',
        };
      case 'creative':
        return {
          ...baseStyle,
          background: `conic-gradient(from 45deg, #ff6b6b, #4ecdc4, #45b7d1)`,
          color: 'white',
        };
      case 'corporate':
        return {
          ...baseStyle,
          background: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`,
          color: 'white',
        };
      case 'colorful':
        return {
          ...baseStyle,
          background: `linear-gradient(45deg, #ff9a56, #ff6b6b, #4ecdc4)`,
          color: 'white',
        };
      case 'professional':
        return {
          ...baseStyle,
          background: `linear-gradient(135deg, #2c3e50 0%, #34495e 100%)`,
          color: '#ecf0f1',
        };
      case 'artistic':
        return {
          ...baseStyle,
          background: `radial-gradient(circle at 30% 70%, #ff6b6b, #4ecdc4)`,
          color: 'white',
        };
      case 'tech':
        return {
          ...baseStyle,
          background: `linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%)`,
          color: '#00ff88',
          border: '1px solid #00ff88',
        };
      case 'luxury':
        return {
          ...baseStyle,
          background: `linear-gradient(135deg, #ffd700 0%, #fff 30%, #ffd700 100%)`,
          border: '2px solid #ffd700',
          color: '#333',
        };
      default:
        return baseStyle;
    }
  };

  const renderTemplatePreview = (templateId: string) => {
    const commonProps = {
      style: { fontSize: '6px', lineHeight: '8px' }
    };

    switch (templateId) {
      case 'modern':
        return (
          <div className="h-full flex flex-col justify-between p-2" {...commonProps}>
            <div>
              <div className="font-bold mb-1">John Doe</div>
              <div className="text-blue-600 text-xs">Manager</div>
            </div>
            <div className="text-xs opacity-80">
              <div>📞 +91 98765</div>
              <div>✉️ john@company.com</div>
            </div>
          </div>
        );
      case 'classic':
        return (
          <div className="h-full flex flex-col justify-center items-center p-2" {...commonProps}>
            <div className="text-center">
              <div className="font-bold border-b border-gray-400 pb-1 mb-1">JOHN DOE</div>
              <div className="text-xs">Senior Manager</div>
              <div className="text-xs mt-1">📞 +91 98765</div>
            </div>
          </div>
        );
      case 'minimal':
        return (
          <div className="h-full flex items-center justify-between p-2" {...commonProps}>
            <div>
              <div className="font-bold">John</div>
              <div className="text-xs">Manager</div>
            </div>
            <div className="text-xs text-right">
              <div>📞</div>
              <div>✉️</div>
            </div>
          </div>
        );
      case 'elegant':
        return (
          <div className="h-full flex flex-col justify-center items-center p-2" {...commonProps}>
            <div className="text-center">
              <div className="text-purple-600 text-xs mb-1">💎</div>
              <div className="font-bold">John Doe</div>
              <div className="text-xs italic">Senior Manager</div>
            </div>
          </div>
        );
      case 'creative':
        return (
          <div className="h-full flex items-center justify-center p-2" {...commonProps}>
            <div className="text-center text-white">
              <div className="text-xs mb-1">🎨</div>
              <div className="font-bold">JOHN</div>
              <div className="text-xs">Creative</div>
            </div>
          </div>
        );
      case 'corporate':
        return (
          <div className="h-full flex flex-col justify-between p-2 text-white" {...commonProps}>
            <div className="text-center">
              <div className="font-bold">JOHN DOE</div>
              <div className="text-xs">Manager</div>
            </div>
            <div className="text-xs text-center">Company Ltd.</div>
          </div>
        );
      case 'gradient':
        return (
          <div className="h-full flex items-center justify-center p-2 text-white" {...commonProps}>
            <div className="text-center">
              <div className="font-bold">John Doe</div>
              <div className="text-xs">🌈 Creative</div>
            </div>
          </div>
        );
      case 'dark':
        return (
          <div className="h-full flex flex-col justify-center p-2" {...commonProps} style={{color: '#00ff88', fontSize: '6px'}}>
            <div>
              <div className="font-bold">JOHN DOE</div>
              <div className="text-xs">Tech Lead</div>
              <div className="text-xs mt-1">john@tech.com</div>
            </div>
          </div>
        );
      case 'tech':
        return (
          <div className="h-full flex items-center justify-between p-2" {...commonProps} style={{color: '#00ff88', fontSize: '6px'}}>
            <div>
              <div className="font-bold">JOHN</div>
              <div className="text-xs">DEV</div>
            </div>
            <div className="text-xs">💻</div>
          </div>
        );
      case 'luxury':
        return (
          <div className="h-full flex flex-col justify-center items-center p-2" {...commonProps}>
            <div className="text-center">
              <div className="text-yellow-600 text-xs mb-1">👑</div>
              <div className="font-bold">JOHN DOE</div>
              <div className="text-xs">Executive</div>
            </div>
          </div>
        );
      default:
        return (
          <div className="h-full flex items-center justify-center p-2" {...commonProps}>
            <div className="text-center">
              <div className="font-bold">John Doe</div>
              <div className="text-xs">Manager</div>
            </div>
          </div>
        );
    }
  };

  const renderCardContent = (side: 'front' | 'back') => {
    const sideElements = cardElements.filter(el => el.side === side);
    
    if (side === 'front') {
      return (
        <div 
          className="h-full flex flex-col justify-between relative"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div className="text-center">
            <h2 className="text-xl font-bold mb-1" style={{ color: cardData.textColor }}>{cardData.name}</h2>
            <p className="text-sm opacity-80 mb-2" style={{ color: cardData.textColor }}>{cardData.title}</p>
            <p className="text-lg font-semibold" style={{ color: cardData.accentColor }}>{cardData.company}</p>
          </div>
          
          <div className="text-sm space-y-1" style={{ color: cardData.textColor }}>
            <p>📞 {cardData.phone}</p>
            <p>✉️ {cardData.email}</p>
            <p>🌐 {cardData.website}</p>
          </div>

          {sideElements.map(element => (
            <div
              key={element.id}
              className={`absolute cursor-move select-none ${
                selectedElement?.id === element.id ? 'ring-2 ring-blue-500 z-10' : 'z-0'
              } ${isDragging && selectedElement?.id === element.id ? 'opacity-75' : ''}`}
              style={{
                left: `${element.position.x}px`,
                top: `${element.position.y}px`,
                width: `${element.size.width}px`,
                height: `${element.size.height}px`,
              }}
              onMouseDown={(e) => handleMouseDown(e, element)}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedElement(element);
              }}
            >
              {renderElement(element)}
              {selectedElement?.id === element.id && (
                <button
                  className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full text-xs opacity-80 hover:opacity-100 transition-opacity z-20"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteElement(element.id);
                  }}
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <div 
          className="h-full flex flex-col justify-center items-center relative"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div className="text-center">
            <h3 className="text-lg font-bold mb-4" style={{ color: cardData.textColor }}>{cardData.company}</h3>
            <div className="text-sm space-y-2" style={{ color: cardData.textColor }}>
              <p>{cardData.address}</p>
              <p>📞 {cardData.phone}</p>
              <p>✉️ {cardData.email}</p>
            </div>
          </div>

          {sideElements.map(element => (
            <div
              key={element.id}
              className={`absolute cursor-move select-none ${
                selectedElement?.id === element.id ? 'ring-2 ring-blue-500 z-10' : 'z-0'
              } ${isDragging && selectedElement?.id === element.id ? 'opacity-75' : ''}`}
              style={{
                left: `${element.position.x}px`,
                top: `${element.position.y}px`,
                width: `${element.size.width}px`,
                height: `${element.size.height}px`,
              }}
              onMouseDown={(e) => handleMouseDown(e, element)}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedElement(element);
              }}
            >
              {renderElement(element)}
              {selectedElement?.id === element.id && (
                <button
                  className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full text-xs opacity-80 hover:opacity-100 transition-opacity z-20"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteElement(element.id);
                  }}
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <div className="h-screen bg-gray-50 overflow-hidden">
      <div className="h-full flex flex-col">
        
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-3">
          <h1 className="text-xl font-bold text-gray-800">Visiting Card Designer</h1>
          <p className="text-sm text-gray-600">Design professional business cards</p>
        </div>

        {/* Main Content - Single View Layout */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* Left Panel - Templates */}
          <div className="w-80 bg-white border-r border-gray-200 p-4 overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Choose Template</h3>
            <div className="space-y-3">
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => handleInputChange('template', template.id)}
                  className={`group relative overflow-hidden rounded-lg border-2 transition-all duration-300 w-full transform hover:scale-105 ${
                    cardData.template === template.id
                      ? 'border-blue-500 shadow-xl ring-2 ring-blue-200 scale-105'
                      : 'border-gray-200 hover:border-blue-300 hover:shadow-lg'
                  }`}
                  style={{ aspectRatio: '3.5/2' }}
                >
                  <div className="w-full h-full p-2">
                    <div
                      className="w-full h-full rounded-md shadow-sm relative overflow-hidden"
                      style={getTemplatePreviewStyle(template.id)}
                    >
                      {/* Template Content Preview */}
                      {renderTemplatePreview(template.id)}
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                    <div className="text-white text-xs font-semibold truncate">{template.name}</div>
                  </div>
                  {cardData.template === template.id && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Center Panel - Controls */}
          <div className="w-80 bg-white border-r border-gray-200 p-4 overflow-y-auto">
            
            {/* Card Information */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">Card Information</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={cardData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                />
                <input
                  type="text"
                  placeholder="Job Title"
                  value={cardData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                />
                <input
                  type="text"
                  placeholder="Company Name"
                  value={cardData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                />
                <input
                  type="text"
                  placeholder="Phone Number"
                  value={cardData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={cardData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                />
                <input
                  type="text"
                  placeholder="Website"
                  value={cardData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                />
              </div>
            </div>

            {/* Colors */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">Colors</h3>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Background</label>
                  <input
                    type="color"
                    value={cardData.bgColor}
                    onChange={(e) => handleInputChange('bgColor', e.target.value)}
                    className="w-full h-10 border border-gray-300 rounded cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Text</label>
                  <input
                    type="color"
                    value={cardData.textColor}
                    onChange={(e) => handleInputChange('textColor', e.target.value)}
                    className="w-full h-10 border border-gray-300 rounded cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Accent</label>
                  <input
                    type="color"
                    value={cardData.accentColor}
                    onChange={(e) => handleInputChange('accentColor', e.target.value)}
                    className="w-full h-10 border border-gray-300 rounded cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Add Elements */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">Add Elements</h3>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => addElement('text')}
                  className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
                >
                  📝 Text
                </button>
                <button
                  onClick={() => addElement('qr')}
                  className="p-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-sm"
                >
                  📱 QR Code
                </button>
              </div>
            </div>

            {/* Selected Element Editor */}
            {selectedElement && (
              <div className="border border-gray-200 rounded-lg p-3">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-sm font-semibold text-gray-800">Edit Element</h4>
                  <button
                    onClick={() => deleteElement(selectedElement.id)}
                    className="text-xs text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 px-2 py-1 rounded transition-colors"
                  >
                    🗑️ Delete
                  </button>
                </div>
                
                {selectedElement.type === 'text' && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Text Content</label>
                      <input
                        type="text"
                        value={selectedElement.content}
                        onChange={(e) => updateElement(selectedElement.id, { content: e.target.value })}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                        placeholder="Enter text"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Color</label>
                        <input
                          type="color"
                          value={selectedElement.style.color || '#333333'}
                          onChange={(e) => updateElement(selectedElement.id, { style: { ...selectedElement.style, color: e.target.value } })}
                          className="w-full h-8 border border-gray-300 rounded cursor-pointer"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Size</label>
                        <input
                          type="range"
                          min="8"
                          max="24"
                          value={selectedElement.style.fontSize || 16}
                          onChange={(e) => updateElement(selectedElement.id, { style: { ...selectedElement.style, fontSize: parseInt(e.target.value) } })}
                          className="w-full"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <button
                        onClick={() => updateElement(selectedElement.id, { style: { ...selectedElement.style, fontWeight: selectedElement.style.fontWeight === 'bold' ? 'normal' : 'bold' } })}
                        className={`p-1 text-xs rounded border ${selectedElement.style.fontWeight === 'bold' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
                      >
                        B
                      </button>
                      <button
                        onClick={() => updateElement(selectedElement.id, { style: { ...selectedElement.style, fontStyle: selectedElement.style.fontStyle === 'italic' ? 'normal' : 'italic' } })}
                        className={`p-1 text-xs rounded border ${selectedElement.style.fontStyle === 'italic' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
                      >
                        I
                      </button>
                      <button
                        onClick={() => updateElement(selectedElement.id, { style: { ...selectedElement.style, textDecoration: selectedElement.style.textDecoration === 'underline' ? 'none' : 'underline' } })}
                        className={`p-1 text-xs rounded border ${selectedElement.style.textDecoration === 'underline' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
                      >
                        U
                      </button>
                    </div>
                  </div>
                )}

                {selectedElement.type === 'qr' && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">QR Code Data</label>
                      <input
                        type="text"
                        value={selectedElement.content}
                        onChange={(e) => updateElement(selectedElement.id, { content: e.target.value })}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                        placeholder="Enter URL or text"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Width</label>
                        <input
                          type="range"
                          min="40"
                          max="120"
                          value={selectedElement.size.width}
                          onChange={(e) => updateElement(selectedElement.id, { 
                            size: { 
                              ...selectedElement.size, 
                              width: parseInt(e.target.value),
                              height: parseInt(e.target.value) // Keep QR code square
                            } 
                          })}
                          className="w-full"
                        />
                        <span className="text-xs text-gray-500">{selectedElement.size.width}px</span>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Position</label>
                        <div className="text-xs text-gray-500">
                          X: {Math.round(selectedElement.position.x)}px<br/>
                          Y: {Math.round(selectedElement.position.y)}px
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Common positioning controls */}
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="text-xs text-gray-600 mb-2">Position & Size</div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <label className="block text-gray-500 mb-1">X Position</label>
                      <input
                        type="number"
                        min="0"
                        max="384"
                        value={Math.round(selectedElement.position.x)}
                        onChange={(e) => updateElement(selectedElement.id, { 
                          position: { ...selectedElement.position, x: parseInt(e.target.value) || 0 } 
                        })}
                        className="w-full px-1 py-1 border border-gray-300 rounded text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-500 mb-1">Y Position</label>
                      <input
                        type="number"
                        min="0"
                        max="224"
                        value={Math.round(selectedElement.position.y)}
                        onChange={(e) => updateElement(selectedElement.id, { 
                          position: { ...selectedElement.position, y: parseInt(e.target.value) || 0 } 
                        })}
                        className="w-full px-1 py-1 border border-gray-300 rounded text-xs"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Panel - Card Preview */}
          <div className="flex-1 flex flex-col">
            
            {/* Card Preview Section - At Top */}
            <div className="bg-white border-b border-gray-200 p-6">
              <div className="flex flex-col items-center">
                
                {/* Card Dimensions */}
                <div className="mb-3 text-center">
                  <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    3.5" × 2" (89mm × 51mm)
                  </span>
                </div>

                {/* Front/Back Toggle */}
                <div className="mb-4">
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setCurrentView('front')}
                      className={`px-4 py-2 rounded-md transition-all text-sm ${
                        currentView === 'front'
                          ? 'bg-blue-500 text-white shadow-md'
                          : 'text-gray-600 hover:bg-white'
                      }`}
                    >
                      Front
                    </button>
                    <button
                      onClick={() => setCurrentView('back')}
                      className={`px-4 py-2 rounded-md transition-all text-sm ${
                        currentView === 'back'
                          ? 'bg-blue-500 text-white shadow-md'
                          : 'text-gray-600 hover:bg-white'
                      }`}
                    >
                      Back
                    </button>
                  </div>
                </div>

                {/* Card Preview */}
                <div className="relative">
                  <div
                    ref={cardRef}
                    className="w-96 h-56 p-6 shadow-xl transition-all duration-500 relative cursor-pointer select-none border-2 border-gray-200 rounded-lg"
                    style={getTemplateStyle()}
                    onClick={() => setSelectedElement(null)}
                  >
                    {renderCardContent(currentView)}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 mt-6">
                  <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center text-sm shadow-md">
                    <span className="mr-2">📥</span>
                    Download
                  </button>
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center text-sm shadow-md">
                    <span className="mr-2">🖨️</span>
                    Print
                  </button>
                  <button className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center text-sm shadow-md">
                    <span className="mr-2">💰</span>
                    Get Quote
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitingCardDesigner;
