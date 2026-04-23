const express = require("express");
const router = express.Router();
const FuelIndent = require("../models/FuelIndent");

// CREATE FUEL INDENT
router.post("/create", async (req, res) => {
  try {
    const fuel = new FuelIndent(req.body);
    await fuel.save();

    res.json({
      message: "Fuel saved successfully",
      data: fuel
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET ALL FUEL RECORDS
router.get("/all", async (req, res) => {
  try {
    const data = await FuelIndent.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
const PDFDocument = require("pdfkit");

// PRINT FUEL INDENT PDF
router.get("/print/:id", async (req, res) => {
  try {
    const fuel = await FuelIndent.findById(req.params.id);

    if (!fuel) {
      return res.status(404).json({ message: "Not found" });
    }

    const doc = new PDFDocument();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "inline; filename=fuel-indent.pdf");

    doc.pipe(res);

    doc.fontSize(20).text("FUEL INDENT", { align: "center" });
    doc.moveDown();

    doc.fontSize(12).text(`FI No: ${fuel.fiNo}`);
    doc.text(`Vehicle No: ${fuel.vehicleNo}`);
    doc.text(`Model: ${fuel.model}`);
    doc.text(`KM: ${fuel.km}`);
    doc.text(`Fuel Type: ${fuel.fuelType}`);
    doc.text(`Company: ${fuel.companyName}`);
    doc.text(`Date: ${fuel.date}`);

    doc.end();

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});