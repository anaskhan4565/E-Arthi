import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Modal,
    ScrollView,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { fonts } from '../../../../../../util/Constants/FontName';
import colors from '../../../../../../util/Constants/colors';

const CustomDropdown = ({
    label,
    options = [],
    selectedValue,
    onSelect,
    width = wp('43%'),
}) => {
    const [visible, setVisible] = useState(false);

    const renderDropdown = () => {
        if (!visible) return null;

        return (
            <Modal
                transparent
                visible={visible}
                animationType="fade"
                onRequestClose={() => setVisible(false)}
            >
                <TouchableOpacity
                    style={styles.overlay}
                    activeOpacity={1}
                    onPress={() => setVisible(false)}
                >
                    <View style={[styles.dropdown, { width: width }]}>
                        <ScrollView>
                            {options.map((item, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.item}
                                    onPress={() => {
                                        onSelect(item);
                                        setVisible(false);
                                    }}
                                >
                                    <Text style={styles.itemText}>{item}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </TouchableOpacity>
            </Modal>
        );
    };

    return (
        <TouchableOpacity
            style={[styles.button, { width }]}
            onPress={() => setVisible(true)}
        >
            <Text style={styles.buttonText}>
                {selectedValue || label}
            </Text>
            <Text style={styles.icon}>▼</Text>
            {renderDropdown()}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: hp('5.5%'),
        paddingHorizontal: wp('4%'),
        backgroundColor: colors.WHITE,
        borderWidth: 1,
        borderColor: colors.LIGHT_GRAY,
        borderRadius: hp('0.8%'),
    },
    buttonText: {
        fontSize: hp('1.6%'),
        fontFamily: fonts.Regular,
        color: colors.GRAY,
    },
    icon: {
        fontSize: hp('1.4%'),
        color: colors.GRAY,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dropdown: {
        position: 'absolute',
        top: hp('20%'),
        backgroundColor: colors.WHITE,
        borderRadius: hp('0.8%'),
        borderWidth: 1,
        borderColor: colors.LIGHT_GRAY,
        maxHeight: hp('30%'),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    item: {
        padding: hp('1.5%'),
        borderBottomWidth: 1,
        borderBottomColor: colors.LIGHT_GRAY,
    },
    itemText: {
        fontSize: hp('1.6%'),
        fontFamily: fonts.Regular,
        color: colors.BLACK,
    },
});

export default CustomDropdown;