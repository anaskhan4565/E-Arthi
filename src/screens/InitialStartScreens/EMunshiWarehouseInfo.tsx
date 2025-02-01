import React, { useState } from 'react';
import type { PropsWithChildren } from 'react';
import ECategories from '../../../util/E-Categories.js';
import Navbar from '../MainApp/Navbar/Navbar.jsx';
import CustomSearchApp from '../MainApp/CustomComponent/CustomSearchApp.jsx';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../../../util/colors.js';
import { EInventoryDet } from '../../../util/E-Inventory.js';
import EInventoryBoxes from '../MainApp/CustomComponent/EInventoryBoxes.jsx'
import warehouse from '../../assets/warehouse.png'
import linegraph from '../../assets/warehouseinfograph.png'
import Wbox from '../MainApp/CustomComponent/WarehouseBox.jsx';
import InventoryProduct from '../MainApp/CustomComponent/WarehouseProduct.jsx';

import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { fonts } from '../../../util/FontName.js';
import ScreensName from '../../../util/ScreensName.ts';



function EInventory(): React.JSX.Element {
    const { t } = useTranslation();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    // Find the selected category from ECategories
    const selectedCategoryData = ECategories.find(cat => cat.title === selectedCategory);

    console.log("Selected Category:", selectedCategory);
    console.log("Selected Category Data:", selectedCategoryData);

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.navbarContainer}>
                <Navbar />
            </View>
            <ScrollView style={styles.container}>
                <View style={styles.bodyContainer}>
                    <View style={styles.scrollContainer}>
                        <View style={styles.itemBoxWrapper}>
                            <EInventoryBoxes name={t('Warehouse A')} screenName={'Connect'} navigationName={t(ScreensName.EInventoryMainStack)} SourceGiven={warehouse} isNavigation={1} w={wp('80%')} h={hp('18%')} />
                            <Image source={linegraph} style={styles.infoGraphStyle} />
                        </View>
                    </View>
                </View>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>{t('Search Available Items')}</Text>
                </View>
                <View style={styles.searchContainer}>
                    <CustomSearchApp placeholder={t('Search in here')} />
                </View>
                {/* Category Selection */}
                <View style={styles.catScrollContainer}>
                    {ECategories.map((Category, index) => (
                        Category.title.trim() !== '' && (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.itemBoxWrapper,
                                    selectedCategory === Category.title && styles.selectedCategory
                                ]}
                                onPress={() => {
                                    console.log('Category Pressed:', Category.title); // Debugging log
                                    setSelectedCategory(Category.title);
                                }}
                            >
                                <Wbox name={t(Category.title)} SourceGiven={Category.img} />
                            </TouchableOpacity>
                        )
                    ))}
                </View>
                <View style={styles.recommendedProducts}>
                    {/* Display Subcategories */}
                    <Text style={styles.recommendedTitle}>{t('Item Details')}</Text>
                    {selectedCategoryData && selectedCategoryData.subcategories.length > 0 ? (
                        <View style={styles.recommendedProducts}>
                            <View style={styles.subcategoryList}>
                                {selectedCategoryData.subcategories.map((subcategory, index) => (
                                    <Text key={index} style={styles.subcategoryText}>
                                        {subcategory.name}
                                    </Text>
                                ))}
                            </View>
                        </View>
                    ) : selectedCategory ? (
                        <Text style={styles.noSubcategoriesText}>{t('No subcategories available')}</Text>
                    ) : null}

                </View>
            </ScrollView>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //alignItems: 'center',
        //justifyContent: 'center',
        backgroundColor: colors.WHITE,

    },
    navbarContainer: {
        height: hp('8.5%'),
        backgroundColor: colors.WHITE,
    },
    searchContainer: {
        height: hp('7%'),
    },
    bodyContainer: {
        alignItems: 'center',

    },
    titleContainer: {
        padding: 10,
        marginTop: hp(-2.5)
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: hp('3%'),
    },
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
        gap: hp(1.5),
    },
    selectedCategory: {
        borderBottomWidth: 3,
        borderBottomColor: colors.GREEN,
    },
    recommendedProducts: {
        marginTop: hp('2%'),
        marginLeft: wp(2)
    },
    recommendedTitle: {
        fontSize: hp('3%'),
        marginBottom: hp('2%'),
        color:colors.GREEN
    },
    productRow: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginBottom: hp('3%'),
    },
    infoGraphStyle: {
        width: wp('85%'),
        height: hp('19.5%'),
        marginLeft:wp(5)
    },
    catScrollContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: wp('95'),
        justifyContent:'center',
        marginLeft: wp(2)
    },
    subcategoryList: {
        marginTop: hp(1),
        padding: hp(1),
        backgroundColor: colors.LIGHT_GRAY,
        borderRadius: 8,
    },
    subcategoryText: {
        fontSize: hp('2.2%'),
        paddingVertical: hp(0.5),
        color: colors.BLACK,
    }
});



export default EInventory;