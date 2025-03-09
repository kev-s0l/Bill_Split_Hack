import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Pressable, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router'; 
import { LinearGradient } from 'expo-linear-gradient';  

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();  

  const handleLogin = () => {
    router.push('/');  
  };

  return (
    <LinearGradient
      colors={['#EA8D8D', '#A890FE']}
      style={styles.gradient}
    >
      
        <Text style={styles.header}>Register</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TextInput
          style={styles.input}
          placeholder="Confirm your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      <Pressable style={styles.buttonContainer} onPress={handleLogin}>
        <Text style={styles.buttonText}>Register</Text>
      </Pressable>

        <Text style={styles.footer}>
          Already have an account?{' '}
          <Pressable onPress={() => router.push('/')}>
            <Text style={styles.link}>Login</Text>
          </Pressable>
        </Text>  
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 0,
  },
  container: {
    width: '90%', 
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 15,
    alignItems: 'center',
  },
  header: {
    fontSize: 60,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    height: 50,
    width: '50%',
    borderColor: '#000000',
    borderWidth: 2,
    borderRadius: 20,
    backgroundColor:"#FFFFFF",    
    marginBottom: 20,
    paddingLeft: 10,
    fontSize: 18,
  },
  footer: {
    marginTop: 20,
    fontSize: 16,
    color: '#FFFF',
  },
  link: {
    color: '#5D3FD3',
    fontWeight: 'bold',
  },
  buttonContainer: {
    width: "50%",
    backgroundColor: "#5D3FD3",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginVertical: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
