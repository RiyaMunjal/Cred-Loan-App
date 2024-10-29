import {  View, Text, TouchableOpacity} from 'react-native';
import styles from '../Styles/Style';
const EMIOption = ({ emi, duration, title, subtitle, tag, onClick, selected, currentTheme }) => {
    return (
      <TouchableOpacity
        onPress={onClick}
        style={[
          styles.emiOption,
          { backgroundColor: selected ? currentTheme.primary : currentTheme.surface },
          tag === 'recommended' && styles.emiOptionRecommended,
        ]}
      >
        {tag === 'recommended' && (
          <View style={[styles.recommendedBadge, { backgroundColor: currentTheme.secondary }]}>
            <Text style={[styles.recommendedText, { color: currentTheme.text }]}>recommended</Text>
          </View>
        )}
        <Text style={[styles.emiAmount, { color: selected ? currentTheme.surface : currentTheme.text }]}>
          {emi}
        </Text>
        <Text style={[styles.emiMonths, { color: selected ? currentTheme.surface : currentTheme.textSecondary }]}>
          {duration}
        </Text>
        <Text style={[styles.emiNote, { color: selected ? currentTheme.surface : currentTheme.textSecondary }]}>
          {subtitle}
        </Text>
      </TouchableOpacity>
    );
  };
  
export default EMIOption