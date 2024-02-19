import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet,Switch,Text, TextInput, View } from 'react-native';
import Button from '../../shared/Button';
import Header from '../../components/header';
import { storage } from '../../storage';


export default function TaskEditingScreen({ navigation, route }) {

  const { index, json, onRefresh } = route.params
  console.log(index,'::::index')

  const INITIAL_STATE = {
    title: json[index].title,
    description: json[index].description,
    isCompleted: json[index].isCompleted
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

  function toggleSwitch() { 
    updateState((prevState) => ({
      ...prevState,
      isCompleted: !prevState.isCompleted
    }))
  }


  function deleteTask() {
    if(json.length) {
      json.splice(index, 1)
      storage.set('Card', JSON.stringify(json))
    } else {
      storage.delete('Card')
    }
    onRefresh()
    navigation.goBack()
  }

  function editTask() {
    if(json.length) {
      json.splice(index, 1, state)
      storage.set('Card', JSON.stringify(json))
    } else {
      storage.delete('Card')
      storage.set('Card', JSON.stringify([state]))
    }
    onRefresh()
    navigation.goBack()
  }

    return (
      <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor="#50a9f3" />
       <View style={{flex:1, padding: 16}}>
        <Header text={"Edit Task Screen"}/>
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
            title="Save"
            onPress={() => editTask()}
          />
        <Button
            styles={{borderRadius: 8, padding: 10, marginTop: 40}} 
            title="Delete Task" 
            onPress={() => deleteTask()}
         />
      </View>
      </SafeAreaView>
    );
  }

  export const styles = StyleSheet.create({
    textInput: {
      fontSize: 23,
      color: "#9b6666",
      marginTop: 16,
      paddingStart: 0,
      paddingBottom: 0,
    }
  })