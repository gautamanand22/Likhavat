import React, { useState, useRef, useEffect } from 'react';

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
    const [selectedElement, setSelectedElement] = useState<CardElement | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });
    const [mouseDownTime, setMouseDownTime] = useState(0);
    const cardRef = useRef<HTMLDivElement>(null);

    // Initialize with default elements that can be edited/removed
    const [cardElements, setCardElements] = useState<CardElement[]>([
        {
            id: 'name',
            type: 'text',
            content: 'John Doe',
            position: { x: 24, y: 24 },
            size: { width: 200, height: 24 },
            style: { fontSize: 18, fontWeight: 'bold', color: '#333333' },
            side: 'front'
        },
        {
            id: 'title',
            type: 'text',
            content: 'Senior Manager',
            position: { x: 24, y: 52 },
            size: { width: 180, height: 20 },
            style: { fontSize: 14, color: '#666666' },
            side: 'front'
        },
        {
            id: 'company',
            type: 'text',
            content: 'Your Company Name',
            position: { x: 24, y: 76 },
            size: { width: 220, height: 22 },
            style: { fontSize: 16, fontWeight: 'bold', color: '#007bff' },
            side: 'front'
        },
        {
            id: 'phone',
            type: 'text',
            content: '📞 +91 98765 43210',
            position: { x: 24, y: 134 },
            size: { width: 200, height: 18 },
            style: { fontSize: 12, color: '#333333' },
            side: 'front'
        },
        {
            id: 'email',
            type: 'text',
            content: '✉️ john.doe@company.com',
            position: { x: 24, y: 156 },
            size: { width: 250, height: 18 },
            style: { fontSize: 12, color: '#333333' },
            side: 'front'
        },
        {
            id: 'website',
            type: 'text',
            content: '🌐 www.yourcompany.com',
            position: { x: 24, y: 178 },
            size: { width: 220, height: 18 },
            style: { fontSize: 12, color: '#333333' },
            side: 'front'
        },
        {
            id: 'company-back',
            type: 'text',
            content: 'Your Company Name',
            position: { x: 54, y: 64 },
            size: { width: 250, height: 24 },
            style: { fontSize: 18, fontWeight: 'bold', color: '#333333' },
            side: 'back'
        },
        {
            id: 'address',
            type: 'text',
            content: '123 Business Street, City - 400001',
            position: { x: 54, y: 124 },
            size: { width: 270, height: 40 },
            style: { fontSize: 12, color: '#666666' },
            side: 'back'
        }
    ]);

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

    const addElement = (type: CardElement['type'], content?: string, customStyle?: Partial<React.CSSProperties>) => {
        const newElement: CardElement = {
            id: `${type}_${Date.now()}`,
            type,
            content: content || (type === 'text' ? 'New Text' : type === 'qr' ? 'QR Code' : type),
            position: { x: 44, y: 44 }, // Default position with visual padding (24px + 20px margin)
            size: { width: type === 'qr' ? 60 : 100, height: type === 'qr' ? 60 : 30 },
            style: { color: cardData.textColor, fontSize: 14, ...customStyle },
            side: currentView
        };
        setCardElements(prev => [...prev, newElement]);
        setSelectedElement(newElement);
    };

    const getTemplateTextColors = (template: string) => {
        switch (template) {
            case 'classic': return { primary: '#2c3e50', secondary: '#34495e', accent: '#3498db' };
            case 'minimal': return { primary: '#333333', secondary: '#666666', accent: '#007bff' };
            case 'elegant': return { primary: '#2c3e50', secondary: '#7f8c8d', accent: '#9b59b6' };
            case 'creative': return { primary: 'white', secondary: 'rgba(255,255,255,0.9)', accent: 'rgba(255,255,255,0.8)' };
            case 'corporate': return { primary: '#ffffff', secondary: '#ecf0f1', accent: '#3498db' };
            case 'gradient': return { primary: 'white', secondary: 'rgba(255,255,255,0.9)', accent: 'rgba(255,255,255,0.8)' };
            case 'dark': return { primary: '#ffffff', secondary: '#bdc3c7', accent: '#00ff88' };
            case 'colorful': return { primary: '#2c3e50', secondary: '#34495e', accent: '#e74c3c' };
            case 'professional': return { primary: '#495057', secondary: '#6c757d', accent: '#007bff' };
            case 'artistic': return { primary: 'white', secondary: 'rgba(255,255,255,0.9)', accent: 'rgba(255,255,255,0.8)' };
            case 'tech': return { primary: '#00ff88', secondary: '#00cc70', accent: '#ffffff' };
            case 'luxury': return { primary: '#8b4513', secondary: '#a0522d', accent: '#b8860b' };
            case 'geometric': return { primary: '#2c3e50', secondary: '#34495e', accent: '#667eea' };
            case 'nature': return { primary: '#2d5016', secondary: '#558b2f', accent: '#7cb342' };
            case 'bold': return { primary: 'white', secondary: 'rgba(255,255,255,0.9)', accent: 'rgba(255,255,255,0.8)' };
            case 'vintage': return { primary: '#5d4037', secondary: '#6d4c41', accent: '#8d6e63' };
            case 'futuristic': return { primary: '#00ffff', secondary: '#00cccc', accent: '#ffffff' };
            default: return { primary: '#333333', secondary: '#666666', accent: '#007bff' };
        }
    };

    const applyTemplateToElements = (template: string) => {
        const colors = getTemplateTextColors(template);
        setCardElements(prev => prev.map(element => {
            const updatedStyle = { ...element.style };

            // Apply colors based on element type and content
            if (element.id === 'name') {
                updatedStyle.color = colors.primary;
                updatedStyle.fontWeight = 'bold';
            } else if (element.id === 'title') {
                updatedStyle.color = colors.secondary;
            } else if (element.id === 'company' || element.id === 'company-back') {
                updatedStyle.color = colors.accent;
                updatedStyle.fontWeight = 'bold';
            } else {
                updatedStyle.color = colors.primary;
            }

            return { ...element, style: updatedStyle };
        }));
    };

    // Apply template colors when template changes
    React.useEffect(() => {
        applyTemplateToElements(cardData.template);
    }, [cardData.template]);

    const constrainElementPosition = (element: CardElement, newPosition: { x: number; y: number }) => {
        // Use card area instead of content area for constraints
        const cardRect = cardRef.current?.getBoundingClientRect();
        if (!cardRect) {
            // Fallback: standard business card dimensions (384px x 224px for w-96 h-56)
            return {
                x: Math.max(0, Math.min(newPosition.x, 384 - element.size.width)),
                y: Math.max(0, Math.min(newPosition.y, 224 - element.size.height))
            };
        }
        
        // Constraint against full card area (no padding since we removed p-6)
        const maxX = cardRect.width - element.size.width;
        const maxY = cardRect.height - element.size.height;
        
        return {
            x: Math.max(0, Math.min(newPosition.x, maxX)),
            y: Math.max(0, Math.min(newPosition.y, maxY))
        };
    };

    const updateElement = (id: string, updates: Partial<CardElement>) => {
        const element = cardElements.find(el => el.id === id);
        if (!element) return;

        // Create updated element with new properties
        const updatedElement = { ...element, ...updates };

        // Only apply constraints for manual position updates, not during dragging
        if (updates.position && !isDragging) {
            updatedElement.position = constrainElementPosition(updatedElement, updatedElement.position);
        }
        
        setCardElements(prev => prev.map(el => el.id === id ? updatedElement : el));
        if (selectedElement?.id === id) {
            setSelectedElement(updatedElement);
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
        setMouseDownTime(Date.now());
        setDragStartPos({ x: e.clientX, y: e.clientY });

        // Calculate offset relative to element position within the full card area
        const cardRect = cardRef.current?.getBoundingClientRect();

        if (cardRect) {
            // Use full card coordinates (no padding since we removed p-6)
            const cardX = e.clientX - cardRect.left;
            const cardY = e.clientY - cardRect.top;
            
            setDragOffset({
                x: cardX - element.position.x,
                y: cardY - element.position.y
            });
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        // Only start dragging if mouse button is pressed and has moved significantly
        if (!selectedElement || !cardRef.current || mouseDownTime === 0) return;

        const timeDiff = Date.now() - mouseDownTime;
        const mouseDiff = Math.abs(e.clientX - dragStartPos.x) + Math.abs(e.clientY - dragStartPos.y);

        // Require both time and movement threshold to start dragging
        if (timeDiff > 150 && mouseDiff > 8) {
            setIsDragging(true);
        }

        if (!isDragging) return;

        const cardRect = cardRef.current.getBoundingClientRect();
        
        // Calculate position relative to full card area
        const cardX = e.clientX - cardRect.left;
        const cardY = e.clientY - cardRect.top;
        
        const newX = cardX - dragOffset.x;
        const newY = cardY - dragOffset.y;

        // Simple constraint: just ensure the element doesn't go negative or beyond card bounds
        const constrainedX = Math.max(0, Math.min(newX, cardRect.width - selectedElement.size.width));
        const constrainedY = Math.max(0, Math.min(newY, cardRect.height - selectedElement.size.height));

        updateElement(selectedElement.id, {
            position: { x: constrainedX, y: constrainedY }
        });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        setMouseDownTime(0);
    };

    const handleElementClick = (e: React.MouseEvent, element: CardElement) => {
        e.preventDefault();
        e.stopPropagation();
        setSelectedElement(element);
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
                        className="w-full h-full flex items-start leading-tight"
                        style={{
                            fontSize: `${element.style.fontSize || 14}px`,
                            color: element.style.color || cardData.textColor,
                            fontWeight: element.style.fontWeight || 'normal',
                            fontStyle: element.style.fontStyle || 'normal',
                            textDecoration: element.style.textDecoration || 'none',
                            lineHeight: '1.2',
                            wordWrap: 'break-word',
                            overflow: 'visible'
                        }}
                    >
                        <span className="block w-full">{element.content}</span>
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
                    color: cardData.textColor,
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                };
            case 'classic':
                return {
                    ...baseStyle,
                    backgroundColor: '#f8f8f8',
                    border: `2px solid #2c3e50`,
                    borderRadius: '0px',
                    fontFamily: 'Georgia, serif',
                    color: '#2c3e50',
                };
            case 'minimal':
                return {
                    ...baseStyle,
                    backgroundColor: '#ffffff',
                    border: `1px solid ${cardData.accentColor}40`,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    color: '#333333',
                    fontFamily: 'Helvetica, Arial, sans-serif',
                };
            case 'elegant':
                return {
                    ...baseStyle,
                    background: `linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)`,
                    border: `1px solid ${cardData.accentColor}30`,
                    boxShadow: `0 6px 20px ${cardData.accentColor}15`,
                    color: '#2c3e50',
                    fontFamily: 'Times, serif',
                };
            case 'creative':
                return {
                    ...baseStyle,
                    background: `linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4)`,
                    color: 'white',
                    borderRadius: '15px 5px 15px 5px',
                    fontFamily: 'Arial, sans-serif',
                    fontWeight: 'bold',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                };
            case 'corporate':
                return {
                    ...baseStyle,
                    background: `linear-gradient(135deg, #2c3e50 0%, #34495e 100%)`,
                    color: '#ffffff',
                    border: `2px solid #3498db`,
                    fontFamily: 'Calibri, sans-serif',
                    boxShadow: '0 4px 15px rgba(52, 73, 94, 0.3)',
                };
            case 'gradient':
                return {
                    ...baseStyle,
                    background: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`,
                    color: 'white',
                    border: 'none',
                    boxShadow: `0 5px 15px rgba(102, 126, 234, 0.4)`,
                    fontFamily: 'Arial, sans-serif',
                };
            case 'dark':
                return {
                    ...baseStyle,
                    background: `linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)`,
                    color: '#ffffff',
                    border: `1px solid ${cardData.accentColor}`,
                    boxShadow: `0 0 12px ${cardData.accentColor}40`,
                    fontFamily: 'Consolas, monospace',
                };
            case 'colorful':
                return {
                    ...baseStyle,
                    background: `linear-gradient(45deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)`,
                    color: '#2c3e50',
                    borderRadius: '20px',
                    boxShadow: `0 8px 25px rgba(255, 154, 158, 0.3)`,
                    fontFamily: 'Comic Sans MS, cursive',
                };
            case 'professional':
                return {
                    ...baseStyle,
                    background: `linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)`,
                    color: '#495057',
                    border: '2px solid #6c757d',
                    boxShadow: '0 6px 20px rgba(108, 117, 125, 0.2)',
                    fontFamily: 'Arial, sans-serif',
                };
            case 'artistic':
                return {
                    ...baseStyle,
                    background: `radial-gradient(circle at 30% 70%, #ff7eb3, #ff758c, #ff7eb3)`,
                    color: 'white',
                    borderRadius: '25px 5px 25px 5px',
                    transform: 'rotate(-1deg)',
                    fontFamily: 'Brush Script MT, cursive',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                };
            case 'tech':
                return {
                    ...baseStyle,
                    background: `linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)`,
                    color: '#00ff88',
                    border: '1px solid #00ff88',
                    borderRadius: '2px',
                    boxShadow: '0 0 15px rgba(0,255,136,0.3)',
                    fontFamily: 'Courier New, monospace',
                };
            case 'luxury':
                return {
                    ...baseStyle,
                    background: `linear-gradient(135deg, #ffd700 0%, #fff8dc 30%, #ffd700 100%)`,
                    border: '3px solid #b8860b',
                    color: '#8b4513',
                    boxShadow: '0 6px 18px rgba(255,215,0,0.4)',
                    fontFamily: 'Palatino, serif',
                };
            case 'geometric':
                return {
                    ...baseStyle,
                    background: `linear-gradient(45deg, #667eea 25%, transparent 25%, transparent 75%, #667eea 75%), linear-gradient(-45deg, #764ba2 25%, transparent 25%, transparent 75%, #764ba2 75%)`,
                    backgroundColor: '#f8f9fa',
                    backgroundSize: '20px 20px',
                    border: `2px solid #667eea`,
                    color: '#2c3e50',
                    fontFamily: 'Helvetica, sans-serif',
                };
            case 'nature':
                return {
                    ...baseStyle,
                    background: `linear-gradient(135deg, #a8e6cf 0%, #dcedc1 50%, #ffd3a5 100%)`,
                    color: '#2d5016',
                    borderRadius: '15px',
                    border: '2px solid #7cb342',
                    boxShadow: '0 8px 25px rgba(124, 179, 66, 0.3)',
                    fontFamily: 'Verdana, sans-serif',
                };
            case 'bold':
                return {
                    ...baseStyle,
                    background: `linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)`,
                    color: 'white',
                    border: '4px solid #ff1744',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    fontFamily: 'Impact, sans-serif',
                    boxShadow: '0 8px 25px rgba(255, 65, 108, 0.4)',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                };
            case 'vintage':
                return {
                    ...baseStyle,
                    background: `linear-gradient(135deg, #d2b48c 0%, #deb887 100%)`,
                    color: '#5d4037',
                    border: '4px double #8d6e63',
                    borderRadius: '8px',
                    fontFamily: 'Times New Roman, serif',
                    boxShadow: '0 6px 20px rgba(141, 110, 99, 0.3)',
                };
            case 'futuristic':
                return {
                    ...baseStyle,
                    background: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`,
                    color: '#00ffff',
                    border: '2px solid #00ffff',
                    borderRadius: '0px',
                    fontFamily: 'Orbitron, sans-serif',
                    boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)',
                    textShadow: '0 0 10px rgba(0, 255, 255, 0.8)',
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
                    <div className="h-full flex flex-col justify-center p-2" {...commonProps} style={{ color: '#00ff88', fontSize: '6px' }}>
                        <div>
                            <div className="font-bold">JOHN DOE</div>
                            <div className="text-xs">Tech Lead</div>
                            <div className="text-xs mt-1">john@tech.com</div>
                        </div>
                    </div>
                );
            case 'tech':
                return (
                    <div className="h-full flex items-center justify-between p-2" {...commonProps} style={{ color: '#00ff88', fontSize: '6px' }}>
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

        return (
            <div
                className="h-full relative"
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onClick={() => setSelectedElement(null)} // Deselect when clicking on empty space
            >
                {/* All elements are now draggable - no static content */}
                {sideElements.map(element => (
                    <div
                        key={element.id}
                        className={`absolute select-none transition-all duration-200 ${selectedElement?.id === element.id ? 'ring-2 ring-blue-500 z-10' : 'z-0'
                            } ${isDragging && selectedElement?.id === element.id ? 'opacity-75 cursor-grabbing' : 'cursor-pointer hover:shadow-sm'}`}
                        style={{
                            left: `${element.position.x}px`,
                            top: `${element.position.y}px`,
                            width: `${element.size.width}px`,
                            height: `${element.size.height}px`,
                        }}
                        onMouseDown={(e) => handleMouseDown(e, element)}
                        onClick={(e) => handleElementClick(e, element)}
                    >
                        {renderElement(element)}
                        {selectedElement?.id === element.id && (
                            <>
                                {/* Delete button */}
                                <button
                                    className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full text-xs opacity-80 hover:opacity-100 transition-opacity z-20 flex items-center justify-center"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        deleteElement(element.id);
                                    }}
                                >
                                    ×
                                </button>
                                {/* Done button */}
                                <button
                                    className="absolute -top-2 -left-2 w-5 h-5 bg-green-500 text-white rounded-full text-xs opacity-80 hover:opacity-100 transition-opacity z-20 flex items-center justify-center"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedElement(null);
                                    }}
                                >
                                    ✓
                                </button>
                            </>
                        )}
                    </div>
                ))}
            </div>
        );
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
                                    className={`group relative overflow-hidden rounded-lg border-2 transition-all duration-300 w-full transform hover:scale-105 ${cardData.template === template.id
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

                        {/* Element Management */}
                        <div className="mb-6">
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="text-sm font-semibold text-gray-800">Manage Elements</h3>
                                <button
                                    onClick={() => setCardElements([])}
                                    className="px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600 transition-colors"
                                >
                                    Clear All
                                </button>
                            </div>

                            {/* Quick Add Default Elements */}
                            <div className="mb-4">
                                <h4 className="text-xs font-medium text-gray-600 mb-2">Quick Add</h4>
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                    <button
                                        onClick={() => addElement('text', 'Name', { fontSize: 18, fontWeight: 'bold' })}
                                        className="p-2 bg-gray-100 hover:bg-gray-200 rounded border text-gray-700"
                                    >
                                        + Name
                                    </button>
                                    <button
                                        onClick={() => addElement('text', 'Job Title', { fontSize: 14, color: '#666' })}
                                        className="p-2 bg-gray-100 hover:bg-gray-200 rounded border text-gray-700"
                                    >
                                        + Title
                                    </button>
                                    <button
                                        onClick={() => addElement('text', 'Company Name', { fontSize: 16, fontWeight: 'bold', color: '#007bff' })}
                                        className="p-2 bg-gray-100 hover:bg-gray-200 rounded border text-gray-700"
                                    >
                                        + Company
                                    </button>
                                    <button
                                        onClick={() => addElement('text', '📞 Phone', { fontSize: 12 })}
                                        className="p-2 bg-gray-100 hover:bg-gray-200 rounded border text-gray-700"
                                    >
                                        + Phone
                                    </button>
                                    <button
                                        onClick={() => addElement('text', '✉️ Email', { fontSize: 12 })}
                                        className="p-2 bg-gray-100 hover:bg-gray-200 rounded border text-gray-700"
                                    >
                                        + Email
                                    </button>
                                    <button
                                        onClick={() => addElement('text', '🌐 Website', { fontSize: 12 })}
                                        className="p-2 bg-gray-100 hover:bg-gray-200 rounded border text-gray-700"
                                    >
                                        + Website
                                    </button>
                                </div>
                            </div>

                            {/* Current Elements List */}
                            <div className="space-y-2">
                                <h4 className="text-xs font-medium text-gray-600">Current Elements ({cardElements.filter(el => el.side === currentView).length})</h4>
                                {cardElements.filter(el => el.side === currentView).map((element, index) => (
                                    <div
                                        key={element.id}
                                        className={`p-2 rounded border text-xs cursor-pointer transition-colors ${selectedElement?.id === element.id
                                                ? 'bg-blue-100 border-blue-300'
                                                : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                                            }`}
                                        onClick={() => setSelectedElement(element)}
                                    >
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center space-x-2">
                                                <span className="font-medium">
                                                    {element.type === 'qr' ? '📱' : '📝'}
                                                </span>
                                                <span className="truncate max-w-24">
                                                    {element.type === 'qr' ? 'QR Code' : element.content}
                                                </span>
                                            </div>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    deleteElement(element.id);
                                                }}
                                                className="text-red-500 hover:text-red-700 font-bold"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                {cardElements.filter(el => el.side === currentView).length === 0 && (
                                    <p className="text-xs text-gray-500 italic py-4 text-center">
                                        No elements on this side. Add some elements to get started!
                                    </p>
                                )}
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
                            <div className="border border-blue-200 rounded-lg p-3 bg-blue-50">
                                <div className="flex justify-between items-center mb-3">
                                    <h4 className="text-sm font-semibold text-blue-800">
                                        ✏️ Editing: {selectedElement.type === 'qr' ? 'QR Code' : selectedElement.content.substring(0, 20) + (selectedElement.content.length > 20 ? '...' : '')}
                                    </h4>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => setSelectedElement(null)}
                                            className="text-xs text-green-600 hover:text-green-800 bg-green-100 hover:bg-green-200 px-2 py-1 rounded transition-colors font-medium"
                                        >
                                            ✓ Done
                                        </button>
                                        <button
                                            onClick={() => deleteElement(selectedElement.id)}
                                            className="text-xs text-red-600 hover:text-red-800 bg-red-100 hover:bg-red-200 px-2 py-1 rounded transition-colors"
                                        >
                                            🗑️ Delete
                                        </button>
                                    </div>
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
                                                <label className="block text-xs text-gray-600 mb-1">Font Size</label>
                                                <input
                                                    type="range"
                                                    min="8"
                                                    max="32"
                                                    value={selectedElement.style.fontSize || 16}
                                                    onChange={(e) => updateElement(selectedElement.id, { style: { ...selectedElement.style, fontSize: parseInt(e.target.value) } })}
                                                    className="w-full"
                                                />
                                                <span className="text-xs text-gray-500">{selectedElement.style.fontSize || 16}px</span>
                                            </div>
                                        </div>
                                        
                                        {/* Element Size Controls */}
                                        <div className="grid grid-cols-2 gap-2">
                                            <div>
                                                <label className="block text-xs text-gray-600 mb-1">Width</label>
                                                <input
                                                    type="range"
                                                    min="50"
                                                    max="300"
                                                    value={selectedElement.size.width}
                                                    onChange={(e) => updateElement(selectedElement.id, {
                                                        size: { ...selectedElement.size, width: parseInt(e.target.value) }
                                                    })}
                                                    className="w-full"
                                                />
                                                <span className="text-xs text-gray-500">{selectedElement.size.width}px</span>
                                            </div>
                                            <div>
                                                <label className="block text-xs text-gray-600 mb-1">Height</label>
                                                <input
                                                    type="range"
                                                    min="10"
                                                    max="100"
                                                    value={selectedElement.size.height}
                                                    onChange={(e) => updateElement(selectedElement.id, {
                                                        size: { ...selectedElement.size, height: parseInt(e.target.value) }
                                                    })}
                                                    className="w-full"
                                                />
                                                <span className="text-xs text-gray-500">{selectedElement.size.height}px</span>
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
                                                <label className="block text-xs text-gray-600 mb-1">Size</label>
                                                <input
                                                    type="range"
                                                    min="40"
                                                    max="150"
                                                    value={selectedElement.size.width}
                                                    onChange={(e) => updateElement(selectedElement.id, {
                                                        size: {
                                                            width: parseInt(e.target.value),
                                                            height: parseInt(e.target.value) // Keep QR code square
                                                        }
                                                    })}
                                                    className="w-full"
                                                />
                                                <span className="text-xs text-gray-500">{selectedElement.size.width}×{selectedElement.size.height}px</span>
                                            </div>
                                            <div>
                                                <label className="block text-xs text-gray-600 mb-1">Position</label>
                                                <div className="text-xs text-gray-500">
                                                    X: {Math.round(selectedElement.position.x)}px<br />
                                                    Y: {Math.round(selectedElement.position.y)}px
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {/* Manual Size Input for QR */}
                                        <div className="border-t pt-2">
                                            <label className="block text-xs text-gray-600 mb-1">Manual Size</label>
                                            <div className="flex space-x-2">
                                                <input
                                                    type="number"
                                                    min="40"
                                                    max="150"
                                                    value={selectedElement.size.width}
                                                    onChange={(e) => {
                                                        const newSize = parseInt(e.target.value) || 60;
                                                        updateElement(selectedElement.id, {
                                                            size: { width: newSize, height: newSize }
                                                        });
                                                    }}
                                                    className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded"
                                                    placeholder="Size"
                                                />
                                                <span className="text-xs text-gray-500 self-center">px</span>
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
                                                max="336"
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
                                                max="176"
                                                value={Math.round(selectedElement.position.y)}
                                                onChange={(e) => updateElement(selectedElement.id, {
                                                    position: { ...selectedElement.position, y: parseInt(e.target.value) || 0 }
                                                })}
                                                className="w-full px-1 py-1 border border-gray-300 rounded text-xs"
                                            />
                                        </div>
                                    </div>
                                    
                                    {/* Manual Size Controls for All Elements */}
                                    {selectedElement.type !== 'qr' && (
                                        <div className="grid grid-cols-2 gap-2 text-xs mt-2">
                                            <div>
                                                <label className="block text-gray-500 mb-1">Width (px)</label>
                                                <input
                                                    type="number"
                                                    min="20"
                                                    max="300"
                                                    value={selectedElement.size.width}
                                                    onChange={(e) => updateElement(selectedElement.id, {
                                                        size: { ...selectedElement.size, width: parseInt(e.target.value) || 100 }
                                                    })}
                                                    className="w-full px-1 py-1 border border-gray-300 rounded text-xs"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-gray-500 mb-1">Height (px)</label>
                                                <input
                                                    type="number"
                                                    min="10"
                                                    max="100"
                                                    value={selectedElement.size.height}
                                                    onChange={(e) => updateElement(selectedElement.id, {
                                                        size: { ...selectedElement.size, height: parseInt(e.target.value) || 30 }
                                                    })}
                                                    className="w-full px-1 py-1 border border-gray-300 rounded text-xs"
                                                />
                                            </div>
                                        </div>
                                    )}
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
                                            className={`px-4 py-2 rounded-md transition-all text-sm ${currentView === 'front'
                                                    ? 'bg-blue-500 text-white shadow-md'
                                                    : 'text-gray-600 hover:bg-white'
                                                }`}
                                        >
                                            Front
                                        </button>
                                        <button
                                            onClick={() => setCurrentView('back')}
                                            className={`px-4 py-2 rounded-md transition-all text-sm ${currentView === 'back'
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
                                        className="w-96 h-56 shadow-xl transition-all duration-500 relative cursor-pointer select-none border-2 border-gray-200 rounded-lg overflow-hidden"
                                        style={getTemplateStyle()}
                                        onClick={() => setSelectedElement(null)}
                                    >
                                        {/* Visual padding container for default positioning */}
                                        <div className="absolute inset-0 p-6 pointer-events-none" />
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
