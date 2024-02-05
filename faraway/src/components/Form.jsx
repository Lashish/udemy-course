import { useState } from "react";

import (useState)
function Form({addItems}) {
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState(1);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      
      if(!description) return;
  
      const newItem = { description, quantity, packed: false, id: Date.now() };
     
        addItems(newItem);
        setQuantity(quantity);
        setDescription("");
        
      
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
  export default Form;