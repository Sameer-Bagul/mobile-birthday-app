import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "BIRTHDAYS_DATA";

export async function getBirthdays() {
  const raw = await AsyncStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : [];
}

export async function saveBirthdays(list: any[]) {
  await AsyncStorage.setItem(KEY, JSON.stringify(list));
}

export async function addBirthday(item: any) {
  const list = await getBirthdays();
  list.push(item);
  await saveBirthdays(list);
  return list;
}

export async function deleteBirthday(id: string) {
  const list = await getBirthdays();
  const updated = list.filter((x: any) => x.id !== id);
  await saveBirthdays(updated);
  return updated;
}
