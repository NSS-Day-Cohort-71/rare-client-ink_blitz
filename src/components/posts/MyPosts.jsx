import { useEffect, useState } from "react";
import { postList } from "../../managers/PostManager";

export const MyPosts = ({ token }) => {
  const [allPosts, setAllPosts] = useState([]);

  const getAndSetPosts = () => {
    postList().then((postsArray) => {
      const userPosts = postsArray.filter(
        (post) => parseInt(token) === post.user_id
      );
      setAllPosts(userPosts);
    });
  };
  useEffect(() => {
    getAndSetPosts();
  }, [token]);

  return (
    <>
      <div>
        {allPosts.map((myPost) => (
          <div key={myPost.id}>
            <div>
              <h1>{myPost.username}</h1>
            </div>
            <section>
              <div>
                <div>
                  <h2>{myPost.title}</h2>
                </div>
                <div>Publication Date: {myPost.publication_date}</div>
              </div>
              <div>
                <img src={myPost.image_url} alt="img from post" />
              </div>
              <div>
                <div>{myPost.author_name}</div>
                <div>{myPost.reaction_count}</div>
                <div>edit/delete buttons</div>
              </div>
            </section>
          </div>
        ))}
      </div>
    </>
  );
};
