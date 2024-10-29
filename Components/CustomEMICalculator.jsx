import Slider from '@react-native-community/slider';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../Styles/Style';
import { useState } from 'react';
const CustomEMICalculator = ({ loanAmount, onSelect, currentTheme }) => {
    const [months, setMonths] = useState(12);
    const interestRate = 1.04; // 1.04% monthly interest rate
  
    const calculateEMI = (principal, months, rate) => {
      const monthlyRate = rate / 100;
      const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                  (Math.pow(1 + monthlyRate, months) - 1);
      return Math.round(emi);
    };
  
    const emiAmount = calculateEMI(loanAmount, months, interestRate);
  
    return (
      <View style={[styles.customEMICalculator, { backgroundColor: currentTheme.surface }]}>
        <Text style={[styles.customEMITitle, { color: currentTheme.text }]}>Customize your EMI plan</Text>
        <Text style={[styles.customEMILabel, { color: currentTheme.textSecondary }]}>Tenure (in months): {months}</Text>
        <Slider
          style={styles.customEMISlider}
          minimumValue={3}
          maximumValue={24}
          step={1}
          value={months}
          onValueChange={(value) => setMonths(value)}
          minimumTrackTintColor={currentTheme.primary}
          maximumTrackTintColor={currentTheme.border}
          thumbTintColor={currentTheme.primary}
        />
        <View style={styles.customEMISliderLabels}>
          <Text style={[styles.customEMISliderLabel, { color: currentTheme.textSecondary }]}>3 months</Text>
          <Text style={[styles.customEMISliderLabel, { color: currentTheme.textSecondary }]}>24 months</Text>
        </View>
        <View style={styles.customEMIResult}>
          <Text style={[styles.customEMIResultLabel, { color: currentTheme.textSecondary }]}>Monthly EMI</Text>
          <Text style={[styles.customEMIResultValue, { color: currentTheme.text }]}>₹{emiAmount.toLocaleString()}</Text>
        </View>
        <TouchableOpacity
          style={[styles.customEMIButton, { backgroundColor: currentTheme.primary }]}
          onPress={() => onSelect({ emi: `₹${emiAmount.toLocaleString()} /mo`, duration: `${months} months`, title: `₹${emiAmount.toLocaleString()} /mo for ${months} months`, subtitle: 'Custom plan', custom: true })}
        >
          <Text style={[styles.customEMIButtonText, { color: currentTheme.surface }]}>Select this plan</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
export default CustomEMICalculator;