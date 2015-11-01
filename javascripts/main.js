var pObjA = [];
var pProp = [];

var D = 500;
var t = 0;
var counter = 0;
var PI = Math.PI;
var dTheta = PI/256;
var theta = 0;
var a = cuboidMaker(50,50,300);
var b = cuboidMaker(150,50,50);
var leg = combiner(a,b);
var sphere2 = [];
sphere2 = sphereMaker(100);
var cuboid70 = cuboidMaker(300,200,100);
var canvas = document.getElementById("c");
context = canvas.getContext("2d");
var cubeHeight = $("#button-cube").position().top;
topDifference = 20;
var clickState = 0;

$("#button-cube").click(function(){
	clickState ++;
	if (clickState % 2 === 1)
	{
		$("#button-cube").text("Tranform!");
		var cube = cuboidMaker(100,100,100);
		if ($(".getTransfromArgs").length === 0)
		{
			for(var i = 0; i < 12; i ++)
			{
				var text = "<- Enter ";

				if (i % 3 === 0)
				{
					text += 'x';
				}
				else if (i % 3 === 1)
				{
					text += 'y';
				}
				else if(i % 3 === 2)
				{
					text += 'z';
				}
	
				if (i >=0 && i <= 2)
				{
					text += " starting position";
				}
				else if (i >= 3 && i <= 5)
				{
					text += " rotational velocity";
				}
				else if (i >= 6 && i <= 8)
				{
					text += " coordinate to rotate about";
				}
				else if (i >= 9 && i <=11)
				{
					text += " translational velocity";
				}

				$("#transFromArguments").append("<input class='getTransfromArgs' type='text'>" + text +"</input>");
			}	
		}
	}
	else if (clickState % 2 === 0)
	{
		var argsA = [];
		for (var i = 0; i < $(".getTransfromArgs").length; i++)
		{
			currentValue = $($(".getTransfromArgs")[i]).val();
			argsA.push(Number(currentValue));
		}
		var cuboidd = cuboidMaker(50,50,50);
		transform(argsA[0],argsA[1],argsA[2],cuboidd,argsA[3],argsA[4],argsA[5],argsA[6],argsA[7],argsA[8],argsA[9],argsA[10],argsA[11]);
		$(".getTransfromArgs").remove();
		$("#transFromArguments").text("");
	}
});
function copy(arr)
{
	return arr.concat([]);
}

function miniRotate(dis1,dis2,dis3,q,xA,yA,zA,XF,YF,ZF,theta)
{
	var objArray = [];
	objArray.push(q);

	var vMini = []
	vMini.push({xA:xA,yA:yA,zA:zA,d1:dis1,d2:dis2,d3:dis3,xF:XF,yF:YF,zF:ZF});
	var holder = dTheta;
	dTheta = theta;

	turn(objArray,vMini)

	dTheta = holder;
}

function displacer (q,d1,d2,d3)
{
	q.forEach(function(qSubA){
		qSubA.forEach(function(qPoint){

			qPoint.x = qPoint.x + d1;
			qPoint.y = qPoint.y + d2;
			qPoint.z = qPoint.z + d3;
		});
	});

	return q;
}

function cuboidMaker(width,length,height)
{
	var face1 = [{x:0,y:0,z:0},{x:0,y:width,z:0},{x:0,y:width,z:height},{x:0,y:0,z:height},{x:0,y:0,z:0}];
	var face2 = [{x:0,y:width,z:0}, {x:length,y:width,z:0},{x:length,y:width,z:height},{x:0,y:width,z:height},{x:0,y:width,z:0}];
	var face3 = [{x:length,y:width,z:0},{x:length,y:0,z:0},{x:length,y:0,z:height},{x:length,y:width,z:height},{x:length,y:width,z:0}];
	var face4 = [{x:length,y:0,z:0},{x:0,y:0,z:0},{x:0,y:0,z:height},{x:length,y:0,z:height},{x:length,y:0,z:0}];
	var face5 = [{x:0,y:width,z:height},{x:0,y:0,z:height},{x:length,y:0,z:height},{x:length,y:width,z:height},{x:0,y:width,z:height}];
	var face6 = [{x:length,y:width,z:0},{x:length,y:0,z:0},{x:0,y:0,z:0},{x:0,y:width,z:0},{x:length,y:width,z:0}];

	return [face1,face2,face3,face4]//,face5,face6];
	//return[face2]
}

