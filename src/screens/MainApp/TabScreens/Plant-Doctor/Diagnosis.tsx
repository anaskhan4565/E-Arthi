import React from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
} from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import colors from "../../../../../util/Constants/colors.js";
import Navbar from "../../Navbar/Navbar.jsx";
import { useTranslation } from "react-i18next";
import { fonts } from "../../../../../util/Constants/FontName.js";
import ScreensName from "../../../../../util/Constants/ScreensName.ts";
import { useNavigation, useRoute } from "@react-navigation/native";

const Diagnosis = () => {
    const { t } = useTranslation();
    const navigation = useNavigation();
    const route = useRoute();
    const imageUri = route.params?.imageUri;
    console.log(imageUri);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navbarContainer}>
                <Navbar gobackOnly={true} />
            </View>
            <ScrollView style={styles.scrollView}>
                <Text style={styles.title}>Diagnosis</Text>

                <View style={styles.diagnosisContainer}>
                    <Text style={styles.diagnosisTitle}>Fall Armyworm</Text>
                    <TouchableOpacity style={styles.insectButton}>
                        <Text style={styles.insectButtonText}>Insect</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.imageContainer}>
                   <Image source={{ uri: imageUri }} style={styles.image} />
                </View>

                <View style={styles.symptomsContainer}>
                    <Text style={styles.symptomsTitle}>Symptoms:</Text>
                    <Text style={styles.symptomsText}>
                        1. Feeding damage on all plant parts{"\n"}
                        2. Frass can be found on leaves{"\n"}
                        3. Caterpillar has a Y-like pattern on the forehead and 4 dots on the back{"\n\n"}
                        The larvae of the fall armyworm cause damage by feeding on all plant parts. Young larvae initially eat one side of the surface of the leaf tissue, leaving the opposite layer intact.
                    </Text>
                </View>

                <View style={styles.moreInfoContainer}>
                    <Text style={styles.moreInfoTitle}>More Info:</Text>
                    <Text style={styles.moreInfoText}>
                        Scientific Name: <Text style={styles.boldText}>Spodoptera Frugiperda</Text>{"\n"}
                        Also found in: Bean, Capsicum, Cucumber, Tomato, Cabbage, Lettuce
                    </Text>
                </View>

                <TouchableOpacity style={styles.confirmButton} onPress={() => navigation.navigate(ScreensName.Treatment)}>
                    <Text style={styles.confirmButtonText}>Confirm and See Treatment</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

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
    image: {
        width: wp('70%'),
        height: hp('25%'),
    },
    scrollView: {
        paddingHorizontal: wp('4%'),
    },
    title: {
        fontSize: hp('2.5%'),
        fontFamily: fonts.SemiBold,
        marginVertical: hp('2%'),
    },
    diagnosisContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: hp('2%'),
    },
    diagnosisTitle: {
        fontSize: hp('2.2%'),
        fontFamily: fonts.SemiBold,
    },
    insectButton: {
        backgroundColor: colors.OLD_MILL_BLUE,
        paddingHorizontal: wp('3%'),
        paddingVertical: hp('0.5%'),
        borderRadius: hp('1%'),
    },
    insectButtonText: {
        color: colors.WHITE,
        fontSize: hp('1.6%'),
        fontFamily: fonts.Medium,
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: hp('2%'),
    },
    imagePlaceholder: {
        width: wp('80%'),
        height: hp('20%'),
        backgroundColor: colors.LIGHT_GRAY,
    },
    symptomsContainer: {
        backgroundColor: colors.LIGHT_GREEN,
        padding: wp('4%'),
        borderRadius: hp('1%'),
        marginBottom: hp('2%'),
    },
    symptomsTitle: {
        fontSize: hp('2%'),
        fontFamily: fonts.SemiBold,
        marginBottom: hp('1%'),
    },
    symptomsText: {
        fontSize: hp('1.8%'),
        fontFamily: fonts.Regular,
    },
    moreInfoContainer: {
        marginBottom: hp('2%'),
    },
    moreInfoTitle: {
        fontSize: hp('2%'),
        fontFamily: fonts.SemiBold,
        marginBottom: hp('1%'),
    },
    moreInfoText: {
        fontSize: hp('1.8%'),
        fontFamily: fonts.Regular,
    },
    boldText: {
        fontFamily: fonts.SemiBold,
    },
    confirmButton: {
        backgroundColor: colors.GREEN,
        paddingVertical: hp('1.5%'),
        borderRadius: hp('1%'),
        alignItems: 'center',
        marginBottom: hp('3%'),
    },
    confirmButtonText: {
        color: colors.WHITE,
        fontSize: hp('2%'),
        fontFamily: fonts.Medium,
    },
});

export default Diagnosis;