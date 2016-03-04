constructeev.factory('adminFactory', ['$http', function($http) {

    var urlBase = '/api/admin/feedback_properties';
    var adminFactory = {};

    adminFactory.login = function (data) {
        return $http.post(urlBase, data);
    };

    adminFactory.getChannel = function (id) {
        return $http.get('/api/channels/' + id);
    };
    
    adminFactory.getFeedbacks = function (id) {
        return $http.get('/api/admin/feedback_properties?channel_id=' + id);
    };

    adminFactory.updateFeedbackProperty = function (cust, id, channel_id) {
        return $http.put(urlBase + '/' + id, cust)
    };

    adminFactory.fav = function (cust, id) {
        return $http.put(urlBase + '/' + id, cust)
    };


    adminFactory.getChildren= function (channel_id, feedback_id){
        return $http.get("/api/channels" + '/' + channel_id + '/feedbacks/' + feedback_id + '/_children');
    }
/**
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

    channelFactory.getChildren= function (channel_id, feedback_id){
        return $http.get("/api/channels" + '/' + channel_id + '/feedbacks/' + feedback_id + '/_children');
    }
*/
    return adminFactory;
}]);
