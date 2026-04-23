const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Gatepass Working 🚀");
});

module.exports = router;
const PDFDocument = require("pdfkit");
const GatePass = require("../models/GatePass");

// PRINT GATEPASS PDF
router.get("/print/:id", async (req, res) => {
  try {
    const gp = await GatePass.findById(req.params.id);

    if (!gp) {
      return res.status(404).json({ message: "Not found" });
    }

    const doc = new PDFDocument();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "inline; filename=gatepass.pdf");

    doc.pipe(res);

    doc.fontSize(20).text("GATE PASS", { align: "center" });
    doc.moveDown();

    doc.fontSize(12).text(`GP No: ${gp.gpNo}`);
    doc.text(`Vehicle No: ${gp.vehicleNo}`);
    doc.text(`Driver Name: ${gp.driverName}`);
    doc.text(`Purpose: ${gp.purpose}`);
    doc.text(`Out Time: ${gp.outTime}`);

    doc.end();

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
<a href="/api/gatepass/print/{{_id}}" target="_blank">
  🖨 Print
</a>