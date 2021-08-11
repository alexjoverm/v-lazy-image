module.exports = {
  moduleFileExtensions: ["js", "json", "vue"],
  transform: {
    "\\.js$": ["babel-jest", { cwd: __dirname }],
    "^.+\\.vue$": [
      "vue-jest",
      {
        cwd: __dirname,
      },
    ],
  },
};
