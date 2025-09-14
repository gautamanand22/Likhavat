import React, { useState, useRef, useEffect } from 'react';

// Import T-shirt template images
import whiteFrontImg from '../assets/whitefrontt.png';
import whiteBackImg from '../assets/whitebackt.png';
import redFrontImg from '../assets/redt.png';
import redBackImg from '../assets/redtb.png';

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
    cornerStyle: 'normal' | 'rounded' | 'sharp' | 'circular';
}

interface LetterPadData {
    companyName: string;
    address: string;
    phone: string;
    email: string;
    website: string;
    fax: string;
    bgColor: string;
    textColor: string;
    accentColor: string;
    template: 'corporate' | 'modern' | 'classic' | 'minimal' | 'professional';
}

interface TShirtData {
    brandName: string;
    slogan: string;
    design: string;
    size: string;
    color: string;
    material: string;
    bgColor: string;
    textColor: string;
    accentColor: string;
    template: 'casual' | 'sports' | 'vintage' | 'modern' | 'artistic';
}

interface CardElement {
    id: string;
    type: 'text' | 'qr' | 'logo' | 'icon' | 'shape' | 'image' | 'line';
    content: string;
    position: { x: number; y: number };
    size: { width: number; height: number };
    style: any;
    side: 'front' | 'back';
    imageData?: string; // For storing base64 image data
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
    const [selectedElement, setSelectedElement] = useState<CardElement | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });
    const [mouseDownTime, setMouseDownTime] = useState(0);
    const [showQuote, setShowQuote] = useState(false);
    const [quantity, setQuantity] = useState(100);
    const [customQuantity, setCustomQuantity] = useState('');
    const [activeProductTab, setActiveProductTab] = useState<'visiting-cards' | 'letter-pads' | 'tshirt' | 'merchandise'>('visiting-cards');
    const cardRef = useRef<HTMLDivElement>(null);

    // Letter Pad state
    const [letterPadData, setLetterPadData] = useState<LetterPadData>({
        companyName: 'Your Company Name',
        address: '123 Business Street, City - 400001',
        phone: '+91 79798 31185',
        email: 'info@company.com',
        website: 'www.yourcompany.com',
        fax: '+91 11 2345 6789',
        bgColor: '#ffffff',
        textColor: '#000000',
        accentColor: '#3B82F6',
        template: 'corporate'
    });

    const [letterPadElements, setLetterPadElements] = useState<CardElement[]>([
        {
            id: 'company_name',
            type: 'text',
            content: 'YOUR COMPANY NAME',
            position: { x: 64, y: 64 },
            size: { width: 350, height: 36 },
            style: {
                fontSize: 28,
                fontWeight: 'bold',
                color: '#3B82F6',
                textAlign: 'left'
            },
            side: 'front'
        },
        {
            id: 'company_address',
            type: 'text',
            content: 'Your Company Address\nCity, State, ZIP Code',
            position: { x: 64, y: 110 },
            size: { width: 350, height: 40 },
            style: {
                fontSize: 14,
                color: '#000000',
                textAlign: 'left',
                lineHeight: '1.4'
            },
            side: 'front'
        },
        {
            id: 'company_contact',
            type: 'text',
            content: 'Phone: (123) 456-7890\nEmail: info@company.com\nWebsite: www.company.com',
            position: { x: 64, y: 155 },
            size: { width: 350, height: 60 },
            style: {
                fontSize: 14,
                color: '#000000',
                textAlign: 'left',
                lineHeight: '1.4'
            },
            side: 'front'
        },
        {
            id: 'logo_placeholder',
            type: 'logo',
            content: 'LOGO',
            position: { x: 455, y: 64 },
            size: { width: 80, height: 80 },
            style: {
                fontSize: 12,
                color: '#3B82F6',
                border: '2px solid #3B82F6',
                textAlign: 'center',
                lineHeight: '76px',
                backgroundColor: '#3B82F610'
            },
            side: 'front'
        },
        {
            id: 'header_line',
            type: 'line',
            content: '',
            position: { x: 64, y: 230 },
            size: { width: 467, height: 2 },
            style: {
                backgroundColor: '#3B82F640'
            },
            side: 'front'
        },
        {
            id: 'date_section',
            type: 'text',
            content: 'Date: _______________',
            position: { x: 390, y: 250 },
            size: { width: 141, height: 24 },
            style: {
                fontSize: 14,
                color: '#000000',
                textAlign: 'left'
            },
            side: 'front'
        },
        {
            id: 'footer_line',
            type: 'line',
            content: '',
            position: { x: 64, y: 778 },
            size: { width: 467, height: 2 },
            style: {
                backgroundColor: '#3B82F640'
            },
            side: 'front'
        }
    ]);
    const [selectedLetterPadElement, setSelectedLetterPadElement] = useState<string | null>(null);
    const [isDraggingLetterPad, setIsDraggingLetterPad] = useState(false);
    const [letterPadDragOffset, setLetterPadDragOffset] = useState({ x: 0, y: 0 });
    const [letterPadDragStartPos, setLetterPadDragStartPos] = useState({ x: 0, y: 0 });
    const [letterPadMouseDownTime, setLetterPadMouseDownTime] = useState(0);
    const letterPadRef = useRef<HTMLDivElement>(null);

    // TShirt state
    const [tshirtData, setTshirtData] = useState<TShirtData>({
        brandName: 'Your Brand',
        slogan: 'Your Slogan Here',
        design: 'Custom Design',
        size: 'M',
        color: 'Black',
        material: 'Cotton',
        bgColor: '#ffffff',
        textColor: '#000000',
        accentColor: '#FF6B35',
        template: 'casual'
    });

    const [tshirtElements, setTshirtElements] = useState<CardElement[]>([
        {
            id: 'logo_placeholder_front',
            type: 'logo',
            content: 'LOGO',
            position: { x: 120, y: 180 }, // Left chest area below collar
            size: { width: 60, height: 60 },
            style: {
                fontSize: 10,
                fontWeight: 'bold',
                color: '#666666',
                textAlign: 'center',
                backgroundColor: '#f3f4f6',
                border: '2px dashed #d1d5db'
            },
            side: 'front'
        }
    ]);
    const [selectedTshirtElement, setSelectedTshirtElement] = useState<string | null>(null);
    const [isDraggingTshirt, setIsDraggingTshirt] = useState(false);
    const [tshirtDragOffset, setTshirtDragOffset] = useState({ x: 0, y: 0 });
    const [tshirtDragStartPos, setTshirtDragStartPos] = useState({ x: 0, y: 0 });
    const [tshirtMouseDownTime, setTshirtMouseDownTime] = useState(0);
    const [tshirtZoom, setTshirtZoom] = useState(1.4);
    const [selectedTshirtTemplate, setSelectedTshirtTemplate] = useState('white');
    const tshirtRef = useRef<HTMLDivElement>(null);

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
            content: '📞 +91 79798 31185',
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

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const imageData = e.target?.result as string;
                const newElement: CardElement = {
                    id: `image_${Date.now()}`,
                    type: 'image',
                    content: file.name,
                    position: { x: 44, y: 44 },
                    size: { width: 80, height: 60 },
                    style: { borderRadius: '4px' },
                    side: currentView,
                    imageData: imageData
                };
                setCardElements(prev => [...prev, newElement]);
                setSelectedElement(newElement);
            };
            reader.readAsDataURL(file);
        }
        // Reset the input
        event.target.value = '';
    };

    const addElement = (type: CardElement['type'], content?: string, customStyle?: Partial<React.CSSProperties>) => {
        const newElement: CardElement = {
            id: `${type}_${Date.now()}`,
            type,
            content: content || (type === 'text' ? 'New Text' : type === 'qr' ? 'QR Code' : type === 'image' ? 'Image' : type),
            position: { x: 44, y: 44 }, // Default position with visual padding (24px + 20px margin)
            size: {
                width: type === 'qr' ? 60 : type === 'image' ? 80 : 100,
                height: type === 'qr' ? 60 : type === 'image' ? 60 : 30
            },
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
        applyTemplateLayout(cardData.template);
    }, [cardData.template]);

    const applyTemplateLayout = (templateId: string) => {
        let newLayout: Partial<CardElement>[] = [];

        // Card dimensions: 384px (w-96) x 224px (h-56)
        // Safe area with padding: 336px x 176px (24px padding on each side)

        switch (templateId) {
            case 'modern':
                newLayout = [
                    { id: 'name', position: { x: 24, y: 24 }, size: { width: 200, height: 24 }, style: { fontSize: 18, fontWeight: 'bold' } },
                    { id: 'title', position: { x: 24, y: 50 }, size: { width: 180, height: 18 }, style: { fontSize: 14, color: '#007bff' } },
                    { id: 'company', position: { x: 24, y: 72 }, size: { width: 220, height: 20 }, style: { fontSize: 16, fontWeight: 'bold' } },
                    { id: 'phone', position: { x: 24, y: 130 }, size: { width: 160, height: 16 }, style: { fontSize: 12 } },
                    { id: 'email', position: { x: 24, y: 150 }, size: { width: 200, height: 16 }, style: { fontSize: 12 } },
                    { id: 'website', position: { x: 24, y: 170 }, size: { width: 180, height: 16 }, style: { fontSize: 12 } }
                ];
                break;
            case 'classic':
                newLayout = [
                    { id: 'name', position: { x: 92, y: 30 }, size: { width: 200, height: 24 }, style: { fontSize: 18, fontWeight: 'bold', textAlign: 'center' } },
                    { id: 'title', position: { x: 102, y: 56 }, size: { width: 180, height: 18 }, style: { fontSize: 14, textAlign: 'center' } },
                    { id: 'company', position: { x: 82, y: 78 }, size: { width: 220, height: 20 }, style: { fontSize: 16, fontWeight: 'bold', textAlign: 'center' } },
                    { id: 'phone', position: { x: 92, y: 120 }, size: { width: 200, height: 16 }, style: { fontSize: 12, textAlign: 'center' } },
                    { id: 'email', position: { x: 72, y: 140 }, size: { width: 240, height: 16 }, style: { fontSize: 12, textAlign: 'center' } },
                    { id: 'website', position: { x: 82, y: 160 }, size: { width: 220, height: 16 }, style: { fontSize: 12, textAlign: 'center' } }
                ];
                break;
            case 'minimal':
                newLayout = [
                    { id: 'name', position: { x: 24, y: 60 }, size: { width: 150, height: 28 }, style: { fontSize: 20, fontWeight: 'bold' } },
                    { id: 'title', position: { x: 24, y: 92 }, size: { width: 120, height: 18 }, style: { fontSize: 14 } },
                    { id: 'company', position: { x: 24, y: 114 }, size: { width: 140, height: 18 }, style: { fontSize: 14 } },
                    { id: 'phone', position: { x: 200, y: 60 }, size: { width: 140, height: 16 }, style: { fontSize: 11, textAlign: 'right' } },
                    { id: 'email', position: { x: 180, y: 80 }, size: { width: 160, height: 16 }, style: { fontSize: 11, textAlign: 'right' } },
                    { id: 'website', position: { x: 160, y: 100 }, size: { width: 180, height: 16 }, style: { fontSize: 11, textAlign: 'right' } }
                ];
                break;
            case 'elegant':
                newLayout = [
                    { id: 'name', position: { x: 92, y: 35 }, size: { width: 200, height: 24 }, style: { fontSize: 18, fontWeight: 'bold', textAlign: 'center' } },
                    { id: 'title', position: { x: 102, y: 62 }, size: { width: 180, height: 18 }, style: { fontSize: 14, fontStyle: 'italic', textAlign: 'center' } },
                    { id: 'company', position: { x: 82, y: 84 }, size: { width: 220, height: 20 }, style: { fontSize: 15, textAlign: 'center' } },
                    { id: 'phone', position: { x: 24, y: 130 }, size: { width: 160, height: 16 }, style: { fontSize: 11 } },
                    { id: 'email', position: { x: 24, y: 150 }, size: { width: 200, height: 16 }, style: { fontSize: 11 } },
                    { id: 'website', position: { x: 24, y: 170 }, size: { width: 180, height: 16 }, style: { fontSize: 11 } }
                ];
                break;
            case 'creative':
                newLayout = [
                    { id: 'name', position: { x: 30, y: 25 }, size: { width: 180, height: 28 }, style: { fontSize: 19, fontWeight: 'bold' } },
                    { id: 'title', position: { x: 35, y: 57 }, size: { width: 150, height: 20 }, style: { fontSize: 14 } },
                    { id: 'company', position: { x: 25, y: 81 }, size: { width: 200, height: 22 }, style: { fontSize: 16, fontWeight: 'bold' } },
                    { id: 'phone', position: { x: 180, y: 120 }, size: { width: 160, height: 16 }, style: { fontSize: 12 } },
                    { id: 'email', position: { x: 160, y: 140 }, size: { width: 180, height: 16 }, style: { fontSize: 12 } },
                    { id: 'website', position: { x: 140, y: 160 }, size: { width: 200, height: 16 }, style: { fontSize: 12 } }
                ];
                break;
            case 'corporate':
                newLayout = [
                    { id: 'name', position: { x: 24, y: 25 }, size: { width: 250, height: 26 }, style: { fontSize: 16, fontWeight: 'bold', letterSpacing: '1px' } },
                    { id: 'title', position: { x: 24, y: 52 }, size: { width: 200, height: 18 }, style: { fontSize: 13, letterSpacing: '0.5px' } },
                    { id: 'company', position: { x: 24, y: 74 }, size: { width: 220, height: 20 }, style: { fontSize: 14, fontWeight: 'bold', letterSpacing: '0.5px' } },
                    { id: 'phone', position: { x: 24, y: 135 }, size: { width: 160, height: 16 }, style: { fontSize: 11 } },
                    { id: 'email', position: { x: 24, y: 155 }, size: { width: 200, height: 16 }, style: { fontSize: 11 } },
                    { id: 'website', position: { x: 24, y: 175 }, size: { width: 180, height: 16 }, style: { fontSize: 11 } }
                ];
            case 'gradient':
                newLayout = [
                    { id: 'name', position: { x: 92, y: 30 }, size: { width: 200, height: 26 }, style: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', color: '#fff' } },
                    { id: 'title', position: { x: 102, y: 58 }, size: { width: 180, height: 18 }, style: { fontSize: 14, textAlign: 'center', color: '#fff' } },
                    { id: 'company', position: { x: 82, y: 80 }, size: { width: 220, height: 20 }, style: { fontSize: 15, textAlign: 'center', color: '#fff' } },
                    { id: 'phone', position: { x: 24, y: 140 }, size: { width: 160, height: 16 }, style: { fontSize: 11, color: '#fff' } },
                    { id: 'email', position: { x: 24, y: 160 }, size: { width: 200, height: 16 }, style: { fontSize: 11, color: '#fff' } },
                    { id: 'website', position: { x: 24, y: 180 }, size: { width: 180, height: 16 }, style: { fontSize: 11, color: '#fff' } }
                ];
                break;
            case 'dark':
                newLayout = [
                    { id: 'name', position: { x: 24, y: 35 }, size: { width: 200, height: 26 }, style: { fontSize: 17, fontWeight: 'bold', color: '#00ff88' } },
                    { id: 'title', position: { x: 24, y: 63 }, size: { width: 180, height: 18 }, style: { fontSize: 13, color: '#888' } },
                    { id: 'company', position: { x: 24, y: 84 }, size: { width: 200, height: 20 }, style: { fontSize: 14, color: '#fff' } },
                    { id: 'phone', position: { x: 200, y: 130 }, size: { width: 140, height: 16 }, style: { fontSize: 11, color: '#00ff88', textAlign: 'right' } },
                    { id: 'email', position: { x: 160, y: 150 }, size: { width: 180, height: 16 }, style: { fontSize: 11, color: '#00ff88', textAlign: 'right' } },
                    { id: 'website', position: { x: 140, y: 170 }, size: { width: 200, height: 16 }, style: { fontSize: 11, color: '#00ff88', textAlign: 'right' } }
                ];
                break;
            case 'colorful':
                newLayout = [
                    { id: 'name', position: { x: 40, y: 30 }, size: { width: 180, height: 26 }, style: { fontSize: 18, fontWeight: 'bold', color: '#ff6b6b' } },
                    { id: 'title', position: { x: 45, y: 58 }, size: { width: 150, height: 18 }, style: { fontSize: 14, color: '#4ecdc4' } },
                    { id: 'company', position: { x: 35, y: 80 }, size: { width: 200, height: 20 }, style: { fontSize: 15, fontWeight: 'bold', color: '#45b7d1' } },
                    { id: 'phone', position: { x: 180, y: 120 }, size: { width: 160, height: 16 }, style: { fontSize: 12, color: '#f9ca24' } },
                    { id: 'email', position: { x: 160, y: 140 }, size: { width: 180, height: 16 }, style: { fontSize: 12, color: '#6c5ce7' } },
                    { id: 'website', position: { x: 140, y: 160 }, size: { width: 200, height: 16 }, style: { fontSize: 12, color: '#a29bfe' } }
                ];
                break;
            case 'professional':
                newLayout = [
                    { id: 'name', position: { x: 24, y: 20 }, size: { width: 280, height: 26 }, style: { fontSize: 16, fontWeight: 'bold', letterSpacing: '2px' } },
                    { id: 'title', position: { x: 24, y: 47 }, size: { width: 220, height: 18 }, style: { fontSize: 12, letterSpacing: '1px' } },
                    { id: 'company', position: { x: 24, y: 68 }, size: { width: 240, height: 20 }, style: { fontSize: 13, fontWeight: 'bold' } },
                    { id: 'phone', position: { x: 24, y: 125 }, size: { width: 160, height: 16 }, style: { fontSize: 10 } },
                    { id: 'email', position: { x: 24, y: 145 }, size: { width: 200, height: 16 }, style: { fontSize: 10 } },
                    { id: 'website', position: { x: 24, y: 165 }, size: { width: 180, height: 16 }, style: { fontSize: 10 } }
                ];
                break;
            case 'artistic':
                newLayout = [
                    { id: 'name', position: { x: 50, y: 25 }, size: { width: 180, height: 28 }, style: { fontSize: 19, fontWeight: 'bold', color: '#e74c3c' } },
                    { id: 'title', position: { x: 55, y: 55 }, size: { width: 150, height: 18 }, style: { fontSize: 13, color: '#3498db' } },
                    { id: 'company', position: { x: 45, y: 77 }, size: { width: 200, height: 20 }, style: { fontSize: 15, color: '#9b59b6' } },
                    { id: 'phone', position: { x: 140, y: 120 }, size: { width: 180, height: 16 }, style: { fontSize: 11 } },
                    { id: 'email', position: { x: 120, y: 140 }, size: { width: 200, height: 16 }, style: { fontSize: 11 } },
                    { id: 'website', position: { x: 130, y: 160 }, size: { width: 190, height: 16 }, style: { fontSize: 11 } }
                ];
                break;
            case 'tech':
                newLayout = [
                    { id: 'name', position: { x: 24, y: 30 }, size: { width: 200, height: 26 }, style: { fontSize: 17, fontWeight: 'bold', fontFamily: 'Courier New', color: '#00ff88' } },
                    { id: 'title', position: { x: 24, y: 58 }, size: { width: 180, height: 18 }, style: { fontSize: 13, fontFamily: 'Courier New', color: '#888' } },
                    { id: 'company', position: { x: 24, y: 80 }, size: { width: 200, height: 20 }, style: { fontSize: 14, fontFamily: 'Courier New', color: '#fff' } },
                    { id: 'phone', position: { x: 180, y: 125 }, size: { width: 160, height: 16 }, style: { fontSize: 10, fontFamily: 'Courier New', color: '#00ff88' } },
                    { id: 'email', position: { x: 160, y: 145 }, size: { width: 180, height: 16 }, style: { fontSize: 10, fontFamily: 'Courier New', color: '#00ff88' } },
                    { id: 'website', position: { x: 140, y: 165 }, size: { width: 200, height: 16 }, style: { fontSize: 10, fontFamily: 'Courier New', color: '#00ff88' } }
                ];
                break;
            case 'luxury':
                newLayout = [
                    { id: 'name', position: { x: 92, y: 40 }, size: { width: 200, height: 26 }, style: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', color: '#8b4513' } },
                    { id: 'title', position: { x: 102, y: 68 }, size: { width: 180, height: 18 }, style: { fontSize: 14, textAlign: 'center', fontStyle: 'italic', color: '#8b4513' } },
                    { id: 'company', position: { x: 82, y: 90 }, size: { width: 220, height: 20 }, style: { fontSize: 15, textAlign: 'center', color: '#8b4513' } },
                    { id: 'phone', position: { x: 40, y: 140 }, size: { width: 160, height: 16 }, style: { fontSize: 11, color: '#8b4513' } },
                    { id: 'email', position: { x: 40, y: 160 }, size: { width: 200, height: 16 }, style: { fontSize: 11, color: '#8b4513' } },
                    { id: 'website', position: { x: 40, y: 180 }, size: { width: 180, height: 16 }, style: { fontSize: 11, color: '#8b4513' } }
                ];
                break;
            case 'geometric':
                newLayout = [
                    { id: 'name', position: { x: 92, y: 35 }, size: { width: 200, height: 26 }, style: { fontSize: 17, fontWeight: 'bold', textAlign: 'center' } },
                    { id: 'title', position: { x: 102, y: 63 }, size: { width: 180, height: 18 }, style: { fontSize: 13, textAlign: 'center' } },
                    { id: 'company', position: { x: 82, y: 85 }, size: { width: 220, height: 20 }, style: { fontSize: 14, textAlign: 'center' } },
                    { id: 'phone', position: { x: 24, y: 135 }, size: { width: 160, height: 16 }, style: { fontSize: 11 } },
                    { id: 'email', position: { x: 24, y: 155 }, size: { width: 200, height: 16 }, style: { fontSize: 11 } },
                    { id: 'website', position: { x: 24, y: 175 }, size: { width: 180, height: 16 }, style: { fontSize: 11 } }
                ];
                break;
            case 'nature':
                newLayout = [
                    { id: 'name', position: { x: 30, y: 35 }, size: { width: 180, height: 26 }, style: { fontSize: 18, fontWeight: 'bold', color: '#2d5016' } },
                    { id: 'title', position: { x: 35, y: 63 }, size: { width: 150, height: 18 }, style: { fontSize: 14, color: '#2d5016' } },
                    { id: 'company', position: { x: 25, y: 85 }, size: { width: 200, height: 20 }, style: { fontSize: 15, color: '#2d5016' } },
                    { id: 'phone', position: { x: 160, y: 125 }, size: { width: 160, height: 16 }, style: { fontSize: 12, color: '#2d5016' } },
                    { id: 'email', position: { x: 140, y: 145 }, size: { width: 180, height: 16 }, style: { fontSize: 12, color: '#2d5016' } },
                    { id: 'website', position: { x: 130, y: 165 }, size: { width: 190, height: 16 }, style: { fontSize: 12, color: '#2d5016' } }
                ];
                break;
            case 'bold':
                newLayout = [
                    { id: 'name', position: { x: 24, y: 25 }, size: { width: 250, height: 30 }, style: { fontSize: 20, fontWeight: 'bold', color: '#fff' } },
                    { id: 'title', position: { x: 24, y: 57 }, size: { width: 200, height: 22 }, style: { fontSize: 15, fontWeight: 'bold', color: '#ffeb3b' } },
                    { id: 'company', position: { x: 24, y: 82 }, size: { width: 220, height: 24 }, style: { fontSize: 16, fontWeight: 'bold', color: '#fff' } },
                    { id: 'phone', position: { x: 200, y: 125 }, size: { width: 140, height: 16 }, style: { fontSize: 12, color: '#ffeb3b', textAlign: 'right' } },
                    { id: 'email', position: { x: 160, y: 145 }, size: { width: 180, height: 16 }, style: { fontSize: 12, color: '#ffeb3b', textAlign: 'right' } },
                    { id: 'website', position: { x: 140, y: 165 }, size: { width: 200, height: 16 }, style: { fontSize: 12, color: '#ffeb3b', textAlign: 'right' } }
                ];
                break;
            case 'vintage':
                newLayout = [
                    { id: 'name', position: { x: 92, y: 40 }, size: { width: 200, height: 26 }, style: { fontSize: 17, fontWeight: 'bold', textAlign: 'center', color: '#8b4513' } },
                    { id: 'title', position: { x: 102, y: 68 }, size: { width: 180, height: 18 }, style: { fontSize: 13, textAlign: 'center', fontStyle: 'italic', color: '#8b4513' } },
                    { id: 'company', position: { x: 82, y: 90 }, size: { width: 220, height: 20 }, style: { fontSize: 14, textAlign: 'center', color: '#8b4513' } },
                    { id: 'phone', position: { x: 40, y: 135 }, size: { width: 160, height: 16 }, style: { fontSize: 11, color: '#8b4513' } },
                    { id: 'email', position: { x: 40, y: 155 }, size: { width: 200, height: 16 }, style: { fontSize: 11, color: '#8b4513' } },
                    { id: 'website', position: { x: 40, y: 175 }, size: { width: 180, height: 16 }, style: { fontSize: 11, color: '#8b4513' } }
                ];
                break;
            case 'futuristic':
                newLayout = [
                    { id: 'name', position: { x: 24, y: 25 }, size: { width: 220, height: 28 }, style: { fontSize: 18, fontWeight: 'bold', color: '#00ffff' } },
                    { id: 'title', position: { x: 29, y: 55 }, size: { width: 180, height: 20 }, style: { fontSize: 14, color: '#ff00ff' } },
                    { id: 'company', position: { x: 20, y: 78 }, size: { width: 240, height: 22 }, style: { fontSize: 15, color: '#ffff00' } },
                    { id: 'phone', position: { x: 180, y: 125 }, size: { width: 140, height: 16 }, style: { fontSize: 11, color: '#00ffff' } },
                    { id: 'email', position: { x: 160, y: 145 }, size: { width: 160, height: 16 }, style: { fontSize: 11, color: '#ff00ff' } },
                    { id: 'website', position: { x: 150, y: 165 }, size: { width: 170, height: 16 }, style: { fontSize: 11, color: '#ffff00' } }
                ];
                break;
            default:
                // Keep current positions for other templates
                return;
        }

        // Apply the new layout with bounds checking and spacing validation
        setCardElements(prev => prev.map(element => {
            const layoutUpdate = newLayout.find(layout => layout.id === element.id);
            if (layoutUpdate) {
                // Ensure position and size are within card bounds (384x224)
                const newElement = {
                    ...element,
                    position: layoutUpdate.position || element.position,
                    size: layoutUpdate.size || element.size,
                    style: { ...element.style, ...layoutUpdate.style }
                };

                // Constrain to card bounds with margin
                const margin = 4; // 4px margin from edges
                const maxX = 384 - newElement.size.width - margin;
                const maxY = 224 - newElement.size.height - margin;

                newElement.position.x = Math.max(margin, Math.min(newElement.position.x, maxX));
                newElement.position.y = Math.max(margin, Math.min(newElement.position.y, maxY));

                return newElement;
            }
            return element;
        }));
    };

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

    // Letter Pad template function
    const getLetterPadTemplateStyle = (template: string, data: LetterPadData) => {
        const baseStyle = {
            backgroundColor: data.bgColor,
            color: data.textColor,
            fontFamily: '"Proxima Nova", Arial, sans-serif',
            position: 'relative' as const,
            margin: '0 auto',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb'
        };

        switch (template) {
            case 'corporate':
                return {
                    ...baseStyle,
                    backgroundColor: '#f8f8f8', // Solid off-white background
                };
            case 'modern':
                return {
                    ...baseStyle,
                    background: `linear-gradient(135deg, ${data.bgColor} 0%, ${data.accentColor}08 100%)`,
                    borderLeft: `4px solid ${data.accentColor}`,
                };
            case 'classic':
                return {
                    ...baseStyle,
                    borderTop: `3px solid ${data.accentColor}`,
                    borderBottom: `3px solid ${data.accentColor}`,
                };
            case 'minimal':
                return {
                    ...baseStyle,
                    borderTop: `1px solid ${data.accentColor}`,
                };
            case 'professional':
                return {
                    ...baseStyle,
                    background: `${data.bgColor}`,
                    borderTop: `5px solid ${data.accentColor}`,
                };
            default:
                return baseStyle;
        }
    };

    // TShirt template function
    const getTshirtTemplateStyle = (template: string, data: TShirtData) => {
        const baseStyle = {
            backgroundColor: data.bgColor,
            color: data.textColor,
            fontFamily: '"Proxima Nova", Arial, sans-serif',
            position: 'relative' as const,
            margin: '0 auto',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb',
            borderRadius: '12px'
        };

        switch (template) {
            case 'casual':
                return {
                    ...baseStyle,
                    backgroundColor: '#f3f4f6',
                    background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
                };
            case 'sports':
                return {
                    ...baseStyle,
                    backgroundColor: '#dbeafe',
                    background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
                };
            case 'vintage':
                return {
                    ...baseStyle,
                    backgroundColor: '#fef2f2',
                    background: 'linear-gradient(135deg, #fef2f2 0%, #fecaca 100%)',
                };
            case 'modern':
                return {
                    ...baseStyle,
                    backgroundColor: '#ffffff',
                    background: 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)',
                    color: '#000000'
                };
            case 'artistic':
                return {
                    ...baseStyle,
                    backgroundColor: '#faf5ff',
                    background: 'linear-gradient(135deg, #faf5ff 0%, #e9d5ff 100%)',
                };
            default:
                return baseStyle;
        }
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

    // Letter Pad Drag and Drop Functions
    const handleLetterPadMouseDown = (e: React.MouseEvent, element: CardElement) => {
        e.preventDefault();
        e.stopPropagation();

        setSelectedLetterPadElement(element.id);
        setLetterPadMouseDownTime(Date.now());
        setLetterPadDragStartPos({ x: e.clientX, y: e.clientY });

        // Calculate offset relative to element position within the letterpad area
        const letterPadRect = letterPadRef.current?.getBoundingClientRect();

        if (letterPadRect) {
            const letterPadX = e.clientX - letterPadRect.left;
            const letterPadY = e.clientY - letterPadRect.top;

            setLetterPadDragOffset({
                x: letterPadX - element.position.x,
                y: letterPadY - element.position.y
            });
        }
    };

    const handleLetterPadMouseMove = (e: React.MouseEvent) => {
        if (!selectedLetterPadElement || !letterPadRef.current || letterPadMouseDownTime === 0) return;

        const selectedElement = letterPadElements.find(el => el.id === selectedLetterPadElement);
        if (!selectedElement) return;

        const timeDiff = Date.now() - letterPadMouseDownTime;
        const mouseDiff = Math.abs(e.clientX - letterPadDragStartPos.x) + Math.abs(e.clientY - letterPadDragStartPos.y);

        // Require both time and movement threshold to start dragging
        if (timeDiff > 150 && mouseDiff > 8) {
            setIsDraggingLetterPad(true);
        }

        if (!isDraggingLetterPad) return;

        const letterPadRect = letterPadRef.current.getBoundingClientRect();

        // Calculate position relative to letterpad area
        const letterPadX = e.clientX - letterPadRect.left;
        const letterPadY = e.clientY - letterPadRect.top;

        const newX = letterPadX - letterPadDragOffset.x;
        const newY = letterPadY - letterPadDragOffset.y;

        // Constrain to letterpad bounds
        const constrainedX = Math.max(0, Math.min(newX, letterPadRect.width - selectedElement.size.width));
        const constrainedY = Math.max(0, Math.min(newY, letterPadRect.height - selectedElement.size.height));

        setLetterPadElements(prev =>
            prev.map(el =>
                el.id === selectedElement.id
                    ? { ...el, position: { x: constrainedX, y: constrainedY } }
                    : el
            )
        );
    };

    const handleLetterPadMouseUp = () => {
        setIsDraggingLetterPad(false);
        setLetterPadMouseDownTime(0);
    };

    const handleLetterPadElementClick = (e: React.MouseEvent, element: CardElement) => {
        e.preventDefault();
        e.stopPropagation();
        setSelectedLetterPadElement(element.id);
    };

    // TShirt mouse handlers
    const handleTshirtMouseDown = (e: React.MouseEvent, element: CardElement) => {
        e.preventDefault();
        e.stopPropagation();

        setSelectedTshirtElement(element.id);
        setTshirtMouseDownTime(Date.now());
        setTshirtDragStartPos({ x: e.clientX, y: e.clientY });

        const tshirtRect = tshirtRef.current?.getBoundingClientRect();
        if (tshirtRect) {
            const tshirtX = e.clientX - tshirtRect.left;
            const tshirtY = e.clientY - tshirtRect.top;

            setTshirtDragOffset({
                x: tshirtX - element.position.x,
                y: tshirtY - element.position.y
            });
        }
    };

    const handleTshirtMouseMove = (e: React.MouseEvent) => {
        if (!selectedTshirtElement || !tshirtRef.current || tshirtMouseDownTime === 0) return;

        const timeDiff = Date.now() - tshirtMouseDownTime;
        const mouseDiff = Math.abs(e.clientX - tshirtDragStartPos.x) + Math.abs(e.clientY - tshirtDragStartPos.y);

        if (timeDiff > 100 && mouseDiff > 5) {
            setIsDraggingTshirt(true);
            const tshirtRect = tshirtRef.current.getBoundingClientRect();
            const newX = e.clientX - tshirtRect.left - tshirtDragOffset.x;
            const newY = e.clientY - tshirtRect.top - tshirtDragOffset.y;

            setTshirtElements(prev =>
                prev.map(el =>
                    el.id === selectedTshirtElement
                        ? { ...el, position: { x: Math.max(0, Math.min(newX, 400 - el.size.width)), y: Math.max(0, Math.min(newY, 500 - el.size.height)) } }
                        : el
                )
            );
        }
    };

    const handleTshirtMouseUp = () => {
        setIsDraggingTshirt(false);
        setTshirtMouseDownTime(0);
    };

    const handleTshirtElementClick = (e: React.MouseEvent, element: CardElement) => {
        e.preventDefault();
        e.stopPropagation();
        setSelectedTshirtElement(element.id);
    };

    const renderLetterPadElement = (element: CardElement) => {
        switch (element.type) {
            case 'text':
                return (
                    <div
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) => {
                            setLetterPadElements(prev =>
                                prev.map(el =>
                                    el.id === element.id
                                        ? { ...el, content: e.target.textContent || '' }
                                        : el
                                )
                            );
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full h-full outline-none resize-none border-none bg-transparent flex items-start leading-tight"
                        style={{
                            fontSize: `${element.style.fontSize || 14}px`,
                            color: element.style.color || letterPadData.textColor,
                            fontWeight: element.style.fontWeight || 'normal',
                            fontStyle: element.style.fontStyle || 'normal',
                            textDecoration: element.style.textDecoration || 'none',
                            textAlign: element.style.textAlign || 'left',
                            lineHeight: '1.2',
                            wordWrap: 'break-word',
                            overflow: 'visible',
                            cursor: 'text',
                            pointerEvents: 'auto'
                        }}
                    >
                        {element.content}
                    </div>
                );
            case 'logo':
                return !element.imageData ? (
                    <div
                        className="w-full h-full flex items-center justify-center rounded border-2 cursor-pointer hover:bg-opacity-80 transition-all"
                        style={{
                            borderColor: letterPadData.accentColor,
                            backgroundColor: letterPadData.accentColor + '10',
                            color: letterPadData.accentColor,
                            fontSize: '12px',
                            fontWeight: 'bold'
                        }}
                        title="Click to upload logo"
                    >
                        {element.content}
                    </div>
                ) : (
                    <img
                        src={element.imageData}
                        alt="Logo"
                        className="w-full h-full object-cover rounded pointer-events-none"
                        draggable={false}
                    />
                );
            case 'line':
                return (
                    <div
                        className="w-full h-full cursor-grab hover:opacity-80 transition-opacity"
                        style={{
                            backgroundColor: element.style?.backgroundColor || letterPadData.accentColor + '40'
                        }}
                    />
                );
            case 'image':
                return element.imageData ? (
                    <img
                        src={element.imageData}
                        alt="Custom Image"
                        className="w-full h-full object-cover rounded pointer-events-none"
                        draggable={false}
                    />
                ) : (
                    <div className="w-full h-full bg-gray-200 border-2 border-dashed border-gray-400 flex items-center justify-center text-gray-500 text-xs">
                        🖼️ Image
                    </div>
                );
            default:
                return <div>{element.content}</div>;
        }
    };

    const renderTshirtElement = (element: CardElement) => {
        switch (element.type) {
            case 'text':
                return (
                    <div
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) => {
                            setTshirtElements(prev =>
                                prev.map(el =>
                                    el.id === element.id
                                        ? { ...el, content: e.target.textContent || '' }
                                        : el
                                )
                            );
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full h-full outline-none resize-none border-none bg-transparent flex items-center justify-center leading-tight"
                        style={{
                            fontSize: `${element.style.fontSize || 14}px`,
                            color: element.style.color || '#000000',
                            fontWeight: element.style.fontWeight || 'normal',
                            fontStyle: element.style.fontStyle || 'normal',
                            textDecoration: element.style.textDecoration || 'none',
                            textAlign: element.style.textAlign || 'center',
                            lineHeight: '1.2',
                            wordWrap: 'break-word',
                            overflow: 'visible',
                            cursor: 'text',
                            pointerEvents: 'auto'
                        }}
                    >
                        {element.content}
                    </div>
                );
            case 'logo':
                return !element.imageData ? (
                    <div
                        className="w-full h-full flex items-center justify-center rounded border-2 cursor-pointer hover:bg-opacity-80 transition-all"
                        style={{
                            borderColor: tshirtData.accentColor,
                            backgroundColor: tshirtData.accentColor + '20',
                            color: '#000000',
                            fontSize: '12px',
                            fontWeight: 'bold'
                        }}
                        title="Click to upload logo"
                    >
                        {element.content}
                    </div>
                ) : (
                    <img
                        src={element.imageData}
                        alt="Logo"
                        className="w-full h-full object-cover rounded pointer-events-none"
                        draggable={false}
                    />
                );
            case 'image':
                return element.imageData ? (
                    <img
                        src={element.imageData}
                        alt="Custom Image"
                        className="w-full h-full object-cover rounded pointer-events-none"
                        draggable={false}
                    />
                ) : (
                    <div className="w-full h-full bg-gray-700 border-2 border-dashed border-gray-400 flex items-center justify-center text-black text-xs">
                        🖼️ Design
                    </div>
                );
            default:
                return <div className="text-black">{element.content}</div>;
        }
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
            case 'image':
                return element.imageData ? (
                    <img
                        src={element.imageData}
                        alt={element.content}
                        className="w-full h-full object-cover"
                        style={{
                            borderRadius: element.style.borderRadius || '4px',
                            filter: element.style.filter || 'none'
                        }}
                    />
                ) : (
                    <div className="w-full h-full bg-gray-200 border-2 border-dashed border-gray-400 flex items-center justify-center text-gray-500 text-xs">
                        📷 Image
                    </div>
                );
            default:
                return <div>{element.content}</div>;
        }
    };

    const getTemplateStyle = () => {
        const baseStyle = {
            backgroundColor: cardData.bgColor,
            color: cardData.textColor,
            borderRadius: cardData.cornerStyle === 'rounded' ? '12px' : cardData.cornerStyle === 'sharp' ? '0px' : cardData.cornerStyle === 'circular' ? '50px' : '4px',
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
                    backgroundColor: cardData.bgColor,
                    border: `2px solid ${cardData.accentColor}`,
                    color: cardData.textColor,
                    fontFamily: 'Georgia, serif',
                };
            case 'minimal':
                return {
                    ...baseStyle,
                    backgroundColor: cardData.bgColor,
                    border: `1px solid ${cardData.accentColor}40`,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    color: cardData.textColor,
                    fontFamily: 'Helvetica, Arial, sans-serif',
                };
            case 'elegant':
                return {
                    ...baseStyle,
                    background: `linear-gradient(135deg, ${cardData.bgColor} 0%, ${cardData.accentColor}20 100%)`,
                    border: `1px solid ${cardData.accentColor}30`,
                    boxShadow: `0 6px 20px ${cardData.accentColor}15`,
                    color: cardData.textColor,
                    fontFamily: 'Times, serif',
                };
            case 'creative':
                return {
                    ...baseStyle,
                    background: `linear-gradient(45deg, ${cardData.bgColor}, ${cardData.accentColor}, ${cardData.textColor}20)`,
                    color: cardData.textColor,
                    borderRadius: '15px 5px 15px 5px',
                    fontFamily: 'Arial, sans-serif',
                    fontWeight: 'bold',
                    border: `2px solid ${cardData.accentColor}`,
                };
            case 'corporate':
                return {
                    ...baseStyle,
                    background: `linear-gradient(135deg, ${cardData.bgColor} 0%, ${cardData.accentColor}40 100%)`,
                    color: cardData.textColor,
                    border: `2px solid ${cardData.accentColor}`,
                    fontFamily: 'Calibri, sans-serif',
                    boxShadow: `0 4px 15px ${cardData.accentColor}30`,
                };
            case 'gradient':
                return {
                    ...baseStyle,
                    background: `linear-gradient(135deg, ${cardData.bgColor} 0%, ${cardData.accentColor} 100%)`,
                    color: cardData.textColor,
                    border: 'none',
                    boxShadow: `0 5px 15px ${cardData.accentColor}40`,
                    fontFamily: 'Arial, sans-serif',
                };
            case 'dark':
                return {
                    ...baseStyle,
                    background: `linear-gradient(135deg, ${cardData.bgColor} 0%, ${cardData.accentColor}20 100%)`,
                    color: cardData.textColor,
                    border: `1px solid ${cardData.accentColor}`,
                    boxShadow: `0 0 12px ${cardData.accentColor}40`,
                    fontFamily: 'Consolas, monospace',
                };
            case 'colorful':
                return {
                    ...baseStyle,
                    background: `linear-gradient(45deg, ${cardData.bgColor} 0%, ${cardData.accentColor}60 50%, ${cardData.accentColor}60 100%)`,
                    color: cardData.textColor,
                    borderRadius: '20px',
                    boxShadow: `0 8px 25px ${cardData.accentColor}30`,
                    fontFamily: 'Comic Sans MS, cursive',
                };
            case 'professional':
                return {
                    ...baseStyle,
                    background: `linear-gradient(135deg, ${cardData.bgColor} 0%, ${cardData.accentColor}10 100%)`,
                    color: cardData.textColor,
                    border: `2px solid ${cardData.accentColor}`,
                    boxShadow: `0 6px 20px ${cardData.accentColor}20`,
                    fontFamily: 'Arial, sans-serif',
                };
            case 'artistic':
                return {
                    ...baseStyle,
                    background: `radial-gradient(circle at 30% 70%, ${cardData.bgColor}, ${cardData.accentColor})`,
                    color: cardData.textColor,
                    borderRadius: '25px 5px 25px 5px',
                    transform: 'rotate(-1deg)',
                    fontFamily: 'Brush Script MT, cursive',
                    border: `3px solid ${cardData.accentColor}`,
                };
            case 'tech':
                return {
                    ...baseStyle,
                    background: `linear-gradient(135deg, ${cardData.bgColor} 0%, ${cardData.accentColor}20 100%)`,
                    color: cardData.textColor,
                    border: `1px solid ${cardData.accentColor}`,
                    borderRadius: '2px',
                    boxShadow: `0 0 15px ${cardData.accentColor}30`,
                    fontFamily: 'Courier New, monospace',
                };
            case 'luxury':
                return {
                    ...baseStyle,
                    background: `linear-gradient(135deg, ${cardData.bgColor} 0%, ${cardData.accentColor}40 100%)`,
                    border: `3px solid ${cardData.accentColor}`,
                    color: cardData.textColor,
                    boxShadow: `0 6px 18px ${cardData.accentColor}40`,
                    fontFamily: 'Palatino, serif',
                };
            case 'geometric':
                return {
                    ...baseStyle,
                    background: `linear-gradient(45deg, ${cardData.bgColor} 25%, transparent 25%, transparent 75%, ${cardData.bgColor} 75%), linear-gradient(-45deg, ${cardData.accentColor} 25%, transparent 25%, transparent 75%, ${cardData.accentColor} 75%)`,
                    backgroundColor: cardData.bgColor,
                    backgroundSize: '20px 20px',
                    border: `2px solid ${cardData.accentColor}`,
                    color: cardData.textColor,
                    fontFamily: 'Helvetica, sans-serif',
                };
            case 'nature':
                return {
                    ...baseStyle,
                    background: `linear-gradient(135deg, ${cardData.bgColor} 0%, ${cardData.accentColor}40 50%, ${cardData.accentColor}60 100%)`,
                    color: cardData.textColor,
                    borderRadius: '15px',
                    border: `2px solid ${cardData.accentColor}`,
                    boxShadow: `0 8px 25px ${cardData.accentColor}30`,
                    fontFamily: 'Verdana, sans-serif',
                };
            case 'bold':
                return {
                    ...baseStyle,
                    background: `linear-gradient(135deg, ${cardData.bgColor} 0%, ${cardData.accentColor} 100%)`,
                    color: cardData.textColor,
                    border: `4px solid ${cardData.accentColor}`,
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    fontFamily: 'Impact, sans-serif',
                    boxShadow: `0 8px 25px ${cardData.accentColor}40`,
                };
            case 'vintage':
                return {
                    ...baseStyle,
                    background: `linear-gradient(135deg, ${cardData.bgColor} 0%, ${cardData.accentColor}40 100%)`,
                    color: cardData.textColor,
                    border: `4px double ${cardData.accentColor}`,
                    borderRadius: '8px',
                    fontFamily: 'Times New Roman, serif',
                    boxShadow: `0 6px 20px ${cardData.accentColor}30`,
                };
            case 'futuristic':
                return {
                    ...baseStyle,
                    background: `linear-gradient(135deg, ${cardData.bgColor} 0%, ${cardData.accentColor} 100%)`,
                    color: cardData.textColor,
                    border: `2px solid ${cardData.accentColor}`,
                    borderRadius: '0px',
                    fontFamily: 'Orbitron, sans-serif',
                    boxShadow: `0 0 20px ${cardData.accentColor}50`,
                    textShadow: `0 0 10px ${cardData.accentColor}80`,
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

                    {/* Product Navigation Tabs */}
                    <div className="mt-4 border-b border-gray-200">
                        <nav className="flex space-x-8">
                            <button
                                onClick={() => setActiveProductTab('visiting-cards')}
                                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${activeProductTab === 'visiting-cards'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                Visiting Cards
                            </button>
                            <button
                                onClick={() => setActiveProductTab('letter-pads')}
                                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${activeProductTab === 'letter-pads'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                Letter Pads
                            </button>
                            <button
                                onClick={() => setActiveProductTab('tshirt')}
                                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${activeProductTab === 'tshirt'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                T-Shirt
                            </button>
                            <button
                                onClick={() => setActiveProductTab('merchandise')}
                                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${activeProductTab === 'merchandise'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                Merchandise
                            </button>
                        </nav>
                    </div>
                </div>

                {/* Main Content - Conditional rendering based on active tab */}
                {activeProductTab === 'visiting-cards' && (
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
                                    <select
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (value === 'name') {
                                                addElement('text', 'Name', { fontSize: 18, fontWeight: 'bold' });
                                            } else if (value === 'title') {
                                                addElement('text', 'Job Title', { fontSize: 14, color: '#666' });
                                            } else if (value === 'company') {
                                                addElement('text', 'Company Name', { fontSize: 16, fontWeight: 'bold', color: '#007bff' });
                                            } else if (value === 'phone') {
                                                addElement('text', '📞 Phone', { fontSize: 12 });
                                            } else if (value === 'email') {
                                                addElement('text', '✉️ Email', { fontSize: 12 });
                                            } else if (value === 'website') {
                                                addElement('text', '🌐 Website', { fontSize: 12 });
                                            }
                                            e.target.value = '';
                                        }}
                                        className="w-full p-2 border border-gray-300 rounded text-xs"
                                        defaultValue=""
                                    >
                                        <option value="" disabled>Select quick element...</option>
                                        <option value="name">+ Name</option>
                                        <option value="title">+ Title</option>
                                        <option value="company">+ Company</option>
                                        <option value="phone">+ Phone</option>
                                        <option value="email">+ Email</option>
                                        <option value="website">+ Website</option>
                                    </select>
                                </div>

                                {/* Corner Style */}
                                <div className="mb-4">
                                    <h4 className="text-xs font-medium text-gray-600 mb-2">Corner Style</h4>
                                    <select
                                        value={cardData.cornerStyle}
                                        onChange={(e) => {
                                            const value = e.target.value as 'normal' | 'rounded' | 'sharp' | 'circular';
                                            setCardData(prev => ({ ...prev, cornerStyle: value }));
                                        }}
                                        className="w-full p-2 border border-gray-300 rounded text-xs"
                                    >
                                        <option value="normal">Normal</option>
                                        <option value="rounded">Rounded</option>
                                        <option value="sharp">Sharp</option>
                                        <option value="circular">Circular</option>
                                    </select>
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
                                                        {element.type === 'qr' ? '📱' : element.type === 'image' ? '�️' : '�📝'}
                                                    </span>
                                                    <span className="truncate max-w-24">
                                                        {element.type === 'qr' ? 'QR Code' : element.type === 'image' ? 'Image' : element.content}
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
                                <div className="grid grid-cols-3 gap-2">
                                    <button
                                        onClick={() => addElement('text')}
                                        className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex flex-col items-center text-sm font-medium shadow-sm"
                                    >
                                        <span className="text-lg mb-1">📝</span>
                                        Text
                                    </button>
                                    <button
                                        onClick={() => addElement('qr')}
                                        className="p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex flex-col items-center text-sm font-medium shadow-sm"
                                    >
                                        <span className="text-lg mb-1">📱</span>
                                        QR Code
                                    </button>
                                    <button
                                        onClick={() => {
                                            const fileInput = document.createElement('input');
                                            fileInput.type = 'file';
                                            fileInput.accept = 'image/*';
                                            fileInput.onchange = (event) => {
                                                const file = (event.target as HTMLInputElement).files?.[0];
                                                if (file) {
                                                    const reader = new FileReader();
                                                    reader.onload = (e) => {
                                                        const imageData = e.target?.result as string;
                                                        const newElement: CardElement = {
                                                            id: `image_${Date.now()}`,
                                                            type: 'image',
                                                            content: file.name,
                                                            position: { x: 44, y: 44 },
                                                            size: { width: 80, height: 60 },
                                                            style: { borderRadius: '4px' },
                                                            side: currentView,
                                                            imageData: imageData
                                                        };
                                                        setCardElements(prev => [...prev, newElement]);
                                                        setSelectedElement(newElement);
                                                    };
                                                    reader.readAsDataURL(file);
                                                }
                                            };
                                            fileInput.click();
                                        }}
                                        className="p-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors flex flex-col items-center text-sm font-medium shadow-sm"
                                    >
                                        <span className="text-lg mb-1">�️</span>
                                        Image
                                    </button>
                                </div>
                            </div>

                            {/* Selected Element Editor */}
                            {selectedElement && (
                                <div className="border border-blue-200 rounded-lg p-3 bg-blue-50">
                                    <div className="flex justify-between items-center mb-3">
                                        <h4 className="text-sm font-semibold text-blue-800">
                                            ✏️ Editing: {selectedElement.type === 'qr' ? 'QR Code' : selectedElement.type === 'image' ? 'Image' : selectedElement.content.substring(0, 20) + (selectedElement.content.length > 20 ? '...' : '')}
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

                                    {selectedElement.type === 'image' && (
                                        <div className="space-y-3">
                                            <div>
                                                <label className="block text-xs text-gray-600 mb-1">Image</label>
                                                {selectedElement.imageData ? (
                                                    <div className="space-y-2">
                                                        <img
                                                            src={selectedElement.imageData}
                                                            alt="Preview"
                                                            className="w-full h-20 object-cover rounded border border-gray-300"
                                                        />
                                                        <label className="block w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm cursor-pointer text-center">
                                                            🔄 Replace Image
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                onChange={(e) => {
                                                                    const file = e.target.files?.[0];
                                                                    if (file) {
                                                                        const reader = new FileReader();
                                                                        reader.onload = (event) => {
                                                                            updateElement(selectedElement.id, {
                                                                                imageData: event.target?.result as string,
                                                                                content: file.name
                                                                            });
                                                                        };
                                                                        reader.readAsDataURL(file);
                                                                    }
                                                                    e.target.value = '';
                                                                }}
                                                                className="hidden"
                                                            />
                                                        </label>
                                                    </div>
                                                ) : (
                                                    <label className="block w-full p-4 border-2 border-dashed border-gray-300 rounded text-center cursor-pointer hover:border-blue-400">
                                                        📷 Click to upload image
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={(e) => {
                                                                const file = e.target.files?.[0];
                                                                if (file) {
                                                                    const reader = new FileReader();
                                                                    reader.onload = (event) => {
                                                                        updateElement(selectedElement.id, {
                                                                            imageData: event.target?.result as string,
                                                                            content: file.name
                                                                        });
                                                                    };
                                                                    reader.readAsDataURL(file);
                                                                }
                                                                e.target.value = '';
                                                            }}
                                                            className="hidden"
                                                        />
                                                    </label>
                                                )}
                                            </div>
                                            <div>
                                                <label className="block text-xs text-gray-600 mb-1">Border Radius</label>
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max="50"
                                                    value={parseInt(selectedElement.style.borderRadius) || 4}
                                                    onChange={(e) => updateElement(selectedElement.id, {
                                                        style: {
                                                            ...selectedElement.style,
                                                            borderRadius: `${e.target.value}px`
                                                        }
                                                    })}
                                                    className="w-full"
                                                />
                                                <span className="text-xs text-gray-500">{parseInt(selectedElement.style.borderRadius) || 4}px</span>
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
                                        {selectedElement.type !== 'qr' && selectedElement.type !== 'image' && (
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
                                        <button
                                            onClick={() => setShowQuote(!showQuote)}
                                            className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center text-sm shadow-md"
                                        >
                                            <span className="mr-2">💰</span>
                                            Get Quote
                                        </button>
                                    </div>

                                    {/* Pricing Section */}
                                    {showQuote && (
                                        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                                            <h4 className="text-lg font-semibold text-gray-800 mb-4">Get Your Quote</h4>

                                            {/* Horizontal Layout for Quantity and Pricing */}
                                            <div className="grid grid-cols-2 gap-4 mb-4">
                                                {/* Left: Quantity Controls */}
                                                <div>
                                                    <div className="flex items-center space-x-3 mb-3">
                                                        <label className="text-sm font-medium text-gray-700 min-w-fit">Quantity:</label>
                                                        <input
                                                            type="number"
                                                            value={customQuantity || quantity}
                                                            onChange={(e) => {
                                                                const value = e.target.value;
                                                                setCustomQuantity(value);
                                                                if (value) {
                                                                    setQuantity(parseInt(value) || 100);
                                                                }
                                                            }}
                                                            className="w-20 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                                            placeholder="100"
                                                            min="1"
                                                        />
                                                        <button className="relative">
                                                            <select
                                                                value={quantity}
                                                                onChange={(e) => {
                                                                    const value = parseInt(e.target.value);
                                                                    setQuantity(value);
                                                                    setCustomQuantity('');
                                                                }}
                                                                className="opacity-0 absolute inset-0 w-6 h-6 cursor-pointer"
                                                            >
                                                                <option value={100}>100</option>
                                                                <option value={200}>200</option>
                                                                <option value={500}>500</option>
                                                                <option value={1000}>1000</option>
                                                            </select>
                                                            <div className="w-6 h-6 bg-gray-200 hover:bg-gray-300 rounded border border-gray-300 flex items-center justify-center transition-colors">
                                                                <span className="text-xs text-gray-600">▼</span>
                                                            </div>
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Right: Pricing Summary */}
                                                <div className="bg-white p-3 border border-gray-200 rounded">
                                                    <div className="flex justify-between items-center text-sm mb-1">
                                                        <span className="text-gray-600">{quantity} cards</span>
                                                        <span className="font-medium">₹{quantity >= 1000 ? '8' : quantity >= 500 ? '10' : quantity >= 200 ? '12' : '15'}/card</span>
                                                    </div>
                                                    <div className="border-t border-gray-200 pt-1 flex justify-between items-center">
                                                        <span className="text-sm font-semibold text-gray-800">Total:</span>
                                                        <span className="text-lg font-bold text-orange-600">₹{quantity * (quantity >= 1000 ? 8 : quantity >= 500 ? 10 : quantity >= 200 ? 12 : 15)}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="text-center">
                                                <button className="px-8 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-semibold text-sm shadow-lg">
                                                    Place Order
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeProductTab === 'letter-pads' && (
                    <div className="flex-1 flex overflow-hidden">
                        {/* Left Panel - Templates */}
                        <div className="w-80 bg-white border-r border-gray-200 p-4 overflow-y-auto">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Choose Template</h3>
                            <div className="space-y-3">
                                {[
                                    { id: 'corporate', name: 'Corporate' },
                                    { id: 'modern', name: 'Modern' },
                                    { id: 'classic', name: 'Classic' },
                                    { id: 'minimal', name: 'Minimal' },
                                    { id: 'professional', name: 'Professional' }
                                ].map((template) => (
                                    <button
                                        key={template.id}
                                        onClick={() => setLetterPadData(prev => ({ ...prev, template: template.id as any }))}
                                        className={`group relative overflow-hidden rounded-lg border-2 transition-all duration-300 w-full transform hover:scale-105 ${letterPadData.template === template.id
                                            ? 'border-blue-500 shadow-xl ring-2 ring-blue-200 scale-105'
                                            : 'border-gray-200 hover:border-blue-300 hover:shadow-lg'
                                            }`}
                                        style={{ aspectRatio: '210/297' }} // A4 ratio
                                    >
                                        <div className="w-full h-full p-2">
                                            <div
                                                className="w-full h-full rounded-md shadow-sm relative overflow-hidden"
                                                style={getLetterPadTemplateStyle(template.id, letterPadData)}
                                            >
                                                {/* A4 Template Preview */}
                                                <div className="p-2 h-full flex flex-col">
                                                    {/* Header */}
                                                    <div className="flex items-start justify-between mb-2" style={{ borderBottom: `1px solid ${letterPadData.accentColor}20` }}>
                                                        <div className="flex-1">
                                                            <div className="text-xs font-bold mb-1" style={{ color: letterPadData.accentColor }}>
                                                                {letterPadData.companyName || 'Company Name'}
                                                            </div>
                                                            <div className="text-xs opacity-70">
                                                                {letterPadData.address || 'Address'}
                                                            </div>
                                                            <div className="text-xs opacity-70">
                                                                📞 {letterPadData.phone || 'Phone'}
                                                            </div>
                                                        </div>
                                                        <div className="w-4 h-4 border rounded-sm flex items-center justify-center text-xs" style={{ borderColor: letterPadData.accentColor, fontSize: '6px' }}>
                                                            L
                                                        </div>
                                                    </div>

                                                    {/* Content lines */}
                                                    <div className="flex-1 space-y-1">
                                                        {[...Array(8)].map((_, i) => (
                                                            <div key={i} className="border-b" style={{ borderColor: letterPadData.textColor + '15', height: '2px' }} />
                                                        ))}
                                                    </div>

                                                    {/* Footer */}
                                                    <div className="text-xs text-center pt-1" style={{ borderTop: `1px solid ${letterPadData.accentColor}`, fontSize: '6px' }}>
                                                        {letterPadData.companyName || 'Company'} | {letterPadData.phone || 'Phone'}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                                            <div className="text-white text-xs font-semibold truncate">{template.name}</div>
                                        </div>
                                        {letterPadData.template === template.id && (
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
                                        onClick={() => setLetterPadElements([])}
                                        className="px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600 transition-colors"
                                    >
                                        Clear All
                                    </button>
                                </div>

                                {/* Quick Add Default Elements */}
                                <div className="mb-4">
                                    <h4 className="text-xs font-medium text-gray-600 mb-2">Quick Add</h4>
                                    <select
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (value === 'company') {
                                                const newElement: CardElement = {
                                                    id: Date.now().toString(),
                                                    type: 'text',
                                                    content: letterPadData.companyName || 'Company Name',
                                                    position: { x: 50, y: 50 },
                                                    size: { width: 300, height: 30 },
                                                    style: { fontSize: 24, fontWeight: 'bold', color: letterPadData.accentColor },
                                                    side: 'front'
                                                };
                                                setLetterPadElements(prev => [...prev, newElement]);
                                            } else if (value === 'address') {
                                                const newElement: CardElement = {
                                                    id: Date.now().toString(),
                                                    type: 'text',
                                                    content: letterPadData.address || 'Company Address',
                                                    position: { x: 50, y: 90 },
                                                    size: { width: 300, height: 20 },
                                                    style: { fontSize: 14, color: letterPadData.textColor },
                                                    side: 'front'
                                                };
                                                setLetterPadElements(prev => [...prev, newElement]);
                                            } else if (value === 'phone') {
                                                const newElement: CardElement = {
                                                    id: Date.now().toString(),
                                                    type: 'text',
                                                    content: `📞 ${letterPadData.phone || 'Phone'}`,
                                                    position: { x: 50, y: 120 },
                                                    size: { width: 200, height: 20 },
                                                    style: { fontSize: 12, color: letterPadData.textColor },
                                                    side: 'front'
                                                };
                                                setLetterPadElements(prev => [...prev, newElement]);
                                            } else if (value === 'email') {
                                                const newElement: CardElement = {
                                                    id: Date.now().toString(),
                                                    type: 'text',
                                                    content: `✉️ ${letterPadData.email || 'Email'}`,
                                                    position: { x: 50, y: 140 },
                                                    size: { width: 200, height: 20 },
                                                    style: { fontSize: 12, color: letterPadData.textColor },
                                                    side: 'front'
                                                };
                                                setLetterPadElements(prev => [...prev, newElement]);
                                            } else if (value === 'website') {
                                                const newElement: CardElement = {
                                                    id: Date.now().toString(),
                                                    type: 'text',
                                                    content: `🌐 ${letterPadData.website || 'Website'}`,
                                                    position: { x: 50, y: 160 },
                                                    size: { width: 200, height: 20 },
                                                    style: { fontSize: 12, color: letterPadData.textColor },
                                                    side: 'front'
                                                };
                                                setLetterPadElements(prev => [...prev, newElement]);
                                            }
                                            e.target.value = '';
                                        }}
                                        className="w-full p-2 border border-gray-300 rounded text-xs"
                                        defaultValue=""
                                    >
                                        <option value="" disabled>Select quick element...</option>
                                        <option value="company">+ Company Name</option>
                                        <option value="address">+ Address</option>
                                        <option value="phone">+ Phone</option>
                                        <option value="email">+ Email</option>
                                        <option value="website">+ Website</option>
                                    </select>
                                </div>

                                {/* Current Elements List */}
                                <div className="space-y-2">
                                    <h4 className="text-xs font-medium text-gray-600">Current Elements ({letterPadElements.length})</h4>
                                    {letterPadElements.map((element, index) => (
                                        <div
                                            key={element.id}
                                            className={`p-2 rounded border text-xs cursor-pointer transition-colors ${selectedLetterPadElement === element.id
                                                ? 'bg-blue-100 border-blue-300'
                                                : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                                                }`}
                                            onClick={() => setSelectedLetterPadElement(element.id)}
                                        >
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center space-x-2">
                                                    <span className="font-medium">
                                                        {element.type === 'line' ? '📏' : element.type === 'image' ? '🖼️' : '📝'}
                                                    </span>
                                                    <span className="truncate max-w-24">
                                                        {element.type === 'line' ? 'Line' : element.type === 'image' ? 'Image' : element.content}
                                                    </span>
                                                </div>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setLetterPadElements(prev => prev.filter(el => el.id !== element.id));
                                                        if (selectedLetterPadElement === element.id) {
                                                            setSelectedLetterPadElement(null);
                                                        }
                                                    }}
                                                    className="text-red-500 hover:text-red-700 font-bold"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    {letterPadElements.length === 0 && (
                                        <p className="text-xs text-gray-500 italic py-4 text-center">
                                            No elements added. Add some elements to get started!
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
                                            value={letterPadData.bgColor}
                                            onChange={(e) => setLetterPadData(prev => ({ ...prev, bgColor: e.target.value }))}
                                            className="w-full h-10 border border-gray-300 rounded cursor-pointer"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-gray-600 mb-1">Text</label>
                                        <input
                                            type="color"
                                            value={letterPadData.textColor}
                                            onChange={(e) => setLetterPadData(prev => ({ ...prev, textColor: e.target.value }))}
                                            className="w-full h-10 border border-gray-300 rounded cursor-pointer"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-gray-600 mb-1">Accent</label>
                                        <input
                                            type="color"
                                            value={letterPadData.accentColor}
                                            onChange={(e) => setLetterPadData(prev => ({ ...prev, accentColor: e.target.value }))}
                                            className="w-full h-10 border border-gray-300 rounded cursor-pointer"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Add Elements */}
                            <div className="mb-6">
                                <h3 className="text-sm font-semibold text-gray-800 mb-3">Add Elements</h3>
                                <div className="grid grid-cols-3 gap-2">
                                    <button
                                        onClick={() => {
                                            const newElement: CardElement = {
                                                id: Date.now().toString(),
                                                type: 'text',
                                                content: 'Sample Text',
                                                position: { x: 100, y: 300 },
                                                size: { width: 200, height: 30 },
                                                style: { fontSize: 14, color: letterPadData.textColor },
                                                side: 'front'
                                            };
                                            setLetterPadElements(prev => [...prev, newElement]);
                                            setSelectedLetterPadElement(newElement.id);
                                        }}
                                        className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex flex-col items-center text-sm font-medium shadow-sm"
                                    >
                                        <span className="text-lg mb-1">📝</span>
                                        Text
                                    </button>
                                    <button
                                        onClick={() => {
                                            const newElement: CardElement = {
                                                id: Date.now().toString(),
                                                type: 'line',
                                                content: '',
                                                position: { x: 50, y: 200 },
                                                size: { width: 500, height: 2 },
                                                style: { backgroundColor: letterPadData.accentColor },
                                                side: 'front'
                                            };
                                            setLetterPadElements(prev => [...prev, newElement]);
                                            setSelectedLetterPadElement(newElement.id);
                                        }}
                                        className="p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex flex-col items-center text-sm font-medium shadow-sm"
                                    >
                                        <span className="text-lg mb-1">📏</span>
                                        Line
                                    </button>
                                    <button
                                        onClick={() => {
                                            const fileInput = document.createElement('input');
                                            fileInput.type = 'file';
                                            fileInput.accept = 'image/*';
                                            fileInput.onchange = (event) => {
                                                const file = (event.target as HTMLInputElement).files?.[0];
                                                if (file) {
                                                    const reader = new FileReader();
                                                    reader.onload = (e) => {
                                                        const imageData = e.target?.result as string;
                                                        const newElement: CardElement = {
                                                            id: Date.now().toString(),
                                                            type: 'image',
                                                            content: file.name,
                                                            position: { x: 500, y: 50 },
                                                            size: { width: 100, height: 100 },
                                                            style: { borderRadius: '4px' },
                                                            side: 'front',
                                                            imageData: imageData
                                                        };
                                                        setLetterPadElements(prev => [...prev, newElement]);
                                                        setSelectedLetterPadElement(newElement.id);
                                                    };
                                                    reader.readAsDataURL(file);
                                                }
                                            };
                                            fileInput.click();
                                        }}
                                        className="p-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors flex flex-col items-center text-sm font-medium shadow-sm"
                                    >
                                        <span className="text-lg mb-1">🖼️</span>
                                        Image
                                    </button>
                                </div>
                            </div>

                            {/* Selected Element Editor */}
                            {selectedLetterPadElement && (
                                <div className="border border-blue-200 rounded-lg p-3 bg-blue-50">
                                    {(() => {
                                        const element = letterPadElements.find(el => el.id === selectedLetterPadElement);
                                        if (!element) return null;
                                        return (
                                            <>
                                                <div className="flex justify-between items-center mb-3">
                                                    <h4 className="text-sm font-semibold text-blue-800">
                                                        ✏️ Editing: {element.type === 'line' ? 'Line' : element.type === 'image' ? 'Image' : element.content.substring(0, 20) + (element.content.length > 20 ? '...' : '')}
                                                    </h4>
                                                    <div className="flex space-x-2">
                                                        <button
                                                            onClick={() => setSelectedLetterPadElement(null)}
                                                            className="text-xs text-green-600 hover:text-green-800 bg-green-100 hover:bg-green-200 px-2 py-1 rounded transition-colors font-medium"
                                                        >
                                                            ✓ Done
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                setLetterPadElements(prev => prev.filter(el => el.id !== element.id));
                                                                setSelectedLetterPadElement(null);
                                                            }}
                                                            className="text-xs text-red-600 hover:text-red-800 bg-red-100 hover:bg-red-200 px-2 py-1 rounded transition-colors"
                                                        >
                                                            🗑️ Delete
                                                        </button>
                                                    </div>
                                                </div>

                                                {element.type === 'text' && (
                                                    <div className="space-y-3">
                                                        <div>
                                                            <label className="block text-xs text-gray-600 mb-1">Text Content</label>
                                                            <input
                                                                type="text"
                                                                value={element.content}
                                                                onChange={(e) => {
                                                                    setLetterPadElements(prev =>
                                                                        prev.map(el =>
                                                                            el.id === element.id
                                                                                ? { ...el, content: e.target.value }
                                                                                : el
                                                                        )
                                                                    );
                                                                }}
                                                                className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                                                                placeholder="Enter text"
                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-2">
                                                            <div>
                                                                <label className="block text-xs text-gray-600 mb-1">Color</label>
                                                                <input
                                                                    type="color"
                                                                    value={element.style.color || letterPadData.textColor}
                                                                    onChange={(e) => {
                                                                        setLetterPadElements(prev =>
                                                                            prev.map(el =>
                                                                                el.id === element.id
                                                                                    ? { ...el, style: { ...el.style, color: e.target.value } }
                                                                                    : el
                                                                            )
                                                                        );
                                                                    }}
                                                                    className="w-full h-8 border border-gray-300 rounded cursor-pointer"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block text-xs text-gray-600 mb-1">Font Size: {element.style.fontSize || 14}px</label>
                                                                <input
                                                                    type="range"
                                                                    value={element.style.fontSize || 14}
                                                                    onChange={(e) => {
                                                                        setLetterPadElements(prev =>
                                                                            prev.map(el =>
                                                                                el.id === element.id
                                                                                    ? { ...el, style: { ...el.style, fontSize: parseInt(e.target.value) } }
                                                                                    : el
                                                                            )
                                                                        );
                                                                    }}
                                                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                                                    min="8"
                                                                    max="72"
                                                                />
                                                            </div>
                                                        </div>

                                                        {/* Element Size Controls */}
                                                        <div className="space-y-3">
                                                            <div>
                                                                <label className="block text-xs text-gray-600 mb-1">Width: {element.size.width}px</label>
                                                                <input
                                                                    type="range"
                                                                    value={element.size.width}
                                                                    onChange={(e) => {
                                                                        setLetterPadElements(prev =>
                                                                            prev.map(el =>
                                                                                el.id === element.id
                                                                                    ? { ...el, size: { ...el.size, width: parseInt(e.target.value) } }
                                                                                    : el
                                                                            )
                                                                        );
                                                                    }}
                                                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                                                    min="20"
                                                                    max="500"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block text-xs text-gray-600 mb-1">Height: {element.size.height}px</label>
                                                                <input
                                                                    type="range"
                                                                    value={element.size.height}
                                                                    onChange={(e) => {
                                                                        setLetterPadElements(prev =>
                                                                            prev.map(el =>
                                                                                el.id === element.id
                                                                                    ? { ...el, size: { ...el.size, height: parseInt(e.target.value) } }
                                                                                    : el
                                                                            )
                                                                        );
                                                                    }}
                                                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                                                    min="10"
                                                                    max="200"
                                                                />
                                                            </div>
                                                        </div>

                                                        {/* Text Formatting Controls */}
                                                        <div className="grid grid-cols-3 gap-1">
                                                            <button
                                                                onClick={() => {
                                                                    setLetterPadElements(prev =>
                                                                        prev.map(el =>
                                                                            el.id === element.id
                                                                                ? { ...el, style: { ...el.style, fontWeight: el.style.fontWeight === 'bold' ? 'normal' : 'bold' } }
                                                                                : el
                                                                        )
                                                                    );
                                                                }}
                                                                className={`p-1 text-xs rounded border ${element.style.fontWeight === 'bold' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
                                                            >
                                                                Bold
                                                            </button>
                                                            <button
                                                                onClick={() => {
                                                                    setLetterPadElements(prev =>
                                                                        prev.map(el =>
                                                                            el.id === element.id
                                                                                ? { ...el, style: { ...el.style, fontStyle: el.style.fontStyle === 'italic' ? 'normal' : 'italic' } }
                                                                                : el
                                                                        )
                                                                    );
                                                                }}
                                                                className={`p-1 text-xs rounded border ${element.style.fontStyle === 'italic' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
                                                            >
                                                                Italic
                                                            </button>
                                                            <button
                                                                onClick={() => {
                                                                    setLetterPadElements(prev =>
                                                                        prev.map(el =>
                                                                            el.id === element.id
                                                                                ? { ...el, style: { ...el.style, textDecoration: el.style.textDecoration === 'underline' ? 'none' : 'underline' } }
                                                                                : el
                                                                        )
                                                                    );
                                                                }}
                                                                className={`p-1 text-xs rounded border ${element.style.textDecoration === 'underline' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
                                                            >
                                                                U
                                                            </button>
                                                        </div>

                                                        {/* Text Alignment Controls */}
                                                        <div className="grid grid-cols-3 gap-1">
                                                            <button
                                                                onClick={() => {
                                                                    setLetterPadElements(prev =>
                                                                        prev.map(el =>
                                                                            el.id === element.id
                                                                                ? { ...el, style: { ...el.style, textAlign: 'left' } }
                                                                                : el
                                                                        )
                                                                    );
                                                                }}
                                                                className={`p-1 text-xs rounded border ${element.style.textAlign === 'left' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
                                                            >
                                                                ⬅
                                                            </button>
                                                            <button
                                                                onClick={() => {
                                                                    setLetterPadElements(prev =>
                                                                        prev.map(el =>
                                                                            el.id === element.id
                                                                                ? { ...el, style: { ...el.style, textAlign: 'center' } }
                                                                                : el
                                                                        )
                                                                    );
                                                                }}
                                                                className={`p-1 text-xs rounded border ${element.style.textAlign === 'center' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
                                                            >
                                                                ↔
                                                            </button>
                                                            <button
                                                                onClick={() => {
                                                                    setLetterPadElements(prev =>
                                                                        prev.map(el =>
                                                                            el.id === element.id
                                                                                ? { ...el, style: { ...el.style, textAlign: 'right' } }
                                                                                : el
                                                                        )
                                                                    );
                                                                }}
                                                                className={`p-1 text-xs rounded border ${element.style.textAlign === 'right' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
                                                            >
                                                                ➡
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}

                                                {element.type === 'line' && (
                                                    <div className="space-y-3">
                                                        <div className="grid grid-cols-2 gap-2">
                                                            <div>
                                                                <label className="block text-xs text-gray-600 mb-1">Color</label>
                                                                <input
                                                                    type="color"
                                                                    value={element.style.backgroundColor || letterPadData.accentColor}
                                                                    onChange={(e) => {
                                                                        setLetterPadElements(prev =>
                                                                            prev.map(el =>
                                                                                el.id === element.id
                                                                                    ? { ...el, style: { ...el.style, backgroundColor: e.target.value } }
                                                                                    : el
                                                                            )
                                                                        );
                                                                    }}
                                                                    className="w-full h-8 border border-gray-300 rounded cursor-pointer"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block text-xs text-gray-600 mb-1">Height</label>
                                                                <input
                                                                    type="number"
                                                                    value={element.size.height}
                                                                    onChange={(e) => {
                                                                        setLetterPadElements(prev =>
                                                                            prev.map(el =>
                                                                                el.id === element.id
                                                                                    ? { ...el, size: { ...el.size, height: parseInt(e.target.value) } }
                                                                                    : el
                                                                            )
                                                                        );
                                                                    }}
                                                                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                                                                    min="1"
                                                                    max="20"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                                {(element.type === 'logo' || element.type === 'image') && (
                                                    <div className="space-y-3">
                                                        <div>
                                                            <label className="block text-xs text-gray-600 mb-1">
                                                                {element.type === 'logo' ? 'Logo Placeholder' : 'Image'}
                                                            </label>
                                                            <button
                                                                onClick={() => {
                                                                    const fileInput = document.createElement('input');
                                                                    fileInput.type = 'file';
                                                                    fileInput.accept = 'image/*';
                                                                    fileInput.onchange = (event) => {
                                                                        const file = (event.target as HTMLInputElement).files?.[0];
                                                                        if (file) {
                                                                            const reader = new FileReader();
                                                                            reader.onload = (e) => {
                                                                                const imageData = e.target?.result as string;
                                                                                setLetterPadElements(prev =>
                                                                                    prev.map(el =>
                                                                                        el.id === element.id
                                                                                            ? {
                                                                                                ...el,
                                                                                                type: 'image',
                                                                                                content: file.name,
                                                                                                imageData: imageData,
                                                                                                style: { borderRadius: '4px' }
                                                                                            }
                                                                                            : el
                                                                                    )
                                                                                );
                                                                            };
                                                                            reader.readAsDataURL(file);
                                                                        }
                                                                    };
                                                                    fileInput.click();
                                                                }}
                                                                className="w-full px-3 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
                                                            >
                                                                {element.imageData ? 'Change Image' : 'Upload Image'}
                                                            </button>
                                                        </div>
                                                        {element.imageData && (
                                                            <div>
                                                                <img
                                                                    src={element.imageData}
                                                                    alt="Preview"
                                                                    className="w-full h-20 object-cover rounded border"
                                                                />
                                                                <button
                                                                    onClick={() => {
                                                                        if (element.id === 'logo_placeholder') {
                                                                            // Reset to logo placeholder
                                                                            setLetterPadElements(prev =>
                                                                                prev.map(el =>
                                                                                    el.id === element.id
                                                                                        ? {
                                                                                            ...el,
                                                                                            type: 'logo',
                                                                                            content: 'LOGO',
                                                                                            imageData: undefined,
                                                                                            style: {
                                                                                                fontSize: 12,
                                                                                                color: letterPadData.accentColor,
                                                                                                border: `2px solid ${letterPadData.accentColor}`,
                                                                                                textAlign: 'center',
                                                                                                lineHeight: '76px',
                                                                                                backgroundColor: letterPadData.accentColor + '10'
                                                                                            }
                                                                                        }
                                                                                        : el
                                                                                )
                                                                            );
                                                                        } else {
                                                                            // Remove image data for other elements
                                                                            setLetterPadElements(prev =>
                                                                                prev.map(el =>
                                                                                    el.id === element.id
                                                                                        ? { ...el, imageData: undefined }
                                                                                        : el
                                                                                )
                                                                            );
                                                                        }
                                                                    }}
                                                                    className="w-full mt-2 px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600 transition-colors"
                                                                >
                                                                    Remove Image
                                                                </button>
                                                            </div>
                                                        )}

                                                        {/* Element Size Controls */}
                                                        <div className="space-y-3">
                                                            <div>
                                                                <label className="block text-xs text-gray-600 mb-1">Width: {element.size.width}px</label>
                                                                <input
                                                                    type="range"
                                                                    value={element.size.width}
                                                                    onChange={(e) => {
                                                                        setLetterPadElements(prev =>
                                                                            prev.map(el =>
                                                                                el.id === element.id
                                                                                    ? { ...el, size: { ...el.size, width: parseInt(e.target.value) } }
                                                                                    : el
                                                                            )
                                                                        );
                                                                    }}
                                                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                                                    min="20"
                                                                    max="300"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block text-xs text-gray-600 mb-1">Height: {element.size.height}px</label>
                                                                <input
                                                                    type="range"
                                                                    value={element.size.height}
                                                                    onChange={(e) => {
                                                                        setLetterPadElements(prev =>
                                                                            prev.map(el =>
                                                                                el.id === element.id
                                                                                    ? { ...el, size: { ...el.size, height: parseInt(e.target.value) } }
                                                                                    : el
                                                                            )
                                                                        );
                                                                    }}
                                                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                                                    min="20"
                                                                    max="300"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </>
                                        );
                                    })()}
                                </div>
                            )}
                        </div>

                        {/* Right Panel - Preview */}
                        <div className="flex-1 bg-gray-50 p-6 overflow-auto">
                            <div className="max-w-4xl mx-auto">
                                {/* Header with title and buttons */}
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-xl font-bold text-gray-800">Letter Pad Preview</h3>

                                    {/* Action Buttons */}
                                    <div className="flex space-x-3">
                                        <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center text-sm shadow-md">
                                            <span className="mr-2">📥</span>
                                            Download
                                        </button>
                                        <button
                                            onClick={() => setShowQuote(!showQuote)}
                                            className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center text-sm shadow-md"
                                        >
                                            <span className="mr-2">💰</span>
                                            Get Quote
                                        </button>
                                    </div>
                                </div>

                                {/* Pricing Section - Moved above preview */}
                                {showQuote && (
                                    <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                                        <h4 className="text-lg font-semibold text-gray-800 mb-4">Get Your Quote - Letter Pads</h4>

                                        {/* Horizontal Layout for Quantity and Pricing */}
                                        <div className="grid grid-cols-2 gap-4 mb-4">
                                            {/* Left: Quantity Controls */}
                                            <div>
                                                <div className="flex items-center space-x-3 mb-3">
                                                    <label className="text-sm font-medium text-gray-700 min-w-fit">Quantity:</label>
                                                    <input
                                                        type="number"
                                                        value={customQuantity || quantity}
                                                        onChange={(e) => {
                                                            const value = e.target.value;
                                                            setCustomQuantity(value);
                                                            if (value) {
                                                                setQuantity(parseInt(value) || 100);
                                                            }
                                                        }}
                                                        className="w-20 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                                        placeholder="100"
                                                        min="1"
                                                    />
                                                </div>

                                                {/* Quick Quantity Buttons */}
                                                <div className="grid grid-cols-3 gap-2">
                                                    {[100, 250, 500, 1000, 2500, 5000].map((qty) => (
                                                        <button
                                                            key={qty}
                                                            onClick={() => {
                                                                setQuantity(qty);
                                                                setCustomQuantity('');
                                                            }}
                                                            className={`px-3 py-1 text-xs rounded border transition-colors ${quantity === qty
                                                                ? 'bg-orange-500 text-white border-orange-500'
                                                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                                                }`}
                                                        >
                                                            {qty}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Right: Pricing Display */}
                                            <div>
                                                <div className="bg-white p-3 rounded border">
                                                    <div className="text-sm text-gray-600 mb-2">Estimated Price</div>
                                                    <div className="text-2xl font-bold text-orange-600">
                                                        ₹{(() => {
                                                            if (quantity <= 100) return (quantity * 8).toLocaleString();
                                                            if (quantity <= 500) return (quantity * 6).toLocaleString();
                                                            if (quantity <= 1000) return (quantity * 5).toLocaleString();
                                                            return (quantity * 4).toLocaleString();
                                                        })()}
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        ₹{(() => {
                                                            if (quantity <= 100) return '8.00';
                                                            if (quantity <= 500) return '6.00';
                                                            if (quantity <= 1000) return '5.00';
                                                            return '4.00';
                                                        })()} per letterpad
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Contact Information */}
                                        <div className="bg-orange-50 p-3 rounded border border-orange-200">
                                            <div className="text-sm font-medium text-orange-800 mb-2">📞 Get Detailed Quote</div>
                                            <div className="text-sm text-orange-700">
                                                Call us at <span className="font-semibold">+91 79798 31185</span> or email
                                                <span className="font-semibold"> rudra.org1@gmail.com</span> for custom pricing on large orders.
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* A4 Preview Container */}
                                <div className="flex justify-start">
                                    <div
                                        ref={letterPadRef}
                                        className="bg-gray-50 shadow-lg border border-gray-200 relative"
                                        style={{
                                            width: '595px', // A4 width in pixels at 72 DPI (8.27 inches)
                                            minHeight: '842px', // A4 height in pixels at 72 DPI (11.7 inches)
                                            ...getLetterPadTemplateStyle(letterPadData.template, letterPadData),
                                            padding: '60px',
                                            fontFamily: '"Proxima Nova", Arial, sans-serif',
                                            fontSize: '14px',
                                            lineHeight: '1.6',
                                            backgroundColor: '#f8f8f8'
                                        }}
                                        onMouseMove={handleLetterPadMouseMove}
                                        onMouseUp={handleLetterPadMouseUp}
                                        onMouseLeave={handleLetterPadMouseUp}
                                        onClick={() => setSelectedLetterPadElement(null)}
                                    >
                                        {/* Visual padding container for default positioning */}
                                        <div className="absolute inset-0 p-16 pointer-events-none" />

                                        {/* Custom Elements */}
                                        {letterPadElements.map((element) => (
                                            <div
                                                key={element.id}
                                                className={`absolute select-none transition-all duration-200 ${selectedLetterPadElement === element.id ? 'ring-2 ring-blue-500 z-10' : 'z-0'
                                                    } ${isDraggingLetterPad && selectedLetterPadElement === element.id
                                                        ? 'opacity-75 cursor-grabbing scale-105'
                                                        : selectedLetterPadElement === element.id
                                                            ? 'cursor-grab hover:shadow-lg'
                                                            : 'cursor-grab hover:shadow-sm hover:scale-105'
                                                    }`}
                                                style={{
                                                    left: `${element.position.x}px`,
                                                    top: `${element.position.y}px`,
                                                    width: `${element.size.width}px`,
                                                    height: `${element.size.height}px`,
                                                }}
                                                onMouseDown={(e) => {
                                                    if (element.type === 'logo' && element.id === 'logo_placeholder' && !element.imageData) {
                                                        // Handle logo upload
                                                        const fileInput = document.createElement('input');
                                                        fileInput.type = 'file';
                                                        fileInput.accept = 'image/*';
                                                        fileInput.onchange = (event) => {
                                                            const file = (event.target as HTMLInputElement).files?.[0];
                                                            if (file) {
                                                                const reader = new FileReader();
                                                                reader.onload = (e) => {
                                                                    const imageData = e.target?.result as string;
                                                                    setLetterPadElements(prev =>
                                                                        prev.map(el =>
                                                                            el.id === 'logo_placeholder'
                                                                                ? {
                                                                                    ...el,
                                                                                    type: 'image',
                                                                                    content: file.name,
                                                                                    imageData: imageData,
                                                                                    style: { borderRadius: '4px' }
                                                                                }
                                                                                : el
                                                                        )
                                                                    );
                                                                };
                                                                reader.readAsDataURL(file);
                                                            }
                                                        };
                                                        fileInput.click();
                                                    } else {
                                                        handleLetterPadMouseDown(e, element);
                                                    }
                                                }}
                                                onClick={(e) => handleLetterPadElementClick(e, element)}
                                            >
                                                {renderLetterPadElement(element)}

                                                {selectedLetterPadElement === element.id && (
                                                    <>
                                                        {/* Delete button */}
                                                        <button
                                                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs opacity-90 hover:opacity-100 transition-opacity z-30 flex items-center justify-center cursor-pointer shadow-lg"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                e.stopPropagation();
                                                                if (element.id === 'logo_placeholder') {
                                                                    // Reset logo to placeholder
                                                                    setLetterPadElements(prev =>
                                                                        prev.map(el =>
                                                                            el.id === 'logo_placeholder'
                                                                                ? {
                                                                                    ...el,
                                                                                    type: 'logo',
                                                                                    content: 'LOGO',
                                                                                    imageData: undefined,
                                                                                    style: {
                                                                                        fontSize: 12,
                                                                                        color: letterPadData.accentColor,
                                                                                        border: `2px solid ${letterPadData.accentColor}`,
                                                                                        textAlign: 'center',
                                                                                        lineHeight: '76px',
                                                                                        backgroundColor: letterPadData.accentColor + '10'
                                                                                    }
                                                                                }
                                                                                : el
                                                                        )
                                                                    );
                                                                } else {
                                                                    setLetterPadElements(prev => prev.filter(el => el.id !== element.id));
                                                                }
                                                                setSelectedLetterPadElement(null);
                                                            }}
                                                        >
                                                            ×
                                                        </button>
                                                        {/* Done button */}
                                                        <button
                                                            className="absolute -top-2 -left-2 w-6 h-6 bg-green-500 text-white rounded-full text-xs opacity-90 hover:opacity-100 transition-opacity z-30 flex items-center justify-center cursor-pointer shadow-lg"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                e.stopPropagation();
                                                                setSelectedLetterPadElement(null);
                                                            }}
                                                        >
                                                            ✓
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeProductTab === 'tshirt' && (
                    <div className="flex-1 flex overflow-hidden">
                        {/* Left Panel - Templates */}
                        <div className="w-80 bg-white border-r border-gray-200 p-4 overflow-y-auto">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Choose T-Shirt Template</h3>

                            <div className="space-y-3">
                                {[
                                    {
                                        id: 'white',
                                        name: 'White T-Shirt',
                                        frontImage: whiteFrontImg,
                                        backImage: whiteBackImg,
                                        color: '#ffffff'
                                    },
                                    {
                                        id: 'red',
                                        name: 'Red T-Shirt',
                                        frontImage: redFrontImg,
                                        backImage: redBackImg,
                                        color: '#dc2626'
                                    }
                                ].map((template) => (
                                    <button
                                        key={template.id}
                                        onClick={() => setSelectedTshirtTemplate(template.id)}
                                        className={`group relative overflow-hidden rounded-lg border-2 transition-all duration-300 w-full transform hover:scale-105 ${selectedTshirtTemplate === template.id
                                            ? 'border-blue-500 shadow-xl ring-2 ring-blue-200 scale-105'
                                            : 'border-gray-200 hover:border-blue-300 hover:shadow-lg'
                                            }`}
                                        style={{ aspectRatio: '1/1.2' }} // T-shirt ratio
                                    >
                                        <div className="w-full h-full p-3">
                                            <div className="w-full h-full rounded-md relative overflow-hidden bg-white">
                                                {/* Realistic T-Shirt Shape using actual image - Full Size */}
                                                <img
                                                    src={template.frontImage}
                                                    alt={`${template.name} Template`}
                                                    className="w-full h-full object-cover rounded-md"
                                                />
                                            </div>
                                        </div>
                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                                            <div className="text-white text-xs font-semibold truncate">{template.name}</div>
                                        </div>
                                        {selectedTshirtTemplate === template.id && (
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
                                        onClick={() => {
                                            // Reset to default state with logo placeholder on front
                                            setTshirtElements([
                                                {
                                                    id: 'logo_placeholder_front',
                                                    type: 'logo',
                                                    content: 'LOGO',
                                                    position: { x: 120, y: 180 },
                                                    size: { width: 60, height: 60 },
                                                    style: {
                                                        fontSize: 10,
                                                        fontWeight: 'bold',
                                                        color: '#666666',
                                                        textAlign: 'center',
                                                        backgroundColor: '#f3f4f6',
                                                        border: '2px dashed #d1d5db'
                                                    },
                                                    side: 'front'
                                                }
                                            ]);
                                            setSelectedTshirtElement(null);
                                            setCurrentView('front'); // Switch to front view
                                        }}
                                        className="px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 transition-colors"
                                    >
                                        Reset to Default
                                    </button>
                                </div>

                                {/* Quick Add Default Elements */}
                                <div className="mb-4">
                                    <h4 className="text-xs font-medium text-gray-600 mb-2">Quick Add</h4>

                                    {/* Logo Upload */}
                                    <div className="mb-3">
                                        <input
                                            type="file"
                                            id="tshirt-logo-upload"
                                            accept="image/*"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    const reader = new FileReader();
                                                    reader.onload = (e) => {
                                                        // Find logo for current view
                                                        const logoElement = tshirtElements.find(el =>
                                                            el.type === 'logo' && el.side === currentView
                                                        );

                                                        if (logoElement) {
                                                            // Update existing logo
                                                            const updatedElement = {
                                                                ...logoElement,
                                                                imageData: e.target?.result as string,
                                                                content: 'Logo',
                                                                style: {
                                                                    ...logoElement.style,
                                                                    backgroundColor: 'transparent',
                                                                    border: 'none'
                                                                }
                                                            };
                                                            setTshirtElements(prev =>
                                                                prev.map(el => el.id === logoElement.id ? updatedElement : el)
                                                            );
                                                        } else {
                                                            // Create new logo for current view
                                                            const newLogoElement: CardElement = {
                                                                id: `logo_placeholder_${currentView}`,
                                                                type: 'logo',
                                                                content: 'Logo',
                                                                position: { x: currentView === 'front' ? 120 : 200, y: currentView === 'front' ? 180 : 220 },
                                                                size: { width: 60, height: 60 },
                                                                style: {
                                                                    fontSize: 10,
                                                                    fontWeight: 'bold',
                                                                    color: '#000000',
                                                                    textAlign: 'center'
                                                                },
                                                                side: currentView,
                                                                imageData: e.target?.result as string
                                                            };
                                                            setTshirtElements(prev => [...prev, newLogoElement]);
                                                        }
                                                    };
                                                    reader.readAsDataURL(file);
                                                }
                                            }}
                                            className="hidden"
                                        />
                                        <label
                                            htmlFor="tshirt-logo-upload"
                                            className="w-full px-3 py-2 bg-blue-500 text-white rounded-md text-sm cursor-pointer hover:bg-blue-600 transition-colors flex items-center justify-center"
                                        >
                                            📁 Upload Logo
                                        </label>
                                    </div>

                                    <select
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (value) {
                                                const newElement: CardElement = {
                                                    id: value === 'logo' ? `logo_placeholder_${currentView}` : `element_${Date.now()}`,
                                                    type: value === 'text' ? 'text' : value === 'logo' ? 'logo' : 'image',
                                                    content: value === 'text' ? 'Sample Text' : value === 'logo' ? 'LOGO' : 'Design',
                                                    position: {
                                                        x: value === 'logo' ? (currentView === 'front' ? 120 : 200) : value === 'text' ? 150 : 180,
                                                        y: value === 'logo' ? (currentView === 'front' ? 180 : 220) : value === 'text' ? 300 : 280
                                                    },
                                                    size: {
                                                        width: value === 'logo' ? 60 : value === 'text' ? 150 : 80,
                                                        height: value === 'logo' ? 60 : value === 'text' ? 30 : 60
                                                    },
                                                    style: {
                                                        fontSize: value === 'logo' ? 10 : value === 'text' ? 20 : 10,
                                                        color: value === 'logo' ? '#666666' : '#000000',
                                                        fontWeight: value === 'text' ? 'bold' : value === 'logo' ? 'bold' : 'normal',
                                                        textAlign: 'center',
                                                        backgroundColor: value === 'logo' ? '#f3f4f6' : undefined,
                                                        border: value === 'logo' ? '2px dashed #d1d5db' : undefined
                                                    },
                                                    side: currentView
                                                };
                                                setTshirtElements(prev => [...prev, newElement]);
                                                e.target.value = '';
                                            }
                                        }}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Add Element...</option>
                                        <option value="logo">Logo</option>
                                        <option value="text">Text</option>
                                        <option value="image">Design</option>
                                    </select>
                                </div>

                                {/* Element List */}
                                <div className="space-y-2 max-h-40 overflow-y-auto">
                                    <h4 className="text-xs font-medium text-gray-600 mb-2">
                                        Current Elements ({tshirtElements.filter(el => el.side === currentView).length}) - {currentView === 'front' ? 'Front' : 'Back'} Side
                                    </h4>
                                    {tshirtElements.filter(el => el.side === currentView).map((element) => (
                                        <div
                                            key={element.id}
                                            className={`p-2 border rounded cursor-pointer transition-colors ${selectedTshirtElement === element.id
                                                ? 'border-blue-500 bg-blue-50'
                                                : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                            onClick={() => setSelectedTshirtElement(element.id)}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-2">
                                                    {/* Status indicator */}
                                                    <div className="flex items-center">
                                                        {element.imageData || (element.type === 'text' && element.content !== 'Sample Text' && element.content !== 'LOGO') ? (
                                                            <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                                                                <span className="text-white text-xs">✓</span>
                                                            </div>
                                                        ) : (
                                                            <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                                                        )}
                                                    </div>
                                                    <span className="text-xs px-2 py-1 bg-gray-100 rounded">
                                                        {element.type}
                                                    </span>
                                                    <span className="text-xs text-gray-600 truncate flex-1">
                                                        {element.content}
                                                    </span>
                                                </div>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setTshirtElements(prev => prev.filter(el => el.id !== element.id));
                                                        if (selectedTshirtElement === element.id) {
                                                            setSelectedTshirtElement(null);
                                                        }
                                                    }}
                                                    className="text-red-500 hover:text-red-700 text-xs ml-2 p-1 hover:bg-red-50 rounded"
                                                    title="Delete element"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        </div>
                                    ))}

                                    {/* Show message when no elements on current side */}
                                    {tshirtElements.filter(el => el.side === currentView).length === 0 && (
                                        <div className="text-center text-gray-400 text-xs py-4 border-2 border-dashed border-gray-200 rounded">
                                            No elements on {currentView} side
                                            <br />
                                            Add elements using the options above
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Element Controls */}
                            {selectedTshirtElement && (() => {
                                const element = tshirtElements.find(el => el.id === selectedTshirtElement);
                                return element ? (
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <h3 className="text-sm font-semibold text-gray-800">Edit Element</h3>
                                            <button
                                                onClick={() => setSelectedTshirtElement(null)}
                                                className="px-3 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600 transition-colors flex items-center"
                                                title="Done editing"
                                            >
                                                <span className="mr-1">✓</span>
                                                Done
                                            </button>
                                        </div>

                                        {/* Position Controls */}
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-xs text-gray-600 mb-1">X Position: {element.position.x}px</label>
                                                <input
                                                    type="range"
                                                    value={element.position.x}
                                                    onChange={(e) => {
                                                        setTshirtElements(prev =>
                                                            prev.map(el =>
                                                                el.id === element.id
                                                                    ? { ...el, position: { ...el.position, x: parseInt(e.target.value) } }
                                                                    : el
                                                            )
                                                        );
                                                    }}
                                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                                    min="0"
                                                    max="350"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs text-gray-600 mb-1">Y Position: {element.position.y}px</label>
                                                <input
                                                    type="range"
                                                    value={element.position.y}
                                                    onChange={(e) => {
                                                        setTshirtElements(prev =>
                                                            prev.map(el =>
                                                                el.id === element.id
                                                                    ? { ...el, position: { ...el.position, y: parseInt(e.target.value) } }
                                                                    : el
                                                            )
                                                        );
                                                    }}
                                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                                    min="0"
                                                    max="450"
                                                />
                                            </div>
                                        </div>

                                        {/* Size Controls */}
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-xs text-gray-600 mb-1">Width: {element.size.width}px</label>
                                                <input
                                                    type="range"
                                                    value={element.size.width}
                                                    onChange={(e) => {
                                                        setTshirtElements(prev =>
                                                            prev.map(el =>
                                                                el.id === element.id
                                                                    ? { ...el, size: { ...el.size, width: parseInt(e.target.value) } }
                                                                    : el
                                                            )
                                                        );
                                                    }}
                                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                                    min="50"
                                                    max="400"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs text-gray-600 mb-1">Height: {element.size.height}px</label>
                                                <input
                                                    type="range"
                                                    value={element.size.height}
                                                    onChange={(e) => {
                                                        setTshirtElements(prev =>
                                                            prev.map(el =>
                                                                el.id === element.id
                                                                    ? { ...el, size: { ...el.size, height: parseInt(e.target.value) } }
                                                                    : el
                                                            )
                                                        );
                                                    }}
                                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                                    min="20"
                                                    max="300"
                                                />
                                            </div>
                                        </div>

                                        {/* Overall Size Slider */}
                                        <div className="border-t pt-4">
                                            <label className="block text-xs text-gray-600 mb-2">Overall Size: {Math.round((element.size.width + element.size.height) / 2)}px</label>
                                            <input
                                                type="range"
                                                value={Math.round((element.size.width + element.size.height) / 2)}
                                                onChange={(e) => {
                                                    const newSize = parseInt(e.target.value);
                                                    const ratio = element.size.width / element.size.height;
                                                    const newHeight = newSize;
                                                    const newWidth = newSize * ratio;

                                                    setTshirtElements(prev =>
                                                        prev.map(el =>
                                                            el.id === element.id
                                                                ? {
                                                                    ...el,
                                                                    size: {
                                                                        width: Math.max(20, Math.min(400, newWidth)),
                                                                        height: Math.max(20, Math.min(300, newHeight))
                                                                    }
                                                                }
                                                                : el
                                                        )
                                                    );
                                                }}
                                                className="w-full h-3 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                                                min="30"
                                                max="200"
                                            />
                                            <div className="flex justify-between text-xs text-gray-400 mt-1">
                                                <span>Small</span>
                                                <span>Large</span>
                                            </div>
                                        </div>

                                        {element.type === 'text' && (
                                            <>
                                                <div>
                                                    <label className="block text-xs text-gray-600 mb-1">Font Size: {element.style.fontSize || 14}px</label>
                                                    <input
                                                        type="range"
                                                        value={element.style.fontSize || 14}
                                                        onChange={(e) => {
                                                            setTshirtElements(prev =>
                                                                prev.map(el =>
                                                                    el.id === element.id
                                                                        ? { ...el, style: { ...el.style, fontSize: parseInt(e.target.value) } }
                                                                        : el
                                                                )
                                                            );
                                                        }}
                                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                                        min="8"
                                                        max="72"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-xs text-gray-600 mb-1">Color</label>
                                                    <input
                                                        type="color"
                                                        value={element.style.color || '#000000'}
                                                        onChange={(e) => {
                                                            setTshirtElements(prev =>
                                                                prev.map(el =>
                                                                    el.id === element.id
                                                                        ? { ...el, style: { ...el.style, color: e.target.value } }
                                                                        : el
                                                                )
                                                            );
                                                        }}
                                                        className="w-full h-10 border border-gray-300 rounded cursor-pointer"
                                                    />
                                                </div>

                                                <div className="grid grid-cols-3 gap-2">
                                                    <button
                                                        onClick={() => {
                                                            setTshirtElements(prev =>
                                                                prev.map(el =>
                                                                    el.id === element.id
                                                                        ? { ...el, style: { ...el.style, fontWeight: el.style.fontWeight === 'bold' ? 'normal' : 'bold' } }
                                                                        : el
                                                                )
                                                            );
                                                        }}
                                                        className={`px-3 py-1 text-xs rounded border transition-colors ${element.style.fontWeight === 'bold'
                                                            ? 'bg-blue-500 text-white border-blue-500'
                                                            : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                                                            }`}
                                                    >
                                                        Bold
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setTshirtElements(prev =>
                                                                prev.map(el =>
                                                                    el.id === element.id
                                                                        ? { ...el, style: { ...el.style, fontStyle: el.style.fontStyle === 'italic' ? 'normal' : 'italic' } }
                                                                        : el
                                                                )
                                                            );
                                                        }}
                                                        className={`px-3 py-1 text-xs rounded border transition-colors ${element.style.fontStyle === 'italic'
                                                            ? 'bg-blue-500 text-white border-blue-500'
                                                            : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                                                            }`}
                                                    >
                                                        Italic
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setTshirtElements(prev =>
                                                                prev.map(el =>
                                                                    el.id === element.id
                                                                        ? { ...el, style: { ...el.style, textDecoration: el.style.textDecoration === 'underline' ? 'none' : 'underline' } }
                                                                        : el
                                                                )
                                                            );
                                                        }}
                                                        className={`px-3 py-1 text-xs rounded border transition-colors ${element.style.textDecoration === 'underline'
                                                            ? 'bg-blue-500 text-white border-blue-500'
                                                            : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                                                            }`}
                                                    >
                                                        U
                                                    </button>
                                                </div>
                                            </>
                                        )}

                                        {(element.type === 'logo' || element.type === 'image') && (
                                            <div>
                                                <label className="block text-xs text-gray-600 mb-1">Upload Image</label>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => {
                                                        const file = e.target.files?.[0];
                                                        if (file) {
                                                            const reader = new FileReader();
                                                            reader.onload = (e) => {
                                                                setTshirtElements(prev =>
                                                                    prev.map(el =>
                                                                        el.id === element.id
                                                                            ? { ...el, imageData: e.target?.result as string }
                                                                            : el
                                                                    )
                                                                );
                                                            };
                                                            reader.readAsDataURL(file);
                                                        }
                                                    }}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            </div>
                                        )}
                                    </div>
                                ) : null;
                            })()}
                        </div>

                        {/* Right Panel - Preview */}
                        <div className="flex-1 bg-gray-50 p-6 overflow-auto">
                            <div className="max-w-4xl mx-auto">
                                {/* Header with title and buttons */}
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-xl font-bold text-gray-800">T-Shirt Preview</h3>

                                    {/* Action Buttons */}
                                    <div className="flex space-x-3">
                                        <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center text-sm shadow-md">
                                            <span className="mr-2">📥</span>
                                            Download
                                        </button>
                                        <button
                                            onClick={() => setShowQuote(!showQuote)}
                                            className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center text-sm shadow-md"
                                        >
                                            <span className="mr-2">💰</span>
                                            Get Quote
                                        </button>
                                    </div>
                                </div>



                                {/* Pricing Section - Above preview */}
                                {showQuote && (
                                    <div className="mb-6 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                                        <h4 className="text-lg font-semibold text-gray-800 mb-4">Get Your Quote - T-Shirts</h4>

                                        {/* Horizontal Layout for Quantity and Pricing */}
                                        <div className="grid grid-cols-2 gap-4 mb-4">
                                            {/* Left: Quantity Controls */}
                                            <div>
                                                <div className="flex items-center space-x-3 mb-3">
                                                    <label className="text-sm font-medium text-gray-700 min-w-fit">Quantity:</label>
                                                    <input
                                                        type="number"
                                                        value={customQuantity || quantity}
                                                        onChange={(e) => {
                                                            const value = e.target.value;
                                                            setCustomQuantity(value);
                                                            if (value) {
                                                                setQuantity(parseInt(value) || 100);
                                                            }
                                                        }}
                                                        className="w-20 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                                        placeholder="50"
                                                        min="1"
                                                    />
                                                </div>

                                                {/* Quick Quantity Buttons */}
                                                <div className="grid grid-cols-3 gap-2">
                                                    {[50, 100, 250, 500, 1000, 2000].map((qty) => (
                                                        <button
                                                            key={qty}
                                                            onClick={() => {
                                                                setQuantity(qty);
                                                                setCustomQuantity('');
                                                            }}
                                                            className={`px-3 py-1 text-xs rounded border transition-colors ${quantity === qty && !customQuantity
                                                                ? 'bg-orange-500 text-white border-orange-500'
                                                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                                                }`}
                                                        >
                                                            {qty}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Right: Pricing Display */}
                                            <div>
                                                <div className="bg-gray-50 p-3 rounded border">
                                                    <div className="text-sm text-gray-600 mb-2">Estimated Price</div>
                                                    <div className="text-2xl font-bold text-orange-600">
                                                        ₹{((quantity * 45) + 150).toLocaleString()}
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        ₹45 per T-shirt + ₹150 setup
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Download Options */}
                                        <div className="border-t pt-4 mt-4">
                                            <h5 className="text-sm font-semibold text-gray-700 mb-3">Download Options</h5>
                                            <div className="grid grid-cols-2 gap-3">
                                                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm flex items-center justify-center">
                                                    <span className="mr-2">📄</span>
                                                    Download PDF
                                                </button>
                                                <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm flex items-center justify-center">
                                                    <span className="mr-2">🖼️</span>
                                                    Download PNG
                                                </button>
                                            </div>
                                        </div>

                                        {/* Contact Information */}
                                        <div className="border-t pt-4 mt-4">
                                            <div className="bg-orange-50 p-3 rounded border border-orange-200">
                                                <div className="text-sm font-medium text-orange-800 mb-2">📞 Get Detailed Quote</div>
                                                <div className="text-sm text-orange-700">
                                                    Call us at <span className="font-semibold">+91 79798 31185</span> or email
                                                    <span className="font-semibold"> rudra.org1@gmail.com</span> for custom pricing on T-shirt orders.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="text-center mb-4">
                                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                                        Premium Cotton T-Shirt
                                    </span>
                                </div>

                                {/* Front/Back Toggle */}
                                <div className="mb-6 flex justify-center">
                                    <div className="flex bg-gray-100 rounded-lg p-1">
                                        <button
                                            onClick={() => setCurrentView('front')}
                                            className={`px-6 py-2 rounded-md transition-all text-sm ${currentView === 'front'
                                                ? 'bg-blue-500 text-white shadow-md'
                                                : 'text-gray-600 hover:bg-white'
                                                }`}
                                        >
                                            Front
                                        </button>
                                        <button
                                            onClick={() => setCurrentView('back')}
                                            className={`px-6 py-2 rounded-md transition-all text-sm ${currentView === 'back'
                                                ? 'bg-blue-500 text-white shadow-md'
                                                : 'text-gray-600 hover:bg-white'
                                                }`}
                                        >
                                            Back
                                        </button>
                                    </div>
                                </div>

                                {/* T-Shirt Preview */}
                                <div className="flex justify-center overflow-hidden">
                                    <div className="relative">
                                        {/* Zoom Controls - Positioned in upper right */}
                                        <div className="absolute top-4 right-4 z-30 flex items-center space-x-2 bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-lg border border-gray-200">
                                            <button
                                                onClick={() => setTshirtZoom(prev => Math.max(0.7, prev - 0.14))}
                                                className="w-7 h-7 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
                                                title="Zoom Out"
                                            >
                                                <span className="text-sm font-bold">-</span>
                                            </button>
                                            <span className="text-xs font-medium min-w-[40px] text-center text-gray-700">
                                                {Math.round((tshirtZoom / 1.4) * 100)}%
                                            </span>
                                            <button
                                                onClick={() => setTshirtZoom(prev => Math.min(2.8, prev + 0.14))}
                                                className="w-7 h-7 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
                                                title="Zoom In"
                                            >
                                                <span className="text-sm font-bold">+</span>
                                            </button>
                                            <button
                                                onClick={() => setTshirtZoom(1.4)}
                                                className="px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-xs transition-colors"
                                                title="Reset Zoom"
                                            >
                                                1:1
                                            </button>
                                        </div>

                                        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 overflow-hidden" style={{ transform: `scale(${tshirtZoom})`, transformOrigin: 'center', transition: 'transform 0.2s ease' }}>
                                            <div
                                                ref={tshirtRef}
                                                className="relative mx-auto bg-white rounded-lg overflow-hidden cursor-default"
                                                style={{
                                                    width: '500px',
                                                    height: '600px',
                                                }}
                                                onMouseMove={handleTshirtMouseMove}
                                                onMouseUp={handleTshirtMouseUp}
                                                onMouseLeave={handleTshirtMouseUp}
                                            >
                                                {/* T-Shirt Background using actual image */}
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="relative w-full h-full flex items-center justify-center">
                                                        <img
                                                            src={currentView === 'front'
                                                                ? (selectedTshirtTemplate === 'red' ? redFrontImg : whiteFrontImg)
                                                                : (selectedTshirtTemplate === 'red' ? redBackImg : whiteBackImg)
                                                            }
                                                            alt="T-Shirt Template"
                                                            className="max-w-full max-h-full object-contain"
                                                            style={{
                                                                width: 'auto',
                                                                height: 'auto',
                                                                maxWidth: '450px',
                                                                maxHeight: '550px'
                                                            }}
                                                        />
                                                    </div>
                                                </div>

                                                {/* Editable Elements */}
                                                {tshirtElements
                                                    .filter(element => element.side === currentView)
                                                    .map((element) => (
                                                        <div
                                                            key={element.id}
                                                            className={`absolute group transition-all duration-200 ${selectedTshirtElement === element.id
                                                                ? 'ring-2 ring-blue-400 ring-offset-1 shadow-lg'
                                                                : 'hover:ring-1 hover:ring-blue-200'
                                                                }`}
                                                            style={{
                                                                left: `${element.position.x}px`,
                                                                top: `${element.position.y}px`,
                                                                width: `${element.size.width}px`,
                                                                height: `${element.size.height}px`,
                                                                zIndex: selectedTshirtElement === element.id ? 20 : 10,
                                                                cursor: isDraggingTshirt ? 'grabbing' : 'grab'
                                                            }}
                                                            onMouseDown={(e) => {
                                                                if (!isDraggingTshirt) {
                                                                    handleTshirtMouseDown(e, element);
                                                                }
                                                            }}
                                                            onClick={(e) => handleTshirtElementClick(e, element)}
                                                        >
                                                            {renderTshirtElement(element)}

                                                            {/* Selection outline when hovered or selected */}
                                                            {(selectedTshirtElement === element.id || element.id === 'logo_placeholder') && (
                                                                <div className="absolute inset-0 border-2 border-dashed border-blue-400 opacity-50 pointer-events-none"></div>
                                                            )}

                                                            {selectedTshirtElement === element.id && (
                                                                <>
                                                                    {/* Done button (Green checkmark) */}
                                                                    <button
                                                                        className="absolute -top-3 -left-3 w-7 h-7 bg-green-500 text-white rounded-full text-sm font-bold hover:bg-green-600 transition-all duration-200 z-30 flex items-center justify-center cursor-pointer shadow-lg hover:scale-110"
                                                                        onClick={(e) => {
                                                                            e.preventDefault();
                                                                            e.stopPropagation();
                                                                            setSelectedTshirtElement(null);
                                                                        }}
                                                                        title="Done editing"
                                                                    >
                                                                        ✓
                                                                    </button>

                                                                    {/* Delete button */}
                                                                    <button
                                                                        className="absolute -top-3 -right-3 w-7 h-7 bg-red-500 text-white rounded-full text-sm font-bold hover:bg-red-600 transition-all duration-200 z-30 flex items-center justify-center cursor-pointer shadow-lg hover:scale-110"
                                                                        onClick={(e) => {
                                                                            e.preventDefault();
                                                                            e.stopPropagation();
                                                                            // Remove any element including logo placeholder
                                                                            setTshirtElements(prev => prev.filter(el => el.id !== element.id));
                                                                            setSelectedTshirtElement(null);
                                                                        }}
                                                                        title="Delete element"
                                                                    >
                                                                        ×
                                                                    </button>

                                                                    {/* Corner resize handles with better visibility */}
                                                                    <div
                                                                        className="absolute -top-2 -left-2 w-4 h-4 bg-blue-500 border-2 border-white rounded-full cursor-nw-resize hover:bg-blue-600 hover:scale-125 transition-all duration-200 shadow-md"
                                                                        title="Resize corner"
                                                                    ></div>
                                                                    <div
                                                                        className="absolute -top-2 -right-2 w-4 h-4 bg-blue-500 border-2 border-white rounded-full cursor-ne-resize hover:bg-blue-600 hover:scale-125 transition-all duration-200 shadow-md"
                                                                        title="Resize corner"
                                                                    ></div>
                                                                    <div
                                                                        className="absolute -bottom-2 -left-2 w-4 h-4 bg-blue-500 border-2 border-white rounded-full cursor-sw-resize hover:bg-blue-600 hover:scale-125 transition-all duration-200 shadow-md"
                                                                        title="Resize corner"
                                                                    ></div>
                                                                    <div
                                                                        className="absolute -bottom-2 -right-2 w-4 h-4 bg-blue-500 border-2 border-white rounded-full cursor-se-resize hover:bg-blue-600 hover:scale-125 transition-all duration-200 shadow-md"
                                                                        title="Resize corner"
                                                                    ></div>

                                                                    {/* Side resize handles */}
                                                                    <div
                                                                        className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-green-500 border-2 border-white rounded-full cursor-n-resize hover:bg-green-600 hover:scale-125 transition-all duration-200 shadow-md"
                                                                        title="Resize height"
                                                                    ></div>
                                                                    <div
                                                                        className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-green-500 border-2 border-white rounded-full cursor-s-resize hover:bg-green-600 hover:scale-125 transition-all duration-200 shadow-md"
                                                                        title="Resize height"
                                                                    ></div>
                                                                    <div
                                                                        className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-green-500 border-2 border-white rounded-full cursor-w-resize hover:bg-green-600 hover:scale-125 transition-all duration-200 shadow-md"
                                                                        title="Resize width"
                                                                    ></div>
                                                                    <div
                                                                        className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-green-500 border-2 border-white rounded-full cursor-e-resize hover:bg-green-600 hover:scale-125 transition-all duration-200 shadow-md"
                                                                        title="Resize width"
                                                                    ></div>

                                                                    {/* Center move handle */}
                                                                    <div
                                                                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-yellow-500 border-2 border-white rounded-full cursor-move hover:bg-yellow-600 hover:scale-110 transition-all duration-200 shadow-md flex items-center justify-center"
                                                                        title="Move element"
                                                                    >
                                                                        <div className="w-2 h-2 bg-white rounded-full"></div>
                                                                    </div>
                                                                </>
                                                            )}
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeProductTab === 'merchandise' && (
                    <div className="flex-1 flex overflow-hidden">
                        {/* Left Panel - Templates */}
                        <div className="w-80 bg-white border-r border-gray-200 p-4 overflow-y-auto">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Choose Merchandise Template</h3>
                            <div className="space-y-3">
                                <div className="p-8 border-2 border-dashed border-gray-300 rounded-lg text-center text-gray-500">
                                    <div className="text-4xl mb-2">🎁</div>
                                    <p className="text-sm">Merchandise templates</p>
                                    <p className="text-xs">Coming soon...</p>
                                </div>
                            </div>
                        </div>

                        {/* Center Panel - Controls */}
                        <div className="w-80 bg-white border-r border-gray-200 p-4 overflow-y-auto">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Merchandise Controls</h3>
                            <div className="space-y-4">
                                <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg text-center text-gray-500">
                                    <div className="text-3xl mb-2">⚡</div>
                                    <p className="text-sm">Customization tools</p>
                                    <p className="text-xs">Coming soon...</p>
                                </div>
                            </div>
                        </div>

                        {/* Right Panel - Preview */}
                        <div className="flex-1 bg-gray-50 p-6 flex items-center justify-center">
                            <div className="max-w-md w-full">
                                <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-gray-200">
                                    <div className="h-80 flex flex-col items-center justify-center text-gray-400">
                                        <div className="text-6xl mb-4">🎁</div>
                                        <h3 className="text-xl font-semibold mb-2">Merchandise Preview</h3>
                                        <p className="text-center">Your custom merchandise design will appear here</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VisitingCardDesigner;
