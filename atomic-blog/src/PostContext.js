import { createContext, useContext, useState } from "react";
import { faker } from "@faker-js/faker";


function createRandomPost() {
    return {
        title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
        body: faker.hacker.phrase(),
    }
}

const PostContext = createContext()

function PostProvider({ children }) {

    const [ posts, setPosts ] = useState(() => Array.from({ length: 20 }, () => createRandomPost()));

    const [ searchQuery, setSearchQuery ] = useState("");


    const searchedPost = searchQuery.length > 0 ? posts.filter((post) => `${post.title} ${post.body}`.toLowerCase().includes(searchQuery.toLowerCase())) : posts;

    function handleAddPost(post) {
        if (!post.titel && !post.body) return;
        setPosts((posts) => [ post, ...posts ])
    }

    function handleClearPost() {
        setPosts([])
    }
    return (
        <PostContext.Provider value={{
            posts: searchedPost,
            onAddPosts: handleAddPost,
            onClearPosts: handleClearPost,
            searchQuery,
            setSearchQuery,
        }}>
            {children}
        </PostContext.Provider>
    )
}

function usePost() {
    const context = useContext(PostContext);
    // for debugging purpose
    if (context === undefined) throw new Error("PostContext was used outside of the post provider!");
    return context;
}
export { PostProvider, usePost };