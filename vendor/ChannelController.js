constructeev.controller('ChannelController', ['$scope', '$state', 'channelFactory',
	 function($scope, $state, channelFactory){
	
	console.log($state.params);

	if ($state.current.name == "channeldetail"){
		getChannel($state.params.channel_name);
		getFeedbacks($state.params.channel_name);
		console.log("I'm in Detail View");
	} else if ($state.current.name == "channels") {
		console.log("I'm in Index Mode")
		getChannelList();
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
	}
	$scope.createChannel = function(){
		console.log($scope.channelModel);
		createChannel($scope.ChannelModel)
		angular.element(ChannelFormModal).modal("hide");
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
		feedback.happiness = 42;
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
	}


]);

