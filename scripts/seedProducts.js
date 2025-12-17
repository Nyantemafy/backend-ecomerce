const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');
const User = require('../models/User');

dotenv.config();

const products = [
    {
        name: 'MacBook Pro 16"',
        description: 'Powerful laptop with M3 Pro chip, 16GB RAM, and 512GB SSD. Perfect for professionals and creators who need top-tier performance for video editing, coding, and design work.',
        price: 2499.99,
        category: 'Electronics',
        images: [
        'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800',
        'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800',
        'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800'
        ],
        stock: 15,
        brand: 'Apple',
        rating: 4.8,
        numReviews: 124,
        featured: true
    },
    {
        name: 'iPhone 15 Pro',
        description: 'Latest iPhone with A17 Pro chip, titanium design, and advanced camera system. Features action button and USB-C charging.',
        price: 1199.99,
        category: 'Electronics',
        images: [
        'https://images.unsplash.com/photo-1592286927505-e907a0859c56?w=800',
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800',
        'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800'
        ],
        stock: 30,
        brand: 'Apple',
        rating: 4.9,
        numReviews: 256,
        featured: true
    },
    {
        name: 'Sony WH-1000XM5',
        description: 'Industry-leading noise canceling wireless headphones with exceptional sound quality. 30-hour battery life and premium comfort.',
        price: 399.99,
        category: 'Electronics',
        images: [
        'https://images.unsplash.com/photo-1545127398-14699f92334b?w=800',
        'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800',
        'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800'
        ],
        stock: 50,
        brand: 'Sony',
        rating: 4.7,
        numReviews: 189,
        featured: true
    },
    {
        name: 'Samsung 55" 4K Smart TV',
        description: 'Crystal UHD 4K TV with HDR, Smart Hub, and stunning picture quality. Perfect for gaming and streaming.',
        price: 699.99,
        category: 'Electronics',
        images: [
        'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800',
        'https://images.unsplash.com/photo-1593078165046-e3ad317f3d75?w=800',
        'https://images.unsplash.com/photo-1461151304267-38535e780c79?w=800'
        ],
        stock: 20,
        brand: 'Samsung',
        rating: 4.6,
        numReviews: 98,
        featured: false
    },
    {
        name: 'Nike Air Max 270',
        description: 'Comfortable running shoes with Max Air cushioning and breathable mesh upper. Perfect for daily training.',
        price: 149.99,
        category: 'Sports',
        images: [
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800',
        'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800',
        'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800'
        ],
        stock: 100,
        brand: 'Nike',
        rating: 4.5,
        numReviews: 342,
        featured: true
    },
    {
        name: 'Adidas Ultraboost 22',
        description: 'Premium running shoes with responsive Boost cushioning and Primeknit upper. Maximum comfort and energy return.',
        price: 189.99,
        category: 'Sports',
        images: [
        'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800',
        'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=800',
        'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800'
        ],
        stock: 75,
        brand: 'Adidas',
        rating: 4.7,
        numReviews: 215,
        featured: false
    },
    {
        name: 'Levi\'s 501 Original Jeans',
        description: 'Classic straight fit jeans with button fly. An iconic American style that never goes out of fashion.',
        price: 79.99,
        category: 'Clothing',
        images: [
        'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800',
        'https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=800',
        'https://images.unsplash.com/photo-1475178626620-a4d3e4eff00e?w=800'
        ],
        stock: 150,
        brand: 'Levi\'s',
        rating: 4.4,
        numReviews: 567,
        featured: false
    },
    {
        name: 'North Face Thermoball Jacket',
        description: 'Lightweight insulated jacket with ThermoBall technology for cold weather. Water-resistant and packable.',
        price: 229.99,
        category: 'Clothing',
        images: [
        'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800',
        'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800',
        'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800'
        ],
        stock: 40,
        brand: 'The North Face',
        rating: 4.8,
        numReviews: 143,
        featured: true
    },
    {
        name: 'Atomic Habits by James Clear',
        description: 'An easy and proven way to build good habits and break bad ones. #1 New York Times bestseller.',
        price: 16.99,
        category: 'Books',
        images: [
        'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800',
        'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800',
        'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800'
        ],
        stock: 200,
        brand: 'Avery',
        rating: 4.9,
        numReviews: 8934,
        featured: true
    },
    {
        name: 'The Psychology of Money',
        description: 'Timeless lessons on wealth, greed, and happiness by Morgan Housel. A must-read for financial literacy.',
        price: 18.99,
        category: 'Books',
        images: [
        'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800',
        'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800'
        ],
        stock: 180,
        brand: 'Harriman House',
        rating: 4.8,
        numReviews: 4521,
        featured: false
    },
    {
        name: 'Instant Pot Duo 7-in-1',
        description: 'Multi-functional pressure cooker: pressure cook, slow cook, rice cooker, steamer, sauté, yogurt maker, and warmer.',
        price: 99.99,
        category: 'Home',
        images: [
        'https://images.unsplash.com/photo-1585515320310-259814833e62?w=800',
        'https://images.unsplash.com/photo-1584990347449-21e0f0e91cf6?w=800',
        'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800'
        ],
        stock: 60,
        brand: 'Instant Pot',
        rating: 4.7,
        numReviews: 12456,
        featured: false
    },
    {
        name: 'Dyson V15 Detect',
        description: 'Powerful cordless vacuum with laser dust detection and LCD screen. Up to 60 minutes of run time.',
        price: 749.99,
        category: 'Home',
        images: [
        'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800',
        'https://images.unsplash.com/photo-1574269910303-e364505ffd45?w=800',
        'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=800'
        ],
        stock: 25,
        brand: 'Dyson',
        rating: 4.6,
        numReviews: 876,
        featured: true
    },
    {
        name: 'Canon EOS R6 Mark II',
        description: 'Full-frame mirrorless camera with 24.2MP sensor and 4K 60p video. Advanced autofocus system.',
        price: 2499.99,
        category: 'Electronics',
        images: [
        'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800',
        'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800',
        'https://images.unsplash.com/photo-1606980707985-1b544e1b5705?w=800'
        ],
        stock: 10,
        brand: 'Canon',
        rating: 4.9,
        numReviews: 234,
        featured: false
    },
    {
        name: 'Kindle Paperwhite',
        description: 'Waterproof e-reader with 6.8" display and adjustable warm light. Weeks of battery life.',
        price: 139.99,
        category: 'Electronics',
        images: [
        'https://images.unsplash.com/photo-1592496001020-d31bd830651f?w=800',
        'https://images.unsplash.com/photo-1612359833550-a13c7af2b9a4?w=800',
        'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=800'
        ],
        stock: 80,
        brand: 'Amazon',
        rating: 4.6,
        numReviews: 3421,
        featured: false
    },
    {
        name: 'Yoga Mat Premium',
        description: 'Extra thick exercise mat with carrying strap. Non-slip and eco-friendly material.',
        price: 39.99,
        category: 'Sports',
        images: [
        'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800',
        'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=800',
        'https://images.unsplash.com/photo-1588286840104-8957b019727f?w=800'
        ],
        stock: 120,
        brand: 'Manduka',
        rating: 4.5,
        numReviews: 654,
        featured: false
    },
    {
        name: 'Gaming Mouse RGB',
        description: 'High-precision gaming mouse with 16000 DPI and customizable RGB lighting. 8 programmable buttons.',
        price: 59.99,
        category: 'Electronics',
        images: [
        'https://images.unsplash.com/photo-1527814050087-3793815479db?w=800',
        'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800',
        'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=800'
        ],
        stock: 90,
        brand: 'Logitech',
        rating: 4.4,
        numReviews: 432,
        featured: false
    },
    {
        name: 'Coffee Maker Premium',
        description: 'Programmable coffee maker with thermal carafe. Brew strength control and auto-shutoff.',
        price: 129.99,
        category: 'Home',
        images: [
        'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800',
        'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800',
        'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800'
        ],
        stock: 45,
        brand: 'Cuisinart',
        rating: 4.3,
        numReviews: 876,
        featured: false
    },
    {
        name: 'Wireless Earbuds Pro',
        description: 'True wireless earbuds with active noise cancellation. 24-hour battery life with charging case.',
        price: 179.99,
        category: 'Electronics',
        images: [
        'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800',
        'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=800',
        'https://images.unsplash.com/photo-1598331021675-a8da76d7c9b3?w=800'
        ],
        stock: 110,
        brand: 'Samsung',
        rating: 4.6,
        numReviews: 1234,
        featured: true
    },
    {
        name: 'Smart Watch Fitness',
        description: 'Fitness tracker with heart rate monitor, GPS, and sleep tracking. 7-day battery life.',
        price: 249.99,
        category: 'Electronics',
        images: [
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800',
        'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800',
        'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800'
        ],
        stock: 65,
        brand: 'Fitbit',
        rating: 4.5,
        numReviews: 987,
        featured: false
    },
    {
        name: 'Backpack Laptop 17"',
        description: 'Durable laptop backpack with USB charging port. Water-resistant and TSA-approved.',
        price: 49.99,
        category: 'Other',
        images: [
        'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800',
        'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800',
        'https://images.unsplash.com/photo-1577733966973-d680bffd2e80?w=800'
        ],
        stock: 85,
        brand: 'SwissGear',
        rating: 4.4,
        numReviews: 543,
        featured: false
    }
    ];

    const seedDatabase = async () => {
        try {
            // Connect to MongoDB
            await mongoose.connect(process.env.MONGODB_URI);
            console.log("✅ MongoDB connected");

            // Clear existing data
            await Product.deleteMany({});
            console.log('🗑️  Cleared products');

            // Insert products
            const createdProducts = await Product.insertMany(products);
            console.log(`✅ ${createdProducts.length} products added`);

            // Create admin user if doesn't exist
            const adminExists = await User.findOne({ email: 'admin@demo.com' });
            if (!adminExists) {
            await User.create({
                name: 'Admin User',
                email: 'admin@demo.com',
                password: 'admin123',
                role: 'admin',
                phone: '+1234567890',
                address: {
                street: '123 Admin Street',
                city: 'San Francisco',
                postalCode: '94102',
                country: 'USA'
                }
            });
            console.log('✅ Admin user created (admin@demo.com / admin123)');
            } else {
            console.log('ℹ️  Admin user already exists');
            }

            // Create demo user if doesn't exist
            const userExists = await User.findOne({ email: 'user@demo.com' });
            if (!userExists) {
            await User.create({
                name: 'Demo User',
                email: 'user@demo.com',
                password: 'user123',
                role: 'user',
                phone: '+0987654321',
                address: {
                street: '456 User Avenue',
                city: 'New York',
                postalCode: '10001',
                country: 'USA'
                }
            });
            console.log('✅ Demo user created (user@demo.com / user123)');
            } else {
            console.log('ℹ️  Demo user already exists');
            }

            console.log('\n🎉 Database seeded successfully!');
            console.log('\n📝 Demo Credentials:');
            console.log('   Admin: admin@demo.com / admin123');
            console.log('   User:  user@demo.com / user123\n');
            
            process.exit(0);
        } catch (error) {
            console.error('❌ Error seeding database:', error);
            process.exit(1);
        }
    };

seedDatabase();