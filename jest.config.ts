module.exports = {
  roots: ["<rootDir>/src"],
  snapshotSerializers: ["enzyme-to-json/serializer"],
  verbose: true,
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest"
  },
  transformIgnorePatterns: [
    // Change MODULE_NAME_HERE to your module that isn't being compiled
    "/node_modules/"
  ],
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node",
    "ReactFifteenAdapter.js"
  ],
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.js",
    "\\.(scss|sass|css)$": "identity-obj-proxy"
  }
};
