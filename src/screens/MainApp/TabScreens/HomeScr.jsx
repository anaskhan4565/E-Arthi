import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import Navbar from '../Navbar/Navbar.jsx';
import CustomSearchApp from '../CustomComponent/CustomSearchApp.jsx';
import colors from '../../../../util/colors.js';
import ItemBox from '../CustomComponent/ItemBox.jsx';
import Heart from '../../../assets/MainApp/HomeScreen/Heart.png';
import allNames from '../../../../util/E-Offerings.js';
import ProductBox from '../CustomComponent/ProductBox.jsx';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useTranslation } from 'react-i18next';


//Need to edit this later, passing images literl
import Image1 from '../../../assets/MainApp/EmarketPlace/Products/prod1.png'
import Image2 from '../../../assets/MainApp/EmarketPlace/Products/prod2.png'

const Home = () => {
    const {t}=useTranslation()
  
  return (
    <View style={{ flex: 1, backgroundColor: colors.WHITE }}>
      <View style={styles.navbarContainer}>
        <Navbar />
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingTop: hp('8%') }}> 
        <View style={styles.contentContainer}>
          <View style={styles.searchContainer}>
            <CustomSearchApp placeholder={'Search in here'} />
          </View>

          <View style={styles.bodyContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>E-Arthi-Offerings</Text>
            </View>

            <View style={styles.scrollContainer}>
              {allNames.map((name, index) => (
                name.trim() !== '' && (
                  <View style={styles.itemBoxWrapper} key={index}>
                    <ItemBox name={t(name)} SourceGiven={Heart} isNavigation={true} />
                  </View>
                )
              ))}
            </View>

            {/* Section for Recommended Products */}
            <View style={styles.recommendedProducts}>
              <Text style={styles.recommendedTitle}>Recommended Products</Text>
              <View style={styles.productRow}>
                <ProductBox name={"Agri-Protex"} price={"2050"} save={"1000"} SourceGiven={Image1} old={"3060"} />
                <ProductBox name={"Agri-Protex"} price={"2050"} save={"1000"} SourceGiven={Image2} old={"3060"}/>
              </View>
              <View style={styles.productRow}>
                <ProductBox name={"Agri-Protex"} price={"2050"} save={"1000"} SourceGiven={Image1} old={"3060"}/>
                <ProductBox name={"Agri-Protex"} price={"2050"} save={"1000"} SourceGiven={Image2} old={"3060"}/>
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
    fontWeight: 'bold',
    fontSize: hp('3%'),
  },
  scrollContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingVertical: hp('3%'),
  },
  itemBoxWrapper: {
    width: wp('30%'), 
    marginBottom: hp('2%'),
    alignItems: 'center',
  },
  recommendedProducts: {
    marginTop: hp('2%'),
  },
  recommendedTitle: {
    fontSize: hp('3%'),
    fontWeight: 'bold',
    marginBottom: hp('2%'),
  },
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('3%'),
  },
});
