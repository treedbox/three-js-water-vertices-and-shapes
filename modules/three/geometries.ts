import {
    BoxGeometry,
    Geometry,
    BoxBufferGeometry,
    CircleGeometry,
    CircleBufferGeometry,
    ConeGeometry,
    ConeBufferGeometry,
    CylinderGeometry,
    CylinderBufferGeometry,
    DodecahedronGeometry,
    DodecahedronBufferGeometry,
    EdgesGeometry,
    ExtrudeGeometry,
    ExtrudeBufferGeometry,
    IcosahedronGeometry,
    IcosahedronBufferGeometry,
    LatheGeometry,
    LatheBufferGeometry,
    OctahedronGeometry,
    OctahedronBufferGeometry,
    ParametricGeometry,
    ParametricBufferGeometry,
    PlaneGeometry,
    PlaneBufferGeometry,
    PolyhedronGeometry,
    PolyhedronBufferGeometry,
    RingGeometry,
    RingBufferGeometry,
    ShapeGeometry,
    ShapeBufferGeometry,
    SphereGeometry,
    SphereBufferGeometry,
    TetrahedronGeometry,
    TetrahedronBufferGeometry,
    TextGeometry,
    TextBufferGeometry,
    TorusGeometry,
    TorusBufferGeometry,
    TorusKnotGeometry,
    TorusKnotBufferGeometry,
    TubeGeometry,
    TubeBufferGeometry,
    WireframeGeometry,
    MeshBasicMaterial,
    DoubleSide,
    Material,
    Mesh,
    Scene,
    Shape,
    Vector2,
    FontLoader,
    Vector3,
    QuadraticBezierCurve3
} from "three";
import { Functions } from "modules/interfaces";
import { ParametricGeometries } from "three/examples/jsm/geometries/ParametricGeometries";

import { setBufferGeometryLoader } from "./loaders";
import { randomColor } from "./colors";

// TypeError: Cannot read property 'computeFrenetFrames' of undefined
const setTubeBufferGeometry = (obj: any) => {
    const numPoints = 10;
    const start = new Vector3(-0.5, 0, 0.2);
    // const start = new Vector3(-5, 0, 20);
    const middle = new Vector3(0, 0.35, 0);
    const end = new Vector3(0.5, 0, -1.0);

    const curveQuad = new QuadraticBezierCurve3(start, middle, end);
    return new TubeBufferGeometry(curveQuad, numPoints, 0.2, 10, false);
    // return new TubeBufferGeometry(
    //     obj.path,
    //     obj.tubularSegments,
    //     obj.radius,
    //     obj.radialSegments,
    //     obj.closed
    // );
};
// TypeError: Cannot read property 'computeFrenetFrames' of undefined
const setTubeGeometry = (obj: any) => {
    const numPoints = 10;
    const start = new Vector3(-0.5, 0, 0.2);
    // const start = new Vector3(-5, 0, 20);
    const middle = new Vector3(0, 0.35, 0);
    const end = new Vector3(0.5, 0, -1.0);

    const curveQuad = new QuadraticBezierCurve3(start, middle, end);
    return new TubeGeometry(curveQuad, numPoints, 0.2, 10, false);
    // return new TubeGeometry(
    //     obj.path,
    //     obj.tubularSegments,
    //     obj.radius,
    //     obj.radialSegments,
    //     obj.closed
    // );
};

const setTorusKnotBufferGeometry = (obj: any) => {
    return new TorusKnotBufferGeometry(
        obj.radius,
        obj.tube,
        obj.tubularSegments,
        obj.radialSegments,
        obj.p,
        obj.q
    );
};
const setTorusKnotGeometry = (obj: any) => {
    return new TorusKnotGeometry(
        obj.radius,
        obj.tube,
        obj.tubularSegments,
        obj.radialSegments,
        obj.p,
        obj.q
    );
};

