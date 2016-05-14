'use strict';

/**
 * @ngdoc function
 * @name frontApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontApp
 */
angular.module('frontApp')
    .controller('MainCtrl', ['$scope', function($scope) {
        this.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
        $scope.names = {
            "c1": "Constant 1",
            "c2": "Constant 2",
            "c3": "Constant 3",
            "x1": "Variable 1",
            "x2": "Variable 2",
            "x3": "Variable 3",
            "z": "Minimized"
        }
        $scope.c1 = 1000000;
        $scope.c2 = 9800;
        $scope.c3 = 0;

        $scope.find = function() {
            var solver = new BigM(BigM.MAXIMIZE, [0, 0, 0, 1]);
            solver.addConstraint([1, 0, 0, 0], BigM.GREATER_OR_EQUAL_THAN, 150000);
            solver.addConstraint([0, 1, 0, 0], BigM.LOWER_OR_EQUAL_THAN, 290400);
            solver.addConstraint([0, 0, 1, 0], BigM.LOWER_OR_EQUAL_THAN, 150000);
            solver.addConstraint([0.5, 0, 0, -1], BigM.GREATER_OR_EQUAL_THAN, 0);
            solver.addConstraint([0, 1, 0, -1], BigM.GREATER_OR_EQUAL_THAN, 0);
            solver.addConstraint([-0.1, 0, 1, -1], BigM.GREATER_OR_EQUAL_THAN, 0);
            solver.addConstraint([1, 1, 0, 0], BigM.GREATER_OR_EQUAL_THAN, $scope.c1 - $scope.c2 - $scope.c3);
            solver.addConstraint([1, 1, 0, 0], BigM.LOWER_OR_EQUAL_THAN, $scope.c1 - $scope.c2 - $scope.c3);
            var res = solver.solve()

            $scope.x1 = res[0]
            $scope.x2 = res[1]
            $scope.x3 = res[2]
            $scope.z = res[3]
            console.log(res)
        }
        $scope.find();

    }]);
