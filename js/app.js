'use strict';

var angularUiApp = angular.module('angularUiApp', 
	['ngAnimate','ngLocale', 'ui.bootstrap', 'angular-loading-bar']);
	angularUiApp.config(function($locationProvider) {
	    $locationProvider.html5Mode({
		  enabled: true,
		  requireBase: false
		});
	});
	
	angularUiApp.controller('angularUiCtrls', function($scope, $uibModal, $log, $http, $location){	
		
		/* MODAL */
		$scope.items = ['item1', 'item2', 'item3'];

		  $scope.animationsEnabled = true;

		  $scope.open = function (size) {

		    var modalInstance = $uibModal.open({
		      animation: $scope.animationsEnabled,
		      templateUrl: 'myModalContent.html',
		      controller: 'ModalInstanceCtrl',
		      size: size,
		      resolve: {
		        items: function () {
		          return $scope.items;
		        }
		      }
		    });

		    modalInstance.result.then(function (selectedItem) {
		      $scope.selected = selectedItem;
		    }, function () {
		      $log.info('Modal dismissed at: ' + new Date());
		    });
		  };

		  $scope.toggleAnimation = function () {
		    $scope.animationsEnabled = !$scope.animationsEnabled;
		  };
		/* FIM MODAL */
  		/*Envio de email via HTTP*/
  		$scope.formData = {};

	  	$scope.submission = false;

		var param = function(data) {
        var returnString = '';

        var d;
        for (d in data){
            if (data.hasOwnProperty(d))
               returnString += d + '=' + data[d] + '&';
        }
        
        return returnString.slice( 0, returnString.length - 1 );
		};

		$scope.submitForm = function() {
		    $http({
		    method : 'POST',
		    url : 'process.php',
		    data : param($scope.formData), 
		    headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
			})
		    .then(function(data) {
		       $scope.formData = {}; 
		       $scope.submission = true; 
		       $scope.open();
		       console.log(data);
		    });
		}
		$scope.submitFormCaptacao = function() {
		    $http({
		    method : 'POST',
		    url : 'process-captacao-email.php',
		    data : param($scope.formDataCaptacao), 
		    headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
			})
		    .then(function(data) {
		       $scope.formDataCaptacao = {}; 
		       $scope.submission = true; 
		       $scope.open();
		       console.log(data);
		    });
		}
		/*Fim Envio de email via HTTP*/
});

	angularUiApp.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items) {

	  $scope.items = items;
	  $scope.selected = {
	    item: $scope.items[0]
	  };

	  $scope.ok = function () {
	    $uibModalInstance.close($scope.selected.item);
	  };

	  $scope.cancel = function () {
	    $uibModalInstance.dismiss('cancel');
	  };
	});
