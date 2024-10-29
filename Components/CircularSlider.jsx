import { Svg, Circle, G } from 'react-native-svg';
import styles from '../Styles/Style';
import { Slider } from 'react-native-elements';
import { View, Text } from 'react-native';

// import Slider from '@react-native-community/slider';

const CircularSlider = ({ value, onChange, min, max, currentTheme }) => {
    const percentage = (value - min) / (max - min);
    const degrees = percentage * 360;
  
    return (
      <View style={styles.circularSlider}>
        <Svg width="100%" height="100%" viewBox="0 0 100 100">
          <Circle
            cx="50"
            cy="50"
            r="48"
            fill="none"
            stroke={currentTheme.border}
            strokeWidth="4"
          />
          <G rotation="-90" origin="50,50">
            <Circle
              cx="50"
              cy="50"
              r="48"
              fill="none"
              stroke={currentTheme.primary}
              strokeWidth="4"
              strokeDasharray="301.59"
              strokeDashoffset={301.59 * (1 - percentage)}
            />
          </G>
        </Svg>
        <View style={styles.sliderValue}>
          <Text style={[styles.sliderValueText, { color: currentTheme.text }]}>₹{value.toLocaleString()}</Text>
        </View>
        <Slider
          style={styles.slider}
          minimumValue={min}
          maximumValue={max}
          value={value}
          onValueChange={onChange}
          minimumTrackTintColor="transparent"
          maximumTrackTintColor="transparent"
          thumbTintColor={currentTheme.primary}
        />
      </View>
    );
  };
  
export default CircularSlider