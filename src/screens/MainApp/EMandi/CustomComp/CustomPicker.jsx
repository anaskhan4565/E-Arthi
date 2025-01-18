import React, { useState } from "react";
import { View, Text, StyleSheet, Button, Animated, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from "../../../../../util/colors";
import { useTranslation } from "react-i18next";
import { Picker } from "@react-native-picker/picker";

const CustomPicker = ({ items }) => {
    const { t } = useTranslation();


    return (
        <View style={styles.detailRow}>
            <View style={styles.pickerContainer}>
                <Picker
                    mode="dropdown"
                    itemStyle={styles.pickerItem}
                >
            {items.map((item, index) => (
                    <Picker.Item
                        label={item.value}
                        value={index}
                        style={styles.pickerItem}
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
        backgroundColor:colors.LIGHT_GRAY,
        borderRadius:hp(0.5)
    },
    pickerContainer: {
        height: hp('4%'),
        borderColor: colors.LIGHT_GRAY,
        borderRadius: 8,
        justifyContent: 'center',
        overflow: 'hidden',
        flex: 1,
    },
    picker: {
        height: hp('4%'),
        borderColor: colors.LIGHT_GRAY,
        borderRadius: 8,
        justifyContent: 'center',
        overflow: 'hidden',
        flex: 0.6,

    },
    pickerItem: {
        fontSize: wp('3%'),
        height: hp('6%'),
    },
    alertRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp('1.5%'),
    },
    alertText: {
        fontSize: wp('3%'),
        fontFamily: 'Poppins Medium',
        color: colors.BLACK,
        marginRight: wp('2%'),
    },
})