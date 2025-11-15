
# AniRepo – Technical Design Document

## Background

AniRepo is a personal cataloging application for anime-related media and collectibles. Its primary goal is to help you maintain a structured, queryable record of your collection over time.

AniRepo focuses on seven main collection types:

- **Books** – light novels, manga, artbooks, guidebooks  
- **Video Games** – console and PC games, especially anime or adjacent franchises  
- **Movies** – anime films, OVAs, and related media  
- **Autographs** – signed items from guests, artists, or voice actors  
- **Art** – prints, commissions, posters, sketches, and other artwork  
- **Figures** – scale, prize, and chibi figures (e.g., Nendoroids)  
- **Merchandises** – miscellaneous goods: keychains, pins, badges, apparel, etc.

The application provides:

- A **dashboard** showing collection statistics and the most recently added item  
- Full CRUD operations for each collection type (create, list, detail, update, delete)  
- A **filtering API** that can search within a specific collection or across all collections  
- A consistent **React + Material UI** frontend with a simple, navigable UI

AniRepo is currently designed as a **single-user, private app**, but the architecture is structured so it can later be extended with:

- Authentication and authorization  
- Multi-user support  
- Rich analytics and visualizations  

---

## High-Level Overview

AniRepo is split into two main applications:

- **Backend – `back/`**
  - Node.js + Express REST API  
  - MongoDB via Mongoose  
  - Layered architecture: models → services → controllers → routes  
  - Provides CRUD endpoints, dashboard aggregation, and generic filters  

- **Frontend – `front/`**
  - React SPA (Create React App)  
  - React Router for navigation  
  - Material UI for layout and components  
  - Axios for talking to the backend API  

Conceptual architecture:

- The React client (`front`) calls the Express API (`back`) using JSON over HTTP  
- The API delegates to service modules, which talk to Mongoose models  
- Mongoose manages persistence to MongoDB  

---

## Directory Structure

### Root

    anirepo-main/
      .gitignore
      README.md                # Can be this document or a shorter summary
      back/                  # Backend API (Node.js / Express)
      front/                    # Frontend SPA (React / MUI)

### Backend – `back/`

    back/
      app.js                   # Express app entry point
      package.json
      package-lock.json

      config/
        db.js                  # MongoDB connection logic

      controllers/
        artController.js
        autographController.js
        bookController.js
        dashboardController.js
        figureController.js
        filterController.js
        merchandiseController.js
        movieController.js
        videoGameController.js

      models/
        Art.js
        Autograph.js
        Book.js
        Figure.js
        Merchandise.js
        Movie.js
        VideoGame.js

      routes/
        arts.js
        autographs.js
        books.js
        dashboard.js
        figures.js
        filters.js
        merchandises.js
        movies.js
        videoGames.js

      services/
        artService.js
        autographService.js
        bookService.js
        dashboardService.js
        figureService.js
        merchandiseService.js
        movieService.js
        videoGameService.js

> Filenames are illustrative; adjust capitalization to match the actual repository (e.g., `videoGameController.js` vs `videogameController.js`).

### Frontend – `front/`

    front/
      package.json
      package-lock.json

      public/
        index.html
        favicon.ico
        manifest.json
        ...

      src/
        index.js
        index.css
        App.js
        App.css

        components/
          Layout/
            Navbar.js
            Dashboard.js
            StatBox.js

          Books/
            ListBook.js
            DetailBook.js
            AddBook.js
            EditBook.js

          VideoGames/
            ListVideoGame.js
            DetailVideoGame.js
            AddVideoGame.js
            EditVideoGame.js

          Movies/
            ListMovie.js
            DetailMovie.js
            AddMovie.js
            EditMovie.js

          Autographs/
            ListAutograph.js
            DetailAutograph.js
            AddAutograph.js
            EditAutograph.js

          Arts/
            ListArt.js
            DetailArt.js
            AddArt.js
            EditArt.js

          Figures/
            ListFigure.js
            DetailFigure.js
            AddFigure.js
            EditFigure.js

          Merchandises/
            ListMerchandise.js
            DetailMerchandise.js
            AddMerchandise.js
            EditMerchandise.js

