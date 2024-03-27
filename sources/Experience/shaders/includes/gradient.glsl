// Gradient function
vec2 grad(float hash, vec2 p) {
    const vec2 grad2[4] = vec2[4](
        vec2(1, 0), vec2(-1, 0), vec2(0, 1), vec2(0, -1));
    return grad2[int(mod(hash, 4.0))];
}