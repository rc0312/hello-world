'use strict';

angular.module('articles').controller('ArticlesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Articles',
	function($scope, $stateParams, $location, Authentication, Articles) {
		$scope.authentication = Authentication;

//Copied from main page---BELOW

		$scope.events = [
			{name: "Event 1", owner: "Dave"},
			{name: "Event 2", owner: "Joe"},
			{name: "Event 3", owner: "Tom"},
		];

		$scope.addEvent = function () {
			$scope.events.push({name: $scope.newEvent, owner: $scope.newOwner});
			$scope.newEvent = "";
			$scope.newOwner = "";
			$scope.eventDisplay.creatingEvent = false;
		};

		$scope.eventDisplay = {
			name: null,
			owner: null,
			creatingEvent: false,
		};

		$scope.createEvent = function (event) {
			$scope.eventDisplay.creatingEvent = true;
		};

		$scope.updateEvent = function (event) {
			$scope.eventDisplay.name = event.name;
			$scope.eventDisplay.owner = event.owner;
		};

		$scope.reloadRoute = function() {
   			$route.reload();
		};


//Copied from main page---ABOVE

		$scope.create = function() {
			var article = new Articles({
				title: this.title,
				content: this.content
			});
			article.$save(function(response) {
				$location.path('articles');

				$scope.title = '';
				$scope.content = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

				$scope.eventDisplay.creatingEvent = false;

		};

		$scope.remove = function(article) {
			if (article) {
				article.$remove();

				for (var i in $scope.articles) {
					if ($scope.articles[i] === article) {
						$scope.articles.splice(i, 1);
					}
				}
			} else {
				$scope.article.$remove(function() {
					$location.path('articles');
				});
			}
		};

		$scope.update = function() {
			var article = $scope.article;

			article.$update(function() {
				$location.path('articles/' + article._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.articles = Articles.query();
		};

		$scope.findOne = function() {
			$scope.article = Articles.get({
				articleId: $stateParams.articleId
			});
		};
	}
]);