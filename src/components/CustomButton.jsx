import { StyleSheet, Text, TouchableOpacity, View, Dimensions, } from 'react-native'
import React from 'react'
import colors from '../../util/colors';
import { useNavigation } from '@react-navigation/native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const { height, width } = Dimensions.get("window");
const isTabletVer = width > 600;
const isTabletHor = height > 1000;


const CustomButton = ({ MainText, BgGiven, name, txColor, isNavigation }) => {

  const navigation = useNavigation();
  const handleNavigation = () => {
    if (name) {
      navigation.navigate(name);
    }
  }
  const handleSubmit = () => {
    console.log('just a submit demo')
  }
  return (
    <TouchableOpacity style={[styles.Wrapper, { width: wp("85%"), height: isTabletHor ? hp('6.7%') : hp('5.7%'), backgroundColor: BgGiven, borderColor: colors.GREEN, borderWidth: 1, borderRadius: 8 }]} onPress={isNavigation ? handleNavigation : handleSubmit}>
      <Text style={{ color: txColor }}>{MainText}</Text>
    </TouchableOpacity>

  )
}

export default CustomButton

const styles = StyleSheet.create({


  Wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '8px',
    borderColor: colors.GREEN
  },

})