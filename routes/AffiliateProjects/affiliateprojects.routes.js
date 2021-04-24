const { createNewProject, fetchProjects, fetchTeamMembers } = require('./affiliateprojects.controller');
const router = require('express').Router();
const e = require('express');

router.post("/project/create", createNewProject);
router.get("/project/read", fetchProjects);
router.post("/project/teammembers/read", fetchTeamMembers);

module.exports = router;