# Backend - Product Data Explorer

## Setup

1. Ensure PostgreSQL is running locally:
   ```bash
   docker run --name explorer-db -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=explorer -p 5432:5432 -d postgres:15
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run migrations & seed:
   ```bash
   npm run migration:dev
   npm run seed
   ```

4. Start dev server:
   ```bash
   npm run start:dev
   ```

5. Test endpoint:
   [http://localhost:3000/api/navigation](http://localhost:3000/api/navigation)
