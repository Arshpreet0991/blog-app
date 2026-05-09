# Things to do in this project

- user auth
- add posts
  - choose title
  - add editor using tiny cloud
  - change font colors
  - choose a thumbnail for blog preview
  - choose to hide or show blog
  - compress images for preview
- Edit posts
- Delete posts
- View All posts

### tools

Install the main dependecies that we need for this project:

npm i

- @reduxjs/toolkit
- react-redux
- react-router-dom
- appwrite
- @tinymce/tinymce-react
- html-react-parser
- react-hook-form

### Setting up .env in vite

- In vite .env is not accessed just by `process.env.VARIABLE`
- It is accessed by using `import.meta.env.VARIABLE`

#### In Production

- we want the `.env` values to be always in string, there are chances that some `.env` variables are just numbers, so it can crash our app.
- To avoid this problem of type mismatch, in production, we create a folder `src/conf/conf.js`
- In `conf` file, we simply create an object and export it. Inside this object, we pass the `.env` variables in `String`. This makes sure that `.env` values are always in string type.
  ```js
  const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  };
  export default conf;
  ```

### Backend Services (using Appwrite as an example)

- A **service** is a class that wraps a third-party backend (like Appwrite) behind
  consistent methods.
- Your app always calls these methods — never the Appwrite SDK directly.
- This means if you ever switch backends (e.g. Appwrite → your own server), you only
  rewrite the service class, not every component in your app.
- This prevents **vendor lock-in**.

### Service Layer Pattern

- This is a common production pattern (also called the **Repository Pattern** for data).
- Benefits:
  - Keeps components clean — no API/SDK logic scattered everywhere
  - Makes testing easier — you can mock the service instead of real API calls
  - One place to handle errors, retries, etc.

### Service Layer vs Hooks

- **Service** → talks to the DB/API, just gets the data
- **Hook** → receives that data and handles business logic, state, UI

- In Forged v1, hooks handled both DB calls and business logic. The cleaner approach
  (v2) is to delegate DB calls to a service layer, so hooks only deal with business logic.

- Simple mental model:
  - Service = **get me the data**
  - Hook = **here's what we do with it**

**So, in future if our server/backend changes, we just make changes to service layer**

### Creating a Service Layer

**Folder:** `src/services`

---

**Step 1 — Create a class**

The class is the service. It has two parts:

- **Constructor** — runs once when the object is created. Used for setup only,
  like connecting to the backend, setting the URL, project ID, etc.

- **Methods** — the actual API/DB calls. Things like `createAccount`, `login`,
  `logout`, `getCurrentUser`. These are what your hooks and components will call.

---

**Step 2 — Create one object of the class**

At the bottom of the file, instantiate the class once:

```js
const authService = new AuthService();
```

---

**Step 3 — Export that object**

```js
export default authService;
```

---

**Why this works**

Anywhere in your app, you just import `authService` and call its methods.
Your components and hooks never talk to the backend directly — they just call
`authService.login()`, `authService.logout()`, etc.

If you ever swap your backend, you only update the methods inside this class.
Everything else in your app stays the same.
