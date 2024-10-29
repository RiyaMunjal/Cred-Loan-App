import {  View, Text, TouchableOpacity,  TextInput } from 'react-native';
import styles from '../Styles/Style';
const CustomBankAccount = ({ onSave, currentTheme }) => {
    const [bankName, setBankName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
  
    return (
      <View style={[styles.customBankAccount, { backgroundColor: currentTheme.surface }]}>
        <Text style={[styles.customBankTitle, { color: currentTheme.text }]}>Add Custom Bank Account</Text>
        <TextInput
          style={[styles.input, { borderColor: currentTheme.border, color: currentTheme.text }]}
          placeholder="Bank Name"
          placeholderTextColor={currentTheme.textSecondary}
          value={bankName}
          onChangeText={setBankName}
        />
        <TextInput
          style={[styles.input, { borderColor: currentTheme.border, color: currentTheme.text }]}
          placeholder="Account Number"
          placeholderTextColor={currentTheme.textSecondary}
          value={accountNumber}
          onChangeText={setAccountNumber}
          keyboardType="numeric"
        />
        <TouchableOpacity
          style={[styles.customBankButton, { backgroundColor: currentTheme.primary }]}
          onPress={() => onSave({ title: bankName, subtitle: accountNumber })}
        >
          <Text style={[styles.customBankButtonText, { color: currentTheme.surface }]}>Save Account</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
export default CustomBankAccount