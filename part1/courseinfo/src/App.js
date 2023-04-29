const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Part = ({ part, exercises }) => {
  return (
    <>
      <p>
        {part} {exercises}
      </p>
    </>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} part={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
};

const Total = ({ parts }) => {
  const total = parts.reduce((acc, part) => acc + part.exercises, 0);
  return <p>Number of exercises {total}</p>;
};

// const Total = (props) => {
//   const { parts } = props;
//   let totalExercises = 0;

//   for (let i = 0; i < parts.length; i++) {
//     totalExercises += parts[i].exercises;
//   }

//   return (
//     <p>Total number of exercises {totalExercises}</p>
//   )
// }

const App = () => {
  const course = "Half Stack application development";
  const parts = [
    {
      id: 1,
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      id: 2,
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      id: 3,
      name: "State of a component",
      exercises: 14,
    },
  ];

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

export default App;
