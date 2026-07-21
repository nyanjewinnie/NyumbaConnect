const mongoose = require("mongoose");
const dotenv = require("dotenv");
const dns = require("dns");

dns.setDefaultResultOrder("ipv4first");

dotenv.config();

const House = require("../models/House");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected");

  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

const houses = [
     {
  id: 1,
  code: "NC001",
  title: "Modern Bedsitter",
  type: "Bedsitter",
  county: "Kiambu",
  location: "Ruiru",
  sublocation: "Mwihoko",
  mapLink: "https://maps.google.com/?q=Mwihoko,Ruiru",
  rent: 8000,
  deposit: 16000,
  landlord: "John Kamau",
  phone: "0712345678",
  status: "Available",

  image:
    "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80",

  images: [
    "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80"
  ],

  amenities: [
    "Water",
    "Electricity",
    "WiFi",
    "Parking",
    "CCTV"
  ],
},

  {
    id: 2,
    code: "NC002",
    title: "Executive One Bedroom",
    type: "One Bedroom",
    county: "Kiambu",
    location: "Kiambu Town",
    sublocation: "Kiambu Central",
    mapLink: "https://maps.google.com/?q=Kiambu Central, Kiambu",
    rent: 15000,
    deposit: 30000,
    landlord: "Mary Wanjiru",
    phone: "0723456789",
    status: "Available",
    images: [
  "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80",
],
    amenities: ["Parking", "Balcony", "Water", "CCTV", "Security"],
  },

  {
    id: 3,
    code: "NC003",
    title: "Two Bedroom Apartment",
    type: "Two Bedroom",
    county: "Nairobi",
    location: "Kasarani",
    sublocation: "Mwiki",
    mapLink: "https://maps.google.com/?q=Mwiki, Nairobi",
    rent: 25000,
    deposit: 50000,
    landlord: "James Mwangi",
    phone: "0734567890",
    status: "Occupied",
    images: [
   "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
],
    amenities: ["Water", "Parking", "WiFi", "CCTV", "Balcony"],
  },

  {
    id: 4,
    code: "NC004",
    title: "Luxury Three Bedroom",
    type: "Three Bedroom",
    county: "Nairobi",
    location: "Embakasi",
    sublocation: "Imara Daima",
    mapLink: "https://maps.google.com/?q=Imara Daima, Nairobi",
    rent: 40000,
    deposit: 80000,
    landlord: "Grace Njeri",
    phone: "0745678901",
    status: "Available",
    images: [
  "https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=800&q=80",
],
    amenities: ["Parking", "Water", "CCTV", "Security", "Balcony"],
  },

  {
    id: 5,
    code: "NC005",
    title: "Affordable Single Room",
    type: "Single Room",
    county: "Kiambu",
    location: "Githurai",
    sublocation: "Githurai 45",
    mapLink: "https://maps.google.com/?q= Githurai, Kiambu",
    rent: 5000,
    deposit: 10000,
    landlord: "Peter Kariuki",
    phone: "0756789012",
    status: "Available",
    images: [
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
],
    amenities: ["Water", "Electricity", "Shared Bathroom", "Security"],
  },

  {
      id: 6,
      code: "NC006",
      title: "Family House",
      type: "Family House",
      county: "Kiambu",
      location: "Ruiru",
      sublocation: "Membley",
      mapLink: "https://maps.google.com/?q=Membley,Ruiru",
      rent: 60000,
      deposit: 120000,
      landlord: "Joseph Maina",
      phone: "0711001122",
      status: "Available",
      images: [
   "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80",
],
      amenities: ["Garden", "Parking", "WiFi", "Security", "Water"],
    },
  
    {
      id: 7,
      code: "NC007",
      title: "Executive Maisonette",
      type: "Maisonette",
      county: "Nairobi",
      location: "South C",
      sublocation: "South C Estate",
      mapLink: "https://maps.google.com/?q= South C, Nairobi",
      rent: 85000,
      deposit: 170000,
      landlord: "Alice Njeri",
      phone: "0722112233",
      status: "Available",
      images: [
   "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
],
      amenities: ["Garden", "Garage", "CCTV", "Electric Fence", "Balcony"],
    },
  
    {
      id: 8,
      code: "NC008",
      title: "Studio Apartment",
      type: "Apartment",
      county: "Nairobi",
      location: "Westlands",
      sublocation: "Westlands Central",
      mapLink: "https://maps.google.com/?q=Westlands Central, Nairobi",
      rent: 55000,
      deposit: 110000,
      landlord: "David Otieno",
      phone: "0700112233",
      status: "Available",
      images: [
   "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=80",
],
      amenities: ["Lift", "Gym", "Swimming Pool", "WiFi", "Parking"],
    },
  
    {
      id: 9,
      code: "NC009",
      title: "Affordable Bedsitter",
      type: "Bedsitter",
      county: "Kiambu",
      location: "Juja",
      sublocation: "Juja Farm",
      mapLink: "https://maps.google.com/?q= Juja, Kiambu",
      rent: 7000,
      deposit: 14000,
      landlord: "Brian Kariuki",
      phone: "0715678901",
      status: "Available",
      images: [
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
],
      amenities: ["Water", "Electricity", "Parking", "Security"],
    },
  
    {
      id: 10,
      code: "NC010",
      title: "Executive Apartment",
      type: "Apartment",
      county: "Nairobi",
      location: "Kilimani",
      sublocation: "Kilimani Estate",
      mapLink: "https://maps.google.com/?q= Kilimani, Nairobi",
      rent: 95000,
      deposit: 190000,
      landlord: "Kevin Mwangi",
      phone: "0799123456",
      status: "Available",
      images: [
   "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80",
],
      amenities: ["Swimming Pool", "Gym", "Lift", "Parking", "Security"],
    },
  ];

  async function seedDatabase() {
  try {
    await connectDB();

    // Remove existing houses
    await House.deleteMany();

    console.log("🗑 Old houses deleted");

    // Insert demo houses
    await House.insertMany(houses);

    console.log("✅ Demo houses inserted successfully!");

    process.exit();

  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seedDatabase();

  
