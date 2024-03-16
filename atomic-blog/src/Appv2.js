import { faker } from "@faker-js/faker";
import { createContext, useContext, useEffect, useState } from "react";

function createRandomPost() {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  }
}

// step1 for contextApi
const PostContext = createContext()

function App() {
  const [ posts, setPosts ] = useState(() => Array.from({ length: 20 }, () => createRandomPost()))
  const [ searchQuery, setSearchQuery ] = useState("");
  const [ isFakeDark, setIsFakeDark ] = useState(false);

  const searchedPost = searchQuery.length > 0 ? posts.filter((post) => `${post.title} ${post.body}`.toLowerCase().includes(searchQuery.toLowerCase())) : posts;

  function handleAddPost(post) {
    if (!post.titel && !post.body) return;
    setPosts((posts) => [ post, ...posts ])
  }

  function handleClearPost() {
    setPosts([])
  }
  // console.log(posts)

  useEffect(
    function () {
      document.documentElement.classList.toggle("fake-dark-mode");
    }, [ isFakeDark ]
  )

  return (
    //step2 using provider
    <PostContext.Provider value={{
      posts: searchedPost,
      onClearPosts: handleClearPost,
      onAddPosts: handleAddPost,
      searchQuery,
      setSearchQuery,
    }}>

      <section >
        <button onClick={() => { setIsFakeDark((isFakeDark) => !isFakeDark) }} className="btn-fake-dark-mode">{isFakeDark ? "☀️" : "🌙"}</button>
        <Header />
        <Main />
        <Archive />
        <Footer />
      </section>
    </PostContext.Provider>
  );
}

function Header() {
  //step 3 consuming by Component
  const { onClearPosts } = useContext(PostContext);
  return (
    <header>
      <h1>
        <span>⚛️</span>The Atomic Blog
      </h1>
      <div>
        <Results />
        <SearchPost />
        <button onClick={onClearPosts}>Clear Post</button>
      </div>
    </header>
  )
}

function SearchPost() {
  const { searchQuery, setSearchQuery } = useContext(PostContext);
  return (

    <input type="search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="search posts..." />

  )
}
function Results() {
  const { posts } = useContext(PostContext)
  return (
    <p><span>🚀</span>{posts.length} Atomic posts found</p>
  )
}

function Main() {
  return (
    <main>
      <FormPost />
      <Posts />
    </main>
  )
}

function FormPost() {
  const [ title, setTitle ] = useState("");
  const [ body, setBody ] = useState("");

  const { onAddPosts } = useContext(PostContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPosts({ title, body });
    setTitle("");
    setBody("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="post title" />
      <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="post body" />
      <button>Add Post</button>
    </form>
  )
}

function Posts() {

  return (
    <main>
      <List />
    </main>
  )
}

function List() {
  const { posts } = useContext(PostContext);
  return (
    <ul>
      {posts.map((post, i) => (<li key={i}><div><h3>{post.title}</h3><p>{post.body}</p></div></li>))}
    </ul>
  )
}
function Archive() {
  const { onAddPosts } = useContext(PostContext);
  const [ posts ] = useState(() => Array.from({ length: 1000 }, () => createRandomPost()));

  const [ showArchive, setShowArchive ] = useState(false);
  return (
    <aside>
      <h2>Post Archive</h2>
      <button onClick={() => setShowArchive((s) => !s)}>{showArchive ? "Hide archive posts" : "Show archive posts"}</button>
      {showArchive && (
        <ul>
          {posts.map((post, i) => (<li key={i}>
            <p><strong>{post.title}:</strong>{post.body}</p>
            <button onClick={() => onAddPosts(post)}>Add as a new post</button>
          </li>))}
        </ul>
      )}
    </aside>
  )
}
function Footer() {
  return (
    <footer> &copy; by The Atomic Blog. </footer>
  )
}



export default App;
