import dbConnect from "../../../../db/models/connect";
import Place from "../../../../db/models/Place";
import { db_comments } from "../../../../lib/db_comments";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;
  if (request.method === "GET") {
    const place = await Place.findById(id);
    if (!place) {
      response.status(404).json({ status: "Place not found" });
    } else {
      response.status(200).json(place);
    }
  }
  if (request.method === "PATCH") {
    const place = await Place.findByIdAndUpdate(id, {
      $set: request.body,
    });
    response.status(200).json(place);
  }
  if (request.method === "DELETE") {
    const place = await Place.findByIdAndDelete(id);
    response.status(200).json(`${place} successfully deleted`);
  }
}

// export default function handler(request, response) {
//   const place = db_places.find((place) => place._id.$oid === id);
//   const comment = place?.comments;
//   const allCommentIds = comment?.map((comment) => comment.$oid) || [];
//   const comments = db_comments.filter((comment) =>
//     allCommentIds.includes(comment._id.$oid)
//   );

//   if (!place) {
//     return response.status(404).json({ status: "Not found" });
//   }

//   response.status(200).json({ place: place, comments: comments });
// }
