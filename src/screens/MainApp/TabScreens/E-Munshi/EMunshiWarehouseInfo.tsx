import React, { useState, useEffect } from "react";
import EWarehouse from "../../../../../util/E-WarehouseProducts.js";
import Navbar from "../../Navbar/Navbar.jsx";
import CustomSearchApp from "../../CustomComponent/CustomSearchApp.jsx";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import colors from "../../../../../util/colors.js";
import { EInventoryDet } from "../../../../../util/E-Inventory.js";
import EInventoryBoxes from "../../CustomComponent/EInventoryBoxes.jsx";
import warehouseImg from "../../../../assets/warehouse.png";
import WarehouseProduct from "../../CustomComponent/WarehouseProduct.jsx";

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { useTranslation } from "react-i18next";
import { fonts } from "../../../../../util/FontName.js";
import ScreensName from "../../../../../util/ScreensName.ts";
import { LineChart } from "react-native-chart-kit";
import { MMKV } from 'react-native-mmkv';

const chartConfig = {
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  propsForDots: {
    r: "4",
    strokeWidth: "2",
    stroke: colors.GREEN,
  },
  
};

function EMunshiWarehouseInfo(): React.JSX.Element {
  const { t } = useTranslation();
  const storage = new MMKV();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    "Seeds"
  );
  const [selectedSubcategories, setSelectedSubcategories] = useState<any[]>([]);
  const [warehouse, setWarehouse] = useState<string | null>(null);
  const [lineData, setLineData] = useState({
    labels: ["Jan", "Mar", "May", "Jul", "Sept", "Dec"],
    datasets: [
      {
        data: [400, 550, 600, 800, 1100, 500, 700],
        color: (opacity = 1) => `rgba(0, 169, 128, ${opacity})`, // Your preferred button color
        strokeWidth: 2,
      },
    ],
  });
  // Fetch warehouse name from AsyncStorage
  useEffect(() => {
    const fetchWarehouse = async () => {
      const storedWarehouse = storage.getString("warehouse");

      if (storedWarehouse) {
        setWarehouse(storedWarehouse);

        let newData: number[];
        switch (storedWarehouse) {
          case "Khairpur Warehouse": // Oscillating wave-like pattern
            newData = [450, 700, 600, 900, 800, 1100, 500];
            break;
          case "Kotri Warehouse": // Sharp rise and fall
            newData = [400, 600, 900, 1100, 700, 500, 800];
            break;
          case "Umerkot Warehouse": // Gradual rise
            newData = [400, 500, 600, 700, 800, 900, 1000];
            break;
          case "Lasbela Warehouse": // Sudden peak in the middle
            newData = [500, 600, 700, 1100, 700, 600, 500];
            break;
          case "Sialkot Warehouse": // Random high-low fluctuations
            newData = [600, 800, 500, 1100, 900, 400, 700];
            break;
          default:
            newData = [400, 550, 600, 800, 1100, 500, 700]; // Default case
        }
        // Create a fresh dataset without mutating state
        setLineData((prevData) => ({
          ...prevData,
          datasets: [
            {
              ...prevData.datasets[0],
              data: newData,
            },
          ],
        }));
      } else {
        setWarehouse(t("No Warehouse Found"));
      }
    };

    fetchWarehouse();
  }, [t]);

  // Find the selected category data from EWarehouse
  const selectedCategoryData = selectedCategory
    ? EWarehouse.find((cat) => cat.title === selectedCategory)
    : { subcategories: EWarehouse.flatMap((cat) => cat.subcategories) };

  // Handle category selection
  const handleCategoryPress = (category: any) => {
    setSelectedCategory(category.title);
    setSelectedSubcategories(category.subcategories || []);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Navbar */}
      <View style={styles.navbarContainer}>
        <Navbar />
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.bodyContainer}>
          <View style={styles.scrollContainer}>
            {/* Warehouse Overview */}
            <View style={styles.itemBoxWrapper}>
              <EInventoryBoxes
                name={warehouse}
                SourceGiven={warehouseImg}
                isNavigation={0}
                w={wp("80%")}
                h={hp("18%")}
              />

              <View style={styles.linechartcontainer}>
                <LineChart
                  data={lineData}
                  width={wp("85%")}
                  height={hp("25%")}
                  yAxisLabel="PKR"
                  chartConfig={chartConfig}
                  bezier
                  style={styles.chartStyle}
                />
              </View>

            </View>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{t("Search Available Items")}</Text>
        </View>
        <View style={styles.searchContainer}>
          <CustomSearchApp placeholder={t("Search in here")} />
        </View>

        {/* Category Selection */}
        <View style={styles.catScrollContainer}>
          {EWarehouse.map(
            (Warehouse, index) =>
              Warehouse.title.trim() !== "" && (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.smallBoxWrapper,
                    selectedCategory === Warehouse.title &&
                    styles.selectedCategory,
                    { padding: hp(2) },
                  ]}
                  onPress={() => handleCategoryPress(Warehouse)}
                  activeOpacity={0.7}
                >
                  <Image
                    source={Warehouse.img}
                    style={[
                      styles.ImageStyle,
                      { width: wp("6%"), height: hp("5%") },
                    ]}
                  />
                  <Text style={styles.TextStyle}>{t(Warehouse.title)}</Text>
                </TouchableOpacity>
              )
          )}
        </View>

        {/* Selected Category Details */}
        <View style={styles.recommendedProducts}>
          {selectedSubcategories.length > 0 ? (
            <View style={styles.subcategoryList}>
              {selectedSubcategories.map((subcategory, index) => (
                <WarehouseProduct
                  key={index}
                  name={subcategory.name}
                  isNavigation={1}
                  navigateTo={ScreensName.EMunshiItemName}
                />
              ))}
            </View>
          ) : (
            <View style={styles.subcategoryList}>
              {selectedCategoryData?.subcategories?.map(
                (subcategory, index) => (
                  <WarehouseProduct
                    key={index}
                    name={subcategory.name}
                    isNavigation={1}
                    navigateTo={ScreensName.EMunshiItemName}
                  />
                )
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  navbarContainer: {
    height: hp("8.5%"),
    backgroundColor: colors.WHITE,
  },
  searchContainer: {
    height: hp("7%"),
    marginTop: hp(1),
  },
  bodyContainer: {
    alignItems: "center",
  },
  selectedCategory: {
    borderRadius: hp(2),
    borderWidth: hp(0.5)
  },
  titleContainer: {
    padding: 10,
    marginTop: hp(1),
  },
  titleText: {
    fontWeight: "bold",
    fontSize: hp("3%"),
    marginLeft: wp(5),
  },
  chartStyle: {
    marginVertical: 8,
    borderRadius: 10,
    width: wp(85),
  },
  catScrollContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginLeft: wp(2),
    gap: wp(2),
  },
  noSubcategoriesText: {
    fontSize: hp("2%"),
    color: colors.BLACK,
    textAlign: "center",
    marginVertical: hp(1),
  },
  TextStyle: {
    fontFamily: fonts.Regular,
    fontSize: hp(1.05),
  },
  ImageStyle: {
    resizeMode: "contain",
  },
  smallBoxWrapper: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: colors.WHITE,
    borderColor: colors.GREEN,
    width: wp(22),
    height: hp(9),
  },
  itemBoxWrapper: {
    marginTop: hp(2),
  },
  linechartcontainer: {
    marginTop: hp(1),
  },
  subcategoryList: {
    marginTop: hp(1),
  },
  recommendedProducts: {
    marginTop: hp(1),
    alignSelf: 'center',
    marginBottom: hp(1),
  },
});

export default EMunshiWarehouseInfo;
