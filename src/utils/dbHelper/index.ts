import mongoose, { Model } from "mongoose";
import {
  OptionData,
  IndexData,
  StockData,
} from "../../utils/csvHelper/dataInterface";
import { createOptionCollection } from "../csvHelper/optionModel";
import { createCollection } from "../csvHelper/indiceModel";

type OptionDataModel = mongoose.Model<OptionData & Document>;

// Function to get expiries in the database
export async function fetchExpiryDates(
  collectionName: string,
  instrument: string
): Promise<string[]> {
  try {
    // Get the model for the specified collection
    const OptionDataCollection: OptionDataModel =
      createOptionCollection(collectionName);

    // Query the collection to find documents with the specified instrument
    const documents: (OptionData & Document)[] =
      await OptionDataCollection.find({ INSTRUMENT: instrument }).exec();

    // Extract expiry dates from the documents
    const expiryDates: string[] = documents.map(
      (doc: OptionData & Document) => doc.EXPIRY_DT
    );

    return expiryDates;
  } catch (error) {
    // Handle errors
    console.error("Error fetching expiry dates:", error);
    return [];
  }
}

// Function to get all the matching expriy docs
export async function getMatchingDocumentsOptions(
  selectedDates: string[],
  instrument: string,
  collectionName: string
): Promise<(OptionData & Document)[]> {
  try {
    console.log("Collection name:", collectionName);
    console.log("Insrument:", instrument);
    console.log("selectedDates:", selectedDates);
    // Assuming createOptionCollection dynamically creates the model based on collectionName
    const OptionDataCollection = mongoose.model(collectionName);

    // Construct an array of query conditions for each selected date
    const dateConditions = selectedDates.map((date) => ({ EXPIRY_DT: date }));

    // Query the collection to find documents matching the instrument and containing each selected date in the EXPIRY_DT field
    const documents: (OptionData & Document)[] =
      await OptionDataCollection.find({
        INSTRUMENT: instrument,
        $and: dateConditions,
      }).exec();

    return documents;
  } catch (error) {
    // Handle errors
    console.error("Error fetching matching documents:", error);
    return [];
  }
}

// Function to get all the matching docs based on single expiry
export async function getMatchingExpiryOptions(
  expiry: string,
  optionType: string,
  instrument: string,
  collectionName: string
): Promise<(OptionData & Document)[]> {
  try {
    console.log("Collection name:", collectionName);
    console.log("Insrument:", instrument);
    console.log("Expiry:", expiry);
    console.log("OptionType:", optionType);
    // Assuming createOptionCollection dynamically creates the model based on collectionName
    const OptionDataCollection = mongoose.model(collectionName);

    // Query the collection to find documents matching the instrument and containing each selected date in the EXPIRY_DT field
    const documents: (OptionData & Document)[] =
      await OptionDataCollection.find({
        INSTRUMENT: instrument,
        EXPIRY_DT: expiry,
        OPTION_TYP: optionType,
      }).exec();

    return documents;
  } catch (error) {
    // Handle errors
    console.error("Error fetching matching documents:", error);
    return [];
  }
}

// Create a function to query documents for a specific date in a collection
export async function queryCollectionForDate(
  collectionName: string,
  date: string
): Promise<IndexData[]> {
  const CollectionModel = createCollection(collectionName);
  const documents = await CollectionModel.find({ "Index Date": date });
  return documents;
}

// Main function to check for documents in each collection based on provided dates
export async function checkIndicesForDates(
  collectionNames: string[],
  dates: string[]
): Promise<{ [key: string]: IndexData[] }> {
  const results: { [key: string]: IndexData[] } = {};

  for (const collectionName of collectionNames) {
    const collectionResults: IndexData[] = [];
    for (const date of dates) {
      const documents = await queryCollectionForDate(collectionName, date);
      if (documents.length > 0) {
        collectionResults.push(...documents);
      }
    }
    results[collectionName] = collectionResults;
  }

  return results;
}

export async function getMatchingDocumentsStocks() {}
