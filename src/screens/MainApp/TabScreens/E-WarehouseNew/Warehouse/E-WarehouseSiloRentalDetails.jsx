import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useTranslation } from 'react-i18next';
import Navbar from '../../../Navbar/Navbar.jsx';
import colors from '../../../../../../util/Constants/colors.js';
import { fonts } from '../../../../../../util/Constants/FontName.js';

const EWarehouseSiloRentalDetails = () => {
    const { t } = useTranslation();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navbarContainer}>
                <Navbar />
            </View>
            
            <ScrollView 
                style={styles.scrollView}
                contentContainerStyle={{ paddingBottom: hp('7%') }}
            >
                <View style={styles.contentContainer}>
                    <Text style={styles.mainTitle}>Silo Rental</Text>
                    <Text style={styles.locationText}>Located: 120 Km away</Text>

                    <Text style={styles.subTitle}>Enter the following details:</Text>

                    <View style={styles.formContainer}>
                        <View style={styles.inputWrapper}>
                            <Text style={styles.label}>Entity Name:</Text>
                            <TextInput 
                                style={styles.input}
                                placeholder="Enter entity name"
                                placeholderTextColor={colors.GRAY}
                            />
                        </View>

                        <View style={styles.inputWrapper}>
                            <Text style={styles.label}>Reserving Amount (in kgs):</Text>
                            <TextInput 
                                style={styles.input}
                                placeholder="Enter amount"
                                placeholderTextColor={colors.GRAY}
                                keyboardType="numeric"
                            />
                        </View>

                        <View style={styles.inputWrapper}>
                            <Text style={styles.label}>Grading:</Text>
                            <TextInput 
                                style={styles.input}
                                placeholder="Enter grading needed"
                                placeholderTextColor={colors.GRAY}
                            />
                        </View>
                    </View>

                    <TouchableOpacity style={styles.reserveButton}>
                        <Text style={styles.reserveButtonText}>Reserve</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITE,
    },
    navbarContainer: {
        height: hp('8.5%'),
        backgroundColor: colors.WHITE,
        borderBottomWidth: 1,
        borderBottomColor: colors.LIGHT_GRAY,
    },
    scrollView: {
        flex: 1,
    },
    contentContainer: {
        paddingHorizontal: wp('4%'),
    },
    mainTitle: {
        fontSize: hp('2.8%'),
        marginTop: hp('2%'),
        marginLeft: wp('4%'),
        marginBottom: hp('0.5%'),
        fontFamily: fonts.SemiBold,
        color: colors.BLACK,
    },
    locationText: {
        fontSize: hp('2%'),
        marginLeft: wp('4%'),
        marginBottom: hp('3%'),
        fontFamily: fonts.Regular,
        color: colors.BLACK,
    },
    subTitle: {
        fontSize: hp('2%'),
        marginBottom: hp('2%'),
        fontFamily: fonts.Medium,
        color: colors.BLACK,
    },
    formContainer: {
        marginBottom: hp('3%'),
    },
    inputWrapper: {
        marginBottom: hp('2%'),
    },
    label: {
        fontSize: hp('1.8%'),
        marginBottom: hp('0.5%'),
        fontFamily: fonts.Medium,
        color: colors.BLACK,
    },
    input: {
        height: hp('6%'),
        borderWidth: 1,
        borderColor: colors.LIGHT_GRAY,
        borderRadius: hp('1%'),
        paddingHorizontal: wp('3%'),
        fontSize: hp('1.8%'),
        fontFamily: fonts.Regular,
        color: colors.BLACK,
    },
    reserveButton: {
        backgroundColor: colors.GREEN,
        height: hp('6%'),
        borderRadius: hp('1%'),
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: hp('3%'),
    },
    reserveButtonText: {
        color: colors.WHITE,
        fontSize: hp('2%'),
        fontFamily: fonts.Medium,
    },
    footer: {
        height: hp('7%'),
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: colors.LIGHT_GRAY,
        backgroundColor: colors.WHITE,
    },
    footerText: {
        fontSize: hp('1.8%'),
        fontFamily: fonts.Regular,
        color: colors.BLACK,
    },
});

export default EWarehouseSiloRentalDetails;