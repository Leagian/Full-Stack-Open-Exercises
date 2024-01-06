import React from 'react';

const Person = ({ person, onDelete }) => {
  const handleDelete = () => onDelete(person.id);

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <p style={{ marginRight: '10px' }}>
        {person.name} {person.number}
      </p>
      <button onClick={handleDelete}>delete</button>
    </div>
  );
};

export default Person;
