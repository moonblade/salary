from pulp  import *

c1=1000000
c2=66250
c3=0
c4=0

limits = [250000,160000,180000]
if(limits[0]>0 and limits[1]>0):
	c4=c1-1.1675*limits[0]-1.675*c3-limits[1]
# declare your variables
x1 = LpVariable("x1", 250000, 250000)   # 150000 <= x1
x2 = LpVariable("x2", 641875, 641875)   # 0<= x2 <=290400
x3 = LpVariable("x3", 0, None)   # 0<= x3<=150000
z = LpVariable("z", 0, None)   # 0<= x3

# defines the problem
prob = LpProblem("problem", LpMaximize)
 
# defines the constraints+c4
if(limits[0]>0):
	prob += limits[0]<=x1
	prob += x1<=limits[0]
if(limits[1]>0):
	prob += limits[1]<=x2
	prob += x2<=limits[1]
if(limits[2]>0):
	prob += limits[2]<=x3
	prob += x3<=limits[2]

prob += 0.5*x1 >= z     #Constraint 1
prob += x2 >= z     #Constraint 2
prob += x3-0.1*x1 >= z     #Constraint 3
prob += 1.1675*(x1+c3)+x2+c2+c4>=c1
prob += 1.1675*(x1+c3)+x2+c2+c4<=c1

 
# defines the objective function to maximize
prob += z

cbc_solver = solvers.COIN_CMD(msg=3)
LpSolverDefault.msg = 1

status = prob.solve()
LpStatus[status]

print("x1=",value(x1))
print("x2=",value(x2))
print("x3",value(x3))
print("z=",value(z))
