var BrowserDetect = {
	init: function () {
		this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
		this.version = this.searchVersion(navigator.userAgent)
			|| this.searchVersion(navigator.appVersion)
			|| "an unknown version";
		this.OS = this.searchString(this.dataOS) || "an unknown OS";
	},
	searchString: function (data) {
		for (var i=0;i<data.length;i++)	{
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1)
					return data[i].identity;
			}
			else if (dataProp)
				return data[i].identity;
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) return;
		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
	},
	dataBrowser: [
		{
			string: navigator.userAgent,
			subString: "Chrome",
			identity: "Chrome"
		},
		{ 	string: navigator.userAgent,
			subString: "OmniWeb",
			versionSearch: "OmniWeb/",
			identity: "OmniWeb"
		},
		{
			string: navigator.vendor,
			subString: "Apple",
			identity: "Safari",
			versionSearch: "Version"
		},
		{
			prop: window.opera,
			identity: "Opera",
			versionSearch: "Version"
		},
		{
			string: navigator.vendor,
			subString: "iCab",
			identity: "iCab"
		},
		{
			string: navigator.vendor,
			subString: "KDE",
			identity: "Konqueror"
		},
		{
			string: navigator.userAgent,
			subString: "Firefox",
			identity: "Firefox"
		},
		{
			string: navigator.vendor,
			subString: "Camino",
			identity: "Camino"
		},
		{		// for newer Netscapes (6+)
			string: navigator.userAgent,
			subString: "Netscape",
			identity: "Netscape"
		},
		{
			string: navigator.userAgent,
			subString: "MSIE",
			identity: "Explorer",
			versionSearch: "MSIE"
		},
		{
			string: navigator.userAgent,
			subString: "Gecko",
			identity: "Mozilla",
			versionSearch: "rv"
		},
		{ 		// for older Netscapes (4-)
			string: navigator.userAgent,
			subString: "Mozilla",
			identity: "Netscape",
			versionSearch: "Mozilla"
		}
	],
	dataOS : [
		{
			string: navigator.platform,
			subString: "Win",
			identity: "Windows"
		},
		{
			string: navigator.platform,
			subString: "Mac",
			identity: "Mac"
		},
		{
			   string: navigator.userAgent,
			   subString: "iPhone",
			   identity: "iPhone/iPod"
	    },
		{
			string: navigator.platform,
			subString: "Linux",
			identity: "Linux"
		}
	]

};
BrowserDetect.init();

