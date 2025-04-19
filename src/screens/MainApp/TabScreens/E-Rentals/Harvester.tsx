import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    TextInput,
    ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Navbar from '../../Navbar/Navbar';
import colors from '../../../../../util/Constants/colors';
import { fonts } from '../../../../../util/Constants/FontName';
import ScreensName from '../../../../../util/Constants/ScreensName';

type RootStackParamList = {
    RentalDetails: { vehicleType: string };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Harvester = () => {
    const navigation = useNavigation<NavigationProp>();

    return (
        <View style={styles.container}>
            <View style={styles.navbarContainer}>
                <Navbar gobackOnly={false} />
            </View>

            <ScrollView style={styles.content}>
                {/* Search Bar */}
                

                <Text style={styles.title}>Harvester</Text>
                <Text style={styles.subtitle}>Choose the attachment for the harvester</Text>

                {/* Vehicle Grid */}
                <View style={styles.vehicleGrid}>
                    <TouchableOpacity 
                        style={styles.vehicleItem}
                        onPress={() => navigation.navigate(ScreensName.BookRental, { vehicleType: 'Sugarcane Harvester' })}
                    >
                        <Image
                            source={require('./assets/sugarcane.png')}
                            style={[styles.vehicleIcon]}
                        />
                        <Text style={styles.vehicleText}>Sugarcane Harvester</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.vehicleItem}
                        onPress={() => navigation.navigate(ScreensName.BookRental, { vehicleType: 'Corn Harvester' })}
                    >
                        <Image
                            source={require('./assets/corn.png')}
                            style={[styles.vehicleIcon]}
                        />
                        <Text style={styles.vehicleText}>Corn Harvester</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.vehicleItem}
                        onPress={() => navigation.navigate(ScreensName.BookRental, { vehicleType: 'Rice Harvester' })}
                    >
                        <Image
                            source={require('./assets/rice.png')}
                            style={[styles.vehicleIcon]}
                        />
                        <Text style={styles.vehicleText}>Rice Harvester</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.vehicleItem}
                        onPress={() => navigation.navigate(ScreensName.BookRental, { vehicleType: 'Wheat Harvester' })}
                    >
                        <Image
                            source={require('./assets/wheat.png')}
                            style={[styles.vehicleIcon]}
                        />
                        <Text style={styles.vehicleText}>Wheat Harvester</Text>
                    </TouchableOpacity>

                    

                    
                </View>
            </ScrollView>
        </View>
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
    content: {
        flex: 1,
        padding: wp('4%'),
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.WHITE,
        borderRadius: wp('3%'),
        borderWidth: 1,
        borderColor: colors.LIGHT_GRAY,
        paddingHorizontal: wp('4%'),
        marginBottom: hp('3%'),
    },
    searchInput: {
        flex: 1,
        height: hp('6%'),
        fontSize: wp('4%'),
        fontFamily: fonts.Regular,
        color: colors.BLACK,
    },
    searchIcon: {
        width: wp('5%'),
        height: wp('5%'),
        tintColor: colors.GRAY,
    },
    title: {
        fontSize: wp('6%'),
        fontFamily: fonts.Medium,
        color: colors.BLACK,
        marginBottom: hp('1%'),
    },
    subtitle: {
        fontSize: wp('4%'),
        fontFamily: fonts.Medium,
        color: colors.BLACK,
        marginBottom: hp('3%'),
    },
    vehicleGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: wp('3%'),
    },
    vehicleItem: {
        width: wp('28%'),
        aspectRatio: 1,
        backgroundColor: colors.WHITE,
        borderRadius: wp('3%'),
        padding: wp('3%'),
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    vehicleIcon: {
        width: wp('20%'),
        height: wp('20%'),
        marginBottom: hp('1%'),
        resizeMode: 'contain',
    },
    vehicleText: {
        fontSize: wp('3.5%'),
        fontFamily: fonts.Medium,
        color: colors.BLACK,
        textAlign: 'center',
    },
});

export default Harvester;