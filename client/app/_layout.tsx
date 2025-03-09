import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerTitle: '' }} // Set title specifically for the index screen
      />
      <Stack.Screen
        name = "payments"
        options={{headerTitle: 'Payment'}}
        />

      <Stack.Screen
        name = "user_login"
        options={{headerTitle: 'Login Page'}}
        />
    </Stack>
    
  );
}