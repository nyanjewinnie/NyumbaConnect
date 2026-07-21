import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const HouseContext = createContext();

export function HouseProvider({ children }) {

  // ================= PROPERTIES =================

  const [houses, setHouses] = useState([

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
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80",
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
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
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
    image: "https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=800&q=80",
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
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
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
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80",
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
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
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
    image: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=80",
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
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
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
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80",
    amenities: ["Swimming Pool", "Gym", "Lift", "Parking", "Security"],
  },
]);

  // ================= FAVORITES =================

  const [favorites, setFavorites] = useState([]);

  // ================= VIEWING REQUESTS =================

  const [viewingRequests, setViewingRequests] = useState([]);

  const addViewingRequest = (request) => {
  setViewingRequests((prev) => [...prev, request]);
};

const approveViewingRequest = async (id) => {
  try {
    const response = await axios.put(
  `${import.meta.env.VITE_API_URL}/viewing-requests/${id}`,
  {
    status: "Approved",
  }
);

    setViewingRequests((prev) =>
      prev.map((request) =>
        request._id === id ? response.data : request
      )
    );

    setNotifications((prev) => [
      ...prev,
      "✅ Your viewing request has been approved."
    ]);

  } catch (error) {
    console.error(error);
  }
};

const declineViewingRequest = async (id) => {
  try {
    const response = await axios.put(
  `${import.meta.env.VITE_API_URL}/viewing-requests/${id}`,
  {
    status: "Declined",
  }
);

    setViewingRequests((prev) =>
      prev.map((request) =>
        request._id === id ? response.data : request
      )
    );

    setNotifications((prev) => [
      ...prev,
      "❌ Your viewing request has been declined."
    ]);

  } catch (error) {
    console.error(error);
  }
};

const addHouse = (house) => {

  const newHouse = {
    id: Date.now(),
    code: `NC${Date.now().toString().slice(-4)}`,
    title: house.title,
    image: house.images?.[0] || house.image,
    images: [house.images?.[0] || house.image],
    county: house.county,
    location: house.location,
    sublocation: house.sublocation,
    type: house.type,
    rent: Number(house.rent),
    deposit: Number(house.deposit),
    landlord: house.landlord,
    phone: house.phone,
    status: house.status,
    amenities: [],
  };

  setHouses((prev) => [...prev, newHouse]);

  setNotifications((prev) => [
    ...prev,
    `🏠 New ${house.type} added in ${house.location}.`,
  ]);
};

const deleteHouse = async (id) => {
  try {
    await axios.delete(`${import.meta.env.VITE_API_URL}/houses/${id}`);

    setHouses((prev) =>
      prev.filter((house) => (house._id || house.id) !== id)
    );

    setNotifications((prev) => [
      ...prev,
      "🗑 Property deleted successfully."
    ]);

  } catch (error) {
    console.error("Delete Error:", error);
  }
};

const updateHouse = (updatedHouse) => {
  setHouses((prev) =>
    prev.map((house) =>
      (house._id || house.id) === (updatedHouse._id || updatedHouse.id)
        ? { ...house, ...updatedHouse }
        : house
    )
  );

  setNotifications((prev) => [
    ...prev,
    `✏️ ${updatedHouse.title} updated successfully.`,
  ]);
};

const updateHouseStatus = async (house) => {
  try {
    const newStatus =
      house.status === "Available"
        ? "Occupied"
        : "Available";

    const response = await axios.put(
  `${import.meta.env.VITE_API_URL}/houses/${house._id}`,
  {
    ...house,
    status: newStatus,
  }
);

    setHouses((prev) =>
      prev.map((item) =>
        item._id === house._id ? response.data : item
      )
    );

    setNotifications((prev) => [
      ...prev,
      `${house.title} is now ${newStatus}.`,
    ]);

  } catch (error) {
    console.error(error);
  }
};
  

  // ================= NOTIFICATIONS =================

  const [notifications, setNotifications] = useState([]);

  //================ FETCH HOUSES FROM BACKEND =============

  useEffect(() => {
  const fetchHouses = async () => {
    try {
      const response = await axios.get(
  `${import.meta.env.VITE_API_URL}/houses`
);
      console.log("Fetched houses:", JSON.stringify(response.data, null, 2));

      if (response.data.length > 0) {
        setHouses(response.data);
      }
    } catch (error) {
      console.error("Error fetching houses:", error);
    }
  };

  fetchHouses();
}, []);

//================ FETCH VIEWING REQUESTS =============

useEffect(() => {
  const fetchViewingRequests = async () => {
    try {
      const response = await axios.get(
  `${import.meta.env.VITE_API_URL}/viewing-requests`
);

      setViewingRequests(response.data);

    } catch (error) {
      console.error("Error fetching viewing requests:", error);
    }
  };

  fetchViewingRequests();
}, []);

  return (
    <HouseContext.Provider
      value={{
  houses,
  setHouses,
  addHouse,
  updateHouse,
  deleteHouse,
  updateHouseStatus,

  favorites,
  setFavorites,

  viewingRequests,
  setViewingRequests,
  addViewingRequest,
  approveViewingRequest,
  declineViewingRequest,

  notifications,
  setNotifications,
}}
      
    >
      {children}
    </HouseContext.Provider>
  );
}