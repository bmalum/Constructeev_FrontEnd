constructeev.factory('channelFactory', ['$http', function($http) {

    var urlBase = '/api/channels';
    var channelFactory = {};

    channelFactory.getChannels = function () {
        return $http.get(urlBase);
    };

    channelFactory.getChannel = function (id) {
        return $http.get(urlBase + '/' + id);
    };

    channelFactory.createChannel = function (cust) {
        return $http.post(urlBase, cust);
    };

    channelFactory.updateCustomer = function (cust) {
        return $http.put(urlBase + '/' + cust.ID, cust)
    };

    channelFactory.deleteChannel = function (id) {
        return $http.delete(urlBase + '/' + id);
    };

    channelFactory.getFeedbacks = function (id) {
        return $http.get(urlBase + '/' + id + '/feedbacks');
    };

    channelFactory.createFeedback = function (feedback, channel_id) {
        return $http.post(urlBase + '/' + channel_id + '/feedbacks', feedback);
    };

    channelFactory.upvoteFeedback = function (channel_id, feedback_id){
        return $http.get("/api/channels" + '/' + channel_id + '/feedbacks/' + feedback_id+"/_like");
    }

    channelFactory.upvoteChannel= function (channel_id){
        return $http.get("/api/channels" + '/' + channel_id + '/_like/');
    }

    return channelFactory;
}]);
