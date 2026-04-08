export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  images: string[];
  price: number | null;
  description: string;
  features: string[];
  specifications: Record<string, string>;
  rating: number;
  reviews: number;
  stock: number;
  badge?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  productCount: number;
}

export const categories: Category[] = [
  { id: "solar-panels", name: "Solar Panels", slug: "solar-panels", image: "https://shop.andslite.com/wp-content/uploads/2024/08/SOLAR-MODULES-scaled-1-300x300.jpeg", description: "High-efficiency solar PV modules for homes & businesses", productCount: 2 },
  { id: "solar-lights", name: "Solar Lights & Lanterns", slug: "solar-lights", image: "https://shop.andslite.com/wp-content/uploads/2024/08/cp-12-solar-300x300.jpg", description: "Solar-powered LED lanterns, torches and home lighting", productCount: 10 },
  { id: "extension-boards", name: "Extension Boards", slug: "extension-boards", image: "https://shop.andslite.com/wp-content/uploads/2024/08/WhatsApp-Image-2023-04-03-at-5.03.56-PM-scaled-1-300x300.jpeg", description: "Multi-socket extension boards with USB support", productCount: 4 },
  { id: "accessories", name: "Accessories & Chargers", slug: "accessories", image: "https://shop.andslite.com/wp-content/uploads/2024/08/BC-4-160.00-1.jpg", description: "Batteries, chargers, adapters and more", productCount: 11 },
];

