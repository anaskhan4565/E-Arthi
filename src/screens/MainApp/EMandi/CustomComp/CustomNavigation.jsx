import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomButton from '../../../../components/CustomButton'
import ScreensName from '../../../../../util/ScreensName'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useTranslation } from 'react-i18next';
import { fonts } from '../../../../../util/FontName';

const CustomNavigationMandi = () => {
    const { t } = useTranslation();

    return (
        <View style={styles.navButtonsContainer}>

            <View style={styles.navButtons}>
                <CustomButton MainText={t('Overview')} hgiven={hp(4)} wgiven={wp(30)} isNavigation={true} name={ScreensName.EMandi} b_width={0} b_end_only={hp(0.5)} isSelected={true} />
                <CustomButton MainText={t('Market Dept')} hgiven={hp(4)} wgiven={wp(30)} isNavigation={true} name={ScreensName.MarketDept} b_width={0} b_end_only={2} />
                <CustomButton MainText={t('Profile')} hgiven={hp(4)} wgiven={wp(30)} isNavigation={true} name={ScreensName.Profile} b_width={0} b_end_only={2} />
            </View>
        </View>
    )
}

export default CustomNavigationMandi

const styles = StyleSheet.create({

    navButtonsContainer: {
        flex: 0.1,
    },
    navButtons: {
        flex: 0.1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: hp(10),
    },
})