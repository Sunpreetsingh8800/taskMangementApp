import React, { useEffect, useState } from 'react';
import {  SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import Button from '../../shared/Button';
import Card from '../../components/card';
import { storage } from '../../storage';

export default function HomeScreen({ navigation }) {

  const [json, SetJson] = useState(null)

  const [timeAndDate, setTimeAndDate] = useState(null)

  const [intervalId, setIntervalId] = useState() 

  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }
  
  function formatDate(date) {
    return (
      [
        padTo2Digits(date.getHours()),
        padTo2Digits(date.getMinutes()),
        padTo2Digits(date.getSeconds()),
      ].join(':') +
       ' ' +
      [
        padTo2Digits(date.getDate()),
        padTo2Digits(date.getMonth() + 1),
        date.getFullYear()
      ].join('-')
    );
  }

  function updateDateAndTime(dAndT) {
    setTimeAndDate(dAndT)
  }

  console.log(new Date(timeAndDate).getSeconds()+1)

  useEffect(() => {
    const jsonUser = storage.getString('Card')
    const userObject = JSON.parse(jsonUser)
    const myInterval = setInterval(() => updateDateAndTime(new Date()), 1000);
    setIntervalId(myInterval)
    SetJson(userObject);
  }, [])

  const refresh = () => {
    const jsonUser = storage.getString('Card')
    const userObject = JSON.parse(jsonUser)
    const myInterval = setInterval(() => updateDateAndTime(new Date()), 1000);
    setIntervalId(myInterval)
    SetJson(userObject)
  }

    return (
      <SafeAreaView style={{ flex: 1 }}>
         <StatusBar backgroundColor="#50a9f3" />
        <View style={{flex:1, padding: 16}}>
          <Text style={styles.timeAndDtae}>{timeAndDate && formatDate(timeAndDate)}</Text>
          <ScrollView>
           {json && json.length ? json.map(({title, description,isCompleted}, index) => {
            return (
              <Card 
                  onPress={() => {
                    clearInterval(intervalId);
                    navigation.navigate("TaskEditingScreen",{index: index, json: json, onRefresh: refresh})}
                  }
                  title={title}
                  description={description}
                  isCompleted={isCompleted}
              /> 
            )
           }): 
           <View style={styles.emptyStateWrapper}>
            <Text style={styles.emptyState}>No records found, Please click on Add task button to create. Thank you!</Text>
           </View>}
          </ScrollView>
          <View style={{justifyContent: 'flex-end', flex: 1, minHeight: 60}}>
            <Button
              styles={{borderRadius: 8, padding: 10, marginTop: 10}}
              title="Add Task"
              onPress={() => {
                clearInterval(intervalId);
                navigation.navigate('TaskCreationScreen', {json: json, onRefresh: refresh})}
              }
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
  

  const styles= StyleSheet.create({
    emptyState: {
      fontSize: 12,
      color: 'grey',
      textAlign: 'center'
    },
    timeAndDtae: {
      color: "red", 
      fontSize: 16, 
      paddingVertical: 24
    },
    emptyStateWrapper: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }
  })