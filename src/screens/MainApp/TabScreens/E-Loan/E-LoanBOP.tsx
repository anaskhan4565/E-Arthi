import React from 'react';
import type { PropsWithChildren } from 'react';
import { fonts } from '../../../../../util/FontName';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {
    SafeAreaView,
    TextInput,
    StyleSheet,
    Text,
    Image,
    View,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import colors from '../../../../../util/colors';




function EloanBOP(): React.JSX.Element {
    const { t } = useTranslation();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                      <Image style={styles.image} source={require('../../../../../src/assets/MainApp/E-Loan/BOP.png')} />
                      <Text style={styles.titletext}>Habib Bank</Text>
                  </View>
                  <View style={styles.inputcontainer}>
                      <View style={styles.detailRow}>
                          <Text style={styles.label}>{t('Supplier name')}</Text>
                          <TextInput
                              placeholder={t('Enter Here')}
                              style={styles.value}
                          />
                      </View>
                      <View style={styles.detailRow}>
                          <Text style={styles.label}>{t('Item account')}</Text>
                          <TextInput
                              placeholder={t('Enter Here')}
                              style={styles.value}
                          />
                      </View>
                      <View style={styles.detailRow}>
                          <Text style={styles.label}>{t('Delivery address')}</Text>
                          <TextInput
                              placeholder={t('Enter Here')}
                              style={styles.value}
                          />
                      </View>
                      <View style={styles.detailRow}>
                          <Text style={styles.label}>{t('Seller information')}</Text>
                          <TextInput
                              placeholder={t('Enter Here')}
                              style={styles.value}
                          />
                      </View>
                      <View style={styles.detailRow}>
                          <Text style={styles.label}>{t('Delivery time')}</Text>
                          <TextInput
                              placeholder={t('Enter Here')}
                              style={styles.value}
                          />
                      </View>
                      <View style={styles.detailRow}>
                          <Text style={styles.label}>{t('Supplier name')}</Text>
                          <TextInput
                              placeholder={t('Enter Here')}
                              style={styles.value}
                          />
                      </View>
      
                  </View>
      
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: "center",
        alignItems: 'center',
        backgroundColor: colors.WHITE,
    },
    titletext: {
        fontSize: hp(3),
        fontFamily: fonts.SemiBold,
    },
    header: {
        marginTop: hp(2),
        width: wp(90),
        height: hp(20),
        borderRadius: 8,
        elevation: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.WHITE,

    },
    image: {
        resizeMode: 'contain',
        width: wp(35),
        height: hp(12),
    },
    inputcontainer: {
        width: wp(100),
        height: hp(40),
        // backgroundColor: "blue",
        marginTop: hp(3),

    },
    detailRow: {
        flexDirection: 'row',
        marginTop: hp(2),
        flex: 1,
        alignItems: 'center',
    },
    label: {
        width: wp(30),
        marginLeft: wp(6),
        fontSize: hp(1.75),
    },
    value: {
        width: wp(60),
        fontSize: hp(1.5),
        fontFamily: fonts.Regular,
        marginRight: wp(5),
        height: hp(5),
        borderWidth: 1,
        borderRadius: 4,
        borderLeftColor: '#D3D3D3',
    },
});

export default EloanBOP;
