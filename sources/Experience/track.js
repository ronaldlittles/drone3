import * as THREE from "three";
import { Vector2, Vector3 } from "three";
import Experience from "./Experience.js";

class RollerCoasterGeometry extends THREE.BufferGeometry {
  constructor(curve, divisions) {
    super();

   

    const vertices = [];
    const normals = [];
    const uvs = [];

    const up = new Vector3(0, 1, 0);
    const forward = new Vector3();
    const right = new Vector3();

    const quaternion = new THREE.Quaternion();
    const prevQuaternion = new THREE.Quaternion();
    prevQuaternion.setFromAxisAngle(up, Math.PI / 2);

    const point = new Vector3();
    const prevPoint = new Vector3();
    prevPoint.copy(curve.getPointAt(0));

    const step = [
      new Vector3(-0.225, 0, 0),
      new Vector3(0, -0.05, 0),
      new Vector3(0, -0.175, 0),

      new Vector3(0, -0.05, 0),
      new Vector3(0.225, 0, 0),
      new Vector3(0, -0.175, 0)
    ];

    const PI2 = Math.PI * 2;

    let sides = 6;
    const tube1 = [];

    for (let i = 0; i < sides; i++) {
      const angle = (i / sides) * PI2;
      tube1.push(
        new Vector3(Math.sin(angle) * 2.025, Math.cos(angle) * 0.025, 0)
      );
    }

    sides = 4;
    const tube2 = [];

    for (let i = 0; i < sides; i++) {
      const angle = (i / sides) * PI2;
      tube2.push(
        new Vector3(Math.sin(angle) * 0.025, Math.cos(angle) * 0.025, 0)
      );
    }

    const vector = new Vector3();
    const normal = new Vector3();
    const uv = new Vector2();

    function drawShape(shape, color) {
      normal.set(0, 0, -1).applyQuaternion(quaternion);

      for (let j = 0; j < shape.length; j++) {
        vector.copy(shape[j]);
        vector.applyQuaternion(quaternion);
        vector.add(point);

        vertices.push(vector.x, vector.y, vector.z);
        normals.push(normal.x, normal.y, normal.z);

        uv.x = (j % 2 === 0) ? 0 : 1; // Alternating UV coordinates along the shape
        uv.y = j / (shape.length - 1); // Mapping UV coordinates vertically

        uvs.push(uv.x, uv.y);
      }

      normal.set(0, 0, 1).applyQuaternion(quaternion);

      for (let j = shape.length - 1; j >= 0; j--) {
        vector.copy(shape[j]);
        vector.applyQuaternion(quaternion);
        vector.add(point);

        vertices.push(vector.x, vector.y, vector.z);
        normals.push(normal.x, normal.y, normal.z);

        uv.x = (j % 2 === 0) ? 0 : 1; // Alternating UV coordinates along the shape
        uv.y = j / (shape.length - 1); // Mapping UV coordinates vertically

        uvs.push(uv.x, uv.y);
      }
    }

    // Generate the roller coaster geometry
    for (let i = 0; i < divisions; i++) {
      const t = i / divisions;
      const point = curve.getPointAt(t);

      forward.subVectors(point, prevPoint).normalize();
      right.crossVectors(up, forward).normalize();

      quaternion.setFromUnitVectors(up, forward);

      drawShape(tube1);
      drawShape(tube2);

      prevPoint.copy(point);
      prevQuaternion.copy(quaternion);
    }

    
     this.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
    this.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
    this.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2)); 
  }
}

export default RollerCoasterGeometry;
