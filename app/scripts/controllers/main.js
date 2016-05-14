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
        $scope.minimum = 0;
        $scope.minimums = "0";
        $scope.variables = {
            "c1": {
                "name": "Constant 1",
                "input": true,
                "value": 1000000,
                "slider": {
                    "min": 0,
                    "max": 1000000,
                    "step": 1000
                }
            },
            "c2": {
                "name": "Constant 2",
                // "hide":true,
                "input": true,
                "value": 9800,
                "slider": {
                    "min": 0,
                    "max": 1000000,
                    "step": 1000
                }
            },
            "c3": {
                "name": "Constant 3",
                // "hide":true,
                "input": true,
                "value": 0,
                "slider": {
                    "min": 0,
                    "max": 1000000,
                    "step": 1000
                }
            },
            "x1": {
                "name": "Variable 1",
                "value": 0
            },
            "x2": {
                "name": "Variable 2",
                "value": 0
            },
            "x3": {
                "name": "Variable 3",
                "value": 0
            },
            "z": {
                "name": "Minimized",
                "value": 0
            },
            "months": {
                "name": "Months worked",
                "value": 12
            },
        }

        $scope.find = function() {
            var solver = new BigM(BigM.MAXIMIZE, [0, 0, 0, 1]);
            solver.addConstraint([1, 0, 0, 0], BigM.GREATER_OR_EQUAL_THAN, 150000);
            solver.addConstraint([0, 1, 0, 0], BigM.LOWER_OR_EQUAL_THAN, 290400);
            solver.addConstraint([0, 0, 1, 0], BigM.LOWER_OR_EQUAL_THAN, 150000);
            solver.addConstraint([0.5, 0, 0, -1], BigM.GREATER_OR_EQUAL_THAN, 0);
            solver.addConstraint([0, 1, 0, -1], BigM.GREATER_OR_EQUAL_THAN, 0);
            solver.addConstraint([-0.1, 0, 1, -1], BigM.GREATER_OR_EQUAL_THAN, 0);
            solver.addConstraint([1, 1, 0, 0], BigM.GREATER_OR_EQUAL_THAN, $scope.variables.c1.value - $scope.variables.c2.value - $scope.variables.c3.value);
            solver.addConstraint([1, 1, 0, 0], BigM.LOWER_OR_EQUAL_THAN, $scope.variables.c1.value - $scope.variables.c2.value - $scope.variables.c3.value);
            var res = solver.solve()

            $scope.variables.x1.value = res[0]
            $scope.variables.x2.value = res[1]
            $scope.variables.x3.value = res[2]
            $scope.variables.z.value = res[3]
        }
        $scope.find();

    }]);
