import { useEffect, useState } from "react"
import { postList } from "../../managers/PostManager";
import { HumanDate } from "../utils/HumanDate";



export const AllPosts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        postList().then((postArray) => {
            setPosts(postArray)
        })
    }, [])

    return (
        <div>
            {posts.map((post, index) => (
                <div key={index} value={post.id}>
                    <div>
                        <img src={post.image_url}/>
                    </div>
                    <div>
                        {post.title}
                    </div>
                    <div>
                        {post.content}
                    </div>
                    <div>
                        <HumanDate date={post.publication_date}/>
                    </div>
                    <div>
                        {post.username}
                    </div>
                </div>
            ))}
        </div>
    )
}