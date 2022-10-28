import fs from "fs";
import rl from "readline-sync";

const folderToRead =
  process.argv[2] ||
  rl.question("Please provide a path to your subtitle folder...\n");

if (!fs.existsSync(folderToRead)) {
  console.log("Folder could not be found !!!");
} else {
  const folderContents = fs.readdirSync(folderToRead);
  let allContent = "";
  for (let i = 0; i < folderContents.length; i++) {
    allContent += fs.readFileSync(folderToRead + "/" + folderContents[i]);
  }
  allContent = allContent
    .replace(/[^a-z]/gi, " ")
    .replace(/font|color/gi, " ")
    .replace(/ +/g, " ")
    .toLowerCase()
    .split(" ")
    .filter(function (word) {
      return word.length >= 4;
    });

  const wordsWithOccurrence = allContent.reduce(function (obj, word) {
    obj[word] = obj[word] + 1 || 1;
    return obj;
  }, {});

  const uniqueWords = Object.keys(wordsWithOccurrence);

  uniqueWords.sort(function (wordA, wordB) {
    return wordsWithOccurrence[wordB] - wordsWithOccurrence[wordA];
  });

  console.log(uniqueWords);
}