---

## Backend Design (`back/`)

### Technologies

- **Runtime:** Node.js  
- **Framework:** Express  
- **Database:** MongoDB (Atlas or self-hosted)  
- **ODM:** Mongoose  
- **Config & tooling:** dotenv, nodemon  
- **Middleware:** `cors`, JSON body parsing (`express.json` / `body-parser`)  

Key `package.json` (backend) concepts:

- Dependencies: `express`, `mongoose`, `cors`, `body-parser`, `dotenv`, `mongodb`  
- Dev dependency: `nodemon`  
- Example scripts:
  - `"start": "nodemon app.js"`

### Application Entry – `app.js`

Responsibilities:

1. Load environment variables (`dotenv`)  
2. Initialize Express app  
3. Configure middleware:
   - `cors()` to allow cross-origin requests from `front`
   - `express.json()` or `body-parser.json()` for JSON bodies  
4. Connect to MongoDB via `config/db.js`  
5. Register routes:
   - `/books`, `/videogames`, `/movies`, `/autographs`, `/arts`, `/figures`, `/merchandises`
   - `/dashboard`
   - `/filters`  
6. Start HTTP server on `process.env.PORT || 3001`  

Typical route registration (simplified):

    app.use('/books', bookRoutes);
    app.use('/videogames', videoGameRoutes);
    app.use('/movies', movieRoutes);
    app.use('/autographs', autographRoutes);
    app.use('/arts', artRoutes);
    app.use('/figures', figureRoutes);
    app.use('/merchandises', merchandiseRoutes);
    app.use('/dashboard', dashboardRoutes);
    app.use('/filters', filterRoutes);

### Database Configuration – `config/db.js`

- Uses `dotenv` to load:

  - `MONGODB_USERNAME`  
  - `MONGODB_PASSWORD`  
  - `MONGODB_HOST`  
  - `MONGODB_COLLECTION`  
  - `MONGODB_CLUSTER`  

- Builds a connection string like:

    mongodb+srv://<username>:<password>@<cluster>/<collection>?retryWrites=true&w=majority

- Calls `mongoose.connect(...)` and logs:
  - Success: connected message  
  - Failure: error message and (optionally) process exit  

**Design choice:**  
All database credentials and host information live in environment variables so:

- Secrets are not committed to the repo  
- Different databases can be used per environment (local/dev/prod) simply by changing the `.env` file  

### Layered Architecture

The backend uses a layered structure for each domain type:

1. **Model – `models/*.js`**  
   - Defines Mongoose schema and model for each collection.

2. **Service – `services/*Service.js`**  
   - Contains data access and business logic.  
   - Implements operations like `find`, `create`, `update`, `delete`, plus aggregates.

3. **Controller – `controllers/*Controller.js`**  
   - Handles Express `req`/`res`.  
   - Translates HTTP requests to service calls.  
   - Sets response codes and formats response JSON.

4. **Route – `routes/*.js`**  
   - Maps HTTP verbs and paths to controller methods.  
   - Defines resource URLs (e.g., `GET /books`, `POST /books`, `GET /books/:id`).

This separation keeps:

- HTTP concerns (status codes, headers) in controllers  
- Data logic (queries, validations) in services  
- Schema definitions in models  

### Data Models

All entities share concepts such as:

- `item_type` – identifies what kind of item it is  
- A name/title  
- Creator/author/artist information  
- An `added` timestamp  
- Optional `imageUrl`  
- Ownership-related fields (e.g., `copies`)  

Each model specializes fields for its domain.

#### Book – `models/Book.js`

Common fields:

- `item_type: String` – typically `"book"`  
- `title: String` – book or volume title  
- `creators: String` – combined creator string  
- `first_name: String`, `last_name: String` – primary creator split name  
- `ean_isbn13: String`, `upc_isbn10: String` – identifiers  
- `description: String` – description or blurb  
- `publisher: String`  
- `publish_date: Date`  
- `length: Number` – page count or similar  
- `added: Date` – defaults to `Date.now`; used for dashboard and filters  
- `copies: Number` – how many copies you own  
- `imageUrl: String` – optional cover or reference image  

