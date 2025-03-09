import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerTitle: '', headerTransparent: true}}  
      />
      <Stack.Screen
        name="payments"
        options={{ headerTitle: 'Payment', headerTransparent: true}}  
      />
      <Stack.Screen
        name="menu"
        options={{ headerTitle: 'Insert Bill', headerShown: false }}  
      />
      <Stack.Screen
        name="sign_up"
        options={{ headerTitle: '', headerTransparent: true}}  
      />
    </Stack>
  );
}
