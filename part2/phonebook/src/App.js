import { useState } from "react";
import Filter from "./component/Filter";
import PersonForm from "./component/PersonForm";
import Persons from "./component/Persons";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Artos Hellas" }]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");

  const addName = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };
    const nameAlreadyExists = persons.some(
      (person) => person.name === nameObject.name
    );

    if (nameAlreadyExists) {
      alert(`${nameObject.name} is already added to phonebook`);
      return;
    }

    setPersons(persons.concat(nameObject));
    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterName(event.target.value);
  };

  const personsToShow =
    filterName === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(filterName.toLowerCase())
        );

  const handleDelete = (id) => {
    setPersons(persons.filter((person) => person.id !== id));
  };

  const handleShowDetails = (id) => {
    console.log(`Show details for person with id ${id}`);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter Value={filterName} onChange={handleFilterChange} />
      <PersonForm
        onSubmit={addName}
        nameValue={newName}
        nameOnChange={handleNameChange}
        numberValue={newNumber}
        numberOnChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        persons={personsToShow}
        onDelete={handleDelete}
        onShowDetails={handleShowDetails}
      />
    </div>
  );
};

export default App;
