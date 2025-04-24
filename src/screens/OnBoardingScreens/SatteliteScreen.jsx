import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    StatusBar,
    ActivityIndicator,
    Alert,
    Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';

import colors from '../../../util/Constants/colors';
import { fonts } from '../../../util/Constants/FontName';
import CustomButton from '../../components/CustomButton';
import Navbar from '../MainApp/Navbar/Navbar';

const SatteliteScreen = () => {
    const navigation = useNavigation();
    const { t } = useTranslation();

    // API configuration
    const API_KEY = '8fb397a48b6323c4b57d49e3da735ac4'; // AgroMonitoring API key
    const BASE_URL = 'http://api.agromonitoring.com/agro/1.0';

    // Polygon coordinates using the provided point (24.93274642, 67.1051511) as center
    // Creating a small field of approximately 0.5 km²
    const polygon_coordinates = [
        [
            [74.2988, 31.5204], // top left
            [74.3088, 31.5204], // top right
            [74.3088, 31.5104], // bottom right
            [74.2988, 31.5104], // bottom left
            [74.2988, 31.5204]  // back to top left to close the polygon
        ]
    ];

    // States
    const [loading, setLoading] = useState(false);
    const [polygonId, setPolygonId] = useState('');
    const [ndviImage, setNdviImage] = useState('');
    const [ndviStats, setNdviStats] = useState(null);
    const [startDate, setStartDate] = useState(new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)); // 10 days ago
    const [endDate, setEndDate] = useState(new Date());
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
    const [allPolygons, setAllPolygons] = useState([]);
    const [selectedPolygon, setSelectedPolygon] = useState(null);
    const [fetchingPolygons, setFetchingPolygons] = useState(false);
    const [errors, setErrors] = useState([]);

    // Add new error to the errors log
    const logError = (source, message, details = null) => {
        const errorObj = {
            timestamp: new Date().toISOString(),
            source,
            message,
            details
        };
        console.log('ERROR:', errorObj);
        setErrors(prevErrors => [...prevErrors, errorObj]);
    };

    // Format date for display
    const formatDate = (date) => {
        try {
            return date.toLocaleDateString('en-US', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            });
        } catch (error) {
            logError('formatDate', 'Failed to format date', error);
            return 'Invalid Date';
        }
    };

    // Create polygon
    const createPolygon = async () => {
        try {
            setLoading(true);
            console.log('Creating polygon with coordinates:', polygon_coordinates);

            const url = `${BASE_URL}/polygons?appid=${API_KEY}`;
            const payload = {
                name: "My Field",
                geo_json: {
                    type: "Feature",
                    properties: {},
                    geometry: {
                        type: "Polygon",
                        coordinates: polygon_coordinates
                    }
                }
            };

            const response = await axios.post(url, payload);
            console.log('Polygon created successfully:', response.data);

            const id = response.data.id;
            setPolygonId(id);
            setLoading(false);
            Alert.alert('Success', `Polygon created with ID: ${id}`);
            return id;
        } catch (error) {
            setLoading(false);
            const errorMessage = error.response ?
                `Error ${error.response.status}: ${error.response.data?.message || error.response.statusText}` :
                error.message;

            logError('createPolygon', 'Failed to create polygon', {
                message: errorMessage,
                error: error.toString(),
                request: payload,
                response: error.response?.data
            });

            Alert.alert('Error', 'Failed to create polygon: ' + errorMessage);
            return null;
        }
    };

    // Get all polygons
    const getAllPolygons = async () => {
        try {
            setFetchingPolygons(true);
            console.log('Fetching all polygons...');

            const url = `${BASE_URL}/polygons?appid=${API_KEY}`;
            const response = await axios.get(url);

            console.log(`Fetched ${response.data.length} polygons successfully`);
            setAllPolygons(response.data);
            setFetchingPolygons(false);
            return response.data;
        } catch (error) {
            setFetchingPolygons(false);
            const errorMessage = error.response ?
                `Error ${error.response.status}: ${error.response.data?.message || error.response.statusText}` :
                error.message;

            logError('getAllPolygons', 'Failed to fetch polygons', {
                message: errorMessage,
                error: error.toString(),
                response: error.response?.data
            });

            Alert.alert('Error', 'Failed to fetch polygons: ' + errorMessage);
            return [];
        }
    };

    // Search for satellite imagery
    const searchImages = async () => {
        if (!polygonId) {
            const errorMessage = 'No polygon ID selected';
            logError('searchImages', errorMessage);
            Alert.alert('Error', 'Please create or select a polygon first');
            return;
        }

        try {
            setLoading(true);
            console.log(`Searching satellite imagery for polygon ID: ${polygonId}`);

            // Convert dates to UNIX timestamps
            const startTimestamp = Math.floor(startDate.getTime() / 1000);
            const endTimestamp = Math.floor(endDate.getTime() / 1000);
            console.log(`Date range: ${formatDate(startDate)} to ${formatDate(endDate)}`);
            console.log(`Timestamps: ${startTimestamp} to ${endTimestamp}`);

            const url = `${BASE_URL}/image/search`;
            const params = {
                start: startTimestamp,
                end: endTimestamp,
                polyid: polygonId,
                appid: API_KEY
            };

            console.log('Request params:', params);
            const response = await axios.get(url, { params });
            console.log(`Found ${response.data.length} satellite images`);

            if (response.data && response.data.length > 0) {
                const imageData = response.data[0];
                console.log('Selected image data:', imageData);

                // Get NDVI image URL
                const ndviImageUrl = imageData.image.ndvi;
                console.log('NDVI image URL:', ndviImageUrl);
                setNdviImage(ndviImageUrl);

                // Get NDVI stats
                const ndviStatsUrl = imageData.stats.ndvi;
                console.log('NDVI stats URL:', ndviStatsUrl);
                const statsResponse = await axios.get(ndviStatsUrl);
                console.log('NDVI stats:', statsResponse.data);
                setNdviStats(statsResponse.data);

                setLoading(false);
            } else {
                setLoading(false);
                const message = 'No satellite imagery found for the selected date range';
                logError('searchImages', message, {
                    polygonId,
                    dateRange: {
                        start: formatDate(startDate),
                        end: formatDate(endDate)
                    }
                });
                Alert.alert('No Data', message);
            }
        } catch (error) {
            setLoading(false);
            const errorMessage = error.response ?
                `Error ${error.response.status}: ${error.response.data?.message || error.response.statusText}` :
                error.message;

            logError('searchImages', 'Failed to fetch satellite data', {
                message: errorMessage,
                error: error.toString(),
                request: {
                    polygonId,
                    startDate: formatDate(startDate),
                    endDate: formatDate(endDate)
                },
                response: error.response?.data
            });

            Alert.alert('Error', 'Failed to fetch satellite data: ' + errorMessage);
        }
    };

    // Handle date changes
    const onStartDateChange = (event, selectedDate) => {
        try {
            const currentDate = selectedDate || startDate;
            console.log('Start date changed to:', formatDate(currentDate));
            setShowStartDatePicker(Platform.OS === 'ios');
            setStartDate(currentDate);
        } catch (error) {
            logError('onStartDateChange', 'Error changing start date', error);
        }
    };

    const onEndDateChange = (event, selectedDate) => {
        try {
            const currentDate = selectedDate || endDate;
            console.log('End date changed to:', formatDate(currentDate));
            setShowEndDatePicker(Platform.OS === 'ios');
            setEndDate(currentDate);
        } catch (error) {
            logError('onEndDateChange', 'Error changing end date', error);
        }
    };

    // Effects
    useEffect(() => {
        try {
            console.log('SatteliteScreen mounted, fetching initial data...');
            getAllPolygons();
        } catch (error) {
            logError('useEffect', 'Error in initial data fetch', error);
        }

        return () => {
            console.log('SatteliteScreen unmounted');
        };
    }, []);

    // Select a polygon from the list
    const selectPolygon = (polygon) => {
        try {
            console.log('Polygon selected:', polygon);
            setPolygonId(polygon.id);
            setSelectedPolygon(polygon);
        } catch (error) {
            logError('selectPolygon', 'Error selecting polygon', {
                polygonId: polygon?.id,
                error: error.toString()
            });
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navbarContainer}>
                <Navbar gobackOnly={false} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.title}>Satellite Imagery</Text>

                <View style={styles.cardContainer}>
                    <Text style={styles.cardTitle}>Field Selection</Text>

                    {fetchingPolygons ? (
                        <ActivityIndicator size="large" color={colors.GREEN} />
                    ) : (
                        <>
                            {allPolygons.length > 0 ? (
                                <View style={styles.polygonsContainer}>
                                    <Text style={styles.sectionTitle}>Your Fields:</Text>
                                    {allPolygons.map((polygon, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            style={[
                                                styles.polygonItem,
                                                polygonId === polygon.id && styles.selectedPolygon
                                            ]}
                                            onPress={() => selectPolygon(polygon)}
                                        >
                                            <Text style={styles.polygonName}>{polygon.name || `Field ${index + 1}`}</Text>
                                            <Text style={styles.polygonId}>ID: {polygon.id}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            ) : (
                                <View style={styles.noFieldsContainer}>
                                    <Text style={styles.noFieldsText}>No fields found</Text>
                                </View>
                            )}

                            <TouchableOpacity
                                style={styles.createPolygonButton}
                                onPress={createPolygon}
                            >
                                <Text style={styles.createPolygonButtonText}>Create New Field</Text>
                            </TouchableOpacity>
                        </>
                    )}

                    <View style={styles.dateSelectionContainer}>
                        <Text style={styles.sectionTitle}>Date Range</Text>

                        <View style={styles.dateRow}>
                            <Text style={styles.dateLabel}>Start:</Text>
                            <TouchableOpacity
                                style={styles.dateButton}
                                onPress={() => setShowStartDatePicker(true)}
                            >
                                <Text style={styles.dateButtonText}>{formatDate(startDate)}</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.dateRow}>
                            <Text style={styles.dateLabel}>End:</Text>
                            <TouchableOpacity
                                style={styles.dateButton}
                                onPress={() => setShowEndDatePicker(true)}
                            >
                                <Text style={styles.dateButtonText}>{formatDate(endDate)}</Text>
                            </TouchableOpacity>
                        </View>

                        {showStartDatePicker && (
                            <DateTimePicker
                                value={startDate}
                                mode="date"
                                display="default"
                                onChange={onStartDateChange}
                            />
                        )}

                        {showEndDatePicker && (
                            <DateTimePicker
                                value={endDate}
                                mode="date"
                                display="default"
                                onChange={onEndDateChange}
                            />
                        )}
                    </View>

                    <TouchableOpacity
                        style={styles.searchButton}
                        onPress={searchImages}
                        disabled={loading || !polygonId}
                    >
                        {loading ? (
                            <ActivityIndicator size="small" color={colors.WHITE} />
                        ) : (
                            <Text style={styles.searchButtonText}>Fetch Satellite Data</Text>
                        )}
                    </TouchableOpacity>
                </View>

                {ndviImage && (
                    <View style={styles.resultsContainer}>
                        <Text style={styles.cardTitle}>NDVI Results</Text>

                        <View style={styles.imageContainer}>
                            <Image
                                source={{ uri: ndviImage }}
                                style={styles.ndviImage}
                                resizeMode="contain"
                                onError={(e) => logError('imageLoad', 'Failed to load NDVI image', e.nativeEvent.error)}
                            />
                        </View>

                        {ndviStats && (
                            <View style={styles.statsContainer}>
                                <Text style={styles.sectionTitle}>NDVI Statistics</Text>

                                <View style={styles.statRow}>
                                    <Text style={styles.statLabel}>Mean (Average):</Text>
                                    <Text style={styles.statValue}>{ndviStats.mean?.toFixed(3) || 'N/A'}</Text>
                                </View>

                                <View style={styles.statRow}>
                                    <Text style={styles.statLabel}>Standard Deviation:</Text>
                                    <Text style={styles.statValue}>{ndviStats.std?.toFixed(3) || 'N/A'}</Text>
                                </View>

                                <View style={styles.statRow}>
                                    <Text style={styles.statLabel}>Minimum Value:</Text>
                                    <Text style={styles.statValue}>{ndviStats.min?.toFixed(3) || 'N/A'}</Text>
                                </View>

                                <View style={styles.statRow}>
                                    <Text style={styles.statLabel}>Maximum Value:</Text>
                                    <Text style={styles.statValue}>{ndviStats.max?.toFixed(3) || 'N/A'}</Text>
                                </View>

                                <View style={styles.ndviLegendContainer}>
                                    <Text style={styles.legendTitle}>NDVI Legend:</Text>
                                    <View style={styles.legendRow}>
                                        <View style={[styles.legendColor, { backgroundColor: '#d73027' }]} />
                                        <Text style={styles.legendText}>-1.0 to 0.0: Water, buildings</Text>
                                    </View>
                                    <View style={styles.legendRow}>
                                        <View style={[styles.legendColor, { backgroundColor: '#f46d43' }]} />
                                        <Text style={styles.legendText}>0.0 to 0.1: Barren areas, sand</Text>
                                    </View>
                                    <View style={styles.legendRow}>
                                        <View style={[styles.legendColor, { backgroundColor: '#fdae61' }]} />
                                        <Text style={styles.legendText}>0.1 to 0.2: Shrubs, low vegetation</Text>
                                    </View>
                                    <View style={styles.legendRow}>
                                        <View style={[styles.legendColor, { backgroundColor: '#a6d96a' }]} />
                                        <Text style={styles.legendText}>0.2 to 0.4: Sparse vegetation</Text>
                                    </View>
                                    <View style={styles.legendRow}>
                                        <View style={[styles.legendColor, { backgroundColor: '#66bd63' }]} />
                                        <Text style={styles.legendText}>0.4 to 0.6: Moderate vegetation</Text>
                                    </View>
                                    <View style={styles.legendRow}>
                                        <View style={[styles.legendColor, { backgroundColor: '#1a9850' }]} />
                                        <Text style={styles.legendText}>0.6 to 1.0: Dense vegetation</Text>
                                    </View>
                                </View>
                            </View>
                        )}
                    </View>
                )}

                {/* Error log display (can be toggled in dev mode) */}
                {__DEV__ && errors.length > 0 && (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorTitle}>Error Log ({errors.length})</Text>
                        <ScrollView style={styles.errorScroll}>
                            {errors.map((error, index) => (
                                <View key={index} style={styles.errorItem}>
                                    <Text style={styles.errorTime}>{error.timestamp}</Text>
                                    <Text style={styles.errorSource}>{error.source}</Text>
                                    <Text style={styles.errorMessage}>{error.message}</Text>
                                    {error.details && (
                                        <Text style={styles.errorDetails}>
                                            {typeof error.details === 'object'
                                                ? JSON.stringify(error.details, null, 2)
                                                : error.details}
                                        </Text>
                                    )}
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                )}
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
        marginTop: hp("0.2%"),
        width: '100%',
    },
    scrollContainer: {
        flexGrow: 1,
        paddingHorizontal: wp(5),
        paddingBottom: hp(7),
    },
    title: {
        fontSize: hp(3),
        fontFamily: fonts.SemiBold,
        color: colors.BLACK,
        marginTop: hp(2),
        marginBottom: hp(3),
    },
    cardContainer: {
        backgroundColor: colors.LIGHT_GREEN,
        borderRadius: wp(4),
        padding: wp(5),
        marginBottom: hp(3),
    },
    cardTitle: {
        fontSize: hp(2.5),
        fontFamily: fonts.SemiBold,
        color: colors.BLACK,
        textAlign: 'center',
        marginBottom: hp(3),
    },
    sectionTitle: {
        fontSize: hp(2),
        fontFamily: fonts.SemiBold,
        color: colors.BLACK,
        marginBottom: hp(1.5),
    },
    polygonsContainer: {
        marginBottom: hp(2),
    },
    polygonItem: {
        backgroundColor: colors.WHITE,
        borderRadius: wp(2),
        padding: wp(3),
        marginBottom: hp(1),
        borderWidth: 1,
        borderColor: colors.LIGHT_GRAY,
    },
    selectedPolygon: {
        borderColor: colors.GREEN,
        borderWidth: 2,
    },
    polygonName: {
        fontSize: hp(1.8),
        fontFamily: fonts.Medium,
        color: colors.BLACK,
    },
    polygonId: {
        fontSize: hp(1.5),
        fontFamily: fonts.Regular,
        color: colors.GRAY,
        marginTop: hp(0.5),
    },
    noFieldsContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: hp(10),
    },
    noFieldsText: {
        fontSize: hp(1.8),
        fontFamily: fonts.Medium,
        color: colors.GRAY,
    },
    createPolygonButton: {
        backgroundColor: colors.PRIMARY,
        borderRadius: wp(2),
        padding: wp(3),
        alignItems: 'center',
        marginBottom: hp(3),
    },
    createPolygonButtonText: {
        fontSize: hp(1.8),
        fontFamily: fonts.Medium,
        color: colors.WHITE,
    },
    dateSelectionContainer: {
        marginBottom: hp(2),
    },
    dateRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp(1.5),
    },
    dateLabel: {
        fontSize: hp(1.8),
        fontFamily: fonts.Medium,
        color: colors.BLACK,
        width: wp(15),
    },
    dateButton: {
        backgroundColor: colors.WHITE,
        borderRadius: wp(2),
        padding: wp(3),
        flex: 1,
        borderWidth: 1,
        borderColor: colors.LIGHT_GRAY,
    },
    dateButtonText: {
        fontSize: hp(1.8),
        fontFamily: fonts.Regular,
        color: colors.BLACK,
    },
    searchButton: {
        backgroundColor: colors.GREEN,
        borderRadius: wp(2),
        padding: wp(3),
        alignItems: 'center',
    },
    searchButtonText: {
        fontSize: hp(1.8),
        fontFamily: fonts.Medium,
        color: colors.WHITE,
    },
    resultsContainer: {
        backgroundColor: colors.LIGHT_GREEN,
        borderRadius: wp(4),
        padding: wp(5),
        marginBottom: hp(3),
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: hp(3),
        backgroundColor: colors.WHITE,
        borderRadius: wp(2),
        padding: wp(2),
        height: hp(30),
    },
    ndviImage: {
        width: '100%',
        height: '100%',
        borderRadius: wp(2),
    },
    statsContainer: {
        backgroundColor: colors.WHITE,
        borderRadius: wp(2),
        padding: wp(3),
    },
    statRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: hp(1),
    },
    statLabel: {
        fontSize: hp(1.8),
        fontFamily: fonts.Medium,
        color: colors.BLACK,
    },
    statValue: {
        fontSize: hp(1.8),
        fontFamily: fonts.SemiBold,
        color: colors.GREEN,
    },
    ndviLegendContainer: {
        marginTop: hp(2),
        padding: wp(2),
        backgroundColor: colors.LAVENDER_SYRUP,
        borderRadius: wp(2),
    },
    legendTitle: {
        fontSize: hp(1.8),
        fontFamily: fonts.SemiBold,
        color: colors.BLACK,
        marginBottom: hp(1),
    },
    legendRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp(0.5),
    },
    legendColor: {
        width: wp(5),
        height: wp(5),
        borderRadius: wp(1),
        marginRight: wp(2),
    },
    legendText: {
        fontSize: hp(1.5),
        fontFamily: fonts.Regular,
        color: colors.BLACK,
    },
    // Error logging styles
    errorContainer: {
        backgroundColor: '#ffebee',
        borderRadius: wp(4),
        padding: wp(5),
        marginBottom: hp(3),
        borderWidth: 1,
        borderColor: '#ffcdd2',
    },
    errorTitle: {
        fontSize: hp(2),
        fontFamily: fonts.SemiBold,
        color: '#c62828',
        marginBottom: hp(1.5),
    },
    errorScroll: {
        maxHeight: hp(30),
    },
    errorItem: {
        marginBottom: hp(2),
        padding: wp(3),
        backgroundColor: '#ffffff',
        borderRadius: wp(2),
        borderLeftWidth: 4,
        borderLeftColor: '#ef5350',
    },
    errorTime: {
        fontSize: hp(1.4),
        fontFamily: fonts.Regular,
        color: colors.GRAY,
        marginBottom: hp(0.5),
    },
    errorSource: {
        fontSize: hp(1.8),
        fontFamily: fonts.SemiBold,
        color: '#d32f2f',
    },
    errorMessage: {
        fontSize: hp(1.6),
        fontFamily: fonts.Medium,
        color: colors.BLACK,
        marginVertical: hp(0.5),
    },
    errorDetails: {
        fontSize: hp(1.4),
        fontFamily: fonts.Regular,
        color: colors.GRAY,
        backgroundColor: '#f5f5f5',
        padding: wp(2),
        borderRadius: wp(1),
        marginTop: hp(0.5),
    },
});

export default SatteliteScreen;
