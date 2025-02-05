import { StyleSheet, Text, View, ScrollView,SafeAreaView } from 'react-native';
import React from 'react';
import Navbar from '../../Navbar/Navbar.jsx';
import CustomSearchApp from '../../CustomComponent/CustomSearchApp.jsx';
import colors from '../../../../../util/colors.js';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useTranslation } from 'react-i18next';
import { fonts } from '../../../../../util/FontName.js';


const EOrderHistory = () => {
  const { t } = useTranslation()
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
            fontFamily: fonts.ExtraBold,
            marginLeft: hp(2),
            letterSpacing: hp(0.6),
          }}
        >
          E-Inventory
        </Text>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.scrollContainer}>
        </View>
      </View>
    </ScrollView>
  </SafeAreaView>
  );
};

export default EOrderHistory;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems: 'center',
    //justifyContent: 'center',
    backgroundColor: colors.WHITE,
  },
  navbarContainer: {
    height: hp("8.5%"),
    backgroundColor: colors.WHITE,
  },
  searchContainer: {
    marginTop: hp("3.2%"),
    height: hp("7%"),
    marginLeft: hp(1),
    alignSelf: "flex-start",
  },
  bodyContainer: {
    alignItems: "flex-start",
  },
  titleContainer: {
    padding: 10,
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 25,
  },
  scrollContainer: {
    //flexWrap: 'wrap',
    justifyContent: "center",
    paddingVertical: hp("2%"),
    // backgroundColor: 'red',
    alignSelf: "center",
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
});