import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { useTranslation } from "react-i18next";
import { fonts } from "../../../../../util/FontName";
import { OrderHist } from "../../../../../util/E-OrderTransactionHistory";
import Navbar from "../../Navbar/Navbar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import colors from "../../../../../util/colors";
import CustomSearchApp from "../../CustomComponent/CustomSearchApp";



function EOrderTranscations(): React.JSX.Element {
    const { t } = useTranslation();
    const getStatusStyle = (stat) => (stat ? styles.comp : styles.pend);
    const getStatusTextStyle = (stat) => (stat ? styles.completed : styles.pending);
    return (
        <ScrollView style={styles.container}>
        <View style={styles.navbarContainer}>
          <Navbar />
        </View>      
        <View style={{ flex: 7 }}>
          <View style={styles.searchbar}>
            <CustomSearchApp placeholder={"Search in here"} />
          </View>
          <View style={{ marginBottom: hp(1.2), marginTop: hp(0), marginHorizontal: wp(5), }}>
            <Text style={{ fontFamily: fonts.SemiBold, fontSize: hp(2.4) }}>
              {t('Order History')}
            </Text>
          </View>
          
          {OrderHist.map((data, index) =>
            data.desc.trim() !== "" && (
                <View style={styles.metaSuper} key={index}>
                <View>
                    <Text style={styles.date}>{t(data.date)}</Text>
                </View>
                <View style={styles.meta}>
                    <View style={styles.column}>
                    <View style={styles.decsAndtime}>
                        <Text style={styles.time}>{t(data.time)}</Text>
                        <Text style={styles.decs}>{data.desc}</Text>
                    </View>
                    <Text style={styles.cost}>{data.cost}</Text>
                    </View>
                    <View style={getStatusStyle(data.stat)}>
                    <Text style={getStatusTextStyle(data.stat)}>
                        {t(data.stat ? "completed" : "pending")}
                    </Text>
                    </View>
                </View>
                </View>
            )
            )}
        </View>
      </ScrollView>
    );
}


const styles = StyleSheet.create({
  navbarContainer: {
    height: hp(8.5),
    backgroundColor: colors.WHITE,
  },
  container: {
    flex: 1,

    backgroundColor: colors.WHITE,
  },
  searchbar: {
    marginTop: hp(1.3),
    height: hp('7%'),

  },
  Header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: wp(4),
    height: hp(10)
  },
  HeaderCol: {
    fontFamily: fonts.SemiBold,
    fontSize: hp(2),
    width: wp(29),
    textAlign: "left"

  },
  cost: {
    fontFamily: fonts.Regular,
    fontSize: hp(1.8),
    textAlign: "left",
    width: wp(33),
    color: colors.GREEN
  },
  date: {
    fontFamily: fonts.Regular,
    fontSize: hp(1.8)
  },
  time: {
    fontFamily: fonts.Regular,
    fontSize: hp(1.8),
    textAlign: 'left',
    color: colors.EOrderHistGray,
  },
  decs: {
    fontFamily: fonts.Regular,
    fontSize: hp(1.8),
    textAlign: 'left',
    color: colors.GREEN
  },
  decsAndtime: {
    width: wp(65),
    fontFamily: fonts.Regular,
    fontSize: hp(1.8),
    flexDirection: 'row',
    gap: 7
  },
  column: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginHorizontal: wp(4),
  },
  meta: {
    flexDirection:'row',
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor: colors.LIGHT_GREEN,
    borderRadius: 10,
    width: wp(90),
    height: hp(8),
    margin: hp(0.5)
  },
  pend: {
    justifyContent:'center',
    alignItems: 'center',
    height: hp(3),
    width: wp(19),
    borderRadius: 6,
    backgroundColor: colors.ORANGE,
    marginRight: wp(4)
  },
  comp: {
    justifyContent:'center',
    alignItems: 'center',
    height: hp(3),
    width: wp(19),
    borderRadius: 6,
    backgroundColor: colors.COMPLETE_GREEN,
    marginRight: wp(4)
  },
  metaSuper: {
    flexDirection: 'column',
    marginLeft: wp(5),
    margin: hp(1)
  },
  pending: {
    color: colors.BLACK
  },
  completed: {
    color: colors.WHITE
  }
});

export default EOrderTranscations;
