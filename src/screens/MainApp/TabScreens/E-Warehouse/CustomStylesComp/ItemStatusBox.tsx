import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import colors from "../../../../../../util/Constants/colors";
import { fonts } from "../../../../../../util/Constants/FontName";

const ItemStatusBox = ({
    name,
    bodyData,
    status,
    statusTrueText,
    statusFalseText,
    onPress,
    bgGiven
}) => {
    return (
        <TouchableOpacity style={styles.ItemBox} onPress={() => onPress()}>
            <View style={styles.Header}>
                <Text style={styles.ItemName}>{name}</Text>
                {status ? (
                    <View style={[styles.StatusWrapper, { backgroundColor: bgGiven?bgGiven:"rgb(14, 174, 45)"}]}>
                        <Text style={styles.statusText}>{statusTrueText}</Text>
                    </View>
                ) : (
                    <View style={[styles.StatusWrapper, { backgroundColor: "rgb(235, 169, 40)" }]}>
                        <Text style={styles.statusText}>{statusFalseText}</Text>
                    </View>
                )}
            </View>
            <View>
                {bodyData.map((data, index) =>
                    data.label.trim() !== "" ? (
                        <Text key={index} style={styles.bodyText}>
                            {data.label}: {data.data}
                        </Text>
                    ) : null
                )}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    ItemBox: {
        width: wp(44),
        height: hp(12), // Increased height for better spacing
        backgroundColor: colors.LIGHT_GREEN,
        padding: hp(1),
        borderRadius: wp(2),
        marginVertical: hp(1),
        elevation: 10
    },
    Header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    ItemName: {
        fontSize: hp(1.5),
        fontFamily: fonts.SemiBold,
        marginBottom: hp(0.5),
    },
    bodyText: {
        fontSize: hp(1.4),
        fontFamily: fonts.Medium,
        color: colors.BLACK,
 
    },
    StatusWrapper: {
        marginLeft: hp(0.5),
        alignSelf: "center",
        justifyContent: "center",
        borderRadius: hp(0.7),
        marginBottom: hp(0.8),
    },
    statusText: {
        fontSize: hp(1.1),
        fontFamily: fonts.SemiBold,
        color: colors.WHITE,
        margin: hp(0.2),
        paddingHorizontal: wp(2)
    },
});

export default ItemStatusBox;
