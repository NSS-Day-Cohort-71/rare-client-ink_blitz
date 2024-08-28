import { Route, Routes } from 'react-router-dom';
import { Login } from '../components/auth/Login';
import { Register } from '../components/auth/Register';
import { Authorized } from './Authorized';
import { HomePage } from '../components/HomePage';
import { CreatePost } from '../components/posts/CreatePost';
import { PostDetails } from '../components/posts/PostDetails';
import { EditPost } from '../components/posts/EditPost';
import { AllProfiles } from '../components/users/AllProfiles';

export const ApplicationViews = ({ token, setToken }) => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route element={<Authorized token={token} />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/createPost" element={<CreatePost token={token} />} />
          <Route path="/postDetails/:postId" element={<PostDetails />} />
          {/* route to specific post id */}
          <Route
            path="/edit-post/:postId"
            element={<EditPost token={token} />}
          />
          <Route path="/userManager" element={<AllProfiles />} />
        </Route>
      </Routes>
    </>
  );
};
