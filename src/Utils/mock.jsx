
export const restaurants = [
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
    name: "The Gourmet Kitchen",
    city: "New York",
    cuisineType: "Italian",
    address: "123 Culinary Lane, New York, NY",
    phoneNumber: "(123) 456-7890",
    email: "info@gourmetkitchen.com",
    rating: 4.5,
    operatingHours: ["Mon-Fri: 11am-10pm", "Sat-Sun: 12pm-11pm"],
    photos: ["https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
    ],
    priceRange: "$$",
    reviews: 120,
    dietaryOptions: ["Vegetarian", "Vegan"],
    discountMessage: "20% off on weekends"
  },
  {
    id: "2",
    url: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
    name: "Sushi Haven",
    city: "Los Angeles",
    cuisineType: "Japanese",
    address: "456 Ocean Avenue, Los Angeles, CA",
    phoneNumber: "(987) 654-3210",
    email: "contact@sushihaven.com",
    rating: 4.7,
    operatingHours: ["Mon-Sun: 11am-9pm"],
    photos: ["https://images.unsplash.com/photo-1565299624946-b28f40a0ae38"],
    priceRange: "$$$",
    reviews: 200,
    dietaryOptions: ["Vegetarian", "Gluten-Free"],
    discountMessage: "Happy hour 5-7 PM"
  }
  // Add more restaurant objects as needed
];


export const carData = [
  {
    "id": "1",
    "make": "Toyota",
    "model": "Camry",
    "year": 2022,
    "color": "White",
    "fuelType": "Gasoline",
    "transmission": "Automatic",
    "seatingCapacity": 5,
    "rentalPricePerDay": 45.0,
    "availabilityStatus": "Available",
    "mileage": 15000,
    "location": "Downtown",
    "licensePlate": "XYZ123",
    "features": ["Air Conditioning", "Bluetooth", "Backup Camera", "GPS"]
  },
  {
    "id": "2",
    "make": "Ford",
    "model": "Explorer",
    "year": 2021,
    "color": "Black",
    "fuelType": "Gasoline",
    "transmission": "Automatic",
    "seatingCapacity": 7,
    "rentalPricePerDay": 70.0,
    "availabilityStatus": "Rented",
    "mileage": 22000,
    "location": "Airport",
    "licensePlate": "ABC987",
    "features": ["All-Wheel Drive", "Bluetooth", "Backup Camera", "GPS", "Heated Seats"]
  },
  {
    "id": "3",
    "make": "Tesla",
    "model": "Model 3",
    "year": 2023,
    "color": "Red",
    "fuelType": "Electric",
    "transmission": "Automatic",
    "seatingCapacity": 5,
    "rentalPricePerDay": 90.0,
    "availabilityStatus": "Available",
    "mileage": 5000,
    "location": "City Center",
    "licensePlate": "EV2023",
    "features": ["Autopilot", "Bluetooth", "Backup Camera", "GPS", "Heated Seats"]
  },
  {
    "id": "4",
    "make": "Chevrolet",
    "model": "Equinox",
    "year": 2020,
    "color": "Silver",
    "fuelType": "Gasoline",
    "transmission": "Automatic",
    "seatingCapacity": 5,
    "rentalPricePerDay": 50.0,
    "availabilityStatus": "Under Maintenance",
    "mileage": 32000,
    "location": "Suburb",
    "licensePlate": "SUB456",
    "features": ["All-Wheel Drive", "Bluetooth", "Backup Camera", "GPS"]
  },
  {
    "id": "5",
    "make": "Honda",
    "model": "Civic",
    "year": 2021,
    "color": "Blue",
    "fuelType": "Gasoline",
    "transmission": "Manual",
    "seatingCapacity": 5,
    "rentalPricePerDay": 40.0,
    "availabilityStatus": "Available",
    "mileage": 18000,
    "location": "Downtown",
    "licensePlate": "HND123",
    "features": ["Bluetooth", "Backup Camera", "Cruise Control"]
  }
]

