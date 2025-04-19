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
    BookRental: { vehicleType: string };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'BookRental'>;

const Tractor = () => {
    const navigation = useNavigation<NavigationProp>();

    return (
        <View style={styles.container}>
            <View style={styles.navbarContainer}>
                <Navbar gobackOnly={false} />
            </View>

            <ScrollView style={styles.content}>
                {/* Search Bar */}
                

                <Text style={styles.title}>E-Rentals</Text>
                <Text style={styles.subtitle}>Choose the attachment for the tractor</Text>

                {/* Vehicle Grid */}
                <View style={styles.vehicleGrid}>
                    <TouchableOpacity 
                        style={styles.vehicleItem}
                        onPress={() => navigation.navigate(ScreensName.BookRental, { vehicleType: 'Chisel Plough' })}
                    >
                        <Image
                            source={require('./assets/chisel.png')}
                            style={[styles.vehicleIcon]}
                        />
                        <Text style={styles.vehicleText}>Chisel Plough</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.vehicleItem}
                        onPress={() => navigation.navigate(ScreensName.BookRental, { vehicleType: 'Disc Plough' })}
                    >
                        <Image
                            source={require('./assets/discPlough.png')}
                            style={[styles.vehicleIcon]}
                        />
                        <Text style={styles.vehicleText}>Disc Plough</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.vehicleItem}
                        onPress={() => navigation.navigate(ScreensName.BookRental, { vehicleType: 'Tine Tillers' })}
                    >
                        <Image
                            source={require('./assets/tillers.png')}
                            style={[styles.vehicleIcon]}
                        />
                        <Text style={styles.vehicleText}>Tine Tillers</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.vehicleItem}
                        onPress={() => navigation.navigate(ScreensName.BookRental, { vehicleType: 'Folding Tillers' })}
                    >
                        <Image
                            source={require('./assets/Foldingtillers.png')}
                            style={[styles.vehicleIcon]}
                        />
                        <Text style={styles.vehicleText}>Folding Tillers</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.vehicleItem}
                        onPress={() => navigation.navigate(ScreensName.BookRental, { vehicleType: 'Offset Disc Harrows' })}
                    >
                        <Image
                            source={require('./assets/harrows.png')}
                            style={[styles.vehicleIcon]}
                        />
                        <Text style={styles.vehicleText}>Offset Disc Harrows</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.vehicleItem}
                        onPress={() => navigation.navigate(ScreensName.BookRental, { vehicleType: 'Rotavator' })}
                    >
                        <Image
                            source={require('./assets/rotavator.png')}
                            style={[styles.vehicleIcon]}
                        />
                        <Text style={styles.vehicleText}>Rotavator</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.vehicleItem}
                        onPress={() => navigation.navigate(ScreensName.BookRental, { vehicleType: 'Ridger' })}
                    >
                        <Image
                            source={require('./assets/ridger.png')}
                            style={[styles.vehicleIcon]}
                        />
                        <Text style={styles.vehicleText}>Ridger</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.vehicleItem}
                        onPress={() => navigation.navigate(ScreensName.BookRental, { vehicleType: 'Post Hole Digger' })}
                    >
                        <Image
                            source={require('./assets/digger.png')}
                            style={[styles.vehicleIcon]}
                        />
                        <Text style={styles.vehicleText}>Post Hole Digger</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.vehicleItem}
                        onPress={() => navigation.navigate(ScreensName.BookRental, { vehicleType: 'Front Blades' })}
                    >
                        <Image
                            source={require('./assets/Bulldozer.png')}
                            style={[styles.vehicleIcon]}
                        />
                        <Text style={styles.vehicleText}>Front Blades</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.vehicleItem}
                        onPress={() => navigation.navigate(ScreensName.BookRental, { vehicleType: 'Hydralic Tipping Trailer' })}
                    >
                        <Image
                            source={require('./assets/trailer.png')}
                            style={[styles.vehicleIcon]}
                        />
                        <Text style={styles.vehicleText}>Hydralic Tipping Trailer</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.vehicleItem}
                        onPress={() => navigation.navigate(ScreensName.BookRental, { vehicleType: 'Lawn Mower' })}
                    >
                        <Image
                            source={require('./assets/mower.png')}
                            style={[styles.vehicleIcon]}
                        />
                        <Text style={styles.vehicleText}>Lawn Mower</Text>
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
        marginBottom: hp('20%'),
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

export default Tractor;