/*{
	var line1 = [{x:0,y:width,z:height},{x:0,y:0,z:height},{x:length,y:0,z:height},{x:length,y:width,z:height},{x:length,y:width,z:0},{x:0,y:width,z:0},{x:0,y:width,z:height},{x:length,y:width,z:height}]

	var line2 = [{x:0,y:width,z:0},{x:0,y:0,z:0},{x:0,y:0,z:height}];
	var line3 = [{x:0,y:0,z:0},{x:length,y:0,z:0},{x:length,y:0,z:height}]
	var line4 = [{x:length,y:width,z:0},{x:length,y:0,z:0}]

	return [line1,line2,line3,line4];
}
*/
function combiner (object1,object2)
{
	return object1.concat(object2);
}

function planeLineIntersect (line,plane)
{
	var A = plane.A;
	var B = plane.B;
	var E = plane.D;
	var m = line.m;
	var n = line.n;
	var P = line.P;
	var Q = line.Q;

	var Bdn = B / n;
	var xNum = Bdn * (Q - P) - P - E;
	var xDen = A + m * (Bdn + 1);
	var x = xNum / xDen;
	var mx = m * x;
	var y = (mx + P - Q) / n;
	var z = mx + P;
	return {x:x,y:y,z:z};
}

function planeMaker (p1,p2,p3)  //takes in three points and creates plane
{
	var x1 = p1.x;
	var x2 = p2.x;
	var x3 = p3.x;
	var y1 = p1.y;
	var y2 = p2.y;
	var y3 = p3.y;
	var z1 = p1.z;
	var z2 = p2.z;
	var z3 = p3.z;

	var zDelt2 = z2 - z1
	var yDelt1 = y3 - y1;
	var yDelt2 = y1 - y2;
	var zDelt1 = z3 - z1;
	var xDelt1 = x1 - x3;
	var xDelt2 = x2 - x1;

	var ANum = (zDelt2 * yDelt1 / yDelt2) + zDelt1;
	var ADen = xDelt1 - xDelt2 * yDelt1 / yDelt2;

	var A = ANum / ADen;
	var B = (A * xDelt2 + zDelt2) / yDelt2;
	var D = (-1 * A * x3) - (B * y3) - z3;

	return {A:A,B:B,D:D};
}

function sphereMaker(r)
{
	var j = 0;
	var sphere = [];
	for(var m =-r;m<=r;m+=r/10)
	{
		sphere.push([])
		sphere.push([])
		var r2 = Math.sqrt(r*r-m*m);

		for (var n = -Math.sqrt(r*r-m*m);n<=Math.sqrt(r*r-m*m);n+=4)
		{
			var y2 = Math.sqrt(r2*r2-n*n);
			sphere[j+1].push({x:n,y:y2,z:m});
			sphere[j].push({x:n,y:-y2,z:m});
		}

		sphere[j+1].push({x:Math.sqrt(r*r-m*m),y:0,z:m});
		sphere[j].push({x:Math.sqrt(r*r-m*m),y:0,z:m});

		j += 2;
	}
	return sphere;
}
function a(num)
{
	return Math.abs(num)
}