Vector3 = function (x, y, z) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
};
Vector3.prototype = {
    constructor: Vector3,
    set: function (x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    },
    setX: function (x) {
        this.x = x;
        return this;
    },
    setY: function (y) {
        this.y = y;
        return this;
    },
    setZ: function (z) {
        this.z = z;
        return this;
    },
    setComponent: function (index, value) {
        switch (index) {
            case 0:
                this.x = value;
                break;
            case 1:
                this.y = value;
                break;
            case 2:
                this.z = value;
                break;
            default:
                throw new Error('index is out of range: ' + index);
        }
    },
    getComponent: function (index) {
        switch (index) {
            case 0:
                return this.x;
            case 1:
                return this.y;
            case 2:
                return this.z;
            default:
                throw new Error('index is out of range: ' + index);
        }
    },
    copy: function (v) {
        this.x = v.x;
        this.y = v.y;
        this.z = v.z;
        return this;
    },
    add: function (v, w) {
        if (w !== undefined) {
            console.warn('Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead.');
            return this.addVectors(v, w);
        }
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
        return this;
    },
    addScalar: function (s) {
        this.x += s;
        this.y += s;
        this.z += s;
        return this;
    },
    addVectors: function (a, b) {
        this.x = a.x + b.x;
        this.y = a.y + b.y;
        this.z = a.z + b.z;
        return this;
    },
    sub: function (v, w) {
        if (w !== undefined) {
            console.warn('Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.');
            return this.subVectors(v, w);
        }
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
        return this;
    },
    subVectors: function (a, b) {
        this.x = a.x - b.x;
        this.y = a.y - b.y;
        this.z = a.z - b.z;
        return this;
    },
    multiply: function (v, w) {
        if (w !== undefined) {
            console.warn('Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead.');
            return this.multiplyVectors(v, w);
        }
        this.x *= v.x;
        this.y *= v.y;
        this.z *= v.z;
        return this;
    },
    multiplyScalar: function (scalar) {
        this.x *= scalar;
        this.y *= scalar;
        this.z *= scalar;
        return this;
    },
    multiplyVectors: function (a, b) {
        this.x = a.x * b.x;
        this.y = a.y * b.y;
        this.z = a.z * b.z;
        return this;
    },
    applyEuler: function () {
        var quaternion;
        return function (euler) {
            if (euler instanceof Euler === false) {
                console.error('Vector3: .applyEuler() now expects a Euler rotation rather than a Vector3 and order.');
            }
            if (quaternion === undefined) quaternion = new Quaternion();
            this.applyQuaternion(quaternion.setFromEuler(euler));
            return this;
        };
    }(),
    applyAxisAngle: function () {
        var quaternion;
        return function (axis, angle) {
            if (quaternion === undefined) quaternion = new Quaternion();
            this.applyQuaternion(quaternion.setFromAxisAngle(axis, angle));
            return this;
        };
    }(),
    applyMatrix3: function (m) {
        var x = this.x;
        var y = this.y;
        var z = this.z;
        var e = m.elements;
        this.x = e[0] * x + e[3] * y + e[6] * z;
        this.y = e[1] * x + e[4] * y + e[7] * z;
        this.z = e[2] * x + e[5] * y + e[8] * z;
        return this;
    },
    applyMatrix4: function (m) {
        // input: Matrix4 affine matrix
        var x = this.x, y = this.y, z = this.z;
        var e = m.elements;
        this.x = e[0] * x + e[4] * y + e[8] * z + e[12];
        this.y = e[1] * x + e[5] * y + e[9] * z + e[13];
        this.z = e[2] * x + e[6] * y + e[10] * z + e[14];
        return this;
    },
    applyProjection: function (m) {
        // input: Matrix4 projection matrix
        var x = this.x, y = this.y, z = this.z;
        var e = m.elements;
        var d = 1 / (e[3] * x + e[7] * y + e[11] * z + e[15]); // perspective divide
        this.x = (e[0] * x + e[4] * y + e[8] * z + e[12]) * d;
        this.y = (e[1] * x + e[5] * y + e[9] * z + e[13]) * d;
        this.z = (e[2] * x + e[6] * y + e[10] * z + e[14]) * d;
        return this;
    },
    applyQuaternion: function (q) {
        var x = this.x;
        var y = this.y;
        var z = this.z;
        var qx = q.x;
        var qy = q.y;
        var qz = q.z;
        var qw = q.w;
        // calculate quat * vector
        var ix = qw * x + qy * z - qz * y;
        var iy = qw * y + qz * x - qx * z;
        var iz = qw * z + qx * y - qy * x;
        var iw = -qx * x - qy * y - qz * z;
        // calculate result * inverse quat
        this.x = ix * qw + iw * -qx + iy * -qz - iz * -qy;
        this.y = iy * qw + iw * -qy + iz * -qx - ix * -qz;
        this.z = iz * qw + iw * -qz + ix * -qy - iy * -qx;
        return this;
    },
    transformDirection: function (m) {
        // input: Matrix4 affine matrix
        // vector interpreted as a direction
        var x = this.x, y = this.y, z = this.z;
        var e = m.elements;
        this.x = e[0] * x + e[4] * y + e[8] * z;
        this.y = e[1] * x + e[5] * y + e[9] * z;
        this.z = e[2] * x + e[6] * y + e[10] * z;
        this.normalize();
        return this;
    },
    divide: function (v) {
        this.x /= v.x;
        this.y /= v.y;
        this.z /= v.z;
        return this;
    },
    divideScalar: function (scalar) {
        if (scalar !== 0) {
            var invScalar = 1 / scalar;
            this.x *= invScalar;
            this.y *= invScalar;
            this.z *= invScalar;
        } else {
            this.x = 0;
            this.y = 0;
            this.z = 0;
        }
        return this;
    },
    min: function (v) {

        if (this.x > v.x) {
            this.x = v.x;
        }
        if (this.y > v.y) {
            this.y = v.y;
        }
        if (this.z > v.z) {
            this.z = v.z;
        }
        return this;
    },
    max: function (v) {
        if (this.x < v.x) {
            this.x = v.x;
        }
        if (this.y < v.y) {
            this.y = v.y;
        }
        if (this.z < v.z) {
            this.z = v.z;
        }
        return this;
    },
    clamp: function (min, max) {
        // This function assumes min < max, if this assumption isn't true it will not operate correctly
        if (this.x < min.x) {
            this.x = min.x;
        } else if (this.x > max.x) {
            this.x = max.x;
        }
        if (this.y < min.y) {
            this.y = min.y;
        } else if (this.y > max.y) {
            this.y = max.y;
        }
        if (this.z < min.z) {
            this.z = min.z;
        } else if (this.z > max.z) {
            this.z = max.z;
        }
        return this;
    },
    clampScalar: (function () {
        var min, max;
        return function (minVal, maxVal) {
            if (min === undefined) {
                min = new Vector3();
                max = new Vector3();
            }
            min.set(minVal, minVal, minVal);
            max.set(maxVal, maxVal, maxVal);
            return this.clamp(min, max);
        };
    })(),
    floor: function () {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        this.z = Math.floor(this.z);
        return this;
    },
    ceil: function () {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        this.z = Math.ceil(this.z);
        return this;
    },
    round: function () {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        this.z = Math.round(this.z);
        return this;
    },
    roundToZero: function () {
        this.x = (this.x < 0) ? Math.ceil(this.x) : Math.floor(this.x);
        this.y = (this.y < 0) ? Math.ceil(this.y) : Math.floor(this.y);
        this.z = (this.z < 0) ? Math.ceil(this.z) : Math.floor(this.z);
        return this;
    },
    negate: function () {
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;
        return this;
    },
    dot: function (v) {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    },
    lengthSq: function () {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    },
    length: function () {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    },
    lengthManhattan: function () {
        return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
    },
    normalize: function () {
        return this.divideScalar(this.length());
    },
    setLength: function (l) {
        var oldLength = this.length();
        if (oldLength !== 0 && l !== oldLength) {
            this.multiplyScalar(l / oldLength);
        }
        return this;
    },
    lerp: function (v, alpha) {
        this.x += (v.x - this.x) * alpha;
        this.y += (v.y - this.y) * alpha;
        this.z += (v.z - this.z) * alpha;
        return this;
    },
    cross: function (v, w) {
        if (w !== undefined) {
            console.warn('Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead.');
            return this.crossVectors(v, w);
        }
        var x = this.x, y = this.y, z = this.z;
        this.x = y * v.z - z * v.y;
        this.y = z * v.x - x * v.z;
        this.z = x * v.y - y * v.x;
        return this;
    },
    crossVectors: function (a, b) {
        var ax = a.x, ay = a.y, az = a.z;
        var bx = b.x, by = b.y, bz = b.z;
        this.x = ay * bz - az * by;
        this.y = az * bx - ax * bz;
        this.z = ax * by - ay * bx;
        return this;
    },
    projectOnVector: function () {
        var v1, dot;
        return function (vector) {
            if (v1 === undefined) v1 = new Vector3();
            v1.copy(vector).normalize();
            dot = this.dot(v1);
            return this.copy(v1).multiplyScalar(dot);
        };
    }(),
    projectOnPlane: function () {
        var v1;
        return function (planeNormal) {
            if (v1 === undefined) v1 = new Vector3();
            v1.copy(this).projectOnVector(planeNormal);
            return this.sub(v1);
        }
    }(),
    reflect: function () {
        // reflect incident vector off plane orthogonal to normal
        // normal is assumed to have unit length
        var v1;
        return function (normal) {
            if (v1 === undefined) v1 = new Vector3();
            return this.sub(v1.copy(normal).multiplyScalar(2 * this.dot(normal)));
        }
    }(),
    angleTo: function (v) {
        var theta = this.dot(v) / (this.length() * v.length());
        // clamp, to handle numerical problems
        return Math.acos(Math.clamp(theta, -1, 1));
    },
    distanceTo: function (v) {
        return Math.sqrt(this.distanceToSquared(v));
    },
    distanceToSquared: function (v) {
        var dx = this.x - v.x;
        var dy = this.y - v.y;
        var dz = this.z - v.z;
        return dx * dx + dy * dy + dz * dz;
    },
    getPositionFromMatrix: function (m) {
        console.warn('Vector3: .getPositionFromMatrix() has been renamed to .setFromMatrixPosition().');
        return this.setFromMatrixPosition(m);
    },
    getScaleFromMatrix: function (m) {
        console.warn('Vector3: .getScaleFromMatrix() has been renamed to .setFromMatrixScale().');
        return this.setFromMatrixScale(m);
    },
    getColumnFromMatrix: function (index, matrix) {
        console.warn('Vector3: .getColumnFromMatrix() has been renamed to .setFromMatrixColumn().');
        return this.setFromMatrixColumn(index, matrix);
    },
    setFromMatrixPosition: function (m) {
        this.x = m.elements[12];
        this.y = m.elements[13];
        this.z = m.elements[14];
        return this;
    },
    setFromMatrixScale: function (m) {
        var sx = this.set(m.elements[0], m.elements[1], m.elements[2]).length();
        var sy = this.set(m.elements[4], m.elements[5], m.elements[6]).length();
        var sz = this.set(m.elements[8], m.elements[9], m.elements[10]).length();
        this.x = sx;
        this.y = sy;
        this.z = sz;
        return this;
    },
    setFromMatrixColumn: function (index, matrix) {
        var offset = index * 4;
        var me = matrix.elements;
        this.x = me[offset];
        this.y = me[offset + 1];
        this.z = me[offset + 2];
        return this;
    },
    equals: function (v) {
        return ((v.x === this.x) && (v.y === this.y) && (v.z === this.z));
    },
    fromArray: function (array) {
        this.x = array[0];
        this.y = array[1];
        this.z = array[2];
        return this;
    },
    toArray: function () {
        return [this.x, this.y, this.z];
    },
    clone: function () {
        return new Vector3(this.x, this.y, this.z);
    }
};

