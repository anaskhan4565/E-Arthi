import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Image,
    ScrollView,
} from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Navbar from '../../Navbar/Navbar';
// import BottomBar from '../../BottomBar/BottomBar';
import colors from '../../../../../util/Constants/colors';

type ZoneType = {
    id: string;
    name: string;
    crop: string;
    requirements: string;
};

type RouteParams = {
    ZoneDetails: {
        zone: ZoneType;
    };
};

const ZoneDetails = () => {
    const route = useRoute<RouteProp<RouteParams, 'ZoneDetails'>>();
    const navigation = useNavigation();
    const { zone } = route.params;

    const zoneColors = {
        'Zone 1': '#FF6600',
        'Zone 2': '#9900CC',
        'Zone 3': '#0066CC',
        'Zone 4': '#FFCC00',
    };

    const cropDetails = {
        'Wheat': {
            duration: '110-130 days',
            water: 'Medium',
            soil: 'Loam or Clay-Loam',
            yield: '2,500-3,500 kg per acre'
        },
        'Rice': {
            duration: '90-120 days',
            water: 'High',
            soil: 'Clay or Clay-Loam',
            yield: '2,000-3,000 kg per acre'
        },
        'Corn': {
            duration: '100-120 days',
            water: 'Medium-High',
            soil: 'Loamy',
            yield: '3,000-5,000 kg per acre'
        },
        'Potatoes': {
            duration: '70-120 days',
            water: 'Medium',
            soil: 'Sandy Loam',
            yield: '10,000-15,000 kg per acre'
        }
    };

    const currentCrop = cropDetails[zone.crop as keyof typeof cropDetails];
    const zoneColor = zoneColors[zone.name as keyof typeof zoneColors] || '#333333';

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Navbar gobackOnly={true} />
            </View>

            <ScrollView style={styles.content}>
                <Text style={[styles.title, { color: zoneColor }]}>{zone.name}</Text>
                
                <View style={styles.mapContainer}>
                    <Image 
                        source={require('./Images/temp/field2.png')}
                        style={styles.mapImage}
                        resizeMode="cover"
                    />
                    <View style={styles.overlay}>
                        <View 
                            style={[
                                styles.zoneMarker, 
                                { backgroundColor: `${zoneColor}DD` },
                                zone.name === 'Zone 1' ? { top: '20%', left: '15%' } :
                                zone.name === 'Zone 2' ? { top: '10%', right: '40%' } :
                                zone.name === 'Zone 3' ? { bottom: '30%', left: '20%' } :
                                { bottom: '20%', right: '20%' }
                            ]}
                        >
                            <Text style={styles.zoneMarkerText}>{zone.name}</Text>
                        </View>
                    </View>
                </View>

                <Text style={styles.subtitle}>Most suitable crop: {zone.crop}</Text>

                <View style={styles.detailsCard}>
                    <Text style={styles.detailsTitle}>Crop Details:</Text>
                    
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Growth Duration:</Text>
                        <Text style={styles.detailValue}>{currentCrop.duration}</Text>
                    </View>
                    
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Water Requirement:</Text>
                        <Text style={styles.detailValue}>{currentCrop.water}</Text>
                    </View>
                    
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Soil Type:</Text>
                        <Text style={styles.detailValue}>{currentCrop.soil}</Text>
                    </View>
                    
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Expected Yield:</Text>
                        <Text style={styles.detailValue}>{currentCrop.yield}</Text>
                    </View>
                </View>

                <View style={styles.requirementsCard}>
                    <Text style={styles.requirementsTitle}>Zone Characteristics:</Text>
                    <Text style={styles.requirementsText}>{zone.requirements}</Text>
                </View>
            </ScrollView>
{/* 
            <View style={styles.bottomBarContainer}>
                <BottomBar />
            </View> */}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITE,
    },
    header: {
        height: hp('7%'),
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
    },
    content: {
        flex: 1,
        padding: wp('5%'),
    },
    title: {
        fontSize: wp('6%'),
        fontWeight: 'bold',
        marginBottom: hp('2%'),
    },
    mapContainer: {
        width: '100%',
        height: hp('25%'),
        borderRadius: wp('3%'),
        overflow: 'hidden',
        marginBottom: hp('2%'),
        position: 'relative',
    },
    mapImage: {
        width: '100%',
        height: '100%',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    zoneMarker: {
        position: 'absolute',
        padding: wp('2%'),
        borderRadius: wp('2%'),
    },
    zoneMarkerText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: wp('4%'),
    },
    subtitle: {
        fontSize: wp('5%'),
        fontWeight: '500',
        marginBottom: hp('2%'),
    },
    detailsCard: {
        backgroundColor: colors.WHITE,
        borderRadius: wp('3%'),
        padding: wp('4%'),
        marginBottom: hp('2%'),
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    detailsTitle: {
        fontSize: wp('4.5%'),
        fontWeight: '500',
        marginBottom: hp('2%'),
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: hp('1%'),
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    detailLabel: {
        fontSize: wp('4%'),
        color: colors.GRAY,
    },
    detailValue: {
        fontSize: wp('4%'),
        color: colors.BLACK,
        fontWeight: '500',
    },
    requirementsCard: {
        backgroundColor: colors.WHITE,
        borderRadius: wp('3%'),
        padding: wp('4%'),
        marginBottom: hp('2%'),
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    requirementsTitle: {
        fontSize: wp('4.5%'),
        fontWeight: '500',
        marginBottom: hp('1%'),
    },
    requirementsText: {
        fontSize: wp('4%'),
        color: colors.GRAY,
        lineHeight: hp('3%'),
    },
    bottomBarContainer: {
        height: hp('8%'),
        backgroundColor: colors.WHITE,
        borderTopWidth: 1,
        borderTopColor: colors.LIGHT_GRAY,
    },
});

export default ZoneDetails; 