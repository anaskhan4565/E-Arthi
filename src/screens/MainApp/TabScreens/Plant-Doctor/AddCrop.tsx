import React, { useState } from "react";
import Navbar from "../../Navbar/Navbar.jsx";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import colors from "../../../../../util/Constants/colors.js";

import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
} from "react-native";
import { fonts } from "../../../../../util/Constants/FontName.js";
import { useNavigation } from "@react-navigation/native";

const cropsList = [
  { id: '1', name: 'Carrot', icon: require('../../../../assets/MainApp/PlantDoctor/carrot.png'), color: '#FF9B71' },
  { id: '2', name: 'Cabbage', icon: require('../../../../assets/MainApp/PlantDoctor/cabage.png'), color: '#7ED957' },
  { id: '3', name: 'Banana', icon: require('../../../../assets/MainApp/PlantDoctor/banana.png'), color: '#FFD93D' },
  { id: '4', name: 'Strawberry', icon: require('../../../../assets/MainApp/PlantDoctor/strawberry.png'), color: '#FF6B6B' },
];

const AddCrop = () => {
  const navigation = useNavigation();
  const [selectedCrops, setSelectedCrops] = useState<string[]>([]);

  const toggleCropSelection = (cropId: string) => {
    setSelectedCrops(prev => 
      prev.includes(cropId)
        ? prev.filter(id => id !== cropId)
        : [...prev, cropId]
    );
  };

  const handleSave = () => {
    // Handle saving selected crops
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navbarContainer}>
        <Navbar gobackOnly={true} />
      </View>
      
      <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Add More Crops</Text>
          <Text style={styles.subtitle}>Select the crops you are interested in:</Text>
        </View>

        <View style={styles.cropsGrid}>
          {Array(4).fill(cropsList).flat().map((crop, index) => (
            <TouchableOpacity
              key={`${crop.id}-${index}`}
              style={styles.cropItem}
              onPress={() => toggleCropSelection(crop.id)}
            >
              <View style={[styles.cropIconContainer]}>
                <Image source={crop.icon} style={styles.cropIcon} />
              </View>
              <Text style={styles.cropName}>{crop.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AddCrop;

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
  headerContainer: {
    paddingHorizontal: wp("5%"),
    marginTop: hp("2%"),
    marginBottom: hp("3%"),
  },
  title: {
    fontSize: hp("2.8%"),
    fontFamily: fonts.SemiBold,
    color: colors.BLACK,
    marginBottom: hp("1%"),
  },
  subtitle: {
    fontSize: hp("1.8%"),
    fontFamily: fonts.Regular,
    color: colors.GRAY,
  },
  cropsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: wp("5%"),
    justifyContent: 'space-between',
  },
  cropItem: {
    width: wp("20%"),
    alignItems: 'center',
    marginBottom: hp("3%"),
  },
  cropIconContainer: {
    width: wp("15%"),
    height: wp("15%"),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp("1%"),
  },
  cropIcon: {
    width: wp("15%"),
    height: wp("15  %"),
    resizeMode: 'contain',
  },
  cropName: {
    fontSize: hp("1.6%"),
    fontFamily: fonts.Regular,
    color: colors.BLACK,
    textAlign: 'center',
  },
  saveButton: {
    backgroundColor: colors.PRIMARY,
    marginHorizontal: wp("5%"),
    marginBottom: hp("2%"),
    padding: hp("2%"),
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: colors.WHITE,
    fontSize: hp("2%"),
    fontFamily: fonts.Medium,
  },
});