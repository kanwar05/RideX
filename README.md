# RideX

RideX is a full-stack ride booking application inspired by modern cab platforms. It includes separate rider and captain flows, JWT authentication, Mapbox-powered location search and routing, fare calculation, Socket.IO ride dispatch, live captain location updates, OTP-based ride start, and ride completion.

## Features

- Rider and captain registration/login
- Protected rider and captain dashboards
- Splash and onboarding screens with rider/driver selection
- Pickup and destination autocomplete using Mapbox
- Use current location for pickup
- Fare estimates for car, auto, and moto rides
- Ride creation and nearby captain dispatch
- Captain ride request popup and acceptance flow
- OTP verification before starting a ride
- Live map views for riders and captains
- Socket.IO events for ride confirmation, start, completion, and location tracking
- MongoDB persistence for users, captains, rides, and blacklisted tokens

## Tech Stack

**Frontend**

- React 19
- Vite
- React Router
- Tailwind CSS
- GSAP animations
- Axios
- Socket.IO Client
- MapLibre GL loaded from CDN with Mapbox APIs
- React Icons and Remix Icon

**Backend**

- Node.js
- Express 5
- MongoDB with Mongoose
- Socket.IO
- JWT authentication
- bcryptjs password hashing
- express-validator
- Mapbox Geocoding and Directions APIs

## Project Structure

```text
RideX/
  Backend/
    app.js                  # Express app, middleware, and route mounting
    server.js               # HTTP server and Socket.IO initialization
    socket.js               # Socket.IO events and emit helpers
    controllers/            # Request handlers
    routes/                 # API route definitions
    services/               # Business logic and Mapbox integrations
    models/                 # Mongoose schemas
    middlewares/            # JWT auth middleware
    db/                     # MongoDB connection
  frontend/
    src/
      pages/                # Rider, captain, auth, splash, and ride pages
      components/           # Maps, panels, popups, navbar, and UI pieces
      context/              # User, captain, and socket contexts
      services/             # Map and socket helpers
      assets/               # Images and static frontend assets
```

## Prerequisites

- Node.js and npm
- MongoDB database URL
- Mapbox access token

## Environment Variables

Create `Backend/.env`:

```env
PORT=4000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
MAPBOX_API_KEY=your_mapbox_access_token
```

Create `frontend/.env`:

```env
VITE_BASE_URL=http://localhost:4000
VITE_MAPBOX_ACCESS_TOKEN=your_mapbox_access_token
```

The frontend also checks `VITE_MAPBOX_TOKEN`, but `VITE_MAPBOX_ACCESS_TOKEN` is the clearest name to use.

## Installation

Install backend dependencies:

```bash
cd Backend
npm install
```

Install frontend dependencies:

```bash
cd ../frontend
npm install
```

## Running Locally

Start the backend API and Socket.IO server:

```bash
cd Backend
npm start
```

By default the backend runs on `http://localhost:3000`, or on the `PORT` value from `Backend/.env`. The frontend code expects `VITE_BASE_URL`, so keep both values aligned. A common local setup is backend on `http://localhost:4000`.

Start the frontend:

```bash
cd frontend
npm run dev
```

Open the Vite URL shown in the terminal, usually `http://localhost:5173`.

## Main User Flow

1. The app starts on the splash screen and moves to the rider/driver selection screen.
2. Riders can register or log in, then open the rider home screen.
3. Riders choose pickup and destination locations, view fare options, select a vehicle type, and create a ride.
4. The backend geocodes the pickup, finds nearby captains using MongoDB geospatial queries, and emits a `new-ride` socket event.
5. Captains receive the ride popup, accept the ride, and the rider is notified.
6. The captain starts the ride using the generated 4-digit OTP.
7. Rider and captain move to active ride screens.
8. The captain ends the ride, and the rider is returned home.

## API Overview

Authentication uses a JWT token in the request header:

```http
Authorization: Bearer <token>
```

### Users

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/users/register` | Register a rider |
| POST | `/users/login` | Log in a rider |
| GET | `/users/profile` | Get authenticated rider profile |
| GET | `/users/logout` | Log out rider and blacklist token |

### Captains

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/captains/register` | Register a captain with vehicle details |
| POST | `/captains/login` | Log in a captain |
| GET | `/captains/profile` | Get authenticated captain profile |
| GET | `/captains/logout` | Log out captain and blacklist token |

### Maps

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/maps/get-coordinates?address=` | Convert address to coordinates |
| GET | `/maps/get-distance-time?origin=&destination=` | Get route distance and duration |
| GET | `/maps/get-autocomplete-suggestions?input=` | Get location suggestions |

### Rides

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/rides/get-fare?pickup=&destination=` | Calculate fares for vehicle types |
| POST | `/rides/create-ride` | Create a ride request |
| POST | `/rides/confirm` | Captain accepts a ride |
| GET | `/rides/start-ride?rideId=&otp=` | Captain starts ride after OTP check |
| POST | `/rides/end-ride` | Captain completes the ride |

## Socket Events

| Event | Direction | Purpose |
| --- | --- | --- |
| `join` | Client to server | Save rider/captain socket ID |
| `update-location-captain` | Captain to server | Update captain geolocation |
| `new-ride` | Server to captain | Send nearby ride request |
| `ride-confirmed` | Server to rider | Notify rider that a captain accepted |
| `ride-accepted` | Server to rider | Additional ride acceptance event |
| `track-ride` | Client to server | Join a ride-specific socket room |
| `ride-location-update` | Client/server | Broadcast live ride location updates |
| `ride-started` | Server to rider/captain room | Notify that ride has started |
| `ride-ended` | Server to rider | Notify that ride has ended |
| `ride-completed` | Server to rider/room | Notify that ride has completed |

## Available Scripts

Backend:

```bash
npm start
```

Frontend:

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## Screenshots to Add

Add screenshots in a folder such as `docs/screenshots/`, then reference them near the top of this README.

Recommended screenshots:

1. **Splash screen** - shows RideX branding and first impression.
2. **Rider/Driver selection** - shows the two entry paths.
3. **Rider login and signup** - useful for showing authentication UI.
4. **Rider home with map** - show pickup and destination inputs with the map visible.
5. **Location suggestions panel** - show Mapbox autocomplete in action.
6. **Vehicle selection panel** - show car, auto, and moto fare options.
7. **Looking for driver / waiting for driver** - show the post-booking state.
8. **Captain home dashboard** - show captain map and details panel.
9. **New ride request popup** - important because it demonstrates real-time Socket.IO dispatch.
10. **Captain OTP/start ride screen** - show the OTP-based start flow.
11. **Active rider ride screen** - show captain/vehicle details and route map.
12. **Captain active ride screen** - show the captain's in-trip completion flow.

For the cleanest README, use 4-6 high-value images in the main section and keep the rest in a separate screenshots folder. The best main set is: splash, rider home, vehicle selection, captain ride request, active rider ride, and captain active ride.

## Notes

- The app relies on browser geolocation, so allow location permissions during testing.
- Map rendering and route features require a valid Mapbox token.
- Nearby captain matching depends on captains sending live location updates from the captain home screen.
- Existing nested README files currently contain API-style notes; this root README is intended as the main project documentation.
