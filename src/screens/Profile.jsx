import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import colors from '../../util/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import Logo from '../assets/Icon/Logo.png';
import VectorMen from '../assets/AboutMoreicons/Vectormen.png';
import CustomButton from '../components/CustomButton';
import ScreensName from '../../util/ScreensName';

const AboutMore = () => {
    const [selectedCard, setSelectedCard] = useState('Farmer'); 
    // Default selection is 'Farmer'

    return (
        <SafeAreaView style={styles.MainContainer}>
            <View style={{ flex: 0.74,backgroundColor:colors.WHITE }}>
                {/* Logo Section */}
                <View style={styles.logoContainer}>
                    <Image source={Logo} style={styles.logo} />
                </View>

                {/* Content Section */}
                <View style={styles.contentContainer}>
                    <Text style={styles.headerText}>Tell us more about you</Text>

                    {/* Row of Items */}
                    <View style={{ flexDirection: 'row' }}>
                        {/* Farmer Card */}
                        <TouchableOpacity
                            style={[
                                styles.card,
                                selectedCard === 'Farmer' && { borderColor: colors.GREEN, borderWidth: 2 },
                            ]}
                            onPress={() => setSelectedCard('Farmer')}
                        >
                            <Image source={VectorMen} style={styles.vectorLogo} />
                            <Text style={styles.cardText}>Farmer</Text>
                        </TouchableOpacity>

                        {/* Dealer Card */}
                        <TouchableOpacity
                            style={[
                                styles.card,
                                selectedCard === 'Dealer' && { borderColor: colors.GREEN, borderWidth: 2 },
                            ]}
                            onPress={() => setSelectedCard('Dealer')}
                        >
                            <Image source={VectorMen} style={styles.vectorLogo} />
                            <Text style={styles.cardText}>Vender</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* Footer Section */}
            <View style={{ flex: 0.3, alignItems: 'center' }}>
                <CustomButton BgGiven={colors.GREEN} MainText={"Continue"} txColor={colors.WHITE} isNavigation={true} name={ScreensName.SignUp} />
            </View>
        </SafeAreaView>
    );
};

export default AboutMore;

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        backgroundColor:colors.WHITE,
        marginTop: 40,
    },
    logoContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 10,
    },
    logo: {
        width: 160,
        height: 160,
        resizeMode: 'contain',
    },
    contentContainer: {
        flex: 0.5,
        margin: 5,
    },
    headerText: {
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 10,
    },
    card: {
        flex: 1,
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'gray', 
        borderRadius: 10,
        width: '30%',
        height: '90%', 
    },
    vectorLogo: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
    },
    cardText: {
        marginTop: 5,
        fontSize: 16,
        textAlign: 'center',
    },
});
