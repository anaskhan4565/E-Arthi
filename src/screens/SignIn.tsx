import React from 'react';
import type { PropsWithChildren } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';
import CustomButton from '../components/CustomButton';
import { green } from 'react-native-reanimated/lib/typescript/Colors';
import ScreensName from '../../util/ScreensName';
import colors from '../../util/colors';



function SignIn
(): React.JSX.Element {


    return (
        <SafeAreaView style={styles.container}>
            <Text>Screen</Text>
            {/* remove this */}
            <CustomButton BgGiven={colors.GREEN} MainText={"navigate"} name={ScreensName.MorePage}  isNavigation={true}/>         
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default SignIn
;
