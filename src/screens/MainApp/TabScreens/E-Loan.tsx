import React from 'react';
import type { PropsWithChildren } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';



function ELoan(): React.JSX.Element {


    return (
        <SafeAreaView style={styles.container}>
            <Text>home Screen</Text>
            <Text>home Screen</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default ELoan;
