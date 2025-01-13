import React from 'react';
import type { PropsWithChildren } from 'react';
import ECategories from '../../../../../util/E-Categories.js';
import Navbar from '../../Navbar/Navbar.jsx';
import CustomSearchApp from '../../CustomComponent/CustomSearchApp.jsx';
import CustomButton from '../../../../components/CustomButton.jsx';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../../../../../util/colors.js';
import Categorybox from '../../CustomComponent/Categorybox.jsx';
import ProductBox from '../../CustomComponent/ProductBox.jsx';
import ItemBox from '../../CustomComponent/ItemBox.jsx';
import { EInventoryDet } from '../../../../../util/E-Inventory.js';
import EInventoryBoxes from '../../CustomComponent/EInventoryBoxes.jsx';
import { useNavigation } from '@react-navigation/native';

// import Image1 from '../../../assets/MainApp/EmarketPlace/Products/prod1.png';
// import Image2 from '../../../assets/MainApp/EmarketPlace/Products/prod2.png';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TouchableOpacity,
    Image,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { fonts } from '../../../../../util/FontName.js';
import ScreensName from '../../../../../util/ScreensName';



function EInventory(): React.JSX.Element {
    const { t } = useTranslation();
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.navbarContainer}>
                <Navbar />
            </View>
            <ScrollView style={styles.container}>
                <View style={styles.searchContainer}>
                    <CustomSearchApp placeholder={t('Search in here')} />
                </View>

                <View style={styles.bodyContainer}>
                    <View style={{flex:0.5, marginTop:hp(-3), flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                        <View style={{flex:0.7, marginLeft:wp(6)}}>
                            <Text style={{fontWeight: 'bold', fontSize: 25}}>{t('Inventory Details')}</Text>
                        </View>
                        <View style={{flex:0.3, marginRight:wp(1.5)}}>
                            <TouchableOpacity style={{justifyContent:'center', alignItems:'center', borderRadius:5, borderColor:colors.GREEN, width:wp("23%"), height:hp("3%"),backgroundColor:colors.GREEN, borderWidth:1,}} onPress={() => { navigation.navigate(ScreensName.Connect) }}>
                                <Text style={{color:colors.WHITE,fontSize:hp('1.6%'), textAlign:'center'}}>{t('Re-order')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{flex:0.5, alignItems:'center', justifyContent:'center', marginTop:hp(1)}}>
                        <View style={{flexDirection:'row', marginTop:hp(1)}}>
                            <View style={{flex:0.35, marginLeft:wp(6)}}>
                                <Text style={{color:colors.GREEN}}>{t('Item SKU')}</Text>
                            </View>
                            <View style={{flex:0.65, marginRight:wp(6)}}>
                                <Text style={{}}>{t('AK345')}</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row', marginTop:hp(1)}}>
                            <View style={{flex:0.35, marginLeft:wp(6)}}>
                                <Text style={{color:colors.GREEN}}>{t('Item Quantity')}</Text>
                            </View>
                            <View style={{flex:0.65, marginRight:wp(6)}}>
                                <Text style={{}}>{t('45')}</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row', marginTop:hp(1)}}>
                            <View style={{flex:0.35, marginLeft:wp(6)}}>
                                <Text style={{color:colors.GREEN}}>{t('Item Descripion')}</Text>
                            </View>
                            <View style={{flex:0.65, marginRight:wp(6)}}>
                                <Text style={{}}>{t('Introducing BRINC Ball transforming rescue and tactical operations! This throwable communication device enables two-way audio')}</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row', marginTop:hp(1)}}>
                            <View style={{flex:0.35, marginLeft:wp(6)}}>
                                <Text style={{color:colors.GREEN}}>{t('Item Regular sale expectations')}</Text>
                            </View>
                            <View style={{flex:0.65, marginRight:wp(6)}}>
                                <Text style={{}}>{t('123+')}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{flex:0.2, alignItems:'center', justifyContent:'center', marginTop:hp(4)}}>
                        <CustomButton 
                            MainText={t('Add new inventory')}
                            BgGiven={colors.GREEN}
                            txColor={colors.WHITE}
                            isNavigation={true}
                            name={ScreensName.SignIn}
                        />
                    </View>
                </View>
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
        marginVertical: hp('3.2%'),
        height: hp('7%'),
    },
    bodyContainer: {
        alignItems: 'center',

    },
    titleContainer: {
        padding: 10,
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 25,
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

});



export default EInventory;