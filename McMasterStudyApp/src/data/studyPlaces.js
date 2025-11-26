export const studyPlaces = [
  {
    id: 1,
    name: "Mills Memorial Library", 
    type: "Library",
    location: "1280 Main St W",
    coordinates: { 
       latitude: 43.26280286447322, 
       longitude: -79.91763849005183
    },
    rating: 4.5,
    reviews: 127,
    noiseLevel: "Quiet",
    crowdedness: "Moderate",
    hasWifi: true,
    hasPowerOutlets: true,
    nearFood: true,
    hours: "8 AM - 11 PM",
    description: "Main campus library with extensive resources. Popular among students for its spacious study areas and variety of seating options. ",
    amenities: ["Power Outlets", "WiFi", "Printing", "3D Printing"]
  },
  {
    id: 2,
    name: "H.G. Thode Library of Science and Engineering",
    type: "Library",
    location: "1280 Main St W",
    coordinates: { 
      latitude: 43.261361361805925, // Accurate Thode Library coordinates
      longitude: -79.92253620669649 
    },
    rating: 4.3,
    reviews: 98,
    noiseLevel: "Moderate",
    crowdedness: "High",
    hasWifi: true,
    hasPowerOutlets: true,
    nearFood: true,
    hours: "8 AM - 11 PM",
    description: "Science and engineering library with collaborative spaces. Popular among STEM students for group projects and individual study.",
    amenities: ["Power Outlets", "WiFi", "Printing", "Whiteboards", "Computer Labs", "Group Study Rooms"]
  },
  {
    id: 3,
    name: "Centro Café",
    type: "Café",
    location: "1280 Main St W (MUSC)",
    coordinates: { 
      latitude: 43.26181,  // Accurate Centro/MUSC coordinates
      longitude: -79.91941
    },
    rating: 4.0,
    reviews: 84,
    noiseLevel: "Loud",
    crowdedness: "High",
    hasWifi: true,
    hasPowerOutlets: true,
    nearFood: true,
    hours: "8 AM - 8 PM",
    description: "Vibrant café atmosphere, perfect for casual studying with coffee. Located in the McMaster University Student Centre with great food options nearby.",
    amenities: ["Power Outlets", "WiFi", "Food", "Coffee"]
  },
  {
    id: 4,
    name: "Mills Library - Quiet Zone",
    type: "Library",
    location: "Mills Library 4th Floor",
    coordinates: { 
      latitude: 43.26274,  // Mills 4th floor (slightly offset for visibility)
      longitude: -79.91860
    },
    rating: 4.8,
    reviews: 156,
    noiseLevel: "Silent",
    crowdedness: "Low",
    hasWifi: true,
    hasPowerOutlets: true,
    nearFood: false,
    hours: "24/7",
    description: "Ultra-quiet zone for deep focus and concentration. Strictly enforced silent policy makes this ideal for exam preparation and intensive study sessions.",
    amenities: ["Power Outlets", "WiFi", "Silent Policy"]
  },
  {
    id: 5,
    name: "Student Centre Lounge",
    type: "Common Area",
    location: "MUSC 2nd Floor",
    coordinates: { 
      latitude: 43.26195,  // MUSC 2nd floor lounge
      longitude: -79.91955
    },
    rating: 3.8,
    reviews: 62,
    noiseLevel: "Loud",
    crowdedness: "High",
    hasWifi: true,
    hasPowerOutlets: true,
    nearFood: true,
    hours: "7 AM - 11 PM",
    description: "Social study space with comfortable seating. Great for group meetings and casual study sessions. Close to Tim Hortons and other food options.",
    amenities: ["Power Outlets", "WiFi", "Food Nearby", "Comfortable Seating"]
  },
  {
    id: 6,
    name: "Innis Library - Reading Room",
    type: "Library",
    location: "Innis Library, BSB",
    coordinates: { 
      latitude: 43.26005,  // Accurate Innis Library coordinates
      longitude: -79.91801
    },
    rating: 4.6,
    reviews: 73,
    noiseLevel: "Quiet",
    crowdedness: "Low",
    hasWifi: true,
    hasPowerOutlets: true,
    nearFood: false,
    hours: "8 AM - 10 PM",
    description: "Peaceful reading room with traditional library atmosphere. Located in the Burke Science Building, perfect for Science students.",
    amenities: ["Power Outlets", "WiFi", "Study Carrels"]
  },
  {
    id: 7,
    name: "Health Sciences Library",
    type: "Library",
    location: "HSC 1E7",
    coordinates: { 
      latitude: 43.26222,  // Accurate Health Sciences Library coordinates
      longitude: -79.92092
    },
    rating: 4.4,
    reviews: 91,
    noiseLevel: "Quiet",
    crowdedness: "Moderate",
    hasWifi: true,
    hasPowerOutlets: true,
    nearFood: false,
    hours: "7 AM - 12 AM",
    description: "Specialized library for health sciences students with medical resources. Modern facility with excellent study spaces and group rooms.",
    amenities: ["Power Outlets", "WiFi", "Medical Resources", "Group Rooms"]
  },
  {
    id: 8,
    name: "Refectory Study Space",
    type: "Common Area",
    location: "Commons Building",
    coordinates: { 
      latitude: 43.26300,  // Refectory/Commons area
      longitude: -79.91775
    },
    rating: 3.9,
    reviews: 56,
    noiseLevel: "Moderate",
    crowdedness: "High",
    hasWifi: true,
    hasPowerOutlets: true,
    nearFood: true,
    hours: "7 AM - 9 PM",
    description: "Open study area near dining options. Great for taking study breaks with easy access to food. Can get noisy during lunch hours.",
    amenities: ["Power Outlets", "WiFi", "Food", "Large Tables"]
  },
  {
    id: 9,
    name: "Gilmour Hall Lounge",
    type: "Common Area",
    location: "Gilmour Hall",
    coordinates: { 
      latitude: 43.26370,  // Gilmour Hall coordinates
      longitude: -79.91895
    },
    rating: 4.1,
    reviews: 45,
    noiseLevel: "Quiet",
    crowdedness: "Low",
    hasWifi: true,
    hasPowerOutlets: true,
    nearFood: false,
    hours: "8 AM - 10 PM",
    description: "Hidden gem with comfortable seating and natural light. Less crowded than main libraries, perfect for quiet individual study.",
    amenities: ["Power Outlets", "WiFi", "Natural Light", "Comfortable Chairs"]
  },
  {
    id: 10,
    name: "Engineering Library (Thode 3rd Floor)",
    type: "Library",
    location: "Thode Library 3rd Floor",
    coordinates: { 
      latitude: 43.26087,  // Thode 3rd floor (offset for visibility)
      longitude: -79.91938
    },
    rating: 4.7,
    reviews: 112,
    noiseLevel: "Quiet",
    crowdedness: "Moderate",
    hasWifi: true,
    hasPowerOutlets: true,
    nearFood: true,
    hours: "24/7",
    description: "Engineering-focused study space with technical resources. Collaborative atmosphere while maintaining reasonable noise levels for focused work.",
    amenities: ["Power Outlets", "WiFi", "Engineering Resources", "3D Printers"]
  }
];

// McMaster University Main Campus Center Point (for map centering)
export const MCMASTER_CENTER = {
  latitude: 43.26100,
  longitude: -79.91900,
  latitudeDelta: 0.008,  // Zoom level for campus view
  longitudeDelta: 0.008,
};