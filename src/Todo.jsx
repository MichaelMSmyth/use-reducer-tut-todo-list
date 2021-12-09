import React from "react";
import { ACTIONS } from "./App"

// Here we define the Todo component which is rendered in App.jsx
// We use object destructuring to pass the todo object variable declared when we call the todos.map() method. This way we get an individual element from todos each time.
export default function Todo({ todo, dispatch }) {
  return (
    <div>
      {/* Using a ternary expression to set the colour based on the todo.complete bool*/}
      <span style={{ color: todo.complete ? "#AAA" : "#000" }}>
        {/* todo.name is the actual string of the todo */}
        {todo.name}
      </span>
      {/* Clicking the button calls dispatch() and passes an object into it with type and payload as parameters */}
      {/* The payload is going send the id of the todo that corresponds current todo element the .map() method iterating over*/}
      <button onClick={() => dispatch({type: ACTIONS.TOGGLE_TODO, payload: { id: todo.id}})}>Toggle</button>
      <button onClick={() => dispatch({type: ACTIONS.DELETE_TODO, payload: { id: todo.id}})}>Delete</button>
    </div>
  );
}
