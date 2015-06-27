'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// Scope
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

		// This provides Authentication context.
		$scope.authentication = Authentication;

	}
]);