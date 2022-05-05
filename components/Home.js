import React, { useState } from "react";

import Header from "./Header";
import ListTodos from "./ListTodos";

const Home = () => {
  const initialTodos = [
    {
      id: 1,
      text: "Learn React Native",
      importance: "high",
      date: "Fri, 05 May 2022 15:00:00 GMT",
      completed: false,
    },
    {
      id: 2,
      text: "Learn React",
      importance: "high",
      date: "Fri, 05 May 2022 15:00:00 GMT",
      completed: false,
    },
  ];

  const [todos, setTodos] = useState(initialTodos);

  return (
    <>
      <Header />
      <ListTodos todos={todos} setTodos={setTodos} />
    </>
  );
};

export default Home;
