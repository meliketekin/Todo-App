import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';

const ListTodos = ({todos,setTodos}) => {
    return (
        <SwipeListView
            data={todos}
            renderItem={(data) => {
                return (
                    <View style={styles.todoItem}>
                        <Text style={styles.todoText}>{data.item.text}</Text>
                    </View>
                 
                )
            }}
        />
        
                
    );

}

export default ListTodos;

const styles = StyleSheet.create ({
    todoItem: {
        borderColor: '#ce93d8',
      backgroundColor: '#f3e5f5',
      borderTopRightRadius: 30,
      borderBottomLeftRadius: 30,
      borderWidth: 1,
      margin: 20,
      padding: 15,
      height: 70,
    },
    todoText: {
        fontSize: 13,
    },
});