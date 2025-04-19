import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { LineChart } from 'react-native-chart-kit'
import { useRoute, RouteProp } from '@react-navigation/native'
import colors from '../../../../../util/Constants/colors'
import { fonts } from '../../../../../util/Constants/FontName'
import Navbar from '../../Navbar/Navbar'

type CropType = {
  id: string
  name: string
  image: any
  growthDuration: string
  waterRequirement: string
  soilType: string
  expectedYield: string
  seedRequirement: string
  idealFertilizer: {
    name: string
    description: string
  }
}

type RootStackParamList = {
  CropYield: { crop: CropType }
}

type CropYieldRouteProp = RouteProp<RootStackParamList, 'CropYield'>

const CropYield = () => {
  const route = useRoute<CropYieldRouteProp>()
  const { crop } = route.params

  const yieldData = {
    labels: ['18 Mar', '23 Mar', '27 Mar', '2 Apr', '7 Apr', '12 Apr'],
    datasets: [{
      data: [3, 4, 2, 6, 5, 7]
    }]
  }

  const statistics = [
    { label: 'Total Yield', value: '27 kg' },
    { label: 'Average Yield', value: '0.9 kg per day' },
    { label: 'Revenue', value: '40,000 Rupees' },
    { label: 'Profit', value: '10,000 Rupees' }
  ]

  return (
    <View style={styles.container}>
      <View style={styles.navbarContainer}>
        <Navbar gobackOnly={true} />
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.title}>{crop.name}</Text>

        {/* Line Chart */}
        <View style={styles.chartContainer}>
          <LineChart
            data={yieldData}
            width={wp('90%')}
            height={hp('30%')}
            chartConfig={{
              backgroundColor: colors.WHITE,
              backgroundGradientFrom: colors.WHITE,
              backgroundGradientTo: colors.WHITE,
              decimalPlaces: 0,
              color: (opacity = 1) => colors.GREEN,
              labelColor: (opacity = 1) => colors.BLACK,
              style: {
                borderRadius: 16
              },
              propsForDots: {
                r: "4",
                strokeWidth: "2",
                stroke: colors.GREEN
              },
              propsForBackgroundLines: {
                strokeDasharray: "",
                stroke: colors.LIGHT_GRAY,
                strokeWidth: 1
              }
            }}
            withInnerLines={true}
            withOuterLines={true}
            withVerticalLines={true}
            withHorizontalLines={true}
            style={styles.chart}
          />
        </View>

        {/* Statistics Table */}
        <Text style={styles.statsTitle}>Statistics for data from 18 March - 18 April:</Text>
        <View style={styles.statsTable}>
          {statistics.map((stat, index) => (
            <View 
              key={stat.label} 
              style={[
                styles.tableRow,
                index === statistics.length - 1 && { borderBottomWidth: 0 }
              ]}
            >
              <Text style={styles.tableLabel}>{stat.label}</Text>
              <View style={styles.verticalLine} />
              <Text style={styles.tableValue}>{stat.value}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
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
    fontFamily: fonts.SemiBold,
    color: colors.BLACK,
    marginBottom: hp('3%'),
  },
  chartContainer: {
    marginBottom: hp('3%'),
    alignItems: 'center',
  },
  chart: {
    marginVertical: hp('1%'),
    borderRadius: wp('3%'),
  },
  statsTitle: {
    fontSize: wp('3.8%'),
    fontFamily: fonts.Regular,
    color: colors.BLACK,
    marginBottom: hp('2%'),
  },
  statsTable: {
    backgroundColor: colors.LIGHT_GREEN,
    borderRadius: wp('2%'),
    overflow: 'hidden',
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.GREEN,
    position: 'relative',
  },
  tableLabel: {
    fontSize: wp('3.5%'),
    fontFamily: fonts.Regular,
    color: colors.BLACK,
    flex: 1,
    textAlign: 'center',
    paddingVertical: hp('1%'),
    paddingLeft: wp('4%'),
    paddingRight: wp('2%'),
  },
  verticalLine: {
    width: 1,
    position: 'absolute',
    top: 0,
    bottom: -1,
    backgroundColor: colors.GREEN,
    left: '50%',
  },
  tableValue: {
    fontSize: wp('3.5%'),
    fontFamily: fonts.Regular,
    color: colors.BLACK,
    flex: 1,
    textAlign: 'center',
    paddingVertical: hp('1%'),
    paddingLeft: wp('2%'),
    paddingRight: wp('4%'),
  },
})

export default CropYield