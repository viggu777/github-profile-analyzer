const express = require("express");
const router = express.Router();
const {
  analyzeProfile,
  getAllProfiles,
  getProfileByUsername,
  getStats,
  getProfilesByLocation,
  getProfilesByCompany,
  getTopFollowers,
  getProfilesByBio,
  getAnalytics,
} = require("../controllers/githubController");

router.post("/analyze", analyzeProfile);

router.get("/profiles", getAllProfiles);

router.get("/profiles/:username", getProfileByUsername);

router.get("/location/:location", getProfilesByLocation);

router.get("/company/:company", getProfilesByCompany);

router.get("/top-followers", getTopFollowers);

router.get("/bio/:keyword", getProfilesByBio);

router.get("/analytics", getAnalytics);

router.get("/stats", getStats);

module.exports = router;
