import { StyleSheet, Text, View, SafeAreaView, TextInput, ScrollView, TouchableOpacity, Image, Platform } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Navbar from '../../../MainApp/Navbar/Navbar.jsx';
import ScreensName from '../../../../../util/Constants/ScreensName.ts';
import colors from '../../../../../util/Constants/colors.js';
import { fonts } from '../../../../../util/Constants/FontName.js';

const CultivationTips = () => {
    const navigation = useNavigation();
    const [sowingDate, setSowingDate] = useState(new Date());


  return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navbarContainer}>
                <Navbar />
            </View>
            <ScrollView style={styles.scrollContainer}>
                <Text style={styles.title}>Cultivation Tips</Text>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Sowing Date:</Text>
                    <View style={styles.dateContainer}>
                        <TouchableOpacity onPress={() =>navigation.navigate(ScreensName.SeedlingStage)} style={styles.dateTextBox} >
                            <Image source={require('./AssetsPlantDr/CultivationTips/Calender.png')} style={styles.dateIcon} />

                            <Text style={styles.dateText}>{sowingDate.toLocaleDateString()}</Text>

                        </TouchableOpacity>
                    </View>

                </View>

                <View style={styles.menuContainer}>
                    <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate(ScreensName.FertilizationChemical,{Name:"Plant Selection"})}>
                        <View style={styles.featureIconContainer}>
                            <Image source={require('./AssetsPlantDr/CultivationTips/1.png')} style={styles.featureIcon} />
                            <Text style={styles.menuItemText}>Plant Selection</Text>
                        </View>
                        <Image source={require('./AssetsPlantDr/CultivationTips/NavImg.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate(ScreensName.FertilizationChemical,{Name:"Planting"})}>
                        <View style={styles.featureIconContainer}>

                            <Image source={require('./AssetsPlantDr/CultivationTips/2.png')} style={styles.featureIcon} />
                            <Text style={styles.menuItemText}>Planting</Text>
                        </View>
                        <Image source={require('./AssetsPlantDr/CultivationTips/NavImg.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate(ScreensName.FertilizationChemical,{Name:"Monitoring"})}>
                        <View style={styles.featureIconContainer}>
                            <Image source={require('./AssetsPlantDr/CultivationTips/3.png')} style={styles.featureIcon} />
                            <Text style={styles.menuItemText}>Monitoring</Text>
                        </View>
                        <Image source={require('./AssetsPlantDr/CultivationTips/NavImg.png')} />

                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate(ScreensName.FertilizationChemical,{Name:"Site Selection"})}>
                        <View style={styles.featureIconContainer}>
                            <Image source={require('./AssetsPlantDr/CultivationTips/4.png')} style={styles.featureIcon} />
                            <Text style={styles.menuItemText}>Site Selection</Text>
                        </View>
                        <Image source={require('./AssetsPlantDr/CultivationTips/NavImg.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate(ScreensName.FertilizationChemical,{Name:"Field Preparation"})}>
                        <View style={styles.featureIconContainer}>
                            <Image source={require('./AssetsPlantDr/CultivationTips/5.png')} style={styles.featureIcon} />
                            <Text style={styles.menuItemText}>Field Preparation</Text>
                        </View>
                        <Image source={require('./AssetsPlantDr/CultivationTips/NavImg.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate(ScreensName.FertilizationChemical,{Name:"Weeding"})}>
                        <View style={styles.featureIconContainer}>
                            <Image source={require('./AssetsPlantDr/CultivationTips/6.png')} style={styles.featureIcon} />
                            <Text style={styles.menuItemText}>Weeding</Text>
                        </View>
                        <Image source={require('./AssetsPlantDr/CultivationTips/NavImg.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate(ScreensName.FertilizationChemical,{Name:"Irrigation"})}>
                        <View style={styles.featureIconContainer}>
                            <Image source={require('./AssetsPlantDr/CultivationTips/7.png')} style={styles.featureIcon} />
                            <Text style={styles.menuItemText}>Irrigation</Text>
                        </View>
                        <Image source={require('./AssetsPlantDr/CultivationTips/NavImg.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate(ScreensName.FertilizationChemical,{Name:"Fertilization Organic"})}>
                        <View style={styles.featureIconContainer}>
                            <Image source={require('./AssetsPlantDr/CultivationTips/8.png')} style={styles.featureIcon} />
                            <Text style={styles.menuItemText}>Fertilization Organic</Text>
                        </View>
                        <Image source={require('./AssetsPlantDr/CultivationTips/NavImg.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate(ScreensName.FertilizationChemical,{Name:"Fertilization Chemical"})}>
                        <View style={styles.featureIconContainer}>
                            <Image source={require('./AssetsPlantDr/CultivationTips/9.png')} style={styles.featureIcon} />
                            <Text style={styles.menuItemText}>Fertilization Chemical</Text>
                        </View>
                        <Image source={require('./AssetsPlantDr/CultivationTips/NavImg.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate(ScreensName.FertilizationChemical,{Name:"Preventive Measure"})}>
                        <View style={styles.featureIconContainer}>
                            <Image source={require('./AssetsPlantDr/CultivationTips/10.png')} style={styles.featureIcon} />
                            <Text style={styles.menuItemText}>Preventive Measure</Text>
                        </View>
                        <Image source={require('./AssetsPlantDr/CultivationTips/NavImg.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate(ScreensName.FertilizationChemical,{Name:"Plant Protective Chemical"})}>
                        <View style={styles.featureIconContainer}>
                            <Image source={require('./AssetsPlantDr/CultivationTips/11.png')} style={styles.featureIcon} />
                            <Text style={styles.menuItemText}>Plant Protective Chemical</Text>
                        </View>
                        <Image source={require('./AssetsPlantDr/CultivationTips/NavImg.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate(ScreensName.FertilizationChemical,{Name:"Harvesting"})}>
                        <View style={styles.featureIconContainer}>
                            <Image source={require('./AssetsPlantDr/CultivationTips/12.png')} style={styles.featureIcon} />
                            <Text style={styles.menuItemText}>Harvesting</Text>
                        </View>
                        <Image source={require('./AssetsPlantDr/CultivationTips/NavImg.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate(ScreensName.FertilizationChemical,{Name:"Post Harvest"})}>
                        <View style={styles.featureIconContainer}>
                            <Image source={require('./AssetsPlantDr/CultivationTips/13.png')} style={styles.featureIcon} />
                            <Text style={styles.menuItemText}>Post Harvest</Text>
                        </View>
                        <Image source={require('./AssetsPlantDr/CultivationTips/NavImg.png')} />
                    </TouchableOpacity>
    </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    navbarContainer: {
        height: hp("8.2%"),
        backgroundColor: "white",
        marginTop: hp("0.14%"),
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    scrollContainer: {
        flex: 1,
        padding: 16,
    },
    dateText: {
        fontSize: 16,
        color: colors.WHITE,
        fontFamily: fonts.SemiBold,

    },
    dateTextBox: {
        borderWidth: 1,
        borderRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 13,
        backgroundColor: colors.DARK_GREEN,
        borderColor: colors.WHITE,
        padding: 2,
        width: hp(30),
        marginLeft: hp(1)

    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dateIcon: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    dateIcon: {
        width: wp('5%'),
        height: hp('4%'),
        resizeMode: 'contain',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#000',
    },
    featureIcon: {
        width: wp('10%'),
        height: hp('4%'),
        resizeMode: 'contain',
    },
    featureIconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    featureIconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },

    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: '#000',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
    },
    menuContainer: {
        gap: 12,
        marginBottom: hp('4%'),
    },
    menuItem: {
        backgroundColor: colors.LIGHT_GREEN,
        padding: 16,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        borderWidth: 1,
        justifyContent: 'space-between',
        borderColor: 'green',
    },
    menuItemText: {
        fontSize: 16,
        color: '#000',
        fontFamily: fonts.SemiBold,
    },
});

export default CultivationTips