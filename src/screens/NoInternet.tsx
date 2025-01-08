import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native'; 
import NetInfo from '@react-native-community/netinfo';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
} from 'react-native';
import CustomButton from '../components/CustomButton';
import colors from '../../util/colors';
import ScreensName from '../../util/ScreensName'; 

function NoInternet(): React.JSX.Element {
    const [isConnected, setIsConnected] = useState<boolean | null>(null);
    const navigation = useNavigation(); 

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            console.log('Connection type', state.type);
            console.log('Is connected?', state.isConnected);
            setIsConnected(state.isConnected);

            // Navigate if connected
            if (state.isConnected) {
                navigation.navigate(ScreensName.Connect);
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            {isConnected === null ? (
                <Text>Checking connection...</Text>
            ) : isConnected ? null : (
                <View>
                    <Text>No Internet Connection</Text>
                    <CustomButton
                        MainText={'Try Again'}
                        BgGiven={colors.WHITE}
                        name={ScreensName.SplashScreen}
                        txColor={colors.GREEN}
                    />
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default NoInternet;
