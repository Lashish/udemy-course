import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";

function createRandomPost() {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  }
}



function App() {
  const [posts, setPosts] = useState(() => Array.from({ length: 20 }, () => createRandomPost()))
  const [searchQuery, setSearchQuery] = useState("");
  const [isFakeDark, setIsFakeDark] = useState(false);

  const searchedPost = searchQuery.length > 0 ? posts.filter((post) => `${post.title} ${post.body}`.toLowerCase().includes(searchQuery.toLowerCase())) : posts;

  function handleAddPost(post) {
    if (!post.titel && !post.body) return;
    setPosts((posts) => [post, ...posts])
  }

  function handleClearPost() {
    setPosts([])
  }
  // console.log(posts)
  useEffect(
    function () {
      document.documentElement.classList.toggle("fake-dark-mode");
    }, [isFakeDark]
  )

  return (
    <section >
      <button onClick={() => { setIsFakeDark((isFakeDark) => !isFakeDark) }} className="btn-fake-dark-mode">{isFakeDark ? "☀️" : "🌙"}</button>
      <Header posts={searchedPost} onClearPosts={handleClearPost} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Main posts={searchedPost} onAddPosts={handleAddPost} />
      <Archive onAddPosts={handleAddPost} />
      <Footer />
    </section>
  );
}

function Header({ posts, onClearPosts, searchQuery, setSearchQuery }) {
  return (
    <header>
      <h1>
        <span>⚛️</span>The Atomic Blog
      </h1>
      <div>
        <Results posts={posts} />
        <SearchPost searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <button onClick={onClearPosts}>Clear Post</button>
      </div>
    </header>
  )
}

function SearchPost({ searchQuery, setSearchQuery }) {
  return (

    <input type="search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="search posts..." />

  )
}
function Results({ posts }) {
  return (
    <p><span>🚀</span>{posts.length} Atomic posts found</p>
  )
}

function Main({ posts, onAddPosts }) {
  return (
    <main>
      <FormPost onAddPosts={onAddPosts} />
      <Posts posts={posts} />
    </main>
  )
}

function FormPost({ onAddPosts }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

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

function Posts({ posts }) {
  return (
    <main>
      <List posts={posts} />
    </main>
  )
}

function List({ posts }) {
  return (
    <ul>
      {posts.map((post, i) => (<li key={i}><div><h3>{post.title}</h3><p>{post.body}</p></div></li>))}
    </ul>
  )
}
function Archive({ onAddPosts }) {
  const [posts] = useState(() => Array.from({ length: 1000 }, () => createRandomPost()));

  const [showArchive, setShowArchive] = useState(false);
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