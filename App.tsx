/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useState, type PropsWithChildren} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSpring,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import CircularProgress from './CircularProgress';
import SearchAnimation from './SearchAnimation';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={styles.backgroundStyle.backgroundColor}
      />

      <CircularProgress value={80} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: Colors.darker,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
