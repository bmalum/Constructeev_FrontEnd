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

	$scope.markAsRead = function (feedback_with_property){
		requestData = JSON.stringify({
            "feedback_property": {
            	"unread":!feedback_with_property.unread,
            	"channel_id": feedback_with_property.channel_id,
            }
        });

		feedback_with_property.unread = !feedback_with_property.unread
		console.log(feedback_with_property.id)
		adminFactory.updateFeedbackProperty(requestData, feedback_with_property.id)
	 	console.log(requestData)
	}

	$scope.fav = function (feedback_with_property){
		requestData = JSON.stringify({
            "feedback_property": {
            	"favorite": !feedback_with_property.favorite,
            	"channel_id": feedback_with_property.channel_id,
            }
        });
        feedback_with_property.favorite = !feedback_with_property.favorite

		console.log(feedback_with_property.id)
		adminFactory.fav(requestData, feedback_with_property.id)
	 	console.log(requestData)
	}

	function getFeedbackChilds(channel_id, feedback_id){
	 adminFactory.getChildren(channel_id, feedback_id)
			.success(function (feedback_childs) {
				$scope.feedbackchildren = feedback_childs.data;
				console.log($scope.feedbackchildren);
			}).error(function (error) {
				console.log("Error");
			})
		}
	

	$scope.openAnswer = function(feedback_id, channel_id){
		//angular.element(AnswerModal).remove()
		angular.element(AnswerModal).modal('setting', { detachable:false, allowMultiple:false }).modal('show')
		angular.element(AnswerModal).modal("refresh")
		setTimeout(function () {
      angular.element(AnswerModal).modal("refresh");
    }, 100);
	/*	$scope.tmp_feedback_id = feedback_id
		channelFactory.getFeedback(feedback_id, $scope.channel.id).success(function (feedback){
			console.log(feedback.data)
				$scope.tmp_feedback = feedback.data;
				console.log($scope.tmp_feedback)
			})
			.error(function (feedback){
				console.log(Error);
			})*/
		getFeedbackChilds(channel_id, feedback_id);

	}

	 }
]);