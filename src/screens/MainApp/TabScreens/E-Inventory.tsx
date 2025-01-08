import React from 'react';
import type { PropsWithChildren } from 'react';
import ECategories from '../../../../util/E-Categories';
import Navbar from '../Navbar/Navbar.jsx';
import CustomSearchApp from '../CustomComponent/CustomSearchApp.jsx';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../../../../util/colors.js';
import Categorybox from '../CustomComponent/Categorybox.jsx';

import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';




function EInventory(): React.JSX.Element {


    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.navbarContainer}>
                <Navbar />
            </View>

            <View style={styles.searchContainer}>
                <CustomSearchApp placeholder={'Search in here'} />
            </View>
            <View style={styles.bodyContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>E-Arthi Categories</Text>
                </View>

                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    {ECategories.map((Category, index) => (
                        Category.title.trim() !== '' && (
                            <View style={styles.itemBoxWrapper} key={index}>
                                <Categorybox name={Category.title} SourceGiven={Category.img} isNavigation={0} />
                            </View>
                        )
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
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
        flex: 1,
        margin: 20,

    },
    titleContainer: {
        padding: 10,
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 25,
    },
    scrollContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        // justifyContent: 'space-between',
        paddingVertical: hp('2%'),
        marginLeft: wp('2%'),
        // backgroundColor: 'red',
        width: wp('95'),

    },
    itemBoxWrapper: {
        width: '30%',
        marginBottom: hp('2%'),
        marginHorizontal: wp('-3%'),
        alignItems: 'center',

    },

});

export default EInventory;
