import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { COLORS } from '../utils/colors';

interface RevenueChartProps {
  data: Array<{
    month: string;
    consultAmount: number;
    diverseAmount: number;
  }>;
}

const { width } = Dimensions.get('window');

const RevenueChart: React.FC<RevenueChartProps> = ({ data }) => {
  //const { colors } = useTheme();
  
  const maxValue = Math.max(...data.map(item => item.consultAmount + item.diverseAmount));
  
  return (
    <View style={[styles.container, { backgroundColor: COLORS .surface }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: COLORS.text }]}>Évolution des revenus</Text>
        <Text style={[styles.subtitle, { color: COLORS.textSecondary }]}>
          Répartition mensuelle des revenus par type de service
        </Text>
      </View>
      
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: COLORS.primary }]} />
          <Text style={[styles.legendText, { color: COLORS.text }]}>consultAmount</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: COLORS.success }]} />
          <Text style={[styles.legendText, { color: COLORS.text }]}>diverseAmount</Text>
        </View>
      </View>
      
      <View style={styles.chartContainer}>
        <View style={styles.yAxis}>
          {[100000, 80000, 60000, 40000, 20000, 0].map((value, index) => (
            <Text key={index} style={[styles.yAxisLabel, { color: COLORS.textSecondary }]}>
              {value} XAF
            </Text>
          ))}
        </View>
        
        <View style={styles.chart}>
          {data.map((item, index) => {
            const consultHeight = (item.consultAmount / maxValue) * 120;
            const diverseHeight = (item.diverseAmount / maxValue) * 120;
            
            return (
              <View key={index} style={styles.barContainer}>
                <View style={styles.bar}>
                  <View
                    style={[
                      styles.barSegment,
                      {
                        height: consultHeight,
                        backgroundColor: COLORS.primary,
                      },
                    ]}
                  />
                  <View
                    style={[
                      styles.barSegment,
                      {
                        height: diverseHeight,
                        backgroundColor: COLORS.success,
                      },
                    ]}
                  />
                </View>
                <Text style={[styles.xAxisLabel, { color: COLORS.textSecondary }]}>
                  {item.month}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
  },
  chartContainer: {
    flexDirection: 'row',
    height: 160,
  },
  yAxis: {
    justifyContent: 'space-between',
    paddingRight: 12,
    width: 60,
  },
  yAxisLabel: {
    fontSize: 10,
    textAlign: 'right',
  },
  chart: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
  },
  barContainer: {
    alignItems: 'center',
    flex: 1,
  },
  bar: {
    width: 30,
    height: 120,
    justifyContent: 'flex-end',
  },
  barSegment: {
    width: '100%',
    borderRadius: 2,
    marginBottom: 2,
  },
  xAxisLabel: {
    fontSize: 10,
    marginTop: 8,
    textAlign: 'center',
  },
});

export default RevenueChart;