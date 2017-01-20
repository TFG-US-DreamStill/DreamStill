exports.config = {  
    seleniumAddress: 'http://localhost:4444/wd/hub',  
    specs: ['*.spec.js'],  
    baseURL: 'http://localhost:3000/',  
    framework: 'jasmine',  
};