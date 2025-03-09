import React, { useState, useEffect } from 'react';
import { View, TextInput, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

const PaymentProcessingScreen = () => {
  const { bill, group, restaurant_Name, chosenTip } = useLocalSearchParams();

  // Had problems here for some reason, when bringing the values over
  const billString = Array.isArray(bill) ? bill[0] : bill;
  const groupString = Array.isArray(group) ? group[0] : group;
  const tipString = Array.isArray(chosenTip) ? chosenTip[0] : chosenTip;
  const totalBill = billString ? parseFloat(billString).toFixed(2) : '0.00';
  const groupSize = groupString ? parseInt(groupString, 10) : 1;
  const totalTip = tipString ? parseInt(tipString).toFixed(2) : '0.00';

  const fixBillAmount = () => {
    const decimalTip = parseInt(totalTip) / 100;
    const correctBillAmount = parseInt(totalBill) + (parseInt(totalBill) * decimalTip);
    return correctBillAmount.toFixed(2);  // Returns the total bill amount formatted to two decimal places
  };
  // Initialize people state based on group size
  const [people, setPeople] = useState(
    Array.from({ length: groupSize }, (_, index) => ({
      id: (index + 1).toString(),
      name: '',
      phone: '',
      amountOwed: '',
    }))
  );

  useEffect(() => {
    setPeople(
      Array.from({ length: groupSize }, (_, index) => ({
        id: (index + 1).toString(),
        name: '',
        phone: '',
        amountOwed: '',
      }))
    );
  }, [groupSize]); // Reinitialize when group size changes

  const handleInputChange = (id: string, field: string, value: string) => {
    let cleanedValue = value;

      if (field === 'name') {
        cleanedValue = value.replace(/[^A-Za-z\s]/g, ''); // Allow only letters and spaces
      } else if (field === 'email') {
        cleanedValue = value.replace(/[^a-zA-Z0-9@._-]/g, ''); // Allow valid email characters
      } else if (field === 'amountOwed') {
        // Remove all non-numeric characters
        cleanedValue = value.replace(/\D/g, '');

        // Remove leading zeros (if any)
        cleanedValue = cleanedValue.replace(/^0+/, '');

        if (cleanedValue.length === 0) {
          cleanedValue = ''; // Empty field if nothing is entered
        } else if (cleanedValue.length === 1) {
          cleanedValue = `0.0${cleanedValue}`; // "5" → "0.05"
        } else if (cleanedValue.length === 2) {
          cleanedValue = `0.${cleanedValue}`; // "75" → "0.75"
        } else {
          // Insert decimal before last two digits
          cleanedValue = `${cleanedValue.slice(0, -2)}.${cleanedValue.slice(-2)}`;
        }
      }

    setPeople((prevPeople) =>
      prevPeople.map((person) =>
        person.id === id ? { ...person, [field]: cleanedValue } : person
      )
    );
  };
  
  // Handle sending messages (for backend integration)
  const handleSendMessage = () => {
    console.log('Send Message button clicked!', people);
  };

  return (
    <View style={styles.container}>
      {/* Total Bill Header */}
      <View style={styles.header}>
      <Text style={styles.headerText}>Restaurant Name: {restaurant_Name}{}</Text>
        <Text style={styles.headerText}>Total Bill: ${fixBillAmount()}</Text>
        
      </View>

      {/* Dynamic Input Fields for Each Person */}
      {people.map((person) => (
        <View key={person.id} style={styles.card}>
          <Image source={require('@/assets/images/no_profile.jpg')} style={styles.profilePic} />
          <View style={styles.info}>
            <TextInput
              style={styles.input}
              placeholder="Enter Name"
              value={person.name}
              onChangeText={(text) => handleInputChange(person.id, 'name', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Email"
              value={person.phone}
              onChangeText={(text) => handleInputChange(person.id, 'phone', text)}
            />
          </View>
          <TextInput
            style={styles.amountInput}
            placeholder="$0.00"
            keyboardType="numeric"
            value={person.amountOwed}
            onChangeText={(text) => handleInputChange(person.id, 'amountOwed', text)}
          />
        </View>
      ))}

      {/* Send Message Button */}
      <TouchableOpacity style={styles.button} onPress={handleSendMessage}>
        <Text style={styles.buttonText}>Send Message</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  header: {

    flexDirection: "column", // Align buttons horizontally
    justifyContent: "center", // Center them
    alignItems: "center",
    marginBottom: 15,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  info: {
    flex: 1,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    fontSize: 14,
    marginBottom: 5,
    paddingVertical: 5,
  },
  amountInput: {
    width: 80,
    textAlign: 'right',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#dc3545',
  },
  button: {
    backgroundColor: '#28a745', // Green button
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 'auto', // Pushes it to the bottom
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PaymentProcessingScreen;