const setTorusBufferGeometry = (obj: any) => {
    return new TorusBufferGeometry(
        obj.radius,
        obj.tube,
        obj.radialSegments,
        obj.tubularSegments
    );
};
const setTorusGeometry = (obj: any) => {
    return new TorusGeometry(
        obj.radius,
        obj.tube,
        obj.radialSegments,
        obj.tubularSegments
    );
};
const setTextBufferGeometry = (obj: any) => {
    const loader = new FontLoader();
    return new Promise((resolve, reject) => {
        loader.load(
            "./assets/fonts/typeface/helvetiker_regular.typeface.json",
            function(font) {
                const geometry = new TextGeometry(obj.text, {
                    font,
                    size: obj.size,
                    height: obj.height,
                    curveSegments: obj.curveSegments,
                    bevelEnabled: obj.bevelEnabled,
                    bevelThickness: obj.bevelThickness,
                    bevelSize: obj.bevelSize,
                    bevelOffset: obj.bevelOffset,
                    bevelSegments: obj.bevelSegments
                });
                resolve(geometry);
            }
        );
    });
};
// TextGeometry: font parameter is not an instance of THREE.Font.
const setTextGeometry = (obj: any) => {
    const loader = new FontLoader();
    return new Promise((resolve, reject) => {
        loader.load(
            "./assets/fonts/typeface/helvetiker_regular.typeface.json",
            function(font) {
                const geometry = new TextGeometry(obj.text, {
                    font,
                    size: obj.size,
                    height: obj.height,
                    curveSegments: obj.curveSegments,
                    bevelEnabled: obj.bevelEnabled,
                    bevelThickness: obj.bevelThickness,
                    bevelSize: obj.bevelSize,
                    bevelOffset: obj.bevelOffset,
                    bevelSegments: obj.bevelSegments
                });
                resolve(geometry);
            }
        );
    });
    // return new TextGeometry(obj.text, obj.parameters);
};

const setTetrahedronBufferGeometry = (obj: any) => {
    return new TetrahedronBufferGeometry(obj.radius, obj.detail);
};
const setTetrahedronGeometry = (obj: any) => {
    return new TetrahedronGeometry(obj.radius, obj.detail);
};

const setSphereBufferGeometry = (obj: any) => {
    return new SphereBufferGeometry(
        obj.radius,
        obj.widthSegments,
        obj.heightSegments,
        obj.phiStart,
        obj.phiLength,
        obj.thetaStart,
        obj.thetaLength
    );
};
const setSphereGeometry = (obj: any) => {
    return new SphereGeometry(
        obj.radius,
        obj.widthSegments,
        obj.heightSegments,
        obj.phiStart,
        obj.phiLength,
        obj.thetaStart,
        obj.thetaLength
    );
};
// TypeError: Cannot read property 'extractPoints' of undefined
const setShapeBufferGeometry = (obj: any) => {
    const x = 0,
        y = 0;

    const heartShape = new Shape();

    heartShape.moveTo(x + 0.5, y + 0.5);
    heartShape.bezierCurveTo(x + 0.5, y + 0.5, x + 0.4, y, x, y);
    heartShape.bezierCurveTo(x - 0.6, y, x - 0.6, y + 0.7, x - 0.6, y + 0.7);
    heartShape.bezierCurveTo(
        x - 0.6,
        y + 1.1,
        x - 0.3,
        y + 1.54,
        x + 0.5,
        y + 1.9
    );
    heartShape.bezierCurveTo(
        x + 1.2,
        y + 1.54,
        x + 1.6,
        y + 1.1,
        x + 1.6,
        y + 0.7
    );
    heartShape.bezierCurveTo(x + 1.6, y + 0.7, x + 1.6, y, x + 1.0, y);
    heartShape.bezierCurveTo(x + 0.7, y, x + 0.5, y + 0.5, x + 0.5, y + 0.5);

    return new ShapeBufferGeometry(heartShape, obj.curveSegments);
    // return new ShapeBufferGeometry(obj.shapes, obj.curveSegments);
};
// TypeError: Cannot read property 'extractPoints' of undefined
const setShapeGeometry = (obj: any) => {
    const x = 0,
        y = 0;

    const heartShape = new Shape();

    heartShape.moveTo(x + 0.5, y + 0.5);
    heartShape.bezierCurveTo(x + 0.5, y + 0.5, x + 0.4, y, x, y);
    heartShape.bezierCurveTo(x - 0.6, y, x - 0.6, y + 0.7, x - 0.6, y + 0.7);
    heartShape.bezierCurveTo(
        x - 0.6,
        y + 1.1,
        x - 0.3,
        y + 1.54,
        x + 0.5,
        y + 1.9
    );
    heartShape.bezierCurveTo(
        x + 1.2,
        y + 1.54,
        x + 1.6,
        y + 1.1,
        x + 1.6,
        y + 0.7
    );
    heartShape.bezierCurveTo(x + 1.6, y + 0.7, x + 1.6, y, x + 1.0, y);
    heartShape.bezierCurveTo(x + 0.7, y, x + 0.5, y + 0.5, x + 0.5, y + 0.5);

    return new ShapeGeometry(heartShape, obj.curveSegments);
    // return new ShapeGeometry(obj.shapes, obj.curveSegments);
};

