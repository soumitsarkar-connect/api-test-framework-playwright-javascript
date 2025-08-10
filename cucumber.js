module.exports = {
  default: {
    format: [
      'html:reports/cucumber-report.html',
      'json:reports/cucumber-report.json',
    ],
    parallel: 1,
    order: 'defined',
    paths: [
      'features/**/*.feature',
    ],
    require: [
      'steps/**/*.js',
      'support/**/*.js',
    ]
  },
};



