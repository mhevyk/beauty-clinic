export default function minutesToHourMinutes(durationInMinutes: number) {
  const hour = Math.floor(durationInMinutes / 60);
  const minutes = durationInMinutes % 60;

  let time = hour + " hr ";

  if (minutes !== 0) {
    time += minutes + " min";
  }

  return time;
}
