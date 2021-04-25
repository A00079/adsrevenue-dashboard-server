const { createNewProject, fetchProjects, fetchTeamMembers, fetchSingleAffiliates, UpdateSingleAffiliates, verifyAffiliateByEmail } = require('./affiliateprojects.controller');
const router = require('express').Router();
const e = require('express');

router.post('/affiliate/login', verifyAffiliateByEmail);
router.post("/project/create", createNewProject);
router.get("/project/read", fetchProjects);
router.post("/project/singleaffiliate/read", fetchSingleAffiliates);
router.post("/project/singleaffiliate/modify", UpdateSingleAffiliates);
router.post("/project/teammembers/read", fetchTeamMembers);


module.exports = router;