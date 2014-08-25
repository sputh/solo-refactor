angular.module('agg.following', [])

.controller('FollowingsController', function($scope, Followings) {
	$scope.data = {};
	$scope.test = "Testing";

	$scope.getPosts = function() {
		Followings.links().then(function(res) {
			$scope.data.posts = res;
		});
	};

	$scope.getPosts();
});