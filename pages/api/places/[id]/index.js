import dbConnect from "../../../../db/models/connect";
import Place from "../../../../db/models/Place";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;
  if (request.method === "GET") {
    const place = await Place.findById(id).populate("comments");
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
  if (request.method === "POST") {
    try {
      const commentData = request.body;
      await Comment.create(commentData);
      // const place = new Place(placeData);
      // console.log(place);
      // await place.create();
      return response.status(201).json({ status: "Comment created" });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
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
