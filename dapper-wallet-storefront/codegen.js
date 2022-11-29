const settings = {
  overwrite: true,
  watch: true,
  schema: {
    [process.env.NEXT_PUBLIC_API_PATH]: {
      headers: {
        "X-Niftory-API-Key": process.env.NEXT_PUBLIC_API_KEY,
        "X-Niftory-Client-Secret": process.env.CLIENT_SECRET,
      },
    },
  },
  documents: ["./src/**/*.(graphql|ts|tsx)"],
  generates: {
    "generated/graphql.ts": {
      presetConfig: {
        typesPath: "./schemas",
      },
      plugins: ["typescript", "typescript-operations", "typescript-urql"],
      config: {
        withHooks: true,
      },
    },
  },
}

module.exports = settings
