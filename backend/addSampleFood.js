import mongoose from 'mongoose';
import foodModel from './models/foodModel.js';
import dotenv from 'dotenv';

dotenv.config();

const sampleFoodItems = [
  {
    name: "Lucknowi Chicken Biryani",
    description: "Fragrant basmati, tender chicken and saffron notes for a rich North Indian dinner box.",
    price: 289,
    category: "Biryani",
    image: "food_1.png"
  },
  {
    name: "Hyderabadi Veg Biryani",
    description: "Layered rice, mint and masala-coated vegetables for a full festive craving.",
    price: 249,
    category: "Biryani",
    image: "food_2.png"
  },
  {
    name: "Roomali Chicken Kathi Roll",
    description: "Juicy chicken with onion lachha and chutney rolled hot in roomali roti.",
    price: 169,
    category: "Rolls",
    image: "food_5.png"
  },
  {
    name: "Paneer Malai Roll",
    description: "Creamy paneer filling with charred capsicum and mellow spice.",
    price: 159,
    category: "Rolls",
    image: "food_6.png"
  },
  {
    name: "Gulab Jamun Cheesecake Jar",
    description: "Cheesecake layered with gulab jamun bits for a heavy, satisfying finish.",
    price: 129,
    category: "Desserts",
    image: "food_9.png"
  },
  {
    name: "Matka Kulfi Falooda",
    description: "Rose, falooda sev and chilled kulfi in a proper matka dessert format.",
    price: 149,
    category: "Desserts",
    image: "food_10.png"
  },
  {
    name: "Rajwadi Veg Thali",
    description: "Dal, sabzi, rice, roti and a sweet course for a complete plate meal.",
    price: 229,
    category: "Thali",
    image: "food_13.png"
  },
  {
    name: "Butter Chicken Thali",
    description: "Butter chicken with dal, jeera rice and roti for a familiar dinner winner.",
    price: 279,
    category: "Thali",
    image: "food_14.png"
  },
  {
    name: "Masala Dosa Combo",
    description: "Crisp dosa with potato masala, chutney and sambar.",
    price: 169,
    category: "South Indian",
    image: "food_17.png"
  },
  {
    name: "Ghee Podi Idli",
    description: "Soft idlis tossed with ghee and podi for a fragrant comfort bite.",
    price: 129,
    category: "South Indian",
    image: "food_18.png"
  },
  {
    name: "Tandoori Chicken Momos",
    description: "Juicy momos finished with tandoori char and served with red chutney.",
    price: 169,
    category: "Momos",
    image: "food_21.png"
  },
  {
    name: "Afghani Paneer Momos",
    description: "Creamy, smoky paneer momos built for late-night snack runs.",
    price: 159,
    category: "Momos",
    image: "food_22.png"
  },
  {
    name: "Chilli Garlic Noodles",
    description: "Wok-tossed noodles with smoky chilli garlic sauce and fast-food comfort.",
    price: 189,
    category: "Chinese",
    image: "food_25.png"
  },
  {
    name: "Paneer Manchurian Rice",
    description: "Paneer bites and savoury gravy over fried rice for a heavy craving box.",
    price: 209,
    category: "Chinese",
    image: "food_26.png"
  },
  {
    name: "Papdi Chaat Box",
    description: "Crunchy papdi, dahi and chutneys in a proper Delhi-style sweet-tangy mix.",
    price: 119,
    category: "Chaat",
    image: "food_29.png"
  },
  {
    name: "Aloo Tikki Chaat",
    description: "Hot tikki, chilled dahi and layered chutneys that feel like evening street food.",
    price: 109,
    category: "Chaat",
    image: "food_31.png"
  }
];

const addSampleFood = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/food_delivery');
    console.log('Connected to MongoDB');

    // Clear existing food items
    await foodModel.deleteMany({});
    console.log('Cleared existing food items');

    // Add sample food items
    const addedItems = await foodModel.insertMany(sampleFoodItems);
    console.log(`Added ${addedItems.length} sample food items`);

    // Display added items
    addedItems.forEach(item => {
      console.log(`- ${item.name} (${item.category}) - $${item.price}`);
    });

    mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error adding sample food:', error);
    process.exit(1);
  }
};

addSampleFood();
