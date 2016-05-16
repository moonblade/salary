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
        $scope.variables = {
            "c1": {
                "name": "CTC/Total Salary",
                "input": true,
                "value": 1000000,
                "slider": {
                    "min": 0,
                    "max": 1000000,
                    "step": 1000
                }
            },
            "months": {
                "name": "Months Worked",
                "input": true,
                "value": 12,
                "slider": {
                    "min": 0,
                    "max": 12,
                    "step": 1
                }
            },
            "ma": {
                "name": "Medical Allowance",
                "input": true,
                "value": 15000,
                "slider": {
                    "min": 0,
                    "max": 15000,
                    "step": 100
                }
            },
            "meal": {
                "name": "Meal Allowance",
                "input": true,
                "value": 12050,
                "slider": {
                    "min": 0,
                    "max": 12050,
                    "step": 50
                }
            },
            "cea": {
                "name": "CEA",
                "input": true,
                "value": 0,
                "slider": {
                    "min": 0,
                    "max": 2400,
                    "step": 1200
                }
            },
            "lta": {
                "name": "LTA",
                "input": true,
                "value": 0,
                "slider": {
                    "min": 0,
                    "max": 20000,
                    "step": 100
                },
                "selector": {
                    "prompt": "number of people",
                    "value": 1,
                    "options": [{
                        "text": "1",
                        "value": 1
                    }, {
                        "text": "2",
                        "value": 2
                    }, {
                        "text": "3",
                        "value": 3
                    }, {
                        "text": "4",
                        "value": 4
                    }, ]
                }
            },
            "ca": {
                "name": "Coveyance Allowance",
                "input": true,
                "value": 19200,
                "slider": {
                    "min": 0,
                    "max": 1600 * 12,
                    "step": 100
                }
            },
            "da": {
                "name": "Darness Allowance",
                "input": true,
                "value": 0,
                "slider": {
                    "min": 0,
                    "max": 1000000,
                    "step": 1000
                }
            },
            "fc": {
                "name": "Fixed Commission on turnover",
                "input": true,
                "value": 0,
                "slider": {
                    "min": 0,
                    "max": 1000000,
                    "step": 1000
                }
            },
            "residence": {
                "hide": true,
                "name": "Residance",
                "selector": {
                    "options": ["Rental", ""]
                },
            },
            "c2": {
                "name": "Constant 2",
                "hide": true,
                "value": 0,
            },
            "c3": {
                "name": "Constant 3",
                "hide": true,
                "input": true,
                "value": 0,
                "slider": {
                    "min": 0,
                    "max": 1000000,
                    "step": 1000
                }
            },
            "x1": {
                "name": "Basic Salary",
                "value": 0,
                "input": true,
                "slider": {
                    "min": 0,
                    "max": 1000000,
                    "step": 1000
                }
            },
            "x2": {
                "name": "House Rental Allowance",
                "value": 0,
                "input": true,
                "slider": {
                    "min": 0,
                    "max": 1000000,
                    "step": 1000
                }
            },
            "x3": {
                "name": "Rental Paid Annually",
                "value": 0,
                "input": true,
                "slider": {
                    "min": 0,
                    "max": 1000000,
                    "step": 1000
                }
            },
            "z": {
                "name": "HRA",
                "value": 0
            },
        }
        var setMaxLTA = function() {
            if ($scope.variables.c1.value > 600000)
                $scope.variables.lta.slider.max = 20000 * $scope.variables.lta.selector.value;
            else
                $scope.variables.lta.slider.max = 7550 * $scope.variables.lta.selector.value;
        }
        setMaxLTA();
        window.scope = $scope

        $scope.variables['blank'] = null

        $scope.find = function(key, variable) {
            console.log($scope.variables)
            if (key == "c1") {
                setMaxLTA();
                $scope.variables.lta.value = Math.min((10.7 * variable.value * 5) / (100 * 12), $scope.variables.lta.slider.max);
            }
            if (key == "lta") {
                setMaxLTA();
                $scope.variables.lta.value = Math.min($scope.variables.lta.slider.max, $scope.variables.lta.value);
            }
            if (key == "months") {
                $scope.variables.ca.slider.max = $scope.variables.months.value * 1600;
                // $scope.variables.ca.value = Math.min($scope.variables.ca.slider.max, $scope.variables.ca.value);
                $scope.variables.ca.value = $scope.variables.ca.slider.max;
            }
            if (key == "x2") {
                $scope.variables.x1.slider.max = $scope.variables.c1.value - $scope.variables.c2.value - $scope.variables.x2.value;
                // $scope.variables.x1.value = Math.min($scope.variables.c1.value - $scope.variables.c2.value - $scope.variables.x2.value, $scope.variables.x1.slider.max);
            }
            if (key == "x1") {
                $scope.variables.x2.slider.max = $scope.variables.c1.value - $scope.variables.c2.value - $scope.variables.x1.value;
                // $scope.variables.x2.value = Math.min($scope.variables.c1.value - $scope.variables.c2.value - $scope.variables.x1.value, $scope.variables.x2.slider.max);
            }

            if (!(key == "x1" || key == "x2" || key == "x3")) {
                $scope.variables.c3.value = $scope.variables.da.value + $scope.variables.fc.value
                $scope.variables.c2.value = $scope.variables.ma.value + $scope.variables.lta.value + $scope.variables.cea.value + $scope.variables.ca.value + $scope.variables.meal.value;
                var solver = new BigM(BigM.MAXIMIZE, [0, 0, 0, 1]);
                solver.addConstraint([0.5, 0, 0, -1], BigM.GREATER_OR_EQUAL_THAN, 0);
                solver.addConstraint([0, 1, 0, -1], BigM.GREATER_OR_EQUAL_THAN, 0);
                solver.addConstraint([-0.1, 0, 1, -1], BigM.GREATER_OR_EQUAL_THAN, 0);
                solver.addConstraint([1, 1, 0, 0], BigM.GREATER_OR_EQUAL_THAN, $scope.variables.c1.value - $scope.variables.c2.value - $scope.variables.c3.value);
                solver.addConstraint([1, 1, 0, 0], BigM.LOWER_OR_EQUAL_THAN, $scope.variables.c1.value - $scope.variables.c2.value - $scope.variables.c3.value);
                var res = solver.solve()

                $scope.variables.x1.slider.max = res[0]
                $scope.variables.x1.value = res[0]
                $scope.variables.x2.slider.max = res[1]
                $scope.variables.x2.value = res[1]
                $scope.variables.x3.slider.max = res[2]
                $scope.variables.x3.value = res[2]
                $scope.variables.z.value = res[3]
            } else {
                $scope.variables.z.value = Math.min($scope.variables.x1.value, $scope.variables.x2.value, $scope.variables.x3.value)
            }
            var variables = $scope.variables;
            $scope.variables = null
            $scope.variables = variables;
        }
        $scope.find("c1", $scope.variables.c1);
    }]);
