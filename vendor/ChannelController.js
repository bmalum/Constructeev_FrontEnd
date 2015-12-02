constructeev.controller('ChannelController', ['$scope', '$state', 'channelFactory',
	 function($scope, $state, channelFactory){
	
	console.log($state.params);

	if ($state.current.name == "channeldetail"){
		getChannel($state.params.channel_name);
		console.log("I'm in Detail View");
	} else if ($state.current.name == "channels") {
		console.log("I'm in Index Mode")
		getChannelList();
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
				console.log($scope.channels);
			}).error(function (error) {
				console.log("Error");
			})
	}
	 }	
]);

