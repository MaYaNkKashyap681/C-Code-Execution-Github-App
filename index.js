/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Probot} app
 */

const axios = require('axios')
const fs = require('fs')
const { getExecutableCode } = require('./utils/codeExtractor.js')
const { codeExecutorScript } = require('./codeOutput.js')

module.exports = (app) => {
  app.log.info("Yay, the app was loaded!");
  app.on('pull_request_review.submitted', async (context) => {
    try {

      // console.log('Hello');
      const installationId = context.payload.installation.id;
      const octokit = await app.auth(installationId);
      const data_obj = context.payload;
      const userName = data_obj.pull_request.user.login
      const comments_link_uri = data_obj.pull_request._links.review_comments.href
      // console.log(comments_link_uri);
      const comments_data = await axios.get(comments_link_uri);
      const commentsList = comments_data.data
      // console.log(commentsList.length)
      const lastComment = commentsList[commentsList.length - 1];
      // console.log(lastComment);

      if(lastComment.body != '/execute') {
        console.log("Not a Valid Query!");
        return;}

      const actual_code = getExecutableCode(lastComment.diff_hunk)
      // console.log(actual_code);

      fs.writeFile('cpp_code.cpp', actual_code, () => {
        console.log("Data is added in the File");
      })
      const given_code_output = await codeExecutorScript(actual_code);
      // console.log(given_code_output);

      await octokit.issues.createComment({
        owner: context.payload.repository.owner.login,
        repo: context.payload.repository.name,
        issue_number: context.payload.pull_request.number,
        body: `Code Output:\n\`\`\`\n${given_code_output}\n\`\`\``,
      });
    } catch (error) {
      console.error('Error:', error.message);
    }
  });
};
