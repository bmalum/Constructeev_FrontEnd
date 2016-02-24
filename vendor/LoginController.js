constructeev.controller('LoginController', ['$scope', '$state', 'loginFactory',
	 function($scope, $state, loginFactory){

	 $scope.loginAdmin = function (){
	 	console.log($scope.nav.sec_hash)
	 	var myObj = {};
		myObj["sec_hash"] = $scope.nav.sec_hash;
		var json = JSON.stringify(myObj);
		console.log(json);
		loginFactory.login(json).success(function (session){
			console.log(session.id)
			if (session.valid) {
				$state.go('admin', {channel_id: session.id});
			    angular.element(loginModal).modal("hide")
			} else {
				$state.go('home', {channel_id: session.id});
				angular.element(loginModal).modal("hide")
			}
			})
			.error(function (session){
				console.log(Error);
			})
		//getFeedbackChilds(channel_id, feedback_id, index);
	}

	 }
]);