import React from "react";
import Navbar from "../../Navbar/Navbar.jsx";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import colors from "../../../../../util/Constants/colors.js";

import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import ScreensName from "../../../../../util/Constants/ScreensName.ts";
import { useNavigation } from "@react-navigation/native";

const TreatmentProductDescription = () => {
    const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.navbarContainer}>
            <Navbar gobackOnly={true} />
        </View>
        <ScrollView style={styles.contentContainer}>
            {/* Product Title */}
            <Text style={styles.title}>Broflanilide 20.0 % SC</Text>
            
            {/* Dosage Calculator Section */}
            <Text style={styles.sectionTitle}>Dosage Calculator</Text>
            <Text style={styles.description}>
                Get the exact dosage, dilution, application frequency, and pre-harvest interval for your plot
            </Text>
            
            <TouchableOpacity style={styles.calculateButton} onPress={()=>navigation.navigate(ScreensName.DosageCalculator)}>
                <Text style={styles.calculateButtonText}>Calculate Dosage</Text>
            </TouchableOpacity>
            
            {/* Application Method */}
            <View style={styles.infoSection}>
                <View style={styles.iconContainer}>
                    <Image 
                        source={require('./AssetsPlantDr/ProductDescription/spray.png')} 
                        style={styles.infoIcon}
                    />
                </View>
                <View style={styles.infoTextContainer}>
                    <Text style={styles.infoTitle}>Application Method</Text>
                    <Text style={styles.infoValue}>Spray</Text>
                </View>
            </View>
            
            <View style={styles.divider} />
            
            {/* Weather Conditions */}
            <View style={styles.infoSection}>
                <View style={styles.iconContainer}>
                    <Image 
                        source={require('./AssetsPlantDr/ProductDescription/wind.png')} 
                        style={styles.infoIcon}
                    />
                </View>
                <View style={styles.infoTextContainer}>
                    <Text style={styles.infoTitle}>Weather Conditions</Text>
                    <Text style={styles.infoValue}>
                        Do not apply product if it is windy or raining. Avoid application during the hottest hours of the day
                    </Text>
                </View>
            </View>
            
            {/* Spraying Conditions */}
            <View style={styles.infoSection}>
                <View style={styles.infoTextContainer}>
                    <Text style={styles.infoTitle}>Spraying Conditions</Text>
                    <Text style={styles.infoValue}>Unfavorable until 7pm</Text>
                </View>
            </View>
            
            <View style={styles.divider} />
            
            {/* Toxicity */}
            <View style={styles.infoSection}>
                <View style={styles.iconContainer}>
                    <Image 
                        source={require('./AssetsPlantDr/ProductDescription/warning.png')} 
                        style={styles.infoIcon}
                    />
                </View>
                <View style={styles.infoTextContainer}>
                    <Text style={styles.infoTitle}>Toxicity</Text>
                    <Text style={styles.infoValue}>Slightly toxic</Text>
                </View>
            </View>
            
            <View style={styles.divider} />
            
            {/* Safety Precautions */}
            <View style={styles.safetyContainer}>
            <Text style={[styles.sectionTitle, { marginTop: hp('2%') }]}>Safety Precautions</Text>
            <View style={styles.safetyItem}>
                <Text style={styles.safetyNumber}>1.</Text>
                <Text style={styles.safetyText}>Keep it locked away and out of reach of children</Text>
            </View>
            <View style={styles.safetyItem}>
                <Text style={styles.safetyNumber}>2.</Text>
                <Text style={styles.safetyText}>Wash the hands and face with clean water after usage</Text>
            </View>
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default TreatmentProductDescription

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITE,
    },
    navbarContainer: {
        height: hp("8.2%"),
        backgroundColor: "white",
        marginTop: hp("0.14%"),
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: wp('5%'),
    },
    safetyContainer:{
        backgroundColor:'#F3FFFC',
        padding:wp('3%'),
        borderRadius:wp('2%'),
        marginBottom:hp('2%')

    },
    title: {
        fontSize: wp('5.5%'),
        fontWeight: 'bold',
        marginTop: hp('2%'),
        marginBottom: hp('3%'),
        color: '#000',
    },
    sectionTitle: {
        fontSize: wp('4.5%'),
        fontWeight: 'bold',
        marginBottom: hp('1%'),
        color: '#000',
    },
    description: {
        fontSize: wp('3.5%'),
        color: '#555',
        marginBottom: hp('2%'),
    },
    calculateButton: {
        backgroundColor: '#00A67E',
        paddingVertical: hp('1.5%'),
        borderRadius: wp('2%'),
        alignItems: 'center',
        marginBottom: hp('3%'),
    },
    calculateButtonText: {
        color: colors.WHITE,
        fontSize: wp('4%'),
        fontWeight: '500',
    },
    infoSection: {
        flexDirection: 'row',
        marginBottom: hp('2%'),
    },
    iconContainer: {
        width: wp('12%'),
        alignItems: 'center',
    },
    infoIcon: {
        width: wp('8%'),
        height: wp('8%'),
        resizeMode: 'contain',
    },
    infoTextContainer: {
        flex: 1,
    },
    infoTitle: {
        fontSize: wp('4%'),
        fontWeight: 'bold',
        color: '#000',
    },
    infoValue: {
        fontSize: wp('3.5%'),
        color: '#555',
    },
    divider: {
        height: 1,
        backgroundColor: '#00A980',
        marginVertical: hp('1%'),
        marginBottom: hp('2%'),
    },
    safetyItem: {
        flexDirection: 'row',
        marginBottom: hp('1%'),
        
    },
    safetyNumber: {
        width: wp('5%'),
        fontSize: wp('3.5%'),
        color: '#000',
    },
    safetyText: {
        flex: 1,
        fontSize: wp('3.5%'),
        color: '#555',
    },
});