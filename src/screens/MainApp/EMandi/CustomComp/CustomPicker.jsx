import React, { useState } from "react";
import { View, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from "../../../../../util/Constants/colors";
import { useTranslation } from "react-i18next";
import { Picker } from "@react-native-picker/picker";
import { fonts } from "../../../../../util/Constants/FontName";

const CustomPicker = ({
  w_given = hp(8),
  allow_shadow = false,
  tx_color = colors.WHITE,
  items,
  currentState,
  bg_color_on = true,
  setCurrentState,
  stateName,
  color_bd,
  isThatColor = false,
  bd_give,
  placeholder = "Select",
  isheader,
  hp_given = hp(5),
  min_given = wp(50),
  padding_f = false,
  defaultValue = null,
  placeholderFontSize = hp(2),
}) => {
  const { t } = useTranslation();
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  const checkVal = (e) => {
    setSelectedValue(e);
    if (stateName === 'BuyScreen') {
      setCurrentState(e === 0 ? 'Buy' : 'Sell');
    } else if (stateName === 'CategoryVendor') {
      setCurrentState(e === 0 ? 0 : 1);
    }
  };

  return (
    <View
      style={[
        styles.detailRow,
        {
          borderWidth: bd_give ? 1 : 0,
          borderColor: isThatColor ? '#D4D4D8' : color_bd ? color_bd : 'transparent',
          backgroundColor: isThatColor ? colors.WHITE : !bg_color_on ? null : isheader ? colors.DARK_GREEN : colors.LIGHT_GRAY,
          padding: !padding_f ? hp(1) : 0,
          width: w_given,
        },
        allow_shadow ? styles.shadowStyle : null,
      ]}
    >
      <View style={[styles.pickerContainer, { borderColor: colors.RED, height: hp_given, minWidth: min_given, marginLeft: isThatColor ? hp(-1.5) : null }]}
      >
        <Picker
          selectedValue={selectedValue}
          mode="dropdown"
          onValueChange={(e) => checkVal(e)}
          style={{
            color: selectedValue === null ? colors.Text_Fancy : colors.BLACK, // Gray until selected
            fontSize: hp(2.5),
            // paddingLeft: hp(4), // Added left padding
          }}
          itemStyle={[styles.pickerItem, { fontSize: placeholderFontSize }]}
        >
          <Picker.Item
            label={t(placeholder)}
            value={null}
            enabled={false}
            style={[styles.pickerItem, { color: colors.Text_Fancy, fontSize: placeholderFontSize, paddingLeft: hp(1) }]}
          />
          {items.map((item, index) => (
            <Picker.Item
              key={item.value || index}
              label={t(item.value)}
              value={index}
              style={[styles.pickerItem, { color: colors.BLACK, paddingLeft: hp(1) }]} // Added left padding
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
  },
  shadowStyle: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    borderRadius: hp(0.4),
    elevation: hp(0.3),
  },
  pickerContainer: {
    // borderColor: colors.LIGHT_GRAY,
    borderRadius: 8,
    justifyContent: 'center',
  },
  pickerItem: {
    height: hp(7),
    fontSize: hp(2.5),
    paddingVertical: hp(1),
    paddingLeft: hp(1), // Added left padding
  },
});