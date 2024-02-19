import React, { useState } from 'react';
import { View, TextInput, Switch, SafeAreaView, StatusBar, StyleSheet, Text } from 'react-native';
import Button from '../../shared/Button';
import { storage } from '../../storage';
import Header from '../../components/header';

export default function TaskCreationScreen({ navigation, route }) {

  const { json, onRefresh } = route.params

  const INITIAL_STATE = {
    title: "",
    description: "",
    isCompleted: false
  }

  const [state, updateState] = useState(INITIAL_STATE)

  function onChangeTitle(event) {
    updateState((prevState) => ({
      ...prevState,
      title: event
    }))
  }

  function onChangeDescription(event) {
    updateState((prevState) => ({
      ...prevState,
      description: event
    }))
  }

  function addNewTask() {
    if(json && json.length) {
      json.push(state)
      storage.set('Card', JSON.stringify(json))
    } else {
      storage.set('Card', JSON.stringify([state]))
    }
    onRefresh()
    navigation.goBack()
  }

  function toggleSwitch() { 
    updateState((prevState) => ({
      ...prevState,
      isCompleted: !prevState.isCompleted
    }))
  }

    return (
      <SafeAreaView style={{ flex: 1 }}>
       <StatusBar backgroundColor="#50a9f3" />
        <View style={{flex:1, padding: 16}}>
          <Header text={"Add New Task Screen"}/>
          <TextInput 
            placeholder='Enter Title...'
            style={styles.textInput}
            onChangeText={onChangeTitle}
            value={state.title}
          />
          <TextInput 
            style={styles.textInput}
            placeholder='Enter Description...'
            onChangeText={onChangeDescription}
            value={state.description} 
          />
          <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
            <Text>State : </Text>
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={state.isCompleted ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={state.isCompleted}
            />
          </View>
          <Button
            styles={{borderRadius: 8, padding: 10, marginTop: 40}}
            title="Add new task"
            onPress={() => addNewTask()}
          />
        </View>
      </SafeAreaView>
    );
  }

  const styles = StyleSheet.create({
    textInput: {
      fontSize: 23,
      color: "#9b6666",
      marginTop: 16,
      paddingStart: 0,
      paddingBottom: 0,
    }
  })