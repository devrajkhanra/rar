import { getMatchingExpiryOptions } from "@/utils/dbHelper";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { expiry, optionType, instrument, collectionName } = req.query;
  console.log(req.query);
  if (!expiry || !optionType || !instrument || !collectionName) {
    return res.status(400).json({ message: "Missing parameters" });
  }

  try {
    const matchingOptions = await getMatchingExpiryOptions(
      expiry as string,
      optionType as string,
      instrument as string,
      collectionName as string
    );
    console.log(matchingOptions);
    return res.status(200).json(matchingOptions);
  } catch (error) {
    console.error("Error in API handler:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
