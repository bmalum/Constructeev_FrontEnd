constructeev.controller('HomeController', ['$scope', '$http', '$state', function($scope, $http, $state){
	$scope.openChannelFormModal = function(){
					angular.element(ChannelFormModal).modal("show");
	}
	$scope.hideChannelFormModal = function(){
					angular.element(ChannelFormModal).modal("hide");
	}
	$scope.openLearnMoreModal = function(){
					angular.element(LearnMoreModal).modal("show");
	}
	$scope.closeLearnMoreModal = function(){
					angular.element(LearnMoreModal).modal("hide");
	}


}]);
