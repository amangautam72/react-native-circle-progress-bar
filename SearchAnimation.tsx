import React, {useEffect} from 'react';
import {View} from 'react-native';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSpring,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';

const SearchAnimation = () => {
  const zValue = useSharedValue('0deg');
  const xValue = useSharedValue(0);
  const yValue = useSharedValue(0);
  const circleY = useSharedValue('90deg');
  const circleZ = useSharedValue('0deg');

  const circleLineOpacity = useSharedValue(1);

  useEffect(() => {
    circleLineOpacity.value = withRepeat(
      withTiming(0, {duration: 1000}),
      1,
      true,
    );
    zValue.value = withRepeat(withTiming('-40deg', {duration: 1000}), 1, true);
    xValue.value = withRepeat(withTiming(50, {duration: 1000}), 1, true);
    yValue.value = withRepeat(withTiming(10, {duration: 1000}), 1, true);
    circleY.value = withRepeat(withTiming('0deg', {duration: 1000}), 1, true);
    circleZ.value = withRepeat(withTiming('-40deg', {duration: 1000}), 1, true);
  }, []);

  const circleLineStyle = useAnimatedStyle(() => {
    const value = interpolate(xValue.value, [0, 50], [1, 0], Extrapolate.CLAMP);
    if (value > 0.9) {
      return {
        opacity: 1,
      };
    } else {
      return {
        opacity: 0,
      };
    }
  });

  const rotateLine = useAnimatedStyle(() => {
    return {
      transform: [
        {rotateZ: zValue.value},
        {translateX: xValue.value},
        {translateY: yValue.value},
      ],
    };
  });

  const rotateCircle = useAnimatedStyle(() => {
    return {
      transform: [{rotateZ: circleZ.value}, {rotateY: circleY.value}],
    };
  });
  return (
    <View style={{flex: 1}}>
      <Animated.View
        style={[
          {
            height: 100,
            width: 100,
            borderWidth: 15,
            borderRadius: 50,
            borderColor: 'white',
            backgroundColor: 'transparent',
            transform: [{rotateZ: '-40deg'}, {rotateY: '0deg'}],
            justifyContent: 'center',
            alignItems: 'center',
          },
          rotateCircle,
        ]}></Animated.View>

      <Animated.View
        style={[
          {
            height: 60,
            width: 15,
            backgroundColor: 'white',
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            marginTop: -5,
            alignSelf: 'center',
            transform: [
              {rotateZ: '-40deg'},
              {translateX: 50},
              {translateY: 10},
            ],
          },
          rotateLine,
        ]}>
        <Animated.View
          style={[
            {
              width: 15,
              height: 100,
              marginTop: -100,
              backgroundColor: 'white',
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            },
            circleLineStyle,
          ]}></Animated.View>
      </Animated.View>
    </View>
  );
};

export default SearchAnimation;
