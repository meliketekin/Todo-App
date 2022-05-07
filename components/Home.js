import React, { useState, useEffect } from "react";

import Header from "./Header";
import ListTodos from "./ListTodos";
import AsyncStorage from "@react-native-async-storage/async-storage";


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

  useEffect(async () => {
    try {
      const todos = await AsyncStorage.getItem("todos");
      if (todos !== null) {
        setTodos(JSON.parse(todos));
      }
    } catch (error) {
      console.log(error);
    }
  }, []); // [] means that this effect will run when app loads

  useEffect(async () => {
    await AsyncStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

 

  return (
    <>
      <Header todos={todos} setTodos={setTodos} visible={visible} />
      <ListTodos
        todos={todos}
        setTodos={setTodos}
        visible={visible}
        setVisible={setVisible}
      />
    </>
  );
};

export default Home;
