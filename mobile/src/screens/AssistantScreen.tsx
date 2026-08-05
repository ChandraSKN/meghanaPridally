import React, { useCallback, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { colors } from '../theme/colors';
import { useAuth } from '../contexts/AuthContext';
import { checkinsApi, DailyCheckIn } from '../lib/api';
import { dateKey } from '../lib/streak';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

const FOLLOW_UP_SUGGESTIONS = ['Tell me more about this', 'Give me specific tips', 'How can I track this?', 'What else should I know?'];

function daysAgoKey(n: number) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return dateKey(d);
}

function generateBotResponse(userMessage: string, checkins: DailyCheckIn[], todayCompleted: boolean): string {
  const lower = userMessage.toLowerCase();

  const last7Keys = Array.from({ length: 7 }, (_, i) => daysAgoKey(i));
  const last7Count = checkins.filter((c) => last7Keys.includes(c.check_in_date)).length;
  const completionRate = Math.round((last7Count / 7) * 100);

  if (lower.includes('sleep') || lower.includes('tired') || lower.includes('rest')) {
    return `Here are some sleep tips:\n\n• Keep a consistent sleep schedule, even on weekends\n• Wind down for an hour before bed — dim lights, no screens\n• Keep your room cool and dark\n• Try gentle stretching or a few slow breaths before lying down\n\nYour recent check-ins help track how this changes over time. 😴`;
  }

  if (lower.includes('stress') || lower.includes('anxiety') || lower.includes('worried')) {
    return `Stress is worth taking seriously. A few things that help:\n\n• Try the 4-7-8 breathing technique (inhale 4, hold 7, exhale 8)\n• A short walk, even 10 minutes, measurably lowers stress hormones\n• Naming what's stressing you (out loud or written) reduces its grip\n• Talking to someone you trust\n\nIf stress persists, a healthcare professional is worth talking to — this isn't a substitute for that. 🧠💙`;
  }

  if (lower.includes('exercise') || lower.includes('workout') || lower.includes('fitness')) {
    return `Building an exercise habit:\n\n• Start small — 10–15 minutes daily beats an hour once a week\n• Pick something you don't dread (walking counts!)\n• Schedule it like an appointment\n• Track it in your daily check-in so you can see the pattern\n\nConsistency matters far more than intensity. 💪`;
  }

  if (lower.includes('nutrition') || lower.includes('diet') || lower.includes('food') || lower.includes('eating')) {
    return `A few sustainable nutrition habits:\n\n• Build meals around whole foods — fruit, vegetables, protein, whole grains\n• Water first, before reaching for other drinks\n• Eat slowly enough to notice when you're actually full\n• Progress over perfection — one meal doesn't undo a pattern\n\n🥗`;
  }

  if (lower.includes('progress') || lower.includes('analyze') || lower.includes('data')) {
    return `Here's what your check-ins show:\n\n📊 Last 7 days: checked in ${last7Count}/7 days (${completionRate}%)\n📊 Today: ${todayCompleted ? 'Completed ✅' : 'Not yet ⏳'}\n\n${
      completionRate >= 70
        ? "That's a strong streak — keep it going."
        : 'A daily reminder around the same time each day tends to help build the habit.'
    } 📈`;
  }

  if (lower.includes('motivation') || lower.includes('help') || lower.includes('support')) {
    return `You're already doing something that matters just by tracking this. A few things worth remembering:\n\n✨ Consistency beats perfection\n✨ Progress isn't always a straight line\n✨ Showing up today counts, even on the days that feel small\n\nKeep going. 🌟`;
  }

  if (lower.includes('tips') || lower.includes('advice') || lower.includes('suggestions')) {
    return `A few general wellness habits:\n\n🌅 Morning: a glass of water, a few minutes of stretching\n🏃 During the day: short movement breaks, notice 3 good things\n🌙 Evening: your daily check-in, then wind down for sleep\n\nYour check-ins help make these specific to you over time. 🎯`;
  }

  return `I can help with:\n\n• 🧠 Mental health and stress\n• 😴 Sleep\n• 💪 Exercise and fitness\n• 🥗 Nutrition\n• 📊 Your check-in progress\n\nWhat would you like to explore?`;
}

