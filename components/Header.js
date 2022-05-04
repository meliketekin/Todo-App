import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";


const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Todos</Text>
      <TouchableOpacity>
        <Entypo name="trash" size={24} color="black" />
      </TouchableOpacity>
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
  },
  header: {
    fontSize: 50,
    fontWeight: "bold",
    fontStyle: "italic",
    margin: 30,
    marginTop: 30,
  },
});
