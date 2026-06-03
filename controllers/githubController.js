const db = require("../config/db");
const { getGithubProfile } = require("../services/githubService");

const analyzeProfile = async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({
        message: "Username is required",
      });
    }

    const profile = await getGithubProfile(username);

    const {
      login,
      name,
      followers,
      following,
      public_repos,
      public_gists,
      html_url,
      created_at,
      company,
      location,
      blog,
      bio,
      twitter_username,
      email,
    } = profile;

    const [existingProfile] = await db.execute(
      "SELECT * FROM github_profiles WHERE username = ?",
      [login],
    );

    if (existingProfile.length > 0) {
      return res.status(409).json({
        message: "Profile already analyzed",
      });
    }
    const formattedDate = created_at.replace("T", " ").replace("Z", "");
    const accountAge = Math.floor(
      (Date.now() - new Date(created_at)) / (1000 * 60 * 60 * 24 * 365.25),
    );

    const popularityScore = followers * 2 + public_repos;

    const followerFollowingRatio =
      following === 0 ? followers : Number((followers / following).toFixed(2));

    let score = 0;

    if (name) score++;
    if (company) score++;
    if (location) score++;
    if (blog) score++;
    if (bio) score++;
    if (twitter_username) score++;

    const profileCompleteness = Math.round((score / 6) * 100);

    let skillCategory = "Other";

    const bioText = (bio || "").toLowerCase();

    if (
      bioText.includes("mern") ||
      bioText.includes("mongodb") ||
      bioText.includes("express") ||
      bioText.includes("react") ||
      bioText.includes("node")
    ) {
      skillCategory = "MERN";
    } else if (bioText.includes("python")) {
      skillCategory = "Python";
    } else if (bioText.includes("java")) {
      skillCategory = "Java";
    } else if (
      bioText.includes("ai") ||
      bioText.includes("machine learning") ||
      bioText.includes("ml")
    ) {
      skillCategory = "AI/ML";
    } else if (bioText.includes("frontend")) {
      skillCategory = "Frontend";
    } else if (bioText.includes("backend")) {
      skillCategory = "Backend";
    }

    await db.execute(
      `INSERT INTO github_profiles
  (
    username,
    name,
    followers,
    following,
    public_repos,
    public_gists,
    profile_url,
    account_created_at,
    account_age,
    popularity_score,
    company,
    location,
    blog,
    bio,
    twitter_username,
    email,
    profile_completeness,
    skill_category,
    follower_following_ratio
  )
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        login,
        name,
        followers,
        following,
        public_repos,
        public_gists,
        html_url,
        formattedDate,
        accountAge,
        popularityScore,
        company,
        location,
        blog,
        bio,
        twitter_username,
        email,
        profileCompleteness,
        skillCategory,
        followerFollowingRatio,
      ],
    );

    res.status(201).json({
      username: login,
      followers,
      publicRepos: public_repos,
      accountAge,
      popularityScore,
      profileCompleteness,
      skillCategory,
      followerFollowingRatio,
    });
  } catch (error) {
    console.error(error);
    if (error.response?.status === 404) {
      return res.status(404).json({
        message: "GitHub user not found",
      });
    }

    res.status(500).json({
      message: error.message,
    });
  }
};

const getAllProfiles = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const offset = (page - 1) * limit;

    const allowedSortFields = [
      "followers",
      "public_repos",
      "popularity_score",
      "profile_completeness",
      "account_age",
    ];

    const sort = allowedSortFields.includes(req.query.sort)
      ? req.query.sort
      : "followers";

    const [profiles] = await db.query(
      `SELECT * FROM github_profiles
       ORDER BY ${sort} DESC
       LIMIT ${limit}
       OFFSET ${offset}`,
    );

    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getProfileByUsername = async (req, res) => {
  try {
    const { username } = req.params;

    const [profiles] = await db.execute(
      "SELECT * FROM github_profiles WHERE username = ?",
      [username],
    );

    if (profiles.length === 0) {
      return res.status(404).json({
        message: "Profile not found",
      });
    }

    res.status(200).json(profiles[0]);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getProfilesByLocation = async (req, res) => {
  try {
    const { location } = req.params;

    const [profiles] = await db.execute(
      "SELECT * FROM github_profiles WHERE location LIKE ?",
      [`%${location}%`],
    );

    res.json(profiles);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getProfilesByCompany = async (req, res) => {
  try {
    const { company } = req.params;

    const [profiles] = await db.execute(
      "SELECT * FROM github_profiles WHERE company LIKE ?",
      [`%${company}%`],
    );

    res.json(profiles);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getTopFollowers = async (req, res) => {
  try {
    const [profiles] = await db.execute(
      `SELECT *
       FROM github_profiles
       ORDER BY followers DESC
       LIMIT 10`,
    );

    res.json(profiles);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getProfilesByBio = async (req, res) => {
  try {
    const { keyword } = req.params;

    const [profiles] = await db.execute(
      "SELECT * FROM github_profiles WHERE bio LIKE ?",
      [`%${keyword}%`],
    );

    res.json(profiles);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAnalytics = async (req, res) => {
  try {
    const [locationStats] = await db.query(`
      SELECT location, COUNT(*) AS count
      FROM github_profiles
      WHERE location IS NOT NULL
      GROUP BY location
      ORDER BY count DESC
      LIMIT 10
    `);

    const [companyStats] = await db.query(`
      SELECT company, COUNT(*) AS count
      FROM github_profiles
      WHERE company IS NOT NULL
      GROUP BY company
      ORDER BY count DESC
      LIMIT 10
    `);

    const [skillStats] = await db.query(`
      SELECT skill_category, COUNT(*) AS count
      FROM github_profiles
      GROUP BY skill_category
      ORDER BY count DESC
    `);

    res.json({
      locations: locationStats,
      companies: companyStats,
      skills: skillStats,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getStats = async (req, res) => {
  try {
    const [basicStats] = await db.query(`
      SELECT
        COUNT(*) AS totalProfiles,
        AVG(followers) AS averageFollowers,
        MAX(followers) AS highestFollowers,
        AVG(public_repos) AS averageRepos,
        AVG(profile_completeness) AS averageCompleteness
      FROM github_profiles
    `);

    const [mostPopular] = await db.query(`
      SELECT username, popularity_score
      FROM github_profiles
      ORDER BY popularity_score DESC
      LIMIT 1
    `);

    const [mostComplete] = await db.query(`
      SELECT username, profile_completeness
      FROM github_profiles
      ORDER BY profile_completeness DESC
      LIMIT 1
    `);

    const [topLocation] = await db.query(`
      SELECT location, COUNT(*) AS count
      FROM github_profiles
      WHERE location IS NOT NULL
      GROUP BY location
      ORDER BY count DESC
      LIMIT 1
    `);

    const [topCompany] = await db.query(`
      SELECT company, COUNT(*) AS count
      FROM github_profiles
      WHERE company IS NOT NULL
      GROUP BY company
      ORDER BY count DESC
      LIMIT 1
    `);

    const [skillDistribution] = await db.query(`
      SELECT skill_category, COUNT(*) AS count
      FROM github_profiles
      WHERE skill_category !="Other"
      GROUP BY skill_category
      ORDER BY count DESC
    `);

    const [averageRatio] = await db.query(`
      SELECT AVG(follower_following_ratio)
      AS averageRatio
      FROM github_profiles
    `);

    res.status(200).json({
      ...basicStats[0],

      mostPopularProfile: mostPopular[0] || null,

      mostCompleteProfile: mostComplete[0] || null,

      topLocation: topLocation[0] || null,

      topCompany: topCompany[0] || null,

      averageFollowerFollowingRatio: averageRatio[0]?.averageRatio || 0,

      skillDistribution,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  analyzeProfile,
  getAllProfiles,
  getProfileByUsername,
  getStats,
  getProfilesByLocation,
  getProfilesByCompany,
  getTopFollowers,
  getProfilesByBio,
  getAnalytics,
};
