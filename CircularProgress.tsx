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
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolate,
  withSpring,
} from 'react-native-reanimated';

const CircularProgress = ({value}: {value: number}) => {
  const [state, setState] = useState(0);
  const progress = useSharedValue(0);
  const progressSecond = useSharedValue(0);
  const height = useSharedValue(120);
  const width = useSharedValue(120);
  const scale = useSharedValue(0.6);

  useEffect(() => {
    height.value = 120;
    width.value = 120;
    scale.value = 0.6;

    const unsubscribe = setInterval(() => {
      setState(progress.value);
      if (progress.value == value) {
        clearInterval(unsubscribe);
      }
    }, 0);

    height.value = withSpring(150, {damping: 10});
    width.value = withSpring(150, {damping: 10});
    scale.value = withSpring(1, {damping: 8});

    progress.value = withTiming(value, {duration: 3500});

    return () => clearInterval(unsubscribe);
  }, [value]);

  const progressStyle = useAnimatedStyle(() => {
    const value = 45 + progress.value * 3.6;
    return {
      transform: [{rotateZ: `${value}deg`}],
    };
  });

  const thirdStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
      width: width.value,
    };
  });

  const forthStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
    };
  });

  const progressSecondStyle = useAnimatedStyle(() => {
    const transparent = interpolate(
      progress.value,
      [0, 100],
      [1, 0],
      Extrapolate.CLAMP,
    );

    let borderColor = 'transparent';
    if (!transparent) {
      borderColor = '#E54F23r';
    }

    const rotate = interpolate(
      progress.value,
      [40, 50],
      [0, 50],
      Extrapolate.CLAMP,
    );

    let value = 45 + progressSecond.value * 3.6;
    let border = '#1C1A26';
    if (rotate === 50) {
      border = '#E54F23';
      value = 45 + 50 * 3.6;
    }

    return {
      transform: [{rotateZ: `${value}deg`}],
      borderColor: border,
      borderLeftColor: borderColor,
      borderBottomColor: borderColor,
    };
  });

  return (
    <View style={styles.mainContainer}>
      <View style={styles.progressWheel}></View>
      <Animated.View
        style={[styles.progressOverlayRight, progressStyle]}></Animated.View>
      <Animated.View
        style={[
          styles.progressOverlayLeft,
          progressSecondStyle,
        ]}></Animated.View>

      <Animated.View
        style={[styles.thirdContainer, thirdStyle]}></Animated.View>
      <Animated.View
        style={[styles.forthContainer, forthStyle]}></Animated.View>

      <Text
        style={{
          fontSize: 30,
          fontWeight: '400',
          color: '#66637B',
          marginLeft: 8,
        }}>
        {parseInt(state.toString())}
        <Text style={{fontSize: 12}}>%</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: Colors.darker,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    height: 250,
    width: 250,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 200,
    shadowColor: '#1C1A26',
    shadowOffset: {height: 20, width: 0},
    shadowOpacity: 1,
  },
  progressWheel: {
    height: 220,
    width: 220,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 120,
    borderWidth: 5,
    borderColor: '#1C1A26',
    shadowColor: '#E6953E',
    shadowRadius: 10,
    shadowOpacity: 1,
    position: 'absolute',
  },
  forthContainer: {
    height: 100,
    width: 100,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'grey',
    shadowOffset: {height: 10, width: 0},
    shadowOpacity: 0.2,
    borderRadius: 50,
    position: 'absolute',
  },
  thirdContainer: {
    height: 100,
    width: 100,
    backgroundColor: 'lightgrey',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#403f3d',
    shadowRadius: 20,
    shadowOpacity: 1,
    borderRadius: 75,
    position: 'absolute',
  },
  progressOverlayRight: {
    height: 220,
    width: 220,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 120,
    position: 'absolute',
    borderWidth: 5,
    borderColor: '#E54F23',
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    transform: [{rotateZ: '45deg'}],
    shadowColor: '#E6953E',
    shadowRadius: 10,
  },
  progressOverlayLeft: {
    height: 220,
    width: 220,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 120,
    position: 'absolute',
    borderWidth: 5,
    borderColor: '#1C1A26',
    shadowColor: '#E6953E',
    shadowRadius: 10,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default CircularProgress;
