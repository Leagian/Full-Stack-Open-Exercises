import axios from 'axios';
import { useEffect, useState } from 'react';
import Persons from './component/Persons';
import PersonForm from './component/PersonForm';
import Filter from './component/Filter';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then((response) => {
      setPersons(response.data);
    });
  }, []);

  const handleAddPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };
    const nameExists = persons.find((person) => person.name === newName);
    if (nameExists) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    axios
      .post('http://localhost:3001/persons', personObject)
      .then((response) => {
        setPersons(persons.concat(response.data));
      });
    setNewName('');
    setNewNumber('');
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const personsToShow =
    search === ''
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(search.toLowerCase())
        );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} handleSearch={handleSearch} />
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleAddPerson={handleAddPerson}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  );
};

export default App;
