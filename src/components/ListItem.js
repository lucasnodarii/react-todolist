import React from "react";
import { useDispatch } from "react-redux";
import Card from "./Card.js";
import {deleteItem, changeDone} from "../actions/listAction.js"

function DoneImg(props) {
  if (props.done) {
    return <img alt="done" src="./assets/checked.png"></img>;
  } else {
    return <img alt="undone" src="./assets/check.png"></img>;
  }
}

function ListItem(props) {
  const dispatch = useDispatch()
  return (
    <li>
      <Card className={props.item.done ? "done item" : "item"}>
        {props.item.text}
        <div>
          <button
            onClick={() => {
              dispatch(changeDone(props.item.id));
            }}
          >
            <DoneImg done={props.item.done}></DoneImg>
          </button>
          <button
            onClick={() => {
              dispatch(deleteItem(props.item.id));
            }}
          >
            <img alt="delete" src="./assets/lixo.png"></img>
          </button>
        </div>
      </Card>
    </li>
  );
}

export default ListItem;
