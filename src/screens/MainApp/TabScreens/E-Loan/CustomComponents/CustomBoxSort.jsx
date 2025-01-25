import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import upImage from '../CustomPictures/try/upnormal.png'
import upImageActive from '../CustomPictures/try/upActive.png'
import downImage from '../CustomPictures/try/downnormal.png'
import downImageActive from '../CustomPictures/try/downActive.png'

const CustomBoxSort = ({ title,activeState,setActiveState }) => {
  //const [activeState, setActiveState] = useState(null); // Track which button is active

  const handleButtonClick = (button) => {
    if (activeState === button) {
      // If the clicked button is already active, reset the state
      setActiveState(null);
    } else {
      // Set the active state to the clicked button
      setActiveState(button);
    }
  };

  return (
    <View style={styles.box}>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.buttonContainer}>
        {/* Up Arrow Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleButtonClick('up')}
        >
          <Image
            source={activeState === 'up' ? upImageActive : upImage} // Toggle between active and default image
            style={styles.buttonImage}
          />
        </TouchableOpacity>

        {/* Down Arrow Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleButtonClick('down')}
        >
          <Image
            source={activeState === 'down' ? downImageActive : downImage} // Toggle between active and default image
            style={styles.buttonImage}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, // For Android shadow
    margin: hp(0.5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: hp(1),
  },
  buttonContainer: {
    flexDirection: 'column', // Keep buttons vertically aligned
    alignItems: 'center',
    gap: 0, // Removed gap to reduce space between buttons
  },
  button: {
    padding: 5, // Reduced padding between buttons
    marginHorizontal: 5, // Reduced horizontal margin
  },
  buttonImage: {
    width: hp(1.5),
    height: hp(1.5), // Adjust the image size as needed
  },
});

export default CustomBoxSort;
