/* eslint-disable no-fallthrough */
// These are my notes on following a tutorial on the useReducer() React hook.
// The tutorial can be found at https://www.youtube.com/watch?v=kK_Wqx3RnHk

import React, { useState, useReducer } from "react";
import Todo from "./Todo"

//useReducer adds a lot more code and complexity. It's not really usefull for small projects but this is an example of it's use.
//useReducer is useful when the project is more complex and the state logic starts to get in the way of reading the render logic.

// SCREAMING_SNAKE_CASE is a convention from other languages to denote a constant.
// JavaScript doesn't have a constant as a primitive data type like other languages but I'm using the convention here as it's still useful and for the sake of the tutorial.
// This variable stores a list of the possible actios that can be passed to reducer()
// Storing actions as strings in the ACTION object makes it available to auto-complete reduces the chances oftypos in the strings

export const ACTIONS = {
  ADD_TODO: "add-todo",
  TOGGLE_TODO: "toggle-todo",
  DELETE_TODO: "delete-todo",
};

// useReducer callback function is defined outside the main app rendering function.
// This allows us to take state logic away from the rendering code.
// It has 2 parameters. The 1st is the current state. The 2nd is an action passed into dispatch.
// When dispatch is called, whatever is passed in will be assigned to the action variable and current state will be assigned to the state variable.
// reducer() will then return the updated state.

function reducer(todos, action) {
  //  Use control logic to select which action is to be executed
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      // the ...todos operator takes the data passed into the todos parameter and creates a new variable containing that data.
      // Then we append the return of newTodo() to the copied todos data and return it as the evaluation of reducer()
      // As reducer() is called from within App() as dispatch(), then the todos data returned as the evaluation of dispatch()
      return [...todos, newTodo(action.payload.name)];

      
    case ACTIONS.TOGGLE_TODO:
      // We take the current state of the todos object and use the .map() method to return a new object of todos
      return todos.map(todo => {
        // For each todo we are checking if the id matches the id of the ones that are sent by the payload
        if(todo.id === action.payload.id) {
          // If the id matches the payload then spread out the todo data to a new object and set the complete property the todo to the opposite of what it was.
          return {...todo, complete: !todo.complete}
        }
        // If the id doesn't match the payload then we just return the todo as it was.
        return todo
      })

      case ACTIONS.DELETE_TODO:
        // Check if the id property of each todo in the todos object matches the id of the payload object. The .filter() method returns all the todos that don't match the payload id.
        return todos.filter(todo => todo.id !== action.payload.id)
        
      
    // This default case just returns the state passed in if there is no action to perform.
    default:
      return todos;
  }
}

// Here we define the logic for creating new todos. It is called by reducer() and returns an object with properties defined below.
// The returned object is the data which will be appended to the current state by reducer()
// Setting the id property to the current time is a convenient way to get a unique id for the todos. It's not a standards compliant UUID however.
function newTodo(name) {
  return { id: Date.now(), name: name, complete: false };
}

export default function App() {
  // State variables
  // useReducer takes 2 parameters. 1st is a function to perform on state and 2nd is an intial value.
  // It returns an array with 2 elements. the 1st is the state and the 2nd is a function.
  // dispatch is a reference to the reducer() function and is used to update the state.

  const [todos, dispatch] = useReducer(reducer, []);
  const [name, setName] = useState("");

  // Calling dispatch calls reducer()
  // The 1st argument passed into dispatch() is then passed as the action parameter in reducer()
  // We pass an object with a property of .type which is used to select control logic in reducer() ???????????
  // This way we can just call state logic from outside the rendering function.

  function handleSubmit(e) {
    // The e parameter, short for event, is passed into the handleSubmit() function when the form is submitted.
    // The value of e is a parameter onChange, which is an attribute of the input property.
    // Calling the .preventDefault() method on the event parameter stops the page rerendering on this change.
    e.preventDefault();
    // When calling dispatch() we pass an object onto the action parameter. The object has 2 properties.
    // The action.type property is used to select the control logic.
    // the action.payload property is used to pass the value attribute of the input property.
    // The data passed in this way is called 'payload' by convention. The data type of payload here is an object with variable values needed to perform the action.
    // We are assigning name from value={name} to payload.
    dispatch({ type: ACTIONS.ADD_TODO, payload: { name: name } });
    setName("");
  }

  // Render

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </form>
      {/* We are taking the data in the todos arrav variable and using the .map method return a new array of Todo components for each element in todos*/}
      {todos.map((todo) => {
        // This is rendering the return of Todo({ todo , dispatch }). The dispatch function is passed in to be called by the button onClick listeners.
        return <Todo key={todo.id} todo={todo} dispatch={dispatch}/>;
      })}
    </>
  );
}


// notes

// What is the toggle for?
// Someone comments "I prefer to create those helper functions (toggleTodo, deleteTodo) instead of just sending the dispatch method down. Actions that are available can be more explicit than just exposing the entire dispatch method."
// This is something to look into.