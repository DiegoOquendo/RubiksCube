//Containers
var cubeContainer = document.getElementById("cube");
var UContainer = document.getElementById("U");
var MidContainer = document.getElementById("Mid");
var BTContainer = document.getElementById("BT");
var BContainer = document.getElementById("B");
//Scene, cameras and renders
var scene = new THREE.Scene();

var cameraCube = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var rendererCube = new THREE.WebGLRenderer();

var cameraU = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
var rendererU = new THREE.WebGLRenderer();

var cameraL = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
var rendererL = new THREE.WebGLRenderer();

var cameraF = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
var rendererF = new THREE.WebGLRenderer();

var cameraR = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
var rendererR = new THREE.WebGLRenderer();

var cameraBT = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
var rendererBT = new THREE.WebGLRenderer();

var cameraB = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
var rendererB = new THREE.WebGLRenderer();
//Controls
var controls = new THREE.OrbitControls(cameraCube);
//Append canvas
cubeContainer.appendChild(rendererCube.domElement);
UContainer.appendChild(rendererU.domElement);
MidContainer.appendChild(rendererL.domElement);
MidContainer.appendChild(rendererF.domElement);
MidContainer.appendChild(rendererR.domElement);
BTContainer.appendChild(rendererBT.domElement);
BContainer.appendChild(rendererB.domElement);

//Set positions
rendererCube.setSize(window.innerWidth, window.innerHeight);
rendererCube.setClearColor(0x555555, 1);
cameraCube.position.set(4, 4, 4);//Eye
cameraCube.lookAt(0, 0, 0);//At

rendererU.setSize(100, 100);
rendererU.setClearColor(0x555555, 1);
cameraU.position.set(0, 4, 0);//Eye
cameraU.lookAt(0, 0, 0);//At

rendererL.setSize(100, 100);
rendererL.setClearColor(0x555555, 1);
cameraL.position.set(-4, 0, 0);//Eye
cameraL.lookAt(0, 0, 0);//At

rendererF.setSize(100, 100);
rendererF.setClearColor(0x555555, 1);
cameraF.position.set(0, 0, 4);//Eye
cameraF.lookAt(0, 0, 0);//At

rendererBT.setSize(100, 100);
rendererBT.setClearColor(0x555555, 1);
cameraBT.position.set(0, -4, 0);//Eye
cameraBT.lookAt(0, 0, 0);//At

rendererR.setSize(100, 100);
rendererR.setClearColor(0x555555, 1);
cameraR.position.set(4, 0, 0);//Eye
cameraR.lookAt(0, 0, 0);//At

rendererB.setSize(100, 100);
rendererB.setClearColor(0x555555, 1);
cameraB.position.set(0, 0, -4);//Eye
cameraB.lookAt(0, 0, 0);//At
//Create Cube
var geomCube = new THREE.BoxGeometry(1, 1, 1);
var matCube = new THREE.MeshPhongMaterial({
    specular: 0xFFFFFF,
    vertexColors: THREE.VertexColors,
    shininess: 50,
    wireframe: false,
});
//Some usefull variable
var cubes = [];
var moves = [];
var KEYS = true;
var MOV = false;
//Mesh cubes
for (let i = 0; i < 26; i++) {
    var cube = new THREE.Mesh(geomCube.clone(), matCube.clone());
    cubes.push(cube);
}
//Begin de scene
splitCubes();
colorCubes();
addCubesToScene();
//Create faces
var F = [];//FRONT FACE
for (let i = 0; i < 9; i++) {
    F.push(cubes[i]);
}
var M1 = [];//MIDDLE 1 FACE
for (let i = 9; i < 17; i++) {
    M1.push(cubes[i]);
}
var B = [];//BACK FACE
for (let i = 17; i < 26; i++) {
    B.push(cubes[i]);
}
var R = [];//RIGHT FACE
R.push(cubes[2], cubes[5], cubes[8], cubes[11], cubes[13], cubes[16], cubes[19], cubes[22], cubes[25]);
var M2 = [];//MIDDLE 2 FACE
M2.push(cubes[1], cubes[4], cubes[7], cubes[10], cubes[15], cubes[18], cubes[21], cubes[24]);
var L = [];//LEFT FACE
L.push(cubes[0], cubes[3], cubes[6], cubes[9], cubes[12], cubes[14], cubes[17], cubes[20], cubes[23]);
var U = [];//UP FACE
U.push(cubes[0], cubes[1], cubes[2], cubes[9], cubes[10], cubes[11], cubes[17], cubes[18], cubes[19]);
var M3 = [];//MIDDLE 2 FACE
M3.push(cubes[3], cubes[4], cubes[5], cubes[12], cubes[13], cubes[20], cubes[21], cubes[22]);
var BT = [];//BOTTOM FACE
BT.push(cubes[6], cubes[7], cubes[8], cubes[14], cubes[15], cubes[16], cubes[23], cubes[24], cubes[25]);
//Lights
var l1 = new THREE.DirectionalLight(0xFFFFFF, .2);
l1.position.set(-5, 5, -5).normalize();
var l2 = new THREE.DirectionalLight(0xFFFFFF, .2);
l2.position.set(5, -5, 5).normalize();
scene.add(l1, l2);

