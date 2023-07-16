import {
  BufferAttribute,
  BufferGeometry,
  Quaternion,
  Vector3,
  Vector2,
} from "three";

class RollerCoasterGeometry extends BufferGeometry {
  constructor(curve, divisions) {
    super();

    const vertices = [];
    const normals = [];
    const colors = [];
    const uvs = [];
    const offset = new Vector3();
    const vector1 = new Vector3();
    const vector2 = new Vector3();
    const vector3 = new Vector3();
    const vector4 = new Vector3();

    const color1 = [1, 1, 1];
    const color2 = [1, 1, 0];

    const up = new Vector3(0, 1, 0);
    const forward = new Vector3();
    const right = new Vector3();

    const quaternion = new Quaternion();
    const prevQuaternion = new Quaternion();
    prevQuaternion.setFromAxisAngle(up, Math.PI / 2);

    const point = new Vector3();
    const prevPoint = new Vector3();
    prevPoint.copy(curve.getPointAt(0));

    const width = 0.02; // Adjust the width of the flat surface as desired
    const height = 0.05; // Adjust the height of the flat surface as desired

    // Rectangle shape for the flat surface
    const shape = [
      new Vector3(-width / 2, 0, 0),
      new Vector3(width / 2, 0, 0),
      new Vector3(width / 2, -height, 0),
      new Vector3(-width / 2, -height, 0),
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
    colors.push(color[0], color[1], color[2]);

   /*  // Calculate u coordinate based on the vertex position relative to the width
    uv.x = (vector.x / width + 0.5).toFixed(2);
    
    // Calculate v coordinate based on the vertex position relative to the height
    uv.y = (1 - vector.y / height).toFixed(2);

    uvs.push(uv.x, uv.y); */

    const u = (vector.x ) / shape.length;
    const v = (vector.y) / shape.length;

    uvs.push(u , v );
  }

  normal.set(0, 0, 1).applyQuaternion(quaternion);

  for (let j = shape.length - 1; j >= 0; j--) {
    vector.copy(shape[j]);
    vector.applyQuaternion(quaternion);
    vector.add(point);

    vertices.push(vector.x, vector.y, vector.z);
    normals.push(normal.x, normal.y, normal.z);
    colors.push(color[0], color[1], color[2]);

    // Calculate u coordinate based on the vertex position relative to the width
    //uv.x = (vector.x / width + 0.5).toFixed(2);
    
    // Calculate v coordinate based on the vertex position relative to the height
    //uv.y = (1 - vector.y / height).toFixed(2);


    const u = (vector.x ) / shape.length;
    const v = (vector.y) / shape.length;

    uvs.push(u, v); 


    //uvs.push(uv.x, uv.y);
  }
}


    function extrudeShape(shape, offset, color) {
      const railWidth = 0.05; // Adjust the width of the rails as desired

      for (let j = 0, jl = shape.length; j < jl; j++) {
        const point1 = shape[j];
        const point2 = shape[(j + 1) % jl];

        // Flat surface vertices
        vector1.copy(point1).add(offset);
        vector1.applyQuaternion(quaternion);
        vector1.add(point);

        vector2.copy(point2).add(offset);
        vector2.applyQuaternion(quaternion);
        vector2.add(point);

        vector3.copy(point2).add(offset);
        vector3.applyQuaternion(prevQuaternion);
        vector3.add(prevPoint);

        vector4.copy(point1).add(offset);
        vector4.applyQuaternion(prevQuaternion);
        vector4.add(prevPoint);

        vertices.push(vector1.x, vector1.y, vector1.z);
        vertices.push(vector2.x, vector2.y, vector2.z);
        vertices.push(vector4.x, vector4.y, vector4.z);

        vertices.push(vector2.x, vector2.y, vector2.z);
        vertices.push(vector3.x, vector3.y, vector3.z);
        vertices.push(vector4.x, vector4.y, vector4.z);

        // Rail vertices
        const railOffset = offset.clone().setY(offset.y - railWidth);

        const railVector1 = vector1.clone().add(railOffset);
        const railVector2 = vector2.clone().add(railOffset);
        const railVector3 = vector3.clone().add(railOffset);
        const railVector4 = vector4.clone().add(railOffset);

        vertices.push(railVector1.x, railVector1.y, railVector1.z);
        vertices.push(railVector2.x, railVector2.y, railVector2.z);
        vertices.push(railVector4.x, railVector4.y, railVector4.z);

        vertices.push(railVector2.x, railVector2.y, railVector2.z);
        vertices.push(railVector3.x, railVector3.y, railVector3.z);
        vertices.push(railVector4.x, railVector4.y, railVector4.z);

        // ...

        // Normal, color, and UV calculations remain the same
      }
    }

    for (let i = 1; i <= divisions; i++) {
      point.copy(curve.getPointAt(i / divisions));

      up.set(0, 1, 0);

      forward.subVectors(point, prevPoint).normalize();
      right.crossVectors(up, forward).normalize();
      up.crossVectors(forward, right);

      const angle = Math.atan2(forward.x, forward.z);

      quaternion.setFromAxisAngle(up, angle);

      drawShape(shape, color2);

      

      extrudeShape(tube1, offset.set(0, -0.125, 0), color2);
      extrudeShape(tube2, offset.set(2.2, 0, 0), color1);
      extrudeShape(tube2, offset.set(-2.2, 0, 0), color1);

      prevPoint.copy(point);
      prevQuaternion.copy(quaternion);
    }

    this.setAttribute(
      "position",
      new BufferAttribute(new Float32Array(vertices), 3)
    );
    this.setAttribute(
      "normal",
      new BufferAttribute(new Float32Array(normals), 3)
    );
    this.setAttribute(
      "color",
      new BufferAttribute(new Float32Array(colors), 3)
    );
    this.setAttribute("uv", new BufferAttribute(new Float32Array(uvs), 2));
  }
}

export default RollerCoasterGeometry;
