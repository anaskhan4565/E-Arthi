import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import colors from '../../util/colors';
import { useNavigation } from '@react-navigation/native'

const CustomButton = ({MainText,BgGiven,name,txColor ,isNavigation}) => {
  
  const navigation=useNavigation();
  const handleNavigation=()=>{
    if(name){
      navigation.navigate(name);
    }
  }
  const handleSubmit=()=>{
      console.log('just a submit demo')
  }
  return (
    <TouchableOpacity style={[styles.Wrapper, { width:330, height:48,backgroundColor:BgGiven,borderColor:colors.GREEN,borderWidth:1,borderRadius:8}]} onPress={isNavigation?handleNavigation:handleSubmit}>    
        <Text style={{color:txColor, fontSize:16}}>{MainText}</Text>
    </TouchableOpacity>

  )
}

export default CustomButton

const styles = StyleSheet.create({


    Wrapper:{
        justifyContent:'center',
        alignItems:'center',
        borderRadius:'8px',
        borderColor:colors.GREEN
    },

})