/**
 * Note: expo-notifications is not supported in Expo Go.
 * For full notification support, use a development build.
 */

/**
 * Compute next birthday occurrence date
 */
export function nextTrigger(dateString: string): Date {
  const [, month, day] = dateString.split("-").map(Number);
  const now = new Date();
  let date = new Date(now.getFullYear(), month - 1, day, 9, 0, 0);

  if (date < now) {
    date = new Date(now.getFullYear() + 1, month - 1, day, 9, 0, 0);
  }

  return date;
}

/**
 * Schedule birthday reminder at 9:00 AM on date
 * Note: Disabled in Expo Go - use development build for notifications
 */
export async function scheduleBirthdayNotification(name: string, dateString: string) {
  // Notifications not supported in Expo Go
  console.log(`Would schedule notification for ${name} on ${dateString}`);
  return null;
}

export async function cancelNotification(id: string) {
  if (!id) return;
  // Notifications not supported in Expo Go
  console.log(`Would cancel notification ${id}`);
}
