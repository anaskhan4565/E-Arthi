import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import Navbar from '../../../MainApp/Navbar/Navbar.jsx';
import ScreensName from '../../../../../util/Constants/ScreensName.ts';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../../../../../util/Constants/colors.js';
import { fonts } from '../../../../../util/Constants/FontName.js';
const BasalFertilization = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navbarContainer}>
        <Navbar gobackOnly={true} />
      </View>
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.title}>Basal fertilization for potato</Text>
        
        <View style={styles.imageContainer}>

        </View>

        <View style={styles.contentContainer}>
          <View style={styles.weekInfo}>
            <Text style={styles.weekTitle}>Week 1</Text>
            <Text style={styles.dateRange}>17 March - 24 March (Current)</Text>
          </View>
          
          <Text style={styles.description}>
            Basal fertilization is done during field preparation while ploughing the soil. The addition of farmyard manure is complemented by the application of mineral fertilizers containing the main nutrients: Nitrogen N, Phosphorus P, and Potassium K.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  navbarContainer: {
    height: hp("8.2%"),
    backgroundColor: "white",
    marginTop: hp("0.14%"),
},
  scrollContainer: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  contentContainer: {
    backgroundColor: colors.LIGHT_GREEN,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  imageContainer:{
    width:wp(90),
    alignSelf:'center',
    height:hp(20),
    backgroundColor:colors.GRAY,
    margin:hp(4),
    borderRadius:wp(2)
  },
  weekInfo: {
    marginBottom: 16,
  },
  weekTitle: {
    fontSize: 18,
    color: '#000',
  },
  dateRange: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  description: {
    fontSize: 16,
    color: '#333',
    fontFamily:fonts.Regular,
    lineHeight: 24,
  },
});

export default BasalFertilization 