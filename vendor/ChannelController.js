constructeev.controller('ChannelController', ['$scope', '$state', 'channelFactory',
	 function($scope, $state, channelFactory){

	console.log($state.params);
	try{
	angular.element(AnswerModal).modal({
    detachable: false
  })}
	catch(error){
		console.log('Bahm')
	}
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

	/**$scope.openAnswers = function (channel_id, feedback_id){
		console.log(index)
		$scope.feedbacks[index].openAnswers = "false"
		getFeedbackChilds(channel_id, feedback_id);
	}*/

	$scope.openFeedbackModal = function(){
		angular.element(FeedbackModal).modal("show");
	}
	$scope.closeFeedbackModal = function(){
		angular.element(FeedbackModal).modal("hide");
	}
	$scope.createFeedback = function(){
		console.log($scope.channel.id);
		test = createFeedback($scope.feedback,$scope.channel.id);

	}
	$scope.createChannel = function(){
		console.log($scope.channelModel);
		createChannel($scope.ChannelModel)
		angular.element(ChannelFormModal).modal("hide");
	}
       $scope.isVotedUp = function(feedback_id){
           value = localStorage.getItem("feedback"+feedback_id)
           console.log("feedback para: "+feedback_id+" value: "+value)
           if(value == 'up'){
               return true
           } else if(value=='down') {
               return false
           }
           else{
               return false
           }
       }

			 $scope.isVotedDown = function(feedback_id){
           value = localStorage.getItem("feedback"+feedback_id)
           console.log("feedback para: "+feedback_id+" value: "+value)
           if(value == 'up'){
               return false
           } else if(value=='down') {
               return true
           }
           else{
               return false
           }
       }



	$scope.upvoteFeedback = function(channel_id, feedback_id, index){
		channelFactory.upvoteFeedback(channel_id, feedback_id);
		$scope.feedbacks[index].happiness++
		localStorage.setItem('feedback'+feedback_id, "up");
		//TODO - disable Feedback Like Button
		//angular.element(channel_likebutton).addClass("disabled")
	}
	$scope.downvoteFeedback = function(channel_id, feedback_id, index){
		channelFactory.downvoteFeedback(channel_id, feedback_id);
		$scope.feedbacks[index].happiness--
		localStorage.setItem('feedback'+feedback_id, "down");
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
		//angular.element(AnswerModal).remove()
		angular.element(AnswerModal).modal('setting', { detachable:false, allowMultiple:false }).modal('show')
		angular.element(AnswerModal).modal("refresh")
		setTimeout(function () {
      angular.element(AnswerModal).modal("refresh");
    }, 100);
		$scope.tmp_feedback_id = feedback_id
		channelFactory.getFeedback(feedback_id, $scope.channel.id).success(function (feedback){
			console.log(feedback.data)
				$scope.tmp_feedback = feedback.data;
				console.log($scope.tmp_feedback)
			})
			.error(function (feedback){
				console.log(Error);
			})
		getFeedbackChilds($scope.channel.id, feedback_id);

	}
	$scope.sendAnswer = function(){
		console.log($scope.channel.id);
		console.log($scope.tmp_feedback_id);
		$scope.feedback.feedback_childs = 0
		sendAnswer($scope.feedback,$scope.channel.id, $scope.tmp_feedback_id);
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
				$scope.feedbacks.unshift(feedback.data);
				$scope.channel.feedback_counter++
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
			//	angular.element(AnswerModal).modal("hide");
				getFeedbackChilds(channel_id, parent_feedback_id)
				$scope.feedback.feedback_childs ++
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
/**
	function getFeedbackChilds(channel_id, feedback_id, index){
	 channelFactory.getChildren(channel_id, feedback_id)
			.success(function (feedback_childs) {
				$scope.feedbacks[index].children = feedback_childs.data;
				console.log($scope.feedbacks[index].children);
			}).error(function (error) {
				console.log("Error");
			})
		}
	}*/

function getFeedbackChilds(channel_id, feedback_id){
	 channelFactory.getChildren(channel_id, feedback_id)
			.success(function (feedback_childs) {
				$scope.feedbackchildren = feedback_childs.data;
				console.log($scope.feedbackchildren);
			}).error(function (error) {
				console.log("Error");
			})
		}
	}

]);
