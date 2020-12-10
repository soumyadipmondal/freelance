const merge             = require('webpack-merge');
const common            = require('./webpack.common.js');
const path              = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const SOURCE_ROOT = __dirname + '/src/main/webpack';

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    performance: { hints: 'warning' },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, SOURCE_ROOT + '/static/index.html')
        }),
        new HtmlWebpackPlugin({
            filename: 'aem-header.html',
            template: path.resolve(__dirname, SOURCE_ROOT + '/components/aem-header/aem-header.html'),
            inject: 'head'
        }),
        new HtmlWebpackPlugin({
            filename: 'aem-footer.html',
            template: path.resolve(__dirname, SOURCE_ROOT + '/components/aem-footer/aem-footer.html'),
            inject: 'head'
        }),
        new HtmlWebpackPlugin({
            filename: 'heading.html',
            template: path.resolve(__dirname, SOURCE_ROOT + '/components/heading/heading.html'),
            inject: 'head'
            //chunks: ['headingCompChunk']  //may use for future component specific bundles
        }),
        new HtmlWebpackPlugin({
            filename: 'search.html',
            template: path.resolve(__dirname, SOURCE_ROOT + '/components/search/search.html'),
            inject: 'head'
        }),
        new HtmlWebpackPlugin({
            filename: 'instructionalbanner.html',
            template: path.resolve(__dirname, SOURCE_ROOT + '/components/instructionalbanner/instructionalbanner.html'),
            inject: 'head'
        }),
        new HtmlWebpackPlugin({
            filename: 'drawer.html',
            template: path.resolve(__dirname, SOURCE_ROOT + '/components/drawer/drawer.html'),
            inject: 'head'
        }),
        new HtmlWebpackPlugin({
            filename: 'searchresultcountbar.html',
            template: path.resolve(__dirname, SOURCE_ROOT + '/components/searchresultcountbar/searchresultcountbar.html'),
            inject: 'head'
        }),
        new HtmlWebpackPlugin({
            filename: 'singleresult.html',
            template: path.resolve(__dirname, SOURCE_ROOT + '/components/singleresult/singleresult.html'),
            inject: 'head'
        }),
        new HtmlWebpackPlugin({
            filename: 'searchresultlist.html',
            template: path.resolve(__dirname, SOURCE_ROOT + '/components/searchresultlist/searchresultlist.html'),
            inject: 'head'
        }),
        new HtmlWebpackPlugin({
            filename: 'breadcrumb.html',
            template: path.resolve(__dirname, SOURCE_ROOT + '/components/breadcrumb/breadcrumb.html'),
            inject: 'head'
        }),
        new HtmlWebpackPlugin({
            filename: 'procedureDescriptionCostRange.html',
            template: path.resolve(__dirname, SOURCE_ROOT + '/components/procedureDescriptionCostRange/procedureDescriptionCostRange.html'),
            inject: 'head'
        }),
        new HtmlWebpackPlugin({
            filename: 'informationBox.html',
            template: path.resolve(__dirname, SOURCE_ROOT + '/components/informationBox/informationBox.html'),
            inject: 'head'
        }),
        new HtmlWebpackPlugin({
            filename: 'providerresultcountbar.html',
            template: path.resolve(__dirname, SOURCE_ROOT + '/components/providerresultcountbar/providerresultcountbar.html'),
            inject: 'head'
        }),
        new HtmlWebpackPlugin({
            filename: 'providerResultList.html',
            template: path.resolve(__dirname, SOURCE_ROOT + '/components/providerResultList/providerResultList.html'),
            inject: 'head'
        }),
        new HtmlWebpackPlugin({
            filename: 'procedureProviderDetails.html',
            template: path.resolve(__dirname, SOURCE_ROOT + '/components/procedureProviderDetails/procedureProviderDetails.html'),
            inject: 'head'
        }),
        new HtmlWebpackPlugin({
            filename: 'notification.html',
            template: path.resolve(__dirname, SOURCE_ROOT + '/components/notification/notification.html'),
            inject: 'head'
        }),
        new HtmlWebpackPlugin({
            filename: 'estimatedCostOverview.html',
            template: path.resolve(__dirname, SOURCE_ROOT + '/components/estimatedCostOverview/estimatedCostOverview.html'),
            inject: 'head'
        }),
        new HtmlWebpackPlugin({
            filename: 'downloadPdf.html',
            template: path.resolve(__dirname, SOURCE_ROOT + '/components/downloadPdf/downloadPdf.html'),
            inject: 'head'
        }),
        new HtmlWebpackPlugin({
            filename: 'emailModal.html',
            template: path.resolve(__dirname, SOURCE_ROOT + '/components/emailModal/emailModal.html'),
            inject: 'head'
        }),
        new HtmlWebpackPlugin({
            filename: 'tabs.html',
            template: path.resolve(__dirname, SOURCE_ROOT + '/components/tabs/tabs.html'),
            inject: 'head'
        }),
        new HtmlWebpackPlugin({
            filename: 'costExplanation.html',
            template: path.resolve(__dirname, SOURCE_ROOT + '/components/costExplanation/costExplanation.html'),
            inject: 'head'
        }),
        new HtmlWebpackPlugin({
            filename: 'planUsage.html',
            template: path.resolve(__dirname, SOURCE_ROOT + '/components/planUsage/planUsage.html'),
            inject: 'head'
        }),
        new HtmlWebpackPlugin({
            filename: 'lifetimeMaximum.html',
            template: path.resolve(__dirname, SOURCE_ROOT + '/components/lifetimeMaximum/lifetimeMaximum.html'),
            inject: 'head'
        }),
        new HtmlWebpackPlugin({
            filename: 'newYearTransitionMessage.html',
            template: path.resolve(__dirname, SOURCE_ROOT + '/components/newYearTransitionMessage/newYearTransitionMessage.html'),
            inject: 'head'
        }),
        new HtmlWebpackPlugin({
            filename: 'errorMessage.html',
            template: path.resolve(__dirname, SOURCE_ROOT + '/components/errorMessage/errorMessage.html'),
            inject: 'head'
        }),
        new HtmlWebpackPlugin({
            filename: 'sessionTimeout.html',
            template: path.resolve(__dirname, SOURCE_ROOT + '/components/sessionTimeout/sessionTimeout.html'),
            inject: 'head'
        }),
        new HtmlWebpackPlugin({
            filename: 'modals.html',
            template: path.resolve(__dirname, SOURCE_ROOT + '/components/modals/modals.html'),
            inject: 'head'
        }),
        new HtmlWebpackPlugin({
            filename: 'episodicAccordian.html',
            template: path.resolve(__dirname, SOURCE_ROOT + '/components/episodicAccordian/episodicAccordian.html'),
            inject: 'head'
        })
    ],
    devServer: {
        inline: true,
        contentBase: path.join(__dirname, './dist/clientlib-site'),
        proxy: [{
            context: ['/content', '/etc.clientlibs'],
            target: 'http://localhost:4502',
        }]
    }
});