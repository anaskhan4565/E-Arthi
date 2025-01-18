import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
} from 'react-native';
import { useTranslation } from 'react-i18next';


function Splash(): React.JSX.Element {
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

export default Splash;
