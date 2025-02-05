import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Picker } from '@react-native-picker/picker';
import { useTranslation } from 'react-i18next';

const PickerMainLogin = ({ items, isheader}) => {
        const [selectedValue, setSelectedValue] = useState(items[0].value);
        const { t } = useTranslation();
        return (
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              marginVertical: 10,
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 5,
              overflow: 'hidden',
              backgroundColor: isheader ? '#f0f0f0' : 'white',
              paddingHorizontal: 10,
              paddingVertical: 5,
              width: 200,
            }}
          >
            {isheader && (
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: '#555',
                  marginBottom: 5,
                }}
              >
                {t('Select Code')}
              </Text>
            )}
            <Picker
              selectedValue={selectedValue}
              style={{
                height: 40,
                width: '100%',
                color: '#333',
              }}
              onValueChange={(itemValue) => setSelectedValue(itemValue)}
            >
              {items.map((item, index) => (
                <Picker.Item key={index} label={item.label} value={item.value} />
              ))}
            </Picker>
          </View>
        );
   
}

export default PickerMainLogin

const styles = StyleSheet.create({})