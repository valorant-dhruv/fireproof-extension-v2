import { useRef, useState, useEffect } from "react";
import "./App.css";
import { fireproof, useFireproof } from "use-fireproof";

function App() {
  const [dbname, setdbname] = useState("default");
  const [dbreplica, setdbreplica] = useState(dbname);

  const [tododata, settododata] = useState([]);
  const { database, useDocument } = useFireproof(dbname);

  //So the thing is the value of the todos is not changing when the name of the database changes

  const [todo, setTodo, saveTodo] = useDocument({
    text: "",
  });

  function changed() {
    setdbname(dbreplica);
    fetchData();
  }

  async function fetchData() {
    const data = await database.query("text");
    settododata(data.rows);
  }

  return (
    <>
      <h1>Todo List</h1>
      <h3>Database name:{dbname}</h3>
      <input
        placeholder="Enter new database name"
        value={dbreplica}
        onChange={(e) => {
          setdbreplica(e.target.value);
        }}
      ></input>
      <button onClick={changed}>Ok</button>
      <input
        title="text"
        type="text"
        value={todo.text as string}
        onChange={(e) => setTodo({ text: e.target.value })}
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          saveTodo();
          setTodo(false);
          fetchData();
        }}
      >
        Save
      </button>
      <ul>
        {tododata.map((todo) => (
          <li key={todo.doc._id}>{todo.doc.text as string}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
