import kirklin from "@kirklin/eslint-config";

export default kirklin(
  {
    ignores: [
      // eslint ignore globs here
    ],
  },
  {
    rules: {
      "no-console": "off",
      // overrides
    },
  },
);
