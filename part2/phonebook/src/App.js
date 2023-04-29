import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Artos Hellas" }]);
  const [newName, setNewName] = useState("");

  const addName = (event) => {
    event.preventDefault();
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <button type="submit">add</button>
      </form>
      <h2>Number</h2>
    </div>
  );
};

export default App;
