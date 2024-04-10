import mongoose, { mongo } from "mongoose";
import "./Comment";

const { Schema } = mongoose;
const placeSchema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: String, required: true },
  mapURL: { type: String, required: true },
  description: { type: String, default: "" },
  comments: { type: [Schema.Types.ObjectId], ref: "Comment" },
});
const Place = mongoose.models.Place || mongoose.model("Place", placeSchema);
export default Place;
