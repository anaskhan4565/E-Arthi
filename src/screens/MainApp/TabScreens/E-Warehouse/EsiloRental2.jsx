import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import Navbar from '../../Navbar/Navbar.jsx';
import CustomSearchApp from '../../CustomComponent/CustomSearchApp.jsx';
import { fonts } from '../../../../../util/Constants/FontName.js';
import colors from '../../../../../util/Constants/colors.js';
import ScreensName from '../../../../../util/Constants/ScreensName.ts';

// Import SVG assets
import SiloSVG from '../../../../assets/MainApp/E-Warehouse/Silo.svg';

function ESiloRental2() {
    const { t } = useTranslation();
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navbarContainer}>
                <Navbar />
            </View>

            <ScrollView style={styles.container}>
                <View style={styles.searchContainer}>
                    <CustomSearchApp placeholder={t('Search in here')} />
                </View>

                <View style={styles.titleWrapper}>
                    <Text style={styles.titleText}>{t('Silo Rental')}</Text>
                </View>

                <View style={styles.infoCard}>
                    <View style={styles.infoCardLeft}>
                        <SiloSVG width={wp(15)} height={hp(10)} style={styles.siloIcon} />
                    </View>
                    <View style={styles.infoCardRight}>
                        <View style={styles.locationContainer}>
                            <Text style={styles.locationLabel}>{t('Located:')}</Text>
                            <Text style={styles.locationValue}>{t('120 Km away')}</Text>
                        </View>
                        <View style={styles.dividerHorizontal} />
                        <View style={styles.detailsContainer}>
                            <View style={styles.detailColumn}>
                                <Text style={styles.detailLabel}>{t('Crop')}</Text>
                                <Text style={styles.detailValue}>{t('Rice')}</Text>
                            </View>
                            <View style={styles.verticalDivider} />
                            <View style={styles.detailColumn}>
                                <Text style={styles.detailLabel}>{t('Grade')}</Text>
                                <Text style={styles.detailValue}>{t('A+')}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>{t('Total Space')}</Text>
                    
                    <View style={styles.circularProgressContainer}>
                        <AnimatedCircularProgress
                            size={wp(25)}
                            width={wp(3)}
                            fill={80}
                            tintColor={colors.PRIMARY}
                            backgroundColor="#e8f5e9"
                            rotation={0}
                            lineCap="round"
                        />
                        <View style={styles.spaceInfoContainer}>
                            <View style={styles.spaceInfoRow}>
                                <Text style={styles.totalSpaceValue}>{t('10000 KG')}</Text>
                                <Text style={styles.spaceLabel}>{t('Total space')}</Text>
                            </View>
                            <View style={styles.spaceInfoRow}>
                                <Text style={styles.remainingSpaceValue}>{t('8000 KG')}</Text>
                                <Text style={styles.spaceLabel}>{t('Remaining space')}</Text>
                            </View>
                        </View>
                    </View>
                    
                    <View style={styles.dividerHorizontal} />
                    
                    <View style={styles.riceTypesContainer}>
                        <View style={styles.riceTypeColumn}>
                            <Text style={styles.riceTypeTitle}>{t('Basmati Rice')}</Text>
                            <Image 
                                source={require('../../../../assets/MainApp/E-Warehouse/Crop.png')} 
                                style={styles.cropImage} 
                                resizeMode="contain"
                            />
                            <Text style={styles.riceTypeValue}>{t('1000 KG stored')}</Text>
                        </View>
                        
                        <View style={styles.verticalDivider} />
                        
                        <View style={styles.riceTypeColumn}>
                            <Text style={styles.riceTypeTitle}>{t('Brown Rice')}</Text>
                            <Image 
                                source={require('../../../../assets/MainApp/E-Warehouse/Crop.png')} 
                                style={styles.cropImage} 
                                resizeMode="contain"
                            />
                            <Text style={styles.riceTypeValue}>{t('1000 KG stored')}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITE,
    },
    navbarContainer: {
        height: hp(8.5),
        backgroundColor: colors.WHITE,
        borderBottomWidth: 1,
        borderBottomColor: colors.LIGHT_GRAY,
    },
    searchContainer: {
        marginTop: hp(2),
        height: hp(7),
        paddingHorizontal: wp(2),
    },
    titleWrapper: {
        marginHorizontal: wp(4),
        marginTop: hp(1),
        marginBottom: hp(2),
    },
    titleText: {
        fontSize: hp(2.5),
        fontFamily: fonts.SemiBold,
        color: colors.BLACK,
        letterSpacing: hp(0.1),
    },
    infoCard: {
        flexDirection: 'row',
        marginHorizontal: wp(4),
        marginBottom: hp(3),
        backgroundColor: colors.LIGHT_GRAY_BG || '#f5f5f5',
        borderRadius: hp(1.5),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    infoCardLeft: {
        width: wp(20),
        justifyContent: 'center',
        alignItems: 'center',
        padding: wp(2),
    },
    siloIcon: {
        tintColor: '#8bc34a',  // Light green tint
    },
    infoCardRight: {
        flex: 1,
        padding: wp(2),
    },
    locationContainer: {
        marginBottom: hp(1),
    },
    locationLabel: {
        fontSize: hp(1.8),
        fontFamily: fonts.Medium,
        color: colors.DARK_GRAY,
    },
    locationValue: {
        fontSize: hp(2.2),
        fontFamily: fonts.SemiBold,
        color: colors.BLACK,
    },
    dividerHorizontal: {
        height: 1,
        backgroundColor: colors.LIGHT_GRAY,
        marginVertical: hp(1.5),
    },
    detailsContainer: {
        flexDirection: 'row',
    },
    detailColumn: {
        flex: 1,
        alignItems: 'center',
    },
    detailLabel: {
        fontSize: hp(1.8),
        fontFamily: fonts.Medium,
        color: colors.DARK_GRAY,
        marginBottom: hp(0.5),
    },
    detailValue: {
        fontSize: hp(2),
        fontFamily: fonts.SemiBold,
        color: colors.BLACK,
    },
    verticalDivider: {
        width: 1,
        backgroundColor: colors.LIGHT_GRAY,
        marginHorizontal: wp(2),
    },
    sectionContainer: {
        marginHorizontal: wp(4),
        backgroundColor: colors.LIGHT_GRAY_BG || '#f5f5f5',
        borderRadius: hp(1.5),
        padding: wp(4),
        marginBottom: hp(4),
    },
    sectionTitle: {
        fontSize: hp(2.2),
        fontFamily: fonts.SemiBold,
        color: colors.BLACK,
        marginBottom: hp(2),
    },
    circularProgressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: hp(2),
    },
    spaceInfoContainer: {
        marginLeft: wp(4),
        flex: 1,
    },
    spaceInfoRow: {
        marginBottom: hp(1),
    },
    totalSpaceValue: {
        fontSize: hp(2),
        fontFamily: fonts.SemiBold,
        color: colors.PRIMARY,
    },
    remainingSpaceValue: {
        fontSize: hp(2),
        fontFamily: fonts.SemiBold,
        color: '#8bc34a',  // Light green
    },
    spaceLabel: {
        fontSize: hp(1.6),
        fontFamily: fonts.Regular,
        color: colors.DARK_GRAY,
    },
    riceTypesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    riceTypeColumn: {
        flex: 1,
        alignItems: 'center',
        padding: wp(3),
    },
    riceTypeTitle: {
        fontSize: hp(1.8),
        fontFamily: fonts.SemiBold,
        color: colors.BLACK,
        marginBottom: hp(1.5),
        textAlign: 'center',
    },
    cropImage: {
        width: wp(15),
        height: hp(10),
        marginBottom: hp(1.5),
    },
    riceTypeValue: {
        fontSize: hp(1.6),
        fontFamily: fonts.Medium,
        color: colors.DARK_GRAY,
        textAlign: 'center',
    },
});

export default ESiloRental2;