var updateEnabled = true, initialloader = true;
var canvas = null, canvas2 = null;
var scene = null, scene2 = null;
var scenePollInterval;
var outstandingJobs, totalJobs;
var animationLoading;

function isInfinityRTReady() {
    if (!scene || !scene2)
        return;
    scene.start();
    scene2.start();
    outstandingJobs = scene.getOutstandingJobs() + scene2.getOutstandingJobs();
    if (!(scene._projectparsed && scene._projectparsed)) {
        // ignore
    } else if (outstandingJobs <= 0 && scene._prepared && scene2._prepared) {
        onInfinityRTReady();
        clearInterval(scenePollInterval);
    } else if (scene._projectparsed) {
        clearInterval(animationLoading);
        updateProgressBar();
    }
}

function updateProgressBar() {
    totalJobs = scene.getTotalJobs() + scene2.getTotalJobs();
    outstandingJobs = scene.getOutstandingJobs() + scene2.getOutstandingJobs();
    var perc = 100 - Math.round(outstandingJobs / totalJobs * 100);
    var newwidth = 50 + 156 * perc / 100;
    document.getElementById("loaderbar").style.width = newwidth + "px";
}

function applySceneOverrides() {
    scene._jitRadius = 2.0;
    scene2._jitRadius = 2.0;
    scene._bDoF = false;
    scene2._bDoF = false;
    scene.fovy = 30;
    scene2.fovy = 30;
    updateBoth();
}

