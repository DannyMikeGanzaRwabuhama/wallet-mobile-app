# 💰 Wallet Wizard - Your Personal Finance Sidekick

> Because who said managing money had to be boring? 🪄

## 🚀 What's This All About?

Meet your new favorite money management app! Built with [Expo](https://expo.dev) and React Native, Wallet Wizard helps you keep track of your coins without the headache. Whether you're saving for that avocado toast or just trying to remember where all your money went last weekend, we've got you covered.

## ✨ Magical Features

- 🔐 **No More Password Panic** - Secure sign-in that even your nosy roommate can't crack
- 💸 **Transaction Tracker** - Keep tabs on where your hard-earned cash is going (spoiler: probably coffee)
- 📊 **Balance Buddy** - Watch your money grow (or at least not disappear too quickly)
- 📱 **Looks Good Everywhere** - Works on your phone, tablet, or even that fancy new fridge with a screen
- 🛡️ **Fort Knox Security** - Your data's safer than your secret snack stash

## 🏗️ What's Under the Hood?

We've organized everything so you don't have to go on a treasure hunt:

- **`/app`** - Where the magic happens
  - **`/auth`** - The digital bouncer (sign-in/sign-up)
  - **`/root`** - The main event (home, transactions, all that jazz)
  - **`/components`** - The building blocks of our money masterpiece
- **`/assets`** - The pretty stuff (fonts, images, and all things stylish)
- **`/backend`** - The brains of the operation
- **`/constants`** - The rules of the game
- **`/hooks`** - Our custom tricks and shortcuts
- **`/lib`** - The utility belt (because every wizard needs tools)

## 🛠️ Let's Get This Party Started

1. **Grab the Code**
   ```bash
   git clone https://github.com/DannyMikeGanzaRwabuhama/wallet-mobile-app.git
   cd wallet-mobile-app
   ```

2. **Install the Good Stuff**
   ```bash
   npm install
   ```

## 🚦 Ready, Set, Code!

Fire up the development server with:

```bash
npx expo start
```

You can open the app in:
- Development build
- Android emulator
- iOS simulator
- Expo Go

### Start the Backend

To start the backend server:

```bash
npm run dev
```

### Reset the Project

To reset the project to a blank state:

```bash
npm run reset-project
```

## Scripts

- `npm start`: Start the Expo development server.
- `npm run dev`: Start the backend server with nodemon.
- `npm run reset-project`: Reset the project to a blank state.
- `npm run android`: Start the app on an Android emulator.
- `npm run ios`: Start the app on an iOS simulator.
- `npm run web`: Start the app on the web.
- `npm run lint`: Run ESLint for code linting.

## Technologies Used

### Frontend
- React Native
- Expo
- File-based routing with `expo-router`

### Backend
- Express.js
- Upstash Redis for rate-limiting
- Neon Database for serverless data storage
- Cron jobs for scheduled tasks
- Clerk for authentication
- Expo for mobile development
- Render for hosting

### Other Tools
- TypeScript for type safety
- ESLint for code linting
- Nodemon for backend development

## 🔑 Environment Variables & Credentials

To run Wallet Wizard locally, you'll need to set up a few environment variables. Copy `.env.example` to `.env` and fill in your own credentials. Here's how to get each one:

### 1. Neon Database (Postgres)
- **What:** Used for serverless data storage.
- **Get it:** [Sign up at Neon](https://neon.tech/), create a project, and copy your database connection string.
- **Set:** `DATABASE_URL` in your `.env` file.

### 2. Upstash Redis
- **What:** Used for rate-limiting and caching.
- **Get it:** [Sign up at Upstash](https://upstash.com/), create a Redis database, and copy the REST URL and REST token.
- **Set:** `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` in your `.env` file.

### 3. Clerk (Authentication)
- **What:** Handles secure user authentication.
- **Get it:** [Sign up at Clerk](https://clerk.com/), create a new application, and find your publishable key.
- **Set:** `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY` in your `.env` file.

### 4. Expo Public API URL
- **What:** The base URL for your backend API, used by the Expo app.
- **Set:** `EXPO_PUBLIC_API_URL` in your `.env` file (e.g., `http://localhost:3000` during development).

### 5. PORT & NODE_ENV
- **What:** Standard Node.js/Express settings.
- **Set:** `PORT` (e.g., `3000`) and `NODE_ENV` (e.g., `development`).

Refer to the `.env.example` file for all required variables and their expected format.

## Learn More

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals and advanced topics.
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Step-by-step tutorial for creating universal apps.

## Community

Join the Expo community:
- [Expo on GitHub](https://github.com/expo/expo): View the open-source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

## License

License information will be added soon.
