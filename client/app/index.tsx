import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { useRouter } from 'expo-router';  


export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();  

  const handleTotalBillChange = (text: string) => {
    let cleanedText = text.replace(/[^0-9.]/g, '');

    if ((cleanedText.match(/\./g) || []).length > 1) {
      return;
    }
    setNumberInput(cleanedText ? `$${cleanedText}` : '');
  };

  const handleGroupInputChange = (text: string) => {
    let cleanedText = text.replace(/[^0-9.]/g, '');

    setGroupSizeInput(cleanedText ? `#${cleanedText}` : '');
  };

    const goToPaymentsPage = () => {
        router.push({
            pathname: '/payments',
        });
    };

    const goToUserLogin = () => {
        router.push({
            pathname: '/user_login',
        });
    };
    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.header}>Bill Split Hack</Text>
            </View>
            <TextInput
                style={styles.input}
                placeholder="Enter Total Bill"
                keyboardType="numeric"
                value={numberInput}
                onChangeText={handleTotalBillChange}
                />
            <TextInput
                style={styles.input}
                placeholder="Enter Group Size"
                keyboardType="numeric"
                value={groupSizeInput}
                onChangeText={handleGroupInputChange}
                />
            {/* Tip Selection */}
            <Text style={styles.label}>Select Tip Percentage:</Text>
            <View style={styles.tipContainer}>

            </View>

            {/* Submit Button */}
            <View style={styles.buttonContainer}>
                <Button title="SUBMIT" onPress={goToPaymentsPage} color="#28a745" />
            </View>
            <View style={styles.buttonContainer}>
                <Button title="User Login Page" onPress={goToUserLogin} color="#28a745" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f0f0f0',
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    input: {
        height: 40,
        width: '60%',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 10,
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 16,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    tipContainer: {
        flexDirection: 'row',
        justifyContent:'center',
        gap: 10,
        marginBottom: 20,
    },
    tipButton: {
        backgroundColor: '#ddd',
        padding: 10,
        borderRadius: 10,
        minWidth: 50,
        alignItems: 'center',
    },
    selectedTipButton: {
        backgroundColor: '#4CAF50', 
    },
    tipText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonContainer: {
        width: '50%',
        marginVertical: 15,
    },
});
