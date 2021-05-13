`use strict`;
const fs = require('fs').promises;
const chalk = require('chalk');
const { ExitCode }  = require('../../constants');
const { getRandomInt } = require(`../../utils`);

const DEFAULT_COUNT = 1;
const MaxCount = {
  VALUE: 1000,
  MESSAGE: `Не больше 1000 публикаций`
};
const FILE_NAME = `mocks.json`;

const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;

const readFileContent = async (path) => {
  try {
    const content = await fs.readFile(path,`utf8`);
    return content.split('\n');
  } catch(err) {
    console.error(chalk.red(err));
    return [];
  }
};

const generateArticles = (count, title, sentences, categories) => (
  Array(count)
    .fill({})
    .map(() => ({
      title: title[getRandomInt(0, title.length - 1)],
      createdDate: new Date().toISOString(),
      announce: sentences.slice(getRandomInt(0, 5), 5),
      fullText: sentences.slice(1, getRandomInt(0, sentences.length - 1)),
      сategory: categories.slice(1, getRandomInt(0, categories.length - 1))
    }))
);

module.exports = {
  name: `--generate`,
  async run(args) {
    const [count] = args;

    if (count > MaxCount.VALUE) {
      return console.log(MaxCount.MESSAGE);
    }

    const sentences = await readFileContent(FILE_SENTENCES_PATH);
    const titles = await readFileContent(FILE_TITLES_PATH);
    const categories = await readFileContent(FILE_CATEGORIES_PATH);

    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const content = JSON.stringify(generateArticles(countOffer, titles, sentences, categories));

    try {
      await fs.writeFile(FILE_NAME, content);

      console.info(chalk.green(`Operation success. File created.`));
      process.exit(ExitCode.SUCCESS);
    } catch(err) {
      console.error(chalk.red(`Can't write data to file...`));
      process.exit(ExitCode.ERROR);
    }
  }
};
