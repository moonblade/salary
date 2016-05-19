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
        $scope.constants = {
            "raw": 1,
            "x1": 1,
            "x2": 2,
            "x3": 4,
            "total": 15,
        };
        var constants = $scope.constants;
        var salaryChange = false;
        var hraChange = false;
        var flag = true;
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
                "percent": 0.5,
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
            "pfesi": {
                "name": "PF and ESI",
                "value": 0,
                "pfvalue": 0,
                "esivalue": 0,
                "input": true,
                "hide": true,
                "checkbox": {
                    "prompt": "Deduct pf and esi?",
                    "value": true
                }
            },
            "z": {
                "name": "HRA(tax exempted)",
                "value": 0
            },
            "c4": {
                "name": "Other Allowances",
                "hide": true,
                "value": 0
            },
            "taxable": {
                "name": "Taxable Income",
                "value": 0
            },
            "tax": {
                "name": "Tax",
                "value": 0
            },
            "saveTax": {
                "name": "Tax Saved",
                "value": 0
            },

        }

        var limits = {
            x1: 0,
            x2: 0,
            x3: 0
        }
        var getTax = function(money) {
            var m = 0
            if (money > 1000000)
                m = (money - 1000000) * .3 + 125000
            else if (money > 500000)
                m = (money - 500000) * .2 + 25000
            else if (money > 250000)
                m = (money - 250000) * .1 - 2000
            return m > 0 ? Math.round(m) : 0
        }
        var optimise = function(onesixsevenfive) {
            var multiplier = onesixsevenfive ? 1.1675 : 1;
            var solver = new BigM(BigM.MAXIMIZE, [0, 0, 0, 1]);
            if (limits.x1) {
                solver.addConstraint([1, 0, 0, 0], BigM.GREATER_OR_EQUAL_THAN, limits.x1);
                solver.addConstraint([1, 0, 0, 0], BigM.LOWER_OR_EQUAL_THAN, limits.x1);
            }
            if (limits.x2) {
                solver.addConstraint([0, 1, 0, 0], BigM.GREATER_OR_EQUAL_THAN, limits.x2)
                solver.addConstraint([0, 1, 0, 0], BigM.LOWER_OR_EQUAL_THAN, limits.x2)
            }
            if (limits.x3)
                solver.addConstraint([0, 0, 1, 0], BigM.EQUALS, limits.x3)
            solver.addConstraint([$scope.variables.city.percent, 0, 0, -1], BigM.GREATER_OR_EQUAL_THAN, 0);
            solver.addConstraint([0, 1, 0, -1], BigM.GREATER_OR_EQUAL_THAN, 0);
            solver.addConstraint([-0.1, 0, 1, -1], BigM.GREATER_OR_EQUAL_THAN, 0);
            solver.addConstraint([multiplier, 1, 0, 0], BigM.GREATER_OR_EQUAL_THAN, $scope.variables.c1.value - $scope.variables.c2.value - multiplier * $scope.variables.c3.value - $scope.variables.c4.value);
            solver.addConstraint([multiplier, 1, 0, 0], BigM.LOWER_OR_EQUAL_THAN, $scope.variables.c1.value - $scope.variables.c2.value - multiplier * $scope.variables.c3.value - $scope.variables.c4.value);
            return solver.solve()
        }


        var findUnknowns = function(checkboxValue, which) {
            $scope.variables.c3.value = $scope.variables.da.value + $scope.variables.fc.value
            $scope.variables.c2.value = $scope.variables.ma.value + $scope.variables.lta.value + $scope.variables.cea.value + $scope.variables.ca.value + $scope.variables.meal.value;
            var res = optimise(checkboxValue);
            if (which==undefined || which & 1) {
                console.log('x1 : ' + res[0])
                $scope.variables.x1.slider.max = Math.round(res[0])
            }
            if (which==undefined || which & 2) {
                console.log('x2 : ' + res[1])
                $scope.variables.x2.slider.max = Math.round(res[1])
            }
            if (which==undefined || which & 4) {
                console.log('x3 : ' + res[2])
                $scope.variables.x3.slider.max = Math.round(res[2])
            }
            if (which==undefined || which & 8) {
                $scope.variables.z.value = Math.round(res[3])
                console.log('z : ' + res[3])
            }
            console.log('checkbox : ' + checkboxValue)
            console.log('city : ' + $scope.variables.city.percent)
            console.log('c1 : ' + $scope.variables.c1.value)
            console.log('c2 : ' + $scope.variables.c2.value)
            console.log('c3 : ' + $scope.variables.c3.value)
            console.log('c4 : ' + $scope.variables.c4.value)
            console.log('limits : ' + limits.x1 + " " + limits.x2 + " " + limits.x3)
            console.log('res : ' + res)
            console.log('---------------------')
        }

        var setMaxLTA = function() {
            if ($scope.variables.c1.value > 600000)
                $scope.variables.lta.slider.max = 20000 * $scope.variables.lta.selector.value;
            else
                $scope.variables.lta.slider.max = 7550 * $scope.variables.lta.selector.value;
        }
        setMaxLTA();
        window.scope = $scope // to access scope variables and debug in console
        var lastLTA;
        $scope.find = function(key, variable, method) {
            console.log(key + " " + method + " " + hraChange + " " + salaryChange)
            var onesixsevenfivebool = ($scope.variables.pfesi.checkbox.value || $scope.variables.pfesi.hide);
            var onesixsevenfive = ($scope.variables.pfesi.checkbox.value || $scope.variables.pfesi.hide) ? 1.1675 : 1;
            if (key == "c1") {
                setMaxLTA();

                $scope.variables.lta.value = Math.round(Math.min((10.7 * variable.value * 5) / (100 * 12), $scope.variables.lta.slider.max));
            } else if (key == "months") {
                $scope.variables.ca.slider.max = $scope.variables.months.value * 1600;
                $scope.variables.ca.value = $scope.variables.ca.slider.max;
            } else if (key == "residence") {
                $scope.variables.residence.value = $scope.variables.residence.selector.value;
                if ($scope.variables.residence.value == "Owned") {
                    $scope.variables.z.hide = true;
                    $scope.variables.x3.hide = true;
                    // $scope.variables.x2.hide = true;
                } else {
                    $scope.variables.z.hide = false;
                    $scope.variables.x3.hide = false;
                    // $scope.variables.x2.hide = false;
                }
            } else if (key == "city") {
                $scope.variables.city.value = $scope.variables.city.selector.value;
                var city = $scope.variables.city.value;
                if (city == "Mumbai" || city == "Chennai" || city == "Delhi" || city == "Kolkatta")
                    $scope.variables.city.percent = 0.5;
                else
                    $scope.variables.city.percent = 0.4;
            } else if (key == "lta") {
                setMaxLTA();
                if (lastLTA != $scope.variables.lta.slider.max) {
                    lastLTA = $scope.variables.lta.slider.max;
                    $scope.variables.lta.value = $scope.variables.lta.slider.max
                }
                $scope.variables.lta.value = Math.min($scope.variables.lta.slider.max, $scope.variables.lta.value);
            } else if (key == "cea") {
                $scope.variables.cea.value = $scope.variables.cea.selector.value * 1200;
            } else if (key == "x1") {
                limits.x1 = $scope.variables.x1.value
                var which = constants.total - constants.x1;
                which -= limits.x2 ? constants.x2 : 0;
                which -= limits.x3 ? constants.x3 : 0;
                if (limits.x2) {
                    $scope.variables.c4.hide = false;
                    $scope.variables.c4.value = $scope.variables.c1.value - $scope.variables.c2.value - onesixsevenfive* $scope.variables.c3.value - onesixsevenfive* $scope.variables.x1.value - $scope.variables.x2.value;
                    salaryChange = false;
                    findUnknowns(onesixsevenfivebool, which)
                } else {
                    findUnknowns(onesixsevenfivebool, which)
                    $scope.variables.c4.hide = true;
                    $scope.variables.c4.value = 0;
                    $scope.variables.x3.value = $scope.variables.x3.slider.max;
                    $scope.variables.x2.value = $scope.variables.x2.slider.max;
                    salaryChange = true;
                }
            } else if (key == "x2") {
                limits.x2 = $scope.variables.x2.value
                var which = constants.total - constants.x2;
                which -= limits.x1 ? constants.x1 : 0;
                which -= limits.x3 ? constants.x3 : 0;
                findUnknowns(onesixsevenfivebool, which)
                if (limits.x1) {
                    $scope.variables.c4.hide = false;
                    $scope.variables.c4.value = $scope.variables.c1.value - $scope.variables.c2.value - onesixsevenfive* $scope.variables.c3.value - onesixsevenfive* $scope.variables.x1.value - $scope.variables.x2.value;
                    hraChange = false;
                    findUnknowns(onesixsevenfivebool, which)
                } else {
                    findUnknowns(onesixsevenfivebool, which)
                    hraChange = true;
                    $scope.variables.c4.hide = true;
                    $scope.variables.c4.value = 0;
                    $scope.variables.x3.value = $scope.variables.x3.slider.max;
                    $scope.variables.x1.value = $scope.variables.x1.slider.max;
                }

            } else if (key == "x3") {
                limits.x3 = $scope.variables.x3.value
                var which = constants.total - constants.x3;
                which -= limits.x1 ? constants.x1 : 0;
                which -= limits.x2 ? constants.x2 : 0;
                findUnknowns(onesixsevenfivebool, which)
            }

            if (!(key == "x1" || key == "x2" || key == "x3")) {
                limits = {
                    x1: 0,
                    x2: 0,
                    x3: 0
                }
                findUnknowns(onesixsevenfivebool)
                $scope.variables.x1.value = $scope.variables.x1.slider.max;
                $scope.variables.x2.value = $scope.variables.x2.slider.max;
                $scope.variables.x3.value = $scope.variables.x3.slider.max;
            } else {
                // $scope.variables.z.value = Math.round(Math.max(Math.min($scope.variables.city.percent * $scope.variables.x1.value, $scope.variables.x2.value, $scope.variables.x3.value - 0.1 * $scope.variables.x1.value), 0))
            }
            $scope.variables.pfesi.description = "PF : " + $scope.variables.pfesi.pfvalue + ", ESI : " + $scope.variables.pfesi.esivalue;
            if (optimise(false)[0] >= 180000 && $scope.variables.x1.value >= 180000) {
                console.log('in psi')
                $scope.variables.pfesi.hide = false;
                if (flag) {
                    $scope.variables.pfesi.checkbox.value = true;
                    flag = false;
                }
                if ($scope.variables.pfesi.checkbox.value) {
                    $scope.variables.pfesi.pfvalue = 12 * Math.round($scope.variables.x1.value / 100);
                    $scope.variables.pfesi.esivalue = Math.round(4.75 * $scope.variables.x1.value / 100);
                    $scope.variables.pfesi.value = $scope.variables.pfesi.pfvalue + $scope.variables.pfesi.esivalue;
                    $scope.variables.pfesi.description = "PF : " + $scope.variables.pfesi.pfvalue + ", ESI : " + $scope.variables.pfesi.esivalue;
                } else {
                    $scope.variables.pfesi.description = "PF : " + 0 + ", ESI : " + 0;
                    $scope.variables.pfesi.value = 0;
                }
                // findUnknowns($scope.variables.pfesi.checkbox.value)
            } else {
                flag = true;
                $scope.variables.pfesi.hide = true;
                $scope.variables.pfesi.checkbox.value = false;
            }

            $scope.variables.taxable.description = "Basic Salary : " + $scope.variables.x1.value +
                "\nCEA : " + ($scope.variables.cea.value - 2400) +
                "\nMedical Allowance : " + ($scope.variables.ma.value - 15000) +
                "\nMeal Allowance : " + ($scope.variables.meal.value - 12050) +
                "\nHRA amount : " + ($scope.variables.residence.value != "Owned" ? ($scope.variables.x2.value - $scope.variables.z.value) : 0) +
                "\nLTA amount : " + ($scope.variables.lta.value - $scope.variables.lta.slider.max) +
                "\nDA amount : " + $scope.variables.da.value +
                "\nFC amount : " + $scope.variables.fc.value +
                "\nOthers : " + $scope.variables.c4.value +
                "\nCA amount : " + ($scope.variables.ca.value - 19200);
            $scope.variables.taxable.value = Math.round($scope.variables.x1.value + $scope.variables.cea.value - 2400 + $scope.variables.ma.value - 15000 + $scope.variables.meal.value - 12050 + $scope.variables.x2.value - $scope.variables.z.value + $scope.variables.lta.value - $scope.variables.lta.slider.max + $scope.variables.da.value + $scope.variables.fc.value + ($scope.variables.ca.value - 19200) + $scope.variables.c4.value);
            if ($scope.variables.pfesi.checkbox.value && !$scope.variables.pfesi.hide) {
                $scope.variables.taxable.description += "\nPF amount : " + (-$scope.variables.pfesi.pfvalue) +
                    "\nESI amount : " + (-$scope.variables.pfesi.esivalue);
                $scope.variables.taxable.value -= Math.round($scope.variables.pfesi.pfvalue + $scope.variables.pfesi.esivalue);
            }
            $scope.variables.tax.value = getTax($scope.variables.taxable.value);
            $scope.variables.saveTax.value = getTax($scope.variables.c1.value) - getTax($scope.variables.taxable.value);
            if ($scope.variables.saveTax.value > 0)
                $scope.variables.saveTax.hide = false;
            else
                $scope.variables.saveTax.hide = true;
        }
        $scope.find("c1", $scope.variables.c1);
    }]);
