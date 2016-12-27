exports.config = {
	directConnect: true,
	capabilities: {
    'browserName': 'chrome'
  },
	framework: 'jasmine',
  specs: ['**/*e2e-spec.js' ],
	useAllAngular2AppRoots: true,
	baseUrl: 'http://localhost:3000',
	onPrepare: function() { 
		var SpecReporter = require('jasmine-spec-reporter');
    jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: 'all'}));
	},
	jasmineNodeOpts: {
		// extended interval for repl mode debugging; default is 60000
    defaultTimeoutInterval: 600000,
    print: function() {}
  },
};