export const attractions = [
  {
    id: 1,
    title: "Eiffel Tower Tour",
    location: {
      city: "Paris, France",
      lat: 48.8584,
      lng: 2.2945
    },
    rating: 4.8,
    reviews: 3421,
    price: {
      adult: 30,
      child: 15
    },
    duration: "2 hours",
    highlights: [
      "Skip-the-line access",
      "Guided tour of Eiffel Tower",
      "Panoramic views of Paris"
    ],
    image: "https://via.placeholder.com/150",
    thumbnails: [
      "https://via.placeholder.com/150/eiffel1",
      "https://via.placeholder.com/150/eiffel2",
      "https://via.placeholder.com/150/eiffel3"
    ],
    description: "Discover the beauty of Paris from the Eiffel Tower with a guided tour and skip-the-line access. Our tour provides unparalleled insights into the history of Paris, its landmarks, and breathtaking skyline.",
    restrictions: {
      ageLimit: "Minimum 5 years",
      dressCode: "Smart casual; no large backpacks",
      groupSize: "Max 20 people per group"
    },
    includes: [
      "Selfie corner with Paris background",
      "Interactive photo booth",
      "Complimentary soft drink"
    ],
    additionalInfo: {
      meetingPoint: "Eiffel Tower entrance, Gate 4",
      guideLanguages: ["English", "French", "Spanish"],
      accessibility: "Wheelchair accessible"
    },
    contact: {
      phone: "+33 1 23 45 67 89",
      email: "info@eiffeltourtours.com",
      address: "Champ de Mars, 5 Avenue Anatole, Paris, France"
    }
  },
  {
    id: 2,
    title: "Colosseum and Roman Forum Tour",
    location: {
      city: "Rome, Italy",
      lat: 41.8902,
      lng: 12.4922
    },
    rating: 4.6,
    reviews: 2897,
    price: {
      adult: 45,
      child: 20
    },
    duration: "3 hours",
    highlights: [
      "Guided tour of Colosseum",
      "Access to Roman Forum and Palatine Hill",
      "Learn about ancient Roman history"
    ],
    image: "https://via.placeholder.com/150",
    thumbnails: [
      "https://via.placeholder.com/150/colosseum1",
      "https://via.placeholder.com/150/colosseum2",
      "https://via.placeholder.com/150/colosseum3"
    ],
    description: "Explore the iconic Colosseum and the historic Roman Forum with an expert guide. Dive into the stories of gladiators, emperors, and the grandeur of ancient Rome.",
    restrictions: {
      ageLimit: "Minimum 7 years",
      dressCode: "Comfortable shoes recommended",
      groupSize: "Max 15 people per group"
    },
    includes: [
      "Virtual reality experience of ancient Rome",
      "Exclusive selfie corner overlooking the Colosseum",
      "Complimentary earphones for tour audio"
    ],
    additionalInfo: {
      meetingPoint: "Colosseum entrance, Gate 3",
      guideLanguages: ["English", "Italian"],
      accessibility: "Not wheelchair accessible"
    },
    contact: {
      phone: "+39 06 1234 5678",
      email: "contact@colosseumtour.com",
      address: "Piazza del Colosseo, 1, Rome, Italy"
    }
  },
  {
    id: 3,
    title: "Great Wall of China Day Trip",
    location: {
      city: "Beijing, China",
      lat: 40.4319,
      lng: 116.5704
    },
    rating: 4.9,
    reviews: 1503,
    price: {
      adult: 60,
      child: 30
    },
    duration: "Full day",
    highlights: [
      "Guided tour of Mutianyu section",
      "Cable car ride included",
      "Lunch provided"
    ],
    image: "https://via.placeholder.com/150",
    thumbnails: [
      "https://via.placeholder.com/150/greatwall1",
      "https://via.placeholder.com/150/greatwall2",
      "https://via.placeholder.com/150/greatwall3"
    ],
    description: "Embark on a day trip to the Mutianyu section of the Great Wall with breathtaking views and a cable car ride. Experience one of the world’s wonders with expert guidance.",
    restrictions: {
      ageLimit: "Minimum 10 years",
      dressCode: "Weather-appropriate attire; no sandals",
      groupSize: "Max 25 people per group"
    },
    includes: [
      "Scenic photo spots",
      "Complimentary traditional Chinese meal",
      "Karaoke bus ride to the Great Wall"
    ],
    additionalInfo: {
      meetingPoint: "Beijing Central Station",
      guideLanguages: ["English", "Mandarin"],
      accessibility: "Partially wheelchair accessible"
    },
    contact: {
      phone: "+86 10 1234 5678",
      email: "info@greatwalltrip.com",
      address: "Mutianyu, Huairou, Beijing, China"
    }
  },
  {
    id: 4,
    title: "Safari Adventure",
    location: {
      city: "Nairobi, Kenya",
      lat: -1.3733,
      lng: 36.8589
    },
    rating: 4.7,
    reviews: 2056,
    price: {
      adult: 120,
      child: 80
    },
    duration: "5 hours",
    highlights: [
      "Guided safari with experienced guide",
      "Wildlife sightings including lions and elephants",
      "Lunch at a scenic spot"
    ],
    image: "https://via.placeholder.com/150",
    thumbnails: [
      "https://via.placeholder.com/150/safari1",
      "https://via.placeholder.com/150/safari2",
      "https://via.placeholder.com/150/safari3"
    ],
    description: "Join us for an unforgettable safari experience in Nairobi National Park with close encounters with wildlife. Perfect for nature lovers and adventure seekers.",
    restrictions: {
      ageLimit: "Minimum 6 years",
      dressCode: "Neutral colors; no strong perfumes",
      groupSize: "Max 12 people per group"
    },
    includes: [
      "Photo op with safari backdrop",
      "On-site refreshments",
      "Souvenir safari hat"
    ],
    additionalInfo: {
      meetingPoint: "Nairobi National Park entrance",
      guideLanguages: ["English", "Swahili"],
      accessibility: "Not wheelchair accessible"
    },
    contact: {
      phone: "+254 20 1234567",
      email: "safari@nairobiadventure.com",
      address: "Nairobi National Park, Nairobi, Kenya"
    }
  }
];
