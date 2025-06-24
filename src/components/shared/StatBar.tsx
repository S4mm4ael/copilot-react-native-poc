import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme as useNavTheme } from '@react-navigation/native';

/**
 * Props for the StatBar component.
 */
export interface StatBarProps {
  /** Label for the stat (e.g., "HP", "Attack") */
  label: string;
  /** Value of the stat (0-255) */
  value: number;
  /** Color of the progress bar */
  color: string;
}

/**
 * A reusable, shared StatBar component.
 * Renders a label and a progress-bar-style view for a stat.
 */
const StatBar: React.FC<StatBarProps> = ({ label, value, color }) => {
  const navTheme = useNavTheme();
  // Clamp value between 0 and 255 for safety
  const clampedValue = Math.max(0, Math.min(255, value));
  const widthPercent = (clampedValue / 255) * 100;

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: navTheme.colors.text }]}>{label}</Text>
      <View style={styles.barBackground}>
        <View style={[styles.barFill, { width: `${widthPercent}%`, backgroundColor: color }]} />
      </View>
      <Text style={[styles.value, { color: navTheme.colors.text }]}>{clampedValue}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    width: 80,
    fontSize: 14,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  barBackground: {
    flex: 1,
    height: 14,
    backgroundColor: '#eee',
    borderRadius: 7,
    marginHorizontal: 8,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 7,
  },
  value: {
    width: 36,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'right',
  },
});

export default StatBar;
