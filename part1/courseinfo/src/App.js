import React from "react";

const Header = ({ course }) => {
  return <h1>{course.name}</h1>;
};

const Part = ({ part }) => {
  return <p>{part.name}</p>;
};

const Content = ({ course }) => {
  return (
    <React.Fragment>
      {course.parts.map((part, index) => (
        <Part key={index} part={part} />
      ))}
    </React.Fragment>
  );
};

const Total = ({ course }) => {
  const totalExercises = course.parts.reduce(
    (accumulator, part) => accumulator + part.exercises,
    0
  );

  return <p>Number of exercises {totalExercises}</p>;
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

export default App;
