import Person from "./Person";
const Persons = ({ persons, onDelete }) => {
  return (
    <div>
      {persons.map((person) => (
        <Person key={person.name} person={person} deletePerson={onDelete} />
      ))}
    </div>
  );
};
export default Persons;