const setRingBufferGeometry = (obj: any) => {
    return new RingBufferGeometry(
        obj.innerRadius,
        obj.outerRadius,
        obj.thetaSegments,
        obj.phiSegments,
        obj.thetaStart,
        obj.thetaLength
    );
};
const setRingGeometry = (obj: any) => {
    return new RingGeometry(
        obj.innerRadius,
        obj.outerRadius,
        obj.thetaSegments,
        obj.phiSegments,
        obj.thetaStart,
        obj.thetaLength
    );
};

// TypeError: Cannot read property 'length' of undefined
const setPolyhedronBufferGeometry = (obj: any) => {
    const verticesOfCube = [
        -1,
        -1,
        -1,
        1,
        -1,
        -1,
        1,
        1,
        -1,
        -1,
        1,
        -1,
        -1,
        -1,
        1,
        1,
        -1,
        1,
        1,
        1,
        1,
        -1,
        1,
        1
    ];

    const indicesOfFaces = [
        2,
        1,
        0,
        0,
        3,
        2,
        0,
        4,
        7,
        7,
        3,
        0,
        0,
        1,
        5,
        5,
        4,
        0,
        1,
        2,
        6,
        6,
        5,
        1,
        2,
        3,
        7,
        7,
        6,
        2,
        4,
        5,
        6,
        6,
        7,
        4
    ];
    return new PolyhedronBufferGeometry(
        verticesOfCube,
        indicesOfFaces,
        obj.radius,
        obj.detail
    );
};
// TypeError: Cannot read property 'length' of undefined
const setPolyhedronGeometry = (obj: any) => {
    const verticesOfCube = [
        -1,
        -1,
        -1,
        1,
        -1,
        -1,
        1,
        1,
        -1,
        -1,
        1,
        -1,
        -1,
        -1,
        1,
        1,
        -1,
        1,
        1,
        1,
        1,
        -1,
        1,
        1
    ];

    const indicesOfFaces = [
        2,
        1,
        0,
        0,
        3,
        2,
        0,
        4,
        7,
        7,
        3,
        0,
        0,
        1,
        5,
        5,
        4,
        0,
        1,
        2,
        6,
        6,
        5,
        1,
        2,
        3,
        7,
        7,
        6,
        2,
        4,
        5,
        6,
        6,
        7,
        4
    ];
    return new PolyhedronGeometry(
        verticesOfCube,
        indicesOfFaces,
        obj.radius,
        obj.detail
    );
};

const setPlaneBufferGeometry = (obj: any) => {
    return new PlaneBufferGeometry(
        obj.width,
        obj.height,
        obj.widthSegments,
        obj.heightSegments
    );
};
const setPlaneGeometry = (obj: any) => {
    return new PlaneGeometry(
        obj.width,
        obj.height,
        obj.widthSegments,
        obj.heightSegments
    );
};
// TypeError: Cannot read property 'length' of undefined
const setParametricBufferGeometry = (obj: any) => {
    return new ParametricBufferGeometry(ParametricGeometries.klein, 2, 2);
    // return new ParametricBufferGeometry(obj.func, obj.slices, obj.stacks);
};
// TypeError: Cannot read property 'length' of undefined
const setParametricGeometry = (obj: any) => {
    return new ParametricGeometry(ParametricGeometries.klein, 2, 2);
    // return new ParametricGeometry(obj.func, obj.slices, obj.stacks);
};

const setOctahedronBufferGeometry = (obj: any) => {
    return new OctahedronBufferGeometry(obj.radius, obj.detail);
};

const setOctahedronGeometry = (obj: any) => {
    return new OctahedronGeometry(obj.radius, obj.detail);
};
// TypeError: Cannot read property 'length' of undefined
const setLatheBufferGeometry = (obj: any) => {
    const points = [];
    for (let i = 0; i < 2; i++) {
        points.push(new Vector2(Math.sin(i * 0.1) * 1 + 1, (i - 1) * 1));
    }

    return new LatheBufferGeometry(
        points,
        obj.segments,
        obj.phiStart,
        obj.phiLength
    );
};
// TypeError: Cannot read property 'length' of undefined
const setLatheGeometry = (obj: any) => {
    const points = [];
    for (let i = 0; i < 2; i++) {
        points.push(new Vector2(Math.sin(i * 0.1) * 1 + 1, (i - 1) * 1));
    }

    return new LatheGeometry(points, obj.segments, obj.phiStart, obj.phiLength);
};

