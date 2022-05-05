import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  Dimensions,
  Animated,
  Keyboard
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const ListTodos = ({ todos, setTodos }) => {
  const [visible, setVisible] = useState(false);
  const [todo, setTodo] = useState({});
  const [animation, setAnimation] = useState(new Animated.Value(0));

  const modalTrigger = () => {
    setVisible(true);
    Animated.timing(animation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const openModal = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const closeModal = animation.interpolate({
    inputRange: [1, 2],
    outputRange: [0, -height],
    extrapolate: "clamp",
  });

  const close = () => {
    
    Animated.timing(animation, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
    
  };

  const addToDo = () => {
    Animated.timing(animation, {
      toValue: 2,
      duration: 500,
      useNativeDriver: false,
    }).start(() => {
      animation.setValue(0);
    });
  };

  const open = {
    transform: [{ scale: openModal }, { translateY: closeModal }],
  };

  return (
    <>
      <View style={styles.container}>
          {!visible && (
        <FlatList
          data={todos}
          renderItem={(data) => {
            return (
              <View style={styles.todoItem}>
                <Text
                  style={
                    !data.item.completed
                      ? styles.todoText
                      : styles.completedTodoText
                  }
                >
                  {data.item.text}
                </Text>
                <TouchableOpacity
                  style={styles.todoCheck}
                  onPress={() => {
                    setTodos((prevTodos) => {
                      return prevTodos.map((todo) => {
                        if (todo.id === data.item.id) {
                          return {
                            ...todo,
                            completed: !todo.completed,
                          };
                        }
                        return todo;
                      });
                    });
                  }}
                >
                  <Feather
                    name={data.item.completed ? "check-circle" : "circle"}
                    size={24}
                    color={data.item.completed ? "#019d6a" : "black"}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.todoDelete}
                  onPress={() => {
                    //return todos without the todo that was deleted
                    setTodos((prevTodos) => {
                      return prevTodos.filter(
                        (todo) => todo.id !== data.item.id
                      );
                    });
                  }}
                >
                  <Feather name="trash-2" size={24} color="black" />
                </TouchableOpacity>

                <Text style={styles.todoDate}>{data.item.date}</Text>
              </View>
            );
          }}
        />
        )}
      </View>

      {!visible && (
        <TouchableOpacity
          style={{ position: "absolute", bottom: 20, right: 20 }}
          onPress={modalTrigger}
        >
          <Ionicons name="add-circle" size={60} color="#9c64a6" />
        </TouchableOpacity>
      )}

      {visible && (
        <TouchableOpacity
          style={{ position: "absolute", bottom: 20, right: 20 }}
          onPress={() => {
              close();
              setTimeout(() =>{setVisible(false);}, 500);
               
        }}
        >
          <Ionicons name="close-circle" size={60} color="#9c64a6" />
        </TouchableOpacity>
      )}

      <Animated.View style={open}>
      
        <KeyboardAvoidingView style={styles.createToDo}>
          <TextInput style={{borderBottomColor: 'grey', borderBottomWidth:1, padding:7}}
            placeholder="What to do? 🙃"
            multiline={true}
            onChangeText={(text) => setTodo({ ...todo, text: text })}
            value={todo.text}
          />
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                todo.importance == "high"
                  ? setTodo({ ...todo, importance: "" })
                  : setTodo({ ...todo, importance: "high" });
              }}
            >
              <Ionicons
                name={
                  todo.importance == "high" ? "stop-circle" : "ellipse-outline"
                }
                color="red"
                size={25}
              />
              <Text style={{ color: "red", fontSize: 12 }}>Very important</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                todo.importance == "low"
                  ? setTodo({ ...todo, importance: "" })
                  : setTodo({ ...todo, importance: "low" });
              }}
            >
              <Ionicons
                name={
                  todo.importance == "low" ? "stop-circle" : "ellipse-outline"
                }
                color="green"
                size={25}
              />
              <Text style={{ color: "green", fontSize: 12 }}>
                Not important
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{
              height: 40,
              width: width * 0.8,
              backgroundColor: "#9c64a6",
              alignSelf: "center",
              justifyContent: "center",
              marginTop: 25,
              borderRadius: 10,
              marginBottom: 10,
            }}
            onPress={() => {
              setTodos({ ...todos, id: Math.random() });
              setTodos([...todos, todo]);
              setTodo({});
              setVisible(false);
              addToDo();
              Keyboard.dismiss();
            }}
          >
            <Text style={{ color: "white", fontSize: 15, alignSelf: "center" }}>
              ADD
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
        
      </Animated.View>
    </>
  );
};

export default ListTodos;

const styles = StyleSheet.create({
  todoItem: {
    borderColor: "#ce93d8",
    backgroundColor: "#f3e5f5",
    borderTopLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderWidth: 1,
    margin: 10,
    marginHorizontal: 20,
    padding: 15,
    height: 70,
  },
  todoText: {
    fontSize: 15,
    paddingLeft: 13,
  },
  completedTodoText: {
    fontSize: 15,
    paddingLeft: 13,
    textDecorationLine: "line-through",
    color: "black",
  },
  todoDate: {
    fontSize: 10,
    color: "#7f7f7f",
    alignSelf: "flex-end",
    marginTop: 13,
  },
  todoCheck: {
    alignSelf: "flex-end",
    marginTop: -16,
    marginRight: 10,
  },
  todoDelete: {
    alignSelf: "flex-end",
    marginTop: -26,
    marginRight: 60,
  },
  createToDo: {
    borderColor: "#ce93d8",
    backgroundColor: "#f3e5f5",
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderWidth: 1,
    marginTop:100,
    margin: 20,
    padding: 15,
    width: width * 0.9,
    shadowColor: "#a792cd",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 9,
    elevation: 2,
  },
});
