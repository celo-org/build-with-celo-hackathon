import Nigeria from "../assets/images/nigeria.jpeg";
import SouthAfrica from "../assets/images/south-africa.jpeg";
import usa from "../assets/images/planting-trees.jpeg";
import Turkey from "../assets/images/turkey.jpeg";
import Ghana from "../assets/images/ghana.jpeg";
import Mexico from "../assets/images/mexico.jpeg";
import MyTree1 from "../assets/images/my-tree1.jpeg";
import MyTree2 from "../assets/images/my-tree2.jpeg";
import MyTree3 from "../assets/images/my-tree3.jpeg";
import Expert1 from "../assets/images/expert-img.png";
import Expert2 from "../assets/images/expert2.png";
import Expert3 from "../assets/images/expert3.png";
import Expert4 from "../assets/images/expert4.png";
import Expert5 from "../assets/images/expert5.png";

export const countries = [
  "Nigeria",
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antigua &amp; Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia",
  "Bosnia &amp; Herzegovina",
  "Botswana",
  "Brazil",
  "British Virgin Islands",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Cape Verde",
  "Cayman Islands",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Congo",
  "Cook Islands",
  "Costa Rica",
  "Cote D Ivoire",
  "Croatia",
  "Cruise Ship",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Estonia",
  "Ethiopia",
  "Falkland Islands",
  "Faroe Islands",
  "Fiji",
  "Finland",
  "France",
  "French Polynesia",
  "French West Indies",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guam",
  "Guatemala",
  "Guernsey",
  "Guinea",
  "Guinea Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Isle of Man",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jersey",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kuwait",
  "Kyrgyz Republic",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macau",
  "Macedonia",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Namibia",
  "Nepal",
  "Netherlands",
  "Netherlands Antilles",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Norway",
  "Oman",
  "Pakistan",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Reunion",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Pierre &amp; Miquelon",
  "Samoa",
  "San Marino",
  "Satellite",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "South Africa",
  "South Korea",
  "Spain",
  "Sri Lanka",
  "St Kitts &amp; Nevis",
  "St Lucia",
  "St Vincent",
  "St. Lucia",
  "Sudan",
  "Suriname",
  "Swaziland",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor L'Este",
  "Togo",
  "Tonga",
  "Trinidad &amp; Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks &amp; Caicos",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "Uruguay",
  "Uzbekistan",
  "Venezuela",
  "Vietnam",
  "Virgin Islands (US)",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

export const userType = ["Expert", "User"];

export const locations = [
  {
    id: 1,
    image: Nigeria,
    country: "Nigeria",
    figure: "12, 454",
    route: `/plant-now/${1}`,
  },
  {
    id: 2,
    image: SouthAfrica,
    country: "South Africa",
    figure: "5, 204",
    route: `/plant-now/${2}`,
  },
  {
    id: 3,
    image: Mexico,
    country: "Mexico",
    figure: "14, 719",
    route: `/plant-now/${3}`,
  },
  // {
  //   image: Ghana,
  //   country: "Ghana",
  //   figure: "2, 303",
  //   route: "/plant-now"
  // },
  // {
  //   image: usa,
  //   country: "USA",
  //   figure: "24, 843",
  //   route: "/plant-now"
  // },
  // {
  //   image: Turkey,
  //   country: "Turkey",
  //   figure: "4,923",
  //   route: "/plant-now"
  // },
];

export const myTrees = [
  {
    image: MyTree1,
    country: "United Kingdom",
    type: "Mahogany",
  },
  {
    image: MyTree2,
    country: "United Kingdom",
    type: "Coast Redwood",
  },
  {
    image: MyTree3,
    country: "Sweden",
    type: "Willow",
  },
];

export const states = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT - Abuja",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
];

export const SouthAfricaStates = [
  "Eastern Cape",
  "Free State",
  "Gauteng",
  "KwaZulu-Natal",
  "Limpopo",
  "Mpumalanga",
  "Northern Cape",
  "North West",
  "Western Cape",
];

export const MexicoStates = [
  'Aguascalientes', 'Baja California', 'Baja California Sur' , 'Campeche', 'Coahuila', 'Colima', 'Chiapas', 'Chihuahua', 'Durango', 'Mexico City', 'Guanajuato', 'Guerrero', 'Hidalgo', 'Jalisco', 'Mexico', 'Michoacan', 'Morelos', 'Nayarit', 'Nuevo León', 'Oaxaca', 'Puebla', 'Queretaro', 'Quintana Roo', 'San Luis Potosi', 'Sinaloa', 'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala', 'Veracruz', 'Yucatán', 'Zacatecas'
]

export const allTrees = [
  "Mountain Fig",
  "Bush Fig",
  "Sycamore",
  "Gmelina Tree",
  "Jan Yaro",
  "Mahogany",
  "Bakin Faru",
  "Mango",
  "Moringa",
  "Cashew",
  "African Peach",
];

export const allExperts = [
  {
    name: "Chuks Dave",
    email: "chuksdave@gmail.com",
    title: "Mango Experts",
    image: Expert1,
  },
  {
    name: "Danny Ace",
    email: "danny@gmail.com",
    title: "Mahogany Expert",
    image: Expert2,
  },
  {
    name: "Hexdee",
    email: "hexdee@gmail.com",
    title: "Cashew Expert",
    image: Expert3,
  },
  {
    name: "Jessica Jean",
    email: "jessica@gmail.com",
    title: "Moringa Expert",
    image: Expert4,
  },
  {
    name: "Olalademi Asake",
    email: "asake@gmail.com",
    title: "African Peach Expert",
    image: Expert5,
  },
];
