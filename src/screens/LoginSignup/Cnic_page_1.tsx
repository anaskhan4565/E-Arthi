import React, { useState } from 'react';
import { View, StyleSheet, Text, Dimensions, Image } from 'react-native';
import colors from '../../../util/colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CustomButton from '../../components/CustomButton';
import ScreensName from '../../../util/ScreensName';
import { fonts } from "../../../util/FontName";

const { height, width } = Dimensions.get("window");

const Cnic_page_1 = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handlePickImage = () => {
        // Placeholder for picking CNIC image
        console.log('Pick CNIC Image button pressed');
    };

    const handleEnterDetails = () => {
        // Action for entering CNIC details manually
        console.log('Enter CNIC details manually button pressed');
    };

    return (
        <View style={styles.container}>
            <View style={styles.Header}>
                <Text style={styles.Heading}>{'CNIC Verification'}</Text>
                <Text style={styles.SubHeading}>{'Please enter your CNIC details'}</Text>
            </View>
            <Image
                source={require('../../assets/placeholder.jpg')}
                style={styles.image}
            />
            <View style={styles.buttonContainer}>
                <CustomButton
                    MainText="Pick CNIC Image"
                    BgGiven={colors.GREEN}
                    txColor={colors.WHITE}
                    isNavigation={false}
                    name={ScreensName.cnic_page_1}
                />
                <View style={styles.buttonSpacing} /> {/* Spacing between buttons */}
                <CustomButton
                    MainText="Enter CNIC Details Manually"
                    BgGiven={colors.GREEN}
                    txColor={colors.WHITE}
                    isNavigation={false}
                    name={ScreensName.cnic_page_1}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITE,
        paddingHorizontal: width / 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    Header: {
      marginTop: height / 10,
      marginBottom: height / 20,
    },
    Heading: {
      fontSize: height / 25,
      fontFamily:fonts.SemiBold,
      marginLeft: wp('1.5%'),
      color: colors.BLACK,
    },
    SubHeading: {
      fontSize: height / 45,
      fontFamily:fonts.Regular,
      marginTop: height / 100,
      marginLeft: wp('1.5%'),
    },
    image: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'column', // Arrange buttons vertically
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
    },
    buttonSpacing: {
        height: hp('2%'), // Adjust the height for spacing between buttons
    },
});

export default Cnic_page_1;
