import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const SwitchButtonCustom = () => {
  const [selectedOption, setSelectedOption] = useState("Specific");

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          selectedOption === "Specific" && styles.selected,
        ]}
        onPress={() => setSelectedOption("Specific")}
      >
        <Text
          style={[
            styles.text,
            selectedOption === "Specific" && styles.selectedText,
          ]}
        >
          Specific
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          selectedOption === "Generic" && styles.selected,
        ]}
        onPress={() => setSelectedOption("Generic")}
      >
        <Text
          style={[
            styles.text,
            selectedOption === "Generic" && styles.selectedText,
          ]}
        >
          Generic
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    alignItems: "center",
  },
  selected: {
    backgroundColor: "green",
  },
  text: {
    color: "black",
    fontSize: 16,
  },
  selectedText: {
    color: "white",
  },
});

export default SwitchButtonCustom;
