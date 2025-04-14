import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
    Modal,
    TextInput,
    Alert,
} from 'react-native';
import { MMKV } from 'react-native-mmkv';
import { useNavigation } from '@react-navigation/native';
import ScreensName from '../../../../../util/Constants/ScreensName';
import { launchImageLibrary } from 'react-native-image-picker';
import colors from '../../../../../util/Constants/colors';
import Navbar from '../../Navbar/Navbar';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const storage = new MMKV();

interface Land {
    id: string;
    name: string;
    size: string;
    photo?: string;
}

const ELoanNewLand = () => {
    const navigation = useNavigation();
    const [lands, setLands] = useState<Land[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [newLand, setNewLand] = useState({
        name: '',
        size: '',
        photo: null,
    });

    useEffect(() => {
        loadLands();
    }, []);

    const loadLands = () => {
        const savedLands = storage.getString('farmer_lands');
        if (savedLands) {
            setLands(JSON.parse(savedLands));
        }
    };

    const resetLands = () => {
        storage.delete('farmer_lands');
        setLands([]);
        Alert.alert('Success', 'Lands storage has been reset');
    };

    const handleImagePick = async () => {
        try {
            const result = await launchImageLibrary({
                mediaType: 'photo',
                quality: 0.5,
            });

            if (result.assets && result.assets[0]) {
                setNewLand({ ...newLand, photo: result.assets[0].uri });
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to pick image');
        }
    };

    const saveLand = () => {
        if (!newLand.name || !newLand.size) {
            Alert.alert('Error', 'Please fill in all required fields');
            return;
        }

        const landData: Land = {
            id: Date.now().toString(),
            name: newLand.name,
            size: newLand.size,
            photo: newLand.photo || 'default_land_photo',
        };

        const updatedLands = [...lands, landData];
        storage.set('farmer_lands', JSON.stringify(updatedLands));
        setLands(updatedLands);
        setModalVisible(false);
        setNewLand({ name: '', size: '', photo: null });
    };

    const handleLandPress = (land: Land) => {
        navigation.navigate(ScreensName.EENewLoan, { land });
    };

    return (
        <View style={styles.container}>
            <View style={styles.navbarContainer}>
                <Navbar />
            </View>
            <View style={styles.header}>
                <Text style={styles.headerText}>My Lands</Text>
                <View style={styles.headerButtons}>
                    {/* <TouchableOpacity
                        style={[styles.button, styles.resetButton]}
                        onPress={resetLands}
                    >
                        <Text style={styles.buttonText}>Reset Lands</Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity
                        style={[styles.button, styles.addButton]}
                        onPress={() => setModalVisible(true)}
                    >
                        <Text style={styles.buttonText}>Add New Land</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView style={styles.landsContainer}>
                {lands.length === 0 ? (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyStateText}>No lands added yet</Text>
                        <Text style={styles.emptyStateSubText}>
                            Click "Add New Land" to add your first land
                        </Text>
                    </View>
                ) : (
                    lands.map((land) => (
                        <TouchableOpacity
                            key={land.id}
                            style={styles.landCard}
                            onPress={() => handleLandPress(land)}
                        >
                            <Image
                                source={land.photo === 'default_land_photo'
                                    ? require('../E-LoanNew/TempImgs/temp.png')
                                    : { uri: land.photo }}
                                style={styles.landImage}
                            />
                            <View style={styles.landInfo}>
                                <Text style={styles.landName}>{land.name}</Text>
                                <Text style={styles.landSize}>Size: {land.size} acres</Text>
                            </View>
                        </TouchableOpacity>
                    ))
                )}
            </ScrollView>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Add New Land</Text>

                        <TouchableOpacity
                            style={styles.imageUploadContainer}
                            onPress={handleImagePick}
                        >
                            {newLand.photo ? (
                                <Image
                                    source={{ uri: newLand.photo }}
                                    style={styles.uploadedImage}
                                />
                            ) : (
                                <View style={styles.imagePlaceholder}>
                                    <Text style={styles.imagePlaceholderText}>
                                        Tap to add land photo
                                    </Text>
                                </View>
                            )}
                        </TouchableOpacity>

                        <TextInput
                            style={styles.input}
                            placeholder="Land Name"
                            value={newLand.name}
                            onChangeText={(text) => setNewLand({ ...newLand, name: text })}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Land Size (acres)"
                            value={newLand.size}
                            onChangeText={(text) => setNewLand({ ...newLand, size: text })}
                            keyboardType="numeric"
                        />

                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.modalButton, styles.saveButton]}
                                onPress={saveLand}
                            >
                                <Text style={styles.buttonText}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    headerButtons: {
        flexDirection: 'row',
        gap: 8,
    },
    button: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 4,
    },
    navbarContainer: {
        height: hp('8.5%'),
        backgroundColor: colors.WHITE,
        borderBottomWidth: 1,
        borderBottomColor: colors.LIGHT_GRAY,
    },
    resetButton: {
        backgroundColor: '#FF5252',
    },
    addButton: {
        backgroundColor: '#4CAF50',
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333333',
    },
    landsContainer: {
        flex: 1,
        padding: 16,
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
    },
    emptyStateText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#666666',
        marginBottom: 8,
    },
    emptyStateSubText: {
        fontSize: 14,
        color: '#999999',
        textAlign: 'center',
    },
    landCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        marginBottom: 16,
        overflow: 'hidden',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    landImage: {
        width: '100%',
        height: 150,
        resizeMode: 'cover',
    },
    landInfo: {
        padding: 16,
    },
    landName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 8,
    },
    landSize: {
        fontSize: 16,
        color: '#666666',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 24,
        width: '90%',
        maxWidth: 400,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: colors.GREEN,
    },
    imageUploadContainer: {
        marginBottom: 16,
        borderRadius: 8,
        overflow: 'hidden',
    },
    uploadedImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    imagePlaceholder: {
        width: '100%',
        height: 200,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderStyle: 'dashed',
        borderRadius: 8,
    },
    imagePlaceholderText: {
        color: '#666666',
        fontSize: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 4,
        padding: 12,
        marginBottom: 16,
        fontSize: 16,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 16,
    },
    modalButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 4,
        marginLeft: 8,
    },
    cancelButton: {
        backgroundColor: '#E0E0E0',
    },
    saveButton: {
        backgroundColor: '#4CAF50',
    },
});

export default ELoanNewLand; 