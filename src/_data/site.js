const site = {
  "name": "Oaktree Landscaping",
  "url": "https://www.oaktree-landscaping.com",
  "email": "oaktreelandscaper@gmail.com",
  "phone": "(843) 227-1210",
  "phoneHref": "+18432271210",
  "description": "Professional residential and commercial landscaping, lawn care, hardscaping, irrigation, lighting, and tree services in the South Carolina Lowcountry.",
  "defaultImage": "/assets/social/home.jpg",
  "analyticsId": "",
  "address": {
    "street": "26504 Whyte Hardee Boulevard",
    "city": "Hardeeville",
    "state": "SC",
    "postalCode": "29927",
    "country": "US"
  },
  "mapUrl": "https://maps.app.goo.gl/2bD1zr43i5CmkfAk7",
  "nav": [
    { "label": "Home", "url": "/" },
    { "label": "About Us", "url": "/about/" },
    { "label": "Services", "url": "/services/" },
    { "label": "Our Projects", "url": "/projects/" },
    { "label": "Contact Us", "url": "/contact/" }
  ],
  "social": [
    { "label": "Facebook", "url": "https://www.facebook.com/oaktreelandscaper", "icon": "facebook" },
    { "label": "Instagram", "url": "https://www.instagram.com/oaktreelandscaper", "icon": "instagram" },
    { "label": "X", "url": "https://x.com/OaktreeLndscape", "icon": "twitter-x" },
    { "label": "Google Business", "url": "https://share.google/DQWYZ0XO8H2zXA7bh", "icon": "google" },
    { "label": "Yelp", "url": "https://www.yelp.com/user_details?userid=andHa8MtqORJtmY9rHnxHg", "icon": "yelp" },
    { "label": "LinkedIn", "url": "https://www.linkedin.com/in/oaktree-landscaping/", "icon": "linkedin" },
    { "label": "Nextdoor", "url": "https://nextdoor.com/page/oaktree-landscaping-1/", "icon": "house-heart" }
  ],
  "hours": [
    ["Mon", "9:00 AM - 5:00 PM"],
    ["Tue", "9:00 AM - 5:00 PM"],
    ["Wed", "9:00 AM - 5:00 PM"],
    ["Thu", "9:00 AM - 5:00 PM"],
    ["Fri", "9:00 AM - 5:00 PM"],
    ["Sat", "Closed"],
    ["Sun", "Closed"]
  ]
};

export default {
  ...site,
  url: process.env.SITE_URL || site.url
};