function onInfinityRTReady() {
    window.addEventListener('focus', onWindowFocus, false);
    window.addEventListener('blur', onWindowBlur, false);
    applySceneOverrides();
    sceneSync = true;

    var gotopos = catalog.positions[0].gotopos;
    scene.gotoPosInTime(gotopos[0], gotopos[1], gotopos[2], gotopos[3], gotopos[4], 1000);

    end = new Date().getTime();
    var time = end - start;
    console.log('End time: ' + time);
    document.getElementById('transparentPatch').style.display = 'none';
    document.getElementById("scenediv").style.visibility = "visible";
    scene.loadProgressiveTextures = true;
	scene2.loadProgressiveTextures = true;
	scene.activeGlow = true;
	scene2.activeGlow = true;
}

function hideInitialLoader() {
	initialloader = false;
    document.getElementById("loader").style.display = "none";
	document.getElementById("canvasContainer").style.visibility = "visible";
	document.getElementById("canvasContainer2").style.visibility = "visible";
	document.getElementById('loader1').style.display = "none";
	document.getElementById('loader2').style.display = "none";
	document.getElementById('transPatch2').style.display = "none";
	document.getElementById('transPatch').style.display = "none";
	document.getElementById('scenediv').style.display = 'block';
	document.getElementById('container').style.display = 'block';
        if(mob){document.getElementById('mobile').style.display = 'block';}
        else{document.getElementById('desktop').style.display = 'block';}
	
}

