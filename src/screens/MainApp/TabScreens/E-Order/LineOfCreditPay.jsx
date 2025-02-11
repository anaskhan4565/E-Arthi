import React, { useCallback, useState } from 'react';
import Navbar from '../../Navbar/Navbar.jsx';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../../../../../util/colors.js';

import {
    SafeAreaView,
    ScrollView,
    TextInput,
    StyleSheet,
    Image,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { fonts } from '../../../../../util/FontName.js';
import ScreensName from '../../../../../util/ScreensName.ts';
import CustomButton from '../../../../components/CustomButton.jsx';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { MMKV } from 'react-native-mmkv';
import LOCIMG from './TempImgsOrder/LOC.png'


function LineOfCreditPay(): React.JSX.Element {
    const { t } = useTranslation();
    const navigation = useNavigation();
    const [key, setKey] = useState(0);
    const formatNumber = (num) => new Intl.NumberFormat("en-US").format(num ?? 0);
    const[MessageText,SetMessageText]=useState("")
    useFocusEffect(
        useCallback(() => {
            setKey(prevKey => prevKey + 1);
        }, [])
    );
    const storage = new MMKV();

    const finalPrice = storage.getString("FinalPrice")
    const savedCart = storage.getString("cart");
    const parsedCart = savedCart ? JSON.parse(savedCart) : [];
    console.log(parsedCart);
    const PassedPayment = new MMKV();


    const NavigateAndSet=()=>{
        PassedPayment.set("PassedName","Line Of Credit");
        navigation.navigate(ScreensName.AllOTP)
    }

    const GetMessage=(e)=>{
        SetMessageText(e)
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navbarContainer}>
                <Navbar />
            </View>
            <ScrollView style={styles.container}>

                <View style={{ marginBottom: hp(1.2), marginTop: hp(1), marginHorizontal: wp(5), }}>
                    <Text style={{ fontFamily: fonts.SemiBold, fontSize: hp(3), textAlign: 'center' }}>
                        Pay with Line of Credit
                    </Text>
                </View>
                <View style={styles.bodyContainer}>

                    {/* TRANSFER TO */}
                    <View style={{ width: wp(85) }}>
                        <Text style={{ fontFamily: fonts.SemiBold, fontSize: hp(2.5), marginTop: hp(1) }}>{t('Transfer To')}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', width: wp(85), alignItems: 'center' }}>
                        <View style={styles.amountContainer}>
                            <Text style={{ color: colors.DARK_GRAY, fontSize: hp(2), fontFamily: fonts.Regular }}>{t('Agri-Tech Bank')}</Text>
                        </View>
                    </View>

                    {/* SHOWING AMOUNT TO BE PAID */}
                    <View style={{ width: wp(85) }}>
                        <Text style={{ fontFamily: fonts.SemiBold, fontSize: hp(2.5), marginTop: hp(2) }}>{t('Amount')}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', width: wp(85), alignItems: 'center', borderBottomWidth: 1 }}>
                        <View style={styles.amountContainer}>
                            <Text style={{ color: colors.DARK_GRAY, fontSize: hp(2), fontFamily: fonts.Regular }}>PKR {formatNumber(parseInt(finalPrice).toFixed(2))}</Text>
                        </View>
                    </View>

                    {/* TRANSFER FROM */}
                    <View style={{ width: wp(85), justifyContent: 'center', alignContent: 'center', alignSelf: 'center', alignItems: 'center' }}>
                        <Text style={{ fontFamily: fonts.SemiBold, fontSize: hp(2.5), marginTop: hp(2) }}>{t('Line Of Credit Report')}</Text>
                        <Image source={LOCIMG} style={{ width: hp(10), height: hp(10) }} />
                        <View style={{ flexDirection: 'column', gap: hp(1) }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: hp(1.4), color: colors.OLD_MILL_BLUE }}>Remaining Amount:</Text>
                                <Text style={{ fontSize: hp(1.4), color: colors.GREEN, fontFamily: fonts.Bold }}>PKR 53,950</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: hp(1.4), color: colors.OLD_MILL_BLUE }}>Utilized Amount:</Text>
                                <Text style={{ fontSize: hp(1.4), color: colors.ORANGE, fontFamily: fonts.Bold }}>PKR 27,1740</Text>
                            </View>
                        </View>
                    </View>



                    {/* PURPOSE */}
                    <View style={{ width: wp(85), marginTop: hp(1) }}>
                        <Text style={{ fontFamily: fonts.SemiBold, fontSize: hp(2.5) }}>{t('Purpose')}*</Text>
                    </View>
                    <View style={{ flexDirection: 'row', width: wp(85), alignItems: 'center' }}>
                        <View style={styles.amountContainer}>

                            <TextInput
                                style={styles.notesInput}
                                placeholder={t('Enter your notes here')}
                                placeholderTextColor={colors.LIGHT_GRAY}
                                multiline
                                numberOfLines={4}
                                onChangeText={(e)=>GetMessage(e)}
                                
                            />
                        </View>
                    </View>



                    <View style={{ marginTop: hp(2), gap: 5 }}>
                        <CustomButton MainText={t('Confirm')}
                            BgGiven={MessageText.length > 5 ? colors.GREEN : colors.GRAY}
                            txColor={MessageText.length > 5 ? colors.WHITE:colors.GREAT_WHITE}
                            
                            bordergiven={MessageText.length > 5 ? colors.GREEN : colors.GRAY}
                            isNavigation={MessageText.length > 5 ? true : false}
                            isDisabled={MessageText.length > 5 ? true : false}
                            onPressG={MessageText.length > 5 ?NavigateAndSet:null}
                            name={MessageText.length > 5 ? ScreensName.AllOTP : null} />
                        <CustomButton MainText={t('Cancel')} BgGiven={colors.WHITE} txColor={colors.GREEN} />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITE,
    },
    notesInput: {
        borderColor: colors.GRAY,
        borderWidth: 1,
        borderRadius: 5,
        padding: wp(2),
        height: hp(10),
        textAlignVertical: "top", // Ensures text starts at the top
    },
    navbarContainer: {
        height: hp('8.2%'),
        backgroundColor: colors.LIGHT_GRAY,
        marginTop: hp('0.14%'),
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchContainer: {
        marginVertical: hp('3.2%'),
        height: hp('7%'),
    },
    bodyContainer: {
        alignItems: 'center',
        marginBottom: hp(4),
        padding: wp(5),
    },
    selectercontainer: {
        width: wp(100),
        height: hp(15),
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: 'center',
        marginTop: hp(1),
    },
    headerRow: {
        marginTop: hp(2),
        marginBottom: hp(2),
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: hp(3),
        color: colors.DARK_GRAY,
    },

    itemBox: {
        width: wp(30),
        height: hp(5),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#D3D3D3',
        borderRadius: 8,
        marginVertical: hp(0.5),
        marginHorizontal: wp(1),
    },
    selectedBox: {
        borderColor: colors.GREEN,
    },
    itemText: {
        color: '#000',
        fontSize: hp(2),
    },
    selectedText: {
        color: colors.GREEN,
        fontWeight: 'bold',
    },
    recommendedProducts: {
        marginTop: hp('2%'),
        marginLeft: wp(2)
    },
    recommendedTitle: {
        fontSize: hp('3%'),
        fontFamily: fonts.SemiBold,
        marginBottom: hp('2%'),
    },
    productRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: wp(3),
        borderRadius: 10,
        width: '100%',
    },
    productText: {
        color: colors.PRIMARY,
        fontSize: hp(2),
        width: hp(20)
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: wp(30),
    },

    notesContainer: {
        marginLeft: hp(2.9),
        width: '85%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.5,
        shadowRadius: 6,
        // elevation: 5,
    },
    amountContainer: {
        width: '100%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.5,
        shadowRadius: 6,
        // elevation: 5,
    },

});

export default LineOfCreditPay;