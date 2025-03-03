import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CustomImageButton from '../../CustomComponent/CustomImageButton';
import ScreensName from '../../../../../util/Constants/ScreensName';
import colors from '../../../../../util/Constants/colors';
import { fonts } from '../../../../../util/Constants/FontName';
import CustomPicker from './CustomPicker';

const MandiNavbar = ({ NameStock, NameExchange, isNotification, navigateBack }) => {
    return (
        <View style={styles.StickyNavbar}>
            <View style={styles.header}>
                <CustomImageButton SourceGiven={require("../../../../assets/MainApp/Sidebar/Back.png")} h={hp("4%")} w={hp("4%")} isNavigation={1} name={ScreensName.MainTabNavigation} />
                {/* <Text style={styles.Heading}>POTATO MOK</Text> */}
                <View style={{ flex: 0.6 }}>

                    <CustomPicker items={[
                        { label: "Carrots/MOK", value: "CARROTS/MOK" },
                        { label: "Cotton/MOK", value: "COTTON/MOK" },
                        { label: "WHEAT/MOK", value: "WHEAT/MOK" },
                        { label: "APPLES/MOK", value: "APPLES/MOK" },

                    ]} key={0} isheader={true}
                        w_given={hp(20)}
                        hp_given={hp(2)}
                        placeholder='POTATO/MOK'
                        min_given={hp(20)}
                    />
                </View>
                <CustomImageButton SourceGiven={require("../../../../assets/MainApp/HomeScreen/Bell.png")} h={hp("4%")} w={hp("4%")} />
            </View>
        </View>
    );
}

export default MandiNavbar;

const styles = StyleSheet.create({
    header: {
        marginTop: hp("2%"),
        height: hp(7),
        flexDirection: "row",
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: colors.LIGHT_GREEN,
        alignItems: 'center'
    },
    Heading: {
        fontSize: hp("2.5%"),
        alignSelf: "center",
        fontFamily: fonts.ExtraBold,
        margin: hp(0.4),
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
