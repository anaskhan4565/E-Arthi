import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CustomImageButton from '../../CustomComponent/CustomImageButton';
import ScreensName from '../../../../../util/ScreensName';
import colors from '../../../../../util/colors';
import CustomButton from '../../../../components/CustomButton';
import MandiNavbar from '../CustomComp/MandiNavbar';
import CustomBottomSheetExport from '../CustomComp/CustomBottomSheet';
import CustomNavigationMandi from '../CustomComp/CustomNavigation'
const MarketDept = () => {
  const [marketData, setMarketData] = useState([]);

  const generateRandomValue = useCallback(() => {
    const randomFlag = "dc";
    const randomShares = Math.floor(Math.random() * 100) + 1;
    const randomBid = (Math.random() * 10).toFixed(2);
    const randomAsk = (Math.random() * 10).toFixed(2);
    return { flag: randomFlag, shares: randomShares, bid: randomBid, ask: randomAsk };
  }, []);

  const generateMarketData = useCallback(() => {
    const data = Array.from({ length: 17 }, generateRandomValue);
    setMarketData(data);
  }, [generateRandomValue]);

  useEffect(() => {
    generateMarketData(); // Generate initial data
    const interval = setInterval(generateMarketData, 2000); // Update every 2 seconds
    return () => clearInterval(interval);
  }, [generateMarketData]);

  const renderItem = ({ item }) => (
    <View style={styles.tableRow}>
      <Text style={styles.tableCell}>{item.flag}</Text>
      <Text style={[styles.tableCell, item.shares >= 60 ? styles.greenText : styles.blueText]}>{item.shares}</Text>
      <Text style={[styles.tableCell, item.bid >= 4 ? styles.greenText : styles.blueText]}>
        {item.bid}
      </Text>
      <Text style={[styles.tableCell, item.ask >= 7 ? styles.redText : styles.blueText]}>
        {item.ask}
      </Text>
      <Text style={[styles.tableCell, item.shares >= 60 ? styles.greenText : styles.blueText]}>{item.shares}</Text>
      <Text style={styles.tableCell}>{item.flag}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <MandiNavbar />
        <CustomNavigationMandi />

        <View style={styles.marketDeptContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>MBO-Market Depth By Order</Text>
          </View>
          <View style={styles.dataContainer}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderText}>Flag</Text>
              <Text style={styles.tableHeaderText}>Shares</Text>
              <Text style={[styles.tableHeaderText, styles.greenText]}>Bid</Text>
              <Text style={[styles.tableHeaderText, styles.redText]}>Ask</Text>
              <Text style={styles.tableHeaderText}>Shares</Text>
              <Text style={styles.tableHeaderText}>Flag</Text>
            </View>
            {marketData.map((item, index) => (
              <View key={index.toString()} style={styles.tableRow}>
                <Text style={styles.tableCell}>{item.flag}</Text>
                <Text style={[styles.tableCell, item.shares >= 60 ? styles.greenText : styles.blueText]}>
                  {item.shares}
                </Text>
                <Text style={[styles.tableCell, item.bid >= 4 ? styles.greenText : styles.blueText]}>
                  {item.bid}
                </Text>
                <Text style={[styles.tableCell, item.ask >= 7 ? styles.redText : styles.blueText]}>
                  {item.ask}
                </Text>
                <Text style={[styles.tableCell, item.shares >= 60 ? styles.greenText : styles.blueText]}>
                  {item.shares}
                </Text>
                <Text style={styles.tableCell}>{item.flag}</Text>
              </View>
            ))}

          </View>
        </View>

        <View style={styles.marketDeptContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>MBO-Market Depth By Price</Text>
          </View>
          <View style={styles.dataContainer}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderText}>Orders</Text>
              <Text style={styles.tableHeaderText}>Shares</Text>
              <Text style={[styles.tableHeaderText, styles.greenText]}>Bid</Text>
              <Text style={[styles.tableHeaderText, styles.redText]}>Ask</Text>
              <Text style={styles.tableHeaderText}>Shares</Text>
              <Text style={styles.tableHeaderText}>Orders</Text>
            </View>
            {marketData.map((item, index) => (
              <View key={index.toString()} style={styles.tableRow}>
                <Text style={styles.tableCell}>{item.flag}</Text>
                <Text style={[styles.tableCell, item.shares >= 60 ? styles.greenText : styles.blueText]}>
                  {item.shares}
                </Text>
                <Text style={[styles.tableCell, item.bid >= 4 ? styles.greenText : styles.blueText]}>
                  {item.bid}
                </Text>
                <Text style={[styles.tableCell, item.ask >= 7 ? styles.redText : styles.blueText]}>
                  {item.ask}
                </Text>
                <Text style={[styles.tableCell, item.shares >= 60 ? styles.greenText : styles.blueText]}>
                  {item.shares}
                </Text>
                <Text style={styles.tableCell}>{item.flag}</Text>
              </View>
            ))}

          </View>
        </View>
      </ScrollView>
      <CustomBottomSheetExport style={styles.bottomSheet} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  scrollViewContent: {
    paddingBottom: hp(16),
  },
  navButtonsContainer: {
    flex: 0.1,
  },
  navButtons: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: hp(10),
  },
  marketDeptContainer: {
    flex: 0.6,
  },
  headerContainer: {
    flex: 0.1,
    justifyContent: 'center',
  },
  headerText: {
    fontSize: hp(3),
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.OLD_MILL_BLUE,
  },
  dataContainer: {
    flex: 0.9,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: hp(1),
  },
  tableHeaderText: {
    fontSize: hp(2.3),
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  tableCell: {
    fontSize: hp(1.6),
    width: hp(5),
    textAlign: 'center',
  },
  greenText: {
    color: colors.GREEN,
  },
  redText: {
    color: colors.RED,
  },
  blueText: {
    color: colors.BLUE,
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
});

export default MarketDept;
