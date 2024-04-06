import { fetchExpiryDates } from "@/utils/dbHelper";
import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "./mongoose";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { collectionName, instrument } = req.query;

  if (typeof collectionName !== "string" || typeof instrument !== "string") {
    return res.status(400).json({ message: "Bad Request" });
  }

  try {
    await connectDB();
    console.log("Collection: ", collectionName, " Instrument: ", instrument);
    const expiryDates = await fetchExpiryDates(collectionName, instrument);

    return res.status(200).json({ expiryDates });
  } catch (error) {
    console.error("Error fetching expiry dates:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