const setIcosahedronBufferGeometry = (obj: any) => {
    return new IcosahedronBufferGeometry(obj.radius, obj.detail);
};

const setIcosahedronGeometry = (obj: any) => {
    return new IcosahedronGeometry(obj.radius, obj.detail);
};

// ExtrudeGeometry & ExtrudeBufferGeometry
// options
// curveSegments — int. Number of points on the curves. Default is 12.
// steps — int. Number of points used for subdividing segments along the depth of the extruded spline. Default is 1.
// depth — float. Depth to extrude the shape. Default is 100.
// bevelEnabled — bool. Apply beveling to the shape. Default is true.
// bevelThickness — float. How deep into the original shape the bevel goes. Default is 6.
// bevelSize — float. Distance from the shape outline that the bevel extends. Default is bevelThickness - 2.
// bevelOffset — float. Distance from the shape outline that the bevel starts. Default is 0.
// bevelSegments — int. Number of bevel layers. Default is 3.
// extrudePath — THREE.Curve. A 3D spline path along which the shape should be extruded.
// UVGenerator — Object. object that provides UV generator functions

const setExtrudeBufferGeometry = (obj: any) => {
    const length = 0.1,
        width = 0.1;

    const shape = new Shape();
    shape.moveTo(0, 0);
    shape.lineTo(0, width);
    shape.lineTo(length, width);
    shape.lineTo(length, 0);
    shape.lineTo(0, 0);

    const options = {
        steps: 1,
        depth: 1,
        bevelEnabled: true,
        bevelThickness: 1,
        bevelSize: 1,
        bevelOffset: 0,
        bevelSegments: 1
    };

    return new ExtrudeBufferGeometry(shape, options);
};
const setExtrudeGeometry = (obj: any) => {
    const length = 0.1,
        width = 0.1;

    const shape = new Shape();
    shape.moveTo(0, 0);
    shape.lineTo(0, width);
    shape.lineTo(length, width);
    shape.lineTo(length, 0);
    shape.lineTo(0, 0);

    const options = {
        steps: 1,
        depth: 1,
        bevelEnabled: true,
        bevelThickness: 1,
        bevelSize: 1,
        bevelOffset: 0,
        bevelSegments: 1
    };

    return new ExtrudeGeometry(shape, options);
};
//todo: add geometry
const setWireframeGeometry = (geometry: Geometry) => {
    return new WireframeGeometry(geometry);
};
// TypeError: geometry.clone is not a function
const setEdgesGeometry = (geometry: Geometry) => {
    return new EdgesGeometry(geometry);
};

const setDodecahedronBufferGeometry = (obj: any) => {
    return new DodecahedronBufferGeometry(obj.radius, obj.detail);
};

const setDodecahedronGeometry = (obj: any) => {
    return new DodecahedronGeometry(obj.radius, obj.detail);
};

const setCylinderBufferGeometry = (obj: any) => {
    return new CylinderBufferGeometry(
        obj.radiusTop,
        obj.radiusBottom,
        obj.height,
        obj.radialSegments,
        obj.heightSegments,
        obj.openEnded,
        obj.thetaStart,
        obj.thetaLength
    );
};

const setCylinderGeometry = (obj: any) => {
    return new CylinderGeometry(
        obj.radiusTop,
        obj.radiusBottom,
        obj.height,
        obj.radialSegments,
        obj.heightSegments,
        obj.openEnded,
        obj.thetaStart,
        obj.thetaLength
    );
};

const setConeBufferGeometry = (obj: any) => {
    return new ConeBufferGeometry(
        obj.radius,
        obj.height,
        obj.radialSegments,
        obj.heightSegments,
        obj.openEnded,
        obj.thetaStart,
        obj.thetaLength
    );
};

const setConeGeometry = (obj: any) => {
    return new ConeGeometry(
        obj.radius,
        obj.height,
        obj.radialSegments,
        obj.heightSegments,
        obj.openEnded,
        obj.thetaStart,
        obj.thetaLength
    );
};

