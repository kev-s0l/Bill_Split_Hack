import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function MenuScreen() {
  const [numberInput, setNumberInput] = useState('');
  const [groupSizeInput, setGroupSizeInput] = useState('');
  const [tipAmount, setTipAmount] = useState('');
    
  const tipOptions = [15, 18, 20, 'Custom'];
  const router = useRouter();

  // Cleaning Amount Value, and for asthetics include a "$"
  const handleTotalBillChange = (text: string) => {
    let cleanedText = text.replace(/[^0-9.]/g, '');

    if ((cleanedText.match(/\./g) || []).length > 1) {
      return;
    }
    setNumberInput(cleanedText ? `$${cleanedText}` : '');
  };
  // Cleaning Group Size, and for asthetics include a "#"

  const handleGroupInputChange = (text: string) => {
    let cleanedText = text.replace(/[^0-9.]/g, '');

    setGroupSizeInput(cleanedText ? `#${cleanedText}` : '');
  };

  // Going to different pages for right now. Simple temp buttons
  const goToPaymentsPage = () => {
    if (!numberInput || !groupSizeInput) {
      alert('Please enter both Bill Amount and Group Size.');
      return;
    }

    const cleanBillSize = numberInput.replace('$', '');
    const cleanGroupSize = numberInput.replace('#', '');

    router.push({
        pathname: '/payments',
        params: {
            bill: cleanBillSize,
            groupSize: cleanGroupSize,
        },
    });
  };

    const goToUserLogin = () => {
        router.push({
            pathname: '/user_login',
        });
    };
    
    return (
        // Header
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
                <Button title="User Login Page TEMP" onPress={goToUserLogin} color="#28a745" />
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