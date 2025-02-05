import {
    Dimensions,
    SafeAreaView,
    Image,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import React, { useEffect, useState } from 'react'
import CustomButton from '../../../../components/CustomButton'
import colors from '../../../../../util/colors'
import { fonts } from '../../../../../util/FontName';
import HandImg from '../../../../assets/MainApp/E-Mandi/Hand.png'
import { useTranslation } from 'react-i18next';
const CustomTrade = ({ isExpanded, setIsExpanded }) => {
  const { t } = useTranslation();

    return (
        <View style={{
            flex: 0.19,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.25,
            shadowRadius: 1,
            elevation: 2,
            borderRadius: hp(0.4),
            backgroundColor: '#e5e5e5'
        }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: hp(1), flex: 0.3 }}>
                <Text style={{ fontWeight: '800', fontSize: hp(2), color: colors.BLACK }}>{t('Holdings')}</Text>
            </View>
            <View style={{ flex: 0.6, flexDirection: 'row' }}>
                <View style={{ flex: 0.3}}>
                    <Image source={HandImg} style={{width:hp(8), height:hp(6)}}/>
                </View>
                <View style={{ flex: 0.6 }}>
                    <Text style={{fontWeight:'bold'}}>{t('Portfolio Holdings')}</Text>
                    <View style={{ flexDirection: 'row', flex: 0.4 }}>
                        <View style={{ flex: 0.7 }}>

                            <Text style={{fontWeight:'bold'}}>{t('Shr Holding:')}</Text>
                        </View>
                        <View style={{ flex: 0.4 }}>

                            <Text style={{fontFamily:fonts.bold,fontSize:hp(1.6)}}>40</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', flex: 0.4 }}>
                        <View style={{ flex: 0.7 }}>

                            <Text style={{fontWeight:'bold'}}>{t('Avg Price:')}</Text>
                        </View>
                        <View style={{ flex: 0.4 }}>

                            <Text style={{color:colors.GREEN,fontWeight:'bold'}}>10.2</Text>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 0.8, flexDirection: 'row', gap: hp(1), justifyContent: 'center', alignItems: 'center' }}>
                    <CustomButton MainText={t('Buy')} hgiven={hp(5)} wgiven={wp(20)} b_radius={hp(0.3)} BgGiven={colors.GREEN} txColor={colors.WHITE} onPressG={() => setIsExpanded((prev) => !prev)} />
                    <CustomButton MainText={t('Sell')} hgiven={hp(5)} wgiven={wp(20)} b_radius={hp(0.3)} BgGiven={colors.RED} bordergiven={colors.RED} txColor={colors.WHITE} onPressG={() => setIsExpanded((prev) => !prev)} />


                </View>

            </View>
        </View>
    )
}

export default CustomTrade

const styles = StyleSheet.create({})