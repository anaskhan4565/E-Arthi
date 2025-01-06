import { StyleSheet, Text, TextInput, View,Image } from 'react-native'
import React from 'react'
import colors from '../../util/colors'
const CustomInput = ({placeholder,hide}) => {

  return (
    <TextInput style={styles.textInputStyle} 
    placeholder={placeholder} 
    secureTextEntry={hide==1?true:false} 
    />

  )
}

export default CustomInput

const styles = StyleSheet.create({
 
    textInputStyle:{
        height: 50,
        width:330,
        fontSize:16,
        alignSelf:'center',
        borderColor: colors.GREAT_WHITE,
        borderWidth: 1,
        backgroundColor:colors.GREAT_WHITE,
        borderRadius:3,
        borderColor:colors.LIGHT_GRAY

    },
})