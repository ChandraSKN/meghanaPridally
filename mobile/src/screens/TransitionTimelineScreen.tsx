import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Dimensions, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { colors } from '../theme/colors';
import { profileApi, BodyProfile } from '../lib/api';
import { TRANSITION_STAGES, DISCLAIMER } from '../lib/transitionStages';
import MannequinAvatar from '../components/MannequinAvatar';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function TransitionTimelineScreen({ navigation }: any) {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<BodyProfile | null>(null);
  const [pageIndex, setPageIndex] = useState(0);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      profileApi
        .me()
        .then(setProfile)
        .catch(() => setProfile(null))
        .finally(() => setLoading(false));
    }, [])
  );

  const onScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
    setPageIndex(index);
  };

  const header = (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton} hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
        <Text style={styles.backText}>‹</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Transition timeline</Text>
      <View style={styles.backButton} />
    </View>
  );

  if (loading) {
    return (
      <View style={styles.flex}>
        {header}
        <ActivityIndicator color={colors.primary} style={{ marginTop: 40 }} />
      </View>
    );
  }

  const hasProfile = !!profile && !!profile.transition_direction && profile.height !== null && profile.weight !== null;

  if (!hasProfile) {
    return (
      <View style={styles.flex}>
        {header}
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>
            Add your height, weight, and direction to see the illustrated timeline.
          </Text>
          <TouchableOpacity style={styles.emptyButton} onPress={() => navigation.navigate('BodyMeasurements')}>
            <Text style={styles.emptyButtonText}>Add measurements</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const direction = profile!.transition_direction as 'feminizing' | 'masculinizing';
  const stages = TRANSITION_STAGES[direction];
  const current = stages[pageIndex] ?? stages[0];

  return (
    <View style={styles.flex}>
      {header}

      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScrollEnd}
        style={{ flexGrow: 0 }}
      >
        {stages.map((stage, index) => (
          <View key={stage.key} style={[styles.page, { width: SCREEN_WIDTH }]}>
            <MannequinAvatar
              heightCm={profile!.height}
              weightKg={profile!.weight}
              chestCm={profile!.chest}
              waistCm={profile!.waist}
              hipCm={profile!.hip}
              direction={direction}
              stageIndex={index}
              totalStages={stages.length}
            />
          </View>
        ))}
      </ScrollView>

      <View style={styles.dots}>
        {stages.map((stage, index) => (
          <View key={stage.key} style={[styles.dot, index === pageIndex && styles.dotActive]} />
        ))}
      </View>

      <ScrollView style={styles.details} contentContainerStyle={styles.detailsContent}>
        <Text style={styles.stageLabel}>{current.label}</Text>
        {current.changes.map((c, i) => (
          <Text key={i} style={styles.changeItem}>
            {'•'} {c}
          </Text>
        ))}
      </ScrollView>

      <Text style={styles.disclaimer}>{DISCLAIMER}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 20, marginBottom: 8 },
  backButton: { width: 32, height: 32, justifyContent: 'center', alignItems: 'center' },
  backText: { fontSize: 28, color: colors.text, marginTop: -4 },
  title: { fontSize: 18, fontWeight: '700', color: colors.text },
  emptyState: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 },
  emptyText: { fontSize: 14, color: colors.textMuted, textAlign: 'center', marginBottom: 20, lineHeight: 20 },
  emptyButton: { backgroundColor: colors.primary, borderRadius: 10, paddingVertical: 14, paddingHorizontal: 24 },
  emptyButtonText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  page: { alignItems: 'center', justifyContent: 'center', paddingVertical: 12 },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: 6, marginBottom: 8 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.border },
  dotActive: { backgroundColor: colors.primary, width: 18 },
  details: { maxHeight: 160, paddingHorizontal: 24 },
  detailsContent: { paddingBottom: 8 },
  stageLabel: { fontSize: 16, fontWeight: '700', color: colors.text, marginBottom: 8 },
  changeItem: { fontSize: 14, color: colors.text, marginBottom: 6, lineHeight: 20 },
  disclaimer: { fontSize: 11, color: colors.textMuted, textAlign: 'center', paddingHorizontal: 24, paddingVertical: 12, lineHeight: 16 },
});
