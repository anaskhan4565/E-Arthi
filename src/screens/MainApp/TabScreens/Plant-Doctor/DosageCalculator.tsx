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
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { fonts } from "../../../../../util/Constants/FontName.js";
import ScreensName from "../../../../../util/Constants/ScreensName.ts";
import { useNavigation } from "@react-navigation/native";

const DosageCalculator = () => {
    const [areaSize, setAreaSize] = useState('');
    const [areaUnit, setAreaUnit] = useState('acre');
    const [pumpSize, setPumpSize] = useState('noPump');
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navbarContainer}>
                <Navbar gobackOnly={true} />
            </View>
            <ScrollView style={styles.contentContainer}>
                <Text style={styles.title}>Dosage Calculator</Text>

                <Text style={styles.inputLabel}>Enter the size of area to treat:</Text>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={areaSize}
                        onChangeText={setAreaSize}
                        placeholder="0.0"
                        keyboardType="numeric"
                    />
                    <View style={styles.unitContainer}>
                        <Text style={styles.unitText}>Acre</Text>
                    </View>
                    <View style={styles.buttonGroup}>
                        <TouchableOpacity style={styles.counterButton}>
                            <Text style={styles.counterButtonText}>−</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.counterButton}>
                            <Text style={styles.counterButtonText}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <Text style={styles.helperText}>
                    Sizes smaller than one unit are expressed as 0. For example: half acre = 0.5
                </Text>

                <Text style={styles.sectionTitle}>Area Unit:</Text>
                <View style={styles.radioGroup}>
                    <TouchableOpacity
                        style={styles.radioOption}
                        onPress={() => setAreaUnit('acre')}
                    >
                        <View style={styles.radioCircle}>
                            {areaUnit === 'acre' && <View style={styles.radioSelected} />}
                        </View>
                        <Text style={styles.radioText}>Acre</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.radioOption}
                        onPress={() => setAreaUnit('hectare')}
                    >
                        <View style={styles.radioCircle}>
                            {areaUnit === 'hectare' && <View style={styles.radioSelected} />}
                        </View>
                        <Text style={styles.radioText}>Hectare</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.sectionTitle}>Pump Size:</Text>
                <View style={styles.pumpOptions}>
                    <TouchableOpacity
                        style={[
                            styles.pumpOption,
                            pumpSize === 'noPump' ? styles.pumpOptionSelected : {}
                        ]}
                        onPress={() => setPumpSize('noPump')}
                    >
                        <View style={styles.radioCircle}>
                            {pumpSize === 'noPump' && <View style={styles.radioSelected} />}
                        </View>
                        <Text style={styles.pumpOptionText}>No Pump</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.pumpOption,
                            pumpSize === '15L' ? styles.pumpOptionSelected : {}
                        ]}
                        onPress={() => setPumpSize('15L')}
                    >
                        <View style={styles.radioCircle}>
                            {pumpSize === '15L' && <View style={styles.radioSelected} />}
                        </View>
                        <Text style={styles.pumpOptionText}>15 Litre</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.pumpOption,
                            pumpSize === '20L' ? styles.pumpOptionSelected : {}
                        ]}
                        onPress={() => setPumpSize('20L')}
                    >
                        <View style={styles.radioCircle}>
                            {pumpSize === '20L' && <View style={styles.radioSelected} />}
                        </View>
                        <Text style={styles.pumpOptionText}>20 Litre</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.pumpOption,
                            pumpSize === '25L' ? styles.pumpOptionSelected : {}
                        ]}
                        onPress={() => setPumpSize('25L')}
                    >
                     
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.calculateButton} onPress={()=>{navigation.navigate(ScreensName.FertilizerCalculator)}}>
                    <Text style={styles.calculateButtonText}>Calculate</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

export default DosageCalculator;

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
        backgroundColor: '#F5F5F5',
    },
    navbarContainer: {
        height: hp("8.2%"),
        backgroundColor: "white",
        marginTop: hp("0.14%"),
    },
    logo: {
        width: wp('10%'),
        height: hp('5%'),
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
        marginTop: hp('2%'),
        marginBottom: hp('2%'),
        color: '#000',
        fontFamily: fonts.SemiBold

    },
    inputLabel: {
        fontSize: wp('3.8%'),
        marginBottom: hp('1%'),
        color: '#333',
        fontFamily: fonts.SemiBold

    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp('1%'),
    },
    input: {
        flex: 1,
        height: hp('6%'),
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 4,
        paddingHorizontal: wp('3%'),
        fontSize: wp('4%'),
    },
    unitContainer: {
        height: hp('6%'),
        paddingHorizontal: wp('3%'),
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderLeftWidth: 0,
    },
    unitText: {
        fontSize: wp('3.5%'),
        color: '#333',
        fontFamily: fonts.Regular

    },
    buttonGroup: {
        flexDirection: 'row',
        marginLeft: wp('2%'),
    },
    counterButton: {
        width: wp('8%'),
        height: hp('6%'),
        backgroundColor: '#00A67E',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        marginLeft: wp('1%'),
    },
    counterButtonText: {
        color: 'white',
        fontSize: wp('5%'),
        fontWeight: 'bold',
        fontFamily: fonts.Regular

    },
    helperText: {
        fontSize: wp('3.2%'),
        marginBottom: hp('2%'),
        fontFamily: fonts.Regular
    },
    sectionTitle: {
        fontSize: wp('4%'),
        fontWeight: 'bold',
        marginTop: hp('1%'),
        marginBottom: hp('1%'),
        color: '#000',
    },
    radioGroup: {
        flexDirection: 'row',
        marginBottom: hp('2%'),
    },
    radioOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: wp('8%'),
    },
    radioCircle: {
        height: wp('5%'),
        width: wp('5%'),
        borderRadius: wp('2.5%'),
        borderWidth: 2,
        borderColor: '#00A67E',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: wp('2%'),
    },
    radioSelected: {
        height: wp('2.5%'),
        width: wp('2.5%'),
        borderRadius: wp('1.25%'),
        backgroundColor: '#00A67E',
    },
    radioText: {
        fontSize: wp('3.5%'),
        color: '#333',
    },
    pumpOptions: {
        flexDirection: 'row',
        marginTop: hp('1%'),
        marginLeft: wp('1%'),
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        marginBottom: hp('3%'),
    },
    pumpOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: wp('5%'),
        marginBottom: hp('1%'),
    },
    pumpOptionSelected: {
        padding: wp('1%'),
        borderRadius: 4,
    },
    pumpOptionText: {
        fontSize: wp('3.5%'),
        color: '#333',
    },
    calculateButton: {
        backgroundColor: '#00A67E',
        paddingVertical: hp('1.5%'),
        borderRadius: wp('1%'),
        alignItems: 'center',
        marginBottom: hp('3%'),
    },
    calculateButtonText: {
        color: colors.WHITE,
        fontSize: wp('4%'),
        fontWeight: '500',
    },
});