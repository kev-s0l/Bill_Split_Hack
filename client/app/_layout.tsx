import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerTitle: 'Bill Split' }} // Set title specifically for the index screen
      />
    </Stack>
  );
}