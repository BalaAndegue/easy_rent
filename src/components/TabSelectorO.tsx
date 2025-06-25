import React ,{useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../utils/colors';

interface TabSelectorOProps {
  tabs: string[];
  activeTab: string;
  onTabPress: (tab: string) => void;
}

const TabSelectorO: React.FC<TabSelectorOProps> = ({ tabs, activeTab, onTabPress }) => {

  const [selectedTab, setSelectedTab] = useState<string>('Général');
  const handleTabPress = (tab: string) => {
  setSelectedTab(tab);
};


  return (

    
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab}
          style={[
            styles.tab, 
            activeTab === tab ? styles.activeTab : styles.inactiveTab
          ]}
          onPress={() => onTabPress(tab)}
        >
          <Text style={[
            styles.tabText,
            activeTab === tab && styles.activeTabText
          ]}>
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 8,
    overflow: 'hidden',
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: 8,
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 5,
  },
  inactiveTab: {
    backgroundColor: COLORS.background,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textLight,
  },
  activeTabText: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
});

export default TabSelectorO;