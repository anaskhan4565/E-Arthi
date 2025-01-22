import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import colors from '../../util/colors';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const CustomButton = ({
  MainText,
  BgGiven,
  name,
  txColor,
  isNavigation,
  wgiven = wp(85),
  hgiven = hp(5.7),
  bordergiven = colors.GREEN,
  b_width = 1,
  b_radius = 8,
  onPressG, // Custom onPress event
  b_end_only
}) => {
  const navigation = useNavigation();

  const handleNavigation = () => {
    if (name) {
      navigation.navigate(name);
    }
  };

  const handleSubmit = () => {
  };

  // Decide which function to use for onPress
  const handlePress = onPressG
    ? onPressG // Use the custom onPress event if provided
    : isNavigation
      ? handleNavigation // Fallback to navigation
      : handleSubmit; // Fallback to default

  return (
    <TouchableOpacity
      style={[
        styles.Wrapper,
        {
          width: wgiven,
          height: hgiven,
          borderWidth: b_width,
          backgroundColor: BgGiven,
          borderColor: bordergiven,
          borderRadius: b_radius,
          borderBottomWidth: b_end_only
        },
      ]}
      onPress={handlePress} // Attach the decided handler
    >
      <Text style={{ color: txColor, fontSize: hp('2%') }}>{MainText}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  Wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderColor: colors.GREEN,
  },
});
