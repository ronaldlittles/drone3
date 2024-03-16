vec2 Hash12_Polar(float t){

  float a = fract(sin(t*674.3) * 453.2);
  float d = fract(sin((t+a)*714.3)*263.2);

  return vec2(sin(a), cos(a)) * d;

}

