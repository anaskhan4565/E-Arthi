import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CustomImageButton from '../../CustomComponent/CustomImageButton';
import ScreensName from '../../../../../util/ScreensName';
import colors from '../../../../../util/colors';
import { fonts } from '../../../../../util/FontName';

const MandiNavbar = ({ NameStock, NameExchange, isNotification, navigateBack }) => {
    return (
        <View style={styles.StickyNavbar}>
            <View style={styles.header}>
                <CustomImageButton SourceGiven={require("../../../../assets/MainApp/Sidebar/Back.png")} h={hp("4%")} w={hp("4%")} isNavigation={1} name={ScreensName.Home} />
                <Text style={styles.Heading}>POTATO MOK</Text>
                <CustomImageButton SourceGiven={require("../../../../assets/MainApp/HomeScreen/Bell.png")} h={hp("4%")} w={hp("4%")} />
            </View>
        </View>
    );
}

export default MandiNavbar;

const styles = StyleSheet.create({
    header: {
        marginTop: hp("2%"),
        height:hp(7),
        flexDirection: "row",
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: colors.LIGHT_GREEN,
        alignItems:'center'
    },
    Heading: {
        fontSize: hp("2.5%"),
        alignSelf: "center",
        fontFamily:fonts.ExtraBold,
        margin:hp(0.4),
        color: colors.BLACK,
    },
    StickyNavbar: {
        position: 'absolute',  // Use absolute positioning
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 10,
        backgroundColor: colors.WHITE,
    },
});
