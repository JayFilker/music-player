import antfu from '@antfu/eslint-config'

export default antfu({
    // Type of the project. 'lib' for libraries, the default is 'app'
    type: 'app',

    // Or customize the stylistic rules
    stylistic: {
        indent: 4, // 4, or 'tab'
        quotes: 'single', // or 'double'
    },

    // Disable jsonc and yaml support
    jsonc: false,
    yaml: false,

    // `.eslintignore` is no longer supported in Flat config, use `ignores` instead
    ignores: [
        '**/fixtures',
        // ...globs
    ],

    rules: {
        // Add your own rules here
        'no-console': 'warn',
        'no-debugger': 'warn',
        'unused-imports/no-unused-vars': 'off', // 主要是 [data, setData] = useState() 这种情况里的 setData 未使用
        'no-unmodified-loop-condition': 'off',
        'eslint-comments/no-unlimited-disable': 'off',
    },
})
