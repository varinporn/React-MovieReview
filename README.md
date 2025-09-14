# Movie Review Web App

A React-based web application for browsing and managing movies. Users can create accounts, log in/out, and manage their own watchlist. The app currently supports CRUD operations for shows and user authentication, with password encryption via `json-server-auth`.
 
## Features
### User
- Register with an encrypted password using json-server-auth
- Login/Logout
- Display a list of shows
- Display details of shows
- Add movies to watchlist
- Write reviews

### Admin
- Manage content (Create, Update, Delete shows)

## Tech Stack
- **Frontend:** React, Tailwind CSS
- **Backend:** json-server + json-server-auth
- **API Requests:** Fetch API

## Installation

1. Clone the repository:  
```bash
git clone https://github.com/varinporn/React-MovieReview.git
```
2. Navigate into the project folder:
```bash
cd React-MovieReview
```
3. Install dependencies:
```bash
npm install
```
4. Start the backend (json-server):
```bash
npm run backend
```
5. Start the frontend (React web app):
```bash
npm run dev
```

## Usage
- Go to /register to sign in as a user
- Go to /login to log in as a user
- Add a review by clicking Add My Review on the detail page
- Add a show to your watchlist by clicking "Add to Watchlist" on the detail page or the main list page.
- Go to /admin/manage-shows to access the management


