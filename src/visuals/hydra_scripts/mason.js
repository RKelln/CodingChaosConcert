u = new Utils()
p1 = new P5({width: 1280, height: 720}) // {width: window.innerWidth, height:window.innerHeight, mode: 'P2D'}
v1 = u.create_video(s1, '/path/to/videos/') // CONFIGURE
bass = {}
mid = {}
high = {}

a.show()
a.setBins(9)
a.setSensitivity(0.9)
a.setCutoff([2.5,2.5,2.6,2.5,2.5,2.2,2.2,2.6,2.7]) // CONFIGURE
a.setScale(2)
//a.setScale( [2  ,  2,  2,  2,  2,  2,1.5,1.5,1.5]) // CONFIGURE
a.setSmooth(0)

//
bass.dir = 1
bass.decay = 4
bass.minV = -1
bass.maxV = 1
bass.scale = 0.1
bass.thruster = () => (a.fft[0]*1.5 + a.fft[1]/2)/2
//
mid.dir = 1
mid.decay = 0.2
mid.minV = -0.1
mid.maxV =  0.1
mid.scale = 0.05
mid.thruster = () => (a.fft[2]/2 + a.fft[3] + a.fft[4]/2 +a.fft[5]/2)/2
//
high.dir = 10
high.decay = 2
high.minV = 5
high.maxV = 20
high.scale = 1
high.thruster = () => (a.fft[5]/2 + a.fft[6] + a.fft[7] + a.fft[8])/2

// processing
t = 0.01
r = 0
g = 0
b = 0
strokeWeight = 5
// layered growing circle moving horiztonally
p1.clear()
p1.hide() // default p1 canvaas is on top
p1.imageMode(p1.CENTER)
p1.colorMode(p1.RGB, 1.0)
p1.noFill()
p1.strokeWeight(strokeWeight)
p1.ellipseMode(p1.CENTER)
layer = 0
layers = [p1.color(0,0,0)]
maxLayers = 600 / strokeWeight // TODO: set based on song length and layers per second
layerDrawTime = p1.millis()
middleX = p1.width/2
middleY = p1.height/2
max_color = 0.93
min_color = 0.6
// fill with random colors
for(i = 1; i < maxLayers; i++) {
  do { // randomlly incement colours
    r += 0.05 + Math.random() / 7
    g += 0.05 + Math.random() / 7
    b += 0.05 + Math.random() / 7
  } while ( (r + g + b) < min_color * 3.0)
  // require minimum brightness and loop if too bright
  if (r > max_color) r = r - max_color
  if (g > max_color) g = g - max_color
  if (b > max_color) b = b - max_color
  layers.push(p1.color(r,g,b))
}
// sets global variables and returns a p5 color
getColor = (i) => {
  t = i / maxLayers
  c = layers[i]
  //r = c._array[0]
  //g = c._array[1]
  //b = c._array[2]
  return c
}
// add new layer and draw it
addLayer = () => {
  if (layer >= maxLayers - 1) return
  layer += 1
  c = getColor(layer) // sets current color to activate layer
  p1.stroke(c)
  p1.ellipse(middleX, middleY, (strokeWeight*layer)+1)
}
//
removeLayer = () => {
  if (layer <= 1) return
  layer -= 1
  getColor(layer) // sets current color to activate layer
  p1.clear()
  let i = 0
  for (i = 0; i <= layer; i++) {
    p1.stroke(layers[i])
    p1.ellipse(middleX, middleY, (strokeWeight*i)+1)
  }
}
shiftColor = (amt=1) => () => {
  c = layers[layer]
  r = r * (1-amt) + c._array[0] * amt
  g = g * (1-amt) + c._array[1] * amt
  b = b * (1-amt) + c._array[2] * amt
}
// keybinds
keyBinds.bindKey('NUMPAD6', addLayer, shiftColor(), shiftColor(0.02) )
keyBinds.bindKey('NUMPAD5', removeLayer, shiftColor(), shiftColor(0.02) )
keyBinds.bindKey('NUMPAD4', removeLayer, shiftColor(), shiftColor(0.02) )
keyBinds.bindKey('NUMPAD0',
() => {
  solid().blend(src(o0), 0.9).out(o0)
})
keyBinds.bindKey('NUMPAD3', addLayer, shiftColor(0.05), addLayer )
keyBinds.bindKey('NUMPAD1', removeLayer, shiftColor(0.05), removeLayer )
// video
u.load_video(v1, s1, 'demo.mp4') // CONFIGURE code
v1.loop = true
v1.autoplay = true
v1.playbackRate = 0.2 // negative is backwards
//
// audio beats (default off)
listen = false
a.onBeat = () => {
  if (listen == false) return
  if (Math.random() > 0.3) {
    addLayer()
  } else {
    removeLayer()
  }
}

// circle
s0.init({src: p1.canvas})
src(s0).out(o1)
//
// code
src(s1).saturate(-1).color(()=> r,() => g, () => b).out(o1)
//
// mandela
noise(
  vel(high)
  ,0.1
)
.kaleid(30)
.color(()=> r,() => g, () => b)
.rotate(
  pos(mid, vel(mid), 0, 10, bounce(0.2))
)
.scale(() => 0.2 + 0.6*t,1,1.667)
.out(o2)
//
// zig zag sound waves
shape(30, () => t/1.5, 0.2)
  .color(()=> r + 0.2,() => g + 0.2, () => b + 0.2)
  .modulate(
      osc(25,0.1,0.5)
      .rotate(0,0.6)
      .kaleid(50)
      .scale(()=> t)
      .modulate(noise(0.6,0.5))
      ,0.5)
  .kaleid(10) // TODO: fft
  .rotate(0,0.4) // TODO: fft
  .scale(() => 1.1*t,1,1.667)
  .blend(o3, 0.9)
.out(o3)
//
// final output
shape(30,
  () => t/2.1,
  () => 0.1 * t)
.color(()=> r,() => g, () => b)
.modulate(o3)
.add(o1, ()=> 1.0 -
 t*0.5)
.add(o2, ()=>0.5 + t*0.5)
.add(o3, ()=> 0.5 + t*0.5)
//.add(src(o3).rotate(3), ()=>2*t)
.layer(s0)
//.modulate(o3, 0.003)
.out(o0)

// ready
/*
7           8           9
4 reduce    5 reduce    6 grow
1 fastsmall 2           3 fastbig
0 fade
*/



render()

p1.hide()

p1.clear()

p1.remove() // remove canvas
