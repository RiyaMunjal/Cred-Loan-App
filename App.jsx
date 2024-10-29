import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image, Dimensions, ActivityIndicator, TextInput, Switch } from 'react-native';
import { StatusBar } from 'expo-status-bar';
// import Slider from '@react-native-community/slider';
// import { Svg, Circle, G } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import { mockApiResponse } from './MockApiResponse/mockApiResponse';
import CircularSlider from './Components/CircularSlider';
import EMIOption from './Components/EMIOption';
import BankSelection from './Components/BankSelection';
import CollapsedView from './Components/CollapsedView';
import SummaryView from './Components/SummaryView';
import CustomBankAccount from './Components/CustomBankAccount';
import CustomEMICalculator from './Components/CustomEMICalculator';
import styles from './Styles/Style';

// const { width: screenWidth } = Dimensions.get('window');

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

