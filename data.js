import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image, Dimensions, ActivityIndicator, TextInput, Switch } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Slider from '@react-native-community/slider';
import { Svg, Circle, G } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';

const { width: screenWidth } = Dimensions.get('window');

// Mock API response 
const mockApiResponse = {
    items: [
      {
        open_state: {
          body: {
            title: "How much do you need?",
            subtitle: "Move the dial and set any amount you need up to ₹487891",
            card: {
              header: "credit amount",
              description: "@1.04% monthly",
              max_range: 487891,
              min_range: 500
            },
            footer: "Stash is instant. Money will be credited within seconds"
          }
        },
        closed_state: {
          body: {
            key1: "credit amount"
          }
        },
        cta_text: "Proceed to EMI selection"
      },
      {
        open_state: {
          body: {
            title: "How do you wish to repay?",
            subtitle: "Choose one of our recommended plans or make your own",
            items: [
              {
                emi: "₹4,247 /mo",
                duration: "12 months",
                title: "₹4,247 /mo for 12 months",
                subtitle: "See calculations"
              },
              {
                emi: "₹5,580 /mo",
                duration: "9 months",
                title: "₹5,580 /mo for 9 months",
                subtitle: "See calculations",
                tag: "recommended"
              },
              {
                emi: "₹8,270 /mo",
                duration: "6 months",
                title: "₹8,270 /mo for 6 months",
                subtitle: "See calculations"
              }
            ],
            footer: "Create your own plan"
          }
        },
        closed_state: {
          body: {
            key1: "emi",
            key2: "duration"
          }
        },
        cta_text: "Select your bank account"
      },
      {
        open_state: {
          body: {
            title: "Where should we send the money?",
            subtitle: "Amount will be credited to the bank account. EMI will also be debited from this bank account",
            items: [
              {
                icon: "",
                title: "HDFC BANK",
                subtitle: "897458935"
              },
              {
                icon: "",
                title: "SBI",
                subtitle: "897453435"
              },
              {
                icon: "",
                title: "PNB",
                subtitle: "8974589334535"
              }
            ],
            footer: "Change account"
          }
        },
        closed_state: {
          body: {}
        },
        cta_text: "Tap for 1-click KYC"
      }
    ]
  };

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
  

