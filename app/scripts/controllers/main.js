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
                    "max": 10000000,
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
            "residence": {
                "name": "Residance",
                "value": "Rental",
                "selector": {
                    "prompt": "Type of residence",
                    "value": "Rental",
                    "options": [{
                        "text": "Rental",
                        "value": "Rental"
                    }, {
                        "text": "Owned",
                        "value": "Owned"
                    }, ]
                }
            },
            "city": {
                "name": "City of Residance",
                "value": "Mumbai",
                "percent": 50,
                "selector": {
                    "prompt": "Select your city",
                    "value": "Mumbai",
                    "options": [{
                        "text": "Delhi",
                        "value": "Delhi",
                    }, {
                        "text": "Mumbai",
                        "value": "Mumbai"
                    }, {
                        "text": "Chennai",
                        "value": "Chennai"
                    }, {
                        "text": "Kolkatta",
                        "value": "Kolkatta"
                    }, {
                        "text": "Others",
                        "value": "Others"
                    }, ]
                }
            },
            "ma": {
                "name": "Medical Allowance",
                "description": "Exception can be claimed on production of bills of expenses of dependent parents",
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
                "selector": {
                    "prompt": "Number of children",
                    "value": 0,
                    "options": [{
                        "text": "0",
                        "value": 0
                    }, {
                        "text": "1",
                        "value": 1
                    }, {
                        "text": "More than 1",
                        "value": 2
                    }, ]
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
                "description": "Move to zero if your employer is providing conveyance facility",
                "input": true,
                "value": 19200,
                "slider": {
                    "min": 0,
                    "max": 1600 * 12,
                    "step": 100
                }
            },
            "da": {
                "name": "Dearness Allowance",
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
            "pf": {
                "name": "PF",
                "value": 0,
                "input": true,
                "hide": true,
                "checkbox": {
                    "prompt": "Opt out?",
                    "value": false
                }
            },
            "esi": {
                "name": "ESI",
                "value": 0,
                "input": true,
                "hide": true,
                "checkbox": {
                    "prompt": "Opt out?",
                    "value": false
                }
            },

            "z": {
                "name": "HRA(tax exempted)",
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
            // $scope.variables['blank'] = null

        $scope.find = function(key, variable) {
            // console.log($scope.variables)
            if (key == "c1") {
                setMaxLTA();
                $scope.variables.lta.value = Math.min((10.7 * variable.value * 5) / (100 * 12), $scope.variables.lta.slider.max);
            } else if (key == "months") {
                $scope.variables.ca.slider.max = $scope.variables.months.value * 1600;
                $scope.variables.ca.value = $scope.variables.ca.slider.max;
            } else if (key == "residence") {
                $scope.variables.residence.value = $scope.variables.residence.selector.value;
                if ($scope.variables.residence.value == "Owned") {
                    $scope.variables.residence.hra.hide = true;
                }
            } else if (key == "city") {
                $scope.variables.city.value = $scope.variables.city.selector.value;
                var city = $scope.variables.city.value;
                if (city == "Mumbai" || city == "Chennai" || city == "Delhi" || city == "Kolkatta")
                    $scope.variables.city.percent = 50;
                else
                    $scope.variables.city.percent = 40;
            } else if (key == "lta") {
                setMaxLTA();
                $scope.variables.lta.value = Math.min($scope.variables.lta.slider.max, $scope.variables.lta.value);
            } else if (key == "cea") {
                $scope.variables.cea.value = $scope.variables.cea.selector.value * 1200;
            } else if (key == "x2") {
                $scope.variables.x1.slider.max = $scope.variables.c1.value - $scope.variables.c2.value - $scope.variables.x2.value;
                $scope.variables.x1.value = $scope.variables.x1.slider.max;
            } else if (key == "x1") {
                $scope.variables.x2.slider.max = $scope.variables.c1.value - $scope.variables.c2.value - $scope.variables.x1.value;
                $scope.variables.x2.value = $scope.variables.x2.slider.max;
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

            if ($scope.variables.x1.value >= 180000) {
                $scope.variables.pf.hide = false;
                $scope.variables.esi.hide = false;
                $scope.variables.pf.value = 12 * $scope.variables.x1.value / 100;
                $scope.variables.esi.value = 4.75 * $scope.variables.x1.value / 100;
            } else {
                $scope.variables.pf.hide = true;
                $scope.variables.pf.value = 12 * $scope.variables.x1.value / 100;
                $scope.variables.esi.hide = true;
                $scope.variables.esi.value = 4.75 * $scope.variables.x1.value / 100;
            }

            var variables = $scope.variables;
            $scope.variables = null
            $scope.variables = variables;
        }
        $scope.find("c1", $scope.variables.c1);
    }]);
