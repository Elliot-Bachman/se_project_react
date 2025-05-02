# WTWR (What to Wear?) - Frontend

## 🔗 Quick Links

- **Live Demo:** [https://wtwr-demo.mindhackers.org](https://wtwr-demo.mindhackers.org)
- **Backend Repository:** [https://github.com/Elliot-Bachman/se_project_express](https://github.com/Elliot-Bachman/se_project_express)
- **Video Demo:** [Watch on Google Drive](https://drive.google.com/file/d/1xbrzlk5z7OBeLd5K8E1Qhubxu76siqww/view?usp=drive_link)

## �� Table of Contents

1. [About](#about)
2. [Features](#features)
3. [Screenshots](#screenshots)
4. [Technologies](#technologies)
5. [Temperature Guidelines](#temperature-guidelines)
6. [Installation](#installation)
7. [Usage](#usage)
8. [API Integration](#api-integration)

## About

WTWR (What to Wear?) is a weather-based clothing recommendation app that helps users decide what to wear based on the current weather conditions. The app allows users to create their own wardrobe and get personalized clothing suggestions.

## Features

- 👤 User Authentication (Register/Login)
- 🌤️ Real-time Weather Integration
- 👕 Clothing Management (Add/Delete Items)
- ❤️ Like/Unlike Clothing Items
- 📱 Responsive Design
- 🎨 Modern UI/UX

## Screenshots

### Home Page

![Home Page](screenshots/home-page.png)
_Main dashboard showing current temperature and clothing suggestions_

### Add New Garment

![Add Garment Modal](screenshots/add-garment.png)
_Modal for adding new clothing items with weather type selection_

### Profile Page

![Profile Page](screenshots/profile-page.png)
_User profile showing personal clothing collection_

## Technologies

- React.js
- React Router v6
- Context API for State Management
- CSS Modules
- OpenWeather API Integration
- JWT Authentication

## Temperature Guidelines

The app categorizes clothing based on temperature ranges:

- **Hot Weather** (Above 86°F / 30°C)

  - Recommended: Light, breathable clothing
  - Example: T-shirts, shorts, sundresses

- **Warm Weather** (66°F to 85°F / 19°C to 29°C)

  - Recommended: Light layers
  - Example: Light sweaters, long-sleeve shirts

- **Cold Weather** (Below 66°F / 19°C)
  - Recommended: Warm layers
  - Example: Coats, sweaters, warm pants

## Installation

1. Clone the repository

```bash
git clone [your-repository-url]
```

2. Install dependencies

```bash
npm install
```

3. Create a .env file with required variables

```env
REACT_APP_API_URL=https://api.wtwr-demo.mindhackers.org
REACT_APP_WEATHER_API_KEY=[your-weather-api-key]
```

4. Start the development server

```bash
npm run dev
```

## Usage

- Register/Login to access your personal wardrobe
- Add clothing items with weather type tags
- View weather-appropriate clothing suggestions
- Like/unlike items in your collection
- Edit your profile information

## API Integration

The frontend integrates with:

- Backend API for user and clothing data management
- OpenWeather API for real-time weather information

---

Developed as part of the TripleTen Software Engineering Bootcamp
