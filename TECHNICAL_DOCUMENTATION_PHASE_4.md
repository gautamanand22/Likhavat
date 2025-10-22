# Likhavat Printing Press - Technical Documentation
## Phase 4: Advanced Features & Business Logic

---

## Table of Contents
1. Phase 1: Project Overview & Technology Stack ✅
2. Phase 2: Project Architecture & File Structure ✅
3. Phase 3: Core Components Deep Dive ✅
4. **Phase 4: Advanced Features & Business Logic** (This Document)
5. Phase 5: Styling, Performance & Deployment

---

## Introduction

This phase explores the **most complex feature** of the application: the **Visiting Card Designer**. This is a full-featured design tool built entirely in React with:
- 4000+ lines of code
- Drag-and-drop functionality
- Multiple product types (cards, letter pads, t-shirts)
- 18 pre-designed templates
- Real-time preview
- Dynamic pricing calculator
- Element management system
- Image upload & processing

This documentation breaks down every aspect to help you understand professional-level React development.

---

## 1. Component Overview

### 1.1 File Statistics

**File:** `/src/components/VisitingCardDesigner.tsx`
- **Lines of Code:** 4,286 lines
- **Main Component:** `VisitingCardDesigner`
- **TypeScript Interfaces:** 4 (CardData, LetterPadData, TShirtData, CardElement)
- **State Variables:** 25+
- **Functions:** 30+
- **Templates:** 18 unique designs

---

### 1.2 What This Component Does

The VisitingCardDesigner is a **WYSIWYG (What You See Is What You Get)** editor that allows users to:

1. **Choose Templates** - Select from 18 pre-designed card styles
2. **Edit Content** - Modify name, title, company, contact info
3. **Add Elements** - Insert text, QR codes, logos, images
4. **Drag & Drop** - Move elements around the card
5. **Customize Colors** - Change background, text, and accent colors
6. **Switch Views** - Toggle between front and back of card
7. **Real-Time Preview** - See changes instantly
8. **Calculate Pricing** - Get quotes based on quantity
9. **Download/Print** - Export the finished design

---

## 2. TypeScript Interfaces

### 2.1 CardData Interface

```tsx
interface CardData {
    name: string;           // Person's name
    title: string;          // Job title
    company: string;        // Company name
    phone: string;          // Phone number
    email: string;          // Email address
    address: string;        // Physical address
    website: string;        // Website URL
    bgColor: string;        // Background color (hex)
    textColor: string;      // Text color (hex)
    accentColor: string;    // Accent color (hex)
    template: 'modern' | 'classic' | 'minimal' | ... ; // Template type (18 options)
    cornerStyle: 'normal' | 'rounded' | 'sharp' | 'circular'; // Corner style
}
```

**Purpose:** Stores all the data for a visiting card.

**Example Data:**
```tsx
{
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
}
```

---

### 2.2 CardElement Interface

```tsx
interface CardElement {
    id: string;                         // Unique identifier
    type: 'text' | 'qr' | 'logo' | 'icon' | 'shape' | 'image' | 'line';
    content: string;                    // Element content
    position: { x: number; y: number }; // Position on card (pixels)
    size: { width: number; height: number }; // Dimensions
    style: any;                         // CSS styling
    side: 'front' | 'back';            // Which side of card
    imageData?: string;                 // Base64 image data (optional)
}
```

**Purpose:** Represents any element placed on the card (text, image, QR code, etc.)

**Example Element:**
```tsx
{
    id: 'name',
    type: 'text',
    content: 'John Doe',
    position: { x: 24, y: 24 },
    size: { width: 200, height: 24 },
    style: { fontSize: 18, fontWeight: 'bold', color: '#333333' },
    side: 'front'
}
```

---

### 2.3 LetterPadData Interface

```tsx
interface LetterPadData {
    companyName: string;    // Company name
    address: string;        // Business address
    phone: string;          // Phone number
    email: string;          // Email address
    website: string;        // Website URL
    fax: string;           // Fax number
    bgColor: string;        // Background color
    textColor: string;      // Text color
    accentColor: string;    // Accent color
    template: 'corporate' | 'modern' | 'classic' | 'minimal' | 'professional';
}
```

**Purpose:** Stores data for letter pad designs.

---

### 2.4 TShirtData Interface

