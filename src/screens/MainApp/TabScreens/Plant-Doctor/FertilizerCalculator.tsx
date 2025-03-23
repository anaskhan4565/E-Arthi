import React, { useState } from "react";
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
    TextInput,
    TouchableOpacity,
    View,
    Image,
    StatusBar,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { fonts } from "../../../../../util/Constants/FontName.js";
import ScreensName from "../../../../../util/Constants/ScreensName.ts";
import { useNavigation } from "@react-navigation/native";

const FertilizerCalculator = () => {
  const [nitrogen, setNitrogen] = useState('');
  const [phosphorus, setPhosphorus] = useState('');
  const [potassium, setPotassium] = useState('');
  const [trees, setTrees] = useState('');
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <View style={styles.navbarContainer}>
            <Navbar gobackOnly={true} />
        </View>
        
        <ScrollView style={styles.contentContainer}>
            <Text style={styles.title}>Fertilizer Calculator</Text>
            
            <Text style={styles.subtitle}>Enter the nutrient quantities:</Text>
            
            <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>N (Nitrogen):</Text>
                <TextInput
                    style={styles.input}
                    value={nitrogen}
                    onChangeText={setNitrogen}
                    placeholder="Enter Nitrogen in kg/ha"
                    keyboardType="numeric"
                />
            </View>
            
            <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>P (Phosphorus):</Text>
                <TextInput
                    style={styles.input}
                    value={phosphorus}
                    onChangeText={setPhosphorus}
                    placeholder="Enter Phosphorus in kg/ha"
                    keyboardType="numeric"
                />
            </View>
            
            <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>K (Potassium):</Text>
                <TextInput
                    style={styles.input}
                    value={potassium}
                    onChangeText={setPotassium}
                    placeholder="Enter Potassium in kg/ha"
                    keyboardType="numeric"
                />
            </View>
            
            <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Number of trees:</Text>
                <TextInput
                    style={styles.input}
                    value={trees}
                    onChangeText={setTrees}
                    placeholder="Enter number of trees"
                    keyboardType="numeric"
                />
            </View>
            
            <TouchableOpacity style={styles.calculateButton} onPress={() => {
                navigation.navigate('FertilizerCombinations' as never);
            }}>
                <Text style={styles.calculateButtonText}>Calculate</Text>
            </TouchableOpacity>
        </ScrollView>
    </SafeAreaView>
  );
}

export default FertilizerCalculator;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITE,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: wp('4%'),
        paddingVertical: hp('1.5%'),
        backgroundColor: colors.WHITE,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F1F1',
    },
    profileIcon: {
        width: wp('10%'),
    },
    logo: {
        width: wp('10%'),
        height: hp('5%'),
    },
    navbarContainer: {
        height: hp("8.2%"),
        backgroundColor: "white",
        marginTop: hp("0.14%"),
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    bellIcon: {
        marginRight: wp('4%'),
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: wp('5%'),
    },
    title: {
        fontSize: wp('5.5%'),
        fontWeight: 'bold',
        marginTop: hp('2%'),
        marginBottom: hp('1%'),
        color: '#000',
    },
    subtitle: {
        fontSize: wp('4%'),
        marginBottom: hp('2%'),
        color: '#333',
    },
    inputGroup: {
        marginBottom: hp('2%'),
    },
    inputLabel: {
        fontSize: wp('3.8%'),
        marginBottom: hp('0.5%'),
        color: '#333',
    },
    input: {
        height: hp('6%'),
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 4,
        paddingHorizontal: wp('3%'),
        fontSize: wp('3.5%'),
    },
    calculateButton: {
        backgroundColor: '#00A67E',
        paddingVertical: hp('1.5%'),
        borderRadius: 4,
        alignItems: 'center',
        marginTop: hp('2%'),
        marginBottom: hp('3%'),
    },
    calculateButtonText: {
        color: colors.WHITE,
        fontSize: wp('4%'),
        fontWeight: '500',
    },
});