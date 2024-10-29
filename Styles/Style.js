import { Dimensions, StyleSheet } from "react-native";
const { width: screenWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
      borderBottomWidth: 1,
    },
    headerButton: {
      padding: 8,
    },
    content: {
      flex: 1,
    },
    stepContainer: {
      padding: 16,
      alignItems: 'center',
    },
    stepTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 8,
      textAlign: 'center',
    },
    stepDescription: {
      fontSize: 16,
      marginBottom: 24,
      textAlign: 'center',
    },
    stepNote: {
      fontSize: 14,
      textAlign: 'center',
      marginTop: 24,
    },
    button: {
      padding: 16,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 24,
      width: '100%',
    },
    buttonText: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    circularSlider: {
      width: screenWidth * 0.8,
      height: screenWidth * 0.8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    sliderValue: {
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
    },
    sliderValueText: {
      fontSize: 32,
      fontWeight: 'bold',
    },
    slider: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      transform: [{ rotateZ: '-90deg' }],
      opacity: 0,
    },
    manualInput: {
      width: '100%',
      height: 40,
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 10,
      marginTop: 16,
    },
    emiOptionsContainer: {
      marginBottom: 24,
    },
    emiOption: {
      padding: 16,
      borderRadius: 8,
      marginRight: 12,
      width: 120,
      height: 120,
      justifyContent: 'center',
      alignItems: 'center',
    },
    emiOptionRecommended: {
      borderWidth: 2,
    },
    recommendedBadge: {
      position: 'absolute',
      top: -10,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
    },
    recommendedText: {
      fontSize: 10,
    },
    emiAmount: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    emiMonths: {
      fontSize: 14,
    },
    emiNote: {
      fontSize: 12,
      marginTop: 4,
    },
    customEMIToggle: {
      marginBottom: 16,
    },
    customEMIToggleText: {
      fontSize: 16,
      textDecorationLine: 'underline',
    },
    bankOption: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
      borderRadius: 8,
      marginBottom: 12,
      width: '100%',
    },
    bankInfo: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    bankLogo: {
      width: 32,
      height: 32,
      marginRight: 12,
    },
    bankName: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    bankAccount: {
      fontSize: 12,
    },
    selectedText: {
      fontSize: 12,
      fontWeight: 'bold',
    },
    collapsedView: {
      padding: 16,
      borderBottomWidth: 1,
    },
    collapsedContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    collapsedLabel: {
      fontSize: 14,
    },
    collapsedValue: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    customEMICalculator: {
      padding: 16,
      borderRadius: 8,
      marginBottom: 24,
      width: '100%',
    },
    customEMITitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 16,
    },
    customEMILabel: {
      fontSize: 14,
      marginBottom: 8,
    },
    customEMISlider: {
      width: '100%',
      height: 40,
    },
    customEMISliderLabels: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    customEMISliderLabel: {
      
      fontSize: 12,
    },
    customEMIResult: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    customEMIResultLabel: {
      fontSize: 14,
    },
    customEMIResultValue: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    customEMIButton: {
      padding: 12,
      borderRadius: 8,
      alignItems: 'center',
    },
    customEMIButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    summaryContainer: {
      padding: 16,
      borderRadius: 8,
      marginBottom: 24,
    },
    summaryTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
      textAlign: 'center',
    },
    summarySection: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 12,
    },
    summaryLabel: {
      fontSize: 16,
    },
    summaryValue: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingText: {
      marginTop: 16,
      fontSize: 18,
    },
    changeAccountButton: {
      marginTop: 16,
    },
    changeAccountButtonText: {
      fontSize: 16,
      textDecorationLine: 'underline',
    },
    customBankAccount: {
      width: '100%',
      marginTop: 16,
      padding: 16,
      borderRadius: 8,
    },
    customBankTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 16,
    },
    input: {
      width: '100%',
      height: 40,
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 10,
      marginBottom: 16,
    },
    customBankButton: {
      padding: 12,
      borderRadius: 8,
      alignItems: 'center',
    },
    customBankButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    summaryScrollContent: {
      flexGrow: 1,
      justifyContent: 'center',
      padding: 16,
    },
  });
export default styles;