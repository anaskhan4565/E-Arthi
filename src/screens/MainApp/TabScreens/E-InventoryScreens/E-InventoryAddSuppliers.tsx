import React from 'react';
import type { PropsWithChildren } from 'react';
import ECategories from '../../../../../util/Data/E-Categories.js';
import Navbar from '../../Navbar/Navbar.jsx';
import CustomSearchApp from '../../CustomComponent/CustomSearchApp.jsx';
import CustomButton from '../../../../components/CustomButton.jsx';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../../../../../util/Constants/colors.js';
import Categorybox from '../../CustomComponent/Categorybox.jsx';
import ProductBox from '../../CustomComponent/ProductBox.jsx';
import ItemBox from '../../CustomComponent/ItemBox.jsx';
import { EInventoryDet } from '../../../../../util/Data/E-Inventory.js';
import EInventoryBoxes from '../../CustomComponent/EInventoryBoxes.jsx';
import { useNavigation } from '@react-navigation/native';
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
    TextInput
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { fonts } from '../../../../../util/Constants/FontName.js';
import ScreensName from '../../../../../util/Constants/ScreensName.ts';
import CustomInput from '../../../../components/CustomInput.jsx';

import { Picker } from '@react-native-picker/picker';
import PickerMainLogin from '../../CustomComponent/PickerMainLogin.jsx';
import CustomPicker from '../../EMandi/CustomComp/CustomPicker.jsx';

function EInventoryDetails(): React.JSX.Element {
    const { t } = useTranslation();
    const navigation = useNavigation();
    const [selectedPaymentCycle, setSelectedPaymentCycle] = React.useState('');

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
                    <View style={styles.headerRow}>
                        <Text style={styles.headerText}>{t('Add Vendor')}</Text>
                    </View>

                    <View style={styles.detailsContainer}>
                        <View style={styles.detailRow}>
                            <Text style={styles.label}>{t('Vendor Name')}</Text>
                            <TextInput
                                placeholder='Enter Here'
                                style={[styles.value, { paddingHorizontal: wp(2) }]}
                            />
                        </View>
                        <View style={styles.detailRow}>
                            <Text style={styles.label}>{t('Category')}</Text>
                            <TextInput
                                placeholder={t('Enter Here')}
                                style={[styles.value, { paddingHorizontal: wp(2) }]}
                            />
                        </View>
                        <View style={styles.detailRow}>
                            <Text style={styles.label}>{t('Seller Information')}</Text>
                            <TextInput
                                placeholder={t('Enter Here')}
                                style={[styles.value, { paddingHorizontal: wp(2) }]}
                            />
                        </View>
                        <View style={styles.detailRow}>
                            <Text style={styles.label}>{t('Delivery Address')}</Text>
                            <TextInput
                                placeholder={t('Enter Here')}
                                style={[styles.value, { paddingHorizontal: wp(2) }]}
                            />
                        </View>
                        <View style={styles.detailRow}>
                            <Text style={styles.label}>{t('Payment Cycle')}</Text>
                            <View style={[styles.value, {
                                borderWidth: 0
                            }]}>
                                <CustomPicker
                                    items={[
                                        { label: "Select Payment Cycle", value: "Select Payment Cycle" },
                                        { label: "Weekly", value: "Weekly" },
                                        { label: "Bi-weekly", value: "Bi-weekly" },
                                        { label: "Monthly", value: "Monthly" },
                                        { label: "Quarterly", value: "Quarterly" },

                                    ]}
                                    isheader={true}
                                    bg_color_on={true}
                                    allow_shadow={false}
                                    min_given={hp(25)}
                                    w_given={hp(27.5)}
                                    hp_given={hp(4)}
                                    tx_color={colors.WHITE}
                                    padding_f={true}
                                />
                            </View>
                        </View>
                    </View>

                    <View style={styles.buttonContainer}>
                        <CustomButton
                            MainText={t('Add new inventory')}
                            BgGiven={colors.GREEN}
                            txColor={colors.WHITE}
                            isNavigation={true}
                            name={ScreensName.EInventorySupplier}
                        />
                        <CustomButton
                            MainText={t('Edit')}
                            BgGiven={colors.WHITE}
                            txColor={colors.GREEN}
                            isNavigation={true}
                            name={ScreensName.EInventorySuppliersList}
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
    headerRow: {
        flex: 0.5,
        marginTop: hp(-3),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginLeft: wp(6),
        width: "100%",
        // marginLeft: wp(-39)
    },
    headerTextWrapper: {
        flex: 0.7,
        marginLeft: wp(6),
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: hp(3.5),
    },
    reorderButtonWrapper: {
        flex: 0.3,
        marginRight: wp(1.5),
    },
    reorderButton: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        borderColor: colors.GREEN,
        width: wp("23%"),
        height: hp("3%"),
        backgroundColor: colors.GREEN,
        borderWidth: 1,
    },
    reorderButtonText: {
        color: colors.WHITE,
        fontSize: hp('1.6%'),
        textAlign: 'center',
    },
    detailsContainer: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp(1),
    },
    detailRow: {
        flexDirection: 'row',
        marginTop: hp(2),
        flex: 1,
        alignItems: 'center',
    },
    label: {
        width: wp(35),
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
    buttonContainer: {
        flex: 0.2,
        gap: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp(4),
    },
});

export default EInventoryDetails;
