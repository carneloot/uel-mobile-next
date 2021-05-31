const path = require('path')

module.exports = {
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    future: {
        webpack5: true,
    },
    i18n: {
        locales: ['pt-BR'],
        defaultLocale: 'pt-BR',
    }
}
