import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from "@react-native-community/datetimepicker";
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from "expo-router";
import { useState } from "react";
import { Platform, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

import { ThemedText } from '../../components/themed-text';
import { ThemedView } from '../../components/themed-view';
import { addBirthday } from "../../storage/birthdays";
import { scheduleBirthdayNotification } from "../../utils/notifications";

export default function AddBirthday() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const formatDate = (d: Date) => {
    const y = d.getFullYear();
    const m = `${d.getMonth() + 1}`.padStart(2, "0");
    const da = `${d.getDate()}`.padStart(2, "0");
    return `${y}-${m}-${da}`;
  };

  const save = async () => {
    if (!name.trim()) return;

    const dateStr = formatDate(date);
    const notificationId = await scheduleBirthdayNotification(name, dateStr);

    await addBirthday({
      id: Date.now().toString(),
      name: name.trim(),
      date: dateStr,
      notificationId,
    });

    router.back();
  };

  return (
    <ThemedView style={styles.container}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Ionicons name="gift" size={60} color="white" />
            <ThemedText type="title" style={styles.heading}>
              Add Birthday
            </ThemedText>
            <ThemedText style={styles.subtitle}>
              Add someone special to your list
            </ThemedText>
          </View>

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <View style={styles.labelContainer}>
                <Ionicons name="person" size={18} color="white" />
                <ThemedText style={styles.label}> Name</ThemedText>
              </View>
              <TextInput
                style={styles.input}
                placeholder="Enter name"
                placeholderTextColor="rgba(255,255,255,0.6)"
                value={name}
                onChangeText={setName}
              />
            </View>

            <View style={styles.inputGroup}>
              <View style={styles.labelContainer}>
                <Ionicons name="calendar" size={18} color="white" />
                <ThemedText style={styles.label}> Birthday Date</ThemedText>
              </View>
              <TouchableOpacity style={styles.input} onPress={() => setShowPicker(true)}>
                <ThemedText style={styles.dateText}>{date.toDateString()}</ThemedText>
              </TouchableOpacity>
            </View>

            {showPicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={(e, selected) => {
                  setShowPicker(false);
                  if (selected) setDate(selected);
                }}
              />
            )}

            <TouchableOpacity
              style={[styles.save, !name.trim() && styles.saveDisabled]}
              onPress={save}
              disabled={!name.trim()}
            >
              <LinearGradient
                colors={name.trim() ? ['#4facfe', '#00f2fe'] : ['#cccccc', '#999999']}
                style={styles.saveGradient}
              >
                <ThemedText style={styles.saveText}>Save Birthday</ThemedText>
              </LinearGradient>
            </TouchableOpacity>
          </View>
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
    padding: 25,
    paddingTop: 80,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  heading: {
    color: 'white',
    marginBottom: 5,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 16,
  },
  form: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: 25,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    color: 'white',
  },
  dateText: {
    color: 'white',
    fontSize: 16,
  },
  save: {
    borderRadius: 25,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginTop: 20,
  },
  saveDisabled: {
    opacity: 0.6,
  },
  saveGradient: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    alignItems: 'center',
  },
  saveText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
