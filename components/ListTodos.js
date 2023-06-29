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
  Keyboard,
  Image,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const ListTodos = ({ todos, setTodos, visible, setVisible }) => {
  const [todo, setTodo] = useState({ text: "", importance: "normal" });
  const [animation, setAnimation] = useState(new Animated.Value(0));
  const [emptyInput, setEmptyInput] = useState(false);

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
  const EmptyComponent = () => {
    return (
      <View>
        <Image
          source={require("../assets/emptyTodo.png")}
          style={{
            width: width / 1.2,

            resizeMode: "contain",
            alignSelf: "center",
          }}
        />
        <Text
          style={{
            alignSelf: "center",
            fontSize: 20,
            color: "grey",
            fontWeight: "bold",
          }}
        >
          What are you going to do today?
        </Text>
        <Text
          style={{
            alignSelf: "center",
            fontSize: 17,
            paddingTop: 15,
            color: "grey",
            fontWeight: "bold",
          }}
        >
          Add a todo to get started!
        </Text>
      </View>
    );
  };
  const open = {
    transform: [{ scale: openModal }, { translateY: closeModal }],
  };
  if (visible) {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={{ flex: 1, backgroundColor: "#fbf8fb" }}
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <Animated.View style={open}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.createToDo}
          >
            <TextInput
              style={
                !emptyInput
                  ? {
                      borderBottomColor: "grey",
                      borderBottomWidth: 1,
                      paddingTop: 10,
                      padding: 7,
                    }
                  : {
                      borderColor: "#f72300",
                      padding: 15,
                      paddingTop: 15,
                      borderWidth: 2,
                      borderRadius: 5,
                    }
              }
              spellCheck={false}
              autoCorrect={false}
              placeholder="What to do? 🙃"
              multiline={true}
              onChangeText={(text) => {
                setTodo({ ...todo, text: text });
                setEmptyInput(false);
              }}
              value={todo.text}
            />

            {emptyInput && (
              <Text style={{ color: "red", paddingTop: 5, paddingLeft: 5 }}>
                Your todo cannot be empty!
              </Text>
            )}

            <View style={{ flexDirection: "row", marginTop: 20 }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => {
                  todo.importance == "important"
                    ? setTodo({ ...todo, importance: "" })
                    : setTodo({ ...todo, importance: "important" });
                }}
              >
                <Ionicons
                  name={
                    todo.importance == "important"
                      ? "radio-button-on"
                      : "radio-button-off"
                  }
                  color={"red"}
                  size={25}
                />
                <Text
                  style={{
                    color: "red",
                    fontSize: 12,
                    fontWeight:
                      todo.importance == "important" ? "bold" : "normal",
                  }}
                >
                  Very important
                </Text>
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
                    todo.importance == "low"
                      ? "radio-button-on"
                      : "radio-button-off"
                  }
                  color="green"
                  size={25}
                />
                <Text
                  style={{
                    color: "green",
                    fontSize: 12,
                    fontWeight: todo.importance == "low" ? "bold" : "normal",
                  }}
                >
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
                marginBottom: 20,
              }}
              onPress={() => {
                const newTodo = {
                  ...todo,
                  id: todos.length + 1,
                  date: new Date().toUTCString(),
                  importance: todo.importance ? todo.importance : "normal",
                };

                if (todo?.text) {
                  //if there is text in the todo
                  setEmptyInput(false);
                  setTodos([...todos, newTodo]);
                  console.log(newTodo);
                  setTodo({});
                  setVisible(false);
                  addToDo();
                  Keyboard.dismiss();
                } else {
                  setEmptyInput(true);
                }
              }}
            >
              <Text
                style={{ color: "white", fontSize: 15, alignSelf: "center" }}
              >
                ADD
              </Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </Animated.View>
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
              setTodo({ text: "", importance: "normal" });
              close();
              setTimeout(() => {
                setVisible(false);
                setEmptyInput(false);
              }, 500);
            }}
          >
            <Ionicons name="close-circle" size={60} color="#9c64a6" />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  }

  return (
    <>
      <View
        style={[
          styles.container,
          {
            backgroundColor: !todos.length && !visible ? "#fbf8fb" : "#fbf8fb",
          },
        ]}
      >
        {!visible && (
          <FlatList
            ListEmptyComponent={<EmptyComponent />}
            data={
              todos
                ? todos
                    .sort((a, b) => a.importance.length > b.importance.length)
                    .sort(
                      (a, b) => a.importance == b.importance && a.date < b.date
                    )
                : []
            }
            renderItem={({ item }) => {
              return (
                <View
                  style={[
                    styles.todoItem,
                    {
                      borderColor:
                        item.importance == "important"
                          ? "red"
                          : item.importance == "low"
                          ? "green"
                          : "#ce93d8",
                      backgroundColor:
                        item.importance == "important"
                          ? "#ffdbdb"
                          : item.importance == "low"
                          ? "#d1e9e1"
                          : "#f3e5f5",
                    },
                  ]}
                >
                  <Text
                    style={
                      !item.completed
                        ? styles.todoText
                        : styles.completedTodoText
                    }
                  >
                    {item.text}
                  </Text>
                  <View style={{ position: "absolute", top: 34, right: 15 }}>
                    <TouchableOpacity
                      style={styles.todoCheck}
                      onPress={() => {
                        setTodos((prevTodos) => {
                          return prevTodos.map((todo) => {
                            if (todo.id === item.id) {
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
                        name={item.completed ? "check-circle" : "circle"}
                        size={24}
                        color={item.completed ? "#019d6a" : "black"}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.todoDelete}
                      onPress={() => {
                        //return todos without the todo that was deleted
                        setTodos((prevTodos) => {
                          return prevTodos.filter(
                            (todo) => todo.id !== item.id
                          );
                        });
                      }}
                    >
                      <Feather name="trash-2" size={24} color="black" />
                    </TouchableOpacity>

                    <Text style={styles.todoDate}>{item.date}</Text>
                  </View>
                </View>
              );
            }}
            //keyextractor ????
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
            setTimeout(() => {
              setVisible(false);
            }, 500);
          }}
        >
          <Ionicons name="close-circle" size={60} color="#9c64a6" />
        </TouchableOpacity>
      )}
    </>
  );
};

export default ListTodos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 90,
  },
  todoItem: {
    borderRadius: 10,
    borderWidth: 1,
    margin: 10,
    marginHorizontal: 20,
    padding: 15,
    paddingLeft: 10,
    height: 70,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  todoText: {
    fontSize: 15,
    paddingLeft: 13,
    marginRight: 100,
  },
  completedTodoText: {
    fontSize: 15,
    paddingLeft: 13,
    marginRight: 100,
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
    marginTop: 100,
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