```tsx
interface TShirtData {
    brandName: string;      // Brand name
    slogan: string;         // Brand slogan
    design: string;         // Design description
    size: string;           // T-shirt size
    color: string;          // T-shirt color
    material: string;       // Material type
    bgColor: string;        // Background color
    textColor: string;      // Text color
    accentColor: string;    // Accent color
    template: 'casual' | 'sports' | 'vintage' | 'modern' | 'artistic';
}
```

**Purpose:** Stores data for t-shirt designs.

---

## 3. State Management (25+ State Variables)

### 3.1 Core State Variables

```tsx
// Card Data
const [cardData, setCardData] = useState<CardData>({ ... });

// View State
const [currentView, setCurrentView] = useState<'front' | 'back'>('front');

// Element Selection
const [selectedElement, setSelectedElement] = useState<CardElement | null>(null);

// Drag & Drop State
const [isDragging, setIsDragging] = useState(false);
const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });
const [mouseDownTime, setMouseDownTime] = useState(0);

// Pricing State
const [showQuote, setShowQuote] = useState(false);
const [quantity, setQuantity] = useState(100);
const [customQuantity, setCustomQuantity] = useState('');

// Product Tab State
const [activeProductTab, setActiveProductTab] = useState<'visiting-cards' | 'letter-pads' | 'tshirt' | 'merchandise'>('visiting-cards');

// Card Elements Array
const [cardElements, setCardElements] = useState<CardElement[]>([ ... ]);

// Refs for DOM access
const cardRef = useRef<HTMLDivElement>(null);
```

**State Organization:**
```
State Management Structure:
├── Product Data (cardData, letterPadData, tshirtData)
├── UI State (currentView, activeProductTab, showQuote)
├── Selection State (selectedElement, selectedLetterPadElement)
├── Drag State (isDragging, dragOffset, dragStartPos, mouseDownTime)
├── Pricing State (quantity, customQuantity)
└── Elements State (cardElements, letterPadElements, tshirtElements)
```

---

## 4. Template System

### 4.1 Template Configuration

```tsx
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
```

**Template Structure:**
- **id:** Unique identifier
- **name:** Display name
- **preview:** Emoji icon
- **desc:** Description for users

---

### 4.2 Template Color Schemes

```tsx
const getTemplateTextColors = (template: string) => {
    switch (template) {
        case 'classic': 
            return { 
                primary: '#2c3e50',      // Dark blue-gray
                secondary: '#34495e',     // Medium gray
                accent: '#3498db'         // Blue
            };
        
        case 'minimal': 
            return { 
                primary: '#333333',       // Dark gray
                secondary: '#666666',     // Medium gray
                accent: '#007bff'         // Blue
            };
        
        case 'elegant': 
            return { 
                primary: '#2c3e50',       // Dark blue-gray
                secondary: '#7f8c8d',     // Light gray
                accent: '#9b59b6'         // Purple
            };
        
        case 'creative': 
            return { 
                primary: 'white',         // White text
                secondary: 'rgba(255,255,255,0.9)',
                accent: 'rgba(255,255,255,0.8)'
            };
        
        case 'dark': 
            return { 
                primary: '#ffffff',       // White
                secondary: '#bdc3c7',     // Light gray
                accent: '#00ff88'         // Neon green
            };
        
        case 'luxury': 
            return { 
                primary: '#8b4513',       // Brown
                secondary: '#a0522d',     // Sienna
                accent: '#b8860b'         // Dark golden
            };
        
        // ... 12 more templates
        
        default: 
            return { 
                primary: '#333333', 
                secondary: '#666666', 
                accent: '#007bff' 
            };
    }
};
```

**How Templates Work:**

1. **User selects template** → Template ID stored in state
2. **getTemplateTextColors()** → Returns color scheme
3. **applyTemplateToElements()** → Updates all element colors
4. **Component re-renders** → New colors appear

---

### 4.3 Applying Templates to Elements

```tsx
const applyTemplateToElements = (template: string) => {
    const colors = getTemplateTextColors(template);
    
    setCardElements(prev => prev.map(element => {
        const updatedStyle = { ...element.style };

        // Different elements get different colors
        if (element.id === 'name') {
            updatedStyle.color = colors.primary;      // Name: primary color
            updatedStyle.fontWeight = 'bold';
        } 
        else if (element.id === 'title') {
            updatedStyle.color = colors.secondary;    // Title: secondary color
        } 
        else if (element.id === 'company' || element.id === 'company-back') {
            updatedStyle.color = colors.accent;       // Company: accent color
            updatedStyle.fontWeight = 'bold';
        } 
        else {
            updatedStyle.color = colors.primary;      // Others: primary color
        }

        return { ...element, style: updatedStyle };
    }));
};
```

