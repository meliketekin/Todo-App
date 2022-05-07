import React, { useState } from "react";

import Header from "./Header";
import ListTodos from "./ListTodos";

const Home = () => {
  // const initialTodos = [
  //   {
  //     id: 5,
  //     text: "Learn React Native",
  //     importance: "high",
  //     date: "Fri, 05 May 2022 15:00:00 GMT",
  //     completed: false,
  //   },
  //   {
  //     id: 6,
  //     text: "Learn React",
  //     importance: "high",
  //     date: "Fri, 05 May 2022 15:00:00 GMT",
  //     completed: false,
  //   },
  // ];

  const [todos, setTodos] = useState([]);
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Header todos={todos} setTodos={setTodos} visible={visible} />
      <ListTodos todos={todos} setTodos={setTodos} visible={visible} setVisible={setVisible} />
    </>
  );
};

export default Home;
