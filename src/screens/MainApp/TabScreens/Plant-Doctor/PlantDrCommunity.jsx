import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Navbar from '../../Navbar/Navbar';
import CustomSearchApp from '../../CustomComponent/CustomSearchApp';
import colors from '../../../../../util/Constants/colors';
import { fonts } from '../../../../../util/Constants/FontName';
import { useNavigation } from '@react-navigation/native';
import ScreensName from '../../../../../util/Constants/ScreensName.ts';
const PlantDrCommunity = () => {
    const navigation = useNavigation();

    const postData = [
        {
            title: 'Help to identify problem with my carrot',
            Problem:'Change of leaves color to yellow and spots on stem',
            author: 'Muhammad Idrees',
            date: '20 September, 2024',
            location: 'Pakistan',
            like: 52,
            dislike: 2,
            comments: 5
        }
        ,
        {
            title: 'Best Wheat Fertilizer in Pakistan',   
            Problem:'Best Wheat Fertilizer in Pakistan is really hard to find. My crops need good health!',
            author: 'Zaid Khan',
            date: '20 december, 2024',
            location: 'Pakistan',
            like: 22,
            dislike: 1,
            comments: 2
        },
        {
            title: 'Can we add more fertilizer to the soil?',
            Problem:'Just wondering if we can add more fertilizer to the soil and if it will be good for the crops?',
            author: 'Muhammad Hadi',
            date: '20 August, 2024',
            location: 'Pakistan',
            like: 45,
            dislike: 0,
            comments: 12
        }
        ]
            
    const renderPostItem = (index) => (

        <TouchableOpacity key={index} style={styles.postItem} onPress={() => navigation.navigate(ScreensName.DrPostDetail, { postData: postData[index] })}>
            <View style={styles.postHeader}>
                <Text style={styles.postTitle}>{postData[index].title}</Text>
                <Text style={styles.postAuthor}>{postData[index].author}</Text>
                <Text style={styles.postDate}>{postData[index].date}</Text>
                <Text style={styles.postLocation}>{postData[index].location}</Text>
            </View>
            <View style={styles.postImageContainer}>
                <Image
                    source={require('./AssetsPlantDr/Community/index.png')}
                    style={styles.postImage}
                />
            </View>
            <View style={styles.postFooter}>
                <View style={styles.reactionContainer}>
                    <TouchableOpacity style={styles.reactionButton}>
                        <Image
                            source={require('./AssetsPlantDr/Community/like.png')}
                            style={styles.reactionIcon}
                        />
                        <Text style={styles.reactionCount}>{postData[index].like}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.reactionButton}>
                        <Image
                            source={require('./AssetsPlantDr/Community/dislike.png')}
                            style={styles.reactionIcon}
                        />
                        <Text style={styles.reactionCount}>{postData[index].dislike}</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.commentsButton}>
                    <Text style={styles.commentsText}>{postData[index].comments} comments</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.navbarContainer}>
                <Navbar gobackOnly={true} />
            </View>

      
            <ScrollView style={styles.contentContainer}>
            <View style={styles.searchContainer}>
                    <CustomSearchApp
                        placeholder={"Search in here"}
                    />
                </View>
                <Text style={styles.pageTitle}>Community</Text>

                {/* Render 3 post items */}
                {[0, 1, 2].map(index => renderPostItem(index))}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:colors.WHITE,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: wp(4),
        backgroundColor: '#f2f9f9',
    },
    profileContainer: {
        width: wp(10),
        height: wp(10),
        borderRadius: wp(5),
        overflow: 'hidden',
    },
    profileImage: {
        width: '100%',
        height: '100%',
    },
    logo: {
        width: wp(12),
        height: wp(8),
        resizeMode: 'contain',
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(4),
    },
    icon: {
        width: wp(6),
        height: wp(6),
        resizeMode: 'contain',
    },
    searchContainer: {
        marginVertical: hp("3.2%"),
        height: hp("2%"),
        marginLeft: hp(1),
        alignSelf: "center",

    },
    searchInput: {
        flex: 1,
        height: hp(5),
        fontSize: wp(3.5),
        color: '#333',
    },
    searchIcon: {
        padding: wp(2),
    },

    searchIconImage: {
        width: wp(5),
        height: wp(5),
        resizeMode: 'contain',
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: wp(4),
    },
    pageTitle: {
        fontSize: wp(6),
        fontFamily:fonts.SemiBold,
        marginVertical: hp(2),
        color:colors.BLACK,
    },
    navbarContainer: {
        height: hp("8.2%"),
        backgroundColor: "white",
        marginTop: hp("0.14%"),

    },
    postItem: {
        marginBottom: hp(2),
        backgroundColor: colors.LIGHT_GREEN,
        borderRadius: wp(3),
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    postHeader: {
        padding: wp(3),
    },
    postTitle: {
        fontSize: wp(3.8),
        fontWeight: fonts.Medium,
        color: '#000',
        marginBottom: hp(0.5),
    },
    postAuthor: {
        fontSize: wp(3.3),
        color: '#000',
    },
    postDate: {
        fontSize: wp(3),
        color: '#666',
    },
    postLocation: {
        fontSize: wp(3),
        color: '#666',
    },
    postImageContainer: {
        width: '100%',
        height: hp(15),
        backgroundColor: '#f0f0f0',
    },
    postImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    postFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: wp(2),
    },
    reactionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    reactionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: wp(4),
    },
    reactionIcon: {
        width: wp(5),
        height: wp(5),
        resizeMode: 'contain',
        marginRight: wp(1),
    },
    reactionCount: {
        fontSize: wp(3.2),
        color: '#666',
    },
    commentsButton: {
        backgroundColor: '#00a884',
        paddingVertical: hp(0.5),
        paddingHorizontal: wp(2),
        borderRadius: wp(3),
    },
    commentsText: {
        color: '#fff',
        fontSize: wp(3),
    },
});

export default PlantDrCommunity;