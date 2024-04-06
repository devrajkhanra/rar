import moment from "moment";
import { LastUpdated } from "./dateModel";

export function formatDate(date: Date): string {
  const day: string = String(date.getDate()).padStart(2, "0");
  const month: string = String(date.getMonth() + 1).padStart(2, "0"); // January is 0!
  const year: number = date.getFullYear();

  return `${day}${month}${year}`;
}

export function formatDateDash(date: Date): string {
  const day: string = String(date.getDate()).padStart(2, "0");
  const month: string = String(date.getMonth() + 1).padStart(2, "0"); // January is 0!
  const year: number = date.getFullYear();

  return `${day}-${month}-${year}`;
}

export function parseDate(date: Date): String {
  return moment(date, "DDMMYYYY").format("DDMMYYYY");
}

// Function to save the last updated date in the database
export async function saveLastUpdatedDate(date: string): Promise<void> {
  try {
    // Check if the collection exists
    const count = await LastUpdated.countDocuments();

    // If the collection doesn't exist, create it and insert the date
    if (count === 0) {
      await LastUpdated.create({ date });
    } else {
      // If the collection exists, update the existing document with the new date
      await LastUpdated.findOneAndUpdate({}, { date });
    }
    console.log("Last updated date saved successfully.");
  } catch (error) {
    console.error("Error saving last updated date:", error);
    throw error;
  }
}

export function getDatesOfMonth(monthOffset: number): string[] {
  const currentDate: Date = new Date();
  currentDate.setMonth(currentDate.getMonth() + monthOffset);

  const year: number = currentDate.getFullYear();
  const month: number = currentDate.getMonth();

  const dates: string[] = [];

  // Iterate through each day of the month
  for (
    let day: number = 1;
    day <= new Date(year, month + 1, 0).getDate();
    day++
  ) {
    const formattedDate: Date = new Date(year, month, day);
    dates.push(formatDateDash(formattedDate));
  }

  return dates;
}

export function getDatesOfWeek(offset: number): string[] {
  const today = new Date();
  const firstDayOfWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - today.getDay() + offset * 7
  );
  const dates: string[] = [];

  // for (let i = 0; i < 7; i++) {
  //   const currentDate = new Date(
  //     firstDayOfWeek.getFullYear(),
  //     firstDayOfWeek.getMonth(),
  //     firstDayOfWeek.getDate() + i
  //   );
  //   const formattedDate = `${("0" + currentDate.getDate()).slice(-2)}${(
  //     "0" +
  //     (currentDate.getMonth() + 1)
  //   ).slice(-2)}${currentDate.getFullYear()}`;
  //   dates.push(formattedDate);
  // }

  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(
      firstDayOfWeek.getFullYear(),
      firstDayOfWeek.getMonth(),
      firstDayOfWeek.getDate() + i
    );
    const formattedDate = formatDateDash(currentDate); // Format the date using formatDateDash function
    dates.push(formattedDate);
  }

  return dates;
}
