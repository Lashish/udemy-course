import { useState } from "react";
const initialItems = [
  { id: 1, description: "passport", quantity: 2, packed: false },
  { id: 2, description: "socks", quantity: 12, packed: true },
  { id: 3, description: "charger", quantity: 1, packed: false },
];
function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 👜</h1>;
}
function Form() {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(description, quantity);
    const newItem = { description, quantity, packed: false, id: Date.now() };
    if (description) {
      setQuantity(quantity);
      setDescription("");
      console.log(newItem);
    } else {
      alert("Item description is needed!");
    }
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3> What do you need for your trip ?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="item..."
      />
      <button> add</button>
    </form>
  );
}
function PackingList() {
  return (
    <ul className="list">
      {initialItems.map((item) => (
        <Item item={item} key={item.id} />
      ))}
    </ul>
  );
}

function Item({ item }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button> &times; </button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>You have X item on your list, and you already packed x (x%)</em>
    </footer>
  );
}
export default App;
