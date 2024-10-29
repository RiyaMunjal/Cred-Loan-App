import {  View, Text, TouchableOpacity,  Image,  } from 'react-native';
import styles from '../Styles/Style';
const BankSelection = ({ bank, selected, onClick, currentTheme }) => {
    return (
      <TouchableOpacity
        onPress={onClick}
        style={[
          styles.bankOption,
          { backgroundColor: selected ? currentTheme.primary : currentTheme.surface },
        ]}
      >
        <View style={styles.bankInfo}>
          <Image source={{ uri: 'https://via.placeholder.com/32' }} style={styles.bankLogo} />
          <View>
            <Text style={[styles.bankName, { color: selected ? currentTheme.surface : currentTheme.text }]}>{bank.title}</Text>
            <Text style={[styles.bankAccount, { color: selected ? currentTheme.surface : currentTheme.textSecondary }]}>{bank.subtitle}</Text>
          </View>
        </View>
        {selected && <Text style={[styles.selectedText, { color: currentTheme.surface }]}>Selected</Text>}
      </TouchableOpacity>
    );
  };

export default BankSelection