![Screenshot 2024-08-15 at 16 39 17](https://github.com/user-attachments/assets/65746fdd-d58e-4703-b622-74efb5e5141e)





------------------------------------------------------------------------------------------------------------------------------
# Earth LOOP 

Welcome to the EarthLOOP application! This application is designed to track,measure and offset carbon emissions. This project uses React for the frontend and Node.js/Express for the backend. Database is MongdoDB. I use REST API to connect to the third party to meausre the carbon emissions and mapping offset strategy.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Getting Started](#getting-started)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

The EarthLOOP helps users track and manage their carbon emissions related to flights,food, household and more. So far it allows users to:
- Add and view flight emission data.
- Display a list of recorded flights and their emissions.
- Add and view food emission data.(processing)
- Display a dashboard for the food emission.(processing)

...

## Features

- **Frontend:**
  - Built with React.
  - Allows users to add and view flight emissions.
  - Responsive design with a clean user interface.
  - *public/**: Contains static assets.
  - **src/**: Main source code for the Vue.js applicatioin
   - **components/**: Reusable Vue Components.
   - **views/**: Vue Components represeting differenting pages.
   - **router**: Vue Router setup for navigation.
   - **store/**: Vue store for state management.
-**vue.config.js**: Vue CLI configuration.
-**package.json**: Dependencies and scripts.

- **Backend:**
  - Built with Node.js and Express.
  - Provides API endpoints to manage flight emissions and retrieve data.
  - Connects to a database to store and retrieve flight records.
  -**controllers/**: Handles business logic and HTTP requests.
  -**models/**: Defines the data stucture and schemas.
  -**routes/**: Maps endpoints to controllers.
  -**services/**: Configuration files for various aspects of the application.
  -**middleware/**: OIncludes middleware functions for request processing.
  -**app.js**: Main application setup.
  -**server.js**: Initializes the server.

## Getting Started

To get started with this project, follow these instructions to set up both the backend and frontend environments.

### Backend Setup

**Run the server:**

```bash
npm start
```

------------------------------------------------------------------------------------------------------ 

## Author
-Huiping Li

### License
MIT License. This project is licensed under the MIT License.
