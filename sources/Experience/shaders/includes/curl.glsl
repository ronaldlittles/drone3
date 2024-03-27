vec2 curlNoise(vec2 p) {
    const float eps = 0.1;
    float n1 = hash(p + vec2(eps, 0));
    float n2 = hash(p - vec2(eps, 0));
    float a = (n1 - n2) / (2.0 * eps);
    
    float n3 = hash(p + vec2(0, eps));
    float n4 = hash(p - vec2(0, eps));
    float b = (n3 - n4) / (2.0 * eps);
    
    return vec2(b, -a);
}