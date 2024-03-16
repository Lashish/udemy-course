import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";
import { PostProvider, usePost } from "./PostContext";

function createRandomPost() {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  }
}


function App() {

  const [ isFakeDark, setIsFakeDark ] = useState(false);
  useEffect(
    function () {
      document.documentElement.classList.toggle("fake-dark-mode");
    }, [ isFakeDark ]
  )

  return (

    <section >
      <button onClick={() => { setIsFakeDark((isFakeDark) => !isFakeDark) }} className="btn-fake-dark-mode">{isFakeDark ? "☀️" : "🌙"}</button>
      <PostProvider>
        <Header />
        <Main />
        <Archive />
        <Footer />
      </PostProvider>
    </section>

  );
}

function Header() {
  //step 3 consuming by Component
  const { onClearPosts } = usePost();
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
  const { searchQuery, setSearchQuery } = usePost();
  return (

    <input type="search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="search posts..." />

  )
}
function Results() {
  const { posts } = usePost()
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

  const { onAddPosts } = usePost();

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
  const { posts } = usePost();
  return (
    <ul>
      {posts.map((post, i) => (<li key={i}><div><h3>{post.title}</h3><p>{post.body}</p></div></li>))}
    </ul>
  )
}
function Archive() {
  const { onAddPosts } = usePost();
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
