require("dotenv").config();
const { createProject, createTeams, getProjects, getTeamMembers, getSingleAffiliates, updateAffiliates, verifyAffiliate, updateRefreshToken } = require("./affiliateprojects.service");
const jwt = require("jsonwebtoken");

module.exports = {
  createNewProject: (req, res) => {
    var projectDetails = req.body.data.projectdetails[0];
    var teamDetails = req.body.data.projectteamdetails;
    createProject(projectDetails, (err, results) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          error: err,
          message: "DataBase Connection Error",
        });
      } else {
        createTeams(teamDetails, (err, results) => {
          if (err) {
            return res.status(500).json({
              success: 0,
              error: err,
              message: "DataBase Connection Error",
            });
          }
          return res.status(200).json({
            message: "success",
            data: results,
          });
        });
      }
    });
  },
  fetchProjects: (req, res) => {
    getProjects(null, (err, results) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          error: err,
          message: "DataBase Connection Error",
        });
      }
      return res.status(200).json({
        message: "success",
        data: results,
      });
    });
  },
  fetchTeamMembers: (req, res) => {
    var projectid = req.body.projectid;
    getTeamMembers(projectid, (err, results) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          error: err,
          message: "DataBase Connection Error",
        });
      }
      return res.status(200).json({
        message: "success",
        data: results,
      });
    });
  },
  fetchSingleAffiliates: (req, res) => {
    var aff_id = req.body.affiliate_id;
    getSingleAffiliates(aff_id, (err, results) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          error: err,
          message: "DataBase Connection Error",
        });
      }
      return res.status(200).json({
        message: "success",
        data: results,
      });
    });
  },
  UpdateSingleAffiliates: (req, res) => {
    var data = req.body.data;
    updateAffiliates(data, (err, results) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          error: err,
          message: "DataBase Connection Error",
        });
      }
      return res.status(200).json({
        message: "success",
        data: results,
      });
    });
  },
  verifyAffiliateByEmail: (req, res) => {
    const body = req.body.user;
    let accessToken = jwt.sign(body, "access", { expiresIn: "1h" });
    let refreshToken = jwt.sign(body, "refresh", { expiresIn: "7d" });
    verifyAffiliate(body, (err, results) => {
      if (err) {
        console.log("Error Login");
      }
      if (!results) {
        return res
          .status(200)
          .json({
            message: "unsuccess",
            accessToken: "USER_NOT_AUTHENTICATED",
            refreshToken: "USER_NOT_AUTHENTICATED",
          });
      }
      let data = {
        token: refreshToken,
        email: body.email,
      };
      updateRefreshToken(data, (tokenerr, tokenresults) => {
        if (tokenerr) {
          return res.status(201).json({
            message: "unsuccess",
            data: "Error updating token.",
          });
        }
        if (!tokenresults) {
          return res.status(201).json({
            message: "unsuccess",
            data: tokenerr,
          });
        }
        if (tokenresults) {
          return res.status(201).json({
            email: results.affemail,
            fullname: results.affname,
            authrole: results.authrole,
            message: "success",
            accessToken,
            refreshToken,
          });
        }
      });
    });
  }
};
