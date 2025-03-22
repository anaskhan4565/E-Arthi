import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useTranslation } from 'react-i18next';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Navbar from '../../../Navbar/Navbar';
import CustomSearchApp from '../../../CustomComponent/CustomSearchApp';
import { fonts } from '../../../../../../util/Constants/FontName';
import colors from '../../../../../../util/Constants/colors';

const SiloRental = () => {
    const { t } = useTranslation();
    
    // Calculate the fill percentage
    const totalSpace = 10000;
    const remainingSpace = 8000;
    const usedSpace = totalSpace - remainingSpace;
    const fillPercentage = (usedSpace / totalSpace) * 100;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navbarContainer}>
                <Navbar />
            </View>
            
            <ScrollView style={styles.container}>
                <View style={styles.searchContainer}>
                    <CustomSearchApp placeholder={t('Search in here')} />
                </View>

                <View style={styles.contentContainer}>
                    <Text style={styles.title}>Silo Rental</Text>
                    
                    {/* Total Space Circle Progress */}
                    <View style={styles.spaceContainer}>
                        <AnimatedCircularProgress
                            size={wp(60)}
                            width={15}
                            fill={fillPercentage}
                            tintColor="#00B087"
                            backgroundColor="#E8F5F1"
                            rotation={0}
                            lineCap="round"
                        >
                            {() => (
                                <View style={styles.circleContent}>
                                    <Text style={styles.totalSpaceText}>
                                        {totalSpace} KG
                                    </Text>
                                    <Text style={styles.totalSpaceLabel}>
                                        Total space
                                    </Text>
                                    <Text style={styles.remainingSpaceText}>
                                        {remainingSpace} KG
                                    </Text>
                                    <Text style={styles.remainingSpaceLabel}>
                                        Remaining Space
                                    </Text>
                                </View>
                            )}
                        </AnimatedCircularProgress>
                    </View>

                    {/* Storage Information */}
                    <View style={styles.storageInfoContainer}>
                        <View style={styles.storageItem}>
                            <Text style={styles.storageTitle}>Wheat</Text>
                            <Text style={styles.storageValue}>1000 KG stored</Text>
                        </View>
                        <View style={styles.storageDivider} />
                        <View style={styles.storageItem}>
                            <Text style={styles.storageTitle}>Rice</Text>
                            <Text style={styles.storageValue}>1000 KG stored</Text>
                        </View>
                    </View>

                    {/* Reserve Button */}
                    <TouchableOpacity style={styles.reserveButton}>
                        <Text style={styles.reserveButtonText}>Reserve The Silo</Text>
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
    searchContainer: {
        marginTop: hp('2%'),
        height: hp('7%'),
        marginHorizontal: hp(2),
    },
    contentContainer: {
        padding: hp(2),
    },
    title: {
        fontSize: hp(2.8),
        fontFamily: fonts.SemiBold,
        marginBottom: hp(3),
    },
    spaceContainer: {
        alignItems: 'center',
        marginBottom: hp(3),
    },
    circleContent: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    totalSpaceText: {
        fontSize: hp(2.4),
        fontFamily: fonts.SemiBold,
        color: colors.BLACK,
        marginBottom: hp(0.5),
    },
    totalSpaceLabel: {
        fontSize: hp(1.6),
        color: colors.BLACK,
        opacity: 0.7,
        marginBottom: hp(1),
    },
    remainingSpaceText: {
        fontSize: hp(2.2),
        fontFamily: fonts.SemiBold,
        color: '#00B087',
    },
    remainingSpaceLabel: {
        fontSize: hp(1.6),
        color: colors.BLACK,
        opacity: 0.7,
    },
    storageInfoContainer: {
        flexDirection: 'row',
        backgroundColor: colors.WHITE,
        borderRadius: hp(2),
        padding: hp(2),
        marginBottom: hp(3),
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    storageItem: {
        flex: 1,
        alignItems: 'center',
    },
    storageDivider: {
        width: 1,
        backgroundColor: colors.LIGHT_GRAY,
    },
    storageTitle: {
        fontSize: hp(2),
        fontFamily: fonts.SemiBold,
        marginBottom: hp(1),
    },
    storageValue: {
        fontSize: hp(1.8),
        color: colors.BLACK,
        opacity: 0.7,
    },
    reserveButton: {
        backgroundColor: '#00B087',
        borderRadius: hp(1),
        padding: hp(2),
        alignItems: 'center',
    },
    reserveButtonText: {
        color: colors.WHITE,
        fontSize: hp(2),
        fontFamily: fonts.SemiBold,
    },
});

export default SiloRental;