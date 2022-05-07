import React from "react";
import { Text, StyleSheet, View, TouchableOpacity, Alert } from "react-native";
import { Entypo } from "@expo/vector-icons";


const Header = ({ todos ,setTodos, visible }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Todos</Text>
      {visible || todos.length !==0 && ( <TouchableOpacity onPress={() => {
       Alert.alert(
          'Delete All',
        "Are you sure you want to delete all todos?",
        [
          {
            text: "Cancel",
            
            style: "cancel"
          },
          { text: "OK", onPress: () => setTodos([]) }
        ]
      );
      }}>
        <Entypo name="trash" size={24} color="black" />
      </TouchableOpacity>)}
     
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 25,
    backgroundColor: '#fbf8fb'
  },
  header: {
    fontSize: 50,
    fontWeight: "bold",
    fontStyle: "italic",
    margin: 30,
    marginLeft: 25,
    marginTop: 30,
  },
});
