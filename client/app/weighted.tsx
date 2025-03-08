import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function SplitType(){
    const router = useRouter();
}

return (
    <View style={styles.container}>
                <Text style={styles.header}>Bill Split Hack</Text>
    
                <TextInput
                    style={styles.input}
                    placeholder="Enter Total Bill"
                    keyboardType="numeric"
                    value={numberInput}
                    onChangeText={setNumberInput}
                />
        </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f0f0f0',
    });