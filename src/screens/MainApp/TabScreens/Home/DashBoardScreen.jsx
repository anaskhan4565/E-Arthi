import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import Navbar from '../../Navbar/Navbar.jsx';
import CustomSearchApp from '../../CustomComponent/CustomSearchApp.jsx';
import colors from '../../../../../util/Constants/colors.js';
import DashboardBox from '../../CustomComponent/DashBoardBoxes.jsx';
import NewDrawerData from '../../../../../util/Data/NewDashBoardData.js';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useTranslation } from 'react-i18next';
import { fonts } from '../../../../../util/Constants/FontName.js';
import { useNavigation } from '@react-navigation/native';

const DashboardScreen = () => {
    const { t } = useTranslation();
    const navigation = useNavigation();

    const handleNavigate = (screen) => {
        if (screen) {
            navigation.navigate(screen);
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: colors.WHITE }}>
            <View style={styles.navbarContainer}>
                <Navbar />
            </View>

            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingTop: hp('8%'), paddingBottom: hp('10%') }}>
                <View style={styles.contentContainer}>

                    <View style={styles.bodyContainer}>

                        <View style={styles.servicesGrid}>
                            {NewDrawerData.map((item, index) => (
                                <View key={index} style={styles.boxWrapper}>
                                    <DashboardBox
                                        name={item.title}
                                        svgImage={<item.svgImage width={wp(16)} height={hp(8)} />}
                                        onPress={() => handleNavigate(item.screen)}
                                        isNavigation={item.isNavigation}
                                        w={wp('28%')}
                                        h={hp('15%')}
                                        style={styles.dashboardBox}
                                    />
                                </View>
                            ))}
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default DashboardScreen;

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
        marginVertical: hp('2%'),
        height: hp('7%'),
        alignSelf: "flex-start"
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: hp('2%'),
        justifyContent: 'center',
    },
    bodyContainer: {
        flex: 1,
    },

    servicesGrid: {
        marginTop: hp(2),
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        marginHorizontal: -hp('0.7%'),
    },
    boxWrapper: {
        // width: wp('31'),
        // marginBottom: hp('1%'),
        alignItems: 'center',
        marginBottom: hp('-1%'),
    },
    dashboardBox: {
        backgroundColor: colors.WHITE,
        padding: hp('1.5%'),
    }
});