export const products: Product[] = [
  // SOLAR PRODUCTS
  {
    id: "nano-solar",
    name: "Andslite Nano Solar LED Rechargeable Light",
    category: "solar-lights",
    subcategory: "Rechargeable Torch",
    images: ["https://shop.andslite.com/wp-content/uploads/2024/08/nano-solar-300x300.jpg"],
    price: 1120,
    description: "Compact and efficient solar LED rechargeable light, perfect for everyday use. Features dual charging via solar panel and electric adapter.",
    features: ["Solar + Electric Charging", "Compact Design", "Long Battery Life", "LED Technology"],
    specifications: { "Type": "Solar LED Light", "Charging": "Solar + Electric", "Battery": "Rechargeable" },
    rating: 4.3, reviews: 28, stock: 50
  },
  {
    id: "e-star-solar",
    name: "Andslite E-STAR LED Solar Lantern",
    category: "solar-lights",
    subcategory: "Rechargeable Lanterns",
    images: ["https://shop.andslite.com/wp-content/uploads/2024/08/1-15-scaled-1-300x300.jpg"],
    price: 3695,
    description: "Premium LED Solar Lantern with powerful illumination. Ideal for outdoor activities and emergency lighting.",
    features: ["High Brightness LED", "Solar Powered", "Durable Construction", "Multiple Light Modes"],
    specifications: { "Type": "Solar Lantern", "LED": "High Power", "Panel": "Built-in Solar" },
    rating: 4.5, reviews: 42, stock: 0, badge: "Out of Stock"
  },
  {
    id: "venus-solar",
    name: "Andslite Venus LED Solar Lantern",
    category: "solar-lights",
    subcategory: "Rechargeable Lanterns",
    images: ["https://shop.andslite.com/wp-content/uploads/2024/08/venus-solar-1.jpg"],
    price: 1640,
    description: "Elegant Venus LED Solar Lantern with efficient solar charging. Perfect for homes and outdoor use.",
    features: ["Elegant Design", "Solar Charging", "Bright LED", "Portable"],
    specifications: { "Type": "Solar Lantern", "Design": "Venus Series", "Charging": "Solar" },
    rating: 4.2, reviews: 35, stock: 30
  },
  {
    id: "cp12-solar",
    name: "Andslite CP 12-4WP LED Solar Lantern",
    category: "solar-lights",
    subcategory: "Rechargeable Lanterns",
    images: ["https://shop.andslite.com/wp-content/uploads/2024/08/cp-12-solar-300x300.jpg"],
    price: 1570,
    description: "CP 12 Solar Lantern with 4W solar panel for efficient charging. Top-rated product with excellent reviews.",
    features: ["4W Solar Panel", "Bright LED", "Long Lasting Battery", "Weatherproof"],
    specifications: { "Type": "Solar Lantern", "Solar Panel": "4W", "Rating": "5/5" },
    rating: 5.0, reviews: 67, stock: 45, badge: "Best Seller"
  },
  {
    id: "shl-1",
    name: "Andslite SHL-1 Rechargeable Home Lights",
    category: "solar-lights",
    subcategory: "Solar Combo",
    images: ["https://shop.andslite.com/wp-content/uploads/2024/08/SHL-1-PHOTO-300x300.jpg"],
    price: 3650,
    description: "Complete solar home lighting solution with multiple LED lights. Power your entire home with clean solar energy.",
    features: ["Complete Home Solution", "Multiple LED Lights", "Solar Panel Included", "Easy Installation"],
    specifications: { "Type": "Home Lighting Set", "Lights": "Multiple", "Panel": "Included" },
    rating: 4.4, reviews: 53, stock: 20
  },
  {
    id: "elegant-fan",
    name: "Andslite Elegant Solar Rechargeable Table Fan with LED Light",
    category: "solar-lights",
    subcategory: "Solar Combo",
    images: ["https://shop.andslite.com/wp-content/uploads/2024/08/WhatsApp-Image-2021-04-01-at-15.56.14-300x300.jpeg"],
    price: 3800,
    description: "Solar rechargeable table fan with built-in LED light. Dual functionality in one compact unit.",
    features: ["Table Fan + LED Light", "Solar Rechargeable", "Portable Design", "Multiple Speed Settings"],
    specifications: { "Type": "Solar Fan + Light", "Charging": "Solar + Electric", "Features": "Fan + LED" },
    rating: 4.6, reviews: 38, stock: 15
  },
  {
    id: "shl-4",
    name: "Andslite SHL-4 Solar Home Lighting Set with 20W Solar Panel",
    category: "solar-lights",
    subcategory: "Solar Combo",
    images: ["https://shop.andslite.com/wp-content/uploads/2024/08/SHL-4-1-300x300.jpg"],
    price: 6800,
    description: "Premium home lighting set with powerful 20W solar panel. Complete solar solution for larger homes.",
    features: ["20W Solar Panel", "Multiple Light Points", "Heavy Duty Battery", "Complete Kit"],
    specifications: { "Type": "Home Lighting Set", "Solar Panel": "20W", "Kit": "Complete" },
    rating: 4.7, reviews: 29, stock: 10, badge: "Premium"
  },
  {
    id: "globe-solar",
    name: "Andslite Globe LED Solar Rechargeable Lantern",
    category: "solar-lights",
    subcategory: "Rechargeable Lanterns",
    images: ["https://shop.andslite.com/wp-content/uploads/2024/08/1-16-scaled-1-300x300.jpg"],
    price: 1570,
    description: "Globe-shaped LED solar lantern with 360-degree illumination. Stylish design meets functionality.",
    features: ["360° Illumination", "Globe Design", "Solar Rechargeable", "Portable"],
    specifications: { "Type": "Solar Lantern", "Design": "Globe", "Light": "360°" },
    rating: 4.1, reviews: 22, stock: 35
  },
  {
    id: "ranger-solar",
    name: "Andslite Ranger Solar LED Rechargeable Light",
    category: "solar-lights",
    subcategory: "Rechargeable Torch",
    images: ["https://shop.andslite.com/wp-content/uploads/2024/08/1-9-scaled-1-300x300.jpg"],
    price: 1520,
    description: "Rugged Ranger series solar LED light built for outdoor adventures. Durable and reliable.",
    features: ["Rugged Design", "Solar Powered", "High Beam", "Water Resistant"],
    specifications: { "Type": "Solar Torch", "Series": "Ranger", "Build": "Rugged" },
    rating: 4.3, reviews: 31, stock: 40
  },
  {
    id: "solar-pv-modules",
    name: "Andslite Solar PV Modules",
    category: "solar-panels",
    subcategory: "Solar Panels",
    images: ["https://shop.andslite.com/wp-content/uploads/2024/08/SOLAR-MODULES-scaled-1-300x300.jpeg"],
    price: null,
    description: "High-efficiency solar PV modules for commercial and residential installations. Available in multiple wattage options.",
    features: ["High Efficiency", "Multiple Wattage Options", "Weather Resistant", "25-Year Warranty"],
    specifications: { "Type": "Solar PV Module", "Application": "Commercial/Residential", "Warranty": "25 Years" },
    rating: 4.8, reviews: 18, stock: 100, badge: "Contact for Price"
  },
  {
    id: "aspv-0506",
    name: "Andslite ASPV 0506 Solar Panel",
    category: "solar-panels",
    subcategory: "Solar Panels",
    images: ["https://shop.andslite.com/wp-content/uploads/2024/08/5Wp-Panel-300x300.jpg"],
    price: 588,
    description: "Compact 5Wp solar panel ideal for small devices and portable charging solutions.",
    features: ["5Wp Output", "Compact Size", "Durable Frame", "Easy Mounting"],
    specifications: { "Type": "Solar Panel", "Wattage": "5Wp", "Size": "Compact" },
    rating: 4.0, reviews: 14, stock: 0, badge: "Out of Stock"
  },
  {
    id: "smile-24",
    name: "Andslite Smile 24 LED Solar Lantern",
    category: "solar-lights",
    subcategory: "Rechargeable Lanterns",
    images: ["https://shop.andslite.com/wp-content/uploads/2024/08/smile-24-solar-1-300x300.jpg"],
    price: 1360,
    description: "Smile 24 Solar Lantern with 24 bright LEDs for wide area illumination.",
    features: ["24 LEDs", "Wide Illumination", "Solar + Electric", "Lightweight"],
    specifications: { "Type": "Solar Lantern", "LEDs": "24", "Charging": "Dual" },
    rating: 4.2, reviews: 25, stock: 55
  },

  // ACCESSORIES
  {
    id: "4v-battery",
    name: "Andslite 4V / 4.5Ah SMF Battery",
    category: "accessories",
    subcategory: "Accessories",
    images: ["https://shop.andslite.com/wp-content/uploads/2024/08/WhatsApp-Image-2021-08-13-at-5.25.15-PM-300x300.jpeg"],
    price: 310,
    description: "Sealed Maintenance-Free battery for Andslite rechargeable products. 4V 4.5Ah capacity.",
    features: ["4V 4.5Ah", "Sealed Maintenance Free", "Long Life", "Universal Fit"],
    specifications: { "Voltage": "4V", "Capacity": "4.5Ah", "Type": "SMF" },
    rating: 4.0, reviews: 19, stock: 200
  },
  {
    id: "bc4-charger",
    name: "Andslite BC4 – 4 Volt Battery Charger (BIG PIN)",
    category: "accessories",
    subcategory: "Charger",
    images: ["https://shop.andslite.com/wp-content/uploads/2024/08/BC-4-160.00-1.jpg"],
    price: 165,
    description: "4 Volt battery charger with big pin connector. Compatible with all Andslite 4V products.",
    features: ["4V Output", "Big Pin Connector", "LED Indicator", "Overcharge Protection"],
    specifications: { "Output": "4V", "Pin": "Big Pin", "Protection": "Overcharge" },
    rating: 4.1, reviews: 33, stock: 150
  },
  {
    id: "bc6-charger",
    name: "Andslite BC6 – 6 Volt Battery Charger",
    category: "accessories",
    subcategory: "Charger",
    images: ["https://shop.andslite.com/wp-content/uploads/2024/08/BC-6-215.00-1.jpg"],
    price: 215,
    description: "6 Volt battery charger for Andslite rechargeable products with safety features.",
    features: ["6V Output", "Safety Features", "LED Indicator", "Compact Design"],
    specifications: { "Output": "6V", "Safety": "Built-in Protection", "Design": "Compact" },
    rating: 4.0, reviews: 27, stock: 120
  },
  {
    id: "bc12-charger",
    name: "Andslite BC12 – 12 Volt Battery Charger",
    category: "accessories",
    subcategory: "Charger",
    images: ["https://shop.andslite.com/wp-content/uploads/2024/08/BC-12-1-scaled-1-300x300.jpg"],
    price: 399,
    description: "Heavy-duty 12V battery charger for solar systems and large capacity batteries.",
    features: ["12V Output", "Heavy Duty", "Auto Cut-off", "Universal Compatibility"],
    specifications: { "Output": "12V", "Type": "Heavy Duty", "Protection": "Auto Cut-off" },
    rating: 4.3, reviews: 21, stock: 80
  },
  {
    id: "ap10-charger",
    name: "Andslite AP-10 Charger (Small Pin)",
    category: "accessories",
    subcategory: "Adapter",
    images: ["https://shop.andslite.com/wp-content/uploads/2024/08/BC-4-160.00-1-1.jpg"],
    price: 170,
    description: "Compact adapter with small pin for portable Andslite devices.",
    features: ["Small Pin", "Compact", "Energy Efficient", "Safe Charging"],
    specifications: { "Pin": "Small", "Size": "Compact", "Type": "Adapter" },
    rating: 3.9, reviews: 15, stock: 100
  },
  {
    id: "ap31-adapter",
    name: "Andslite AP-31 Adapter",
    category: "accessories",
    subcategory: "Adapter",
    images: ["https://shop.andslite.com/wp-content/uploads/2024/08/ap-31-255-1.jpg"],
    price: 260,
    description: "Versatile AP-31 adapter compatible with a wide range of Andslite products.",
    features: ["Versatile Compatibility", "Stable Output", "Durable Build", "Safe"],
    specifications: { "Type": "Adapter", "Compatibility": "Wide Range" },
    rating: 4.0, reviews: 12, stock: 90
  },
  {
    id: "6v-battery",
    name: "Andslite 6V / 4.5Ah SMF Battery",
    category: "accessories",
    subcategory: "Accessories",
    images: ["https://shop.andslite.com/wp-content/uploads/2024/08/WhatsApp-Image-2021-08-13-at-5.25.28-PM-300x300.jpeg"],
    price: 440,
    description: "6V 4.5Ah Sealed Maintenance-Free battery for medium-power Andslite devices.",
    features: ["6V 4.5Ah", "SMF Technology", "Long Cycle Life", "Leak-proof"],
    specifications: { "Voltage": "6V", "Capacity": "4.5Ah", "Type": "SMF" },
    rating: 4.2, reviews: 16, stock: 180
  },
  {
    id: "mosquito-racket",
    name: "ALMR01 Mosquito Rechargeable Racket with Torch",
    category: "accessories",
    subcategory: "Accessories",
    images: ["https://shop.andslite.com/wp-content/uploads/2024/08/1af57639-1ccd-4edb-a202-7908c0b936a7-scaled-1-300x300.jpg"],
    price: 695,
    description: "Dual-purpose mosquito racket with built-in LED torch. Rechargeable and eco-friendly.",
    features: ["Built-in Torch", "Rechargeable", "High Voltage Grid", "Ergonomic Handle"],
    specifications: { "Type": "Mosquito Racket", "Feature": "LED Torch", "Charging": "Rechargeable" },
    rating: 4.4, reviews: 48, stock: 60
  },

  // EXTENSION BOARDS
  {
    id: "axr-2",
    name: "AXR 2 Dual Socket Extension Board",
    category: "extension-boards",
    subcategory: "Extension Board",
    images: ["https://shop.andslite.com/wp-content/uploads/2024/08/WhatsApp-Image-2023-04-03-at-5.03.56-PM-scaled-1-300x300.jpeg"],
    price: 300,
    description: "Compact dual socket extension board with heavy-duty build. Ideal for home and office.",
    features: ["2 Sockets", "Heavy Duty", "Fire Retardant", "Copper Wiring"],
    specifications: { "Sockets": "2", "Wire": "Copper", "Safety": "Fire Retardant" },
    rating: 4.1, reviews: 34, stock: 100
  },
  {
    id: "axl-4",
    name: "AXL 4 (4-Way Extension Board)",
    category: "extension-boards",
    subcategory: "Extension Board",
    images: ["https://shop.andslite.com/wp-content/uploads/2024/08/WhatsApp-Image-2023-04-03-at-5.03.56-PM-1-scaled-1-300x300.jpeg"],
    price: 470,
    description: "4-way extension board with surge protection. Perfect for multi-device setups.",
    features: ["4 Sockets", "Surge Protection", "Long Cable", "ISI Marked"],
    specifications: { "Sockets": "4", "Protection": "Surge", "Standard": "ISI" },
    rating: 4.3, reviews: 41, stock: 75
  },
  {
    id: "axlu-5",
    name: "AXLU 5 Extension Board with USB",
    category: "extension-boards",
    subcategory: "Extension Board",
    images: ["https://shop.andslite.com/wp-content/uploads/2024/08/axlu-5-300x300.jpg"],
    price: 695,
    description: "Modern extension board with USB ports for charging phones and tablets directly.",
    features: ["USB Charging Ports", "5 Sockets", "Surge Protection", "Smart IC"],
    specifications: { "Sockets": "5", "USB": "Yes", "Protection": "Surge + Short Circuit" },
    rating: 4.5, reviews: 56, stock: 45, badge: "Popular"
  },
  {
    id: "axr-3",
    name: "AXR 3 Extension Board",
    category: "extension-boards",
    subcategory: "Extension Board",
    images: ["https://shop.andslite.com/wp-content/uploads/2024/08/axr-3-300x300.jpg"],
    price: 380,
    description: "3-socket extension board with safety features and durable construction.",
    features: ["3 Sockets", "Safety Shutters", "Durable", "Power Indicator"],
    specifications: { "Sockets": "3", "Safety": "Shutters", "Indicator": "LED" },
    rating: 4.0, reviews: 23, stock: 85
  },
];

