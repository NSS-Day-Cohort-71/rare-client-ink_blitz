import { useEffect, useState } from "react";

export const MyPosts = ({ token }) => {
  const [allPosts, setAllPosts] = useState([]);

  const getAndSetPosts = () => {
    getAllPosts().then((postsArray) => {
      const userPosts = postsArray.filter((post) => post.user_id === token.id);
      setAllPosts(userPosts);
    });
  };
  useEffect(() => {
    getAndSetPosts();
  }, [token]);


return (
  <>
    <div>
      <h1>Username</h1>
    </div>
    <section>
        <div>
            <div>
            <h2>post title</h2>
            </div>
            <div>Publication Date:</div>
        </div>
        <div>
            <img src={} alt="img from post" />
        </div>
        <div>
            <div>author first/last name</div>
            <div>reaction count</div>
            <div>edit/delete buttons</div>
        </div>
    </section>
  </>
)
};
