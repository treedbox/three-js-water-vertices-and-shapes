import {
    PerspectiveCamera,
    Scene,
    Camera,
    WebGLRenderer,
    BoxGeometry,
    MeshBasicMaterial,
    Mesh,
    Geometry,
    Material,
    Raycaster,
    Vector2,
    Color,
    DoubleSide,
    HemisphereLight,
    AmbientLight,
    PlaneGeometry,
    Vector3
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { generateGeometry } from "../modules/three/geometries";
import { randomColor } from "../modules/three/colors";
import { loadFileAsync } from "../modules/three/loaders";

const config: Promise<JSON> = loadFileAsync("./config.json");

// scene
const scene: Scene = new Scene();
// camera
const camera: Camera = new PerspectiveCamera(
    72,
    window.innerWidth / window.innerHeight,
    0.001,
    1000
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 20;

//control
const raycaster: Raycaster = new Raycaster();
const mouse: Vector2 = new Vector2();
let intersects: any[] = [];
const onMouseDown = (event: any) => {
    if (!intersects[0]) return;
    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // for (let i = 0; i < intersects.length; i++) {
    intersects[0].object.material.color.set(randomColor());
    // }
};

//render
const renderer: WebGLRenderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let updatePlaneVertice: Function = () => {};

//flag
let flag: Mesh;
let verticesList: any[] = [];
const waveHeight: number = 0.2;
const updateVertices = (
    verticesList: any[],
    geometry: any,
    axis: string,
    step: number,
    limit: number
) => {
    if (verticesList.length && geometry) {
        for (let i = 0; i < geometry.vertices.length; i++) {
            if (verticesList[i]) {
                geometry.vertices[i][axis] += step;
                if (geometry.vertices[i][axis] > limit) {
                    verticesList[i] = !verticesList[i];
                }
            } else {
                geometry.vertices[i][axis] -= step;
                if (geometry.vertices[i][axis] < -limit) {
                    verticesList[i] = !verticesList[i];
                }
            }
        }
        geometry.verticesNeedUpdate = true;
    }
};

const animate = (): void => {
    // update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);

    // calculate objects intersecting the picking ray
    intersects = raycaster.intersectObjects(scene.children);

    //flag
    updateVertices(verticesList, flag, "z", 0.005, waveHeight);

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
};

const init = (data: any) => {
    scene.background = new Color(0xcccccc);

    //control
    const orbit = new OrbitControls(camera, renderer.domElement);

    generateGeometry(data.objects, scene);

    //light
    const ambientLight = new AmbientLight(0x404040, 1);
    scene.add(ambientLight);

    const hemisphereLight = new HemisphereLight(0xffffbb, 0x080820, 1);
    scene.add(hemisphereLight);

    const planeGeometry: any = new PlaneGeometry(30, 30, 200, 200);
    const planeMaterial: any = new MeshBasicMaterial({
        color: 0x2196f3,
        wireframe: true,
        transparent: true,
        opacity: 0.7,
        side: DoubleSide
    });

    let counter: number = 0;
    const wave: number = (Math.PI * 2) / 30;

    // Create plane, and then rotate so it is sideways for the scene.
    const plane: Mesh = new Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = Math.PI / 2;
    plane.rotation.z = Math.PI / 2;
    plane.position.y = -8;
    flag = planeGeometry;
    scene.add(plane);

    updatePlaneVertice = () => {
        for (let i = 0; i < planeGeometry.vertices.length; i++) {
            planeGeometry.vertices[i].z = Math.sin(counter) * waveHeight;
            verticesList.push(true);
            planeGeometry.verticesNeedUpdate = true;
            counter += wave;
            // Reset back to 0 so each row has the same shape.
            if (i % 200 == 0) {
                counter = 0;
            }
        }
    };
    updatePlaneVertice();
    animate();
    window.addEventListener("mousedown", onMouseDown, { passive: true });
};

config.then(data => init(data));
