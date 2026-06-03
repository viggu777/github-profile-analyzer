const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
dotenv.config();

const app = express();

app.use(express.json());
app.use(morgan("dev"));

const githubRoutes = require("./routes/githubRoutes");

app.use("/api/github", githubRoutes);

app.get("/", (req, res) => {
  res.send("GitHub Profile Analyzer API");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
