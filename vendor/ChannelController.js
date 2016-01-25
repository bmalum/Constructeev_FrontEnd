constructeev.controller('ChannelController', ['$scope', '$state', 'channelFactory',
	 function($scope, $state, channelFactory){
	
	console.log($state.params);

	if ($state.current.name == "channeldetail"){
		getChannel($state.params.channel_name);
		getFeedbacks($state.params.channel_name);
		disableLikeButton($state.params.channel_name)
		console.log("I'm in Detail View");
	} else if ($state.current.name == "channels") {
		console.log("I'm in Index Mode")
		getChannelList();
	}


	function disableLikeButton(channel_id){
		console.log('Function disabke Like')
		if(localStorage.getItem('channel'+channel_id)){
			angular.element(channel_likebutton).addClass("disabled")
		}
	}

	$scope.openAnswers = function (channel_id, feedback_id, index){
		console.log(index)
		$scope.feedbacks[index].openAnswers = "false"
		getFeedbackChilds(channel_id, feedback_id, index);
	}

	$scope.openFeedbackModal = function(){
		angular.element(FeedbackModal).modal("show");
	}
	$scope.closeFeedbackModal = function(){
		angular.element(FeedbackModal).modal("hide");
	}
	$scope.createFeedback = function(){
		console.log($scope.channel.id);
		createFeedback($scope.feedback,$scope.channel.id);
		$scope.feedbacks.unshift($scope.feedback);
		$scope.channel.feedback_counter++
	}
	$scope.createChannel = function(){
		console.log($scope.channelModel);
		createChannel($scope.ChannelModel)
		angular.element(ChannelFormModal).modal("hide");
	}
	$scope.upvoteFeedback = function(channel_id, feedback_id, index){
		channelFactory.upvoteFeedback(channel_id, feedback_id);
		$scope.feedbacks[index].happiness++
		localStorage.setItem('feedback'+feedback_id, true);
		//TODO - disable Feedback Like Button
		//angular.element(channel_likebutton).addClass("disabled")
	}
	$scope.upvoteChannel = function(channel_id){
		channelFactory.upvoteChannel(channel_id);
		$scope.channel.likes++
		localStorage.setItem('channel'+channel_id, true);
		angular.element(channel_likebutton).addClass("disabled")
	}
	$scope.openAnswer = function(feedback_id){
		angular.element(AnswerModal).modal("show")
		$scope.tmp_feedback_id = feedback_id
	}
	$scope.sendAnswer = function(){
		console.log($scope.channel.id);
		console.log($scope.tmp_feedback_id);
		sendAnswer($scope.feedback,$scope.channel.id, $scope.tmp_feedback_id);
		//$scope.feedbacks.unshift($scope.feedback);
	}

	function createChannel(channel){
	 	requestData = JSON.stringify({
            "channel": channel
        });
		console.log(requestData)
		channelFactory.createChannel(requestData)
			.success(function (channel){
				console.log(channel.data)
			$state.go('channeldetail', { channel_name: channel.data.id});
			})
			.error(function (channel){
							console.log("Failed to Create Channel");
							console.log(channel);
			})
	}

	function createFeedback(feedback, channel_id){
		feedback.happiness = 0;
		requestData = JSON.stringify({
            "feedback": feedback
        });
        console.log(requestData);
		channelFactory.createFeedback(requestData, channel_id)
		.success(function (feedback){
				angular.element(FeedbackModal).modal("hide");
			})
			.error(function (feedback){
				console.log(Error);
			})
	}

	function sendAnswer(feedback, channel_id, parent_feedback_id){
		feedback.happiness = 0;
		feedback.feedback_id = parent_feedback_id;
		requestData = JSON.stringify({
            "feedback": feedback
        });
        console.log(requestData);
		channelFactory.createFeedback(requestData, channel_id)
		.success(function (feedback){
				angular.element(AnswerModal).modal("hide");
			})
			.error(function (feedback){
				console.log(Error);
			})
	}
	
	function getChannelList(){
	 channelFactory.getChannels()
			.success(function (channel) {
				$scope.channels = channel.data;
				console.log($scope.channels);
			}).error(function (error) {
				console.log("Error");
			})
	}
	
	function getChannel(id){
	 channelFactory.getChannel(id)
			.success(function (channel) {
				$scope.channel = channel.data;
				console.log($scope.channel);
			}).error(function (error) {
				console.log("Error");
			})
		}

	function getFeedbacks(id){
	 channelFactory.getFeedbacks(id)
			.success(function (feedbacks) {
				$scope.feedbacks = feedbacks.data;
				console.log($scope.feedbacks);
			}).error(function (error) {
				console.log("Error");
			})
		}

	function getFeedbackChilds(channel_id, feedback_id, index){
	 channelFactory.getChildren(channel_id, feedback_id)
			.success(function (feedback_childs) {
				$scope.feedbacks[index].children = feedback_childs.data;
				console.log($scope.feedbacks[index].children);
			}).error(function (error) {
				console.log("Error");
			})
		}
	}


]);

