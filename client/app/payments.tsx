/* Payment Page
  This page will receive input from the 'Bill Page' 
    - Group Size: Determine how many boxes will be created 
    - Total Amount: Total amount of money from Bill, including Tip, Tax 
  Need to do:
  - Connect the button to send messages (Adrian said this might not work)
  - Input size from 'Bill' page 
*/
import React, { useState } from 'react';
import { View, TextInput, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';

// Temporary People Stored for now
const PaymentProcessingScreen = () => {
  const [people, setPeople] = useState([
    { id: '1', name: '', phone: '', amountOwed: '' },
    { id: '2', name: '', phone: '', amountOwed: '' },
    { id: '3', name: '', phone: '', amountOwed: ''},
    { id: '4', name: '', phone: '', amountOwed: ''}
  ]);

  const handleInputChange = (id: string, field: string, value: string) => {
    setPeople((prevPeople) =>
      prevPeople.map((person) =>
        person.id === id ? { ...person, [field]: value } : person
      )
    );
  };

  // Use for backend that'll use an API to send messages to the user's phone number.
  const handleSendMessage = () => {
    console.log('Send Message button clicked!'); 
  };

  return (
    <View style={styles.container}>
      {people.map((person) => (
        <View key={person.id} style={styles.card}>
          <Image
            source={require('@/assets/images/no_profile.jpg')}
            style={styles.profilePic}
          />
          <View style={styles.info}>
            <TextInput
              style={styles.input}
              placeholder="Enter Name"
              value={person.name}
              onChangeText={(text) => handleInputChange(person.id, 'name', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Phone"
              keyboardType="phone-pad"
              value={person.phone}
              onChangeText={(text) => handleInputChange(person.id, 'phone', text)}
            />
          </View>
          {/* 
          
          
          
          */}
          <TextInput
            style={styles.amountInput}
            placeholder="$0.00"
            keyboardType="numeric"
            value={person.amountOwed}
            onChangeText={(text) => handleInputChange(person.id, 'amountOwed', text)}
          />
        </View>
        
      ))}
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