#### VideoGame – `models/VideoGame.js`

Typical fields:

- `item_type: String` – `"videogame"`  
- `title: String`  
- `platform: String` – e.g., `PS5`, `Switch`, `PC`  
- `publisher: String`  
- `release_date: Date`  
- `description: String` (optional)  
- `added: Date`, `imageUrl: String`, `copies: Number`  

#### Movie – `models/Movie.js`

Typical fields:

- `item_type: String` – `"movie"`  
- `title: String`  
- `director: String`  
- `runtime: Number` – runtime in minutes  
- `release_date: Date`  
- `description: String`  
- `added: Date`, `imageUrl: String`  

#### Autograph – `models/Autograph.js`

Typical fields:

- `item_type: String` – `"autograph"`  
- `first_name: String`, `last_name: String`  
- `series_or_role: String` – what the person is known for  
- `event: String` – event where autograph was obtained  
- `notes: String` – inscription, condition, etc.  
- `added: Date`  
- `imageUrl: String`  

#### Art, Figure, Merchandise – `Art.js`, `Figure.js`, `Merchandise.js`

Common patterns:

- `item_type: String` – `"art"`, `"figure"`, `"merchandise"`  
- `title` or `name: String`  
- `franchise: String` – e.g., `Demon Slayer`, `frontto`  
- `manufacturer` or `artist`  
- `release_date: Date` (optional)  
- `notes: String`  
- `added: Date`  
- `imageUrl: String`  

**Design note:**  
Storing `item_type` in each document (even though it’s implied by the collection) allows:

- Easier cross-collection aggregations  
- Mixed search results that clearly indicate type  

### Services

Services expose standard CRUD-style operations:

- `getX(queryParams)`  
- `getXById(id)`  
- `createX(data)`  
- `updateX(id, data)`  
- `deleteX(id)`  

Example service structure (Book):

    // services/bookService.js
    exports.getBooks = async (queryParams) => {
      const query = { item_type: 'book', ...queryParams };
      return await Book.find(query);
    };

    exports.getBookById = async (id) => Book.findById(id);

    exports.createBook = async (bookData) => {
      bookData.item_type = 'book';
      const book = new Book(bookData);
      await book.save();
      return book;
    };

    exports.updateBook = async (id, updateData) =>
      Book.findByIdAndUpdate(id, updateData, { new: true });

    exports.deleteBook = async (id) =>
      Book.findByIdAndDelete(id);

Other services for `videoGame`, `movie`, `autograph`, `art`, `figure`, `merchandise` follow the same pattern.

### Controllers & Routes

Controllers:

- Wrap service calls in `try/catch`  
- Return appropriate HTTP status codes and JSON responses  