**Visual Flow:**
```
User clicks "Dark" template
         ↓
getTemplateTextColors('dark') 
returns: { primary: '#ffffff', secondary: '#bdc3c7', accent: '#00ff88' }
         ↓
applyTemplateToElements() maps over all elements
         ↓
Name element → primary (#ffffff - white)
Title element → secondary (#bdc3c7 - light gray)
Company element → accent (#00ff88 - neon green)
         ↓
setCardElements() → React re-renders
         ↓
User sees updated colors instantly
```

---

## 5. Element Management

### 5.1 Adding New Elements

```tsx
const addElement = (
    type: CardElement['type'], 
    content?: string, 
    customStyle?: Partial<React.CSSProperties>
) => {
    // Create new element with unique ID
    const newElement: CardElement = {
        id: `${type}_${Date.now()}`,  // Unique ID using timestamp
        type,
        content: content || (
            type === 'text' ? 'New Text' : 
            type === 'qr' ? 'QR Code' : 
            type === 'image' ? 'Image' : 
            type
        ),
        position: { x: 44, y: 44 },   // Default position (with padding)
        size: {
            width: type === 'qr' ? 60 : type === 'image' ? 80 : 100,
            height: type === 'qr' ? 60 : type === 'image' ? 60 : 30
        },
        style: { 
            color: cardData.textColor, 
            fontSize: 14, 
            ...customStyle 
        },
        side: currentView  // Add to current view (front/back)
    };
    
    // Add to elements array
    setCardElements(prev => [...prev, newElement]);
    
    // Auto-select the new element
    setSelectedElement(newElement);
};
```

**Usage Examples:**
```tsx
// Add basic text
addElement('text');  
// Result: { id: 'text_1698765432', content: 'New Text', ... }

// Add styled text
addElement('text', 'Name', { fontSize: 18, fontWeight: 'bold' });
// Result: { id: 'text_1698765433', content: 'Name', style: { fontSize: 18, ... } }

// Add QR code
addElement('qr');
// Result: { id: 'qr_1698765434', content: 'QR Code', size: { width: 60, height: 60 } }
```

**Why Date.now() for ID?**
- Creates unique identifier
- Simple and effective
- No need for UUID library
- Timestamp = unique in milliseconds

---

### 5.2 Deleting Elements

```tsx
const deleteElement = (id: string) => {
    // Filter out the element with matching ID
    setCardElements(prev => prev.filter(el => el.id !== id));
    
    // Deselect if deleted element was selected
    if (selectedElement?.id === id) {
        setSelectedElement(null);
    }
};
```

**Flow:**
```
User clicks delete button
         ↓
deleteElement('name') called
         ↓
filter() removes element with id='name'
         ↓
Check if deleted element was selected
         ↓
If yes, set selectedElement to null
         ↓
React re-renders without the element
```

---

### 5.3 Updating Elements

```tsx
const updateElement = (id: string, updates: Partial<CardElement>) => {
    setCardElements(prev => prev.map(element => 
        element.id === id 
            ? { ...element, ...updates }  // Merge updates
            : element                      // Keep unchanged
    ));
};
```

**Usage:**
```tsx
// Update position
updateElement('name', { 
    position: { x: 50, y: 30 } 
});

// Update content
updateElement('name', { 
    content: 'Jane Doe' 
});

// Update style
updateElement('name', { 
    style: { ...currentStyle, fontSize: 20 } 
});
```

---

## 6. Drag and Drop System

### 6.1 Mouse Event Handlers

The drag-and-drop system uses three mouse events:

1. **onMouseDown** - User clicks element
2. **onMouseMove** - User drags element
3. **onMouseUp** - User releases element

---

### 6.2 handleMouseDown - Starting the Drag

