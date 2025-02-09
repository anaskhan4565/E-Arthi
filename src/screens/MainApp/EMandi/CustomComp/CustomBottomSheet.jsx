import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomBottomSheet from './CustomDownBar'
import CustomTrade from './CustomTrade'
import CustomPicker from './CustomPicker'
import { TextInput } from 'react-native-paper'
import colors from '../../../../../util/colors'
import CustomButton from '../../../../components/CustomButton'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { fonts } from '../../../../../util/FontName'
import { useTranslation } from 'react-i18next'

const CustomBottomSheetExport = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { t } = useTranslation();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [currentState, setCurrentState] = useState(['Buy'])
    console.log(currentState)
    return (
        <CustomBottomSheet expanded={isExpanded}>
            <View style={{ flex: 1, flexDirection: 'col' }} >
                <CustomTrade isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
                <View style={{ flex: 0.8, flexDirection: 'row' }}>
                    <View style={{ flex: 0.4, gap: hp(2) }}>
                        <CustomPicker items={[
                            { label: "Option 1", value: "9.6" },
                            { label: "Option 2", value: "10" },
                            { label: "Option 3", value: "9.3" },
                        ]} key={2}
                            w_given={hp(17)}
                            hp_given={hp(3)}
                            min_given={hp(15)}
                            defaultValue={0}

                        />

                        <CustomPicker items={[
                            { label: "Buy", value: "Buy" },
                            { label: "Sell", value: "Sell" },
                        ]}
                            w_given={hp(17)}
                            defaultValue={0}
                            stateName={'BuyScreen'}
                            hp_given={hp(3)}
                            min_given={hp(15)}
                            key={24} currentState={currentState} setCurrentState={setCurrentState} />
                        <CustomPicker items={[
                            { label: "Limit", value: "Limit" },
                            { label: "Market", value: "Market" },
                        ]} key={8}
                            w_given={hp(17)}
                            hp_given={hp(3)}
                            defaultValue={0}

                            min_given={hp(15)}
                        />
                        <View style={{ width: hp(17) }} >
                            <TextInput
                                placeholder={t('100')}
                                style={{ backgroundColor: colors.LIGHT_GRAY }}
                                keyboardType="number-pad" // Opens a numeric keypad
                            />
                        </View>
                        <View style={{ flex: 0.01, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ fontWeight: '900', color: colors.RED }}>9.22</Text>
                            <Text style={{ fontWeight: '900', color: colors.GREEN }}>11.22</Text>
                        </View>
                        <View style={{ flex: 0.2, width: hp(17) }}>
                            <TextInput placeholder={t('10.15')}
                            keyboardType="number-pad" // Opens a numeric keypad
                
                            style={{ backgroundColor: colors.LIGHT_GRAY }} />
                        </View>

                        <View style={[styles.passInputBox, { marginTop: hp(3) }]}>
                            <TextInput
                                style={styles.passInput}
                                placeholder={t("Pin")}
                                keyboardType="number-pad" // Opens a numeric keypad

                                placeholderTextColor={colors.BLACK}
                                secureTextEntry={passwordVisible}
                            />
                            <TouchableOpacity
                                style={styles.passToggleButton}
                                onPress={() => setPasswordVisible(!passwordVisible)}
                            >
                                <Image
                                    source={require("../../../../assets/EyeHide.png")}
                                    style={styles.showPassIcon}
                                ></Image>
                            </TouchableOpacity>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <CustomButton MainText={currentState == 'Buy' ? t('Buy') : t('Sell')}
                                hgiven={hp(5)} wgiven={wp(35)} b_radius={hp(0.3)}
                                BgGiven={currentState == 'Buy' ? colors.GREEN : colors.RED}
                                bordergiven={currentState == 'Buy' ? colors.GREEN : colors.RED}
                                txColor={colors.WHITE} />
                        </View>
                    </View>
                    <View style={{ flex: 0.6, borderWidth: 1 }}>
                        <View style={{ flex: 1, borderWidth: 1 }}>
                            <View
                                style={{
                                    alignItems: 'center',
                                    backgroundColor: colors.LAVENDER_SYRUP,
                                    margin: hp(1),
                                    width: hp(25),
                                    height: wp(15),
                                    justifyContent: 'center',
                                    alignSelf: 'center',
                                    borderRadius: 8,
                                    shadowColor: '#000',
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 3.84,
                                    elevation: 5,
                                }}
                            >
                                <Text style={{ textAlign: 'center', fontSize: hp(1.8), fontWeight: '700' }}>
                                    {t('MBO-Market Depth By Order')}
                                </Text>
                            </View>
                        </View>

                        <View style={{ flex: 1, borderWidth: 1 }}>

                            <View style={{ flex: 1, borderWidth: 1 }}>
                                <View
                                    style={{
                                        alignItems: 'center',
                                        backgroundColor: colors.LAVENDER_SYRUP,
                                        margin: hp(1),
                                        width: hp(25),
                                        height: wp(15),
                                        justifyContent: 'center',
                                        alignSelf: 'center',
                                        borderRadius: 8,
                                        shadowColor: '#000',
                                        shadowOffset: { width: 0, height: 2 },
                                        shadowOpacity: 0.25,
                                        shadowRadius: 3.84,
                                        elevation: 5,
                                    }}
                                >
                                    <Text style={{ textAlign: 'center', fontSize: hp(1.8), fontWeight: '700' }}>
                                        {t('MBO-Market Depth By Price')}
                                    </Text>
                                </View>
                            </View>
                        </View>


                    </View>


                </View>
            </View>

        </CustomBottomSheet>
    )
}

export default CustomBottomSheetExport

const styles = StyleSheet.create({
    passInputBox: {
        height: hp('5%'),
        width: wp(30),
        fontSize: hp('1.7%'),
        fontFamily: fonts.Regular,
        justifyContent: "center",
        alignSelf: "center",
        alignItems: "center",
        marginHorizontal: hp(3),
        flexDirection: "row",
        borderWidth: 1,
        borderRadius: hp('1.2%'),
    },
    passInput: {
        flex: 3,
        fontSize: hp('1.7%'),
        fontFamily: fonts.Regular,
        borderRadius: hp('1.3%'),
        color: colors.BLACK,
        backgroundColor: colors.WHITE,
        height: hp(1),
    },

    //for input eye pass
    showPassIcon: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
})