var BigM = require('../app/scripts/js/BigM')

c1 = 1000000
c2 = 66250
c3 = 0

solver = new BigM(BigM.MAXIMIZE, [0, 0, 0, 1]);

var limits = {
    x1: 250000,
    x2: 641875,
    x3: 48000
}

var city = 0.5
var onesixsevenfivebool = true;
var onesixsevenfive = onesixsevenfivebool?1.1675:1;
var c4 = limits.x1&&limits.x2?c1- onesixsevenfive*c3 - onesixsevenfive*limits.x1 - limits.x2:0; 
if (limits.x1) {
    solver.addConstraint([1, 0, 0, 0], BigM.GREATER_OR_EQUAL_THAN, limits.x1);
    solver.addConstraint([1, 0, 0, 0], BigM.LOWER_OR_EQUAL_THAN, limits.x1);
}
if (limits.x2) {
    solver.addConstraint([0, 1, 0, 0], BigM.GREATER_OR_EQUAL_THAN, limits.x2)
    solver.addConstraint([0, 1, 0, 0], BigM.LOWER_OR_EQUAL_THAN, limits.x2)
}
if (limits.x3) {
    solver.addConstraint([0, 0, 1, 0], BigM.LOWER_OR_EQUAL_THAN, limits.x3)
    solver.addConstraint([0, 0, 1, 0], BigM.GREATER_OR_EQUAL_THAN, limits.x3)
}

solver.addConstraint([city, 0, 0, -1], BigM.GREATER_OR_EQUAL_THAN, 0);
solver.addConstraint([0, 1, 0, -1], BigM.GREATER_OR_EQUAL_THAN, 0);
solver.addConstraint([-0.1, 0, 1, -1], BigM.GREATER_OR_EQUAL_THAN, 0);
solver.addConstraint([onesixsevenfive, 1, 0, 0], BigM.GREATER_OR_EQUAL_THAN, c1 - c2 - c3 * onesixsevenfive - c4);
solver.addConstraint([onesixsevenfive, 1, 0, 0], BigM.LOWER_OR_EQUAL_THAN, c1 - c2 - c3 * onesixsevenfive - c4);
var res = solver.solve()


console.log(res)
