# Intervue.IO Internship Assignment – Frontend

This is the **frontend** submission for the Intervue.IO internship assignment. It is a modern, real-time polling web application that allows teachers to create and manage polls, and students to participate in live sessions. The frontend is built with React and Vite, and communicates with a Node.js/Express backend over REST and Socket.io.

## Features
- **Role-based login:** Teacher and Student flows
- **Live Polling:** Teachers can create questions, students can answer in real-time
- **Poll Results:** View live and past poll results with visual feedback
- **Kick Functionality:** Teachers can remove participants from the session
- **Real-time Chat:** Sidebar chat for all participants
- **Toast Notifications:** Feedback for join/kick events
- **Redux State Management:** With persistence for smooth UX
- **Loading Indicators:** For actions like poll submission
- **PropTypes:** Used throughout for type safety
- **Responsive UI:** Styled with Tailwind CSS and Flowbite-react

## Tech Stack
### Frontend
- **React** (with Hooks)
- **Vite** (for fast build and HMR)
- **Redux Toolkit** & **redux-persist**
- **Socket.io-client** (real-time communication)
- **Axios** (REST API calls)
- **Tailwind CSS** & **Flowbite-react** (UI components)
- **Lucide-react** (icons)
- **Prop-types** (runtime type checking)

### Backend (for reference)
- **Node.js** with **Express**
- **Socket.io** (real-time events)
- **Prisma ORM** (PostgreSQL database)
- **REST API** for poll data
- **Role and participant management**

## Environment Variables
- Set `VITE_BACKEND_URL` in `.env` (e.g. `VITE_BACKEND_URL=https://your-backend-url`)
- The backend expects `FRONTEND_URL` in its own `.env`

## How to Run
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Ensure the backend is running and accessible at the URL specified in `VITE_BACKEND_URL`.

## Notes
- All features described above are implemented.
- For backend setup, see the backend repository.
- For any questions, contact Vishal Sharma.
