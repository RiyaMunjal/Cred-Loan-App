import {  View, Text, TouchableOpacity } from 'react-native';
import styles from '../Styles/Style';
const CollapsedView = ({ step, loanAmount, selectedEMI, onClick, currentTheme }) => {
    return (
      <TouchableOpacity onPress={onClick} style={[styles.collapsedView, { borderBottomColor: currentTheme.border }]}>
        {step === 1 && (
          <View style={styles.collapsedContent}>
            <Text style={[styles.collapsedLabel, { color: currentTheme.textSecondary }]}>Credit amount</Text>
            <Text style={[styles.collapsedValue, { color: currentTheme.text }]}>₹{loanAmount.toLocaleString()}</Text>
          </View>
        )}
        {step === 2 && selectedEMI && (
          <View style={styles.collapsedContent}>
            <Text style={[styles.collapsedLabel, { color: currentTheme.textSecondary }]}>EMI plan</Text>
            <Text style={[styles.collapsedValue, { color: currentTheme.text }]}>
              {selectedEMI.emi} for {selectedEMI.duration}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

export default CollapsedView