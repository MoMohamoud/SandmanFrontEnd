const path = require('path');
const express = require('express');
const webpack = require('webpack');
const config = require('./webpack.config.dev');
const chalk =  require('chalk');

const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const options = {
  port: process.env.PORT || 9000,
  host: process.env.HOST || 'localhost',
}

app.listen(process.env.PORT ||options, function(err) {
  if (err) {
    console.log(err);
    return;
  }

  const server = `${(process.env.NODE_ENV === 'secure' ? 'https://' : 'http://') + options.host}:${options.port}`;

    // Logging initialization
    console.log('--');
    console.log(chalk.green('SandMan Running'));
    console.log(chalk.green(`Server: ${server}`));
    console.log(chalk.green(`Mahamoud Mohamoud, moe.mohamoud@gmail.com`));
    console.log('--');


  console.log(`Listening on ${server}`);
});