function InfinityRTStart(gl, producturl) {
    var scenechange = (scene != null);
    scene = new infinityrt_scene({
        rtgl: gl,
        useDraco: false,
        loadProgressiveTextures: scenechange,
        shared: catalog.shared,
        activeGlow: false
    }, producturl, canvas.width, canvas.height);
    if (scenechange) {
        animationLoading = setInterval(function() {
            if (scene._projectparsed && scene.getOutstandingJobs() <= 0 && scene._prepared) {
                clearInterval(animationLoading);
                applySceneOverrides();
                document.getElementById('loader').style.display = "none";
                document.getElementById('loader1').style.display = 'none';
            }
        }, 100);
    }
    scene.start();
    if (scene2)
        scene._nav = scene2._nav;
}

function InfinityRTStart2(gl, producturl) {
    var scenechange2 = (scene2 != null);
    scene2 = new infinityrt_scene({
        rtgl: gl,
        useDraco: false,
        loadProgressiveTextures: scenechange2,
        shared: catalog.shared,
        activeGlow: false
    }, producturl, canvas2.width, canvas2.height);
    if (scenechange2) {
        animationLoading = setInterval(function() {
            if (scene2._projectparsed && scene2.getOutstandingJobs() <= 0 && scene2._prepared) {
                clearInterval(animationLoading);
                applySceneOverrides();
                document.getElementById('loader').style.display = "none";
                document.getElementById('loader2').style.display = 'none';
            }
        }, 100);
    }
    scene2.start();
    if (scene)
        scene2._nav = scene._nav;
}

var mob = (navigator.userAgent.indexOf("iPhone") != -1) || ((navigator.userAgent.indexOf("Android") != -1) || (navigator.userAgent.indexOf("Mobile") != -1)) || (navigator.userAgent.indexOf('iPad') != -1) || (navigator.userAgent.indexOf('iPod') != -1);


function addMouseListeners(canvas) {
    canvas.addEventListener('mousemove', mouseMove, false);
    canvas.addEventListener('mousedown', mouseDown, false);
    canvas.addEventListener('mouseup', mouseUp, false);
    canvas.addEventListener('mousewheel', mouseWheel, false);
    canvas.addEventListener('DOMMouseScroll', mouseWheel, false);
    canvas.addEventListener('mouseout', mouseOut, false);
    canvas.addEventListener('touchstart', touchStart, false);
    canvas.addEventListener('touchmove', touchMove, false);
    canvas.addEventListener('touchend', touchEndCan, false);
}

var catalog;
var compareselected = [];

