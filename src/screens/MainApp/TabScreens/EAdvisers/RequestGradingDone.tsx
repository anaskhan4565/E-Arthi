import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../../../../../util/Constants/colors';
import { fonts } from '../../../../../util/Constants/FontName';
import Navbar from '../../Navbar/Navbar';

const RequestGradingDone = () => {
  return (
    <View style={styles.container}>
      <View style={styles.navbarContainer}>
        <Navbar gobackOnly={true} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Request Grading</Text>

        <View style={styles.successContainer}>
          <View style={styles.checkmarkContainer}>
            <Image 
              source={require('./Images/Services/Check.png')}
              style={styles.checkmarkIcon}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.successTitle}>
            Your soil test has{'\n'}been successfully{'\n'}scheduled!
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  navbarContainer: {
    height: hp('8.5%'),
    backgroundColor: colors.WHITE,
    borderBottomWidth: 1,
    borderBottomColor: colors.LIGHT_GRAY,
  },
  content: {
    flex: 1,
    padding: wp('4%'),
  },
  title: {
    fontSize: wp('6%'),
    fontFamily: fonts.Medium,
    color: colors.BLACK,
    marginBottom: hp('4%'),
  },
  successContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: hp('20%'), // To offset from bottom
  },
  checkmarkContainer: {
    width: wp('25%'),
    height: wp('25%'),
    borderRadius: wp('12.5%'),
    // backgroundColor: colors.GREEN,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp('4%'),
  },
  checkmarkIcon: {
    width: wp('45%'),
    height: wp('45%'),
    marginBottom: hp('2%'),
  },
  successTitle: {
    fontSize: wp('6%'),
    fontFamily: fonts.Medium,
    color: colors.BLACK,
    textAlign: 'center',
    lineHeight: wp('8%'),
  },
});

export default RequestGradingDone