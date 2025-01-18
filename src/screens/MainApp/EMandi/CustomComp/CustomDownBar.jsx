import React, { useRef } from 'react';
import { View, Text, StyleSheet, Button, Animated, Dimensions } from 'react-native';

const CustomBottomSheet = ({ expanded, children }) => {
  const screenHeight = Dimensions.get('window').height;
  const translateY = useRef(new Animated.Value(screenHeight * 1)).current;

  // Expand or collapse the bottom sheet
  React.useEffect(() => {
    Animated.timing(translateY, {
      toValue: expanded ? screenHeight * 0.01 : screenHeight * 0.67,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [expanded]);

  return (
    <Animated.View
      style={[
        styles.bottomSheetContainer,
        {
          transform: [{ translateY }],
        },
      ]}
    >
      {/* Bottom Sheet Content */}
      <View style={styles.content}>{children}</View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  bottomSheetContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
  },
  content: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: Dimensions.get('window').height *0.8 ,
  },
});

export default CustomBottomSheet;