```tsx
const handleMouseDown = (e: React.MouseEvent, element: CardElement) => {
    e.preventDefault();    // Prevent text selection
    e.stopPropagation();   // Don't trigger parent clicks
    
    // Select the element
    setSelectedElement(element);
    
    // Record when mouse was pressed
    setMouseDownTime(Date.now());
    
    // Record starting position
    setDragStartPos({ x: e.clientX, y: e.clientY });
    
    // Calculate offset between mouse and element top-left corner
    const cardRect = cardRef.current?.getBoundingClientRect();
    
    if (cardRect) {
        const cardX = e.clientX - cardRect.left;
        const cardY = e.clientY - cardRect.top;
        
        setDragOffset({
            x: cardX - element.position.x,
            y: cardY - element.position.y
        });
    }
};
```

**What's happening:**

1. **Prevent defaults** - Stop browser from selecting text
2. **Select element** - Mark this element as active
3. **Record timing** - Used to differentiate click vs drag
4. **Calculate offset** - Distance from mouse to element corner

**Visual Explanation:**
```
Card (0, 0)
┌────────────────────────┐
│                        │
│    Mouse Click (150, 100)
│       ↓                │
│    ┌─────┐            │
│    │Name │ (100, 80)  │
│    └─────┘            │
│                        │
└────────────────────────┘

Offset = (150 - 100, 100 - 80) = (50, 20)

This offset is maintained during drag so element doesn't "jump"
```

---

### 6.3 handleMouseMove - Dragging

```tsx
const handleMouseMove = (e: React.MouseEvent) => {
    // Exit if nothing selected or no mouse down
    if (!selectedElement || !cardRef.current || mouseDownTime === 0) return;
    
    const timeDiff = Date.now() - mouseDownTime;
    const mouseDiff = Math.abs(e.clientX - dragStartPos.x) + Math.abs(e.clientY - dragStartPos.y);
    
    // Require both time AND movement threshold to start dragging
    if (timeDiff > 150 && mouseDiff > 8) {
        setIsDragging(true);
    }
    
    if (!isDragging) return;
    
    const cardRect = cardRef.current.getBoundingClientRect();
    
    // Calculate new position
    const cardX = e.clientX - cardRect.left;
    const cardY = e.clientY - cardRect.top;
    
    const newX = cardX - dragOffset.x;
    const newY = cardY - dragOffset.y;
    
    // Constrain within card bounds
    const constrainedX = Math.max(0, Math.min(newX, cardRect.width - selectedElement.size.width));
    const constrainedY = Math.max(0, Math.min(newY, cardRect.height - selectedElement.size.height));
    
    // Update element position
    updateElement(selectedElement.id, {
        position: { x: constrainedX, y: constrainedY }
    });
};
```

**Drag Activation Logic:**

```tsx
// Must meet BOTH conditions:
timeDiff > 150      // 150ms passed since mouse down
mouseDiff > 8       // Mouse moved 8+ pixels
```

**Why these thresholds?**
- Prevents accidental drags on quick clicks
- Gives user time to decide to drag
- Smooth user experience

**Constraint Logic:**
```tsx
const constrainedX = Math.max(0, Math.min(newX, cardRect.width - selectedElement.size.width));
```

**Breakdown:**
```
Math.min(newX, maxX)  → Prevents going past right edge
Math.max(0, result)   → Prevents going past left edge

Example:
Card width: 336px
Element width: 100px
Max X position: 336 - 100 = 236px

If newX = 300 → Math.min(300, 236) = 236 ✓ (constrained)
If newX = -10 → Math.max(0, -10) = 0 ✓ (constrained)
If newX = 150 → Valid, no constraint needed
```

---

### 6.4 handleMouseUp - Ending the Drag

```tsx
const handleMouseUp = () => {
    setIsDragging(false);   // Stop dragging
    setMouseDownTime(0);    // Reset timer
};
```

**Simple cleanup** - Resets drag state.

---

### 6.5 Complete Drag Flow Diagram

```
1. USER CLICKS ELEMENT
   ↓
   handleMouseDown fires
   ↓
   - Select element
   - Record time and position
   - Calculate offset
   
2. USER MOVES MOUSE
   ↓
   handleMouseMove fires repeatedly
   ↓
   Check: Time > 150ms AND Movement > 8px?
   ↓
   YES → setIsDragging(true)
   ↓
   Calculate new position (mouse - offset)
   ↓
   Apply constraints (keep within card bounds)
   ↓
   Update element position
   ↓
   React re-renders → Element moves
   
3. USER RELEASES MOUSE
   ↓
   handleMouseUp fires
   ↓
   setIsDragging(false)
   ↓
   Drag complete
```

