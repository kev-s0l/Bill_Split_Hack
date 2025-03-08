import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity } from "react-native";
  import { useRouter } from "expo-router";
  import { useState } from "react";
  
  export default function MenuScreen() {
    const [numberInput, setNumberInput] = useState("");
    const [groupSizeInput, setGroupSizeInput] = useState("");
    const [tipAmount, setTipAmount] = useState("");
  
    const tipOptions = [5, 10, 15, 20];
    const router = useRouter();
  
    const handlePress = () => {
      router.push({
        pathname: "/payments"
      });
    };
  
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.header}>Bill Split Hack</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Enter Total Bill"
          keyboardType="numeric"
          value={numberInput}
          onChangeText={setNumberInput}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Group Size"
          keyboardType="numeric"
          value={groupSizeInput}
          onChangeText={setGroupSizeInput}
        />
        <Text style={styles.label}>Select Tip Percentage:</Text>
        <View style={styles.tipsRow}>
          {tipOptions.map((tip) => (
            <TouchableOpacity
              key={tip}
              style={[
                styles.tipButton,
                tipAmount === tip.toString() && styles.selectedTip, // Highlight selected tip
              ]}
              onPress={() => setTipAmount(tip.toString())}
            >
              <Text style={styles.tipText}>{tip}%</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.buttonContainer}>
          <Button title="SUBMIT" onPress={handlePress} color="#28a745" />
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
      backgroundColor: "#f0f0f0",
    },
    header: {
      fontSize: 30,
      fontWeight: "bold",
      marginBottom: 20,
      color: "#333",
    },
    input: {
      height: 40,
      width: "60%",
      borderColor: "#ccc",
      borderWidth: 1,
      borderRadius: 10,
      marginBottom: 20,
      textAlign: "center",
      fontSize: 16,
    },
    label: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 10,
    },
    tipsRow: {
      flexDirection: "row", // Align buttons horizontally
      justifyContent: "center", // Center them
      alignItems: "center",
      marginBottom: 15,
    },
    tipButton: {
      backgroundColor: "#28a745", // Green background
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 10,
      marginHorizontal: 5, // Space between buttons
    },
    selectedTip: {
      backgroundColor: "#218838", // Darker green for selected state
    },
    tipText: {
      color: "#fff", // White text for contrast
      fontSize: 16,
      fontWeight: "bold",
    },
    buttonContainer: {
      width: "50%",
      marginVertical: 15,
    },
  });
  