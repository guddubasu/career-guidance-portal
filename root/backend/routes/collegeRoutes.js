import express from "express";
import College from "../models/College.js";

const router = express.Router();


// SEARCH COLLEGES API
// search colleges
router.get("/search", async (req, res) => {

  try {

    const { name, state, type } = req.query;

    let filter = {};

    // name optional
    if (name && name.trim() !== "") {

      filter.name = {
        $regex: name,
        $options: "i",
      };

    }

    // state filter
    if (state && state.trim() !== "") {

      filter.state = state;

    }

    // type filter
    if (type && type.trim() !== "") {

      filter.type = type;

    }

    const colleges = await College.find(filter);

    res.json(colleges);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }

});
export default router;