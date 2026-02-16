# Posts CRUD (React + Redux + TypeScript)

A coding-task implementation that uses JSONPlaceholder APIs and Redux Toolkit thunks for async CRUD operations.

## Tech stack

- React + TypeScript
- Redux Toolkit + React Redux
- Redux Thunk (via RTK)
- React Router
- Vite

## API endpoints used

- `GET /posts`
- `GET /posts/{postId}`
- `GET /posts/{postId}/comments`
- `POST /posts`
- `PATCH /posts/{postId}`
- `DELETE /posts/{postId}`

Base URL: `https://jsonplaceholder.typicode.com`

## Run

```bash
npm install
npm run dev
```

## Notes

- JSONPlaceholder accepts create/update/delete requests but does not persist data server-side.
- To preserve expected UX, created/updated/deleted posts are reflected in Redux state immediately.
