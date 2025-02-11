import { ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import colors from '../../../../../util/colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomImageButton from '../../CustomComponent/CustomImageButton'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ScreensName from '../../../../../util/ScreensName'
import Back from "../../../../assets/MainApp/Sidebar/Back.png";
import Bell from "../../../../assets/MainApp/HomeScreen/Bell.png";
import CustomButton from '../../../../components/CustomButton'
import { fonts } from '../../../../../util/FontName'
import CustomBottomSheetExport from '../CustomComp/CustomBottomSheet'
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native'
import MandiNavbar from '../CustomComp/MandiNavbar'
import CustomNavigationMandi from '../CustomComp/CustomNavigation'
import { useTranslation } from 'react-i18next'
const Profile = () => {
  const { t } = useTranslation();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.WHITE }}>
      <MandiNavbar/>

      <View style={{ height:hp(15) }} >
      <CustomNavigationMandi/>

      </View>
      <ScrollView style={{marginBottom:hp(13)}}>

        <View style={{ flex: 1 }}>
          <View style={{ flex: 0.4 }}>
            <View style={{ flex: 0.15, justifyContent: 'center', backgroundColor: colors.GREEN }}>
              <Text style={{ fontWeight: 'bold', fontSize: hp(2.5), color: colors.WHITE, marginHorizontal: hp(1) }}>{t('Description')}</Text>
            </View>
            <ScrollView style={{ flex: 0.9 }}>
              <Text style={{ fontSize: hp(2), margin: hp(1) }}>{t("These potatoes are uniform in shape, free from cracks, sprouts, or discoloration, and their earthy aroma speaks of their wholesome origins. Cultivated with care, they grow underground, absorbing essential nutrients, while their lush green foliage aboveground captures sunlight to fuel the process. With the right conditions—cool climates, consistent watering, and proper spacing—they flourish into the ideal harvest, a testament to nature's bounty.")}</Text>
            </ScrollView>
          </View>
          {/* Contact INfo */}
          <View style={{ flex: 0.4, borderWidth: hp(0.1) }}>
            <View style={{ flex: 0.2, justifyContent: 'center', backgroundColor: colors.GREEN }}>
              <Text style={{ fontWeight: 'bold', fontSize: hp(2.5), color: colors.WHITE, marginHorizontal: hp(1) }}>{t('Contact Info')}</Text>
            </View>
            <View style={{ flex: 0.9 }}>
              <View style={{ flex: 0.4, flexDirection: 'row' }}>
                <View style={{ flex: 0.4, flexDirection: 'row', alignItems: 'center' }}>
                  <Icon name="stepforward" size={50} color="#900" />
                  <Text style={{ fontSize: hp(1.9), fontWeight: 'bold' }}>{t('Address')}</Text>
                </View>
                <View style={{ flex: 0.6, justifyContent: 'center' }}>
                  <Text style={{ fontSize: hp(2) }}>{t('BOP Tower,10-B Block-4 Main Mandi Khairpur')}</Text>
                </View>
              </View>
              <View style={{ flex: 0.3, flexDirection: 'row', borderTopWidth: hp(0.1) }}>
                <View style={{ flex: 0.4, flexDirection: 'row', alignItems: 'center' }}>
                  <Icon name="stepforward" size={50} color="#900" />
                  <Text style={{ fontSize: hp(1.9), fontWeight: 'bold', textAlign: 'center' }}>{t('Phone')}</Text>
                </View>
              </View>
              <View style={{ flex: 0.4, flexDirection: 'row', borderTopWidth: hp(0.1), alignItems: 'center' }}>
                <View style={{ flex: 0.4, flexDirection: 'row', alignItems: 'center' }}>
                  {/* <Icon name="stepforward" size={50} color="#900" /> */}
                  <Icon name="stepforward" size={50} color="#900" />
                  <Text style={{ fontSize: hp(1.9), fontWeight: 'bold' }}>{t('Web')}</Text>
                </View>
                <View style={{ flex: 0.6, }}>
                  <Text style={{ fontSize: hp(2), color: colors.DARK_GREEN, textDecorationLine: 'underline' }}>Http://https://elixirflare.com</Text>
                </View>
              </View>


            </View>

          </View>
        </View>
        <View style={{ flex: 1, marginVertical: hp(3) }}>
          <View style={{ flex: 0.4 }}>
            <View style={{ flex: 0.15, justifyContent: 'center', backgroundColor: colors.GREEN }}>
              <Text style={{ fontWeight: 'bold', fontSize: hp(2.5), color: colors.WHITE, marginHorizontal: hp(1) }}>{t('Equity Profile')}</Text>
            </View>
            <View style={{ flex: 0.9 }}>
              <View style={{ flex: 0.4, flexDirection: 'row' }}>
                <View style={{ flex: 0.4, flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ fontSize: hp(1.9), fontWeight: 'bold' }}>{t('Authorized Capital')}</Text>
                </View>

              </View>
              <View style={{ flex: 0.3, flexDirection: 'row', borderTopWidth: hp(0.1), alignItems: 'center' }}>
                <View style={{ flex: 0.4, flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ fontSize: hp(1.9), fontWeight: 'bold', textAlign: 'center' }}>{t('Paid Up Capital')}</Text>
                </View>
              </View>
              <View style={{ flex: 0.4, flexDirection: 'row', borderTopWidth: hp(0.1), alignItems: 'center' }}>
                <View style={{ flex: 0.4, flexDirection: 'row', alignItems: 'center' }}>
                  {/* <Icon name="stepforward" size={50} color="#900" /> */}
                  <Text style={{ fontSize: hp(1.9), fontWeight: 'bold' }}>{t('Free Float Shares')}</Text>
                </View>

              </View>
              <View style={{ flex: 0.4, flexDirection: 'row', borderTopWidth: hp(0.1), alignItems: 'center' }}>
                <View style={{ flex: 0.4, flexDirection: 'row', alignItems: 'center' }}>
                  {/* <Icon name="stepforward" size={50} color="#900" /> */}
                  <Text style={{ fontSize: hp(1.9), fontWeight: 'bold' }}>{t('%Free Float')}</Text>
                </View>

              </View>
              <View style={{ flex: 0.4, flexDirection: 'row', borderTopWidth: hp(0.1), alignItems: 'center' }}>
                <View style={{ flex: 0.4, flexDirection: 'row', alignItems: 'center' }}>
                  {/* <Icon name="stepforward" size={50} color="#900" /> */}
                  <Text style={{ fontSize: hp(1.9), fontWeight: 'bold', width: hp(20) }}>{t('Per Value/Share (PKR)')}</Text>
                </View>

              </View>

            </View>
          </View>

        </View>
      </ScrollView>
      <CustomBottomSheetExport />
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({
  header: {
    margin: hp("1.5%"),
    marginTop: hp("3%"),
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: colors.WHITE
  },
  Heading: {
    fontSize: hp("2.5%"),
    alignSelf: "center",
    fontFamily: fonts.SemiBold,
  }
}) 