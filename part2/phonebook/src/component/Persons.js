import Person from './Person';
const Persons = ({ persons, onDelete }) => {
  return (
    <div>
      {persons.map((person) => (
        <Person key={person.name} person={person} onDelete={onDelete} />
      ))}
    </div>
  );
};
export default Persons;
