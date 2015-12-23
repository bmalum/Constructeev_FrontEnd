constructeev.factory('channelFactory', ['$http', function($http) {

    var urlBase = 'http://10.0.0.3:4000/api/channels';
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

    return channelFactory;
}]);
