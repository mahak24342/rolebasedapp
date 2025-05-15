# Role-Based Authentication App

This is a web application that implements role-based authentication using Google Sign-In. After login, users choose a role—**Admin** or **Guest**—and are directed to a customized interface based on that role.

- **Admins** can perform full CRUD operations on user data.
- **Guests** can only view the data entered by admins.

The application features a clean, responsive design suitable for both desktop and mobile devices, with secure authentication and role-based access control.

## Live Link

- **App URL**: [https://rolebasedapp.vercel.app](https://rolebasedapp.vercel.app)  
- **GitHub Repository**: [https://github.com/mahak24342/rolebasedapp](https://github.com/mahak24342/rolebasedapp)

## Features

- Google Sign-In with Firebase Authentication
- Role selection after login: Admin or Guest
- Personalized welcome screen based on role
- Admin Dashboard:
  - Add new user entries (Name, Address, PIN, Phone Number)
  - View, update, and delete entries
- Guest Dashboard:
  - Read-only access to all entries
- Secure logout
- Mobile-first, responsive UI

## Tech Stack

- **Frontend**: Next.js, TypeScript, Tailwind CSS
- **Authentication & Backend**: Firebase (Google OAuth + Realtime Database)
- **Deployment**: Vercel

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/mahak24342/rolebasedapp.git
cd rolebasedapp
