# Introduction

You can create a simple user when you sign up. If you need to create a user with admin privileges, you can click on the link [Créer un compte administrateur](http://localhost:3000/auth/admin/register) on the sign-up page.

# Frontend

## Setup

Make sure to install dependencies:

```bash
# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# bun
bun run dev
```

## Production

Build the application for production:

```bash
# bun
bun run build
```

Locally preview production build:

```bash
# bun
bun run preview
```

# Backend

## Setup

Make sure to install dependencies:

```bash
# npm
npm install
```

## Database & Environment

Create a `.env` file in the backend directory like the `.env.example` file. Make sure to have a running MySQL instance.

## Development Server

Start the development server on `http://localhost:2000`:

```bash
# node
nodemon server start
```