/*
* @Author: 阿布大人
* @Date:   2018-06-23 13:57:32
* @Last Modified by:   阿布大人
* @Last Modified time: 2018-06-23 19:59:25
*/
var webpack           =require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
//环境变量配置
var WEBPACK_ENV=process.env.WEBPACK_ENV || 'dev';
//获取html-webpack-plugin参数的方法。
var getHtmlConfig=function(name) {
	// body...
	return {
    	template :'./src/view/'+name+'.html',
    	filename :'view/'+name+'.html',
    	inject   :true,
    	hash     :true,
    	chunks   :['common',name]
	};
}
//webpack config
const config = {
  entry: {
  	'common':['./src/page/common/index.js'],
  	'index':['./src/page/index/index.js']
  },
  output: {
    filename: 'js/[name].js',
    publicPath:'/dist/',
    path: './dist'
  },
  externals:{
  	'Jquery':'window.jQuery'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader") },
      { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]'}
    ]
  },
  plugins:[
  //打包独立通用模块到js/base.js
    new webpack.optimize.CommonsChunkPlugin({
      name : 'common',//这里的'common'回去找上面入口处引入的common
      filename : 'js/base.js'
    }),
    //把css单独打包到文件里
    new ExtractTextPlugin("css/[name].css"),
    //html模板的处理
    new HtmlWebpackPlugin(getHtmlConfig('index'))
  ]
};
 if('dev'=== WEBPACK_ENV){
  config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
 }
module.exports = config;