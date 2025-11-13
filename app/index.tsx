import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from '../components/themed-text';
import { ThemedView } from '../components/themed-view';

export default function Home() {
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Ionicons name="gift" size={80} color="white" />
            <ThemedText type="title" style={styles.title}>
              Birthday Reminder
            </ThemedText>
            <ThemedText type="subtitle" style={styles.subtitle}>
              Never forget a special day again
            </ThemedText>
          </View>

          <View style={styles.features}>
            <View style={styles.feature}>
              <Ionicons name="notifications" size={40} color="white" />
              <ThemedText style={styles.featureText}>Smart Notifications</ThemedText>
            </View>
            <View style={styles.feature}>
              <Ionicons name="calendar" size={40} color="white" />
              <ThemedText style={styles.featureText}>Easy Management</ThemedText>
            </View>
            <View style={styles.feature}>
              <Ionicons name="heart" size={40} color="white" />
              <ThemedText style={styles.featureText}>Personal Touch</ThemedText>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => router.push("/birthdays")}
            style={styles.button}
          >
            <LinearGradient
              colors={['#4facfe', '#00f2fe']}
              style={styles.buttonGradient}
            >
              <ThemedText style={styles.buttonText}>Get Started</ThemedText>
            </LinearGradient>
          </TouchableOpacity>
        </View>
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
    justifyContent: 'space-between',
    padding: 40,
    paddingTop: 100,
    paddingBottom: 80,
  },
  header: {
    alignItems: 'center',
    marginBottom: 60,
  },
  emoji: {
    fontSize: 80,
    marginBottom: 20,
  },
  title: {
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    fontWeight: '400',
  },
  features: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 60,
  },
  feature: {
    alignItems: 'center',
  },
  featureText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
  button: {
    borderRadius: 25,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonGradient: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
