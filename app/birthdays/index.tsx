import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";

import BirthdayCard from "../../components/BirthdayCard";
import { ThemedText } from '../../components/themed-text';
import { ThemedView } from '../../components/themed-view';
import { deleteBirthday, getBirthdays } from "../../storage/birthdays";
import { cancelNotification } from "../../utils/notifications";

export default function BirthdayList() {
  const router = useRouter();
  const [list, setList] = useState<any[]>([]);

  const load = async () => {
    setList(await getBirthdays());
  };

  useFocusEffect(
    useCallback(() => {
      load();
    }, [])
  );

  const onDelete = async (item: any) => {
    await cancelNotification(item.notificationId);
    await deleteBirthday(item.id);
    load();
  };

  return (
    <ThemedView style={styles.container}>
      <LinearGradient
        colors={['#f093fb', '#f5576c']}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Ionicons name="gift" size={32} color="white" />
            <ThemedText type="title" style={styles.title}>
              Birthdays
            </ThemedText>
          </View>
          <ThemedText style={styles.subtitle}>
            {list.length} {list.length === 1 ? 'birthday' : 'birthdays'} saved
          </ThemedText>
        </View>

        {list.length === 0 ? (
          <View style={styles.empty}>
            <Ionicons name="calendar" size={80} color="white" />
            <ThemedText type="subtitle" style={styles.emptyTitle}>
              No birthdays yet
            </ThemedText>
            <ThemedText style={styles.emptyText}>
              Add your first birthday to get started!
            </ThemedText>
          </View>
        ) : (
          <FlatList
            data={list}
            renderItem={({ item }) => (
              <BirthdayCard item={item} onDelete={onDelete} />
            )}
            keyExtractor={(x) => x.id}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
          />
        )}

        <TouchableOpacity
          style={styles.fab}
          onPress={() => router.push("/birthdays/add")}
        >
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            style={styles.fabGradient}
          >
            <ThemedText style={styles.fabText}>+</ThemedText>
          </LinearGradient>
        </TouchableOpacity>
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
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  title: {
    color: 'white',
    marginLeft: 8,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 16,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  emptyText: {
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    fontSize: 16,
  },
  list: {
    padding: 20,
    paddingBottom: 100,
  },
  fab: {
    position: "absolute",
    right: 25,
    bottom: 35,
    width: 70,
    height: 70,
    borderRadius: 35,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  fabGradient: {
    flex: 1,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabText: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
});