document.addEventListener("DOMContentLoaded", function (event) {
    var j;
    var jsonhttp = new XMLHttpRequest();
    jsonhttp.open("GET", "products.json", true);
    jsonhttp.onload = function (e) {
        catalog = JSON.parse(jsonhttp.response);
        var cmbs = [
            document.getElementById("cmbLeft"),
            document.getElementById("cmbRight")
        ];
        for(j = 0; j < cmbs.length; j++) {
            for (var product in catalog.products) {
                var p = catalog.products[product];
                var opt = document.createElement('li');
                opt.appendChild( document.createTextNode(p.name) );
                opt.id = product;
                if (catalog.initial[j] == product)
                    opt.selected = true;
                cmbs[j].appendChild(opt);
            }
        }
        compareselected = catalog.initial.slice();
        var leftDropdown = false; 
        var rightDropdown = false; 
        document.getElementById('leftButton').addEventListener('click',function(){
            leftDropdown = !leftDropdown;
            if(leftDropdown){ document.getElementById("cmbLeft").style.display = 'block';}
            else{ document.getElementById("cmbLeft").style.display = 'none';}
        });
        document.getElementById('rightButton').addEventListener('click',function(){
            rightDropdown = !rightDropdown;
            if(rightDropdown){ document.getElementById("cmbRight").style.display = 'block';}
            else{ document.getElementById("cmbRight").style.display = 'none';}
        });
        
        document.getElementById('leftButton').innerHTML = compareselected[0];
        document.getElementById('model1').innerHTML = compareselected[0];
        document.getElementById('rightButton').innerHTML = compareselected[1];
        document.getElementById('model2').innerHTML = compareselected[1];
        var list = document.querySelectorAll('#cmbLeft li');
        var list2 = document.querySelectorAll('#cmbRight li');
        list.forEach(function(el){
            el.addEventListener('click', function(e){
                leftSelect(e.target.id);
                document.getElementById("cmbLeft").style.display = 'none';
            })
        });
        list2.forEach(function(el){
            el.addEventListener('click', function(e){
                rightSelect(e.target.id);
                document.getElementById("cmbRight").style.display = 'none';
            })
        });
function leftSelect(selectedname){
    var selectedname;
    if (selectedname != compareselected[0]) {
                compareselected[0] = selectedname;
                document.getElementById('leftButton').innerHTML = compareselected[0];
                document.getElementById('model1').innerHTML = compareselected[0];
                document.getElementById('loader1').style.display = 'block';
                InfinityRTStart(context, catalog.products[selectedname].url);
            }
}
function rightSelect(selectedname){
    var selectedname;
    if (selectedname != compareselected[1]) {
                compareselected[1] = selectedname;
                document.getElementById('rightButton').innerHTML = compareselected[1];
                document.getElementById('model2').innerHTML = compareselected[1];
                document.getElementById('loader2').style.display = 'block';
                InfinityRTStart2(context2, catalog.products[selectedname].url);
            }
            setTimeout(function(){document.getElementById('loader2').style.display = 'none';},5000);
}
       
       if(mob){
           var myobj = document.getElementById("desktop");
            myobj.remove();
       }else{
           var myobj2 = document.getElementById("mobile");
            myobj2.remove();           
       }
       
        for(j = 1; j < catalog.positions.length && j < 5; j++) {
            var cp = document.getElementById('camerapos'+j);
            cp.idx = j;
            var para = document.createElement("p");
            var node = document.createTextNode(catalog.positions[j].name);
            para.appendChild(node);
            cp.appendChild(para);
            cp.addEventListener('click', function (event) {
                document.querySelectorAll(".btn").forEach(function(el){
                    el.classList.remove("selected");
                });
                var gotopos = catalog.positions[this.idx].gotopos;
                scene.gotoPosInTime(gotopos[0], gotopos[1], gotopos[2], gotopos[3], gotopos[4], 1000);
                this.classList.add("selected");           
            });
        }

        isWebGlSupported();
    };
    jsonhttp.send("");
});

document.onselectstart = function () {
    return false;
};

var btnDrag = false;

function mouseOverBtnDrag() {
    btnDrag = true;
}

function mouseOutBtnDrag() {
    setTimeout(function () {
        btnDrag = false;
    }, 100);
}

function onRightClick(event) {
    return false; //suppress context menu
}

function onWindowFocus() {
    updateEnabled = true;
}

function onWindowBlur() {
    updateEnabled = false;
}

function updateBoth() {
    scene.clearRefine();
    scene2.clearRefine();
}

function frameUpdate() {
    if (scene._refineCount < 64 || scene2._refineCount < 64) {
        var bGotoPosUpdate = scene._nav._navGotoPosActive;

        var vmat = scene._nav.NavCreateViewMatrix(catalog.cameramatrix);
        var mmat = scene._nav.NavCreateModelMatrix(catalog.cameramatrix);

        if (scene._refineCount < 64) {
            scene.setViewMatrix(vmat);
            scene.setModelMatrix(mmat);
            scene.draw();
        }

        if (scene2._refineCount < 64) {
            scene2.setViewMatrix(vmat);
            scene2.setModelMatrix(mmat);
            scene2.draw();
        }

        if (bGotoPosUpdate)
            updateBoth();
            
        if (initialloader && scene.loadProgressiveTextures && scene2.loadProgressiveTextures)
        		hideInitialLoader();
    }
    setTimeout(function(){
    	window.requestAnimationFrame(frameUpdate);
    }, scene.backoff);
}

