import dbConnect from "../../../db/models/connect";
import Comment from "../../../db/models/Comment";
import Place from "../../../db/models/Place";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "POST") {
    try {
      const commentData = request.body;
      const comment = await Comment.create(commentData);

      await Place.findByIdAndUpdate(request.body.placeId, {
        $push: { comments: comment._id },
      });
      return response.status(201).json({ status: "Comment created" });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
