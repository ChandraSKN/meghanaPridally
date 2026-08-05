import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors } from './theme/colors';
import { useAuth } from './contexts/AuthContext';
import OnboardingCarouselScreen from './screens/OnboardingCarouselScreen';
import AuthLandingScreen from './screens/AuthLandingScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import DashboardScreen from './screens/DashboardScreen';
import CheckInScreen from './screens/CheckInScreen';
import ProfileScreen from './screens/ProfileScreen';
import CalendarScreen from './screens/CalendarScreen';
import AssistantScreen from './screens/AssistantScreen';
import PathwaySetupScreen from './screens/PathwaySetupScreen';
import AppointmentsScreen from './screens/AppointmentsScreen';
import BookAppointmentScreen from './screens/BookAppointmentScreen';

const AuthStack = createNativeStackNavigator();
const RootStack = createNativeStackNavigator();
const MainTabs = createBottomTabNavigator();

function TabIcon({ label, focused }: { label: string; focused: boolean }) {
  return <Text style={{ fontSize: 12, fontWeight: '700', color: focused ? colors.primary : colors.textMuted }}>{label}</Text>;
}

function MainTabsNavigator() {
  return (
    <MainTabs.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.card },
        headerTitleStyle: { color: colors.text },
        tabBarStyle: { backgroundColor: colors.card, borderTopColor: colors.border },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
      }}
    >
      <MainTabs.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{ title: 'Pridally', tabBarIcon: ({ focused }) => <TabIcon label="●" focused={focused} /> }}
      />
      <MainTabs.Screen
        name="CheckIn"
        component={CheckInScreen}
        options={{ title: 'Check-in', tabBarIcon: ({ focused }) => <TabIcon label="✚" focused={focused} /> }}
      />
      <MainTabs.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{ title: 'Calendar', tabBarIcon: ({ focused }) => <TabIcon label="▦" focused={focused} /> }}
      />
      <MainTabs.Screen
        name="Assistant"
        component={AssistantScreen}
        options={{ title: 'LiLo', tabBarIcon: ({ focused }) => <TabIcon label="💬" focused={focused} /> }}
      />
      <MainTabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Profile', tabBarIcon: ({ focused }) => <TabIcon label="◍" focused={focused} /> }}
      />
    </MainTabs.Navigator>
  );
}

function MainNavigator() {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="MainTabs" component={MainTabsNavigator} />
      <RootStack.Screen name="Appointments" component={AppointmentsScreen} />
      <RootStack.Screen name="BookAppointment" component={BookAppointmentScreen} />
    </RootStack.Navigator>
  );
}

function AuthNavigator() {
  return (
    <AuthStack.Navigator initialRouteName="AuthLanding" screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="AuthLanding" component={AuthLandingScreen} />
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Signup" component={SignupScreen} />
    </AuthStack.Navigator>
  );
}

const ONBOARDING_SEEN_KEY = 'pridally_has_seen_onboarding_carousel';

export default function Navigation() {
  const { user, loading } = useAuth();
  const [checkingCarousel, setCheckingCarousel] = useState(true);
  const [hasSeenCarousel, setHasSeenCarousel] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(ONBOARDING_SEEN_KEY).then((value) => {
      setHasSeenCarousel(value === 'true');
      setCheckingCarousel(false);
    });
  }, []);

  const finishCarousel = () => {
    AsyncStorage.setItem(ONBOARDING_SEEN_KEY, 'true');
    setHasSeenCarousel(true);
  };

  if (loading || checkingCarousel) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!hasSeenCarousel) {
    return <OnboardingCarouselScreen onFinish={finishCarousel} />;
  }

  return (
    <NavigationContainer>
      {!user ? <AuthNavigator /> : !user.onboarding_completed ? <PathwaySetupScreen /> : <MainNavigator />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loading: { flex: 1, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' },
});