var ambientLight = new THREE.AmbientLight(0xFFFFFF);
scene.add(ambientLight);
//Animate
function animate(time) {
    rendererCube.render(scene, cameraCube);
    rendererU.render(scene, cameraU);
    rendererL.render(scene, cameraL);
    rendererF.render(scene, cameraF);
    rendererR.render(scene, cameraR);
    rendererBT.render(scene, cameraBT);
    rendererB.render(scene, cameraB);
    controls.update();
    window.requestAnimationFrame(animate);
}
animate(0);

function addCubesToScene() {
    for (let i = 0; i < cubes.length; i++) {
        scene.add(cubes[i]);
    }
}
function splitCubes() {
    space = 1.1;
    for (let i = 0; i < cubes.length; i++) {
        if (i <= 8) {
            cubes[i].position.z += space;
            if (i < 3) {
                cubes[i].position.y += space;
                if (i == 0) { cubes[i].position.x -= space; }
                if (i == 2) { cubes[i].position.x += space; }
            } else if (i > 2 && i < 6) {
                if (i == 3) { cubes[i].position.x -= space; }
                if (i == 5) { cubes[i].position.x += space; }
            } else {
                cubes[i].position.y -= space;
                if (i == 6) { cubes[i].position.x -= space; }
                if (i == 8) { cubes[i].position.x += space; }
            }
        } else if (i >= 9 && i <= 16) {
            if (i >= 9 && i <= 11) {
                cubes[i].position.y += space;
                if (i == 9) { cubes[i].position.x -= space; }
                if (i == 11) { cubes[i].position.x += space; }
            } else if (i >= 12 && i <= 13) {
                if (i == 12) { cubes[i].position.x -= space; }
                if (i == 13) { cubes[i].position.x += space; }
            } else {
                cubes[i].position.y -= space;
                if (i == 14) { cubes[i].position.x -= space; }
                if (i == 16) { cubes[i].position.x += space; }
            }
        } else {
            cubes[i].position.z -= space;
            if (i >= 17 && i <= 19) {
                cubes[i].position.y += space;
                if (i == 17) { cubes[i].position.x -= space; }
                if (i == 19) { cubes[i].position.x += space; }
            } else if (i >= 20 && i <= 22) {
                if (i == 20) { cubes[i].position.x -= space; }
                if (i == 22) { cubes[i].position.x += space; }
            } else {
                cubes[i].position.y -= space;
                if (i == 23) { cubes[i].position.x -= space; }
                if (i == 25) { cubes[i].position.x += space; }
            }
        }
    }
}
function colorCubes() {
    for (let i = 0; i < cubes.length; i++) {
        for (let j = 0; j < cubes[i].geometry.faces.length; j += 2) {
            cubes[i].geometry.faces[j].color.setHex(0x000);
            cubes[i].geometry.faces[j + 1].color.setHex(0x000);

        }
        if (i < 9) {
            for (let j = 0; j < cubes[i].geometry.faces.length; j += 2) {
                if (j == 8) {
                    cubes[i].geometry.faces[j].color.setHex(0xFF0000);
                    cubes[i].geometry.faces[j + 1].color.setHex(0xFF0000);
                }
            }
        }
        if (i >= 17 && i <= 25) {
            for (let j = 0; j < cubes[i].geometry.faces.length; j += 2) {
                if (j == 10) {
                    cubes[i].geometry.faces[j].color.setHex(0xed9212);
                    cubes[i].geometry.faces[j + 1].color.setHex(0xed9212);
                }
            }
        }
        if (i == 0 || i == 1 || i == 2 || i == 9 || i == 10 || i == 11 || i == 17 || i == 18 || i == 19) {
            for (let j = 0; j < cubes[i].geometry.faces.length; j += 2) {
                if (j == 4) {
                    cubes[i].geometry.faces[j].color.setHex(0x0000FF);
                    cubes[i].geometry.faces[j + 1].color.setHex(0x0000FF);
                }
            }
        }
        if (i == 2 || i == 5 || i == 8 || i == 11 || i == 13 || i == 16 || i == 19 || i == 22 || i == 25) {
            for (let j = 0; j < cubes[i].geometry.faces.length; j += 2) {
                if (j == 0) {
                    cubes[i].geometry.faces[j].color.setHex(0xFFFF00);
                    cubes[i].geometry.faces[j + 1].color.setHex(0xFFFF00);
                }
            }
        }
        if (i == 6 || i == 7 || i == 8 || i == 14 || i == 15 || i == 16 || i == 23 || i == 24 || i == 25) {
            for (let j = 0; j < cubes[i].geometry.faces.length; j += 2) {
                if (j == 6) {
                    cubes[i].geometry.faces[j].color.setHex(0x00FF00);
                    cubes[i].geometry.faces[j + 1].color.setHex(0x00FF00);
                }
            }
        }
        if (i == 0 || i == 3 || i == 6 || i == 9 || i == 12 || i == 14 || i == 17 || i == 20 || i == 23) {
            for (let j = 0; j < cubes[i].geometry.faces.length; j += 2) {
                if (j == 2) {
                    cubes[i].geometry.faces[j].color.setHex(0xFFFFFF);
                    cubes[i].geometry.faces[j + 1].color.setHex(0xFFFFFF);
                }
            }
        }
    }
}
//Functios to move
function calRotationMatrix(ang, axis) {
    //ang in deg
    ang = ang * Math.PI / 180;
    var m = new THREE.Matrix4();
    var c = Math.cos(ang);
    var s = Math.sin(ang);
    if (axis == 1) {//Axis X
        m.set(
            1, 0, 0, 0,
            0, c, -s, 0,
            0, s, c, 0,
            0, 0, 0, 1
        );
        return m;
    } else if (axis == 2) {//Axis Y
        m.set(
            c, 0, s, 0,
            0, 1, 0, 0,
            -s, 0, c, 0,
            0, 0, 0, 1
        );
        return m;
    } else {//Axis Z
        m.set(
            c, -s, 0, 0,
            s, c, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        );
        return m;
    }
}
function rotate(M, ang, axis) {
    disableKeys();
    let vel = [1, 3, 9];
    let cont = 0;
    let a = vel[1];
    if (ang < 0) { a *= -1; }
    function animate2(time) {
        if (MOV) {
            rendererCube.render(scene, cameraCube);
            if (cont < 90 / Math.abs(a)) {
                for (let i = 0; i < M.length; i++) {
                    M[i].applyMatrix(calRotationMatrix(a, axis));
                }
                cont++;
            } else {
                enableKeys();
                return;
            }
        }
        window.requestAnimationFrame(animate2);
    }
    setTimeout(animate2(0), 2000);
    return M;
}
function rotateF(ang, F) {
    let F2 = [];
    let F3 = [];
    F2 = F;
    let rot1 = [6, 3, 0, 7, 4, 1, 8, 5, 2];
    let rot2 = [2, 5, 8, 1, 4, 7, 0, 3, 6];
    F = rotate(F, ang, 3);
    if (ang > 0) {
        for (let i = 0; i < F.length; i++) {
            F3.push(F2[rot2[i]]);
        }
    } else {
        for (let i = 0; i < F.length; i++) {
            F3.push(F2[rot1[i]]);
        }
    }
    //UP
    U[0] = F3[0];
    U[1] = F3[1];
    U[2] = F3[2];
    //L
    L[0] = F3[0];
    L[1] = F3[3];
    L[2] = F3[6];
    //BT
    BT[0] = F3[6];
    BT[1] = F3[7];
    BT[2] = F3[8];
    //R
    R[0] = F3[2];
    R[1] = F3[5];
    R[2] = F3[8];
    //M2
    M2[0] = F3[1];
    M2[1] = F3[4];
    M2[2] = F3[7];
    //M3
    M3[0] = F3[3];
    M3[1] = F3[4];
    M3[2] = F3[5];
    return F3;
}
function rotateM1(ang, N) {
    // let M = calRotationMatrix(ang, 3);
    let N2 = [];
    let N3 = [];
    N2 = N;
    let rot1 = [5, 3, 0, 6, 1, 7, 4, 2];
    let rot2 = [2, 4, 7, 1, 6, 0, 3, 5];
    // for (let i = 0; i < N.length; i++) {
    //     N[i].applyMatrix(M);
    // }
    N = rotate(N, ang, 3);
    if (ang > 0) {
        for (let i = 0; i < N.length; i++) {
            N3.push(N2[rot2[i]]);
        }
    } else {
        for (let i = 0; i < N.length; i++) {
            N3.push(N2[rot1[i]]);
        }
    }
    //UP
    U[3] = N3[0];
    U[4] = N3[1];
    U[5] = N3[2];
    //L
    L[3] = N3[0];
    L[4] = N3[3];
    L[5] = N3[5];
    //BT
    BT[3] = N3[5];
    BT[4] = N3[6];
    BT[5] = N3[7];
    // BT[5].position.y = -3;
    //R
    R[3] = N3[2];
    R[4] = N3[4];
    R[5] = N3[7];
    //M2
    M2[3] = N3[1];
    M2[4] = N3[6];
    //M3
    M3[3] = N3[3];
    M3[4] = N3[4];
    return N3;
}
function rotateB(ang, B) {
    // let M = calRotationMatrix(ang, 3);
    let B2 = [];
    let B3 = [];
    B2 = B;
    let rot1 = [6, 3, 0, 7, 4, 1, 8, 5, 2];
    let rot2 = [2, 5, 8, 1, 4, 7, 0, 3, 6];
    // for (let i = 0; i < B.length; i++) {
    //     B[i].applyMatrix(M);
    // }
    B = rotate(B, ang, 3);
    if (ang > 0) {
        for (let i = 0; i < B.length; i++) {
            B3.push(B2[rot2[i]]);
        }
    } else {
        for (let i = 0; i < B.length; i++) {
            B3.push(B2[rot1[i]]);
        }
    }
    //UP
    U[6] = B3[0];
    U[7] = B3[1];
    U[8] = B3[2];
    //L
    L[6] = B3[0];
    L[7] = B3[3];
    L[8] = B3[6];
    //BT
    BT[6] = B3[6];
    BT[7] = B3[7];
    BT[8] = B3[8];
    //R
    R[6] = B3[2];
    R[7] = B3[5];
    R[8] = B3[8];
    //M2
    M2[5] = B3[1];
    M2[6] = B3[4];
    M2[7] = B3[7];
    //M3
    M3[5] = B3[3];
    M3[6] = B3[4];
    M3[7] = B3[5];
    return B3;
}
function rotateU(ang, U) {
    // let M = calRotationMatrix(ang, 2);
    let U2 = [];
    let U3 = [];
    U2 = U;
    let rot1 = [6, 3, 0, 7, 4, 1, 8, 5, 2];
    let rot2 = [2, 5, 8, 1, 4, 7, 0, 3, 6];
    // for (let i = 0; i < U.length; i++) {
    //     U[i].applyMatrix(M);
    // }
    U = rotate(U, ang, 2);
    if (ang > 0) {
        for (let i = 0; i < U.length; i++) {
            U3.push(U2[rot1[i]]);
        }
    } else {
        for (let i = 0; i < U.length; i++) {
            U3.push(U2[rot2[i]]);
        }
    }
    //F
    F[0] = U3[0];
    F[1] = U3[1];
    F[2] = U3[2];
    //R
    R[0] = U3[2];
    R[3] = U3[5];
    R[6] = U3[8];
    //B
    B[0] = U3[6];
    B[1] = U3[7];
    B[2] = U3[8];
    //L
    L[0] = U3[0];
    L[3] = U3[3];
    L[6] = U3[6];
    //M1
    M1[0] = U3[3];
    M1[1] = U3[4];
    M1[2] = U3[5];
    //M2
    M2[0] = U3[1];
    M2[3] = U3[4];
    M2[5] = U3[7];
    return U3;
}
function rotateM3(ang, N) {
    // let M = calRotationMatrix(ang, 2);
    let N2 = [];
    let N3 = [];
    N2 = N;
    let rot1 = [5, 3, 0, 6, 1, 7, 4, 2];
    let rot2 = [2, 4, 7, 1, 6, 0, 3, 5];
    // for (let i = 0; i < N.length; i++) {
    //     N[i].applyMatrix(M);
    // }
    N = rotate(N, ang, 2);
    if (ang > 0) {
        for (let i = 0; i < N.length; i++) {
            N3.push(N2[rot1[i]]);
        }
    } else {
        for (let i = 0; i < N.length; i++) {
            N3.push(N2[rot2[i]]);
        }
    }
    //F
    F[3] = N3[0];
    F[4] = N3[1];
    F[5] = N3[2];
    //R
    R[1] = N3[2];
    R[4] = N3[4];
    R[7] = N3[7];
    //B
    B[3] = N3[5];
    B[4] = N3[6];
    B[5] = N3[7];
    //L
    L[1] = N3[0];
    L[4] = N3[3];
    L[7] = N3[5];
    //M1
    M1[3] = N3[3];
    M1[4] = N3[4];
    //M2
    M2[1] = N3[1];
    M2[6] = N3[6];
    return N3;
}
function rotateBT(ang, BT) {
    // let M = calRotationMatrix(ang, 2);
    let BT2 = [];
    let BT3 = [];
    BT2 = BT;
    let rot1 = [6, 3, 0, 7, 4, 1, 8, 5, 2];
    let rot2 = [2, 5, 8, 1, 4, 7, 0, 3, 6];
    // for (let i = 0; i < BT.length; i++) {
    //     BT[i].applyMatrix(M);
    // }
    BT = rotate(BT, ang, 2);
    if (ang > 0) {
        for (let i = 0; i < BT.length; i++) {
            BT3.push(BT2[rot1[i]]);
        }
    } else {
        for (let i = 0; i < BT.length; i++) {
            BT3.push(BT2[rot2[i]]);
        }
    }
    //F
    F[6] = BT3[0];
    F[7] = BT3[1];
    F[8] = BT3[2];
    //B
    B[6] = BT3[6];
    B[7] = BT3[7];
    B[8] = BT3[8];
    //R
    R[2] = BT3[2];
    R[5] = BT3[5];
    R[8] = BT3[8];
    //L
    L[2] = BT3[0];
    L[5] = BT3[3];
    L[8] = BT3[6];
    //M1
    M1[5] = BT3[3];
    M1[6] = BT3[4];
    M1[7] = BT3[5];
    //M2
    M2[2] = BT3[1];
    M2[4] = BT3[4];
    M2[7] = BT3[7];
    return BT3;
}
function rotateL(ang, L) {
    // let M = calRotationMatrix(ang, 1);
    let L2 = [];
    let L3 = [];
    L2 = L;
    let rot1 = [6, 3, 0, 7, 4, 1, 8, 5, 2];
    let rot2 = [2, 5, 8, 1, 4, 7, 0, 3, 6];
    // for (let i = 0; i < L.length; i++) {
    //     L[i].applyMatrix(M);
    // }
    L = rotate(L, ang, 1);
    if (ang > 0) {
        for (let i = 0; i < L.length; i++) {
            L3.push(L2[rot1[i]]);
        }
    } else {
        for (let i = 0; i < L.length; i++) {
            L3.push(L2[rot2[i]]);
        }
    }
    //UP
    U[0] = L3[0];
    U[3] = L3[3];
    U[6] = L3[6];
    //F
    F[0] = L3[0];
    F[3] = L3[1];
    F[6] = L3[2];
    //BT
    BT[0] = L3[2];
    BT[3] = L3[5];
    BT[6] = L3[8];
    //B
    B[0] = L3[6];
    B[3] = L3[7];
    B[6] = L3[8];
    //M1
    M1[0] = L3[3];
    M1[3] = L3[4];
    M1[5] = L3[5];
    //M3
    M3[0] = L3[1];
    M3[3] = L3[4];
    M3[5] = L3[7];
    return L3;
}
function rotateM2(ang, N) {
    // let M = calRotationMatrix(ang, 1);
    let N2 = [];
    let N3 = [];
    N2 = N;
    let rot1 = [5, 3, 0, 6, 1, 7, 4, 2];
    let rot2 = [2, 4, 7, 1, 6, 0, 3, 5];
    // for (let i = 0; i < N.length; i++) {
    //     N[i].applyMatrix(M);
    // }
    N = rotate(N, ang, 1);
    if (ang > 0) {
        for (let i = 0; i < N.length; i++) {
            N3.push(N2[rot1[i]]);
        }
    } else {
        for (let i = 0; i < N.length; i++) {
            N3.push(N2[rot2[i]]);
        }
    }
    //UP
    U[1] = N3[0];
    U[4] = N3[3];
    U[7] = N3[5];
    //F
    F[1] = N3[0];
    F[4] = N3[1];
    F[7] = N3[2];
    //BT
    BT[1] = N3[2];
    BT[4] = N3[4];
    BT[7] = N3[7];
    //B
    B[1] = N3[5];
    B[4] = N3[6];
    B[7] = N3[7];
    //M1
    M1[1] = N3[3];
    M1[6] = N3[4];
    //M3
    M3[1] = N3[1];
    M3[6] = N3[6];
    return N3;
}
function rotateR(ang, R) {
    // let M = calRotationMatrix(ang, 1);
    let R2 = [];
    let R3 = [];
    R2 = R;
    let rot1 = [6, 3, 0, 7, 4, 1, 8, 5, 2];
    let rot2 = [2, 5, 8, 1, 4, 7, 0, 3, 6];
    // for (let i = 0; i < R.length; i++) {
    //     R[i].applyMatrix(M);
    // }
    R = rotate(R, ang, 1);
    if (ang > 0) {
        for (let i = 0; i < R.length; i++) {
            R3.push(R2[rot1[i]]);
        }
    } else {
        for (let i = 0; i < R.length; i++) {
            R3.push(R2[rot2[i]]);
        }
    }
    //UP
    U[2] = R3[0];
    U[5] = R3[3];
    U[8] = R3[6];
    //F
    F[2] = R3[0];
    F[5] = R3[1];
    F[8] = R3[2];
    //BT
    BT[2] = R3[2];
    BT[5] = R3[5];
    BT[8] = R3[8];
    //B
    B[2] = R3[6];
    B[5] = R3[7];
    B[8] = R3[8];
    //M1
    M1[2] = R3[3];
    M1[4] = R3[4];
    M1[7] = R3[5];
    //M3
    M3[2] = R3[1];
    M3[4] = R3[4];
    M3[7] = R3[7];
    return R3;
}
//Keys to move
$(document).keydown(function (e) {
    if (KEYS) {
        if (e.shiftKey) {
            switch (e.which) {
                case 70:
                    F = rotateF(-90, F);
                    moves.push("F'");
                    break;
                case 49:
                    M1 = rotateM1(-90, M1);
                    moves.push("M1'");
                    break;
                case 66:
                    B = rotateB(-90, B);
                    moves.push("B'");
                    break;
                case 85:
                    U = rotateU(-90, U);
                    moves.push("U'");
                    break;
                case 51:
                    M3 = rotateM3(-90, M3);
                    moves.push("M3'");
                    break;
                case 84:
                    BT = rotateBT(-90, BT);
                    moves.push("BT'");
                    break;
                case 76:
                    L = rotateL(-90, L);
                    moves.push("L'");
                    break;
                case 50:
                    M2 = rotateM2(-90, M2);
                    moves.push("M2'");
                    break;
                case 82:
                    R = rotateR(-90, R);
                    moves.push("R'");
                    break;
            }
        } else {
            switch (e.which) {
                case 70:
                    F = rotateF(90, F);
                    moves.push("F");
                    break;
                case 49:
                    M1 = rotateM1(90, M1);
                    moves.push("M1");
                    break;
                case 66:
                    B = rotateB(90, B);
                    moves.push("B");
                    break;
                case 85:
                    U = rotateU(90, U);
                    moves.push("U");
                    break;
                case 51:
                    M3 = rotateM3(90, M3);
                    moves.push("M3");
                    break;
                case 84:
                    BT = rotateBT(90, BT);
                    moves.push("BT");
                    break;
                case 76:
                    L = rotateL(90, L);
                    moves.push("L");
                    break;
                case 50:
                    M2 = rotateM2(90, M2);
                    moves.push("M2");
                    break;
                case 82:
                    R = rotateR(90, R);
                    moves.push("R");
                    break;
                case 83:
                    // console.log("Solving");
                    // MOV = true;
                    // solveCube();
                    break;
            }
        }
    }
});
//
//Keyboard enable and disable
function disableKeys() {
    KEYS = false;
    MOV = true;
}
function enableKeys() {
    KEYS = true;
    MOV = false;
}
//
//SOLVE - in testing
function solveCube() {
    while (moves.length > 0) {
        if (MOV) {
            switch (moves.pop()) {
                case "F":
                    F = rotateF(-90, F);
                    break;
                case "F'":
                    F = rotateF(90, F);
                    break;
                case "M1":
                    M1 = rotateM1(-90, M1);
                    break;
                case "M1'":
                    M1 = rotateM1(90, M1);
                    break;
                case "B":
                    B = rotateB(-90, B);
                    break;
                case "B'":
                    B = rotateB(90, B);
                    break;
                case "U":
                    U = rotateU(-90, U);
                    break;
                case "U'":
                    U = rotateU(90, U);
                    break;
                case "M3":
                    M3 = rotateM3(-90, M3);
                    break;
                case "M3'":
                    M3 = rotateM3(90, M3);
                    break;
                case "BT":
                    BT = rotateBT(-90, BT);
                    break;
                case "BT'":
                    BT = rotateBT(90, BT);
                    break;
                case "L":
                    L = rotateL(-90, L);
                    break;
                case "L'":
                    L = rotateL(90, L);
                    break;
                case "M2":
                    M2 = rotateM2(-90, M2);
                    break;
                case "M2'":
                    M2 = rotateM2(90, M2);
                    break;
                case "R":
                    R = rotateR(-90, R);
                    break;
                case "R'":
                    R = rotateR(90, R);
                    break;
            }
        }
    }
}