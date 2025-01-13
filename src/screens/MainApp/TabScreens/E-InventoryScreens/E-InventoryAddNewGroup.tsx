import React, { useState } from 'react';
import Navbar from '../../Navbar/Navbar.jsx';
import CustomSearchApp from '../../CustomComponent/CustomSearchApp.jsx';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../../../../../util/colors.js';
import CustomButton from '../../../../components/CustomButton.jsx';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Picker } from '@react-native-picker/picker';
import ToggleSwitch from 'toggle-switch-react-native';

function EInventoryAddNewGroup(): React.JSX.Element {
    const { t } = useTranslation();
    const [isToggled, setIsToggled] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navbarContainer}>
                <Navbar />
            </View>
            <ScrollView style={styles.container}>
                <View style={styles.searchContainer}>
                    <CustomSearchApp placeholder={t('Search In Here')} />
                </View>
                <View style={styles.headingContainer}>
                    <Text style={styles.headingText}>{t('Add New Inventory Group')}</Text>
                </View>

                <View style={styles.itemDetailsContainer}>
                    <View style={styles.imageContainer}>
                        <Image 
                            source={require('../../../../assets/MainApp/E-Inventory/placeholder.jpg')}
                            style={styles.itemImage}
                        />
                    </View>
                    <View style={styles.detailsContainer}>
                        <View style={styles.detailRow}>
                            <Text style={styles.labelText}>{t('Item Name')}</Text>
                            <TextInput 
                                style={styles.input}
                                placeholder={t('Enter item name')}
                            />
                        </View>
                        <View style={styles.detailRow}>
                            <Text style={styles.labelText}>{t('Place')}</Text>
                            <View style={styles.pickerContainer}>
                                <Picker
                                    style={styles.picker}
                                    mode="dropdown"
                                    itemStyle={styles.pickerItem}
                                >
                                    <Picker.Item 
                                        label={t('Select place')} 
                                        value="" 
                                        style={styles.pickerItem}
                                    />
                                    <Picker.Item 
                                        label={t('Place 1')}
                                        value="1" 
                                        style={styles.pickerItem}
                                    />
                                    <Picker.Item 
                                        label={t('Place 2')} 
                                        value="2" 
                                        style={styles.pickerItem}
                                    />
                                </Picker>
                            </View>
                        </View>
                        <View style={[styles.detailRow, styles.alertRow]}>
                            <Text style={styles.alertText}>{t('Low Quantity Alert')}</Text>
                            <ToggleSwitch
                                isOn={isToggled}
                                onColor={colors.GREEN}
                                offColor={colors.LIGHT_GRAY}
                                size="medium"
                                onToggle={isOn => setIsToggled(isOn)}
                            />
                        </View>
                    </View>
                </View>

                <View style={styles.orderInfoContainer}>
                    <Text style={styles.orderInfoHeading}>{t('Description')}</Text>
                    <Text style={styles.orderInfoText}>
                        {t('Introducing BRINC Ball transforming rescue and tactical operations! This throwable communication device enables two-way audio.')}
                    </Text>
                </View>

                <View style={styles.buttonContainer}>
                    <CustomButton 
                        MainText={t('Save')}
                        BgGiven={colors.GREEN}
                        name={""}
                        txColor={colors.WHITE}
                        isNavigation={false}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
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
        marginTop: hp('3.2%'),
        height: hp('7%'),
    },
    headingContainer: {
        paddingHorizontal: wp('5%'),
        marginBottom: hp('2%'),
    },
    headingText: {
        fontSize: wp('5%'),
        fontFamily: 'Poppins Bold',
        color: colors.BLACK,
    },
    buttonContainer: {
        alignItems: 'center',
        marginVertical: hp('2%'),
    },
    orderInfoContainer: {
        paddingHorizontal: wp('5%'),
        marginBottom: hp('2%'),
    },
    orderInfoHeading: {
        fontSize: wp('4.5%'),
        fontFamily: 'Poppins Bold',
        color: colors.BLACK,
        marginBottom: hp('1%'),
    },
    orderInfoText: {
        fontSize: wp('3.8%'),
        fontFamily: 'Poppins',
        color: colors.BLACK,
        lineHeight: hp('2.8%'),
    },
    itemDetailsContainer: {
        flexDirection: 'row',
        padding: wp('5%'),
        backgroundColor: colors.WHITE,
    },
    imageContainer: {
        width: wp('30%'),
        height: wp('30%'),
        backgroundColor: colors.LIGHT_GRAY,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    itemImage: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },
    detailsContainer: {
        flex: 1,
        marginLeft: wp('4%'),
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: hp('1.5%'),
    },
    labelText: {
        fontSize: wp('3%'),
        fontFamily: 'Poppins Medium',
        color: colors.BLACK,
        flex: 0.35,
    },
    input: {
        height: hp('4%'),
        borderWidth: 1,
        borderColor: colors.LIGHT_GRAY,
        borderRadius: 8,
        paddingHorizontal: wp('2%'),
        fontSize: wp('3%'),
        flex: 0.6,
        fontFamily: 'Poppins',
    },
    pickerContainer: {
        height: hp('4%'),
        borderWidth: 1,
        borderColor: colors.LIGHT_GRAY,
        borderRadius: 8,
        justifyContent: 'center',
        overflow: 'hidden',
        flex: 0.6,
    },
    picker: {
        height: hp('4%'),
        borderWidth: 1,
        borderColor: colors.LIGHT_GRAY,
        borderRadius: 8,
        justifyContent: 'center',
        overflow: 'hidden',
        flex: 0.6,
    },
    pickerItem: {
        fontSize: wp('3%'),
        height: hp('4%'),
        fontFamily: 'Poppins',
    },
    alertRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp('1.5%'),
    },
    alertText: {
        fontSize: wp('3%'),
        fontFamily: 'Poppins Medium',
        color: colors.BLACK,
        marginRight: wp('2%'),
    },
});

export default EInventoryAddNewGroup;