var mpos = [0, 0];
var mdown = false;
var panNav = false;

function getScene(ev) {
    var s = scene;
    if (scene2 != null && ev.currentTarget == canvas2)
        s = scene2;
    return s;
}

function mouseDown(ev) {
    handClosed();
    if (ev.which == 3) {
        panNav = true;
    }
    var mouseDownPos = [ev.clientX - canvas.offsetLeft, ev.clientY - canvas.offsetTop];
    if (!scene.onClick(mouseDownPos, ev.button)) {
        mdown = true;
        mpos = mouseDownPos;
    }
}

function mouseUp(ev) {
    handOpen();
    mdown = false;
    if (ev.which == 3 || panNav) panNav = false;
}

function mouseOut(ev) {
    mdown = false;
    if (ev.which == 3 || panNav) panNav = false;
    handOpen();
}

function mouseMove(ev) {
    if (!mdown)
        return;
    var s = getScene(ev);
    var mousePos = [ev.clientX - canvas.offsetLeft, ev.clientY - canvas.offsetTop];
    var mdelta = [(mpos[0] - mousePos[0]), (mpos[1] - mousePos[1])];
    mpos = [mousePos[0], mousePos[1]];

    if (!panNav) {
        mdelta[0] *= 0.2;
        mdelta[1] *= 0.2;
        if (s._nav.NavRotation(mpos, mdelta))
            updateBoth();
    } else {
        var mdelta2 = [mdelta[0], mdelta[1]];
        if (s._nav.NavPan(mdelta2))
            updateBoth();
    }
}

function mouseWheel(ev) {
    if (!updateEnabled || mdown || !animStoped) return;
    if (!ev) {
        ev = window.event;
    } /* IE7, IE8, Chrome, Safari */
    if (ev.preventDefault) {
        ev.preventDefault();
    } /* Chrome, Safari, Firefox */
    ev.returnValue = false; /* IE7, IE8 */

    var s = getScene(ev);
    var delta = ev.wheelDelta ? ev.wheelDelta : (-ev.detail * 10.0);
    var deltaScene = (delta * 0.5) * (0.04) * 2;
    if (s._nav.NavChangeDolly(deltaScene)) {
        updateBoth();
    }
}

var animStoped = true;

var dragCursor;
var curBrowser = BrowserDetect.browser;
// IE doesn't support co-ordinates
var cursCoords = (curBrowser == "Explorer") ? "" : " 4 4";

function initDragCursor() {
    handOpen();
}

function handClosed() {
    dragCursor = (curBrowser == "Firefox") ? "-moz-grabbing" : "url(images/closedhand.cur)" + cursCoords + ", move";
    // Opera doesn't support url cursors and doesn't fall back well...
    if (curBrowser == "Opera") dragCursor = "move";
    document.getElementById('infinityrt-canvas').style.cursor = dragCursor;
    document.getElementById('infinityrt-canvas2').style.cursor = dragCursor;
}

function handOpen() {
    dragCursor = (curBrowser == "Firefox") ? "-moz-grab" : "url(images/openhand.cur)" + cursCoords + ", move";
    document.getElementById('infinityrt-canvas').style.cursor = dragCursor;
    document.getElementById('infinityrt-canvas2').style.cursor = dragCursor;
}

var touches = [new Vector3(), new Vector3(), new Vector3()];
var prevTouches = [new Vector3(), new Vector3(), new Vector3()];
var prevDistance = null;

function touchStart(event) {
    switch (event.touches.length) {
        case 1:
            touches[0].set(event.touches[0].pageX, event.touches[0].pageY, 0);
            touches[1].set(event.touches[0].pageX, event.touches[0].pageY, 0);
            break;
        case 2:
            touches[0].set(event.touches[0].pageX, event.touches[0].pageY, 0);
            touches[1].set(event.touches[1].pageX, event.touches[1].pageY, 0);
            prevDistance = touches[0].distanceTo(touches[1]);
            break;
    }
    prevTouches[0].copy(touches[0]);
    prevTouches[1].copy(touches[1]);
}

var doubleTouch = false;

