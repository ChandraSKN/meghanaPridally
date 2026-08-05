import React, { useRef, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { colors } from '../theme/colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const SLIDES = [
  {
    emoji: '🌱',
    title: 'Your daily wellness companion',
    description: "Track how you're doing, one check-in at a time.",
  },
  {
    emoji: '🔒',
    title: 'Private by design',
    description: "Your check-ins are yours — visible only to you.",
  },
  {
    emoji: '🧠💜🌱💪🤝',
    title: 'Five areas of wellbeing',
    description: 'Mental, sexual, reproductive, physical, and social health — tracked together.',
  },
];

export default function OnboardingCarouselScreen({ onFinish }: { onFinish: () => void }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
    setActiveIndex(index);
  };

  const goToIndex = (index: number) => {
    scrollRef.current?.scrollTo({ x: index * SCREEN_WIDTH, animated: true });
    setActiveIndex(index);
  };

  const isLast = activeIndex === SLIDES.length - 1;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.skipButton} onPress={onFinish} hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScroll}
      >
        {SLIDES.map((slide) => (
          <View key={slide.title} style={[styles.slide, { width: SCREEN_WIDTH }]}>
            <Text style={styles.emoji}>{slide.emoji}</Text>
            <Text style={styles.title}>{slide.title}</Text>
            <Text style={styles.description}>{slide.description}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.dots}>
          {SLIDES.map((_, i) => (
            <View key={i} style={[styles.dot, i === activeIndex && styles.dotActive]} />
          ))}
        </View>

        <TouchableOpacity style={styles.primaryButton} onPress={() => (isLast ? onFinish() : goToIndex(activeIndex + 1))}>
          <Text style={styles.primaryButtonText}>{isLast ? 'Get Started' : 'Next'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  skipButton: { position: 'absolute', top: 16, right: 16, zIndex: 1, padding: 8 },
  skipText: { color: colors.textMuted, fontWeight: '600', fontSize: 14 },
  slide: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32 },
  emoji: { fontSize: 56, marginBottom: 24 },
  title: { fontSize: 22, fontWeight: '700', color: colors.text, textAlign: 'center' },
  description: { fontSize: 15, color: colors.textMuted, textAlign: 'center', marginTop: 10, lineHeight: 22 },
  footer: { paddingHorizontal: 24, paddingBottom: 32, paddingTop: 8 },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: 8, marginBottom: 20 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.border },
  dotActive: { backgroundColor: colors.primary, width: 20 },
  primaryButton: { backgroundColor: colors.primary, borderRadius: 10, paddingVertical: 15, alignItems: 'center' },
  primaryButtonText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});
