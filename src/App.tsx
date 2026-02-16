import { Navigate, Route, Routes } from 'react-router-dom';
import PostDetailsPage from './pages/PostDetailsPage';
import PostFormPage from './pages/PostFormPage';
import PostsListPage from './pages/PostsListPage';

function App() {
  return (
    <div className="app-shell">
      <header>
        <h1>JSONPlaceholder Posts</h1>
      </header>

      <main>
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
