var app = angular.module('MyApp', ['ui.router']);
app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
    $stateProvider
        .state('/', {
            url: '/',
            templateUrl: 'index.html'
        })
        .state('home', {
            url: '/home',
            templateUrl: 'pages/dashboard.html'
        });
});

var server = 'https://www.exact.co.id/SE/';
//var server = 'http://192.168.0.113:8084/SE/';
function Post(service, vdata, result) {
    var httpServer = server + service;
    setTimeout(function () {
        $.post(httpServer, vdata, function (data, status) {
            result(data);
        }).success('Done').error(function () {
        });
    }, 3000);
};