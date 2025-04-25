# Vacation-planner - React application

A simple React application for browsing travel destinations, saving favorites to a personal trip list, and adding new destinations to a shared database.

## Description

This application allows users to:
* View a list of travel destinations fetched from a local API (`json-server`).
* Filter destinations by category (Beach, Mountain, City, etc.).
* Search for destinations by name.
* Sort destinations alphabetically.
* View detailed information about a specific destination.
* Add or remove destinations from a persistent "My Trip" list (using `localStorage`).
* Add new destinations to the shared database via a form.

## Features

* **Destination Browsing:** Explore page displays destination cards with images, names, and descriptions.
* **Filtering & Sorting:** Filter destinations by category and sort by name (A-Z, Z-A).
* **Search:** Search bar to find destinations by name.
* **Detailed View:** Dedicated page for each destination showing more details and images.
* **My Trip:** A personal list where users can save destinations they are interested in. This list persists across browser sessions using `localStorage`.
* **Add Destination:** A form to contribute new destinations to the `db.json` database.
* **Responsive Design:** Built with Tailwind CSS for adaptability across different screen sizes.
* **Local API:** Uses `json-server` to simulate a REST API using a local `db.json` file.

## Tech Stack

* **Frontend:**
    * [React](https://reactjs.org/) (v18+)
    * [React Router DOM](https://reactrouter.com/) (v6+) for navigation
    * [Tailwind CSS](https://tailwindcss.com/) for styling
    * [Lucide React](https://lucide.dev/) for icons
    * (Optional) [React Context API](https://reactjs.org/docs/context.html) (if `TripContext` is implemented)
* **Backend (Mock API):**
    * [json-server](https://github.com/typicode/json-server)
* **Development Environment:**
    * [Node.js](https://nodejs.org/) (LTS version recommended)
    * [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## Prerequisites

Before you begin, ensure you have the following installed on your system:
* Node.js (which includes npm) - Download from [nodejs.org](https://nodejs.org/)

## Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd <repository-directory-name>
    ```

2.  **Install frontend dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Install json-server (if not already installed globally):**
    ```bash
    npm install -g json-server
    # or install locally as a dev dependency
    # npm install --save-dev json-server
    ```

## Running the Application

You need to run two separate processes: the React development server and the `json-server`.

1.  **Start the JSON Server:**
    * Make sure you have a `db.json` file in the root of your project (or adjust the path accordingly).
    * Open a terminal window and run:
        ```bash
        npx json-server --watch db.json --port 3000
        ```
        * This will start a mock API server accessible at `http://localhost:3000`.
        * The `--watch` flag automatically updates the server if `db.json` changes.

2.  **Start the React Development Server:**
    * Open a *second* terminal window (leave the `json-server` running).
    * Run:
        ```bash
        npm start
        # or
        yarn start
        ```
        * This will typically start the React application and open it in your default browser, usually at `http://localhost:5173` (for Vite) or `http://localhost:3001` (for Create React App, adjust if different).

Now you should be able to access the application in your browser and interact with the destinations fetched from `json-server`.

## Project Structure (Example)



/
|-- public/
| |-- assets/ # Static assets like images
| | |-- destinations/
| |-- index.html # Main HTML file
|-- src/
| |-- components/ # Reusable UI components (e.g., DestinationCard.js)
| |-- context/ # React Context files (e.g., TripContext.js)
| |-- pages/ # Page components (e.g., HomePage.js, Explore.js, DestinationPage.js, MyTrip.js)
| |-- App.js # Main application component with routing
| |-- index.css # Global styles / Tailwind directives
| |-- index.js # Entry point for React app
|-- .gitignore
|-- db.json # Local database file for json-server
|-- package.json
|-- README.md # This file
|-- tailwind.config.js # Tailwind configuration
|-- vite.config.js # Vite configuration (if using Vite)
## API (`db.json`)

The `db.json` file serves as the local database. `json-server` automatically creates RESTful routes based on the top-level keys in this file.

**Example `db.json` structure:**

```json
{
  "destinations": [
    {
      "id": 1,
      "name": "Bali",
      "category": "Beach",
      "description": "Bali is an Indonesian island...",
      "images": [
        "/assets/destinations/Bali/Bali1.jpg",
        "/assets/destinations/Bali/Bali2.jpg"
      ]
    },
    {
      "id": 2,
      "name": "Maldives",
      "category": "Beach",
    }
  ]
}


API Endpoints created by json-server:
GET /destinations - Retrieve all destinations
GET /destinations/:id - Retrieve a specific destination by ID
POST /destinations - Add a new destination (requires JSON body)
PUT /destinations/:id - Update a destination completely
PATCH /destinations/:id - Partially update a destination
DELETE /destinations/:id - Delete a destination
