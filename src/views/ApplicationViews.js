import { Route, Routes } from 'react-router-dom';
import { Login } from '../components/auth/Login';
import { Register } from '../components/auth/Register';
import { Authorized } from './Authorized';
import { CreatePost } from '../components/posts/CreatePost';
import { PostDetails } from '../components/posts/PostDetails';
import { CreateCategory } from '../components/categories/CreateCategory';
import { EditPost } from '../components/posts/EditPost';
import { AllProfiles } from '../components/users/AllProfiles';
import { UserDetails } from '../components/users/UserDetails';
import { CreateTag } from '../components/tags/CreateTag';
import { AllPosts } from '../components/posts/postList';
import { HomePage } from '../components/HomePage';
import { MyPosts } from '../components/posts/MyPosts';
import { CategoryList } from '../components/categories/CategoryList';
import { AllTags } from '../components/tags/TagList';
import { EditTag } from '../components/tags/EditTag';
import { AllComments } from '../components/comments/commentList';
import { EditCategory } from '../components/categories/EditCategory';
import { TagSelection } from '../components/tags/TagSelection';

export const ApplicationViews = ({ token, setToken }) => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route element={<Authorized token={token} />}>
          <Route path="/" element={<HomePage />} />
          <Route path="allPosts" element={<AllPosts />} />
          <Route path="/createPost" element={<CreatePost token={token} />} />
          <Route path="/postDetails/:postId" element={<PostDetails />} />
          <Route path="/myPosts" element={<MyPosts token={token} />} />
          <Route path="/categoryManager" element={<CategoryList />} />
          <Route
            path="/categories/:categoryId"
            element={<>List of posts by clicked on category</>}
          />
          <Route path="/createCategory" element={<CreateCategory />} />
          <Route path="/createTag" element={<CreateTag />} />
          <Route path="/edit-category/:categoryId" element={<EditCategory />} />
          <Route path="/tags" element={<AllTags />} />
          <Route path="/tag-selection/:postId" element={<TagSelection />} />
          <Route path="edit-tag/:tagId" element={<EditTag />} />
          <Route
            path="/edit-post/:postId"
            element={<EditPost token={token} />}
          />
          <Route path="/userManager" element={<AllProfiles />} />
          <Route path="/users/:userId" element={<UserDetails />} />
          <Route
            path="/postComments/:postId"
            element={<AllComments token={token} />}
          />
        </Route>
      </Routes>
    </>
  );
};
