import { IndexData } from "@/utils/csvHelper/dataInterface";
import { checkIndicesForDates } from "@/utils/dbHelper";
import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "../api/mongoose";

// Define types
interface ApiResponse {
  [key: string]: IndexData[];
}

// API route handler
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse | { error: string }>
) {
  const { collectionNames, dates } = req.body; // Assuming dates are sent in request body
  try {
    await connectDB();
    const results: ApiResponse = await checkIndicesForDates(
      collectionNames,
      dates
    );

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}
