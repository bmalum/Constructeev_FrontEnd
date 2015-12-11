constructeev.factory('channelFactory', ['$http', function($http) {

    var urlBase = 'http://localhost:4000/api/channels';
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

    return channelFactory;
}]);
