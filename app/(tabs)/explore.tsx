import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function AboutScreen() {
  return (
    <ThemedView style={styles.container}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.gradient}
      >
        <ThemedView style={styles.content}>
          <Ionicons name="gift" size={80} color="white" />
          <ThemedText type="title" style={styles.title}>
            Birthday Reminder
          </ThemedText>
          <ThemedText style={styles.version}>
            Version 1.0.0
          </ThemedText>

          <ThemedView style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Features
            </ThemedText>
            <ThemedText style={styles.feature}>
              ✨ Smart birthday notifications
            </ThemedText>
            <ThemedText style={styles.feature}>
              📅 Easy birthday management
            </ThemedText>
            <ThemedText style={styles.feature}>
              🎨 Beautiful gradient design
            </ThemedText>
            <ThemedText style={styles.feature}>
              📱 Cross-platform support
            </ThemedText>
          </ThemedView>

          <ThemedView style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Tips
            </ThemedText>
            <ThemedText style={styles.tip}>
              • Add birthdays early to never miss a notification
            </ThemedText>
            <ThemedText style={styles.tip}>
              • Birthdays are highlighted when they&apos;re coming soon
            </ThemedText>
            <ThemedText style={styles.tip}>
              • Today&apos;s birthdays get special highlighting
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </LinearGradient>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 25,
    paddingTop: 80,
    alignItems: 'center',
  },
  title: {
    color: 'white',
    textAlign: 'center',
    marginBottom: 5,
  },
  version: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 16,
    marginBottom: 40,
  },
  section: {
    width: '100%',
    marginBottom: 30,
  },
  sectionTitle: {
    color: 'white',
    marginBottom: 15,
    textAlign: 'center',
  },
  feature: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  tip: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 15,
    marginBottom: 6,
    textAlign: 'center',
  },
});
