# Netflix Clone ReactJS

A Netflix-inspired frontend built with React, Vite, React Router, Firebase Authentication, and Firestore.

## Features

- Responsive Netflix-style home page
- User sign up and sign in with Firebase Authentication
- User profile data stored in Firestore
- Movie cards loaded from the OMDb API
- Player page with movie details

## Tech Stack

- React
- Vite
- React Router DOM
- Firebase
- Firestore
- ESLint

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Create environment file

Create a `.env` file in the project root and add:

```env
VITE_OMDB_API_KEY=your_omdb_api_key
```

### 3. Run the development server

```bash
npm run dev
```

### 4. Build for production

```bash
npm run build
```

## Project Structure

```text
src/
  assets/
  components/
  pages/
  firebase.js
  App.jsx
  main.jsx
```

## Notes

- `.env` is ignored by Git, so your local API key will not be uploaded.
- Firebase config is currently stored in `src/firebase.js`.
- `dist/` and `node_modules/` are already ignored in `.gitignore`.

## Scripts

- `npm run dev` - start local development server
- `npm run build` - create production build
- `npm run preview` - preview production build locally
- `npm run lint` - run ESLint
