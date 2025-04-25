import React from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image
} from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import colors from "../../../../../util/Constants/colors.js";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import Navbar from "../../Navbar/Navbar.jsx";
import ScreensName from "../../../../../util/Constants/ScreensName.ts";
import { useNavigation } from "@react-navigation/native";
import { MMKV } from "react-native-mmkv";
const Treatment = () => {
    const navigation = useNavigation();
    const PlantDiagnosisData = new MMKV();
    
    // Get diagnosis data from MMKV
    const diagnosisName = PlantDiagnosisData.getString("Diagnosis");
    const imageUri = PlantDiagnosisData.getString("DiagnosisImage");
    const pathogenClass = PlantDiagnosisData.getString("PathogenClass");

    // Define the insecticides list
    const insecticides = [
        {
            name: "PlantCare Plus",
            manufacturer: "Terminix Pakistan",
            type: "Insecticide",
            id: 74
        },
        {
            name: "Syngenta Actara Insecticide (24 gm)",
            manufacturer: "Syngenta",
            type: "Insecticide",
            id: 46
        },
        {
            name: "Moveto 240",
            manufacturer: "Bayer",
            type: "Insecticide",
            id: 76
        }
    ];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navbarContainer}>
                <Navbar gobackOnly={true} /> 
            </View>
            <ScrollView style={styles.contentContainer}>
                {/* Title */}
                <Text style={styles.title}>Treatment</Text>

                {/* Pest Info Row */}
                <View style={styles.pestInfoContainer}>
                    {imageUri ? (
                        <Image
                            source={{ uri: imageUri }}
                            style={styles.pestImage}
                            resizeMode="cover"
                        />
                    ) : (
                        <View style={styles.imagePlaceholder}>
                            <Icon name="image-off" size={wp('8%')} color={colors.GRAY} />
                        </View>
                    )}
                    <View style={styles.pestNameContainer}>
                        <Text style={styles.pestName}>{diagnosisName || "Unknown Condition"}</Text>
                    </View>
                    <TouchableOpacity style={styles.insectButton}>
                        <Text style={styles.insectButtonText}>{pathogenClass || "Unknown"}</Text>
                    </TouchableOpacity>
                </View>

                {/* Recommended Products Section */}
                <Text style={styles.sectionTitle}>Recommended Products:</Text>
                <View style={styles.warningContainer}>
                    <Text style={styles.warningText}>Select and apply only one of these products to your crop.</Text>
                </View>

                {/* Product List */}
                {insecticides.map((insecticide, index) => (
                    <TouchableOpacity 
                        key={index} 
                        style={styles.productItem} 
                        onPress={() => {
                            PlantDiagnosisData.set("SelectedProduct", JSON.stringify(insecticide));
                            navigation.navigate(ScreensName.TreatmentProductDescription as any);
                        }}
                    >
                        <View style={styles.productIconContainer}>
                            <Image source={require('./AssetsPlantDr/Treatment/image.png')} style={styles.productIcon} />
                        </View>
                        <View style={styles.productInfo}>
                            <Text style={styles.productType}>{insecticide.type}</Text>
                            <Text style={styles.productName}>{insecticide.name} by {insecticide.manufacturer}</Text>
                        </View>
                        <Image source={require('./AssetsPlantDr/Treatment/Arrow.png')} style={styles.arrowIcon} />
                    </TouchableOpacity>
                ))}

                    {/* Seeds and Fertilizers Button */}
                    <View style={styles.seedsFertilizerButtonContainer}>
                    <TouchableOpacity 
                        style={styles.seedsFertilizerButton}
                        onPress={() => navigation.navigate(ScreensName.SeedsFertilizers as any)}
                    >
                        <View style={styles.buttonContent}>
                            <Text style={styles.seedsFertilizerButtonText}>Buy Plant Seeds and Fertilizers</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Treatment;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITE,
    },
    seedsFertilizerButtonContainer: {
        marginVertical: hp('3%'),
    },
    seedsFertilizerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.GREEN,
        padding: wp('4%'),
        borderRadius: wp('2%'),
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center',
        alignSelf:'center',
        textAlign:'center',
    },
    buttonIcon: {
        marginRight: wp('2%'),
    },
    seedsFertilizerButtonText: {
        color: colors.WHITE,
        alignSelf:'center',
        textAlign:'center',
        justifyContent:'center',
        alignItems:'center',
        fontSize: wp('4%'),
        fontWeight: 'bold',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: wp('4%'),
        paddingVertical: hp('1.5%'),
        backgroundColor: '#F5F5F5',
    },
    arrowIcon:{
        width: wp('3%'),
        height: wp('3%'),
        resizeMode:'contain'
    },
    productIcon:{
        width: wp('13%'),
        height: wp('13%'),
        resizeMode:'contain'
    },
    navbarContainer: {
        height: hp("8.2%"),
        backgroundColor: "white",
        marginTop: hp("0.14%"),
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
    contentContainer: {
        flex: 1,
        paddingHorizontal: wp('5%'),
    },
    title: {
        fontSize: wp('5.5%'),
        fontWeight: 'bold',
        marginTop: hp('2%'),
        marginBottom: hp('2%'),
        color: '#000',
    },
    pestInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp('3%'),
    },
    pestImage: {
        width: wp('17%'),
        height: wp('17%'),
        borderRadius: wp('2%'),
        marginRight: wp('3%'),
        backgroundColor: colors.LIGHT_GRAY,
    },
    pestNameContainer: {
        flex: 1,
    },
    pestName: {
        fontSize: wp('4.5%'),
        fontWeight: 'bold',
        color: '#000',
    },
    insectButton: {
        backgroundColor: '#2196F3',
        paddingVertical: hp('0.8%'),
        paddingHorizontal: wp('4%'),
        borderRadius: wp('4%'),
    },
    insectButtonText: {
        color: colors.WHITE,
        fontSize: wp('3.5%'),
        fontWeight: '500',
    },
    sectionTitle: {
        fontSize: wp('4.5%'),
        fontWeight: 'bold',
        marginBottom: hp('1%'),
        color: '#000',
    },
    warningContainer: {
        backgroundColor: '#FFEDEB',
        borderRadius: wp('2%'),
        padding: wp('3%'),
        marginBottom: hp('2%'),
    },
    warningText: {
        fontSize: wp('3.5%'),
        color: '#333',
    },
    productItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3FFFC',
        padding: wp('3%'),
        marginBottom: hp('1.5%'),
        borderRadius: wp('2%'),
    },
    productIconContainer: {
        marginRight: wp('3%'),
    },
    productInfo: {
        flex: 1,
    },
    productType: {
        fontSize: wp('3.5%'),
        color: '#666',
    },
    productName: {
        fontSize: wp('4%'),
        fontWeight: '500',
        color: '#000',
    },
    imagePlaceholder: {
        width: wp('17%'),
        height: wp('17%'),
        borderRadius: wp('2%'),
        marginRight: wp('3%'),
        backgroundColor: colors.LIGHT_GRAY,
        justifyContent: 'center',
        alignItems: 'center',
    },
});