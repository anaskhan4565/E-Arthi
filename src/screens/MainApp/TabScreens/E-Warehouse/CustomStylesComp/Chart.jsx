import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { BarChart } from "react-native-chart-kit";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import colors from "../../../../../../util/colors.js";
import { fonts } from "../../../../../../util/FontName.js";
import { useTranslation } from "react-i18next";

const CustomBarChart = ({
  data,
  legendTitle,
  bgColor = colors.WHITE,
  width = wp(100),
  height = hp(30),
}) => {
  const { t } = useTranslation();
  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <Text style={styles.title}>{t(legendTitle)}</Text>
      <BarChart
        data={data}
        width={width}
        height={height}
        chartConfig={{
          backgroundColor: bgColor,
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          decimalPlaces: 0,
          color: (opacity = 1, index) => {
            // Custom colors for each bar based on levels
            if (index === 0) return `rgba(0, 255, 0, ${opacity})`; // Green
            if (index === 1) return `rgba(0, 0, 0, ${opacity})`; // Black (level)
            return `rgba(255, 0, 0, ${opacity})`; // Red
          },
          labelColor: () => colors.BLACK,
        }}
        style={styles.barChart}
        verticalLabelRotation={30}
        fromZero // Ensures bars start from 0
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: hp(2),
    padding: hp(2),
    elevation: hp(3),
    shadowColor: "black",
    shadowOffset: { width: 0, height: hp(0.5) },
    shadowOpacity: 0.15,
    shadowRadius: hp(1),
    borderWidth: 0.4,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: hp(3.5),
    fontWeight: "bold",
    color: colors.BLACK,
    fontFamily: fonts.bold,
    marginBottom: hp(1),
  },
  barChart: {
    borderRadius: hp(1),
  },
});

export default CustomBarChart;
