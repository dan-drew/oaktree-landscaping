const site = {
  "name": "Oaktree Landscaping",
  "url": "https://www.oaktree-landscaping.com",
  "email": "oaktreelandscaper@gmail.com",
  "description": "Professional residential and commercial landscaping, lawn care, hardscaping, irrigation, lighting, and tree services in the South Carolina Lowcountry.",
  "defaultImage": "/assets/social/home.jpg",
  "analyticsId": "",
  "nav": [
    { "label": "Home", "url": "/" },
    { "label": "About Us", "url": "/about/" },
    { "label": "Services", "url": "/services/" },
    { "label": "Our Projects", "url": "/projects/" },
    { "label": "Contact Us", "url": "/contact/" }
  ],
  "social": [
    { "label": "Google Business", "url": "https://share.google/DQWYZ0XO8H2zXA7bh", "icon": "google" },
    { "label": "Yelp", "url": "https://www.yelp.com/user_details?userid=andHa8MtqORJtmY9rHnxHg", "icon": "yelp" },
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
