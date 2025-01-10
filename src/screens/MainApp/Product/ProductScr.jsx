import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Prod2 from '../../../assets/MainApp/EmarketPlace/Products/prod2.png'
import ButtonLess from '../../../assets/MainApp/EmarketPlace/Products/Buttons/LessButton.png'
import ButtonPlus from '../../../assets/MainApp/EmarketPlace/Products/Buttons/MoreButton.png'
import colors from '../../../../util/colors'

const ProductScr = () => {
    return (
        <View style={{ flex: 1, borderWidth: 1 }}>
            <View style={{ flex: 0.6, borderWidth: 1 }}>
                <View style={{ flex: 0.5, borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={Prod2} style={{ width: 160, height: 160 }} />
                </View>
                <View style={{ flex: 0.5, borderWidth: 1 }}>
                    <View style={{ flex: 0.5, borderWidth: 1 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Aries Agro Limited Agromin Gold</Text>
                    </View>
                    <View style={{ flex: 0.5, borderWidth: 1, flexDirection: 'row' }}>
                        <View style={{ flex: 0.5, borderWidth: 1 }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Price:2080</Text>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Save:1000</Text>
                        </View>
                        {/* For buttons */}
                        <View style={{ flex: 0.5, borderWidth: 1, flexDirection: 'row' }}>

                                <TouchableOpacity style={{ flex: 0.5,alignItems:'center',justifyContent:'center', }} >
                                    <Image source={ButtonLess} style={{width:40,height:40}} />
                                </TouchableOpacity>

                            <View style={{ flex: 0.5, borderWidth: 1, justifyContent: 'center' }}>
                                <Text style={{ textAlign: 'center', fontSize: 28, fontWeight: 'bold' }}>02</Text>
                            </View>
                            <TouchableOpacity style={{ flex: 0.5,alignItems:'center',justifyContent:'center', }} >
                                    <Image source={ButtonPlus} style={{width:40,height:40}} />
                                </TouchableOpacity>
                        </View>
                        {/* For buttons */}

                    {/**FOR description */}
                    </View>
                    <View style={{ flex: 0.5, borderWidth: 1 }}>
                    <Text style={{color:colors.BLACK,fontWeight:'400'}}>Brown the beef better. Lean ground beef – I like to use 85% lean angus. Garlic – use fresh  chopped. Spices – chili powder, cumin, onion powder.</Text>
                    </View>
                </View>
            </View>
        {/**FOR Middle portion */}
            <View style={{ flex: 0.3, borderWidth: 1 }}>
            <View>
                <Text style={{fontWeight:'semibold',fontSize:22}}>Choices of Add On</Text>
            </View>
            </View>
            <View style={{ flex: 0.2, borderWidth: 1 }}>

            </View>
        </View>
    )
}

export default ProductScr

const styles = StyleSheet.create({})