function turn (objA,pProp)
{
	objA.forEach(function(p,l){

		var pPrime = [];

		p.forEach(function(pSubA,m){

			var proxyArray = [];
			pPrime.push(proxyArray);
			pSubA.forEach(function(pPoint,n){
				var prop = pProp[l];

				var xRot = mathTurn(prop.xA,prop.yF,prop.zF,pPoint.y,pPoint.z);
	
				 pPoint.y = xRot.a;
				 pPoint.z = xRot.b;

				var yRot = mathTurn(prop.yA,prop.xF,prop.zF,pPoint.x,pPoint.z);

				pPoint.x = yRot.a;
				pPoint.z = yRot.b;

				var zRot = mathTurn(prop.zA,prop.xF,prop.yF,pPoint.x,pPoint.y);

				pPoint.x = zRot.a;
				pPoint.y = zRot.b;

				function mathTurn(A,F1,F2,v1,v2,v3)
				{
					var prime1 = (v1 - F1) * Math.cos(A * dTheta) - (v2 - F2) * Math.sin(A * dTheta) + F1;
					var prime2 = (v2 - F2) * Math.cos(A * dTheta) + (v1 - F1) * Math.sin(A * dTheta) + F2;

					return {a:prime1,b:prime2,z: v3};
				}
			})
		})
	})
}

function move(pA)
{
	var l = 0;
	pA.forEach(function(pObject){
		var propV = pProp[l];

		pObject.forEach(function(pSubA){

			pSubA.forEach(function(pPoint){

				pPoint.x = pPoint.x + propV.x;
				pPoint.y = pPoint.y + propV.y;
				pPoint.z = pPoint.z + propV.z;
			});
		});
		l++;
	});
}

function pointConvert(x,w)
{
	return  w * D / (x + D);
}

function draw (pA)
{
	function printPlane(plane)
	{
		var xLim = 100;
		var yLim = 100;

		var A = plane.A;
		var B = plane.B;
		var E = plane.D;

		for(var x = 0;x < xLim;x += 2)
		{
			for(var y = 0;y < yLim;y += 2)
			{
				var y1 = y + 1;
				var x1 = x + 1;
				var z = makeZ(x,y);
				var z1 = makeZ(x,y1);

				function makeZ(x,y)
				{
					return (-1 * A * x) - (B * y) - E;
				}

				graph(x,y,z,x1,y1,z1);
			}
		}
	}

	function graph(x1,y1,z1,x2,y2,z2)
	{
		var gy1 = pointConvert(x1,y1);
		var gz1 = pointConvert(x1,z1);
		var gy2 = pointConvert(x2,y2);
		var gz2 = pointConvert(x2,z2);

		//call a function that checks if it is an area that should be seen, or is obscured but the object or another object

		if (x1 > - D)
		{
            context.beginPath();
            context.moveTo(gy1 + 00, gz1);
            context.lineTo(gy2 + 00, gz2);
            context.lineWidth = .3;
            context.closePath();
            context.stroke();
        }
	}

	function graphLine(line)
	{
		var xLim = 500;
		var m = line.m;
		var n = line.n;
		var P = line.P;
		var Q = line.Q;

		for(var x = 0;x < xLim; x++)
		{
			function makeZ(x)
			{
				return  m * x + P;
			}
			function makeY(z)
			{
				return  (z - Q) / n;
			}

			var z = makeZ(x);
			var z1 = makeZ(x + 1);
			var y = makeY(z);
			var y1 = makeY(z1);

			graph(x,y,z,x,y1,z1);
		}
	}
	// graphLine(line70);
	// printPlane(plane70);
	// circle(point70y,point70z,2,1);

	pA.forEach(function(pObject,l){              //pA - Array of objects
		pObject.forEach(function(pFace,m){         //pObject Physical object
			//console.log((pFace[0].y < pFace[1].y),m);
			//if (pFace[0].y <= pFace[1].y)
			{
				work = 0;
				if (counter < 100)
				{
					console.log("face length is ",pFace.length);
					counter ++;
					var pointInQ = {x:null,y:null};
					pointInQ.x = pFace[0].x + pFace[2].x;
					pointInQ.y = pFace[0].y + pFace[2].y;
					checksIfBehind(pFace,pointInQ);
				}
				for(var n = 0; n < pFace.length - 1; n ++)
				{
					var pPoint = pFace[n];
					var pPoint1 =  pFace[n + 1];
					var x1 = pPoint.x;
					var x2 = pPoint1.x;
					var y1 = pPoint.y;
					var y2 = pPoint1.y
					var z1 = pPoint.z;
					var z2 = pPoint1.z;
					
					graph(x1,y1,z1,x2,y2,z2);
				}
			}
		});
	});
}
function checksIfBehind(face,piq)
{
	console.log("point in question is ",piq);
	var dw = 0;
	var work = 0;

	face.forEach(function(point,index){
		var lastPoint = face.length -1;
		if (index === lastPoint)
		{
			//use the first point
			// doWork(point,face[0]);
		}
		else
		{
			doWork(point,face[index + 1])
		}
	});
	function doWork(point1,point2)
    {
    	var x3 = point1.x;
		var y3 = point1.y;
		var x4 = point2.x;
		var y4 = point2.y;
    	point = {x:1,y:-10};
    	// var path = [{x:0,y:0},{x:6,y:3},{x:0,y:7}];
        var x1 = x3 - piq.x;
        var x2 = x4 - piq.x;
        var y2 = y4 - piq.y;
        var y1 = y3 - piq.y;

        if (x2 - x1 === 0)
        {
           x2 += .000000000001
        }
        console.log("y2 and y1 is ",y2,y1);
        var m = (y2 - y1) / (x2 - x1);
        var m2 = m * m;
        var b = y2 - (m * x2);
        if (b !== 0)
        {
            var A = b / (m2 + 1);
            var arg1 = (x1 + m * b / (m2 + 1)) / A;
            var arg2 = (x2 + m * b / (m2 + 1)) / A;
            var dW = -(Math.atan(arg2) - Math.atan(arg1));
        }
        else if (b === 0)
        {
            dW = 0;
        }

        work += dW;
        console.log("Delta work is ",dW);
        console.log("m :",m);
    }
    console.log("Work in the actual function is ",work);
}
function transform(dis1,dis2,dis3,q,xA,yA,zA,XF,YF,ZF,Vx,Vy,Vz)
{
	pProp.push({xA:xA,yA:yA,zA:zA,d1:dis1,d2:dis2,d3:dis3,xF:XF,yF:YF,zF:ZF,x:Vx,y:Vy,z:Vz});
	createP(q,pProp);
}

