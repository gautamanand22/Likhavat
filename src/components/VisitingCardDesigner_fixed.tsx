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
        if (selectedElement && selectedElement.id === id) {
            setSelectedElement({ ...selectedElement, ...updates });
        }
    };

    const deleteElement = (id: string) => {
        setCardElements(prev => prev.filter(el => el.id !== id));
        if (selectedElement && selectedElement.id === id) {
            setSelectedElement(null);
        }
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
                return <div style={baseStyle}>{element.content}</div>;
            case 'qr':
                return (
                    <div style={{ ...baseStyle, backgroundColor: '#000', color: '#fff', fontSize: '8px', position: 'relative' }}>
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
                                <div key={i} style={{ backgroundColor: Math.random() > 0.5 ? '#000' : '#fff' }} />
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
                        }}>QR</div>
                    </div>
                );
            case 'icon':
                return <div style={baseStyle}>{element.content || '⭐'}</div>;
            case 'shape':
                const shapeStyle = { ...baseStyle, backgroundColor: element.style.backgroundColor || cardData.accentColor };
                if (element.content === 'circle') {
                    shapeStyle.borderRadius = '50%';
                }
                return <div style={shapeStyle}></div>;
            default:
                return <div style={baseStyle}>{element.content || 'Element'}</div>;
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
                };
            case 'minimal':
                return {
                    ...baseStyle,
                    border: `1px solid ${cardData.accentColor}40`,
                    boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
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
            transform: 'scale(0.9)',
            transformOrigin: 'center',
        };

        const accentColor = '#007bff';

        switch (templateId) {
            case 'modern':
                return {
                    ...baseStyle,
                    background: `linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)`,
                    borderLeft: `3px solid ${accentColor}`,
                    boxShadow: `0 2px 10px ${accentColor}20`,
                };
            case 'classic':
                return {
                    ...baseStyle,
                    border: `2px solid #333333`,
                    borderRadius: '0px',
                    fontFamily: 'serif',
                };
            case 'minimal':
                return {
                    ...baseStyle,
                    border: `1px solid ${accentColor}40`,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                };
            case 'gradient':
                return {
                    ...baseStyle,
                    background: `linear-gradient(135deg, ${accentColor}, #667eea, #764ba2)`,
                    color: 'white',
                    border: 'none',
                    boxShadow: '0 5px 15px rgba(102, 126, 234, 0.3)',
                };
            case 'dark':
                return {
                    ...baseStyle,
                    background: `linear-gradient(135deg, #1a1a1a, #2d2d2d)`,
                    color: '#ffffff',
                    border: `1px solid ${accentColor}`,
                    boxShadow: `0 0 12px ${accentColor}40`,
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
                    background: `linear-gradient(135deg, #ffd700 0%, #fff 30%, #ffd700 100%)`,
                    border: '2px solid #ffd700',
                    color: '#333',
                    boxShadow: '0 6px 18px rgba(255,215,0,0.4)',
                };
            default:
                return baseStyle;
        }
    };

    const renderCardContent = (side: 'front' | 'back') => {
        const textColor = ['gradient', 'dark', 'tech', 'futuristic'].includes(cardData.template) ? 'white' :
            ['vintage', 'nature'].includes(cardData.template) ? '#8b4513' :
                cardData.template === 'luxury' ? '#333' : cardData.textColor;

        const sideElements = cardElements.filter(el => el.side === side);

        if (side === 'front') {
            return (
                <div className="h-full flex flex-col justify-between relative">
                    <div className="z-10 relative">
                        <h3
                            className={`${cardData.template === 'bold' ? 'text-2xl' : 'text-xl'} font-bold mb-1 cursor-pointer hover:bg-black/10 rounded px-1 transition-colors ${selectedElement?.id === 'name' ? 'ring-2 ring-blue-500' : ''}`}
                            style={{ color: textColor }}
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedElement({
                                    id: 'name',
                                    type: 'text',
                                    content: cardData.name,
                                    position: { x: 0, y: 0 },
                                    size: { width: 200, height: 30 },
                                    style: { color: textColor },
                                    side: 'front'
                                } as CardElement);
                            }}
                        >
                            {cardData.name}
                        </h3>
                        <p
                            className={`text-sm opacity-80 mb-2 cursor-pointer hover:bg-black/10 rounded px-1 transition-colors ${selectedElement?.id === 'title' ? 'ring-2 ring-blue-500' : ''}`}
                            style={{ color: textColor }}
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedElement({
                                    id: 'title',
                                    type: 'text',
                                    content: cardData.title,
                                    position: { x: 0, y: 30 },
                                    size: { width: 200, height: 20 },
                                    style: { color: textColor },
                                    side: 'front'
                                } as CardElement);
                            }}
                        >
                            {cardData.title}
                        </p>
                        <p
                            className={`${cardData.template === 'bold' ? 'text-xl' : 'text-lg'} font-semibold cursor-pointer hover:bg-black/10 rounded px-1 transition-colors ${selectedElement?.id === 'company' ? 'ring-2 ring-blue-500' : ''}`}
                            style={{ color: textColor }}
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedElement({
                                    id: 'company',
                                    type: 'text',
                                    content: cardData.company,
                                    position: { x: 0, y: 60 },
                                    size: { width: 200, height: 25 },
                                    style: { color: textColor },
                                    side: 'front'
                                } as CardElement);
                            }}
                        >
                            {cardData.company}
                        </p>
                    </div>

                    <div className={`text-xs space-y-1 z-10 relative`} style={{ color: textColor }}>
                        <p
                            className={`flex items-center cursor-pointer hover:bg-black/10 rounded px-1 transition-colors ${selectedElement?.id === 'phone' ? 'ring-2 ring-blue-500' : ''}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedElement({
                                    id: 'phone',
                                    type: 'text',
                                    content: cardData.phone,
                                    position: { x: 0, y: 180 },
                                    size: { width: 150, height: 15 },
                                    style: { color: textColor },
                                    side: 'front'
                                } as CardElement);
                            }}
                        >
                            <span className="mr-2">📞</span>
                            <span>{cardData.phone}</span>
                        </p>
                        <p
                            className={`flex items-center cursor-pointer hover:bg-black/10 rounded px-1 transition-colors ${selectedElement?.id === 'email' ? 'ring-2 ring-blue-500' : ''}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedElement({
                                    id: 'email',
                                    type: 'text',
                                    content: cardData.email,
                                    position: { x: 0, y: 200 },
                                    size: { width: 200, height: 15 },
                                    style: { color: textColor },
                                    side: 'front'
                                } as CardElement);
                            }}
                        >
                            <span className="mr-2">✉️</span>
                            <span>{cardData.email}</span>
                        </p>
                    </div>

                    {sideElements.map(element => (
                        <div
                            key={element.id}
                            className={`absolute cursor-move z-20 hover:ring-1 hover:ring-blue-300 transition-all ${selectedElement?.id === element.id ? 'ring-2 ring-blue-500' : ''}`}
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
                                    handleElementDrag(element.id, {
                                        x: Math.max(0, Math.min(x, 384 - element.size.width)),
                                        y: Math.max(0, Math.min(y, 224 - element.size.height))
                                    });
                                }
                            }}
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedElement(element);
                            }}
                        >
                            {renderElement(element)}
                        </div>
                    ))}
                </div>
            );
        } else {
            return (
                <div className="h-full flex flex-col justify-between relative">
                    <div className="text-center z-10 relative">
                        <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl"
                            style={{ backgroundColor: `${cardData.accentColor}20`, color: cardData.accentColor }}>
                            🏢
                        </div>
                        <h3
                            className={`text-lg font-bold mb-2 cursor-pointer hover:bg-black/10 rounded px-1 transition-colors ${selectedElement?.id === 'company-back' ? 'ring-2 ring-blue-500' : ''}`}
                            style={{ color: textColor }}
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedElement({
                                    id: 'company-back',
                                    type: 'text',
                                    content: cardData.company,
                                    position: { x: 0, y: 80 },
                                    size: { width: 200, height: 25 },
                                    style: { color: textColor },
                                    side: 'back'
                                } as CardElement);
                            }}
                        >
                            {cardData.company}
                        </h3>
                    </div>

                    <div className="z-10 relative">
                        <div className="text-xs space-y-1 mb-4" style={{ color: textColor }}>
                            <p
                                className={`flex items-center cursor-pointer hover:bg-black/10 rounded px-1 transition-colors ${selectedElement?.id === 'address' ? 'ring-2 ring-blue-500' : ''}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedElement({
                                        id: 'address',
                                        type: 'text',
                                        content: cardData.address,
                                        position: { x: 0, y: 160 },
                                        size: { width: 200, height: 15 },
                                        style: { color: textColor },
                                        side: 'back'
                                    } as CardElement);
                                }}
                            >
                                <span className="mr-2">📍</span>
                                <span>{cardData.address}</span>
                            </p>
                            <p
                                className={`flex items-center cursor-pointer hover:bg-black/10 rounded px-1 transition-colors ${selectedElement?.id === 'website' ? 'ring-2 ring-blue-500' : ''}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedElement({
                                        id: 'website',
                                        type: 'text',
                                        content: cardData.website,
                                        position: { x: 0, y: 180 },
                                        size: { width: 200, height: 15 },
                                        style: { color: textColor },
                                        side: 'back'
                                    } as CardElement);
                                }}
                            >
                                <span className="mr-2">🌐</span>
                                <span>{cardData.website}</span>
                            </p>
                        </div>

                        {sideElements.map(element => (
                            <div
                                key={element.id}
                                className={`absolute cursor-move z-20 hover:ring-1 hover:ring-blue-300 transition-all ${selectedElement?.id === element.id ? 'ring-2 ring-blue-500' : ''}`}
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
                                        handleElementDrag(element.id, {
                                            x: Math.max(0, Math.min(x, 384 - element.size.width)),
                                            y: Math.max(0, Math.min(y, 224 - element.size.height))
                                        });
                                    }
                                }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedElement(element);
                                }}
                            >
                                {renderElement(element)}
                            </div>
                        ))}
                    </div>
                </div>
            );
        }
    };

    return (
        <div className="h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
            <div className="h-full flex flex-col">

                {/* Header */}
                <div className="text-center py-3 border-b border-gray-200 bg-white/90 backdrop-blur-sm">
                    <h1 className="text-xl font-bold text-gray-800">Professional Visiting Card Designer</h1>
                    <p className="text-xs text-gray-600">Create stunning business cards with advanced design tools</p>
                </div>

                {/* Main Layout - Single View */}
                <div className="flex-1 grid grid-cols-12 gap-3 p-3 h-full overflow-hidden">

                    {/* Left Panel - Controls */}
                    <div className="col-span-3 space-y-3 overflow-y-auto pr-2">

                        {/* Card Information */}
                        <div className="bg-white rounded-lg shadow-sm border p-3">
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
                        <div className="bg-white rounded-lg shadow-sm border p-3">
                            <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
                                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                                Styling
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
                        <div className="bg-white rounded-lg shadow-sm border p-3">
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

                            {/* Element Properties Panel */}
                            {selectedElement && (
                                <div className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="text-sm font-semibold text-gray-700">Edit Element</h4>
                                        <button
                                            onClick={() => setSelectedElement(null)}
                                            className="text-gray-400 hover:text-gray-600 w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/50 transition-all"
                                        >
                                            ✕
                                        </button>
                                    </div>

                                    <div className="space-y-2">
                                        {(selectedElement.type === 'text' || ['name', 'title', 'company', 'phone', 'email', 'address', 'website', 'company-back'].includes(selectedElement.id)) && (
                                            <div>
                                                <label className="block text-xs font-medium text-gray-600 mb-1">Content</label>
                                                <input
                                                    type="text"
                                                    value={selectedElement.content || ''}
                                                    onChange={(e) => {
                                                        if (['name', 'title', 'company', 'phone', 'email', 'address', 'website'].includes(selectedElement.id)) {
                                                            handleInputChange(selectedElement.id === 'company-back' ? 'company' : selectedElement.id as keyof CardData, e.target.value);
                                                        } else {
                                                            updateElement(selectedElement.id, { content: e.target.value });
                                                        }
                                                    }}
                                                    placeholder="Enter text"
                                                    className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                                                />
                                            </div>
                                        )}

                                        {!['name', 'title', 'company', 'phone', 'email', 'address', 'website', 'company-back'].includes(selectedElement.id) && (
                                            <div>
                                                <label className="block text-xs font-medium text-gray-600 mb-1">Size</label>
                                                <div className="flex gap-2">
                                                    <input
                                                        type="number"
                                                        value={selectedElement.size.width}
                                                        onChange={(e) => updateElement(selectedElement.id, {
                                                            size: { ...selectedElement.size, width: parseInt(e.target.value) || 80 }
                                                        })}
                                                        placeholder="W"
                                                        className="flex-1 p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500"
                                                    />
                                                    <input
                                                        type="number"
                                                        value={selectedElement.size.height}
                                                        onChange={(e) => updateElement(selectedElement.id, {
                                                            size: { ...selectedElement.size, height: parseInt(e.target.value) || 30 }
                                                        })}
                                                        placeholder="H"
                                                        className="flex-1 p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500"
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        <div className="flex gap-2 pt-2">
                                            {['name', 'title', 'company', 'phone', 'email', 'address', 'website', 'company-back'].includes(selectedElement.id) ? (
                                                <button
                                                    onClick={() => {
                                                        if (selectedElement.id === 'company-back') {
                                                            handleInputChange('company', '');
                                                        } else {
                                                            handleInputChange(selectedElement.id as keyof CardData, '');
                                                        }
                                                        setSelectedElement(null);
                                                    }}
                                                    className="flex-1 p-2 bg-orange-500 text-white rounded text-sm hover:bg-orange-600 transition-colors"
                                                >
                                                    Hide
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => deleteElement(selectedElement.id)}
                                                    className="flex-1 p-2 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors"
                                                >
                                                    Delete
                                                </button>
                                            )}

                                            <button
                                                onClick={() => setSelectedElement(null)}
                                                className="flex-1 p-2 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition-colors"
                                            >
                                                Done
                                            </button>
                                        </div>
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
                                    📄 Front Side
                                </button>
                                <button
                                    onClick={() => setCurrentView('back')}
                                    className={`px-4 py-2 rounded-full font-medium transition-all duration-300 text-sm ${currentView === 'back'
                                            ? 'bg-blue-500 text-white shadow-md'
                                            : 'text-gray-600 hover:text-blue-500'
                                        }`}
                                >
                                    📄 Back Side
                                </button>
                            </div>
                        </div>

                        {/* Main Card Preview */}
                        <div className="relative">
                            <div
                                ref={cardRef}
                                className="w-96 h-56 p-6 shadow-2xl transition-all duration-500 relative cursor-pointer select-none hover:shadow-3xl"
                                style={getTemplateStyle()}
                                onClick={() => setSelectedElement(null)}
                            >
                                {renderCardContent(currentView)}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-3 mt-8">
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center text-sm shadow-md">
                                <span className="mr-1">💾</span>
                                Save Design
                            </button>
                            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center text-sm shadow-md">
                                <span className="mr-1">🖨️</span>
                                Print Card
                            </button>
                            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center text-sm shadow-md">
                                <span className="mr-1">📤</span>
                                Export
                            </button>
                        </div>
                    </div>

                    {/* Right Panel - Templates */}
                    <div className="col-span-3">
                        <div className="bg-white rounded-lg shadow-sm border p-3 h-full">
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
                                                style={getTemplatePreviewStyle(template.id)}
                                            >
                                                <div className="p-1 h-full flex flex-col justify-between" style={{ fontSize: '5px', lineHeight: '6px' }}>
                                                    <div>
                                                        <div className="font-bold mb-1">John Doe</div>
                                                        <div className="opacity-80">Designer</div>
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
};

export default VisitingCardDesigner;
