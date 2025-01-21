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
import CustomInput from '../../../../components/CustomInput.jsx';
import { TextInput } from 'react-native-paper';

function EInventoryDetails(): React.JSX.Element {
    const { t } = useTranslation();
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.navbarContainer}>
                <Navbar isbackSet={true} isBackTo={ScreensName.EInventorySupplier} />
            </View>
            <ScrollView style={styles.container}>
                <View style={styles.searchContainer}>
                    <CustomSearchApp placeholder={t('Search in here')} />
                </View>

                <View style={styles.bodyContainer}>
                    <View style={styles.headerRow}>
                        <Text style={styles.headerText}>{t('Add Suppliers')}</Text>
                    </View>

                    <View style={styles.detailsContainer}>
                        <View style={styles.detailRow}>
                            <Text style={styles.label}>{t('Supplier Name')}</Text>
                            <TextInput 
                            placeholder='Enter Here' 
                            style={styles.value}
                            />
                        </View>
                        <View style={styles.detailRow}>
                            <Text style={styles.label}>{t('Item Amount')}</Text>
                            <TextInput 
                            placeholder={t('Enter Here')} 
                            style={styles.value}
                            />
                        </View>
                        <View style={styles.detailRow}>
                            <Text style={styles.label}>{t('Delivery Address')}</Text>
                            <TextInput 
                            placeholder={t('Enter Here')}
                            style={styles.value}
                            />
                        </View>
                        <View style={styles.detailRow}>
                            <Text style={styles.label}>{t('Seller Information')}</Text>
                            <TextInput 
                            placeholder={t('Enter Here')}
                            style={styles.value}
                            />
                        </View>
                        <View style={styles.detailRow}>
                            <Text style={styles.label}>{t('Delivery Time')}</Text>
                            <TextInput 
                            placeholder={t('Enter Here')}
                            style={styles.value}
                            />
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
        justifyContent: 'center',
        marginLeft: wp(-39)
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
        marginTop: hp(1),
        flex:1,
        alignItems: 'center',
    },
    label: {
        width:wp(35),
        marginLeft: wp(6),
        fontSize: hp(1.75),
    },
    value: {
        width:wp(60),
        fontSize:hp(1.5),
        marginRight:wp(3),
        height:hp(3.5),
        backgroundColor:colors.WHITE,
        borderWidth:1,
        borderRadius:2
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
