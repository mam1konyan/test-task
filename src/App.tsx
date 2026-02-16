import { Navigate, Route, Routes } from 'react-router-dom';
import PostDetailsPage from './pages/PostDetailsPage';
import PostFormPage from './pages/PostFormPage';
import PostsListPage from './pages/PostsListPage';

function App() {
  return (
    <div className="mx-auto max-w-[960px] p-5">
      <header className="mb-6">
        <h1 className="m-0 text-3xl font-bold">
          JSONPlaceholder Posts
        </h1>
      </header>

      <main className="rounded-[10px] bg-white p-5 shadow-sm">
        <Routes>
          <Route
            path="/"
            element={<Navigate replace to="/posts" />}
          />
          <Route path="/posts" element={<PostsListPage />} />
          <Route path="/posts/new" element={<PostFormPage />} />
          <Route
            path="/posts/:postId"
            element={<PostDetailsPage />}
          />
          <Route
            path="/posts/:postId/edit"
            element={<PostFormPage />}
          />
          <Route
            path="*"
            element={<Navigate replace to="/posts" />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
