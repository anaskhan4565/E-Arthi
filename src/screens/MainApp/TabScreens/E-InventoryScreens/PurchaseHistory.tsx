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
import { useTranslation } from 'react-i18next';


function PurchaseHisotry(): React.JSX.Element {
    const {t} = useTranslation();

    return (
        <SafeAreaView style={styles.container}>
            <Text>{t('Screen')}</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default PurchaseHisotry;
