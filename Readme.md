# Loan Application

## Overview

This project is a **React Native-based Loan Application** built using **Expo**, featuring an expandable and collapsible stack framework. The application provides a step-by-step interface for selecting a loan amount, customizing EMI plans, and linking bank accounts, with dynamic views for an interactive user experience.

## Features

- **Expandable & Collapsible Views**: Toggle between minimal (collapsed) and detailed (expanded) information for each view.
- **Dynamic Data Loading**: Data is fetched from a mock API to populate loan options and bank details.
- **Dark Mode**: Users can switch between light and dark themes.
- **Loan Amount Selection**: A circular slider to select or manually input the loan amount.
- **Custom EMI Options**: Choose from multiple EMI plans or calculate a custom EMI.
- **Responsive Design**: Optimized for different devices and screen sizes.

## Project Structure

- **App.jsx**: Contains the main application logic, including the stack framework for expandable and collapsible views.
- **StackViewManager.js**: Manages view states, ensuring only one view is expanded at a time.
- **Components**: Includes reusable components like `CircularSlider`, `EMIOption`, and `BankAccountSelection` for the loan application process.
- **API Integration**: Uses a mock API to fetch data dynamically.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js** (v12 or later): [Download](https://nodejs.org/)
- **npm** (included with Node.js)
- **Expo CLI**: Install via:
  ```bash
  npm install -g expo-cli


## Installation
### Clone the Repository:

git clone ****
cd CRED-PROJECT-APP

### Install Dependencies:
   ```bash 
   npm install
   ```


## Create an Expo Account (if you don't have one):
Sign up at https://expo.dev.

***Remember your username and password; you'll need them to run the app.***
**Running the Application Locally**
###Start the Development Server:
```bash
expo start
```

**This will open Expo DevTools in your browser.**
###Open on a Device or Emulator:

- **Expo Go App (Physical Device)**: Install Expo Go, scan the QR code from Expo DevTools.
- **iOS Simulator (Mac only)**: Press i in the terminal or select "Run on iOS simulator" in Expo DevTools.
- **Android Emulator** : Press a in the terminal or select "Run on Android emulator" in Expo DevTools. Ensure an emulator is set up in Android Studio.

## Application Structure

- **App.jsx:** Main application logic with stack views for expanded and collapsed states.
- **StackViewManager.js:** Manages the state for toggling views, ensuring only one view is expanded at a time.
- **Components:** Contains reusable UI components like CircularSlider, EMIOption, and BankAccountSelection.
Expandable and Collapsible Views

### The project features a stack framework that supports expandable and collapsible views:

- **Collapsed State:** Displays minimal information, like titles or icons.

- **Expanded State:** Shows detailed information, such as loan amount and EMI plans.

### Toggle Functionality: Clicking on any collapsed view expands it, and collapses the currently expanded view.

## Building for Production
To create an APK file for Android:
**Install EAS CLI:**
```bash
npm install -g eas-cli
```

**Run the Build Command:**
```bash
eas build -p android --profile preview
```

This will generate an APK file that can be downloaded and installed on Android devices

The link To download the APK : https://expo.dev/accounts/riyamunjal/projects/Cred-project-app/builds/37022e57-2328-42e7-823e-0570a1393257



