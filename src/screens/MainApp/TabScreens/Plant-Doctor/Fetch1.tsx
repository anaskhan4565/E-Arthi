import React, { useState } from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    Image,
    FlatList,
} from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation, useRoute } from "@react-navigation/native";
import colors from "../../../../../util/Constants/colors.js";
import Navbar from "../../Navbar/Navbar.jsx";
import { fonts } from "../../../../../util/Constants/FontName.js";
import ScreensName from "../../../../../util/Constants/ScreensName.ts";

// Define interfaces for type safety
interface Diagnosis {
    common_name: string;
    scientific_name: string;
    diagnosis_likelihood: string;
    symptoms: string;
    symptoms_short: string[];
    image_references: string[];
    peat_id: number;
    [key: string]: any; // Allow for additional properties
}

interface AnalysisResults {
    error?: string;
    crop_health?: string;
    crops?: string[];
    predicted_diagnoses?: Diagnosis[];
    [key: string]: any; // Allow for additional properties
}

interface RouteParams {
    analysisResults: AnalysisResults;
    imageUri: string;
}

const Fetch1 = () => {
    const navigation = useNavigation<any>();
    const route = useRoute();
    const { analysisResults, imageUri } = (route.params as RouteParams) || { analysisResults: undefined, imageUri: undefined };
    const [selectedDiagnosis, setSelectedDiagnosis] = useState<Diagnosis | null>(null);

    // Handle if no data was passed or no diagnoses available
    if (!analysisResults || !analysisResults.predicted_diagnoses || analysisResults.predicted_diagnoses.length <= 0) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.navbarContainer}>
                    <Navbar gobackOnly={true} />
                </View>
                <View style={styles.contentContainer}>
                    <Text style={styles.errorText}>No diagnosis data available</Text>
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.buttonText}>Go Back</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    // Get the likelihood level as a number for color coding
    const getLikelihoodLevel = (likelihood: string): number => {
        switch(likelihood) {
            case 'very_likely': return 5;
            case 'likely': return 4;
            case 'possible': return 3;
            case 'unlikely': return 2;
            case 'very_unlikely': return 1;
            default: return 0;
        }
    };

    // Get color based on likelihood
    const getLikelihoodColor = (likelihood: string): string => {
        const level = getLikelihoodLevel(likelihood);
        if (level >= 4) return colors.RED;
        if (level === 3) return colors.ORANGE || '#FFA500'; // Fallback to standard orange
        if (level === 2) return '#FFFF00'; // Standard yellow
        return colors.GRAY;
    };

    // Format the likelihood text for display
    const formatLikelihood = (likelihood: string): string => {
        return likelihood.replace(/_/g, ' ').split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    // Handle selection of a diagnosis
    const handleSelectDiagnosis = (diagnosis: Diagnosis) => {
        setSelectedDiagnosis(diagnosis);
    };

    // Proceed to diagnosis screen with selected diagnosis
    const handleProceed = () => {
        if (selectedDiagnosis) {
            navigation.navigate(ScreensName.Diagnosis, { 
                imageUri: imageUri,
                diagnosisResult: selectedDiagnosis
            });
        } else if (analysisResults.predicted_diagnoses && analysisResults.predicted_diagnoses.length > 0) {
            // If no diagnosis is selected, select the first one
            navigation.navigate(ScreensName.Diagnosis, { 
                imageUri: imageUri,
                diagnosisResult: analysisResults.predicted_diagnoses[0]
            });
        } else {
            // Fallback if somehow there are no diagnoses
            navigation.navigate(ScreensName.Diagnosis, { 
                imageUri: imageUri
            });
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navbarContainer}>
                <Navbar gobackOnly={true} />
            </View>

            <ScrollView style={styles.scrollContainer}>
                <View style={styles.contentContainer}>
                    <Text style={styles.title}>Select Matching Diagnosis</Text>
                    
                    {imageUri && (
                        <View style={styles.imageContainer}>
                            <Image 
                                source={{ uri: imageUri }} 
                                style={styles.image} 
                                resizeMode="contain"
                            />
                        </View>
                    )}

                    <Text style={styles.subtitle}>
                        Your plant appears to be {analysisResults.crops && analysisResults.crops.length > 0 
                            ? analysisResults.crops.join(', ') 
                            : 'unknown'} and is {analysisResults.crop_health || 'unknown'}.
                    </Text>

                    <Text style={styles.instructionText}>
                        Please select the diagnosis that best matches your plant's condition:
                    </Text>

                    <FlatList
                        data={analysisResults.predicted_diagnoses}
                        keyExtractor={(item) => item.peat_id.toString()}
                        scrollEnabled={false}
                        renderItem={({ item }) => (
                            <TouchableOpacity 
                                style={[
                                    styles.diagnosisCard,
                                    selectedDiagnosis?.peat_id === item.peat_id && styles.selectedCard
                                ]}
                                onPress={() => handleSelectDiagnosis(item)}
                            >
                                <View style={styles.diagnosisHeader}>
                                    <Text style={styles.diagnosisTitle}>{item.common_name}</Text>
                                    <Text style={[
                                        styles.diagnosisLikelihood,
                                        { color: getLikelihoodColor(item.diagnosis_likelihood) }
                                    ]}>
                                        {formatLikelihood(item.diagnosis_likelihood)}
                                    </Text>
                                </View>
                                
                                <Text style={styles.scientificName}>{item.scientific_name}</Text>
                                
                                {item.symptoms_short && item.symptoms_short.length > 0 && (
                                    <View style={styles.symptomsContainer}>
                                        <Text style={styles.symptomsTitle}>Key Symptoms:</Text>
                                        {item.symptoms_short.slice(0, 3).map((symptom, index) => (
                                            <Text key={index} style={styles.symptomItem}>• {symptom}</Text>
                                        ))}
                                    </View>
                                )}

                                {item.image_references && item.image_references.length > 0 && (
                                    <ScrollView 
                                        horizontal 
                                        showsHorizontalScrollIndicator={false}
                                        style={styles.referenceImagesContainer}
                                    >
                                        {item.image_references.map((imgUrl, index) => (
                                            <Image
                                                key={index}
                                                source={{ uri: imgUrl }}
                                                style={styles.referenceImage}
                                                resizeMode="cover"
                                            />
                                        ))}
                                    </ScrollView>
                                )}
                            </TouchableOpacity>
                        )}
                        style={styles.diagnosisList}
                    />

                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={handleProceed}
                    >
                        <Text style={styles.buttonText}>
                            {selectedDiagnosis ? 'Proceed with Selected Diagnosis' : 'Proceed with Top Match'}
                        </Text>
                    </TouchableOpacity>
                </View>
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
        backgroundColor: colors.WHITE,
        marginTop: hp("0.14%"),
    },
    scrollContainer: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        padding: wp('4%'),
        paddingBottom: hp('4%'),
    },
    title: {
        fontSize: hp('2.8%'),
        fontFamily: fonts.SemiBold,
        color: colors.BLACK,
        marginBottom: hp('2%'),
        alignSelf: 'center',
    },
    subtitle: {
        fontSize: hp('2%'),
        fontFamily: fonts.Regular,
        color: colors.BLACK,
        marginBottom: hp('2%'),
        textAlign: 'center',
        width: wp('90%'),
    },
    instructionText: {
        fontSize: hp('1.8%'),
        fontFamily: fonts.Regular,
        color: colors.GRAY,
        marginBottom: hp('2%'),
        textAlign: 'center',
        width: wp('90%'),
    },
    imageContainer: {
        width: wp('90%'),
        height: hp('25%'),
        borderRadius: wp('3%'),
        overflow: 'hidden',
        marginBottom: hp('2%'),
        backgroundColor: colors.LIGHT_GRAY,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    diagnosisList: {
        width: wp('90%'),
        marginBottom: hp('2%'),
    },
    diagnosisCard: {
        width: '100%',
        backgroundColor: colors.WHITE,
        borderRadius: wp('3%'),
        padding: wp('4%'),
        marginBottom: hp('2%'),
        shadowColor: colors.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        borderWidth: 1,
        borderColor: colors.LIGHT_GRAY,
    },
    selectedCard: {
        borderColor: colors.GREEN,
        borderWidth: 2,
    },
    diagnosisHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: hp('1%'),
    },
    diagnosisTitle: {
        fontSize: hp('2.2%'),
        fontFamily: fonts.SemiBold,
        color: colors.BLACK,
        flex: 1,
    },
    diagnosisLikelihood: {
        fontSize: hp('1.8%'),
        fontFamily: fonts.SemiBold,
        marginLeft: wp('2%'),
    },
    scientificName: {
        fontSize: hp('1.8%'),
        fontFamily: fonts.Regular,
        color: colors.GRAY,
        marginBottom: hp('1.5%'),
        fontStyle: 'italic',
    },
    symptomsContainer: {
        marginBottom: hp('1.5%'),
    },
    symptomsTitle: {
        fontSize: hp('1.8%'),
        fontFamily: fonts.SemiBold,
        color: colors.BLACK,
        marginBottom: hp('0.5%'),
    },
    symptomItem: {
        fontSize: hp('1.7%'),
        fontFamily: fonts.Regular,
        color: colors.GRAY,
        marginLeft: wp('2%'),
        marginBottom: hp('0.5%'),
    },
    referenceImagesContainer: {
        flexDirection: 'row',
        marginTop: hp('1%'),
    },
    referenceImage: {
        width: wp('25%'),
        height: wp('25%'),
        borderRadius: wp('2%'),
        marginRight: wp('2%'),
    },
    actionButton: {
        width: wp('90%'),
        height: hp('6%'),
        backgroundColor: colors.GREEN,
        borderRadius: wp('2%'),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp('2%'),
    },
    buttonText: {
        fontSize: hp('2%'),
        fontFamily: fonts.SemiBold,
        color: colors.WHITE,
    },
    errorText: {
        fontSize: hp('1.8%'),
        fontFamily: fonts.Regular,
        color: colors.RED,
        textAlign: 'center',
        marginTop: hp('10%'),
    },
});

export default Fetch1; 