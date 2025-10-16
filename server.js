const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Lokasi penyimpanan file JSON
const DATA_PATH = path.join(__dirname, "data", "datasets.json");

// Pastikan folder data ada
if (!fs.existsSync(path.dirname(DATA_PATH))) {
  fs.mkdirSync(path.dirname(DATA_PATH), { recursive: true });
}

// Jika file belum ada, buat file kosong
if (!fs.existsSync(DATA_PATH)) {
  fs.writeFileSync(DATA_PATH, JSON.stringify([]));
}

// Fungsi bantu untuk baca & tulis file JSON
const readData = () => JSON.parse(fs.readFileSync(DATA_PATH));
const writeData = (data) =>
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));

// --------------------- ROUTES ---------------------

// GET: Ambil semua dataset
app.get("/api/datasets", (req, res) => {
  const data = readData();
  res.json(data);
});

// POST: Tambah dataset baru
app.post("/api/datasets", (req, res) => {
  const data = readData();
  const newDataset = {
    id: Date.now(),
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    source: req.body.source,
    year: req.body.year,
  };
  data.push(newDataset);
  writeData(data);
  res.status(201).json(newDataset);
});

// PUT: Update dataset berdasarkan ID
app.put("/api/datasets/:id", (req, res) => {
  const id = parseInt(req.params.id);
  let data = readData();

  const index = data.findIndex((d) => d.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Dataset tidak ditemukan" });
  }

  data[index] = {
    ...data[index],
    ...req.body, // ambil field yang dikirim dari frontend
  };

  writeData(data);
  res.json({ message: "Dataset berhasil diperbarui", dataset: data[index] });
});

// DELETE: Hapus dataset berdasarkan ID
app.delete("/api/datasets/:id", (req, res) => {
  const id = parseInt(req.params.id);
  let data = readData();

  const index = data.findIndex((d) => d.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Dataset tidak ditemukan" });
  }

  data.splice(index, 1);
  writeData(data);
  res.json({ message: "Dataset berhasil dihapus", id });
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`✅ Server berjalan di http://localhost:${PORT}`);
});
