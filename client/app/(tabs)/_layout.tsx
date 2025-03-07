import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TabsLayout({ children }: { children: React.ReactNode }) {
  return (
    <View style={styles.container}>
      {/* This renders the content for routes within the tabs section */}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
