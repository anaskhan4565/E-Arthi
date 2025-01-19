import React, { useState } from "react";
import { View, Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from "../../../../../util/colors";
import { useTranslation } from "react-i18next";
import { Picker } from "@react-native-picker/picker";
import { fonts } from "../../../../../util/FontName";

const CustomPicker = ({ items, currentState, setCurrentState, isheader }) => {
  const { t } = useTranslation();

  const checkVal = (e) => {
    if (currentState) {
      if (e === 0) {
        setCurrentState('Buy');
      } else {
        setCurrentState('Sell');
      }
    }
  };

  return (
    <View
      style={[
        styles.detailRow,
        { backgroundColor: isheader ? colors.DARK_GREEN : colors.LIGHT_GRAY },
      ]}
    >
      <View style={styles.pickerContainer}>
        <Picker
          mode="dropdown"
          itemStyle={[styles.pickerItem, { fontFamily: fonts.SemiBold,fontWeight:'bold' }]}
          onValueChange={(e) => checkVal(e)}
          style={{color:isheader?colors.WHITE:colors.BLACK}}
        >
          {items.map((item, index) => (
            <Picker.Item
              key={item.value || index} // Add a unique key for each item
              label={item.value}
              value={index}
              style={[styles.pickerItem, { color: colors.WHITE }]}
              
            />
          ))}
        </Picker>
      </View>
    </View>
  );
};

export default CustomPicker;

const styles = StyleSheet.create({
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: hp('1.5%'),
    backgroundColor: colors.LIGHT_GRAY,
    borderRadius: hp(0.5),
  },
  pickerContainer: {
    height: hp('4%'),
    borderColor: colors.LIGHT_GRAY,
    borderRadius: 8,
    justifyContent: 'center',
    overflow: 'hidden',
    flex: 1,
  },
  pickerItem: {
    height: hp('6%'),
  },
});