function animate()
{
	theta += dTheta;
	//if (theta<1*PI)
	{
		t += .01;
	context.clearRect(0, 0, canvas.width, canvas.height);

	move(pObjA);
	turn(pObjA,pProp);
	draw(pObjA);

	}
//	dTheta = .05*Math.cos(t);
}
function circle (x,y,r,w)
{
    context.lineWidth = w;
    context.beginPath();
    context.arc(x,y,r,0,2 * PI);
    context.closePath();
    context.stroke();
}

function createP(q)
{
	var p = [];
	var l = pProp.length - 1;

	q.forEach(function(qSubA){
		var pArray = [];
		p.push(pArray);

		qSubA.forEach(function(qPoint){
			var prop = pProp[l];
			pArray.push({x: qPoint.x + prop.d1, y: qPoint.y + prop.d2, z:qPoint.z + prop.d3});
		});
	});

	pObjA.push(p);
}

d = displacer(b,0,0,250);

transform(1000,1000,500	,cuboid70,0,0,0,1000,1000,500,0,5,0);
transform(1000,1000,500	,cuboid70,0,0,0,1000,1000,500,10,0,0);
    //displacement,obj,rotXYX ,rotation point, translational velocities

//miniRotate(0,0,0,leg,1,0,0,25,25,0,PI/4)

// var point1 = {x:50,y:200,z:100};
// var point2 = {x:100,y:300,z:100};
// var point3 = {x:150,y:100,z:40};

// plane70 = planeMaker(point1,point2,point3);
// //plane70 = {A:1,B:1,D:-1};
// var line70 = {m:3,P:3,n:1.5,Q:0};

// point70 = planeLineIntersect(line70,plane70);
// point70y = pointConvert(point70.x, point70.y);
// point70z = pointConvert(point70.x, point70.z);


//transform(200,500,600,planeo,0,0,0,300,0,300,-0,-0,0);
var interval = setInterval(animate, 1000 / 20)

