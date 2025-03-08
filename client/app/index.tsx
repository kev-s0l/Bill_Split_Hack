import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function MenuScreen() {
  const [numberInput, setNumberInput] = useState('');
  const [groupSizeInput, setGroupSizeInput] = useState('');
  const [tipAmount, setTipAmount] = useState('');
    
  const tipOptions = [5, 10,15,20];
  const router = useRouter();

    const handlePress = () => {
        const totalBill = parseFloat(numberInput);
        const groupSize = parseInt(groupSizeInput);
        const tip = tipAmount ?? 0;
        router.push({
            pathname: '/payments',
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
                onChangeText={setNumberInput}
            />
            <TextInput
                style={styles.input}
                placeholder="Enter Group Size"
                keyboardType="numeric"
                value={numberInput}
                onChangeText={setNumberInput}
            />
                    {/* Tip Selection */}
                    <Text style={styles.label}>Select Tip Percentage:</Text>
            <View style={styles.tipContainer}>
                {tipOptions.map((tip) => (
                    <TouchableOpacity
                        key={tip}
                        style={[
                            styles.tipButton,
                            parseInt(tipAmount) === tip && styles.selectedTipButton,
                        ]}
                        onPress={() => setTipAmount(tip)}
                    >
                        <Text style={styles.tipText}>{tip}%</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Submit Button */}
            <View style={styles.buttonContainer}>
                <Button title="SUBMIT" onPress={handlePress} color="#28a745" />
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