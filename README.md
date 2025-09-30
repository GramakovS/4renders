# Next.js 4renders App

## Project Overview

This application demonstrates the implementation of a web application using Next.js with the following requirements:

### 1. Mandatory Elements Implemented

1. **Next.js Routing** - Using the App Router with multiple pages
2. **Four Pages with Different Rendering Methods**:
   - Static Site Generation (SSG) - Home page
   - Server-Side Rendering (SSR) - Users page
   - Client-Side Rendering (CSR) - Posts page
   - Incremental Static Regeneration (ISR) - Chat page
3. **API Integration** - Using JSONPlaceholder API for all data operations
4. **Modal Window** - With text and file inputs
5. **POST Request Submission** - Form data submission with file upload simulation
6. **WebSocket Integration** - Real-time communication demo

### 2. Technologies Used

- Next.js 15 with App Router
- TypeScript
- Tailwind CSS for styling
- Zustand for state management
- TanStack Query for data fetching and caching
- Axios for API requests
- React Hook Form for form handling
- Framer Motion for animations
- Lucide React for icons

## Implemented Features

### Rendering Methods
- **SSG (Static Site Generation)**: Home page (`/`) - Pre-rendered at build time for optimal performance
- **SSR (Server-Side Rendering)**: Users page (`/users`) - Rendered on each request with fresh data
- **CSR (Client-Side Rendering)**: Posts page (`/posts`) - Rendered in the browser with dynamic interactions
- **ISR (Incremental Static Regeneration)**: Chat page (`/chat`) - Static with periodic regeneration
- **WebSocket Demo**: WebSocket page (`/websocket`) - Real-time communication demonstration

### API Integration
- Integration with JSONPlaceholder API
- User management (fetch users)
- Post management (fetch, create, update, delete posts)
- Comment management (fetch comments)
- Form submission with file upload simulation

### State Management
- **Zustand**: Global state management for WebSocket messages, modal state, and shared data
- **TanStack Query**: Selective integration for data fetching, caching, and synchronization on the Posts page
- **React Hook Form**: Form state management for the modal form

### UI Components
- Responsive navigation system
- Modal form with text and file inputs
- Loading states and animations
- Real-time chat interface with WebSocket simulation

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.