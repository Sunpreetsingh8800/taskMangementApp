import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';


export default function Card({onPress, title, description, isCompleted}) {
    return (
        <TouchableOpacity onPress={onPress} style={[{backgroundColor: 'pink', borderRadius: 10, padding: 10, marginBottom: 10 }, isCompleted && {backgroundColor: 'green'}]}>
              <Text>{`Title: ${title}`}</Text>
              <Text>{`Description: ${description}`}</Text>
              <Text>{`State: ${isCompleted ? "Complete" : "Incomplete"}`}</Text>
        </TouchableOpacity>
    )
}