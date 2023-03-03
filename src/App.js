import React from "react";
import List from "./components/List.js";
import TodoForm from "./components/TodoForm.js";
import Modal from "./components/Modal.js";
import "./Todo.css";
import listReducer from "./reducers/listReducer.js";
import { legacy_createStore as createStore } from "redux";
import { Provider } from "react-redux";

const SAVED_ITEMS = "savedItems";

function persistState(state) {
  localStorage.setItem(SAVED_ITEMS, JSON.stringify(state));
}

function loadState() {
  const actualState = localStorage.getItem(SAVED_ITEMS);
  if (actualState) {
    return JSON.parse(actualState);
  } else {
    return [];
  }
}
const store = createStore(listReducer, loadState());
store.subscribe(() => {
  persistState(store.getState());
});

function App() {
  const [showModal, setShowModal] = React.useState(false);

  function onHideModal() {
    setShowModal(false);
  }

  return (
    <div className="container">
      <Provider store={store}>
        <header className="header">
          <h1>To do List</h1>
          <button
            onClick={() => {
              setShowModal(true);
            }}
            className="addButton"
          >
            +
          </button>
        </header>

        <List></List>
        <Modal show={showModal} onHideModal={onHideModal}>
          <TodoForm onHideModal={onHideModal}></TodoForm>
        </Modal>
      </Provider>
    </div>
  );
}

export default App;
