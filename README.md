# Backend - Product Data Explorer

This project is a backend service built with **NestJS** for scraping, storing, and serving product data by category. It uses **Prisma** ORM for database management and **Playwright** for web scraping.

## Features
- RESTful API for categories, products, navigation, reviews, and favourites
- Automatic scraping of products by category
- User authentication
- Prisma ORM for database access
- Playwright for scraping product data

## Project Structure
```
webscrapebackend/
├── prisma/           # Prisma schema and migrations
├── src/
│   ├── app.module.ts
│   ├── main.ts
│   ├── auth/         # Authentication logic
│   ├── category/     # Category controllers/services
│   ├── product/      # Product controllers/services
│   ├── review/       # Review controllers/services
│   ├── favourites/   # Favourites controllers/services
│   ├── navigation/   # Navigation controllers/services
│   ├── scrapejob.ts/ # Scraping logic and job scheduling
│   └── scrappers/    # Scraper helpers and implementations
├── storage/          # Scraper datasets and queues
├── package.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm
- PostgreSQL (or your configured database)

### Installation
1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd webscrapebackend
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Install Playwright (required for scraping):**
   ```bash
   npx playwright install
   ```
4. **Configure environment variables:**
   - Copy `.env.example` to `.env` and set your database credentials and other secrets.

5. **Set up the database:**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   # Optionally seed the database
   npm run seed
   ```

### Running the Server
```bash
npm run start:dev
```
The server will start on `http://localhost:3000` by default.

### API Endpoints
- `GET /api/categories` - List all categories
- `GET /api/categories/:id` - Get category details
- `GET /api/categories/:id/products` - Get products for a category (triggers scrape if none exist)
- `GET /api/products` - List all products
- `GET /api/products/:id` - Get product details
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login
- ...and more for reviews, favourites, navigation

### Scraping Products
Products are scraped automatically when you request products for a category and none exist in the database. Scraping uses Playwright for browser automation.

### Development Scripts
- `npm run start:dev` - Start server in development mode
- `npm run build` - Build the project
- `npm run seed` - Seed the database
- `npx playwright install` - Install Playwright browsers

### Troubleshooting
- **Unique constraint failed on email:** Make sure to use a unique email when registering users.
- **404 errors:** Check if the route exists in the controller.
- **Scraper issues:** Ensure Playwright is installed and your environment variables are set correctly.

## License
MIT

---
For more details, see the source code and comments in each module.
