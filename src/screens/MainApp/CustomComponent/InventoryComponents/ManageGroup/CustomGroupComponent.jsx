import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../../../../../../util/colors';
import { fonts } from '../../../../../../util/FontName';
import Pen from '../../../../../assets/MainApp/E-Inventory/E-Inventory-ManageGroup/Pen.png'
import Demo from '../../../../../assets/MainApp/E-Inventory/E-Inventory-Monitoring/blank.png';
import { t } from 'i18next';

const CustomGroupComponent = ({MainHeading,typ1,typ2,typ3,val1,val2,val3}) => {
    const data = [
        { type: typ1, value: val1 },
        { type: typ2, value: val2 },
        { type: typ3, value: val3 },
      ];
      return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>{t(MainHeading)}</Text>
        </View>
        <View style={styles.headerIconContainer}>
          <Image source={Pen} style={styles.icon} />
        </View>
      </View>
      <View style={styles.itemListContainer}>
        {data.map((item, index) => (
          <View key={index} style={styles.itemContainer}>
            <View style={styles.itemInfoContainer}>
              <Image style={styles.itemImage} source={Demo} />
              <Text style={styles.itemText}>{t(item.type)}</Text>
            </View>
            <View style={styles.itemValueContainer}>
              <Text style={styles.itemValue}>{t(item.value)}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: hp(1.5),
    borderRadius: hp(2),
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  headerContainer: {
    flex: 0.3,
    flexDirection: 'row',
   marginHorizontal:hp(1.5),
   marginTop:hp(1.5)
  },
  headerTextContainer: {
    flex: 0.8,
    justifyContent: 'center',
  },
  headerText: {
    fontSize: wp('5%'),
    fontFamily: fonts.SemiBold,
    color: colors.BLACK,
  },
  headerIconContainer: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: hp(1),
  },
  icon: {
    height: hp(3),
    width: wp(5),
  },
  itemListContainer: {
    flex: 1,
    marginVertical: hp(1),
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: hp(1.5),
    backgroundColor: 'white',
    borderRadius: hp(1),

    padding: hp(0.4),
  },
  itemInfoContainer: {
    flex: 0.8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemImage: {
    width: wp(13),
    height: hp(6),
  },
  itemText: {
    color: colors.BLACK,
    fontSize: hp(2),
    fontFamily: fonts.Medium,
    marginLeft: hp(1.5),
  },
  itemValueContainer: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: hp(1),
  },
  itemValue: {
    color: colors.GREEN,
    fontSize: hp(2),
    fontFamily: fonts.SemiBold,
  },
});

export default CustomGroupComponent;