export default function App() {
  const [step, setStep] = useState(1);
  const [loanAmount, setLoanAmount] = useState(0);
  const [manualAmount, setManualAmount] = useState('');
  const [selectedEMI, setSelectedEMI] = useState(null);
  const [selectedBank, setSelectedBank] = useState(null);
  const [expandedStep, setExpandedStep] = useState(1);
  const [showCustomEMI, setShowCustomEMI] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCustomBank, setShowCustomBank] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const data = mockApiResponse;
      setApiData(data.items);
      setLoanAmount(data.items[0].open_state.body.card.min_range);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const handleStepChange = (newStep) => {
    setStep(newStep);
    setExpandedStep(newStep);
  };

  const handleCollapsedViewClick = (stepNumber) => {
    setExpandedStep(stepNumber);
  };

  const handleManualAmountChange = (text) => {
    setManualAmount(text);
    const amount = parseInt(text.replace(/,/g, ''), 10);
    if (!isNaN(amount)) {
      setLoanAmount(amount);
    }
  };

  const theme = {
    light: {
      background: '#F3F4F6',
      surface: '#FFFFFF',
      primary: '#3B82F6',
      secondary: '#60A5FA',
      text: '#1F2937',
      textSecondary: '#6B7280',
      border: '#D1D5DB',
    },
    dark: {
      background: '#1F2937',
      surface: '#374151',
      primary: '#60A5FA',
      secondary: '#3B82F6',
      text: '#F3F4F6',
      textSecondary: '#D1D5DB',
      border: '#4B5563',
    },
  };

  const currentTheme = isDarkMode ? theme.dark : theme.light;

  const resetApplication = () => {
    setStep(1);
    setExpandedStep(1);
    setLoanAmount(apiData[0].open_state.body.card.min_range);
    setManualAmount('');
    setSelectedEMI(null);
    setSelectedBank(null);
    setShowCustomEMI(false);
    setShowSummary(false);
    setShowCustomBank(false);
  };

  const renderCollapsedViews = () => {
    return (
      <View>
        {step > 1 && (
          <CollapsedView
            step={1}
            loanAmount={loanAmount}
            onClick={() => handleCollapsedViewClick(1)}
            currentTheme={currentTheme}
          />
        )}
        {step > 2 && selectedEMI && (
          <CollapsedView
            step={2}
            selectedEMI={selectedEMI}
            onClick={() => handleCollapsedViewClick(2)}
            currentTheme={currentTheme}
          />
        )}
      </View>
    );
  };

  const renderStep = () => {
    if (loading || !apiData) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={currentTheme.primary} />
          <Text style={[styles.loadingText, { color: currentTheme.textSecondary }]}>Loading...</Text>
        </View>
      );
    }

    switch(expandedStep) {
      case 1:
        const stepOneData = apiData[0].open_state.body;
        return (
          <View style={styles.stepContainer}>
            <Text style={[styles.stepTitle, { color: currentTheme.text }]}>{stepOneData.title}</Text>
            <Text style={[styles.stepDescription, { color: currentTheme.textSecondary }]}>{stepOneData.subtitle}</Text>
            <CircularSlider
              value={loanAmount}
              onChange={setLoanAmount}
              min={stepOneData.card.min_range}
              max={stepOneData.card.max_range}
              currentTheme={currentTheme}
            />
            <Text style={[styles.stepNote, { color: currentTheme.textSecondary }]}>{stepOneData.card.description} | {stepOneData.footer}</Text>
            <TextInput
              style={[styles.manualInput, { borderColor: currentTheme.border, color: currentTheme.text }]}
              placeholder="Enter amount manually"
              placeholderTextColor={currentTheme.textSecondary}
              value={manualAmount}
              onChangeText={handleManualAmountChange}
              keyboardType="numeric"
            />
            {expandedStep === step && (
              <TouchableOpacity
                style={[styles.button, { backgroundColor: currentTheme.primary }]}
                onPress={() => handleStepChange(2)}
              >
                <Text style={[styles.buttonText, { color: currentTheme.surface }]}>{apiData[0].cta_text}</Text>
              </TouchableOpacity>
            )}
          </View>
        );
      
      case 2:
        const stepTwoData = apiData[1].open_state.body;
        return (
          <View style={styles.stepContainer}>
            <Text style={[styles.stepTitle, { color: currentTheme.text }]}>{stepTwoData.title}</Text>
            <Text style={[styles.stepDescription, { color: currentTheme.textSecondary }]}>{stepTwoData.subtitle}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.emiOptionsContainer}>
              {stepTwoData.items.map((option, index) => (
                <EMIOption
                  key={index}
                  {...option}
                  selected={selectedEMI?.title === option.title}
                  onClick={() => {
                    setSelectedEMI(option);
                    setShowCustomEMI(false);
                  }}
                  currentTheme={currentTheme}
                />
              ))}
            </ScrollView>
            <TouchableOpacity
              onPress={() => setShowCustomEMI(!showCustomEMI)}
              style={styles.customEMIToggle}
            >
              <Text style={[styles.customEMIToggleText, { color: currentTheme.primary }]}>
                {showCustomEMI ? "Hide custom EMI calculator" : stepTwoData.footer}
              </Text>
            </TouchableOpacity>
            {showCustomEMI && (
              <CustomEMICalculator
                loanAmount={loanAmount}
                onSelect={(customPlan) => {
                  setSelectedEMI(customPlan);
                  setShowCustomEMI(false);
                }}
                currentTheme={currentTheme}
              />
            )}
            {expandedStep === step && selectedEMI && (
              <TouchableOpacity
                style={[styles.button, { backgroundColor: currentTheme.primary }]}
                onPress={() => handleStepChange(3)}
              >
                <Text style={[styles.buttonText, { color: currentTheme.surface }]}>{apiData[1].cta_text}</Text>
              </TouchableOpacity>
            )}
          </View>
        );
      
      case 3:
        const stepThreeData = apiData[2].open_state.body;
        return (
          <View style={styles.stepContainer}>
            <Text style={[styles.stepTitle, { color: currentTheme.text }]}>{stepThreeData.title}</Text>
            <Text style={[styles.stepDescription, { color: currentTheme.textSecondary }]}>{stepThreeData.subtitle}</Text>
            {stepThreeData.items.map((bank, index) => (
              <BankSelection
                key={index}
                bank={bank}
                selected={selectedBank?.title === bank.title}
                onClick={() => setSelectedBank(bank)}
                currentTheme={currentTheme}
              />
            ))}
            <TouchableOpacity
              style={styles.changeAccountButton}
              onPress={() => setShowCustomBank(!showCustomBank)}
            >
              <Text style={[styles.changeAccountButtonText, { color: currentTheme.primary }]}>
                {showCustomBank ? "Hide custom bank" : stepThreeData.footer}
              </Text>
            </TouchableOpacity>
            {showCustomBank && (
              <CustomBankAccount
                onSave={(customBank) => {
                  setSelectedBank(customBank);
                  setShowCustomBank(false);
                }}
                currentTheme={currentTheme}
              />
            )}
            {expandedStep === step && selectedBank && (
              <TouchableOpacity
                style={[styles.button, { backgroundColor: currentTheme.primary }]}
                onPress={() => setShowSummary(true)}
              >
                <Text style={[styles.buttonText, { color: currentTheme.surface }]}>{apiData[2].cta_text}</Text>
              </TouchableOpacity>
            )}
          </View>
        );
    }
  };

  if (showSummary) {
    return (
      <View style={[styles.container, { backgroundColor: currentTheme.background }]}>
        <StatusBar style={isDarkMode ? "light" : "dark"} />
        <ScrollView contentContainerStyle={styles.summaryScrollContent}>
          <SummaryView
            loanAmount={loanAmount}
            selectedEMI={selectedEMI}
            selectedBank={selectedBank}
            currentTheme={currentTheme}
          />
          <TouchableOpacity
            style={[styles.button, { backgroundColor: currentTheme.primary }]}
            onPress={() => {
              console.log('Loan application submitted');
              resetApplication();
            }}
          >
            <Text style={[styles.buttonText, { color: currentTheme.surface }]}>Submit Application</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.background }]}>
      <StatusBar style={isDarkMode ? "light" : "dark"} />
      <View style={[styles.header, { borderBottomColor: currentTheme.border }]}>
        <TouchableOpacity
          onPress={() => step > 1 ? handleStepChange(step - 1) : null}
          style={styles.headerButton}
        >
          <Ionicons name="chevron-back" size={24} color={currentTheme.text} />
        </TouchableOpacity>
        <Switch
          trackColor={{ false: "#767577", true: currentTheme.secondary }}
          thumbColor={isDarkMode ? currentTheme.text : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => setIsDarkMode(!isDarkMode)}
          value={isDarkMode}
        />
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="help-circle-outline" size={24} color={currentTheme.text} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.content}>
        {renderCollapsedViews()}
        {renderStep()}
      </ScrollView>
    </View>
  );
}

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