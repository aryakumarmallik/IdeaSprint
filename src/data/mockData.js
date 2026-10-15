export const INITIAL_FOOD_ITEMS = [
  {
    id: 'food-1',
    description: 'Fresh Hyderabadi Dum Biryani & Mirchi Ka Salan Trays',
    servings: 30,
    weightKg: 12.0,
    location: 'North Dining Hall - Station 2 Kitchen Door',
    dietary: ['Halal-Friendly', 'Hot & Packed'],
    pickupWindow: 'Within 45 mins',
    urgencyBadge: 'High Priority: Expires in 45 mins',
    activeViewers: 2,
    temperature: 'Hot & Packed (Steam Safe)',
    createdAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(), // 10 mins ago
    donorName: 'North Dining Hall',
    donorRole: 'Executive Chef Elena'
  },
  {
    id: 'food-2',
    description: 'Artisanal Turkey & Avocado Ciabatta Sandwiches + Whole Fruits',
    servings: 18,
    weightKg: 7.5,
    location: 'Student Union Food Court - Station 3 Pickup Shelf',
    dietary: ['Nut-Free', 'Freshly Prepared'],
    pickupWindow: 'Within 60 mins',
    urgencyBadge: 'Moderate: Expires in 60 mins',
    activeViewers: 3,
    temperature: 'Chilled / Fresh',
    createdAt: new Date(Date.now() - 1000 * 60 * 25).toISOString(), // 25 mins ago
    donorName: 'Student Union Bistro',
    donorRole: 'Kitchen Lead Marcus'
  },
  {
    id: 'food-3',
    description: 'Steamed Jasmine Rice with Coconut Green Curry & Tofu Trays',
    servings: 32,
    weightKg: 13.5,
    location: 'Engineering Campus Center - Ground Level Catering Door',
    dietary: ['100% Vegan', 'Gluten-Free'],
    pickupWindow: 'Within 30 mins',
    urgencyBadge: 'Critical: Urgent Dispatch (30 mins)',
    activeViewers: 4,
    temperature: 'Steam Table Trays',
    createdAt: new Date(Date.now() - 1000 * 60 * 35).toISOString(), // 35 mins ago
    donorName: 'Engineering Center Cafe',
    donorRole: 'Shift Supervisor Sarah'
  }
];

export const CV_SCAN_SAMPLES = [
  {
    dishName: 'Biryani & Veggies',
    fullDescription: 'Detected: Hyderabadi Dum Biryani & Roasted Veggie Trays',
    estimatedWeight: 12,
    estimatedServings: 30,
    confidence: '98.4%',
    detectedItems: ['Basmati Rice Grain', 'Marinated Veggies', 'Saffron Gravy', 'Steam Tray'],
    temperatureEstimated: '64°C (Safe Hot Holding)',
    suggestedLocation: 'North Dining Hall - Loading Dock Station 2',
    dietary: ['Vegetarian', 'Halal-Friendly']
  },
  {
    dishName: 'Pasta & Tossed Salads',
    fullDescription: 'Detected: Creamy Penne Marinara & Farm Fresh Garden Salad',
    estimatedWeight: 8.5,
    estimatedServings: 22,
    confidence: '97.2%',
    detectedItems: ['Durum Wheat Penne', 'San Marzano Sauce', 'Crisp Romaine', 'Parmesan'],
    temperatureEstimated: '58°C (Serving Ready)',
    suggestedLocation: 'South Campus Commons - Dispatch Counter A',
    dietary: ['Vegetarian', 'Nut-Free']
  },
  {
    dishName: 'Sandwiches & Cut Fruits',
    fullDescription: 'Detected: Fresh Deli Wraps, Club Sandwiches & Melon Wedges',
    estimatedWeight: 6.8,
    estimatedServings: 16,
    confidence: '99.1%',
    detectedItems: ['Tortilla Wraps', 'Whole Grain Bread', 'Mixed Melon Trays', 'Cold Pack'],
    temperatureEstimated: '6°C (Refrigerated Safe)',
    suggestedLocation: 'Student Union Food Court - Rapid Pickup Bay',
    dietary: ['Nut-Free', 'Freshly Chilled']
  }
];

export const PRESET_MEALS = [
  {
    description: 'Assorted Gourmet Bagels, Cream Cheese & Fresh Fruit Platters',
    servings: 20,
    weightKg: 7.0,
    location: 'Graduate Studies Center - Lobby Counter',
    dietary: ['Vegetarian', 'Ready to Eat']
  },
  {
    description: 'Grilled Lemon Herb Chicken Breasts with Roasted Sweet Potatoes',
    servings: 15,
    weightKg: 6.2,
    location: 'Athletics Dining Pavilion - Side Entrance',
    dietary: ['High Protein', 'Gluten-Free']
  },
  {
    description: 'Black Bean Burritos & Mild Pico de Gallo (Individually Wrapped)',
    servings: 28,
    weightKg: 10.5,
    location: 'South Campus Dining Hall - Delivery Bay 1',
    dietary: ['Vegetarian', 'Vegan Option']
  }
];
