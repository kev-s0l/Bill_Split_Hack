import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

export const options = {
  title: 'Bill Split', // Set the title to "Bill Split"
};

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to the Bill Split App</Text>
      <Button 
        title="Go to Payments" 
        onPress={() => router.push('/payments')} 
      />
    </View>
  );
}
