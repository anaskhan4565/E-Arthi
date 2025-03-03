import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native";
import colors from "../../../util/Constants/colors";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { fonts } from "../../../util/Constants/FontName";
import { useTranslation } from "react-i18next";
const SwitchButtonCoperate = ({ selectedOption = "Individual",
  setSelectedOption }) => {
  // const [selectedOption, setSelectedOption] = useState("Specific");
  const animationValue = useRef(new Animated.Value(0)).current;
  const { t } = useTranslation();
  const handlePress = (option) => {
    if (selectedOption !== option) {
      setSelectedOption(option);
      // Animate the value from 0 to 1
      Animated.timing(animationValue, {
        toValue: option === "Individual" ? 0 : 1,
        duration: 500, // Duration of the animation in milliseconds
        useNativeDriver: false,
      }).start();
    }
  };

  const specificBackgroundColor = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.GREEN, colors.fancy_BG],
  });

  const genericBackgroundColor = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.fancy_BG, colors.GREEN],
  });

  return (
    <View style={styles.container}>

      <TouchableOpacity onPress={() => handlePress("Individual")} style={{ flex: 1 }}>
        <Animated.View
          style={[
            styles.button,
            {
              backgroundColor: specificBackgroundColor,
            },
          ]}
        >
          <Text
            style={[
              styles.text,
              selectedOption === "Individual" && styles.selectedText,
            ]}
          >
            {t('Individual')}
          </Text>
        </Animated.View>

      </TouchableOpacity>
      <TouchableOpacity onPress={() => handlePress("Corporate")} style={{ flex: 1 }}>
        <Animated.View
          style={[
            styles.button,
            {
              backgroundColor: genericBackgroundColor,
            },
          ]}
        >
          <Text
            style={[
              styles.text,
              selectedOption === "Corporate" && styles.selectedText,
            ]}
          >
            {t('Corporate')}
          </Text>
        </Animated.View>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: hp(3),
    marginTop: hp(2),
    backgroundColor: colors.fancy_BG,
    borderRadius: hp(1),
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: hp(2),
  },
  text: {
    color: "black",
    fontSize: 16,
    fontFamily: fonts.Medium,
  },
  selectedText: {
    color: "white",
    fontFamily: fonts.SemiBold,
  },
});


export default SwitchButtonCoperate;
