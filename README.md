Here’s the updated README file reflecting the fact that you’re using **Laravel Sanctum** for authentication instead of **Laravel Passport**:

---

# Laravel 11 & React - Hotel Management System

This project is a Hotel Management System built with **Laravel 11** as the backend and **React** as the frontend. It includes user authentication, hotel management features, and more.

## Features

### User Authentication
- Implemented user authentication with **Access Token** using **Laravel Sanctum** for secure API authentication.

### Social Login
- Users can log in or register using "Continue with Google" (OAuth login) through the **Laravel Socialite** package.

### Parallel and Intercepting Routing
- Login and Registration forms are displayed in modals, but when the page is reloaded, they appear as separate pages.

### Server-Side Rendering for Manage Hotels Page
- Fetches property data from the database and renders the **Manage Hotels** page on the server side to improve performance and SEO.

### Pagination for Manage Hotels Page
- The **Manage Hotels** page displays a maximum of 8 properties at a time.
- Pagination is implemented to navigate through properties if there are more than 8.

### Property Card Details
- Each property card on the **Manage Hotels** page displays:
  - Property name
  - Address
  - Cost per night
  - Number of available rooms
  - Property image
  - Average rating

### Property Details Navigation
- Clicking a property card redirects the user to the **Property Details** page.

### Social Media Sharing
- Social media buttons are integrated on the **Property Details** page to allow users to share property details on platforms like Facebook, Twitter, etc.

### Hotel Creation Feature
- A **Create Hotel** button on the **Manage Hotels** page allows users to add a new hotel/property to the system.

### Hotel Editing Feature
- Clicking the **Edit** button on any property card navigates the user to the **Create Hotel** page to update property details.

### Hotel Deletion Feature
- Clicking the **Delete** button on a property card prompts a confirmation alert.
- If confirmed, the property is deleted from the database.

### Error Handling
- Proper error handling for "Not Found" and other errors using custom error pages.

---

## Tech Stack
- **Backend**: Laravel 11, Sanctum (for API authentication), Laravel Socialite (for social login)
- **Frontend**: React (with React Router for routing), Axios (for HTTP requests)
- **Database**: MySQL (for storing property and user data)

---

## Installation

### Prerequisites
- PHP 8.0 or higher
- Composer
- Node.js and npm
- MySQL or any other relational database
- Laravel 11

### Backend Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/arpa12/Assignment_Hotel_Management_System.git
    cd Assignment_Hotel_Management_System\backend
    ```

2. Install PHP dependencies using Composer:

    ```bash
    composer install
    ```

3. Create and set up the `.env` file for database and API configurations:

    ```bash
    cp .env.example .env
    ```

4. Set up the database in `.env` file:

    ```bash
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=hotel_management
    DB_USERNAME=root
    DB_PASSWORD=
    ```

5. Generate application key:

    ```bash
    php artisan key:generate
    ```

6. Run database migrations and seeders:

    ```bash
    php artisan migrate --seed
    ```

7. Install Sanctum for API authentication:

    ```bash
    php artisan install:api
    ```

8. Start the Laravel development server:

    ```bash
    php artisan serve
    ```

---

### Frontend Setup

1. Navigate to the frontend directory:

    ```bash
    cd ../frontend
    ```

2. Install Node.js dependencies:

    ```bash
    npm install
    ```

3. Run the development server:

    ```bash
    npm start
    ```

The React frontend will now be accessible at [http://localhost:3000](http://localhost:3000).

---

## Usage

### Authentication
- The login and registration pages are accessible from the main UI.
- Social login via **Google** is available.
- Once logged in, users will receive an **Access Token** for session management.

### Hotel Management
- Navigate to the **Manage Hotels** page to view, create, edit, and delete hotels.
- Property cards display the name, address, cost, rooms available, image, and average rating.
- Pagination is enabled to limit the display to 8 properties at a time.

### Property Details
- Clicking on a property card navigates to a detailed page where users can see more information.
- Social media sharing buttons are available for sharing the property link.

---

### Error Handling
- **Not Found**: If a user tries to access a non-existent page, a custom 404 page will be displayed.
- **Server Errors**: If there is an internal server error, a user-friendly error page will be shown.


---

## Contribution

Feel free to fork this project and contribute by submitting pull requests. If you find any issues or bugs, please create an issue.

---


