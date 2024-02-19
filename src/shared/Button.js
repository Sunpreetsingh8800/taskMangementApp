import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';


export default function Button({onPress, title, styles, textStyles}) {
    return (
        <TouchableOpacity style={[{backgroundColor: "#007AFF", flexDirection: 'row',justifyContent: 'center', alignItems: 'center'},styles]} onPress={() => onPress()}>
            <Text style={[{color: 'white', fontSize: 14}, textStyles]}>{title}</Text>
        </TouchableOpacity>
    )
}