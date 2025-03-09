import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { LinearGradient } from 'expo-linear-gradient';  // Import LinearGradient

export default function MenuScreen() {
  // Information We Will be Updating
  const [numberInput, setNumberInput] = useState("");
  const [groupSizeInput, setGroupSizeInput] = useState("");
  const [tipAmount, setTipAmount] = useState("");
  const [restaurantName, setRestaurantName] = useState("");

  // Tip Amounts we will use :3
  const tipOptions = [15, 18, 20, 25];
  const router = useRouter();

  // Aesthetics 
  const handleTotalBillChange = (text: string) => {
    // Remove non-numeric characters (except decimal point)
    let cleanedText = text.replace(/[^0-9.]/g, '');
    
    // Prevent multiple decimal points
    if ((cleanedText.match(/\./g) || []).length > 1) {
      return;
    }

    // If input is empty, reset to "$"
    setNumberInput(cleanedText ? `$${cleanedText}` : '');
  };

  const handleGroupInputChange = (text: string) => {
    // Remove non-numeric characters (except decimal point)
    let clearText = text.replace(/[^0-9.]/g, '');
    setGroupSizeInput(clearText ? `#${clearText}` : '');
  };

  // send over info to payments page to update values!!!
  const goToPaymentsPage = () => {
    const cleanedBill = numberInput.replace('$', '');
    const cleanedGroupSize = groupSizeInput.replace('#', '');

    router.push({
        pathname: '/payments',
        params: {
            bill: cleanedBill,
            group: cleanedGroupSize,
            restaurant_Name: restaurantName,
            chosenTip: tipAmount
        }
    });
  };

  return (
    <LinearGradient
      colors={['#EA8D8D', '#A890FE']}  // Linear gradient colors
      style={styles.gradient}  // Apply gradient style
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.header}>Cut The Cake</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Restaurant Name"
          placeholderTextColor="#000"
          value={restaurantName}
          onChangeText={setRestaurantName}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Total Bill"
          placeholderTextColor="#000"
          keyboardType="numeric"
          value={numberInput}
          onChangeText={handleTotalBillChange}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Group Size"
          placeholderTextColor="#000"
          keyboardType="numeric"
          value={groupSizeInput}
          onChangeText={handleGroupInputChange}
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
          <Button title="SUBMIT" onPress={goToPaymentsPage} color="#5D3FD3" />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,  // Ensure the gradient takes up the entire screen
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "transparent", // Allow gradient background to show through
  },
  header: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    height: 50,
    width: "60%",
    borderColor: "#00",
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor:"#fff",
    marginBottom: 30,
    fontSize: 20,
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
    backgroundColor: "#5D3FD3", // Green background
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginHorizontal: 5, // Space between buttons
  },
  selectedTip: {
    backgroundColor: "#3e25a1", // Darker green for selected state
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
