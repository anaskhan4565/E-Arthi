import React, { useCallback, useEffect, useState } from 'react';
import Navbar from '../../Navbar/Navbar.jsx';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../../../../../util/colors.js';
import { Image } from 'react-native';
import {
  SafeAreaView,
  ScrollView,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { fonts } from '../../../../../util/FontName.js';
import ScreensName from '../../../../../util/ScreensName.ts';
import CustomButton from '../../../../components/CustomButton.jsx';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { MMKV } from 'react-native-mmkv';
import CustomTxtAndPicker from '../E-Loan/NewLoanComponents/CustomTxtAndPicker.jsx';
import CustomInput from '../../../../components/CustomInput.jsx';
import image from '../../../../assets/MainApp/E-Order/PaymentMethods/Raast.png'

function PaymentScreens(): React.JSX.Element {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [key, setKey] = useState(0);
  useFocusEffect(
    useCallback(() => {
      setKey(prevKey => prevKey + 1);
    }, [])
  );
  const storage = new MMKV();
  const savedCart = storage.getString("cart");
  const parsedCart = savedCart ? JSON.parse(savedCart) : [];
  const finalPrice = storage.getString("FinalPrice")
  const totalPrice = parsedCart.reduce((acc, product) => acc + parseInt(product.price.replace(/,/g, '')) * product.quantity, 0) * 1.13;
  const formatNumber = (num) => new Intl.NumberFormat("en-US").format(num ?? 0);
  const PassedPayment = new MMKV();


  const passedName = PassedPayment.getString("PassedName");
  const[passedImage,setPassedImage]=useState([])
const WhichImage: { [key: string]: any } = {
    "Raast": require("../../../../assets/MainApp/E-Order/PaymentMethods/Raast.png"),
    "Debit Card": require("../../../../assets/MainApp/E-Order/PaymentMethods/Debit.png"),
    "MasterCard": require("../../../../assets/MainApp/E-Order/PaymentMethods/Master.png"),
    "VISA": require("../../../../assets/MainApp/E-Order/PaymentMethods/VISA.png"),
    "Agri Card": require("../../../../assets/MainApp/E-Order/PaymentMethods/AgriCard.png"),
    "Kisaan Card": require("../../../../assets/MainApp/E-Order/PaymentMethods/KisaanCard.png"),
};

useEffect(()=>{
  setPassedImage(WhichImage[passedName])

},[passedImage])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navbarContainer}>
        <Navbar />
      </View>
      <ScrollView style={styles.container}>

        <View style={{ marginBottom: hp(1.2), marginTop: hp(1), marginHorizontal: wp(5), }}>
          <Text style={{ fontFamily: fonts.Bold, fontSize: hp(2.5), textAlign: 'center' }}>
            {t('Payment Through ')}{t(passedName)}
          </Text>
          <View style={{ marginVertical: hp(2) }}>
            <Image source={passedImage} style={{ width: hp(20), alignSelf: 'center', height: hp(14) }} />
          </View>
        </View>
        <View style={styles.bodyContainer}>

          {/* TAKING RAAST ID OR IBAN */}
          <View style={{ width: wp(85) }}>
            <Text style={{ fontFamily: fonts.SemiBold, fontSize: hp(2.2) }}>{passedName=="Raast"?"RAAST/":null}{t('IBAN')}</Text>
          </View>
          <View style={{ flexDirection: 'row', width: wp(85), alignItems: 'center' }}>
            <View style={styles.notesContainer}>
              <CustomInput placeholder={"03XXXXXXXXX/PKXXXXXXXXXXXXXXXXXXXXXXXX"} hide={false} />
            </View>
          </View>
          <View style={{ width: wp(85) }}>
            <Text style={{ fontFamily: fonts.SemiBold, fontSize: hp(1.3) }}>{t('Please use 11 digit mobile number or 24 digit IBAN number excluding special characters.')}</Text>
          </View>

          {/* SHOWING AMOUNT TO BE PAID */}
          <View style={{ width: wp(85) }}>
            <Text style={{ fontFamily: fonts.SemiBold, fontSize: hp(2.2), marginTop: hp(1) }}>{t('Amount')}</Text>
          </View>
          <View style={{ flexDirection: 'row', width: wp(85), alignItems: 'center' }}>
            <View style={styles.amountContainer}>
              <Text style={{ color: colors.DARK_GRAY, fontSize: hp(2), fontFamily: fonts.Regular }}>PKR {formatNumber(parseInt(finalPrice).toFixed(2))}</Text>
            </View>
          </View>

          {/* TRANSFER FROM */}
          <View style={{ width: wp(85), marginTop: hp(1) }}>
            <Text style={{ fontFamily: fonts.SemiBold, fontSize: hp(2.2) }}>{t('Transfer From')}</Text>
          </View>
          <View style={{ flexDirection: 'row', width: wp(85), alignItems: 'center' }}>
            <CustomTxtAndPicker PlaceHolderGiven={""} itemPackage={[{ label: "05280010078240790018", value: "05280010078240790018" }, { label: "08787810074240791358", value: "08787810074240791358" }]} Picker_Txt={"Select"} />
          </View>
          <View style={{ width: wp(85) }}>
            <Text style={{ fontFamily: fonts.SemiBold, fontSize: hp(1.2), textAlign: 'right' }}>{t('Balance: Rs. 90,571.32')}</Text>
          </View>

          {/* PURPOSE */}
          <View style={{ width: wp(85), marginTop: hp(1) }}>
            <Text style={{ fontFamily: fonts.SemiBold, fontSize: hp(2.2) }}>{t('Purpose')}</Text>
          </View>
          <View style={{ flexDirection: 'row', width: wp(85), alignItems: 'center' }}>
            <CustomTxtAndPicker PlaceHolderGiven={""} itemPackage={[{ label: "Agri Land", value: "Agri Land" }, { label: "Agri Tools", value: "Agri Tools" }, { label: "Agri Machinery", value: "Agri Machinery" }, { label: "Agri Fertilizers", value: "Agri Fertilizers" }, { label: "Agri Seeds", value: "Agri Seeds" }, { label: "Other", value: "Other" }]} Picker_Txt={"Select"} />
          </View>

          {/* NOTES SECTION */}
          <View style={{ flexDirection: 'row', width: wp(85), alignItems: 'center', marginTop: hp(1) }}>
            <View style={styles.newNotesContainer}>
              <Text style={{ fontFamily: fonts.SemiBold, fontSize: hp(2.2), marginBottom: hp(2) }}>{t('Notes')}</Text>
              <TextInput
                style={styles.notesInput}
                placeholder={t('Enter your notes here')}
                placeholderTextColor={colors.LIGHT_GRAY}
                multiline
                numberOfLines={4}
              />
            </View>
            <TouchableOpacity style={styles.notesButton}>
              <Image source={require('../../../../assets/MainApp/E-Order/Bucket.png')} />
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: hp(2), gap: 5 }}>
            <CustomButton MainText={t('Proceed')}
              BgGiven={totalPrice === 0 ? colors.GRAY : colors.GREEN}
              txColor={colors.WHITE}
              bordergiven={totalPrice === 0 ? colors.GRAY : colors.GREEN}
              isNavigation={totalPrice === 0 ? 0 : 1}
              isdisabled={totalPrice === 0 ? true : false}
              name={ScreensName.RaastConfirmPayment} />
            <CustomButton MainText={t('Cancel')} BgGiven={colors.WHITE} txColor={colors.GREEN} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  navbarContainer: {
    height: hp('8.2%'),
    backgroundColor: colors.LIGHT_GRAY,
    marginTop: hp('0.14%'),
    justifyContent: 'center',
    alignItems: 'center',
  },

  bodyContainer: {
    alignItems: 'center',
    marginBottom: hp(4),
    padding: wp(5),
  },

  newNotesContainer: {
    marginTop: hp(1),
    width: '85%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    // elevation: 5,
  },
  notesContainer: {
    marginLeft: hp(2.9),
    width: '85%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    // elevation: 5,
  },
  amountContainer: {
    width: '85%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    // elevation: 5,
  },
  notesInput: {
    height: hp(10),
    textAlignVertical: 'top',
    elevation: 5,
    backgroundColor: colors.WHITE,
    borderRadius: 5,
    color: colors.BLACK,
  },
  notesButton: {
    width: wp(10),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 5,
  },


});

export default PaymentScreens;