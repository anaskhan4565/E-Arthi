import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Navbar from '../../Navbar/Navbar';
import CustomSearchApp from '../../CustomComponent/CustomSearchApp';
import colors from '../../../../../util/Constants/colors';
import { fonts } from '../../../../../util/Constants/FontName';

const PestsAndDiseasesAlert = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navbarContainer}>
                <Navbar gobackOnly={true} />
            </View>
            <View style={styles.searchContainer}>
                    <CustomSearchApp
                        placeholder={"Search in here"}
                    />
                </View>

            <ScrollView style={styles.contentContainer}>
                <Text style={styles.pageTitle}>Pests and Diseases Alert</Text>

                <View style={styles.alertItem}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={require('./AssetsPlantDr/PestsAlerts/index.png')}
                            style={styles.itemImage}
                        />
                    </View>
                    <View style={styles.alertContent}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.alertTitle}>Field Scouting</Text>
                            <View style={styles.preventionTag}>
                                <Text style={styles.preventionTagText}>Prevention</Text>
                            </View>
                        </View>
                        <Text style={styles.alertDescription}>
                            Inspect your crops regularly to detect pests and take control measures on time
                        </Text>
                    </View>
                </View>

                <View style={styles.divider} />

                <Text style={styles.sectionTitle}>Explore guides for pest scouting</Text>
                <Text style={styles.sectionDescription}>
                    Learn essential tips and tricks for scouting pests in your fields. Early identification is key to preventing damage and maintaining crop health.
                </Text>

                <View style={styles.guideItem}>
                    <View style={styles.guideImageContainer}>
                        <Image
                            source={require('./AssetsPlantDr/PestsAlerts/index.png')}
                            style={styles.guideImage}
                        />
                    </View>
                    <View style={styles.guideContent}>
                        <Text style={styles.guideTitle}>Pink bollworm and Helicoverpa bollworm</Text>
                        <Text style={styles.guideCrop}>cotton</Text>
                    </View>
                </View>

                <View style={styles.guideItem}>
                    <View style={styles.guideImageContainer}>
                        <Image
                            source={require('./AssetsPlantDr/PestsAlerts/index.png')}
                            style={styles.guideImage}
                        />
                    </View>
                    <View style={styles.guideContent}>
                        <Text style={styles.guideTitle}>Pink bollworm and Helicoverpa bollworm</Text>
                        <Text style={styles.guideCrop}>cotton</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: wp(4),
        backgroundColor: '#f2f9f9',
    },
     searchContainer: {
        marginVertical: hp("3.2%"),
        height: hp("2%"),
        marginLeft: hp(1),
        marginBottom: hp("4%"),

    },
    profileContainer: {
        width: wp(10),
        height: wp(10),
        borderRadius: wp(5),
        overflow: 'hidden',
    },
    profileImage: {
        width: '100%',
        height: '100%',
    },
    logo: {
        width: wp(12),
        height: wp(8),
        resizeMode: 'contain',
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(4),
    },
    icon: {
        width: wp(6),
        height: wp(6),
        resizeMode: 'contain',
    },

    searchInput: {
        flex: 1,
        height: hp(5),
        fontSize: wp(3.5),
        color: '#333',
    },
    searchIcon: {
        padding: wp(2),
    },
    searchIconImage: {
        width: wp(5),
        height: wp(5),
        resizeMode: 'contain',
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: wp(4),
    },
    pageTitle: {
        fontSize: wp(5),
        fontWeight: 'bold',
        color: '#000',
        marginVertical: hp(2),
    },
    alertItem: {
        flexDirection: 'row',
        backgroundColor: '#f0f0f0',
        borderRadius: wp(2),
        overflow: 'hidden',
        marginBottom: hp(2),
    },
    imageContainer: {
        width: wp(20),
        height: wp(20),
    },
    itemImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    alertContent: {
        flex: 1,
        padding: wp(3),
        backgroundColor:colors.LIGHT_GREEN
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: hp(0.5),
    },
    alertTitle: {
        fontSize: wp(3.8),
        fontFamily:fonts.Bold,
        color: '#000',
        
    },
    preventionTag: {
        backgroundColor: '#9c27b0',
        paddingHorizontal: wp(2),
        paddingVertical: hp(0.3),
        borderRadius: wp(3),
    },
    preventionTagText: {
        color: '#fff',
        fontSize: wp(2.8),
        fontFamily:fonts.Regular

    },
    alertDescription: {
        fontSize: wp(3.2),
        color: '#333',
        lineHeight: hp(2.2),
        fontFamily:fonts.Regular
    },
    navbarContainer: {
        height: hp("8.2%"),
        backgroundColor: "white",
        marginTop: hp("0.14%"),
    },
    divider: {
        height: 1,
        backgroundColor: colors.GREEN,
        marginVertical: hp(2),
    },
    sectionTitle: {
        fontSize: wp(4),
        fontFamily:fonts.Bold,
        color: '#000',
        marginBottom: hp(1),
    },
    sectionDescription: {
        fontSize: wp(3.2),
        color: '#333',
        lineHeight: hp(2.2),
        marginBottom: hp(2),
    },
    guideItem: {
        flexDirection: 'row',
        marginBottom: hp(2),
        borderRadius: wp(2),
        backgroundColor: colors.LIGHT_GREEN,
        overflow: 'hidden',
    },
    guideImageContainer: {
        width: wp(20),
        height: wp(20),
    },
    guideImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    guideContent: {
        flex: 1,
        padding: wp(3),
        justifyContent: 'center',
    },
    guideTitle: {
        fontSize: wp(3.5),
        fontFamily:fonts.Bold,
        color: '#000',
        marginBottom: hp(0.5),
    },
    guideCrop: {
        fontSize: wp(3),
        color: '#666',
        fontFamily:fonts.Regular
    },
});

export default PestsAndDiseasesAlert;