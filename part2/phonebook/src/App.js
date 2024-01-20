import { useEffect, useState } from "react";
import Persons from "./component/Persons";
import PersonForm from "./component/PersonForm";
import Filter from "./component/Filter";
import PersonService from "./services/Persons";
import Notification from "./component/Notification";
import Footer from "./component/Footer";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    PersonService.getAllPersons()
      .then((initialNotes) => {
        setPersons(initialNotes);
      })
      .catch((error) => {
        console.error("Failed to get persons", error);
        setErrorMessage(`fail to get persons`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
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
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        PersonService.updatePerson(nameExists.id, personObject)
          .then((returnedNote) => {
            setPersons(
              persons.map((person) =>
                person.id !== nameExists.id ? person : returnedNote
              )
            );
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            console.error("Failed to update person", error);
            setErrorMessage(
              `Information of ${newName} has already been removed from server`
            );
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
          });
      }
    } else {
      PersonService.createPerson(personObject)
        .then((returnedNote) => {
          setPersons(persons.concat(returnedNote));
          setNewName("");
          setNewNumber("");
          setSuccessMessage(`Added ${newName}`);
          setTimeout(() => {
            setSuccessMessage(null);
          }, 5000);
        })
        .catch((error) => {
          console.error("Failed to create person", error);
          const errorMessage =
            error.response && error.response.data
              ? error.response.data.error
              : `fail to create ${newName}`;
          setErrorMessage(errorMessage);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
    }
  };

  const handleDeletePerson = (id) => {
    const person = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      PersonService.deletePerson(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((error) => {
          console.error("Failed to delete person", error);
          setErrorMessage(`fail to delete ${person.name}`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
    }
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
    search === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(search.toLowerCase())
        );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        errorMessage={errorMessage}
        successMessage={successMessage}
      />
      <Filter search={search} handleSearch={handleSearch} />
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleAddPerson={handleAddPerson}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} onDelete={handleDeletePerson} />
      <Footer />
    </div>
  );
};

export default App;
