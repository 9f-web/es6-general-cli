const path = require('path');
const ora = require('ora');
const download = require('download-git-repo');
const home = require('user-home');
const fs = require('fs-extra');
const builder = require('./Builder');

function isLocalPath(templatePath) {
  return /^[./]|(^[a-zA-Z]:)/.test(templatePath)
}

function hasSlash(s) {
  return s.indexOf('/') !== -1;
}

module.exports = (argv) => {
  let { template } = argv;

  // console.error('template', template);

  if (isLocalPath(template)) {
    if (fs.pathExistsSync(template)) {
      new builder(template, argv);
    }
  } else {
    template = hasSlash(template) ? template : `9f-web/${template}`;

    const localRepoPath = path.join(home, '.9f-web-templates', template.replace(/\//g, '-'));

    // console.log(localRepoPath);
    const spinner = ora('downloading template');
    spinner.start();

    const repoRoot = path.resolve(__dirname, localRepoPath);
    fs.removeSync(repoRoot);

    download(template, localRepoPath, function (err) {
      spinner.stop();
      if (err) console.log(`Failed to download repo ${template} : ${err.message.trim()}`);
      new builder(localRepoPath, argv);
    });
  }
};