export const contactInfo = {
  company: "ASP Solar Enterprise",
  address: "Kolkata, West Bengal, India",
  phone: ["+91 98765 43210", "+91 87654 32109"],
  email: "info@aspsolar.in",
  whatsapp: "+919876543210",
  hours: "Mon - Sat: 9:00 AM - 7:00 PM",
  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d235527.00000000003!2d88.2636304!3d22.5354215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f882db4908f667%3A0x43e330e68f6c2cbc!2sKolkata%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1700000000000"
};

export const testimonials = [
  { id: 1, name: "Rajesh Kumar", role: "Business Owner, Delhi", rating: 5, comment: "ASP Solar transformed our factory's energy costs. The solar panels are incredibly efficient and the installation was seamless.", avatar: "RK" },
  { id: 2, name: "Priya Sharma", role: "Homeowner, Mumbai", rating: 5, comment: "The SHL-4 home lighting set is amazing. We haven't faced a single power outage issue since installing it.", avatar: "PS" },
  { id: 3, name: "Amit Patel", role: "Retail Store Owner, Ahmedabad", rating: 4, comment: "Great quality extension boards. The USB one is a customer favorite in my shop. Bulk pricing was very competitive.", avatar: "AP" },
  { id: 4, name: "Sunita Devi", role: "NGO Director, Jharkhand", rating: 5, comment: "We distributed Andslite solar lanterns in rural areas. The quality and battery life exceeded all expectations.", avatar: "SD" },
  { id: 5, name: "Vikram Singh", role: "Contractor, Jaipur", rating: 4, comment: "Reliable products and excellent after-sales support. The solar PV modules are performing beyond specifications.", avatar: "VS" },
];

export const blogPosts = [
  { id: 1, title: "How Solar Energy Can Cut Your Electricity Bill by 80%", excerpt: "Discover the financial benefits of switching to solar power for your home or business.", category: "Solar Savings", readTime: "5 min", date: "2024-03-15" },
  { id: 2, title: "Complete Guide to Solar Panel Installation", excerpt: "Step-by-step guide for installing solar panels, from site assessment to grid connection.", category: "Installation", readTime: "8 min", date: "2024-03-10" },
  { id: 3, title: "Solar Lanterns vs Traditional Lighting: A Comparison", excerpt: "Why solar lanterns are the smarter choice for emergency and outdoor lighting needs.", category: "Product Comparison", readTime: "4 min", date: "2024-03-05" },
];
