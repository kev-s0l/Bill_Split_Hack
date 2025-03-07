import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <View style={styles.container}>
      {/* This renders the content of the current route (children) */}
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
