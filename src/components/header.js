import React from 'react';
import { StyleSheet, Text } from "react-native"


export default function Header({text}) {
    return <Text style={styles.header}>{text}</Text>
}

const styles = StyleSheet.create({
    header: {
      fontSize: 23,
      color: "#9b6666",
      fontWeight: 'bold',
      paddingVertical: 16
    }
})