function touchMove(event) {
    var s = getScene(event);
    event.preventDefault();
    event.stopPropagation();
    var getClosest = function (touch, touches) {
        var closest = touches[0];
        for (var i in touches) {
            if (closest.distanceTo(touch) > touches[i].distanceTo(touch)) closest = touches[i];
        }
        return closest;
    };
    switch (event.touches.length) {
        case 1:
            if (doubleTouch == false) {
                touches[0].set(event.touches[0].pageX, event.touches[0].pageY, 0);
                touches[1].set(event.touches[0].pageX, event.touches[0].pageY, 0);
                if (s._nav.NavRotation([touches[0].x, touches[0].y], [(prevTouches[0].x - touches[0].x) * 0.5, (prevTouches[0].y - touches[0].y) * 0.5]))
                    updateBoth();
            }
            break;
        case 2:
            doubleTouch = true;
            touches[0].set(event.touches[0].pageX, event.touches[0].pageY, 0);
            touches[1].set(event.touches[1].pageX, event.touches[1].pageY, 0);
            distance = touches[0].distanceTo(touches[1]);
            var deltaScene = -(prevDistance - distance);
            if (s._nav.NavChangeDolly(deltaScene))
                updateBoth();
            prevDistance = distance;
            var offset0 = touches[0].clone().sub(getClosest(touches[0], prevTouches));
            var offset1 = touches[1].clone().sub(getClosest(touches[1], prevTouches));
            offset0.x = -offset0.x;
            offset1.x = -offset1.x;
            var mdelta2 = [offset1.x * 0.5, -offset1.y * 0.5];
            if (s._nav.NavPan(mdelta2))
                updateBoth();
            break;
    }
    prevTouches[0].copy(touches[0]);
    prevTouches[1].copy(touches[1]);
}

function touchEndCan(event) {
    setTimeout(function () {
        doubleTouch = false;
    }, 1000);
}

var context = null, context2 = null;
function isWebGlSupported() {
    var canvasSupported = !!window.HTMLCanvasElement;
    var ua = navigator.userAgent.toLowerCase();
    var isAtLeastIE10 = (ua.match(/Trident\/[6]/i)); //test IE10;
    if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) { //test for MSIE x.x;
        var ieversion = new Number(RegExp.$1) // capture x.x portion and store as a number
        // if (ieversion >= 9 || ieversion >= 8) var IeUser = true;
    }
    if (ieversion >= 5 || ieversion >= 6 || ieversion >= 7 || ieversion >= 8 || ieversion >= 9 || isAtLeastIE10) {
        canvasSupported = false;
    }
    if (canvasSupported) {
        canvas = document.getElementById("infinityrt-canvas");
        context = infinityrt_getwebglcontext(canvas);

        canvas2 = document.getElementById("infinityrt-canvas2");
        context2 = infinityrt_getwebglcontext(canvas2);

        canvasSupported = !!(window.WebGLRenderingContext && context && context2);
    }
    if (canvasSupported) {
        addLoader();

        InfinityRTStart(context, catalog.products[catalog.initial[0]].url);
        scene._nav = new infinityrt_navigation(scene, canvas.width, canvas.height);
        InfinityRTStart2(context2, catalog.products[catalog.initial[1]].url);

        scenePollInterval = setInterval("isInfinityRTReady()", 100);
        start = new Date().getTime();
        var canvasDummy = document.getElementById("infinityrt-canvas");
        addMouseListeners(canvasDummy);
        var canvasDummy2 = document.getElementById("infinityrt-canvas2");
        addMouseListeners(canvasDummy2);
        if (scene != null) {
            window.requestAnimationFrame(frameUpdate);
            document.body.oncontextmenu = onRightClick;
        }
        initDragCursor();
    }
}

function addLoader() {
    var ldr = document.getElementById('loader');
    ldr.style.display = 'block';
    document.getElementById('transPatch').style.display = 'block';

    var newDiv = document.createElement("div");
    newDiv.id = "loaderbar";
    newDiv.style.marginTop = "-115px";
    newDiv.style.width = "1px";
    newDiv.style.outline = "none";
    newDiv.style.overflow = "hidden";
    var img2 = new Image();
    img2.onload = function () {
        newDiv.appendChild(img2);
    };
    img2.style.outline = "none";
    img2.src = 'images/loaderbar.png';
    ldr.appendChild(newDiv);
}
