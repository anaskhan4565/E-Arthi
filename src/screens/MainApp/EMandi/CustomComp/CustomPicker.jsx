import React, { useState } from "react";
import { View, Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from "../../../../../util/colors";
import { useTranslation } from "react-i18next";
import { Picker } from "@react-native-picker/picker";
import { fonts } from "../../../../../util/FontName";
const CustomPicker = ({ w_given = hp(8),
  allow_shadow = false, tx_color = colors.WHITE,
  items, currentState, bg_color_on = true, setCurrentState,
  stateName="BuyScreen",
  isheader, hp_given = hp(5), min_given = wp(50), padding_f = false }) => {
  const { t } = useTranslation();

  const checkVal = (e) => {
    if (stateName=='BuyScreen') {
      if (e === 0) {
        setCurrentState('Buy');
      } else {
        setCurrentState('Sell');
      }
    }
    else if(stateName=='CategoryVendor'){
      if (e === 0) {
        setCurrentState(0);
      } else {
        setCurrentState(1);
      }

    }
  };

  return (
    <View
      style={[
        styles.detailRow,
        {
          backgroundColor: !bg_color_on
            ? null
            : isheader
              ? colors.DARK_GREEN
              : colors.LIGHT_GRAY,
          padding: !padding_f ? hp(1) : 0,
          width: w_given,
        },
        allow_shadow ? styles.shadowStyle : null, // Apply shadow conditionally
      ]}
    >
      <View
        style={[
          styles.pickerContainer,
          { height: hp_given, minWidth: min_given },
        ]}
      >
        <Picker
          mode="dropdown"
          itemStyle={[
            styles.pickerItem,
            { fontFamily: fonts.SemiBold, fontWeight: 'bold' },
          ]}
          onValueChange={(e) => checkVal(e)}
          style={{
            color: isheader ? tx_color : colors.BLACK,
            fontSize: hp(2.5),
          }}
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

  )
}

export default CustomPicker;
const styles = StyleSheet.create({
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',

    justifyContent: 'space-between',
    backgroundColor: colors.LIGHT_GRAY,
    borderRadius: hp(0.5),
  },
  shadowStyle: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    borderRadius: hp(0.4),
    elevation: hp(0.3), // Android shadow
  },
  pickerContainer: {
    borderColor: colors.LIGHT_GRAY,
    borderRadius: 8,

    justifyContent: 'center',
  },
  pickerItem: {
    height: hp('10%'),
  },
});

