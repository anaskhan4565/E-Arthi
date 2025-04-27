import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { useTranslation } from 'react-i18next';
import Navbar from '../MainApp/Navbar/Navbar';
import colors from '../../../util/Constants/colors';
import { fonts } from '../../../util/Constants/FontName';
import ScreensName from '../../../util/Constants/ScreensName';
import CustomButton from '../../components/CustomButton';
const DashboardInitialization = () => {
    const navigation = useNavigation();
    const { t } = useTranslation();

    // Sample data for soil moisture and crops
    const [soilMoisture, setSoilMoisture] = useState(63);
    const [predictedCrops, setPredictedCrops] = useState([
        { name: 'Maize', percentage: 32, selected: true },
        { name: 'Wheat', percentage: 30, selected: true },
        { name: 'Onion', percentage: 20, selected: true },
        { name: 'Sugercane', percentage: 13, selected: true },
        { name: 'Potatoes', percentage: 6, selected: true }
    ]);

    // Toggle crop selection
    const toggleCropSelection = (index) => {
        const updatedCrops = [...predictedCrops];
        updatedCrops[index].selected = !updatedCrops[index].selected;
        setPredictedCrops(updatedCrops);
    };

    // Handle navigation to next screen
    const handleNext = () => {
        navigation.navigate(ScreensName.MainTabNavigation);
    };

    // Add a new crop dialog
    const [showAddCropDialog, setShowAddCropDialog] = useState(false);

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.navbarContainer}>
                <Navbar gobackOnly={false} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.title}>Dashboard initialization</Text>

                <View style={styles.cardContainer}>
                    <Text style={styles.cardTitle}>Soil moisture</Text>

                    <View style={styles.circleContainer}>
                        <AnimatedCircularProgress
                            size={wp(30)}
                            width={17}
                            fill={soilMoisture}
                            tintColor={colors.GREEN}
                            backgroundColor="#e0e0ff"
                            rotation={0}
                            lineCap="round"
                        >
                            {(fill) => (
                                <Text style={styles.circleText}>{Math.round(fill)}%</Text>
                            )}
                        </AnimatedCircularProgress>
                    </View>

                    <View style={styles.progressBar}>
                        <View style={[styles.progressFill, { width: `${soilMoisture}%` }]} />
                        <Text style={styles.progressText}>{soilMoisture} %</Text>
                    </View>

                    <Text style={styles.cropTitle}>Predicted crops on your land</Text>

                    {predictedCrops.map((crop, index) => (
                        <View key={index} style={styles.cropItem}>
                            <TouchableOpacity
                                style={[styles.cropToggle, crop.selected ? styles.cropSelected : styles.cropUnselected]}
                                onPress={() => toggleCropSelection(index)}
                            >
                                {crop.selected ? <Text style={styles.toggleX}>✕</Text> : null}
                            </TouchableOpacity>

                            <View style={styles.cropProgressContainer}>
                                <View style={styles.cropProgressBar}>
                                    <View
                                        style={[
                                            styles.cropProgressFill,
                                            { width: `${crop.percentage}%`, backgroundColor: colors.GREEN }
                                        ]}
                                    />
                                </View>
                                <Text style={styles.cropPercentage}>{crop.percentage} %</Text>
                            </View>

                            <Text style={styles.cropName}>{crop.name}</Text>
                        </View>
                    ))}
                      <Text style={styles.helperText}>
                        Please remove any crop areas you believe are incorrect
                    </Text>
                          <TouchableOpacity style={styles.addCropButton} onPress={() => setShowAddCropDialog(true)}>
                        <Text style={styles.addCropText}>Add other crops</Text>
                    </TouchableOpacity>
               
   


                </View>
     
                <View style={styles.nextButton}>
                    <CustomButton
                        MainText={t('Next')}
                        BgGiven={colors.GREEN} name={ScreensName.PaymentSuccess} txColor={colors.WHITE} isNavigation={1} />
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
        height: hp("8.2%"),
        backgroundColor: "white",
        marginTop: hp("0.2%"),
        width: '100%',
    },
    scrollContainer: {
        flexGrow: 1,
        paddingHorizontal: wp(5),
        paddingBottom: hp(7),
    },
    title: {
        fontSize: hp(3),
        fontFamily: fonts.SemiBold,
        color: colors.BLACK,
        marginTop: hp(2),
        marginBottom: hp(3),
    },
    cardContainer: {
        backgroundColor: colors.LIGHT_GREEN,
        borderRadius: wp(4),
        padding: wp(5),
        marginBottom: hp(3),
    },
    cardTitle: {
        fontSize: hp(2.5),
        fontFamily: fonts.SemiBold,
        color: colors.BLACK,
        textAlign: 'center',
        marginBottom: hp(3),
    },
    circleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: hp(3),
    },
    circleText: {
        fontSize: hp(2.5),
        fontFamily: fonts.Bold,
        color: colors.GREEN,
    },
    progressBar: {
        height: hp(2.5),
        backgroundColor: colors.LIGHT_GRAY,
        borderRadius: wp(10),
        marginBottom: hp(4),
        position: 'relative',
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: colors.GREEN,
        borderRadius: wp(10),
    },
    progressText: {
        position: 'absolute',
        right: wp(3),
        top: 0,
        bottom: 0,
        textAlignVertical: 'center',
        fontSize: hp(1.6),
        fontFamily: fonts.Medium,
        color: colors.BLACK,
    },
    cropTitle: {
        fontSize: hp(2.2),
        fontFamily: fonts.SemiBold,
        color: colors.BLACK,
        marginBottom: hp(3),
    },
    cropItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp(2),
    },
    cropToggle: {
        width: wp(5),
        height: wp(5),
        borderRadius: wp(2.5),
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: wp(3),
    },
    cropSelected: {
        borderColor: colors.RED,
        backgroundColor: colors.RED,
    },
    cropUnselected: {
        borderColor: colors.GRAY,
        backgroundColor: colors.WHITE,
    },
    toggleX: {
        color: colors.WHITE,
        fontSize: hp(1.2),
        fontWeight: 'bold',
    },
    cropProgressContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    cropProgressBar: {
        flex: 1,
        height: hp(2),
        backgroundColor: colors.LIGHT_GRAY,
        borderRadius: wp(10),
        marginRight: wp(2),
        overflow: 'hidden',
    },
    cropProgressFill: {
        height: '100%',
        borderRadius: wp(10),
    },
    cropPercentage: {
        width: wp(12),
        fontSize: hp(1.6),
        fontFamily: fonts.Medium,
        color: colors.GREEN,
    },
    cropName: {
        width: wp(25),
        fontSize: hp(1.8),
        fontFamily: fonts.Medium,
        color: colors.BLACK,
    },
    addCropButton: {
        alignItems: 'center',
        marginTop: hp(2),
        width: '70%',
        backgroundColor: colors.GREEN,
        padding: wp(4),
        borderRadius: wp(6),
        justifyContent: 'center',
        bottom: hp(2),
        alignSelf: 'center',
        // height: hp(6),
    },
    addCropText: {
        color: colors.WHITE,
        fontSize: hp(1.7),
        fontFamily: fonts.Medium,
    },
    helperText: {
        textAlign: 'center',
        color: colors.GRAY,
        fontSize: hp(1.6),
        fontFamily: fonts.Regular,
        marginVertical: hp(2),
    },
    nextButton: {
        alignSelf: 'center',
    },
    nextButtonText: {
        color: colors.WHITE,
        fontSize: hp(2),
        fontFamily: fonts.SemiBold,
    },



});

export default DashboardInitialization; 