export default function AssistantScreen() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      type: 'bot',
      content: `Hi ${user?.first_name || 'there'}! I'm LiLo, your wellness assistant. Ask me about sleep, stress, exercise, nutrition, or how your check-ins are going.`,
      timestamp: new Date(),
      suggestions: ['How can I improve my sleep?', 'Give me wellness tips', 'Analyze my recent progress', 'Help with stress management'],
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [checkins, setCheckins] = useState<DailyCheckIn[]>([]);
  const [todayCompleted, setTodayCompleted] = useState(false);
  const listRef = useRef<FlatList>(null);

  useFocusEffect(
    useCallback(() => {
      checkinsApi
        .monthly()
        .then(setCheckins)
        .catch(() => {});
      checkinsApi
        .today()
        .then((c) => setTodayCompleted(!!c))
        .catch(() => {});
    }, [])
  );

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMessage: Message = { id: `${Date.now()}`, type: 'user', content: trimmed, timestamp: new Date() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const botMessage: Message = {
        id: `${Date.now()}-bot`,
        type: 'bot',
        content: generateBotResponse(trimmed, checkins, todayCompleted),
        timestamp: new Date(),
        suggestions: FOLLOW_UP_SUGGESTIONS,
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
      requestAnimationFrame(() => listRef.current?.scrollToEnd({ animated: true }));
    }, 900);

    requestAnimationFrame(() => listRef.current?.scrollToEnd({ animated: true }));
  };

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={(m) => m.id}
        contentContainerStyle={styles.list}
        onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
        renderItem={({ item }) => (
          <View style={[styles.bubbleRow, item.type === 'user' ? styles.bubbleRowUser : styles.bubbleRowBot]}>
            <View style={[styles.bubble, item.type === 'user' ? styles.bubbleUser : styles.bubbleBot]}>
              <Text style={item.type === 'user' ? styles.bubbleTextUser : styles.bubbleText}>{item.content}</Text>
              <Text style={item.type === 'user' ? styles.timeTextUser : styles.timeText}>
                {item.timestamp.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
              </Text>
              {item.suggestions && item.type === 'bot' && (
                <View style={styles.suggestions}>
                  {item.suggestions.map((s: string) => (
                    <TouchableOpacity key={s} style={styles.suggestionChip} onPress={() => setInput(s)}>
                      <Text style={styles.suggestionText}>{s}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </View>
        )}
        ListFooterComponent={
          isTyping ? (
            <View style={[styles.bubbleRow, styles.bubbleRowBot]}>
              <View style={[styles.bubble, styles.bubbleBot]}>
                <ActivityIndicator size="small" color={colors.textMuted} />
              </View>
            </View>
          ) : null
        }
      />

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Ask LiLo anything..."
          placeholderTextColor={colors.textMuted}
          onSubmitEditing={() => send(input)}
          returnKeyType="send"
          multiline
        />
        <TouchableOpacity style={[styles.sendButton, !input.trim() && styles.sendButtonDisabled]} onPress={() => send(input)} disabled={!input.trim()}>
          <Text style={styles.sendButtonText}>➤</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  list: { padding: 16, paddingBottom: 8 },
  bubbleRow: { flexDirection: 'row', marginBottom: 12 },
  bubbleRowUser: { justifyContent: 'flex-end' },
  bubbleRowBot: { justifyContent: 'flex-start' },
  bubble: { maxWidth: '82%', borderRadius: 14, padding: 12 },
  bubbleUser: { backgroundColor: colors.primary },
  bubbleBot: { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border },
  bubbleText: { fontSize: 14, color: colors.text, lineHeight: 20 },
  bubbleTextUser: { fontSize: 14, color: '#fff', lineHeight: 20 },
  timeText: { fontSize: 11, color: colors.textMuted, marginTop: 6 },
  timeTextUser: { fontSize: 11, color: 'rgba(255,255,255,0.7)', marginTop: 6 },
  suggestions: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 10 },
  suggestionChip: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  suggestionText: { fontSize: 12, color: colors.primaryDark, fontWeight: '600' },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.card,
    gap: 8,
  },
  input: {
    flex: 1,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    color: colors.text,
    maxHeight: 100,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: { opacity: 0.4 },
  sendButtonText: { color: '#fff', fontSize: 16 },
});
