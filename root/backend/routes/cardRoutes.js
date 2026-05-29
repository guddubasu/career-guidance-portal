// routes/cardRoutes.js

import express from "express";
import cardModel from "../models/cardModel.js";

const Cardrouter = express.Router();

// Get domain by domain_id
Cardrouter.get("/:id", async (req, res) => {
  try {

    const domain = await cardModel.findOne({
      domain_id: req.params.id
    });

    if (!domain) {
      return res.status(404).json({ message: "Domain not found" });
    }

    res.json(domain);

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

export default Cardrouter;