import React, { useState } from "react";
import { View, Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from "../../../../../util/colors";
import { useTranslation } from "react-i18next";
import { Picker } from "@react-native-picker/picker";
import { fonts } from "../../../../../util/FontName";
const CustomPicker = ({w_given=hp(8), items, currentState, setCurrentState, isheader,hp_given=hp(5),min_given=wp(50),padding_f=false }) => {
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
        { backgroundColor: isheader ? colors.DARK_GREEN : colors.LIGHT_GRAY,padding:!padding_f?hp(1):0 ,width:w_given},
      ]}
    >
    <View style={[styles.pickerContainer,{height:hp_given,minWidth:min_given}]}>
        <Picker
          mode="dropdown"
          itemStyle={[
            styles.pickerItem,
            { fontFamily: fonts.SemiBold, fontWeight: 'bold'},
          ]}
          onValueChange={(e) => checkVal(e)}
          style={{
            color: isheader ? colors.WHITE : colors.BLACK,
            fontSize: hp(2.5)
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
  );
};

export default CustomPicker;

const styles = StyleSheet.create({
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.LIGHT_GRAY,
    borderRadius: hp(0.5),
    //padding: hp('1%'),
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
