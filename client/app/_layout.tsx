import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerTitle: '',  headerShown: false }}  
      />
      <Stack.Screen
        name="payments"
        options={{ headerTitle: 'Payment'}}  
      />
      <Stack.Screen
        name="menu"
        options={{ headerTitle: 'Insert Bill', headerShown: false }}  
      />
    </Stack>
  );
}
