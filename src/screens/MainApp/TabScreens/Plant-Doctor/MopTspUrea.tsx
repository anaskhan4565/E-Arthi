import React, { useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Image,
    StatusBar,
} from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import colors from "../../../../../util/Constants/colors.js";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { fonts } from "../../../../../util/Constants/FontName.js";
import Navbar from "../../Navbar/Navbar.jsx";

const MopTspUrea = () => {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="white" barStyle="dark-content" />
            
            <View style={styles.navbarContainer}>
                <Navbar gobackOnly={true} />
            </View>
            
            
            <View style={styles.searchContainer}>
                <View style={styles.searchInputContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search in here"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    <TouchableOpacity style={styles.searchIcon}>
                        <Ionicons name="search" size={wp("5%")} color="#888" />
                    </TouchableOpacity>
                </View>
            </View>
            
            <ScrollView style={styles.contentContainer}>
                <Text style={styles.title}>MOP/TSP/Urea</Text>
                
                <View style={styles.instructionSection}>
                    <View style={styles.instructionHeader}>
                        <Image 
                            source={require('./AssetsPlantDr/Treatment/image.png')} 
                            style={styles.instructionIcon}
                        />
                        <Text style={styles.instructionTitle}>Application Instructions</Text>
                    </View>
                    
                    <Text style={styles.instructionSubtitle}>
                        Fertilization for one year
                    </Text>
                    
                    <View style={styles.horizontalLine} />
                    
                    <Text style={styles.instructionText}>
                        Apply the following amounts:
                    </Text>
                    
                    <View style={styles.amountsContainer}>
                        <View style={styles.amountItem}>
                            <Text style={styles.amountTitle}>MOP: 4.5kg</Text>
                            <Text style={styles.amountSubtitle}>(1/4 bag)</Text>
                        </View>
                        
                        <View style={styles.amountItem}>
                            <Text style={styles.amountTitle}>TSP: 1.8kg</Text>
                            <Text style={styles.amountSubtitle}>(1/4 bag)</Text>
                        </View>
                        
                        <View style={styles.amountItem}>
                            <Text style={styles.amountTitle}>Urea: 3kg</Text>
                            <Text style={styles.amountSubtitle}>(3/4 bag)</Text>
                        </View>
                    </View>
                </View>
                
                <View style={styles.instructionDetailsContainer}>
                    <Text style={styles.instructionDetailsText}>
                        1. Apply fertilizer in a ring around the tree trunk, about 30cm from the base.
                    </Text>
                    <Text style={styles.instructionDetailsText}>
                        2. Divide the total fertilizer into 3 applications per year.
                    </Text>
                    <Text style={styles.instructionDetailsText}>
                        3. First application: at the beginning of the rainy season.
                    </Text>
                    <Text style={styles.instructionDetailsText}>
                        4. Second application: middle of the rainy season.
                    </Text>
                    <Text style={styles.instructionDetailsText}>
                        5. Third application: end of the rainy season.
                    </Text>
                    <Text style={styles.instructionDetailsText}>
                        6. Lightly incorporate the fertilizer into the soil and water well after application.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default MopTspUrea;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITE,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: wp('4%'),
        paddingVertical: hp('1.5%'),
        backgroundColor: colors.WHITE,
    },
    navbarContainer: {
        height: hp("8.2%"),
        backgroundColor: "white",
        marginTop: hp("0.14%"),
    },
    profileIcon: {
        width: wp('10%'),
        height: wp('10%'),
        borderRadius: wp('5%'),
        overflow: 'hidden',
    },
    profileImage: {
        width: '100%',
        height: '100%',
    },
    logo: {
        width: wp('10%'),
        height: hp('5%'),
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    bellIcon: {
        marginRight: wp('4%'),
    },
    searchContainer: {
        paddingHorizontal: wp('4%'),
        paddingVertical: hp('1%'),
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    searchInputContainer: {
        flexDirection: 'row',
        backgroundColor: '#F5F5F5',
        borderRadius: wp('2%'),
        alignItems: 'center',
    },
    searchInput: {
        flex: 1,
        paddingVertical: hp('1%'),
        paddingHorizontal: wp('3%'),
        fontSize: wp('3.5%'),
    },
    searchIcon: {
        padding: wp('2%'),
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: wp('5%'),
        paddingTop: hp('2%'),
    },
    title: {
        fontSize: wp('5.3%'),
        color: '#000',
        fontFamily: fonts.Bold,
        marginBottom: hp('2%'),
    },
    instructionSection: {
        backgroundColor: colors.LIGHT_GREEN,
        borderRadius: wp('2%'),
        padding: wp('4%'),
        marginBottom: hp('2%'),
        shadowColor: colors.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    instructionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp('1%'),
    },
    instructionIcon: {
        width: wp('6%'),
        height: wp('6%'),
        marginRight: wp('2%'),
    },
    instructionTitle: {
        fontSize: wp('4.5%'),
        color: '#000',
        fontFamily: fonts.Bold,
    },
    instructionSubtitle: {
        fontSize: wp('3.5%'),
        color: '#555',
        fontFamily: fonts.Regular,
        marginLeft: wp('8%'),
        marginBottom: hp('1%'),
    },
    horizontalLine: {
        height: 1,
        backgroundColor: '#E0E0E0',
        marginVertical: hp('1%'),
    },
    instructionText: {
        fontSize: wp('3.8%'),
        color: '#333',
        marginBottom: hp('1%'),
        fontFamily: fonts.Regular,
    },
    amountsContainer: {
        marginTop: hp('1%'),
    },
    amountItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp('1%'),
    },
    amountTitle: {
        fontSize: wp('3.8%'),
        fontFamily: fonts.Regular,
        fontWeight: 'bold',
        color: '#333',
    },
    amountSubtitle: {
        fontSize: wp('3.5%'),
        fontFamily: fonts.Regular,
        color: '#666',
        marginLeft: wp('2%'),
    },
    instructionDetailsContainer: {
        backgroundColor: colors.LIGHT_GREEN,
        borderRadius: wp('2%'),
        padding: wp('4%'),
        marginBottom: hp('3%'),
        shadowColor: colors.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    instructionDetailsText: {
        fontSize: wp('3.5%'),
        color: '#333',
        fontFamily: fonts.Regular,
        marginBottom: hp('1%'),
        lineHeight: hp('2.5%'),
    },
}); 