---

## 7. Image Upload System

### 7.1 File Input Handler

```tsx
const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];  // Get first file
    
    if (file) {
        const reader = new FileReader();   // Create file reader
        
        reader.onload = (e) => {
            const imageData = e.target?.result as string;  // Base64 data
            
            // Create new image element
            const newElement: CardElement = {
                id: `image_${Date.now()}`,
                type: 'image',
                content: file.name,
                position: { x: 44, y: 44 },
                size: { width: 80, height: 60 },
                style: { borderRadius: '4px' },
                side: currentView,
                imageData: imageData  // Store Base64 image
            };
            
            // Add to card
            setCardElements(prev => [...prev, newElement]);
            setSelectedElement(newElement);
        };
        
        reader.readAsDataURL(file);  // Convert to Base64
    }
    
    event.target.value = '';  // Reset input (allow re-upload same file)
};
```

**How File Upload Works:**

```
1. User clicks "Upload Image" button
   ↓
2. Hidden <input type="file"> opens
   ↓
3. User selects image file
   ↓
4. handleImageUpload receives file
   ↓
5. FileReader converts file to Base64 string
   ↓
6. Base64 stored in element.imageData
   ↓
7. Element added to cardElements array
   ↓
8. Image renders as <img src={imageData} />
```

**Base64 Explained:**

```
Original file: logo.png (binary data)
         ↓
FileReader.readAsDataURL()
         ↓
Base64 string: "data:image/png;base64,iVBORw0KGgoAAAANSUhE..."
         ↓
Can be used directly in <img src="..." />
```

**Why Base64?**
- No server needed for image storage
- Image embedded in design
- Portable (can save whole design as JSON)
- Works offline

---

## 8. Pricing Calculator

### 8.1 Pricing Logic

```tsx
// State
const [quantity, setQuantity] = useState(100);
const [customQuantity, setCustomQuantity] = useState('');
const [showQuote, setShowQuote] = useState(false);

// Pricing tiers
const pricePerCard = 
    quantity >= 1000 ? 8 :   // 1000+ cards = ₹8/card
    quantity >= 500 ? 10 :    // 500-999 cards = ₹10/card
    quantity >= 200 ? 12 :    // 200-499 cards = ₹12/card
    15;                       // < 200 cards = ₹15/card

// Total price
const totalPrice = quantity * pricePerCard;
```

**Pricing Table:**

| Quantity | Price per Card | Total (100 cards) | Total (500 cards) | Total (1000 cards) |
|----------|----------------|-------------------|-------------------|---------------------|
| 1-199 | ₹15 | ₹1,500 | ₹7,500 | ₹15,000 |
| 200-499 | ₹12 | ₹1,200 | ₹6,000 | ₹12,000 |
| 500-999 | ₹10 | ₹1,000 | ₹5,000 | ₹10,000 |
| 1000+ | ₹8 | ₹800 | ₹4,000 | ₹8,000 |

**Bulk Discount:**
- 200+ cards: 20% off
- 500+ cards: 33% off
- 1000+ cards: 47% off

---

### 8.2 Quantity Input Handling

```tsx
// Custom text input
<input
    type="text"
    value={customQuantity || quantity}
    onChange={(e) => {
        const value = e.target.value;
        setCustomQuantity(value);
        
        if (value === '' || !isNaN(Number(value))) {
            setQuantity(parseInt(value) || 100);
        }
    }}
/>

// Preset buttons
<button onClick={() => {
    setQuantity(100);
    setCustomQuantity('');
}}>
    100
</button>

<button onClick={() => {
    setQuantity(200);
    setCustomQuantity('');
}}>
    200
</button>
```

**User Experience:**

```
Option 1: User types in input
  "250" → quantity updates to 250
  
Option 2: User clicks preset button
  Click "500" → quantity = 500, input clears
  
Option 3: User types then clicks preset
  Type "723" → Click "200" → quantity = 200
```

---

### 8.3 Quote Display UI

