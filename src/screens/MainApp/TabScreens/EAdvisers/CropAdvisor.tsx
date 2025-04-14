import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Navbar from '../../Navbar/Navbar';
// import BottomBar from '../../BottomBar/BottomBar';
import colors from '../../../../../util/Constants/colors';

// Directly accessing string constants from the default export
const ScreensName = {
    ZoneDetails: 'ZoneDetails',
};

type ZoneType = {
    id: string;
    name: string;
    crop: string;
    requirements: string;
};

type RootStackParamList = {
    [ScreensName.ZoneDetails]: { zone: ZoneType };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const CropAdvisor = () => {
    const navigation = useNavigation<NavigationProp>();

    const zones: ZoneType[] = [
        { id: '1', name: 'Zone 1', crop: 'Wheat', requirements: 'Requires modern irrigation' },
        { id: '2', name: 'Zone 2', crop: 'Rice', requirements: 'Prefers waterlogged soil' },
        { id: '3', name: 'Zone 3', crop: 'Corn', requirements: 'Thrives in direct sunlight' },
        { id: '4', name: 'Zone 4', crop: 'Potatoes', requirements: 'Grows well in cool temperatures' },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Navbar gobackOnly={true} />
            </View>

            <View style={styles.content}>
                <Text style={styles.title}>Crop Advisor</Text>

                <View style={styles.mapContainer}>
                    <Image 
                        source={require('./Images/temp/field.png')}
                        style={styles.mapImage}
                        resizeMode="cover"
                    />
                    <View style={styles.overlay}>
                        <View style={[styles.zoneMarker, styles.zone1Marker]}>
                            <Text style={styles.zoneMarkerText}>zone 1</Text>
                        </View>
                        <View style={[styles.zoneMarker, styles.zone2Marker]}>
                            <Text style={styles.zoneMarkerText}>zone 2</Text>
                        </View>
                        <View style={[styles.zoneMarker, styles.zone3Marker]}>
                            <Text style={styles.zoneMarkerText}>zone 4</Text>
                        </View>
                        <View style={[styles.zoneMarker, styles.zone4Marker]}>
                            <Text style={styles.zoneMarkerText}>zone 3</Text>
                        </View>
                    </View>
                </View>

                <Text style={styles.subtitle}>Most suitable crop per zone:</Text>

                <View style={styles.zonesGrid}>
                    <View style={styles.row}>
                        <TouchableOpacity 
                            style={styles.zoneCard}
                            onPress={() => navigation.navigate(ScreensName.ZoneDetails, { zone: zones[0] })}
                        >
                            <Text style={[styles.zoneName, {color: '#FF6600'}]}>Zone 1</Text>
                            <Text style={styles.bestFor}>Best for: Wheat</Text>
                            <Text style={styles.requirements}>Requires modern irrigation</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={styles.zoneCard}
                            onPress={() => navigation.navigate(ScreensName.ZoneDetails, { zone: zones[1] })}
                        >
                            <Text style={[styles.zoneName, {color: '#9900CC'}]}>Zone 2</Text>
                            <Text style={styles.bestFor}>Best for: Rice</Text>
                            <Text style={styles.requirements}>Prefers waterlogged soil</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.row}>
                        <TouchableOpacity 
                            style={styles.zoneCard}
                            onPress={() => navigation.navigate(ScreensName.ZoneDetails, { zone: zones[2] })}
                        >
                            <Text style={[styles.zoneName, {color: '#0066CC'}]}>Zone 3</Text>
                            <Text style={styles.bestFor}>Best for: Corn</Text>
                            <Text style={styles.requirements}>Thrives in direct sunlight</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={styles.zoneCard}
                            onPress={() => navigation.navigate(ScreensName.ZoneDetails, { zone: zones[3] })}
                        >
                            <Text style={[styles.zoneName, {color: '#FFCC00'}]}>Zone 4</Text>
                            <Text style={styles.bestFor}>Best for: Potatoes</Text>
                            <Text style={styles.requirements}>Grows well in cool temperatures</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* <View style={styles.bottomBarContainer}>
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
        fontSize: wp('5.5%'),
        fontWeight: 'bold',
        marginBottom: hp('2%'),
        color: colors.BLACK,
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
        padding: 5,
        borderRadius: 5,
    },
    zone1Marker: {
        top: '20%',
        left: '15%',
        backgroundColor: 'rgba(255, 102, 0, 0.7)',
    },
    zone2Marker: {
        top: '10%',
        right: '40%',
        backgroundColor: 'rgba(153, 0, 204, 0.7)',
    },
    zone3Marker: {
        bottom: '10%',
        left: '20%',
        backgroundColor: 'rgba(0, 102, 204, 0.7)',
    },
    zone4Marker: {
        bottom: '20%',
        right: '20%',
        backgroundColor: 'rgba(255, 204, 0, 0.7)',
    },
    zoneMarkerText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: wp('3%'),
    },
    subtitle: {
        fontSize: wp('4%'),
        marginBottom: hp('2%'),
        color: colors.BLACK,
    },
    zonesGrid: {
        width: '100%',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: hp('2%'),
    },
    zoneCard: {
        width: wp('43%'),
        padding: wp('3%'),
        backgroundColor: 'rgba(240, 255, 240, 0.7)',
        borderRadius: wp('3%'),
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    zoneName: {
        fontSize: wp('4.5%'),
        fontWeight: 'bold',
        marginBottom: 5,
    },
    bestFor: {
        fontSize: wp('3.8%'),
        marginBottom: 5,
    },
    requirements: {
        fontSize: wp('3.5%'),
        color: colors.GRAY,
    },
    bottomBarContainer: {
        height: hp('8%'),
        backgroundColor: colors.WHITE,
        borderTopWidth: 1,
        borderTopColor: colors.LIGHT_GRAY,
    },
});

export default CropAdvisor; 