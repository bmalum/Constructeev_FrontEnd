constructeev.controller('AdminController', ['$scope', '$state', 'adminFactory',
	function($scope, $state, adminFactory){

	adminFactory.getChannel($state.params.channel_id)
			.success(function (channel) {
				$scope.channel = channel.data;
				console.log($scope.channel);
			}).error(function (error) {
				console.log("Error");
			})

	adminFactory.getFeedbacks($state.params.channel_id)
			.success(function (feedback) {
				$scope.feedbacks = feedback.data;
				console.log($scope.feedbacks);
			}).error(function (error) {
				console.log("Error");
			})

	$scope.xy = function (){
	 	
	}

	 }
]);