Typical controller methods:

    // controllers/bookController.js
    exports.getBooks = async (req, res) => {
      try {
        const books = await BookService.getBooks(req.query);
        res.status(200).json(books);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };

    exports.createBook = async (req, res) => {
      try {
        const newBook = await BookService.createBook(req.body);
        res.status(201).json(newBook);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    };

Routes:

    // routes/books.js
    router.get('/',    bookController.getBooks);
    router.get('/:id', bookController.getBookById);
    router.post('/',   bookController.createBook);
    router.put('/:id', bookController.updateBook);
    router.delete('/:id', bookController.deleteBook);

Each collection type has a corresponding route file with the same CRUD pattern.

### Dashboard Logic

**Service:** `dashboardService.js`  
**Controller:** `dashboardController.js`  
**Route:** `dashboard.js`  

#### `GET /dashboard/counts`

- Uses `Model.countDocuments()` on each collection  
- Returns:

    {
      "bookCount": 12,
      "videoGameCount": 8,
      "movieCount": 5,
      "autographCount": 4,
      "artCount": 6,
      "figureCount": 10,
      "merchandiseCount": 3
    }

#### `GET /dashboard/recent`

High-level algorithm:

1. For each model, fetch the latest document sorted by `added` descending, limit 1  
2. Combine those “most recent” items from each collection into an array  
3. Sort the combined array by `added` descending  
4. Return the single most recent item globally  

Used by the frontend to show “Most Recent Item” on the dashboard.

### Filtering Logic

**Controller:** `filterController.js`  
**Route:** `filters.js`  

Route signature:

    // GET /filters/:collectionType?
    router.get('/:collectionType?', getFilteredItems);

Core concepts:

- A registry mapping collection type → Mongoose model, e.g.:

    const collections = {
      book: Book,
      videogame: VideoGame,
      movie: Movie,
      autograph: Autograph,
      art: Art,
      figure: Figure,
      merchandise: Merchandise,
    };

Behavior:

- With `:collectionType` present (e.g., `/filters/book`):
  - Validate `collectionType`  
  - Build a filter object from `req.query`  
  - Query only that model  
  - Return filtered results  

- Without `:collectionType` (e.g., `/filters`):
  - Run filter queries on all collections  
  - Concatenate results into a single list  
  - Sort by `added` descending  
  - Apply `limit` (default e.g. `5`)  

This endpoint supports both per-collection searches and cross-collection search.

### Error Handling

- Each controller uses `try/catch` and returns JSON errors like:

    { "error": "error message here" }

- Future enhancement: add centralized Express error middleware for:

  - Consistent error format  
  - Logging  
  - Mapping internal errors to safe client-facing messages  

---

## Frontend Design (`front/`)

### Technologies

- **Framework:** React (Create React App)  
- **Routing:** `react-router-dom` v6  
- **UI Library:** Material UI (MUI)  
- **HTTP Client:** Axios  
- **Styling:** `index.css`, `App.css`, plus MUI `sx` props  

### Application Entry – `src/App.js`

Responsibilities:

- Wrap the app in `BrowserRouter`  
- Render `Navbar` on all pages  
- Provide a layout container (MUI `Container`) with top margin to account for the AppBar  
- Define routes for:
  - `/` – Dashboard  
  - `/books`, `/add-book`, `/books/:id`, `/edit-book/:id`  
  - Equivalent patterns for videogames, movies, autographs, arts, figures, merchandises  

Typical route structure (simplified):

```jsx
<Router>
  <Navbar />
  <Container sx={{ mt: 10 }}>
    <Routes>
      <Route path="/" element={<Dashboard />} />

      <Route path="/books" element={<ListBook />} />
      <Route path="/add-book" element={<AddBook />} />
      <Route path="/books/:id" element={<DetailBook />} />
      <Route path="/edit-book/:id" element={<EditBook />} />

      {/* Similar routes for other collections */}
    </Routes>
  </Container>
</Router>
```

### Layout Components

#### Navbar – `components/Layout/Navbar.js`

- Uses MUI components (`AppBar`, `Toolbar`, `IconButton`, `Typography`, `Drawer`, `List`, `ListItem`)  
- Shows:

  - App title: **AniRepo**  
  - Navigation links to:
    - Dashboard  
    - Books  
    - Video Games  
    - Movies  
    - Autographs  
    - Arts  
    - Figures  
    - Merchandises  

- Manages:

  - Drawer open/close state for mobile view  
  - Desktop vs. mobile navigation layout  

#### Dashboard – `components/Layout/Dashboard.js`

State:

- `counts` – from `/dashboard/counts`  
- `recent` – array with the most recent item from `/dashboard/recent`  

Effects:

- On mount:
  - Call `GET /dashboard/counts`  
  - Call `GET /dashboard/recent`  

Rendering:

- A grid of `StatBox` or `Card` components showing counts for each collection type  
- A “Most Recent” section displaying:

  - Title or name  
  - Description or notes (if available)  
  - `item_type`  
  - `added` formatted with `toLocaleString()`  

#### StatBox – `components/Layout/StatBox.js`

- Reusable component with props like `label` and `value`  
- Renders a small MUI `Card` with:

  - Label as heading  
  - Value as a large stat number  

Used by the Dashboard for consistent display of counts.

### Collection Components

Each collection type has four main components:

- `List<Type>.js`  
- `Detail<Type>.js`  
- `Add<Type>.js`  
- `Edit<Type>.js`  

For example, Books:

- `ListBook`, `DetailBook`, `AddBook`, `EditBook`

#### List Components

Example behavior (`ListBook`, `ListVideoGame`, etc.):

- On mount, fetch items:

```js
useEffect(() => {
  axios.get('http://localhost:3001/books')
    .then(res => setBooks(res.data));
}, []);
```

- Display:

  - Table or grid with key fields (title, franchise, added date, etc.)  
  - “Add” button to navigate to `/add-<type>`  

- Actions per row:

  - View details → `/resource/:id`  
  - Edit → `/edit-<type>/:id`  
  - Delete → `DELETE /resource/:id`, then refresh list  

#### Detail Components

Example behavior (`DetailBook`, etc.):

- Read `id` from `useParams()`  
- Fetch resource with `GET /resource/:id` on mount  
- Display all relevant fields in a MUI `Card`  
- Provide navigation to:

  - Back to list  
  - Edit page  

#### Add Components

Example behavior (`AddBook`, etc.):

- Maintain form state with `useState` for each field  
- Use MUI `TextField`, `Select`, etc. for controlled inputs  
- On submit:

  - Validate minimal requirements  
  - Call `POST /resource` with JSON body  
  - On success, navigate to list or detail  

#### Edit Components

Example behavior (`EditBook`, etc.):

- Fetch existing item via `GET /resource/:id` on mount  
- Populate form with existing values  
- On submit:

  - Call `PUT /resource/:id` with updated fields  
  - Navigate to target view on success  

### State Management & Data Flow

- Component-level state only (React `useState`)  
- Data fetching via Axios in `useEffect` hooks  
- No global state managers (Redux, Context) at this stage  
- Navigation via `Link` components and `useNavigate` from `react-router-dom`  

---

## API Summary

Base URL for local development:

```text
http://localhost:3001
```

### CRUD Endpoints

For each resource type (`books`, `videogames`, `movies`, `autographs`, `arts`, `figures`, `merchandises`):

| Method | Path            | Description                                 |
|--------|-----------------|---------------------------------------------|
| GET    | `/resource`     | List all items (supports query filters)     |
| GET    | `/resource/:id` | Retrieve a single item by ID                |
| POST   | `/resource`     | Create a new item                           |
| PUT    | `/resource/:id` | Update an existing item                     |
| DELETE | `/resource/:id` | Delete an item by ID                        |

Example: Books

- `GET /books`  
- `GET /books/:id`  
- `POST /books`  
- `PUT /books/:id`  
- `DELETE /books/:id`  

### Dashboard Endpoints

- `GET /dashboard/counts`  
  - Returns counts per collection type  

- `GET /dashboard/recent`  
  - Returns the single most recent item across all collections  

### Filter Endpoints

- `GET /filters`  
  - Filters/searches **across all** collection types  
  - Query parameters define filter fields  
  - Results sorted by `added` descending  
  - `limit` parameter (if provided) restricts the number of results  

- `GET /filters/:collectionType`  
  - Filters/searches **within a specific** collection type  
  - `collectionType` ∈ { `book`, `videogame`, `movie`, `autograph`, `art`, `figure`, `merchandise` }  

---

## Configuration & Environment

### Backend – `back/`

Typical `.env` file (not committed to source control):

```env
MONGODB_USERNAME=yourUser
MONGODB_PASSWORD=yourPassword
MONGODB_HOST=yourHost.mongodb.net
MONGODB_COLLECTION=yourDatabaseName
MONGODB_CLUSTER=yourClusterName
PORT=3001
```

These values are used in:

- `config/db.js` – to construct the MongoDB connection string  
- `app.js` – to set the server listen port  

### Frontend – `front/`

- Axios calls currently use URLs like `http://localhost:3001/...`  
- For production, you can introduce:

  - `REACT_APP_API_URL` environment variable  
  - A central Axios instance that reads `process.env.REACT_APP_API_URL`  

---

## User Flows

### Check Overall Collection (Dashboard)

1. User navigates to `/`  
2. Dashboard component calls:
   - `GET /dashboard/counts`  
   - `GET /dashboard/recent`  
3. User sees:
   - Count tiles for each collection type  
   - A “Most Recent Item” card showing latest addition  

### Browse a Collection (Books example)

1. User clicks “Books” in the Navbar  
2. App navigates to `/books`  
3. `ListBook` calls `GET /books` and renders list  
4. From here user can:
   - Click an item to view `/books/:id` (detail)  
   - Click “Add Book” to go to `/add-book`  
   - Click “Edit” to go to `/edit-book/:id`  
   - Click “Delete” to remove an item via `DELETE /books/:id`  

### Add a New Autograph

1. User goes to `/autographs`  
2. Clicks “Add Autograph” → navigates to `/add-autograph`  
3. `AddAutograph` presents form (name, event, notes, etc.)  
4. On submit:
   - Calls `POST /autographs`  
   - On success, navigates to `/autographs` or `/autographs/:id`  

### Edit an Existing Video Game

1. User is on `/videogames` and selects a game → `/videogames/:id`  
2. On detail page, clicks “Edit”  
3. `EditVideoGame` fetches data for that ID  
4. User edits fields and submits  
5. Component calls `PUT /videogames/:id`  
6. On success, user is redirected back to detail or list view  

### Cross-Collection Search (Future UI)

1. User types a franchise name in a search bar (future feature)  
2. Frontend calls `GET /filters?franchise=Evangelion&limit=20`  
3. Backend returns mixed results (books, figures, art, etc.) sorted by `added`  
4. UI renders results with labels indicating each item’s type  

---

## Extensibility & Future Work

### Adding a New Collection Type (e.g., “Cards”)

**Backend steps:**

1. Create `models/Card.js` with appropriate schema and `item_type: 'card'`  
2. Create `services/cardService.js` with `getCards`, `getCardById`, `createCard`, `updateCard`, `deleteCard`  
3. Create `controllers/cardController.js`  
4. Create `routes/cards.js` and mount it in `app.js`:

```js
app.use('/cards', cardRoutes);
```

5. Update `dashboardService.js` to include card counts and latest item  
6. Update `filterController.js` to add `card: Card` to the model registry  

**Frontend steps:**

1. Create `components/Cards/` with:
   - `ListCard`, `DetailCard`, `AddCard`, `EditCard`  
2. Add routes to `App.js`:
   - `/cards`, `/cards/:id`, `/add-card`, `/edit-card/:id`  
3. Add a “Cards” entry to `Navbar.js`  
4. Optionally update `Dashboard.js` to include cards in stats and recent display  

### Authentication

Potential enhancements:

- Add a login system using JWT or session-based authentication  
- Protect write endpoints (create/update/delete) with authentication middleware  
- Support per-user collections  

### Validation & Error Handling

- Introduce validation using libraries like `Joi`, `Yup`, or `Zod`  
- Add Express error-handling middleware to:
  - Normalize error responses (e.g., `{ code, message, details }`)  
  - Log stack traces on the server  
  - Avoid leaking internal errors to the client  

### Search & Tagging

- Add MongoDB text indexes on fields like `title`, `description`, `franchise`  
- Support tagging items (e.g., `signed`, `limited`, `wishlist`)  
- Extend `/filters` endpoint to handle tag queries  

### Deployment & DevOps

- Add Dockerfiles for `back` and `front`  
- Use environment variables for:
  - API base URLs  
  - MongoDB host and credentials  
- Set up CI/CD pipeline to:
  - Run tests  
  - Lint/format  
  - Build and deploy automatically  

---

## Summary

AniRepo is a focused, full-stack application for tracking anime-related collections. It is built around:

- A **Node.js + Express + MongoDB** backend (`back`) with clear separation between models, services, controllers, and routes  
- A **React + Material UI** frontend (`front`) with predictable routing and per-collection CRUD flows  
- A **dashboard** that surfaces summary statistics and the most recently added item  
- A **filter API** that enables searching within or across collections  

The current architecture is intentionally straightforward but highly extendable. It supports your immediate goal (personal cataloging) while leaving room for future enhancements like authentication, advanced search, and multi-user support.
