
export const products = [
  {
    id: "1",
    name: "iPhone 15 Pro Max",
    sku: "IPH15P-001",
    price: 1199,
    stock: 25,
    category: "Electronics",
    image: null,
    description: "Latest iPhone with advanced A17 Pro chip, titanium design, and Action Button. Features a 6.7-inch Super Retina XDR display."
  },
  {
    id: "2",
    name: "Samsung Galaxy S24 Ultra",
    sku: "SGS24U-002",
    price: 1299,
    stock: 15,
    category: "Electronics",
    image: null,
    description: "Premium Android smartphone with S Pen, 200MP camera, and AI-powered features. Built with titanium frame."
  },
  {
    id: "3",
    name: "MacBook Air M3",
    sku: "MBA-M3-003",
    price: 1399,
    stock: 8,
    category: "Electronics",
    image: null,
    description: "Ultra-thin laptop powered by Apple M3 chip. 13-inch Liquid Retina display with up to 18 hours of battery life."
  },
  {
    id: "4",
    name: "Nike Air Max 270",
    sku: "NAM270-004",
    price: 150,
    stock: 45,
    category: "Footwear",
    image: null,
    description: "Comfortable lifestyle shoes with Max Air unit. Perfect for everyday wear with modern design."
  },
  {
    id: "5",
    name: "Sony WH-1000XM5",
    sku: "SWH1000-005",
    price: 399,
    stock: 12,
    category: "Electronics",
    image: null,
    description: "Industry-leading noise-canceling headphones with 30-hour battery life and premium sound quality."
  },
  {
    id: "6",
    name: "Levi's 501 Original Jeans",
    sku: "LV501-006",
    price: 89,
    stock: 30,
    category: "Clothing",
    image: null,
    description: "Classic straight fit jeans made with premium denim. Iconic 5-pocket styling with button fly."
  },
  {
    id: "7",
    name: "Dell XPS 13",
    sku: "DXPS13-007",
    price: 999,
    stock: 6,
    category: "Electronics",
    image: null,
    description: "Ultra-portable laptop with InfinityEdge display. Intel Core i7 processor with premium build quality."
  },
  {
    id: "8",
    name: "Adidas Ultraboost 22",
    sku: "AUB22-008",
    price: 180,
    stock: 22,
    category: "Footwear",
    image: null,
    description: "High-performance running shoes with Boost midsole technology for maximum energy return."
  },
  {
    id: "9",
    name: "Apple Watch Series 9",
    sku: "AWS9-009",
    price: 399,
    stock: 18,
    category: "Electronics",
    image: null,
    description: "Advanced smartwatch with S9 chip, health monitoring, and carbon neutral design options."
  },
  {
    id: "10",
    name: "Calvin Klein Cotton T-Shirt",
    sku: "CKCT-010",
    price: 35,
    stock: 50,
    category: "Clothing",
    image: null,
    description: "Premium cotton t-shirt with classic fit. Soft, breathable fabric perfect for everyday comfort."
  }
];

export const categories = [
  { id: "electronics", name: "Electronics", description: "Digital devices and gadgets" },
  { id: "clothing", name: "Clothing", description: "Apparel and fashion items" },
  { id: "footwear", name: "Footwear", description: "Shoes and athletic wear" },
  { id: "books", name: "Books", description: "Literature and educational materials" },
  { id: "home-garden", name: "Home & Garden", description: "Home improvement and gardening" },
  { id: "sports", name: "Sports", description: "Sports equipment and accessories" },
  { id: "beauty", name: "Beauty", description: "Cosmetics and personal care" },
  { id: "automotive", name: "Automotive", description: "Car accessories and parts" }
];

export const suppliers = [
  { 
    id: "1", 
    name: "Tech Distributors Inc.", 
    contact: "tech@distributors.com", 
    phone: "+1-555-0123",
    address: "123 Tech Street, Silicon Valley, CA",
    rating: 4.8
  },
  { 
    id: "2", 
    name: "Fashion Wholesale Co.", 
    contact: "orders@fashionwholesale.com",
    phone: "+1-555-0124", 
    address: "456 Fashion Ave, New York, NY",
    rating: 4.6
  },
  { 
    id: "3", 
    name: "Global Electronics Ltd.", 
    contact: "sales@globalelectronics.com",
    phone: "+1-555-0125",
    address: "789 Electronics Blvd, Austin, TX", 
    rating: 4.9
  },
  { 
    id: "4", 
    name: "Sports Gear Pro", 
    contact: "info@sportsgear.com",
    phone: "+1-555-0126",
    address: "321 Sports Complex, Denver, CO", 
    rating: 4.7
  }
];

export const warehouses = [
  { 
    id: "1", 
    name: "Main Warehouse", 
    location: "New York, NY",
    capacity: 10000,
    currentStock: 7500,
    manager: "John Smith"
  },
  { 
    id: "2", 
    name: "West Coast Facility", 
    location: "Los Angeles, CA",
    capacity: 8000,
    currentStock: 6200,
    manager: "Sarah Johnson"
  },
  { 
    id: "3", 
    name: "Central Hub", 
    location: "Chicago, IL",
    capacity: 12000,
    currentStock: 9100,
    manager: "Mike Davis"
  },
  { 
    id: "4", 
    name: "Southeast Distribution", 
    location: "Atlanta, GA",
    capacity: 6000,
    currentStock: 4800,
    manager: "Lisa Rodriguez"
  }
];

export const units = [
  { id: "piece", name: "Piece", symbol: "pc" },
  { id: "kg", name: "Kilogram", symbol: "kg" },
  { id: "g", name: "Gram", symbol: "g" },
  { id: "liter", name: "Liter", symbol: "L" },
  { id: "ml", name: "Milliliter", symbol: "ml" },
  { id: "meter", name: "Meter", symbol: "m" },
  { id: "cm", name: "Centimeter", symbol: "cm" },
  { id: "box", name: "Box", symbol: "box" },
  { id: "pack", name: "Pack", symbol: "pack" },
  { id: "dozen", name: "Dozen", symbol: "dz" }
];

export const taxRates = [
  { id: "0", name: "0% - Tax Exempt", rate: 0 },
  { id: "5", name: "5% - Reduced Rate", rate: 5 },
  { id: "12", name: "12% - Standard Rate", rate: 12 },
  { id: "18", name: "18% - Higher Rate", rate: 18 },
  { id: "28", name: "28% - Luxury Rate", rate: 28 }
];

export const hsnCodes = [
  { code: "8517", description: "Telephone sets, mobile phones" },
  { code: "8471", description: "Computers and computing machines" },
  { code: "6204", description: "Women's clothing, not knitted" },
  { code: "6203", description: "Men's clothing, not knitted" },
  { code: "6402", description: "Footwear with rubber/plastic soles" },
  { code: "8518", description: "Audio equipment, headphones" },
  { code: "9102", description: "Wrist watches, electronic" },
  { code: "4901", description: "Books, brochures, printed matter" }
];