```tsx
{showQuote && (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-3">Price Estimate</h3>
        
        {/* Quantity Section */}
        <div className="flex items-center gap-4 mb-4">
            <label>Quantity:</label>
            <input type="text" value={customQuantity || quantity} />
            <button onClick={() => setQuantity(100)}>100</button>
            <button onClick={() => setQuantity(200)}>200</button>
            <button onClick={() => setQuantity(500)}>500</button>
            <button onClick={() => setQuantity(1000)}>1000</button>
        </div>
        
        {/* Pricing Summary */}
        <div className="space-y-2">
            <div className="flex justify-between">
                <span>{quantity} cards</span>
                <span>₹{pricePerCard}/card</span>
            </div>
            <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span className="text-orange-600">₹{totalPrice}</span>
            </div>
        </div>
    </div>
)}
```

**Visual Layout:**
```
┌────────────────────────────────────┐
│ Price Estimate                     │
├────────────────────────────────────┤
│ Quantity: [250] [100][200][500][1K]│
│                                    │
│ 250 cards           ₹12/card       │
│ Total:              ₹3,000         │
└────────────────────────────────────┘
```

---

## 9. Multi-Product Support

### 9.1 Product Tabs

```tsx
const [activeProductTab, setActiveProductTab] = useState<
    'visiting-cards' | 'letter-pads' | 'tshirt' | 'merchandise'
>('visiting-cards');

// Tab Navigation
<div className="flex gap-2 mb-6">
    <button 
        onClick={() => setActiveProductTab('visiting-cards')}
        className={activeProductTab === 'visiting-cards' ? 'active' : ''}
    >
        Visiting Cards
    </button>
    
    <button 
        onClick={() => setActiveProductTab('letter-pads')}
        className={activeProductTab === 'letter-pads' ? 'active' : ''}
    >
        Letter Pads
    </button>
    
    <button 
        onClick={() => setActiveProductTab('tshirt')}
        className={activeProductTab === 'tshirt' ? 'active' : ''}
    >
        T-Shirts
    </button>
    
    <button 
        onClick={() => setActiveProductTab('merchandise')}
        className={activeProductTab === 'merchandise' ? 'active' : ''}
    >
        Merchandise
    </button>
</div>

// Conditional Rendering
{activeProductTab === 'visiting-cards' && <VisitingCardEditor />}
{activeProductTab === 'letter-pads' && <LetterPadEditor />}
{activeProductTab === 'tshirt' && <TShirtEditor />}
{activeProductTab === 'merchandise' && <MerchandiseEditor />}
```

---

### 9.2 Separate State for Each Product

```tsx
// Visiting Cards
const [cardData, setCardData] = useState<CardData>({ ... });
const [cardElements, setCardElements] = useState<CardElement[]>([ ... ]);

// Letter Pads
const [letterPadData, setLetterPadData] = useState<LetterPadData>({ ... });
const [letterPadElements, setLetterPadElements] = useState<CardElement[]>([ ... ]);

// T-Shirts
const [tshirtData, setTshirtData] = useState<TShirtData>({ ... });
const [tshirtElements, setTshirtElements] = useState<CardElement[]>([ ... ]);
```

**Why separate state?**
- Each product has different properties
- Switching tabs preserves work
- No data conflicts
- Cleaner code organization

---

## 10. Real-Time Preview System

### 10.1 Preview Rendering

```tsx
<div 
    ref={cardRef}
    className="relative w-full h-full"
    style={getTemplateStyle()}  // Dynamic background
    onMouseMove={handleMouseMove}
    onMouseUp={handleMouseUp}
    onMouseLeave={handleMouseUp}
>
    {/* Render all elements for current side */}
    {cardElements
        .filter(el => el.side === currentView)  // Only show current side
        .map(element => (
            <div
                key={element.id}
                className={`absolute ${
                    selectedElement?.id === element.id ? 'ring-2 ring-blue-500' : ''
                }`}
                style={{
                    left: `${element.position.x}px`,
                    top: `${element.position.y}px`,
                    width: `${element.size.width}px`,
                    height: `${element.size.height}px`,
                    ...element.style
                }}
                onMouseDown={(e) => handleMouseDown(e, element)}
            >
                {/* Render element content */}
                {element.type === 'text' && element.content}
                {element.type === 'image' && (
                    <img src={element.imageData} alt="" />
                )}
                {element.type === 'qr' && (
                    <div className="flex items-center justify-center">
                        QR
                    </div>
                )}
                
                {/* Delete button (when selected) */}
                {selectedElement?.id === element.id && (
                    <button
                        onClick={() => deleteElement(element.id)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white"
                    >
                        ×
                    </button>
                )}
            </div>
        ))
    }
</div>
```

