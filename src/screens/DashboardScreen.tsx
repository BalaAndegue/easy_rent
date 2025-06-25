
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import Header from '../components/Header';
import StatsCard from '../components/StatsCard';
import RevenueChart from '../components/RevenueChart';
import SystemAlerts from '../components/SystemAlerts';
import { DashboardData, SystemAlert } from '../types';
import SearchBar from '../components/SearchBar';
import { COLORS } from '../utils/colors';
import { Ionicons } from '@expo/vector-icons';

import { AgencyCard } from '../components/AgencyCard';
import { ServiceCard } from '../components/ServiceCard';

import { mockData } from '../store/Data';

const DashboardScreen: React.FC = () => {
  //const { colors } = useTheme();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [activeTab, setActiveTab] = useState<'general' | 'stats'>('general');

  useEffect(() => {
    // Simulate API data loading
    const mockData: DashboardData = {
      agencies:[
          {
    id: "1",
    name: "Express Rentals",
    location: "Paris, France",
    performance: 88,
    revenue: 500000,
    employees: 45,
    currency: "EUR",
  },
  {
    id: "2",
    name: "FastTrack Logistics",
    location: "Berlin, Germany",
    performance: 92,
    revenue: 750000,
    employees: 60,
    currency: "EUR",
  },
  {
    id: "3",
    name: "Skyline Transport",
    location: "New York, USA",
    performance: 85,
    revenue: 620000,
    employees: 50,
    currency: "USD",
  },
  {
    id: "4",
    name: "Urban Mobility",
    location: "Tokyo, Japan",
    performance: 90,
    revenue: 820000,
    employees: 75,
    currency: "JPY",
  },
  {
    id: "5",
    name: "Green Transit",
    location: "Sydney, Australia",
    performance: 87,
    revenue: 550000,
    employees: 40,
    currency: "AUD",
  },
      ],
      services:[
        {
    id: "1",
    title: "Location de voiture",
    description: "Service de location de véhicules haut de gamme pour particuliers et entreprises.",
    price: 80,
    popularity: 95,
    revenue: 120000,
    currency: "EUR",
    type: "location",
  },
  {
    id: "2",
    title: "Transport de colis",
    description: "Livraison rapide et sécurisée de colis à domicile ou en point relais.",
    price: 15,
    popularity: 85,
    revenue: 90000,
    currency: "USD",
    type: "transport",
  },
  {
    id: "3",
    title: "Organisation d'événements",
    description: "Planification et gestion d'événements professionnels et privés.",
    price: 5000,
    popularity: 80,
    revenue: 200000,
    currency: "GBP",
    type: "events",
  },
  {
    id: "4",
    title: "Service de chauffeur privé",
    description: "Mise à disposition de chauffeurs privés pour des déplacements sur mesure.",
    price: 120,
    popularity: 88,
    revenue: 95000,
    currency: "USD",
    type: "transport",
  },
  {
    id: "5",
    title: "Location d’espace de coworking",
    description: "Espaces de travail partagés équipés pour les professionnels et startups.",
    price: 250,
    popularity: 90,
    revenue: 150000,
    currency: "EUR",
    type: "location",
  },
      ],
      vehicles: {
        total: 20,
        changeFromLastMonth: 5.5,
        vehicles:[]
      },
      drivers: {
        total: 5,
        changeFromLastMonth: 1.1,
      },
      totalRevenue: {
        amount: 118880,
        currency: 'XAF',
        changeFromLastMonth: -0.5,
      },
      occupationRate: {
        percentage: 15,
        changeFromLastMonth: 1.8,
      },
      revenueChart: [
        { month: 'Jan', consultAmount: 95000, diverseAmount: 5000 },
        { month: 'Fév', consultAmount: 2000, diverseAmount: 1000 },
        { month: 'Mar', consultAmount: 3000, diverseAmount: 2000 },
        { month: 'Avr', consultAmount: 4000, diverseAmount: 1500 },
        { month: 'May', consultAmount: 0, diverseAmount: 0 },
      ],
      systemAlerts: [
        {
          id: '1',
          type: 'maintenance',
          title: 'Maintenance véhicule requise',
          description: '3 véhicules nécessitent un entretien dans les 7 prochains jours',
          priority: 'high',
          count: 3,
        },
        {
          id: '2',
          type: 'location',
          title: 'Locations prochaines',
          description: '8 réservations à confirmer pour demain',
          priority: 'medium',
          count: 8,
        },
        {
          id: '3',
          type: 'payment',
          title: 'Paiements en attente',
          description: '4 paiements clients en retard de plus de 15 jours',
          priority: 'high',
          count: 4,
        },
        {
          id: '4',
          type: 'driver',
          title: 'Chauffeurs disponibles limités',
          description: 'Seulement 4 chauffeurs disponibles ce weekend',
          priority: 'medium',
        },
        {
          id: '5',
          type: 'client',
          title: 'Demandes clients',
          description: 'Nouvelles demandes de location en attente',
          priority: 'low',
        },
      ],
    };

    setDashboardData(mockData);
  }, []);

  const handleAlertPress = (alert: SystemAlert) => {
    Alert.alert(alert.title, alert.description);
  };

  if (!dashboardData) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: COLORS.background }]}>
        <View style={styles.loadingContainer}>
          <Text style={[styles.loadingText, { color: COLORS.text }]}>
            Chargement...
          </Text>
        </View>
      </SafeAreaView>
    );
  }


   const renderSectionHeader = (title: string, subtitle: string, icon: string) => (
    <View style={styles.sectionHeader}>
      <View style={styles.sectionTitleContainer}>
        <Ionicons name={icon as any} size={20} color={COLORS.primary} />
        <View style={styles.sectionTextContainer}>
          <Text style={styles.sectionTitle}>{title}</Text>
          <Text style={styles.sectionSubtitle}>{subtitle}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: COLORS.background }]}>
      <Header title="EASY RENT" />
      <SearchBar title="Easy-rent" placeholder="Search something here" />

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'general' && { backgroundColor: COLORS.primary },
          ]}
          onPress={() => setActiveTab('general')}
        >
          <Text
            style={[
              styles.tabText,
              { color: activeTab === 'general' ? COLORS.surface : COLORS.text },
            ]}
          >
            Vue générale
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'stats' && { backgroundColor: COLORS.primary },
          ]}
          onPress={() => setActiveTab('stats')}
        >
          <Text
            style={[
              styles.tabText,
              { color: activeTab === 'stats' ? COLORS.surface : COLORS.text },
            ]}
          >
            Statistiques
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: COLORS.text }]}>
            Tableau de bord
          </Text>
          <Text style={[styles.sectionSubtitle, { color: COLORS.textSecondary }]}>
            Aperçu de la performance et des statistiques de votre entreprise
          </Text>
        </View>

        <View style={styles.statsGrid}>
          <StatsCard
            title="Véhicules"
            value={dashboardData.vehicles.total}
            subtitle={`+${dashboardData.vehicles.changeFromLastMonth}% depuis le mois dernier`}
            icon="car"
            iconColor={COLORS.primary}
            changePercentage={dashboardData.vehicles.changeFromLastMonth}
          />
          <StatsCard
            title="Chauffeurs"
            value={dashboardData.drivers.total}
            subtitle={`+${dashboardData.drivers.changeFromLastMonth}% depuis le mois dernier`}
            icon="person"
            iconColor={COLORS.secondary}
            changePercentage={dashboardData.drivers.changeFromLastMonth}
          />
        </View>

        <View style={styles.statsGrid}>
          <StatsCard
            title="Revenus Totaux"
            value={`${dashboardData.totalRevenue.amount.toLocaleString()} ${dashboardData.totalRevenue.currency}`}
            subtitle={`${dashboardData.totalRevenue.changeFromLastMonth}% depuis le mois dernier`}
            icon="wallet"
            iconColor={COLORS.success}
            changePercentage={dashboardData.totalRevenue.changeFromLastMonth}
          />
          <StatsCard
            title="Taux d'occupation"
            value={`${dashboardData.occupationRate.percentage}%`}
            subtitle={`+${dashboardData.occupationRate.changeFromLastMonth}% depuis le mois dernier`}
            icon="analytics"
            iconColor={COLORS.warning}
            changePercentage={dashboardData.occupationRate.changeFromLastMonth}
          />
        </View>

        <RevenueChart data={dashboardData.revenueChart} />

        <SystemAlerts
          alerts={dashboardData.systemAlerts}
          onAlertPress={handleAlertPress}
        />

        <View style={styles.bottomPadding} />



        {/* Performance des agences */}
        {renderSectionHeader(
          'Performance des agences',
          'Vue d\'ensemble de toutes vos agences',
          'business-outline'
        )}
        
        {mockData.agencies.map((agency) => (
          <AgencyCard
            key={agency.id}
            agency={agency}
            onPress={() => console.log('Agency pressed:', agency.name)}
            onDetailsPress={() => console.log('Details pressed:', agency.name)}
          />
        ))}

        {/* Services proposés */}
        {renderSectionHeader(
          'Services proposés',
          'Performances et statistiques de vos services',
          'car-outline'
        )}
        
        {mockData.services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            onPress={() => console.log('Service pressed:', service.title)}
            onManagePress={() => console.log('Manage pressed:', service.title)}
          />
        ))}

        {/* Performance des véhicules */}
        {renderSectionHeader(
          'Performance des véhicules',
          'Classement des véhicules les plus rentables',
          'speedometer-outline'
        )}
        
        <View style={styles.vehicleSection}>
          <TouchableOpacity style={styles.vehicleCard}>
            <View style={styles.vehicleHeader}>
              <Text style={styles.vehicleBrand}>Toyota Camry</Text>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={16} color="#FFD700" />
                <Text style={styles.rating}>4.8</Text>
              </View>
            </View>
            <View style={styles.vehicleStats}>
              <Text style={styles.vehicleLocations}>342 locations</Text>
              <Text style={styles.vehicleRevenue}>2 180 000 XAF</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    margin: 16,
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
    color: COLORS.primary,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: COLORS.secondary,
  },
  statsGrid: {
    flexDirection: 'row',
    paddingHorizontal: 8,
  },
  bottomPadding: {
    height: 20,
  },


  sectionHeader: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: COLORS.surface,
    marginTop: 8,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTextContainer: {
    marginLeft: 12,
  },


  vehicleSection: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  vehicleCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  vehicleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  vehicleBrand: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primary,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.primary,
    marginLeft: 4,
  },
  vehicleStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  vehicleLocations: {
    fontSize: 14,
    color: COLORS.secondary,
  },
  vehicleRevenue: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.secondary,
  },

});

export default DashboardScreen;