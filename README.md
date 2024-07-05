
# Volunteer Management System

## 📚 Overview

The **Volunteer Management System** is a comprehensive web application designed to connect volunteers with meaningful local opportunities. This platform enables organizations to post volunteer activities and manage interactions with volunteers, while volunteers can discover and participate in events in their area. The system also includes role-based access controls to provide different functionalities for admins, organizations, and volunteers.

## 🌟 Features

- **User Authentication & Role-Based Access**: Secure login system with role-based access for Admins, Organizations, and Volunteers.
- **Event Management**: Organizations can create, update, and delete volunteer events, while volunteers can view and participate in these events.
- **User Profiles**: Users can view and update their profile information, including role-specific details.
- **Participation Tracking**: Volunteers can see the list of events they have participated in.
- **Responsive Design**: A modern, responsive UI that works seamlessly on both desktop and mobile devices.
- **Theme Toggle**: A light/dark mode toggle for a better user experience across different environments.

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or later)
- [npm](https://www.npmjs.com/) (or [Yarn](https://classic.yarnpkg.com/) as an alternative)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/mdeeksha0301/volunteer-management-system.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd volunteer-management-system
   ```

3. **Install the dependencies:**

   ```bash
   npm install
   ```

4. **Set up environment variables:**

   Create a `.env` file in the root directory and add the following variables:

   ```plaintext
   MONGODB_URI=mongodb://localhost:27017/volunteer-management
   JWT_SECRET=your_jwt_secret_key
   ```

5. **Start the development server:**

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`.

### Usage

1. **Visit the Application:**

   Open your web browser and go to [http://localhost:3000](http://localhost:3000).

2. **Register and Log In:**

   - Register as an Admin, Organization, or Volunteer.
   - Log in to access role-specific features.

3. **Explore Features:**

   - **Admins** can manage users and events.
   - **Organizations** can create and manage volunteer events.
   - **Volunteers** can browse and sign up for events.

4. **Switch Themes:**

   Use the theme toggle switch to switch between light and dark modes.

### API Endpoints

The API endpoints are available at `http://localhost:8000/api`.

- **POST /auth/login**: Log in with your email and password.
- **GET /auth/current-user**: Get the current logged-in user’s details.
- **GET /event/participated/:userId**: Get events participated by a specific user.
- **POST /event/create**: Create a new volunteer event (Organization only).
- **PUT /event/update/:eventId**: Update an existing event (Organization only).
- **DELETE /event/delete/:eventId**: Delete an existing event (Organization only).

### Technologies Used

- **Frontend:** React, TypeScript, Tailwind CSS
- **Backend:** Node.js, Express.js, TypeScript, MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **API Requests:** Axios
- **State Management:** Context API
- **UI Icons:** React Icons




