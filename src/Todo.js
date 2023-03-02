import React, { useEffect } from "react";
import List from "./components/List.js";
import TodoForm from "./components/TodoForm.js";
import Modal from "./components/Modal.js";
import Item from "./components/Item.js";
import "./Todo.css";

const SAVED_ITENS = "savedItems";

function Todo() {
  const [items, setItems] = React.useState([]);

  const [showModal, setShowModal] = React.useState(false);

  useEffect(() => {
    let savedItems = JSON.parse(localStorage.getItem(SAVED_ITENS));
    if (savedItems.length !== 0) {
      setItems(savedItems);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(SAVED_ITENS, JSON.stringify(items))
  }, [items]);

  function onAddItem(text) {
    let it = new Item(text);

    setItems([...items, it]);
    onHideModal();
  }

  function onDone(item) {
    let updatedItems = items.map((it) => {
      if (it.id === item.id) {
        it.done = !it.done;
      }
      return it;
    });
    setItems(updatedItems);
  }

  function onItemDeleted(item) {
    let filteredItems = items.filter((it) => it.id !== item.id);

    setItems(filteredItems);
  }

  function onHideModal(){
    setShowModal(false);   
}

  return (
    <div className="container">
      <header className="header"><h1>To do List</h1><button onClick={()=>{setShowModal(true)}} className="addButton">+</button></header>     

      <List onDone={onDone} onItemDeleted={onItemDeleted} items={items}></List>
      <Modal show={showModal} onHideModal={onHideModal}><TodoForm onAddItem={onAddItem}></TodoForm></Modal>
    </div>
  );
}

export default Todo;
