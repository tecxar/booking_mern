import express from "express";
import {
  addPost,
  getPosts,
  getDescription,
  getHotels,
  allHotelDetails,
} from "../controllers/post.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", addPost);
router.get("/city", getHotels);
router.get("/allHotels", allHotelDetails);
router.get("/description/:id", getDescription);

export default router;
