import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTranslation } from 'react-i18next'

const ELoanSetAside = () => {
  const { t } = useTranslation();
  return (
    <View>
      <Text>{t('E-LoanSetAside')}</Text>
    </View>
  )
}

export default ELoanSetAside

const styles = StyleSheet.create({})