// src/menuData.js
export const menuItems = [
     {
       id: 1,
       name: 'Veg Schezwan Fried Rice',
       price: 280,
       category: 'Starters',
       time: '15 min',
       image: 'https://www.kannammacooks.com/wp-content/uploads/schezwan-veg-fried-rice-1.jpg',
       ingredients: [
         { name: 'Vegetables', safe: true },
         { name: 'Yogurt & Spices', safe: true },
         { name: 'Contains Soy Sauce', safe: false, alert: 'Soy' }
       ]
     },
     {
       id: 2,
       name: 'Paneer Tikka',
       price: 260,
       category: 'Starters',
       time: '12 min',
       image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=500&q=80',
       ingredients: [
         { name: 'Cottage Cheese (Paneer)', safe: true },
         { name: 'Bell Peppers & Onion', safe: true },
         { name: 'Contains Dairy', safe: false }
       ]
     },
     {
       id: 3,
       name: 'Crispy Samosa',
       price: 120,
       category: 'Starters',
       time: '8 min',
       image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=500&q=80',
       ingredients: [
         { name: 'Refined Flour (Maida)', safe: false, alert: 'Gluten' },
         { name: 'Potatoes & Green Peas', safe: true },
         { name: 'Ajwain & Cumin Seeds', safe: true }
       ]
     },
     {
       id: 4,
       name: 'Masala dosa',
       price: 150,
       category: 'Mains',
       time: '20 min',
       image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy7MKN7ojFiRdM1GhX9r7pde8YkcI_-ALPH7OtTT82_Q1VWmoc0SHNAKo&s=10',
       ingredients: [
         { name: 'Coconut & Potato', safe: true },
       ]
     },
     {
       id: 5,
       name: 'Dal Makhani',
       price: 240,
       category: 'Mains',
       time: '15 min',
       image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=500&q=80',
       ingredients: [
         { name: 'Black Lentils & Kidney Beans', safe: true },
         { name: 'Butter & Cream', safe: false, alert: 'Dairy' },
         { name: 'Garlic & Ginger Paste', safe: true }
       ]
     },
     {
       id: 6,
       name: 'Garlic Butter Naan',
       price: 65,
       category: 'Breads',
       time: '6 min',
       image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTruLJ5CMg9oOtSF9n1Z8fRBiyARFrKzvrSQOJZFyKDQIiV95WzmBJWr5s&s=10',
       ingredients: [
         { name: 'Refined Flour', safe: false, alert: 'Gluten' },
         { name: 'Minced Garlic & Coriander', safe: true },
         { name: 'Butter', safe: false, alert: 'Dairy' }
       ]
     },
     {
       id: 7,
       name: 'Mango Kulfi',
       price: 150,
       category: 'Desserts',
       time: '5 min',
       image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkYFu-QQpVgbupA13Vpw9JMJXbVSpKcaxM4yh64INyJGDCiiGwfLNeZTs&s=10',
       ingredients: [
         { name: 'Condensed Milk & Cream', safe: false, alert: 'Dairy' },
         { name: 'Alphonso Mango Pulp', safe: true },
         { name: 'Pistachio Garnish', safe: false, alert: 'Nuts' }
       ]
     },
     {
       id: 8,
       name: 'Mango Lassi',
       price: 110,
       category: 'Beverages',
       time: '5 min',
       image: 'https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_auto,w_1500,ar_3:2/k%2FPhoto%2FRecipes%2F2024-08-mango-lassi%2Fmango-lassi-013',
       ingredients: [
         { name: 'Yogurt & Milk', safe: false, alert: 'Dairy' },
         { name: 'Mango Pulp', safe: true },
         { name: 'Cardamom Powder', safe: true }
       ]
     }
   ];