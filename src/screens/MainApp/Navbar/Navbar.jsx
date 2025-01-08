import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import ProfilePic from '../../../assets/MainApp/HomeScreen/ProfilePic.png'
import Earthi from '../../../assets/MainApp/HomeScreen/Earthi.png'
import colors from '../../../../util/colors'

import bellIcon from '../../../assets/MainApp/HomeScreen/Bell.png'
import Hamburger from '../../../assets/MainApp/HomeScreen/Hamburger.png'
import CustomImageButton from '../CustomComponent/CustomImageButton'

const Navbar = () => {
  return (
    <View style={{ flex: 1, flexDirection: 'row', marginTop: 10, backgroundColor: colors.LIGHT_GREEN,position:'absolute',maxHeight:100 }}>
      <View style={{flex: 0.3,paddingLeft:10,justifyContent:'center' }}>

        <Image source={ProfilePic} style={styles.Profile} />

      </View>
      <View style={{justifyContent:'center',alignItems:'center', flex: 0.4 }}>
        <Image source={Earthi} style={styles.Icon} />

      </View>
      <View style={{ flex: 0.3,flexDirection:'row',justifyContent:'center' ,alignItems:'center'}}>
        <CustomImageButton SourceGiven={bellIcon}/>
        <CustomImageButton SourceGiven={Hamburger}/>
        </View>
    </View>
  )
}

export default Navbar

const styles = StyleSheet.create({

  Profile: {
    width: 50,
    height: 50,
    borderRadius: 5,

  },
  Icon: {
    width: 60,
    height: 60,
  }
})