var constructeev = angular.module('constructeev', ['ui.router']);

constructeev.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
	
	$urlRouterProvider.otherwise('/home');
    //$urlRouterProvider.when('/home', '/home/signupform');

    $stateProvider
    // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            controller: 'HomeController',
            templateUrl: '/ng-templates/partial_home.html',
        })
        .state('home.error', {
            url: '/error',
            templateUrl: '/ng-templates/home_signup_error.html'
        })
        .state('home.success', {
            url: '/success',
            templateUrl: '/ng-templates/home_signup_success.html'
        })
				.state('channels', {
					url: '/channels',
					templateUrl: '/ng-templates/channel_list.html',
					controller:'ChannelController'
				})
				.state('channeldetail', {
					url: '/channel/:channel_name',
					templateUrl: '/ng-templates/channel_detail.html',
				  controller: 'ChannelController'})
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
            // we'll get to this in a bit 
					url: '/about',
	  			templateUrl: '/ng-templates/home_signup_success.html'
        });
});

constructeev.directive('includeReplace', function() {
    return {
        require: 'ngInclude',
        restrict: 'A',
        /* optional */
        link: function(scope, el, attrs) {
            el.replaceWith(el.children());
        }
    };
});
