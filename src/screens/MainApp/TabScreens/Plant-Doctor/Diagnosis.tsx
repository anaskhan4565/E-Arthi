import React, { useEffect } from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Linking,
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
import { MMKV } from "react-native-mmkv";

// Define interface for the diagnosis data
interface DiagnosisData {
    common_name: string;
    scientific_name: string;
    diagnosis_likelihood: string;
    symptoms: string;
    symptoms_short?: string[];
    preventive_measures?: string[];
    pathogen_class?: string;
    hosts?: string[];
    treatment_chemical?: string;
    treatment_organic?: string;
    [key: string]: any; // Allow for additional properties
}

interface RouteParams {
    imageUri: string;
    diagnosisResult?: DiagnosisData;
}

const Diagnosis = () => {
    const { t } = useTranslation();
    const navigation = useNavigation<any>();
    const route = useRoute();
    const { imageUri, diagnosisResult } = route.params as RouteParams;
    const PlantDiagnosisData = new MMKV();

    // Use stored diagnosis data if no diagnosis result is passed
    const storedDiagnosis = PlantDiagnosisData.getString("Diagnosis");
    const storedSymptoms = PlantDiagnosisData.getString("Symptoms");

    // Store the current diagnosis data if it exists
    useEffect(() => {
        if (diagnosisResult) {
            PlantDiagnosisData.set("Diagnosis", diagnosisResult.common_name);
            PlantDiagnosisData.set("Symptoms", diagnosisResult.symptoms);
            
            // Store other useful diagnosis information
            if (diagnosisResult.scientific_name) {
                PlantDiagnosisData.set("ScientificName", diagnosisResult.scientific_name);
            }
            
            if (diagnosisResult.preventive_measures) {
                PlantDiagnosisData.set("PreventiveMeasures", diagnosisResult.preventive_measures.join("\n• "));
            }
            
            if (diagnosisResult.treatment_chemical) {
                PlantDiagnosisData.set("TreatmentChemical", diagnosisResult.treatment_chemical);
            }
            
            if (diagnosisResult.treatment_organic) {
                PlantDiagnosisData.set("TreatmentOrganic", diagnosisResult.treatment_organic);
            }
        }
    }, [diagnosisResult]);

    // Get the diagnosis name (either from the passed data or storage)
    const diagnosisName = diagnosisResult ? diagnosisResult.common_name : storedDiagnosis;
    
    // Get the symptoms (either from the passed data or storage)
    const symptoms = diagnosisResult ? diagnosisResult.symptoms : storedSymptoms;
    
    // Get the scientific name
    const scientificName = diagnosisResult ? 
        diagnosisResult.scientific_name : 
        PlantDiagnosisData.getString("ScientificName");
    
    // Get the hosts (affected crops)
    const hosts = diagnosisResult?.hosts ? 
        diagnosisResult.hosts.join(', ') : 
        "Not specified";
    
    // Get preventive measures
    const preventiveMeasures = diagnosisResult?.preventive_measures ? 
        diagnosisResult.preventive_measures.slice(0, 3) : 
        PlantDiagnosisData.getString("PreventiveMeasures")?.split("\n");

    // Get pathogen class (disease type)
    const pathogenClass = diagnosisResult?.pathogen_class || "Not specified";
    
    // Format the pathogen class for display
    const formatPathogenClass = (pathClass: string) => {
        if (!pathClass || pathClass === "Not specified") return "Unknown";
        
        // Capitalize first letter and add spaces
        return pathClass.charAt(0).toUpperCase() + 
            pathClass.slice(1).replace(/_/g, ' ');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navbarContainer}>
                <Navbar gobackOnly={true} />
            </View>
            <ScrollView style={styles.scrollView}>
                <Text style={styles.title}>Diagnosis</Text>

                <View style={styles.diagnosisContainer}>
                    <Text style={styles.diagnosisTitle}>{diagnosisName || "Unknown Condition"}</Text>
                    <TouchableOpacity style={styles.pathogenTypeButton}>
                        <Text style={styles.pathogenTypeText}>
                            {formatPathogenClass(pathogenClass)}
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.imageContainer}>
                    {imageUri ? (
                        <Image source={{ uri: imageUri }} style={styles.image} resizeMode="contain" />
                    ) : (
                        <View style={styles.imagePlaceholder} />
                    )}
                </View>

                <View style={styles.symptomsContainer}>
                    <Text style={styles.symptomsTitle}>Symptoms:</Text>
                    <Text style={styles.symptomsText}>
                        {symptoms || "No symptoms information available."}
                    </Text>
                </View>

                <View style={styles.moreInfoContainer}>
                    <Text style={styles.moreInfoTitle}>Prevention Measures:</Text>
                    {preventiveMeasures && preventiveMeasures.length > 0 ? (
                        <View style={styles.preventiveMeasuresList}>
                            {preventiveMeasures.map((measure, index) => (
                                <Text key={index} style={styles.preventiveMeasureItem}>
                                    • {measure}
                                </Text>
                            ))}
                        </View>
                    ) : (
                        <Text style={styles.moreInfoText}>No prevention measures available.</Text>
                    )}
                    
                    <Text style={[styles.moreInfoText, styles.scientificNameSection]}>
                        Scientific Name: <Text style={styles.boldText}>{scientificName || "Not specified"}</Text>{"\n"}
                        Also found in: {hosts}
                    </Text>
                </View>

                <TouchableOpacity 
                    style={styles.confirmButton} 
                    onPress={() => navigation.navigate(ScreensName.Treatment)}
                >
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
        borderRadius: wp('2%'),
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
        flex: 1,
    },
    pathogenTypeButton: {
        backgroundColor: colors.OLD_MILL_BLUE,
        paddingHorizontal: wp('3%'),
        paddingVertical: hp('0.5%'),
        borderRadius: hp('1%'),
    },
    pathogenTypeText: {
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
        borderRadius: wp('2%'),
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
    scientificNameSection: {
        marginTop: hp('1.5%'),
    },
    boldText: {
        fontFamily: fonts.SemiBold,
    },
    preventiveMeasuresList: {
        marginTop: hp('1%'),
    },
    preventiveMeasureItem: {
        fontSize: hp('1.8%'),
        fontFamily: fonts.Regular,
        marginBottom: hp('0.5%'),
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