{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww28600\viewh16380\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // ------------------------\
// Meal Data by Category\
// ------------------------\
const meals = \{\
  chicken: [\
    "Butter Chicken",\
    "Crispy Garlic Chicken",\
    "Chicken Souvlaki",\
    "Cashew Chicken",\
    "Peanut Curry Chicken",\
    "Adobo Chicken",\
    "Crispy Sweet Chili Chicken",\
    "Chicken Nuggets",\
    "Chicken Fajitas",\
    "Teriyaki Chicken"\
  ],\
  lamb: [\
    "Lovely Lamb Hot Pot",\
    "Aromatic Lamb Curry",\
    "Shepherd\'92s Pie"\
  ],\
  beef: [\
    "Beef Tacos",\
    "Beef Stew",\
    "Big Mac Smashed Tacos",\
    "Beef Stroganoff"\
  ],\
  veg: [\
    "Cauliflower Cheese",\
    "Vegan Buddha Bowl",\
    "Vegetable Curry",\
    "Stuffed Peppers"\
  ],\
  pizza: [\
    "Homemade Pizza",\
    "BBQ Chicken Pizza",\
    "Margherita Pizza",\
    "Pepperoni Pizza"\
  ],\
  pasta: [\
    "Easy Sausage Carbonara",\
    "Spaghetti and Turkey Meatballs",\
    "Pasta Alfredo",\
    "Ready Spaghetti",\
    "Lasagna"\
  ],\
  potato: [\
    "Jacket Potato",\
    "Loaded Potato Skins",\
    "Potato and Leek Soup"\
  ],\
  sausage: [\
    "Sausage and Mash",\
    "Sausage Pasta Bake",\
    "Sausage Casserole"\
  ]\
\};\
\
// ------------------------\
// Global Variables\
// ------------------------\
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];\
const categoryContainer = document.getElementById("categoryContainer");\
const planDiv = document.getElementById("plan");\
const errorDiv = document.getElementById("error");\
const planButton = document.getElementById("planButton");\
\
// ------------------------\
// Create category input UI dynamically\
// ------------------------\
Object.keys(meals).forEach(category => \{\
  const div = document.createElement("div");\
  div.className = "category";\
  div.innerHTML = `\
    <label>$\{capitalize(category)\}</label>\
    <input type="number" id="$\{category\}" min="0" max="5" value="0" />\
  `;\
  categoryContainer.appendChild(div);\
\});\
\
// ------------------------\
// Event Listeners\
// ------------------------\
planButton.addEventListener("click", generatePlan);\
\
// ------------------------\
// Functions\
// ------------------------\
\
function generatePlan() \{\
  planDiv.innerHTML = "";\
  errorDiv.textContent = "";\
\
  const inputs = categoryContainer.querySelectorAll("input");\
  let total = 0;\
  const selections = \{\};\
\
  inputs.forEach(input => \{\
    const value = parseInt(input.value) || 0;\
    selections[input.id] = value;\
    total += value;\
  \});\
\
  if (total !== 5) \{\
    errorDiv.textContent = "\uc0\u10060  Please ensure your total adds up to exactly 5 meals.";\
    return;\
  \}\
\
  let selectedMeals = [];\
\
  // Pick random meals per category\
  for (let category in selections) \{\
    const count = selections[category];\
    if (count > 0) \{\
      const options = [...meals[category]];\
      const shuffled = shuffleArray(options);\
      selectedMeals.push(...shuffled.slice(0, count));\
    \}\
  \}\
\
  // Display meals\
  selectedMeals.forEach((meal, index) => \{\
    const dayDiv = document.createElement("div");\
    dayDiv.className = "day";\
    dayDiv.innerHTML = `\
      <h3>$\{days[index]\}</h3>\
      <p>$\{meal\}</p>\
    `;\
    planDiv.appendChild(dayDiv);\
  \});\
\}\
\
// Helper: Capitalize category names\
function capitalize(word) \{\
  return word.charAt(0).toUpperCase() + word.slice(1);\
\}\
\
// Helper: Shuffle array\
function shuffleArray(array) \{\
  return array.sort(() => 0.5 - Math.random());\
\}\
}