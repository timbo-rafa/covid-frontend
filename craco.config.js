const path = require('path');
module.exports = {
  webpack: {
    alias: {
      "@geo-utils": path.resolve(__dirname, "src/utils/geo"),
      "@type-utils": path.resolve(__dirname, "src/utils/type"),
      "@covid-api": path.resolve(__dirname, "src/covid-api"),
      "@generated-graphql-hooks": path.resolve("./src/generated/graphql-hooks")
    },
  },
};