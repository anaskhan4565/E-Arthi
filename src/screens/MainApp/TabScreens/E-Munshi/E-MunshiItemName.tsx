import React from 'react';
import { TouchableOpacity, Image } from 'react-native';

import Navbar from '../../Navbar/Navbar.jsx';
import CustomSearchApp from '../../CustomComponent/CustomSearchApp.jsx';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../../../../../util/colors.js';
import EInventoryBoxes from '../../CustomComponent/EInventoryBoxes.jsx'
import { ETransportMaindet } from '../../../../../util/E-Transport.js';

import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { fonts } from '../../../../../util/FontName.js';
import ScreensName from '../../../../../util/ScreensName.ts';
import CustomButton from '../../../../components/CustomButton.jsx';
import MyPieChart from '../../../../screens/MainApp/TabScreens/E-Loan/CustomComponents/PiChart.jsx';
import { Dimensions } from 'react-native';



const farmData = {
  Item: [
    { name: 'Lasbela Farm'},
    { name: 'Umerkot Farm' },
    { name: 'Khairpur Farm'},
    { name: 'Sialkot Farm' },
    { name: 'Kotri Farm'}
  ]
};

function EMunshiItem(): React.JSX.Element {
    const { t } = useTranslation();

    const screenWidth = Dimensions.get('window').width;

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.navbarContainer}>
                <Navbar />
            </View>
            <ScrollView style={styles.container}>

                <View style={styles.searchContainer}>
                    <CustomSearchApp placeholder={t('Search in here')} />
                </View>
                <View style={{ marginHorizontal: hp(1) }} >
                    <Text style={{ fontSize: hp(3.5), fontFamily: fonts.SemiBold, marginLeft: hp(2) }}>Item Name Stats</Text>
                </View>
                <View style={styles.bodyContainer}>
                    {farmData.Item.map((farm, index) => (
                        <TouchableOpacity key={index} style={styles.farmBox} onPress={() => {/* Navigate to another screen */}}>
                            <Text style={styles.farmLabel}>{farm.name}</Text>
                            <View style={styles.percentageContainer}>
                                <Image 
                                    source={require('../../../../assets/MainApp/E-Munshi/chevron-right-solid.png')} 
                                    style={styles.arrowImage}
                                />
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
                <CustomButton MainText={t('Check Cash Flow')} BgGiven={colors.GREEN} txColor={colors.WHITE} isNavigation={1} name={ScreensName.EMunshiFarmName} />
            </ScrollView>
        </SafeAreaView >
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: colors.WHITE,

    },
    navbarContainer: {
        height: hp('8.2%'),
        backgroundColor: 'white',
        marginTop: hp('0.14%'),
    },
    searchContainer: {
        marginTop: hp('3.2%'),
        height: hp('7%'),
        alignSelf:'flex-start',
        marginLeft:hp(1)
    },
    bodyContainer: {
        alignItems: 'flex-start',
        marginHorizontal:hp(3)

    },
    titleContainer: {
        padding: 10,
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 25,
        fontFamily: 'Poppins',
    },
    scrollContainer: {
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingVertical: hp('2%'),
        // backgroundColor: 'red',
        alignItems: 'center',

    },
    itemBoxWrapper: {
        width: '30%',
        marginBottom: hp('2%'),
        marginHorizontal: wp('-3%'),
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
    subsectionTitle: {
        fontSize: hp(2),
        fontFamily: 'Poppins Bold',
        marginBottom: hp(2),
        textAlign: 'center',
    },
    chartContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    legendContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp(2),
        marginBottom: hp(2),
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: hp(0.5),
        width: '50%',
        justifyContent: 'center',
    },
    colorBox: {
        width: 20,
        height: 20,
        borderRadius: 10,
        marginRight: hp(1),
    },
    legendText: {
        fontSize: hp(2),
        color: '#7F7F7F',
    },
    farmBox: {
        backgroundColor: colors.WHITE,
        padding: hp(2),
        marginVertical: hp(1),
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 5,
        elevation: 2, // Optional: for shadow effect on Android
    },
    farmLabel: {
        color: 'black',
        fontSize: hp(2),
        fontFamily: 'Poppins',
    },
    farmPercentage: {
        color: colors.PRIMARY,
        fontSize: hp(2),
        fontFamily: 'Poppins',
    },
    percentageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    arrowImage: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        marginLeft: hp(1),
    },
});

export default EMunshiItem;