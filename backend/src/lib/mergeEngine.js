const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const TMP_DIR = path.join(__dirname, "../../tmp");

function mergeFiles({ base, pr, curr }) {
  if (!fs.existsSync(TMP_DIR)) {
    fs.mkdirSync(TMP_DIR, { recursive: true });
  }

  const basePath = path.join(TMP_DIR, "base.txt");
  const prPath = path.join(TMP_DIR, "pr.txt");
  const currPath = path.join(TMP_DIR, "curr.txt");

  fs.writeFileSync(basePath, base.join("\n"));
  fs.writeFileSync(prPath, pr.join("\n"));
  fs.writeFileSync(currPath, curr.join("\n"));

  let hasConflict = false;

  try {
    execSync(`git merge-file "${prPath}" "${basePath}" "${currPath}"`);
  } catch (err) {
    hasConflict = true; // exit code 1
  }

  const mergedText = fs.readFileSync(prPath, "utf-8");

  return {
    mergedText,
    hasConflict
  };
}

module.exports = mergeFiles;
