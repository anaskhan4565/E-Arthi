import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Navbar from '../../Navbar/Navbar';
import CustomSearchApp from '../../CustomComponent/CustomSearchApp';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import colors from '../../../../../util/Constants/colors';
import { fonts } from '../../../../../util/Constants/FontName';
import { useNavigation } from '@react-navigation/native';

const DrPostDetail = ({route, navigation}) => {
    const [reply, setReply] = useState('');
    // const navigation = useNavigation();
    const { postData } = route.params;

    const commentData = [
        {
            commenterName: 'Awais Waheed',
            commentText: 'You can contact me on my email id!',
        },
        {
            commenterName: 'Hassan Mustafa',
            commentText: 'Same here! please help me out !',
        },
        {
            commenterName: 'Hadi Khan',
            commentText: 'Ahh ! I think you should try this fertilizer!',
        }
            
    ]
    const renderComment = (index) => (
        <View key={index} style={styles.commentItem}>
            <View style={styles.commentHeader}>
                <Image
                    source={require('./AssetsPlantDr/Community/index.png')}
                    style={styles.commenterAvatar}
                />
                <Text style={styles.commenterName}>{commentData[index].commenterName}</Text>
            </View>
            <Text style={styles.commentText}>{commentData[index].commentText}</Text>
            <View style={styles.commentFooter}>
                <TouchableOpacity style={styles.reactionButton}>
                    <Image
                        source={require('./AssetsPlantDr/Community/like.png')}
                        style={styles.reactionIcon}
                    />
                    <Text style={styles.reactionCount}>0</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.reactionButton}>
                    <Image
                        source={require('./AssetsPlantDr/Community/dislike.png')}
                        style={styles.reactionIcon}
                    />
                    <Text style={styles.reactionCount}>0</Text>
                </TouchableOpacity>
            </View>
        </View>
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
                <Text style={styles.pageTitle}>{postData.title}</Text>

                <View style={styles.postDetailContainer}>
                    <Text style={styles.problemDetail}>
                        {postData.Problem}
                    </Text>
                    <View style={styles.authorInfo}>
                        <Text style={styles.authorLabel}>By: {postData.author}</Text>
                        <Text style={styles.postDateLabel}>Posted on: {postData.date}</Text>
                    </View>
                    <View style={styles.reactionContainer}>
                        <TouchableOpacity style={styles.reactionButton}>
                            <Image
                                source={require('./AssetsPlantDr/Community/like.png')}
                                style={styles.reactionIcon}
                            />
                            <Text style={styles.reactionCount}>0</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.reactionButton}>
                            <Image
                                source={require('./AssetsPlantDr/Community/like.png')}
                                style={styles.reactionIcon}
                            />
                            <Text style={styles.reactionCount}>0</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.divider} />

                {/* Comments section */}
                {[0, 1, 2].map(index => renderComment(index))}
            </ScrollView>

            <View style={styles.replyContainer}>
                <TextInput
                    style={styles.replyInput}
                    placeholder="Write your answer..."
                    placeholderTextColor="#999"
                    value={reply}
                    onChangeText={setReply}
                    multiline
                />
                <TouchableOpacity style={styles.sendButton}>
                    <Image
                        source={require('./AssetsPlantDr/Community/send.png')}
                        style={styles.sendIcon}
                    />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITE,
    },
    navbarContainer: {
        height: hp("8.2%"),
        backgroundColor: "white",
        marginTop: hp("0.14%"),

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
        fontSize: wp(5),
        fontWeight: 'bold',
        color: '#000',
        marginVertical: hp(2),
    },
    postDetailContainer: {
        backgroundColor: '#fff',
        borderRadius: wp(3),
        padding: wp(4),
        marginBottom: hp(2),
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    problemDetail: {
        fontSize: wp(4),
        color: '#000',
        fontFamily:fonts.SemiBold,
        marginBottom: hp(2),
    },
    authorInfo: {
        marginBottom: hp(2),
    },
    authorLabel: {
        fontSize: wp(3.5),
        color: '#000',
        fontWeight: 'bold',
    },
    postDateLabel: {
        fontSize: wp(3.2),
        color: '#666',
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
    divider: {
        height: 1,
        backgroundColor: colors.GREEN,
        marginVertical: hp(2),
    },
    commentItem: {
        backgroundColor: colors.LIGHT_GREEN,
        borderWidth: 1,
        borderColor: colors.GREEN,
        borderRadius: wp(3),
        padding: wp(3),
        marginBottom: hp(2),
        borderLeftWidth: 3,
        borderLeftColor: '#00a884',
    },
    commentHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp(1),
    },
    commenterAvatar: {
        width: wp(6),
        height: wp(6),
        borderRadius: wp(3),
        marginRight: wp(2),
    },
    commenterName: {
        fontSize: wp(3.5),
        fontWeight: 'bold',
        color: '#000',
    },
    commentText: {
        fontSize: wp(3.5),
        color: '#333',
        fontFamily:fonts.Regular,
        marginBottom: hp(1),
    },
    commentFooter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    replyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: wp(4),
        paddingVertical: hp(1.5),
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        backgroundColor: '#fff',
    },
    replyInput: {
        flex: 1,
        minHeight: hp(5),
        maxHeight: hp(10),
        backgroundColor: '#f0f0f0',
        borderRadius: wp(5),
        paddingHorizontal: wp(3),
        paddingVertical: hp(1),
        fontSize: wp(3.5),
        color: '#333',
    },
    sendButton: {
        marginLeft: wp(2),
        width: wp(10),
        height: wp(10),
        borderRadius: wp(5),
        backgroundColor: '#00a884',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sendIcon: {
        width: wp(5),
        height: wp(5),
        resizeMode: 'contain',
        tintColor: '#fff',
    },
});

export default DrPostDetail;