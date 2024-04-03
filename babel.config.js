module.exports = function (api) {
    api.cache(true);
    return {
        presets: [
            ["babel-preset-expo", { jsxImportSource: "nativewind" }],
            "nativewind/babel",
        ],
        plugins: [
            [
                "module-resolver",
                {
                    alias: {
                        // This needs to be mirrored in tsconfig.json
                        "@assets": "./src/assets",
                        "@styles": "./src/styles",
                        "@typings": "./src/typings",
                        "@components": "./src/components",
                        "@hooks": "./src/hooks",
                        "@services": "./src/services",
                    },
                },
            ],
        ],
    };
};
