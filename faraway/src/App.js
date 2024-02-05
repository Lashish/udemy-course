import { useState } from "react";
import Logo from "./components/Logo";
import Form from "./components/Form";
import PackingList from "./components/PackingList";
import Stats from "./components/Stats";
// const initialItems = [
//   { id: 1, description: "Passport", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: true },
//   { id: 3, description: "Charger", quantity: 1, packed: false },
//   { id: 4, description: "Books", quantity: 1, packed: false },
//   { id: 5, description: "Bag", quantity: 1, packed: false },
// ];
function App() {
  const[items, setItems]=useState([]);
  function handleAddItems(item){
    setItems((items) =>[...items, item])
  };

  function handleDeleteItem(id){
    setItems(items=>items.filter((item=>item.id!==id)))
  }

  function handleToggleItem(id){
    setItems((items)=>items.map((item)=> item.id===id?{...item, packed:!item.packed}:item))
  }

  function handleClearItem(){
    // const confirmed = window.confirm("Do you want to delete all items");
    if( items.length!== 0){
      const confirmed = window.confirm("Do you want to delete all items");
     if(confirmed) setItems([])
    } else alert('No item list to delete!') 
  }
  return (
    <div className="app">
      <Logo />
      <Form addItems = {handleAddItems}/>
      <PackingList items={items} onDeleteItem={handleDeleteItem} onToggleItem = {handleToggleItem} onClearItems = {handleClearItem}/>
      <Stats items = {items} />
    </div>
  );
}
export default App;
