import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useTranslation } from 'react-i18next';
import Navbar from '../../Navbar/Navbar';
import colors from '../../../../../util/Constants/colors';
import { fonts } from '../../../../../util/Constants/FontName';
import { useNavigation, useRoute } from '@react-navigation/native';

const E_MunshiTransactionDetail = () => {
    const { t } = useTranslation();
    const navigation = useNavigation();
    const route = useRoute();

    // Get transaction data from navigation params
    const { transactiondata } = route.params || {};

    // Calculate total amount
    const calculateTotal = () => {
        if (!transactiondata || !transactiondata.Items || !transactiondata.Items.length) {
            return 0;
        }
        return transactiondata.Items.reduce((total, item) => total + (item.price * item.qty), 0);
    };

    // Format date for better display
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const parts = dateString.split('-');
        if (parts.length !== 3) return dateString;
        return `${parts[2]}-${parts[1]}-${parts[0]}`; // DD-MM-YYYY format
    };

    if (!transactiondata) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.navbarContainer}>
                    <Navbar gobackOnly={true} />
                </View>
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{t("Transaction data not found")}</Text>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.backButtonText}>{t("Go Back")}</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navbarContainer}>
                <Navbar gobackOnly={true} />
            </View>

            <ScrollView style={styles.scrollView}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerTitle}>{t("Transaction Details")}</Text>
                    <View style={[styles.statusBadge,
                    { backgroundColor: transactiondata.status === "Complete" ? colors.BLUE : colors.BRIGHTGREEN }]}>
                        <Text style={styles.statusText}>{transactiondata.status}</Text>
                    </View>
                </View>

                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>{t("Transaction Info")}</Text>
                    <DetailRow label={t("Transaction ID")} value={`#${transactiondata.id}`} />
                    <DetailRow label={t("Date")} value={formatDate(transactiondata.Date)} />
                    <DetailRow label={t("Time")} value={transactiondata.Time} />
                    <DetailRow label={t("Location")} value={transactiondata.Location} />
                    <DetailRow label={t("Vendor")} value={transactiondata.Vendor} isLast />
                </View>

                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>{t("Items Purchased")}</Text>
                    {transactiondata.Items && transactiondata.Items.length > 0 ? (
                        transactiondata.Items.map((item, index) => (
                            <View key={index} style={[styles.itemRow, index === transactiondata.Items.length - 1 && styles.noBorder]}>
                                <View style={styles.itemDetails}>
                                    <Text style={styles.itemName}>{item.name}</Text>
                                    <Text style={styles.itemQty}>{t("Quantity")}: {item.qty}</Text>
                                </View>
                                <Text style={styles.itemPrice}>{item.price.toLocaleString()} ₨</Text>
                            </View>
                        ))
                    ) : (
                        <Text style={styles.noItemsText}>{t("No items in this transaction")}</Text>
                    )}
                </View>

                <View style={styles.totalContainer}>
                    <Text style={styles.totalLabel}>{t("Total Amount")}</Text>
                    <Text style={styles.totalAmount}>{calculateTotal().toLocaleString()} ₨</Text>
                </View>

                <View style={styles.footerContainer}>
                    <Text style={styles.footerText}>
                        {t("Transaction processed via")} {transactiondata.Location === "E-Wallet Transaction" ? t("E-Wallet") : t("Bank Transfer")}
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const DetailRow = ({ label, value, isLast = false }) => (
    <View style={[styles.detailRow, !isLast && styles.borderBottom]}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={styles.detailValue}>{value}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITE,
    },
    navbarContainer: {
        height: hp(8.5),
        backgroundColor: colors.WHITE,
    },
    scrollView: {
        flex: 1,
        paddingHorizontal: wp(4),
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: hp(2),
    },
    headerTitle: {
        fontFamily: fonts.SemiBold,
        fontSize: hp(2.8),
        color: colors.BLACK,
    },
    statusBadge: {
        paddingHorizontal: wp(3),
        paddingVertical: hp(0.5),
        borderRadius: 15,
    },
    statusText: {
        fontFamily: fonts.Medium,
        fontSize: hp(1.6),
        color: colors.WHITE,
    },
    sectionContainer: {
        backgroundColor: colors.LIGHT_GREEN,
        borderRadius: 8,
        padding: wp(4),
        marginBottom: hp(2),
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    sectionTitle: {
        fontFamily: fonts.SemiBold,
        fontSize: hp(2.2),
        marginBottom: hp(1),
        color: colors.BLACK,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: hp(1),
    },
    borderBottom: {
        borderBottomWidth: 1,
        borderBottomColor: colors.LIGHT_GRAY,
    },
    detailLabel: {
        fontFamily: fonts.Regular,
        fontSize: hp(1.8),
        color: colors.DARK_GRAY,
    },
    detailValue: {
        fontFamily: fonts.Medium,
        fontSize: hp(1.8),
        color: colors.BLACK,
    },
    itemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: hp(1.5),
        borderBottomWidth: 1,
        borderBottomColor: colors.LIGHT_GRAY,
    },
    noBorder: {
        borderBottomWidth: 0,
    },
    itemDetails: {
        flex: 1,
    },
    itemName: {
        fontFamily: fonts.Medium,
        fontSize: hp(1.8),
        color: colors.BLACK,
        marginBottom: hp(0.2),
    },
    itemQty: {
        fontFamily: fonts.Regular,
        fontSize: hp(1.6),
        color: colors.GRAY,
    },
    itemPrice: {
        fontFamily: fonts.SemiBold,
        fontSize: hp(1.8),
        color: colors.BLACK,
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: colors.BLUE,
        borderRadius: 8,
        padding: wp(4),
        marginBottom: hp(2),
    },
    totalLabel: {
        fontFamily: fonts.SemiBold,
        fontSize: hp(2),
        color: colors.WHITE,
    },
    totalAmount: {
        fontFamily: fonts.Bold,
        fontSize: hp(2.2),
        color: colors.WHITE,
    },
    footerContainer: {
        alignItems: 'center',
        marginVertical: hp(2),
    },
    footerText: {
        fontFamily: fonts.Regular,
        fontSize: hp(1.6),
        color: colors.GRAY,
        textAlign: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: hp(4),
    },
    errorText: {
        fontFamily: fonts.Medium,
        fontSize: hp(2),
        color: colors.RED,
        textAlign: 'center',
        marginBottom: hp(2),
    },
    backButton: {
        backgroundColor: colors.BRIGHTGREEN,
        paddingHorizontal: wp(6),
        paddingVertical: hp(1),
        borderRadius: 8,
    },
    backButtonText: {
        fontFamily: fonts.Medium,
        fontSize: hp(1.8),
        color: colors.WHITE,
    },
    noItemsText: {
        fontFamily: fonts.Regular,
        fontSize: hp(1.8),
        color: colors.GRAY,
        textAlign: 'center',
        paddingVertical: hp(2),
    },
});

export default E_MunshiTransactionDetail; 