import {  View, Text } from 'react-native';
import styles from '../Styles/Style';
const SummaryView = ({ loanAmount, selectedEMI, selectedBank, currentTheme }) => {
    return (
      <View style={[styles.summaryContainer, { backgroundColor: currentTheme.surface }]}>
        <Text style={[styles.summaryTitle, { color: currentTheme.text }]}>Loan Application Summary</Text>
        <View style={styles.summarySection}>
          <Text style={[styles.summaryLabel, { color: currentTheme.textSecondary }]}>Loan Amount:</Text>
          <Text style={[styles.summaryValue, { color: currentTheme.text }]}>₹{loanAmount.toLocaleString()}</Text>
        </View>
        <View style={styles.summarySection}>
          <Text style={[styles.summaryLabel, { color: currentTheme.textSecondary }]}>EMI Plan:</Text>
          <Text style={[styles.summaryValue, { color: currentTheme.text }]}>{selectedEMI.emi} for {selectedEMI.duration}</Text>
        </View>
        <View style={styles.summarySection}>
          <Text style={[styles.summaryLabel, { color: currentTheme.textSecondary }]}>Interest Rate:</Text>
          <Text style={[styles.summaryValue, { color: currentTheme.text }]}>1.04% per month</Text>
        </View>
        <View style={styles.summarySection}>
          <Text style={[styles.summaryLabel, { color: currentTheme.textSecondary }]}>Bank Account:</Text>
          <Text style={[styles.summaryValue, { color: currentTheme.text }]}>{selectedBank.title} - {selectedBank.subtitle}</Text>
        </View>
      </View>
    );
  };
export default SummaryView  