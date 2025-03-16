import React from "react";
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
import { fonts } from "../../../../../util/Constants/FontName";
import { DeliveryHist } from "../../../../../util/Data/E-Transport";
import Navbar from "../../Navbar/Navbar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import colors from "../../../../../util/Constants/colors";
import CustomSearchApp from "../../CustomComponent/CustomSearchApp";



function ETransportDeliveryHistory(): React.JSX.Element {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navbarContainer}>
        <Navbar />
      </View>
      <View style={{ flex: 7 }}>
        <View style={styles.searchbar}>
          <CustomSearchApp placeholder={"Search in here"} />
        </View>
        <View style={{ marginBottom: hp(1.2), marginTop: hp(0), marginHorizontal: wp(5), }}>
          <Text style={{ fontFamily: fonts.SemiBold, fontSize: hp(2.4) }}>
            {t('Delivery History')}
          </Text>
        </View>
        <View style={styles.Header}>
          <Text style={styles.HeaderCol}>{t('Item')} {'\n'}{t('Description')} {'\n'}{t('& Qty')}</Text>
          <Text style={[styles.HeaderCol, { textAlign: "center" }]}>{t('Cost')}</Text>
          <Text style={styles.HeaderCol}>{t('Date Order Placed')}</Text>
        </View>
        {DeliveryHist.map(
          (data, index) =>
            data.desc.trim() !== "" && (
              <View style={styles.row} key={index}>
                <View style={styles.decsAndQty}>
                  <Text style={styles.decs}>{t(data.desc)}</Text>
                  <Text style={styles.decs}>{data.qty}</Text>
                </View>
                <Text style={styles.cost}>{data.cost}</Text>
                <Text style={styles.date}>{data.date}</Text>
              </View>
            )
        )}
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  navbarContainer: {
    height: hp(8.5),
    backgroundColor: colors.WHITE,
  },
  container: {
    flex: 1,

    backgroundColor: colors.WHITE,
  },
  searchbar: {
    marginTop: hp(1.3),
    height: hp('7%'),

  },
  Header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: wp(4),
    height: hp(10)
  },
  HeaderCol: {
    fontFamily: fonts.SemiBold,
    fontSize: hp(2),
    width: wp(29),
    textAlign: "left"

  },
  cost: {
    fontFamily: fonts.Regular,
    fontSize: hp(1.8),
    textAlign: "center",
    width: wp(33),
  },
  date: {
    fontFamily: fonts.Regular,
    fontSize: hp(1.8),
    width: wp(30)
  },
  decs: {
    fontFamily: fonts.Regular,
    fontSize: hp(1.8),
  },
  decsAndQty: {
    alignContent: "center",
    width: wp(30),
    fontFamily: fonts.Regular,
    fontSize: hp(1.8),

  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: wp(4),

  },
});

export default ETransportDeliveryHistory;
