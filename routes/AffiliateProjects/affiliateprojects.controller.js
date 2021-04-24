require("dotenv").config();
const { createProject, createTeams, getProjects, getTeamMembers } = require("./affiliateprojects.service");

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
};
