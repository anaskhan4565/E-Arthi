import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React from 'react';
import colors from '../../util/colors';
import { useNavigation } from '@react-navigation/native';

const CustomButtonWithImage = ({ MainText, BgGiven, txColor, name, isNavigation, imageSource }) => {
    const navigation = useNavigation();

    const handleNavigation = () => {
        if (name) {
            navigation.navigate(name);
        }
    };

    const handleSubmit = () => {
        console.log('just a submit demo');
    };

    return (
        <TouchableOpacity
            style={[styles.Wrapper, { backgroundColor: BgGiven }]}
            onPress={isNavigation ? handleNavigation : handleSubmit}
        >
            <View style={styles.contentWrapper}>
                <Image source={imageSource} style={styles.image} />
                <Text style={[styles.text, { color: txColor }]}>{MainText}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default CustomButtonWithImage;

const styles = StyleSheet.create({
    Wrapper: {
        width: 330,
        height: 48,
        borderColor: colors.LIGHT_GRAY,
        borderWidth: 1,
        borderRadius: 8,
        justifyContent: 'center',
    },
    contentWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 24,
        height: 24,
        marginRight: 10, // Space between image and text
        resizeMode: 'contain',
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});
