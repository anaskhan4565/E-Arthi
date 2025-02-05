import { StyleSheet, Text, View, ScrollView, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import Navbar from '../../Navbar/Navbar';
import CustomSearchApp from '../../CustomComponent/CustomSearchApp';
import { useTranslation } from 'react-i18next';
import colors from '../../../../../util/colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { fonts } from '../../../../../util/FontName';
import Pen from '../../../../assets/MainApp/E-Inventory/E-Inventory-ManageGroup/Pen.png'
import Demo from '../../../../assets/MainApp/E-Inventory/E-Inventory-Monitoring/blank.png'
import CustomGroupComponent from '../../CustomComponent/InventoryComponents/ManageGroup/CustomGroupComponent';
const EInventoryManageGroup = () => {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navbarContainer}>
        <Navbar />
      </View>
      <View style={{ flex: 1, marginHorizontal: hp(3) }}>
        <View style={{ marginTop: hp(3.2) }}>
          <CustomSearchApp placeholder={t('Search In Here')} />
        </View>
        <ScrollView style={{ flex: 1, marginTop: hp(2) }}>
          <View>
            <Text style={{ fontSize: wp('5.4%'), fontFamily: fonts.Bold, color: colors.BLACK }}>{t("Manage Groups")}</Text>
          </View>
          {/* Item Container */}
          <CustomGroupComponent MainHeading={"Seeds"} typ1={"Green Seeds"} typ2={"Yellow Seeds"} typ3={"ABC Seeds"} val1={"1290"} val2={"1360"} val3={"1450"} />
          <CustomGroupComponent MainHeading={"Fertilizer"} typ1={"Fertilizer AB"} typ2={"Fertilizer Bf"} typ3={"Fertilizer Df"} val1={"40"} val2={"20"} val3={"40"} />
          <CustomGroupComponent MainHeading={"Machinery"} typ1={"Machine1"} typ2={"Machine2"} typ3={"Machine3"} val1={"1290"} val2={"1360"} val3={"1450"} />

        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default EInventoryManageGroup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  navbarContainer: {
    height: hp('8.2%'),
    backgroundColor: 'white',
    marginTop: hp('0.14%'),
  },
})