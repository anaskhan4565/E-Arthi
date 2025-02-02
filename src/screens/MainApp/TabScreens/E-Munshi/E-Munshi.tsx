import React from "react";
import { TouchableOpacity, Image } from "react-native";

import Navbar from "../../Navbar/Navbar.jsx";
import CustomSearchApp from "../../CustomComponent/CustomSearchApp.jsx";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import colors from "../../../../../util/colors.js";
import EInventoryBoxes from "../../CustomComponent/EInventoryBoxes.jsx";
import { ETransportMaindet } from "../../../../../util/E-Transport.js";

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { useTranslation } from "react-i18next";
import { fonts } from "../../../../../util/FontName.js";
import ScreensName from "../../../../../util/ScreensName.ts";
import CustomButton from "../../../../components/CustomButton.jsx";
import MyPieChart from "../../../../screens/MainApp/TabScreens/E-Loan/CustomComponents/PiChart.jsx";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';


const warehouseData = [
  { name: "Khairpur Warehouse", value: 25, color: "#AFDC8F" },
  { name: "Kotri Warehouse", value: 20, color: "#0066CC" },
  { name: "Umerkot Warehouse", value: 15, color: "#5E40BE" },
  { name: "Lasbela Warehouse", value: 30, color: "#CA6C0F" },
  { name: "Sialkot Warehouse", value: 10, color: "#204D00" },
];
 
function EMunshi(): React.JSX.Element {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const handleNavigation = async (name: string) => {
    try {
      console.log("Storing name in AsyncStorage:", name);
      await AsyncStorage.setItem('warehouse', name);
      console.log("Stored successfully");
      navigation.navigate(ScreensName.EMunshiWarehouseInfo);
    } catch (error) {
      console.error("Error saving to AsyncStorage:", error);
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navbarContainer}>
        <Navbar />
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.searchContainer}>
          <CustomSearchApp placeholder={t("Search in here")} />
        </View>
        <View style={{ marginHorizontal: hp(1) }}>
          <Text
            style={{
              fontSize: hp(3.5),
              fontFamily: fonts.SemiBold,
              marginLeft: hp(2),
            }}
          >
            E-Munshi
          </Text>
        </View>
        <View style={styles.bodyContainer}>
          <View style={styles.chartContainer}>
            <MyPieChart
              data={warehouseData}
              containerWidth={wp(85)}
              containerHeight={hp(35)}
            //   chartHeight={hp(20)}
            //   chartWidth={wp(40)}
            />
            <View style={styles.legendContainer}></View>
          </View>
          <Text style={styles.subsectionTitle}>Select Warehouse</Text>
          {warehouseData.map((warehouse, index) => (
            <TouchableOpacity
              key={index}
              style={styles.warehouseBox}
              onPress={() => {
                handleNavigation(warehouse.name)
              }}
            >
              <Text style={styles.warehouseLabel}>{warehouse.name}</Text>
              <View style={styles.percentageContainer}>
                <Text style={styles.warehousePercentage}>
                  {warehouse.value}%
                </Text>
                <Image
                  source={require("../../../../assets/MainApp/E-Munshi/chevron-right-solid.png")}
                  style={styles.arrowImage}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: colors.WHITE,
  },
  navbarContainer: {
    height: hp("8.2%"),
    backgroundColor: "white",
    marginTop: hp("0.14%"),
  },
  searchContainer: {
    marginTop: hp("3.2%"),
    height: hp("7%"),
    alignSelf: "flex-start",
    marginLeft: hp(1),
  },
  bodyContainer: {
    alignItems: "flex-start",
    marginHorizontal: hp(3),
  },
  titleContainer: {
    padding: 10,
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 25,
    fontFamily: "Poppins",
  },
  scrollContainer: {
    flexWrap: "wrap",
    justifyContent: "center",
    paddingVertical: hp("2%"),
    // backgroundColor: 'red',
    alignItems: "center",
  },
  itemBoxWrapper: {
    width: "30%",
    marginBottom: hp("2%"),
    marginHorizontal: wp("-3%"),
    alignItems: "center",
  },
  recommendedProducts: {
    marginTop: 20,
  },
  recommendedTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  productRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  subsectionTitle: {
    fontSize: hp(2),
    fontFamily: "Poppins Bold",
    marginBottom: hp(2),
    textAlign: "center",
  },
  chartContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  legendContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp(2),
    marginBottom: hp(2),
    backgroundColor: "#F8F6F6",
    borderRadius: hp(2),
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: hp(0.5),
    width: "50%",
    justifyContent: "center",
  },
  colorBox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: hp(1),
  },
  legendText: {
    fontSize: hp(2),
    color: "#7F7F7F",
  },
  warehouseBox: {
    backgroundColor: colors.WHITE,
    padding: hp(2),
    marginVertical: hp(1),
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 5,
    elevation: 2, // Optional: for shadow effect on Android
  },
  warehouseLabel: {
    color: "black",
    fontSize: hp(2),
    fontFamily: "Poppins",
  },
  warehousePercentage: {
    color: colors.PRIMARY,
    fontSize: hp(2),
    fontFamily: "Poppins",
  },
  percentageContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  arrowImage: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    marginLeft: hp(1),
  },
});

export default EMunshi;
