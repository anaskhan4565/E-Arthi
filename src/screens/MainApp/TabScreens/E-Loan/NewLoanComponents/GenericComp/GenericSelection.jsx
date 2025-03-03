import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import EInventoryBoxes from '../../../../CustomComponent/EInventoryBoxes'
import ScreensName from '../../../../../../../util/Constants/ScreensName'
import { ELoanBank } from '../../../../../../../util/Data/E-Loan'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useTranslation } from 'react-i18next'

const GenericSelection = () => {
    const { t } = useTranslation();

    return (
        <View style={styles.scrollContainer}>
            {ELoanBank.map((Category, index) => (
                Category.title.trim() !== '' && (
                    <View style={styles.itemBoxWrapper} key={index}>
                        <EInventoryBoxes
                            name={t(Category.title)}
                            screenName={Category.screen}
                            navigationName={t(ScreensName.ELoanMainStack)}
                            SourceGiven={Category.img}
                            isNavigation={1}
                            w={wp('80%')}
                            h={hp('18%')}
                            isBold={false}
                            isLightBold={true}
                            img_size_w={hp(17)}
                            font_Size={hp(3)}
                            img_size_h={hp(11)}
                        />
                    </View>
                )
            ))}
        </View>
    )
}

export default GenericSelection

const styles = StyleSheet.create({
    scrollContainer: {
        //flexWrap: 'wrap',
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



})