import React from "react";

const PersonForm = ({
  newName,
  newNumber,
  handleNameChange,
  handleNumberChange,
  addName,
}) => {
  return (
    <form onSubmit={addName}>
      <h2>add a new</h2>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <button type="submit">add</button>
    </form>
  );
};

export default PersonForm;
