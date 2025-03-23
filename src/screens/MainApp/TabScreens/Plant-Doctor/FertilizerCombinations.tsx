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
import ScreensName from "../../../../../util/Constants/ScreensName.ts";
import { useNavigation } from "@react-navigation/native";

const FertilizerCombinations = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigation = useNavigation();

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
                <Text style={styles.title}>Fertilizer Combinations</Text>

                <Text style={styles.subtitle}>
                    Choose your preferred fertilizer combination (recommended amount for one year):
                </Text>

                {/* MOP/TSP/Urea Combination */}
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                    <TouchableOpacity style={styles.fertilizeOptionContainer}>
                        <Text style={styles.optionTitle}>MOP/TSP/Urea</Text>
                        <View style={styles.optionRow}>
                            <View style={styles.optionItem}>
                                <Text style={styles.optionItemLabel}>MOP: 4.5kg</Text>
                                <Text style={styles.optionItemSubLabel}>(1/4 bag)</Text>
                            </View>
                        </View>
                        <View style={styles.optionRow}>
                            <View style={styles.optionItem}>
                                <Text style={styles.optionItemLabel}>TSP: 1.8kg</Text>
                                <Text style={styles.optionItemSubLabel}>(1/4 bag)</Text>
                            </View>
                        </View>
                        <View style={styles.optionRow}>
                            <View style={styles.optionItem}>
                                <Text style={styles.optionItemLabel}>Urea: 3kg</Text>
                                <Text style={styles.optionItemSubLabel}>(1/4 bag)</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    {/* 10-26-26/TSP/Urea Combination */}
                    <TouchableOpacity style={styles.fertilizeOptionContainer} onPress={()=>{navigation.navigate(ScreensName.MOPTSP)}}>
                        <Text style={styles.optionTitle}>10-26-26/TSP/Urea</Text>
                        <View style={styles.optionRow}>
                            <View style={styles.optionItem}>
                                <Text style={styles.optionItemLabel}>10-26-26: 1kg</Text>
                                <Text style={styles.optionItemSubLabel}>(1/4 bag)</Text>
                            </View>
                        </View>
                        <View style={styles.optionRow}>
                            <View style={styles.optionItem}>
                                <Text style={styles.optionItemLabel}>TSP: 1.8kg</Text>
                                <Text style={styles.optionItemSubLabel}>(1/4 bag)</Text>
                            </View>
                        </View>
                        <View style={styles.optionRow}>
                            <View style={styles.optionItem}>
                                <Text style={styles.optionItemLabel}>Urea: 2kg</Text>
                                <Text style={styles.optionItemSubLabel}>(1/2 bag)</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    {/* DAP/MOP/Urea Combination */}
                    <TouchableOpacity style={styles.fertilizeOptionContainer}>
                        <Text style={styles.optionTitle}>DAP/MOP/Urea</Text>
                        <View style={styles.optionRow}>
                            <View style={styles.optionItem}>
                                <Text style={styles.optionItemLabel}>DAP: 1.8kg</Text>
                                <Text style={styles.optionItemSubLabel}>(1/4 bag)</Text>
                            </View>
                        </View>
                        <View style={styles.optionRow}>
                            <View style={styles.optionItem}>
                                <Text style={styles.optionItemLabel}>MOP: 4.5kg</Text>
                                <Text style={styles.optionItemSubLabel}>(1/4 bag)</Text>
                            </View>
                        </View>
                        <View style={styles.optionRow}>
                            <View style={styles.optionItem}>
                                <Text style={styles.optionItemLabel}>Urea: 2.7kg</Text>
                                <Text style={styles.optionItemSubLabel}>(1/2 bag)</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default FertilizerCombinations;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITE,
    },
    navbarContainer: {
        height: hp("8.2%"),
        backgroundColor: "white",
        marginTop: hp("0.14%"),
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
    fertilizeOptionContainer: {
        backgroundColor: colors.LIGHT_GREEN,
        borderRadius: wp('2%'),
        padding: wp('3%'),
        shadowColor: colors.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginBottom: hp('2%'),
    },
    optionTitle: {
        fontSize: wp('4%'),
        fontWeight: 'bold',
        color: '#000',
        marginBottom: hp('1%'),
    },
    optionRow: {
        flexDirection: 'row',
        marginBottom: hp('0.5%'),
    },
    optionItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    optionItemLabel: {
        fontSize: wp('3.5%'),
        color: '#333',
    },
    optionItemSubLabel: {
        fontSize: wp('3.5%'),
        color: '#666',
        marginLeft: wp('1%'),
    },
});