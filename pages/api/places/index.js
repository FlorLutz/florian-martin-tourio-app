import dbConnect from "../../../db/models/connect";
import Place from "../../../db/models/Place";

export default async function handler(request, response) {
  await dbConnect();
  if (request.method === "GET") {
    const places = await Place.find();
    if (places) {
      return response.status(200).json(places);
    } else {
      return response.status(400).json({ message: "Bad request" });
    }
  }
  if (request.method === "POST") {
    try {
      const placeData = request.body;
      const place = new Place(placeData);
      await place.save();
      return response.status(201).json({ status: "Place created" });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
