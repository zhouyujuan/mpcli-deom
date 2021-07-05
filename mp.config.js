module.exports = {
    // dev&prod环境的通用配置
    // entry默认为src目录，output默认为dist目录
    // entry: 'src',
    // putput: 'dist',
    alias: {
        'service': 'src/services',
        'utils': 'src/utils',
        // 不要用 @，
        '~': 'src',
    },
    plugins: [
        [
            'gulp-less',
            {
                match: 'less'
            }
        ],
        [
            'gulp-rename',
            {
                match: 'css',
                options: {
                    extname: '.wxss'
                }
            }
        ]
    ],

    // dev环境的配置
    development: {
        plugins: []
    },
    // prod环境的配置
    production: {
        plugins: []
    }
};
