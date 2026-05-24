import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from './models/User.js';
import Product from './models/Product.js';

dotenv.config();

const SAMPLE_PRODUCTS = [
  {
    title: 'Premium Wireless Headphones',
    description: 'High-quality wireless headphones with active noise cancellation, 30-hour battery life, and premium sound quality.',
    price: 199.99,
    category: 'Electronics',
    stock: 50,
    image: 'https://via.placeholder.com/300?text=Wireless+Headphones',
    rating: 4.5,
  },
  {
    title: 'Smart Watch Pro',
    description: 'Advanced smartwatch with fitness tracking, heart rate monitor, GPS, and 7-day battery life.',
    price: 299.99,
    category: 'Electronics',
    stock: 30,
    image: 'https://via.placeholder.com/300?text=Smart+Watch',
    rating: 4.3,
  },
  {
    title: '4K Webcam',
    description: 'Professional 4K webcam with auto-focus, built-in microphone, and wide-angle lens for streaming.',
    price: 129.99,
    category: 'Electronics',
    stock: 25,
    image: 'https://via.placeholder.com/300?text=4K+Webcam',
    rating: 4.2,
  },
  {
    title: 'Mechanical Gaming Keyboard',
    description: 'RGB mechanical keyboard with custom switches, programmable keys, and aluminum frame.',
    price: 149.99,
    category: 'Electronics',
    stock: 40,
    image: 'https://via.placeholder.com/300?text=Gaming+Keyboard',
    rating: 4.6,
  },
  {
    title: 'Portable SSD 1TB',
    description: 'Fast portable solid-state drive with 1TB capacity, USB-C connection, and rugged design.',
    price: 99.99,
    category: 'Electronics',
    stock: 60,
    image: 'https://via.placeholder.com/300?text=Portable+SSD',
    rating: 4.4,
  },
  {
    title: 'Ergonomic Mouse Pad',
    description: 'Large ergonomic mouse pad with wrist support and non-slip base for extended comfort.',
    price: 39.99,
    category: 'Accessories',
    stock: 100,
    image: 'https://via.placeholder.com/300?text=Mouse+Pad',
    rating: 4.1,
  },
  {
    title: 'USB-C Hub Multi-Port',
    description: '7-in-1 USB-C hub with HDMI, USB 3.0, SD card reader, and power delivery support.',
    price: 49.99,
    category: 'Accessories',
    stock: 75,
    image: 'https://via.placeholder.com/300?text=USB+Hub',
    rating: 4.3,
  },
  {
    title: 'Laptop Stand Adjustable',
    description: 'Aluminum adjustable laptop stand compatible with all laptops up to 17 inches.',
    price: 59.99,
    category: 'Accessories',
    stock: 85,
    image: 'https://via.placeholder.com/300?text=Laptop+Stand',
    rating: 4.5,
  },
  {
    title: 'Wireless Charging Pad',
    description: 'Fast wireless charging pad supporting up to 15W charging for compatible devices.',
    price: 34.99,
    category: 'Accessories',
    stock: 90,
    image: 'https://via.placeholder.com/300?text=Charging+Pad',
    rating: 4.2,
  },
  {
    title: 'USB 3.0 Cable 3m',
    description: 'Premium USB 3.0 cable 3 meters long with shielded design for high-speed data transfer.',
    price: 14.99,
    category: 'Cables',
    stock: 200,
    image: 'https://via.placeholder.com/300?text=USB+Cable',
    rating: 4.0,
  },
  {
    title: 'HDMI 2.1 Cable 2m',
    description: '4K@120Hz HDMI 2.1 cable for ultra-high-speed video and audio transmission.',
    price: 19.99,
    category: 'Cables',
    stock: 150,
    image: 'https://via.placeholder.com/300?text=HDMI+Cable',
    rating: 4.3,
  },
  {
    title: 'Lightning Cable Apple',
    description: 'Official Apple Lightning cable for iPhone and iPad with certified charging.',
    price: 24.99,
    category: 'Cables',
    stock: 120,
    image: 'https://via.placeholder.com/300?text=Lightning+Cable',
    rating: 4.4,
  },
];

const SAMPLE_USERS = [
  {
    name: 'Admin User',
    email: 'admin@ecommerce.com',
    password: 'Admin@123',
    role: 'admin',
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'John@123456',
    role: 'user',
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'Jane@123456',
    role: 'user',
  },
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('🔌 Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Seed users (use create() to trigger pre-save hooks)
    for (const userData of SAMPLE_USERS) {
      await User.create(userData);
    }
    const userCount = await User.countDocuments();
    console.log(`✅ ${userCount} users seeded`);

    // Seed products (use create() to trigger pre-save hooks)
    for (const productData of SAMPLE_PRODUCTS) {
      await Product.create(productData);
    }
    const productCount = await Product.countDocuments();
    console.log(`✅ ${productCount} products seeded`);

    console.log('\n🎉 Database seeded successfully!');
    console.log('\nTest Credentials:');
    console.log('Admin Email: admin@ecommerce.com');
    console.log('Admin Password: Admin@123');
    console.log('\nUser Email: john@example.com');
    console.log('User Password: John@123456');

    process.exit(0);
  } catch (error) {
    console.error('❌ Database seeding failed:', error);
    process.exit(1);
  }
};

seedDatabase();