**Preview Features:**

1. **Real-time updates** - Changes appear instantly
2. **Visual selection** - Blue ring around selected element
3. **Position accuracy** - Pixel-perfect positioning
4. **Side switching** - Toggle front/back views
5. **Delete on select** - Quick element removal

---

### 10.2 Side Toggle

```tsx
<div className="flex gap-2 mb-4">
    <button
        onClick={() => setCurrentView('front')}
        className={currentView === 'front' ? 'bg-blue-500 text-white' : 'bg-gray-200'}
    >
        Front
    </button>
    
    <button
        onClick={() => setCurrentView('back')}
        className={currentView === 'back' ? 'bg-blue-500 text-white' : 'bg-gray-200'}
    >
        Back
    </button>
</div>
```

**Flow:**
```
User clicks "Back" button
         ↓
setCurrentView('back')
         ↓
Filter elements: el.side === 'back'
         ↓
Only back-side elements render
         ↓
User sees back of card
```

---

## 11. Advanced Techniques Used

### 11.1 Immutable State Updates

**Wrong way (mutates state):**
```tsx
cardElements.push(newElement);  // ❌ Mutates array
setCardElements(cardElements);
```

**Right way (creates new array):**
```tsx
setCardElements(prev => [...prev, newElement]);  // ✓ New array
```

**Why?**
- React detects changes by reference
- Mutation doesn't trigger re-render
- Immutable updates ensure reactivity

---

### 11.2 Partial Type Updates

```tsx
const updateElement = (id: string, updates: Partial<CardElement>) => {
    // Partial<CardElement> = Any subset of CardElement properties
    
    setCardElements(prev => prev.map(element => 
        element.id === id 
            ? { ...element, ...updates }  // Spread existing + updates
            : element
    ));
};
```

**Partial<T> Explained:**
```tsx
interface CardElement {
    id: string;
    type: string;
    content: string;
    position: { x: number; y: number };
    // ... more properties
}

// Partial<CardElement> allows:
{ position: { x: 50, y: 30 } }  // Just position
{ content: 'New text' }           // Just content
{ style: { color: 'red' } }       // Just style
// Any combination is valid!
```

---

### 11.3 Timestamp-Based Unique IDs

```tsx
const id = `text_${Date.now()}`;
// Result: "text_1698765432123"
```

**Benefits:**
- Simple to implement
- Guaranteed unique (millisecond precision)
- Sortable by creation time
- No external libraries needed

**Alternative approaches:**
```tsx
// UUID library (heavier)
import { v4 as uuidv4 } from 'uuid';
const id = uuidv4();  // "f47ac10b-58cc-4372-a567-0e02b2c3d479"

// Counter (not unique across sessions)
let counter = 0;
const id = `text_${counter++}`;  // "text_0", "text_1", ...

// Random (collision risk)
const id = `text_${Math.random()}`;  // "text_0.123456789"
```

---

### 11.4 Ref for DOM Access

```tsx
const cardRef = useRef<HTMLDivElement>(null);

// Later:
const cardRect = cardRef.current?.getBoundingClientRect();
```

**What is useRef?**
- Stores reference to DOM element
- Persists across re-renders
- Doesn't trigger re-render when changed
- Direct access to DOM properties

**Common uses:**
- Get element dimensions
- Focus input fields
- Trigger animations
- Measure scroll position

---

### 11.5 Conditional Class Names

```tsx
className={`absolute ${
    selectedElement?.id === element.id ? 'ring-2 ring-blue-500' : ''
}`}
```

**Template Literal Syntax:**
```tsx
`base-class ${condition ? 'class-if-true' : 'class-if-false'}`
```

**Alternative library (classnames):**
```tsx
import classNames from 'classnames';

className={classNames(
    'absolute',
    { 'ring-2 ring-blue-500': selectedElement?.id === element.id }
)}
```

---

## 12. Performance Optimizations

### 12.1 Debounced Dragging

```tsx
// Only start drag after 150ms AND 8px movement
if (timeDiff > 150 && mouseDiff > 8) {
    setIsDragging(true);
}
```

**Why?**
- Prevents accidental drags
- Reduces unnecessary re-renders
- Smoother user experience

---

