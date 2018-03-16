var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");

    var refresh = function() {
    	$http.get('/librarydb').then(doneCallbacks, failCallbacks);

	 	function doneCallbacks(res) {
	  		console.log("Data received");
	  		$scope.librarydb = res.data;
	 	}

	 	function failCallbacks(err) {
	  		console.log(err.message);
	 	}
    }

    refresh();

 	$scope.addData = function() {
 		console.log($scope.data);
 		$http.post('/librarydb',$scope.data).then(doneCallbacks, failCallbacks);

	 	function doneCallbacks(res) {
	  		console.log(res);
	  		//console.log("Yo dawg");
	  		$scope.librarydb = res.data;
	  		refresh();
	  		alert('Data added.');
	 	}

	 	function failCallbacks(err) {
	  		console.log(err.message);
	 	}

 		/*.success(function (response) {
 			console.log(response);
 		});*/

 	}

 	$scope.remove = function(id) {
 		console.log(id);
 		$http.delete('/librarydb/'+ id).then(doneCallbacks, failCallbacks);

	 	function doneCallbacks(res) {
	  		refresh();
	  		alert('Entry removed.');
	 	}

	 	function failCallbacks(err) {
	  		console.log(err.message);
	 	}

 	}

 	$scope.edit = function (id) {
 		console.log(id);
 		$http.get('/librarydb/'+id).then(doneCallbacks, failCallbacks);

	 	function doneCallbacks(res) {
	  		$scope.data = res.data;
	 	}

	 	function failCallbacks(err) {
	  		console.log(err.message);
	 	}
 	}

 	$scope.update = function() {
 		console.log($scope.data._id);
 		$http.put('/librarydb/'+ $scope.data._id, $scope.data).then(doneCallbacks, failCallbacks);

	 	function doneCallbacks(res) {
	  		refresh();
	 	}

	 	function failCallbacks(err) {
	  		console.log(err.message);
	 	}
 	}

 	$scope.deselect = function() {
 		$scope.data = "";
 	}
}]);