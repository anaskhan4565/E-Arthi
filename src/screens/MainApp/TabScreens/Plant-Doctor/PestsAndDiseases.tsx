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
import CustomSearchApp from "../../CustomComponent/CustomSearchApp.jsx";
import { SearchBar } from "react-native-screens";

const PestsAndDiseases = () => {
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
                <Text style={styles.title}>Pests and Diseases</Text>

                <Text style={styles.subtitle}>
                    All pests and diseases that might appear in your crop at different stages
                </Text>

                <TouchableOpacity style={styles.categorySelector}>
                    <Text style={styles.categorySelectorText}>Browse by crop</Text>
                    <Text style={styles.categorySelectorText}>Browse by stage</Text>
                </TouchableOpacity>

               <View style={{flexDirection: 'row',flexWrap: 'wrap',justifyContent: 'space-between'}}>
                <TouchableOpacity style={styles.pestContainer}>
                    <View style={styles.pestRow}>
                        <View style={styles.pestNameContainer}>
                            <Text style={styles.pestName}>Aphids</Text>
                            <View style={[styles.pestTypeTag, { backgroundColor: '#FFB800' }]}>
                                <Text style={styles.pestTypeText}>Moderate Risk</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.pestDetailsRow}>
                        <Text style={styles.pestDetailsLabel}>Insect</Text>
                        <Text style={styles.pestDetailsText}>
                            Found in: apple, grape, bean, capsicum
                        </Text>
                    </View>
                </TouchableOpacity>

                {/* Sooty Mold */}
                <TouchableOpacity style={styles.pestContainer}>
                    <View style={styles.pestRow}>
                        <View style={styles.pestNameContainer}>
                            <Text style={styles.pestName}>Sooty Mold</Text>
                            <View style={[styles.pestTypeTag, { backgroundColor: '#4285F4' }]}>
                                <Text style={styles.pestTypeText}>Moderate Risk</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.pestDetailsRow}>
                        <Text style={styles.pestDetailsLabel}>Fungus</Text>
                        <Text style={styles.pestDetailsText}>
                            Found in: apple, grape, cucumber
                        </Text>
                    </View>
                </TouchableOpacity>

                {/* Thrips */}
                <TouchableOpacity style={styles.pestContainer}>
                    <View style={styles.pestRow}>
                        <View style={styles.pestNameContainer}>
                            <Text style={styles.pestName}>Thrips</Text>
                            <View style={[styles.pestTypeTag, { backgroundColor: '#00C851' }]}>
                                <Text style={styles.pestTypeText}>Moderate Risk</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.pestDetailsRow}>
                        <Text style={styles.pestDetailsLabel}>Insect</Text>
                        <Text style={styles.pestDetailsText}>
                            Found in: apple, grape, bean
                        </Text>
                    </View>
                </TouchableOpacity>

                {/* Nematodes */}
                <TouchableOpacity style={styles.pestContainer}>
                    <View style={styles.pestRow}>
                        <View style={styles.pestNameContainer}>
                            <Text style={styles.pestName}>Nematodes</Text>
                            <View style={[styles.pestTypeTag, { backgroundColor: '#FF5252' }]}>
                                <Text style={styles.pestTypeText}>High Risk</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.pestDetailsRow}>
                        <Text style={styles.pestDetailsLabel}>Other</Text>
                        <Text style={styles.pestDetailsText}>
                            Found in: grape, capsicum, cucumber
                        </Text>
                    </View>
                </TouchableOpacity>

                {/* Sunburn */}
                <TouchableOpacity style={styles.pestContainer}>
                    <View style={styles.pestRow}>
                        <View style={styles.pestNameContainer}>
                            <Text style={styles.pestName}>Sunburn</Text>
                            <View style={[styles.pestTypeTag, { backgroundColor: '#AA66CC' }]}>
                                <Text style={styles.pestTypeText}>Moderate Risk</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.pestDetailsRow}>
                        <Text style={styles.pestDetailsLabel}>Other</Text>
                        <Text style={styles.pestDetailsText}>
                            Found in: banana, apple, grape
                        </Text>
                    </View>
                </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default PestsAndDiseases;

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
    profileIcon: {
        width: wp('10%'),
        height: wp('10%'),
        borderRadius: wp('5%'),
        overflow: 'hidden',
    },
    navbarContainer: {
        height: hp("8.2%"),
        backgroundColor: "white",
        marginTop: hp("0.14%"),
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
        fontSize: wp('5%'),
        fontWeight: 'bold',
        color: '#000',
        marginBottom: hp('1%'),
    },
    subtitle: {
        fontSize: wp('3.5%'),
        color: '#555',
        marginBottom: hp('2%'),
    },
    categorySelector: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#F5F5F5',
        borderRadius: wp('2%'),
        paddingVertical: hp('1.5%'),
        marginBottom: hp('2%'),
    },
    categorySelectorText: {
        fontSize: wp('3.5%'),
        color: '#333',
    },
    pestContainer: {
        width: wp('54%'),
        backgroundColor: colors.LIGHT_GREEN,
        borderRadius: wp('2%'),
        padding: wp('3%'),
        shadowColor: colors.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginBottom: hp('1.5%'),
    },
    pestRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: hp('0.5%'),
    },
    pestNameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: wp('48%'),
    },
    pestName: {
        fontSize: wp('4%'),
        fontWeight: 'bold',
        color: '#000',
        marginRight: wp('2%'),
    },
    pestTypeTag: {
        paddingHorizontal: wp('2%'),
        paddingVertical: hp('0.3%'),
        borderRadius: wp('1%'),
        marginLeft: wp('2%'),
    },
    pestTypeText: {
        fontSize: wp('3%'),
        color: colors.WHITE,
        fontFamily: fonts.Regular,
    },
    pestDetailsRow: {
        marginTop: hp('0.5%'),
    },
    pestDetailsLabel: {
        fontSize: wp('3.5%'),
        color: '#666',
        marginBottom: hp('0.3%'),
    },
    pestDetailsText: {
        fontSize: wp('3.2%'),
        color: '#333',
    },
}); 