const setCircleBufferGeometry = (obj: any) => {
    return new CircleBufferGeometry(
        obj.radius,
        obj.segments,
        obj.thetaStart,
        obj.thetaLength
    );
};

const setCircleGeometry = (obj: any) => {
    return new CircleGeometry(
        obj.radius,
        obj.segments,
        obj.thetaStart,
        obj.thetaLength
    );
};
const setBoxBufferGeometry = (obj: any) => {
    return new BoxBufferGeometry(
        obj.width,
        obj.height,
        obj.depth,
        obj.widthSegments,
        obj.heightSegments,
        obj.depthSegments
    );
};
const setBoxGeometry = (obj: any): Geometry => {
    return new BoxGeometry(
        obj.width,
        obj.height,
        obj.depth,
        obj.widthSegments,
        obj.heightSegments,
        obj.depthSegments
    );
};

const geometryTypes: Functions = {
    box: setBoxGeometry,
    boxbuffer: setBoxBufferGeometry,
    circle: setCircleGeometry,
    circlebuffer: setCircleBufferGeometry,
    cone: setConeGeometry,
    conebuffer: setConeBufferGeometry,
    cylinder: setCylinderGeometry,
    cylinderbuffer: setCylinderBufferGeometry,
    dodecahedron: setDodecahedronGeometry,
    dodecahedronbuffer: setDodecahedronBufferGeometry,
    extrude: setExtrudeGeometry,
    extrudebuffer: setExtrudeBufferGeometry,
    icosahedron: setIcosahedronGeometry,
    icosahedronbuffer: setIcosahedronBufferGeometry,
    lathe: setLatheGeometry,
    lathebuffer: setLatheBufferGeometry,
    octahedron: setOctahedronGeometry,
    octahedronbuffer: setOctahedronBufferGeometry,
    parametric: setParametricGeometry,
    parametricbuffer: setParametricBufferGeometry,
    plane: setPlaneGeometry,
    planebuffer: setPlaneBufferGeometry,
    polyhedron: setPolyhedronGeometry,
    polyhedronbuffer: setPolyhedronBufferGeometry,
    ring: setRingGeometry,
    ringbuffer: setRingBufferGeometry,
    shape: setShapeGeometry,
    shapebuffer: setShapeBufferGeometry,
    sphere: setSphereGeometry,
    spherebuffer: setSphereBufferGeometry,
    tetrahedron: setTetrahedronGeometry,
    tetrahedronbuffer: setTetrahedronBufferGeometry,
    text: setTextGeometry,
    textbuffer: setTextBufferGeometry,
    torus: setTorusGeometry,
    torusbuffer: setTorusBufferGeometry,
    torusknot: setTorusKnotGeometry,
    torusknotbuffer: setTorusKnotBufferGeometry,
    tube: setTubeGeometry,
    tubebuffer: setTubeBufferGeometry
};

const setMaterial = (dataMaterial: any) => {
    const material = new MeshBasicMaterial(dataMaterial);
    material.side = DoubleSide;
    return material;
};

const setMesh = (geometry: any, material: any, obj: any) => {
    const mesh: Mesh = new Mesh(geometry, material);
    mesh.position.x = obj.position.x;
    mesh.position.y = obj.position.y;
    mesh.position.z = obj.position.z;
    return mesh;
};

const generateGeometry = (obj: any, scene: Scene): void => {
    for (const key in obj) {
        const geometry = geometryTypes[obj[key].type](obj[key]);

        const dataMaterial: any = {
            color: randomColor(),
            transparent: true,
            opacity: 1
        };

        if (geometry instanceof Promise) {
            geometry.then((data: any) => {
                if (obj.edges) setEdgesGeometry(data);
                if (obj.wireframes) setWireframeGeometry(data);

                const material = setMaterial(dataMaterial);
                const mesh = setMesh(data, material, obj[key]);
                scene.add(mesh);
            });
        } else {
            if (obj.edges) setEdgesGeometry(geometry);
            if (obj.wireframes) setWireframeGeometry(geometry);

            const material = setMaterial(dataMaterial);
            setMaterial(dataMaterial);
            const mesh = setMesh(geometry, material, obj[key]);
            scene.add(mesh);
        }
    }
};
const generators: Functions = {
    objects: generateGeometry
};

const generate = (data: any) => {
    for (const key in data) {
        generators[key](data[key]);
    }
};

export { generate, generateGeometry };
