import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from './themed-text';

function daysLeft(dateString: string) {
  const [month, day] = dateString.split("-").map(Number);
  const now = new Date();
  let target = new Date(now.getFullYear(), month - 1, day);

  if (target < now) {
    target = new Date(now.getFullYear() + 1, month - 1, day);
  }

  return Math.ceil((target.getTime() - now.getTime()) / 86400000);
}

export default function BirthdayCard({ item, onDelete }: any) {
  const days = daysLeft(item.date);
  const isToday = days === 0;
  const isSoon = days <= 7 && days > 0;

  return (
    <View style={styles.cardContainer}>
      <LinearGradient
        colors={isToday ? ['#ff9a9e', '#fecfef'] : isSoon ? ['#a8edea', '#fed6e3'] : ['#ffffff', '#f8f9fa']}
        style={styles.card}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.cardContent}>
          <View style={styles.leftSection}>
            <Ionicons name="gift" size={isToday ? 45 : 40} color="#333" />
            <View>
              <ThemedText style={styles.name}>{item.name}</ThemedText>
              <ThemedText style={styles.date}>{item.date}</ThemedText>
            </View>
          </View>

          <View style={styles.rightSection}>
            <View style={[styles.daysContainer, isToday && styles.todayContainer, isSoon && styles.soonContainer]}>
              <ThemedText style={[styles.days, isToday && styles.todayText]}>
                {days === 0 ? 'Today!' : `${days} days`}
              </ThemedText>
            </View>
            <TouchableOpacity
              style={styles.del}
              onPress={() => onDelete(item)}
            >
              <Ionicons name="trash" size={16} color="#666" />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 15,
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  card: {
    borderRadius: 15,
    padding: 20,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    opacity: 0.7,
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  daysContainer: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 10,
    minWidth: 80,
    alignItems: 'center',
  },
  todayContainer: {
    backgroundColor: '#ff4757',
  },
  soonContainer: {
    backgroundColor: '#ffa726',
  },
  days: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  todayText: {
    color: 'white',
  },
  del: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
});
