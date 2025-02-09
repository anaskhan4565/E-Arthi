import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import Navbar from "../../Navbar/Navbar";
import CustomSearchApp from "../../CustomComponent/CustomSearchApp";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import colors from "../../../../../util/colors";

const FoodSurveillanceItem = () => {
  const { t } = useTranslation();
  const [price, setPrice] = useState("");

  const handlePriceUpdate = () => {
    console.log(`New price set: ${price} Rupees/Kg`);

  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Navbar */}
      <View style={styles.navbarContainer}>
        <Navbar />
      </View>

      <ScrollView style={{ flex: 1 }}>

        <View style={styles.searchbar}>
          <CustomSearchApp placeholder={"Search in here"} />
        </View>

     
        <View style={styles.headerRow}>
          <Text style={styles.productTitle}>Tomato</Text>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>About to be ripe</Text>
          </View>
        </View>

       
        <View style={styles.imageContainer}>
          <View style={styles.imagePlaceholder} />
          <Text style={styles.imageDate}>Image updated on: 08-02-2025</Text>
        </View>

    
        <View style={styles.detailsContainer}>
          <Text style={styles.detailText}>
            <Text style={styles.boldText}>Quantity:</Text> 1 Kg
          </Text>
          <Text style={styles.detailText}>
            <Text style={styles.boldText}>Temperature:</Text> 14°C
          </Text>
          <Text style={styles.detailText}>
            <Text style={styles.boldText}>Humidity Level:</Text> 90%
          </Text>
          <Text style={styles.detailText}>
            <Text style={styles.boldText}>Estimated date when fully ripe:</Text> 10-02-2025
          </Text>
          <Text style={styles.detailText}>
            <Text style={styles.boldText}>Current Price:</Text> 100 Rupees/Kg
          </Text>
        </View>

        <View style={styles.priceUpdateContainer}>
          <Text style={styles.updateTitle}>Update Price</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.priceInput}
              placeholder="Enter new price"
              keyboardType="numeric"
              value={price}
              onChangeText={setPrice}
            />
            <Text style={styles.unitText}>Rupees/Kg</Text>
          </View>
          <TouchableOpacity style={styles.saveButton} onPress={handlePriceUpdate}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FoodSurveillanceItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  navbarContainer: {
    height: hp(8.5),
    backgroundColor: colors.WHITE,
  },
  searchbar: {
    marginTop: hp(1.3),
    height: hp("7%"),
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: wp(4),
    marginTop: hp(2),
  },
  productTitle: {
    fontSize: hp(3),
    fontWeight: "bold",
    color: colors.BLACK,
  },
  statusBadge: {
    backgroundColor: "#EBA928",
    paddingVertical: hp(0.5),
    paddingHorizontal: wp(3),
    borderRadius: wp(2),
  },
  statusText: {
    fontSize: hp(1.8),
    fontWeight: "bold",
    color: colors.WHITE,
  },
  imageContainer: {
    alignItems: "center",
    marginVertical: hp(2),
  },
  imagePlaceholder: {
    width: wp(40),
    height: wp(40),
    backgroundColor: "#D3D3D3",
    borderRadius: wp(2),
    borderWidth: 2,
    borderColor: colors.PRIMARY,
  },
  imageDate: {
    marginTop: hp(1),
    fontSize: hp(1.6),
    color: colors.GRAY,
  },
  detailsContainer: {
    marginHorizontal: wp(4),
  },
  detailText: {
    fontSize: hp(2),
    color: colors.BLACK,
    marginBottom: hp(1),
  },
  boldText: {
    fontWeight: "bold",
  },
  priceUpdateContainer: {
    backgroundColor: "#F3FFFC",
    padding: wp(4),
    borderRadius: wp(2),
    marginHorizontal: wp(4),
    marginVertical: hp(2),
  },
  updateTitle: {
    fontSize: hp(2.2),
    fontWeight: "bold",
    marginBottom: hp(1),
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  priceInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.GRAY,
    borderRadius: wp(2),
    paddingHorizontal: wp(2),
    fontSize: hp(2),
    height: hp(5),
    backgroundColor: colors.WHITE,
  },
  unitText: {
    marginLeft: wp(2),
    fontSize: hp(2),
  },
  saveButton: {
    backgroundColor: colors.PRIMARY,
    paddingVertical: hp(1.5),
    borderRadius: wp(2),
    alignItems: "center",
    marginTop: hp(2),
  },
  saveButtonText: {
    color: colors.WHITE,
    fontSize: hp(2.2),
    fontWeight: "bold",
  },
});
