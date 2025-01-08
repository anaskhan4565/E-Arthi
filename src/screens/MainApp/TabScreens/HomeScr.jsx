import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import Navbar from '../Navbar/Navbar.jsx';
import CustomSearchApp from '../CustomComponent/CustomSearchApp.jsx';
import colors from '../../../../util/colors.js';
import ItemBox from '../CustomComponent/ItemBox.jsx';
import Heart from '../../../assets/MainApp/HomeScreen/Heart.png';
import allNames from '../../../../util/E-Offerings.js';
import ProductBox from '../CustomComponent/ProductBox.jsx';


//Need to edit this later, passing images literl
import Image1 from '../../../assets/MainApp/EmarketPlace/Products/prod1.png'
import Image2 from '../../../assets/MainApp/EmarketPlace/Products/prod2.png'

const Home = () => {
  return (
    <View style={{ flex: 1, backgroundColor: colors.WHITE }}>
      <View style={styles.navbarContainer}>
        <Navbar />
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingTop: 70 }}> 
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
                    <ItemBox name={name} SourceGiven={Heart} />
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
    height: 70,
    backgroundColor: 'white',
    position: 'absolute', 
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1, 
  },
  contentContainer: {
    flex: 1,
    marginTop: 10,
  },
  searchContainer: {
    marginVertical: 15,
    height: 50,
  },
  bodyContainer: {
    flex: 1,
    margin: 20,
  },
  titleContainer: {
    padding: 10,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 25,
  },
  scrollContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  itemBoxWrapper: {
    width: '30%', 
    marginBottom: 15,
    alignItems: 'center',
  },
  recommendedProducts: {
    marginTop: 20,
  },
  recommendedTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});
