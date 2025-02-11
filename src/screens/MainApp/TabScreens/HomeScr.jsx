import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import Navbar from '../Navbar/Navbar.jsx';
import CustomSearchApp from '../CustomComponent/CustomSearchApp.jsx';
import colors from '../../../../util/colors.js';
import ItemBox from '../CustomComponent/ItemBox.jsx';
// import Heart from '../../../assets/MainApp/HomeScreen/Heart.png';
import allNames from '../../../../util/E-Offerings.js';
import ProductBox from '../CustomComponent/ProductBox.jsx';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useTranslation } from 'react-i18next';


//Need to edit this later, passing images literl
import Image1 from '../../../assets/MainApp/EmarketPlace/Products/prod1.png'
import Image2 from '../../../assets/MainApp/EmarketPlace/Products/prod2.png'
import { fonts } from '../../../../util/FontName.js';

const Home = () => {
  const { t } = useTranslation()
const JustADemoPreview=()=>{
  console.log("Add the logic for prices here")
}
  return (
    <View style={{ flex: 1, backgroundColor: colors.WHITE }}>
      <View style={styles.navbarContainer}>
        <Navbar />
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingTop: hp('8%') }}>
        <View style={styles.contentContainer}>
          <View style={styles.searchContainer}>
            <CustomSearchApp placeholder={t('Search in here')} />
          </View>

          <View style={styles.bodyContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>{t('Welcome!')}</Text>
            </View>
            <View style={styles.scrollContainerMain}>

              <View style={styles.scrollContainer}>
                {allNames.map((data, index) => (
                  data.name.trim() !== '' && (
                    <View style={styles.itemBoxWrapper} key={index}>
                      <ItemBox name={t(data.name)} SourceGiven={data.source} isNavigation={true} screen={data.screen} />
                    </View>
                  )
                ))}
              </View>
              </View>

              {/* Section for Recommended Products */}
              <View style={styles.recommendedProducts}>
                <Text style={styles.recommendedTitle}>{t('Recommended Products')}</Text>
                <View style={styles.productRow}>
                  <ProductBox name={"Agri-Protex"} AddIcon={false}  price={"2050"} save={"1000"} SourceGiven={Image1} old={"3060"} />
                  <ProductBox name={"Agri-Protex"} AddIcon={false} price={"2050"} save={"1000"} SourceGiven={Image2} old={"3060"} />
                </View>
                <View style={styles.productRow}>
                  <ProductBox name={"Agri-Protex"} AddIcon={false} price={"2050"} save={"1000"} SourceGiven={Image1} old={"3060"} />
                  <ProductBox name={"Agri-Protex"} AddIcon={false} price={"2050"} save={"1000"} SourceGiven={Image2} old={"3060"} />
                </View>
              </View>
            </View>
          </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  navbarContainer: {
    height: hp('8.5%'),
    backgroundColor: 'white',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },

  searchContainer: {
    marginVertical: hp('3%'),
    height: hp('7%'),
    alignSelf: "flex-start"
  },
  contentContainer: {
    flex: 1,
    //marginTop: 10,
  },

  bodyContainer: {
    flex: 1,
    margin: hp('1%'),
  },
  titleContainer: {
    padding: hp('1%'),
  },
  titleText: {
    fontFamily: fonts.SemiBold,
    fontSize: hp('4%'),
  },
  scrollContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start', // Align items to the start
    alignContent: 'center', // Ensure items align under each other
    alignItems: 'center',
    alignSelf: 'center'

  },
  scrollContainerMain:{

    paddingLeft:hp(1)
},
  itemBoxWrapper: {
    width: wp('30%'),
    marginBottom: hp('2%'),
    alignItems: 'center',
  },
  recommendedProducts: {
    marginTop: hp('2%'),
    margin: 10,

  },
  recommendedTitle: {
    fontSize: hp('2.5%'),
    fontFamily: fonts.SemiBold,
    marginBottom: hp('2%'),
  },
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('3%'),
  },
});
