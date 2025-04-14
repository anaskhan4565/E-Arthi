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
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Navbar from '../../Navbar/Navbar';
import colors from '../../../../../util/Constants/colors';

const AgriServices = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Navbar gobackOnly={true} />
            </View>

            <View style={styles.content}>
                <Text style={styles.title}>Agri Services</Text>

                <View style={styles.servicesContainer}>
                    <View style={styles.row}>
                        <TouchableOpacity style={styles.serviceCard}>
                            <View style={styles.iconContainer}>
                                <Image 
                                    source={require('./Images/Services/1.png')}
                                    style={styles.icon}
                                />
                            </View>
                            <Text style={styles.serviceName}>Diagnostics</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.serviceCard}>
                            <View style={styles.iconContainer}>
                                <Image 
                                    source={require('./Images/Services/2.png')}
                                    style={styles.icon}
                                />
                            </View>
                            <Text style={styles.serviceName}>Soil Testing</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.row}>
                        <TouchableOpacity style={styles.serviceCard}>
                            <View style={styles.iconContainer}>
                                <Image 
                                    source={require('./Images/Services/3.png')}
                                    style={styles.icon}
                                />
                            </View>
                            <Text style={styles.serviceName}>Packaging</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.serviceCard}>
                            <View style={styles.iconContainer}>
                                <Image 
                                    source={require('./Images/Services/4.png')}
                                    style={styles.icon}
                                />
                            </View>
                            <Text style={styles.serviceName}>Grading</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
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
        marginBottom: hp('3%'),
        color: colors.BLACK,
    },
    servicesContainer: {
        width: '100%',
        flexDirection: 'column',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: hp('3%'),
    },
    serviceCard: {
        width: wp('42%'),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.WHITE,
        borderRadius: wp('3%'),
        padding: wp('4%'),
        elevation: 2,
        shadowColor: colors.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    iconContainer: {
        width: wp('20%'),
        height: wp('20%'),
        borderRadius: wp('2.5%'),
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: hp('1%'),
    },
    icon: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    serviceName: {
        fontSize: wp('3.8%'),
        fontWeight: '500',
        color: colors.BLACK,
        textAlign: 'center',
    }
});

export default AgriServices; 