### 12.2 Filtered Rendering

```tsx
{cardElements
    .filter(el => el.side === currentView)  // Only render current side
    .map(element => ...)}
```

**Performance gain:**
- Doesn't render hidden elements
- Faster React reconciliation
- Lower memory usage

---

### 12.3 Event Delegation

```tsx
// Instead of:
// Each element has onClick → 10 elements = 10 listeners

// We use:
// Parent has onMouseDown → 1 listener for all elements
<div 
    onMouseMove={handleMouseMove}  // One listener
    onMouseUp={handleMouseUp}      // One listener
>
    {elements.map(...)}
</div>
```

---

## 13. Common Patterns & Best Practices

### 13.1 State Initialization Pattern

```tsx
const [cardData, setCardData] = useState<CardData>({
    name: 'John Doe',          // Sensible defaults
    title: 'Senior Manager',
    company: 'Your Company Name',
    // ... all required fields
});
```

**Benefits:**
- No undefined values
- Works immediately
- Clear example data
- Type-safe

---

### 13.2 Spread Operator for Updates

```tsx
// Update nested object
setCardData(prev => ({ 
    ...prev,                  // Keep all existing fields
    name: 'Jane Doe'          // Update one field
}));

// Update array
setCardElements(prev => [
    ...prev,                  // Keep all existing elements
    newElement                // Add new element
]);
```

---

### 13.3 Optional Chaining

```tsx
const cardRect = cardRef.current?.getBoundingClientRect();
//                              ↑ Optional chaining

// Instead of:
if (cardRef.current) {
    const cardRect = cardRef.current.getBoundingClientRect();
}
```

**Benefits:**
- Shorter code
- Prevents null errors
- More readable

---

### 13.4 Early Returns

```tsx
const handleMouseMove = (e: React.MouseEvent) => {
    // Early exit if conditions not met
    if (!selectedElement || !cardRef.current || mouseDownTime === 0) {
        return;  // Exit early
    }
    
    // Main logic only runs if all conditions met
    // ...
};
```

**Benefits:**
- Reduces nesting
- Clearer logic flow
- Easier to read

---

## 14. Summary - Phase 4

You've learned about the **most complex component** in the application:

### Core Concepts:
1. ✅ **TypeScript Interfaces** - 4 interfaces for type safety
2. ✅ **State Management** - 25+ state variables organized logically
3. ✅ **Template System** - 18 templates with color schemes
4. ✅ **Element Management** - Add, delete, update elements
5. ✅ **Drag & Drop** - Full implementation with constraints
6. ✅ **Image Upload** - FileReader API with Base64 encoding
7. ✅ **Pricing Calculator** - Dynamic pricing with bulk discounts
8. ✅ **Multi-Product Support** - Tabs for different product types
9. ✅ **Real-Time Preview** - Instant visual updates
10. ✅ **Advanced Patterns** - Immutability, refs, optional chaining

### Key Takeaways:
- **Complex state** can be managed with proper organization
- **Drag-and-drop** requires careful event handling
- **Real-time updates** are achieved with React's reactivity
- **Type safety** prevents bugs in large components
- **Performance** matters - filter, debounce, delegate
- **User experience** is enhanced with constraints and feedback

### Code Statistics:
- 4,286 lines of code
- 25+ state variables
- 30+ functions
- 18 templates
- 4 product types
- 4 TypeScript interfaces

**Next Phase Preview:**
Phase 5 will cover:
- Tailwind CSS customization
- Responsive design strategies
- Animation implementations
- Build optimization
- Deployment to GitHub Pages
- Performance monitoring

---

## Quick Reference - Key Functions

| Function | Purpose | Key Feature |
|----------|---------|-------------|
| `addElement()` | Add new element | Unique ID with timestamp |
| `deleteElement()` | Remove element | Filters by ID |
| `updateElement()` | Modify element | Partial updates |
| `handleMouseDown()` | Start drag | Records offset |
| `handleMouseMove()` | Drag element | Constraints applied |
| `handleMouseUp()` | End drag | Cleanup state |
| `getTemplateTextColors()` | Get color scheme | 18 templates |
| `applyTemplateToElements()` | Apply template | Updates all elements |
| `handleImageUpload()` | Upload image | Base64 conversion |

---

**Ready for Phase 5? Final phase covers styling, performance, and deployment!**
