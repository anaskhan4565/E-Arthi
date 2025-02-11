import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../../../util/colors';
import { fonts } from '../../../../../util/FontName';

const TransactionComponent = ({
    State = 2,
    Date = '09-02-2025',
    Items = 5,
    Amount = 5000,
    TR_No = 1
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Transaction {TR_No}</Text>
                <View style={[
                    styles.comp,
                    { backgroundColor: State === 1 ? '#0EAE2D' : State === 2 ? '#1B7ED4' : State === 3 ? '#e0ff63' : '#ccc' }
                ]}>
                    <Text style={[styles.statusText,{color:State==3?colors.BLACK:colors.WHITE}]}>
                        {t(State === 1 ? 'Completed' : State === 2 ? 'Active' : State === 3 ?  'Pending':null)}
                    </Text>
                </View>
            </View>
            <View style={styles.details}>
                <Text style={styles.detailText}>Date: {Date}</Text>
                <Text style={styles.detailText}>Items: {Items}</Text>
                <Text style={styles.detailText}>Amount: {Amount}</Text>
            </View>
        </View>
    );
};

export default TransactionComponent;

const styles = StyleSheet.create({
    container: {
        width: hp(20),
        height: hp(12),
        backgroundColor: '#d9fcf3',
        borderRadius: hp(0.2),
        elevation: hp(0.4),
        padding: hp(0.5),
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: hp(0.5),
    },
    title: {
        fontFamily: fonts.SemiBold,
        fontSize: hp(1.7),
    },
    comp: {
        height: hp(2.5),
        width: wp(16),
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    statusText: {
        color: colors.GREAT_WHITE,
        textAlign: 'center',
        fontSize:hp(1.2),
        fontFamily:fonts.SemiBold
    },
    details: {
        marginLeft: hp(1),
    },
    detailText: {
        fontFamily: fonts.Regular,
    },
});
