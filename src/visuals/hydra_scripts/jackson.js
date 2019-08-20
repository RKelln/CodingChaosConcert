u = new Utils()
v1 = u.create_video(s1, '/path/to/videos/') // CONFIGURE
u.load_video(v1, s1, 'demo.mp4') // CONFIGURE plants and flowers opening
v1.autoplay = true
k = {}
bass = {}
mid = {}
high = {}

a.show()
a.setBins(9)
a.setSensitivity(0.9)
a.setCutoff([2,2,3.2,2.8,2.6,2,2,2.2,2.5]) // CONFIGURE
a.setScale(2)
a.setSmooth(0.3)

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
high.dir = 1
high.decay = 0.2
high.minV = 0
high.maxV = 0.1
high.scale = 0.4
high.thruster = () => (a.fft[5]/2 + a.fft[6] + a.fft[7] + a.fft[8])/2


// video formward/back
keyBinds.bindKey('NUMPAD1',
  () => v1.currentTime -= 0.1,
  null,
  () => v1.currentTime -= 0.1)
fade_in = true
keyBinds.bindKey('NUMPAD0',
  () => {
    if (fade_in) {
      fadeOut(0, 0.1)
    } else {
      fadeIn(0, 0.04)
    }
    fade_in = !fade_in
  })
keyBinds.bindKey('NUMPAD3',
  () => v1.currentTime += 0.1,
  null,
  () => v1.currentTime += 0.1)
// video speed
keyBinds.bindKey('NUMPAD7',
  () => v1.playbackRate -= 0.1,
  null,
  () => v1.playbackRate -= 0.05)
keyBinds.bindKey('NUMPAD8',
  () => v1.playbackRate = 0,
  () => v1.playbackRate = 1)
keyBinds.bindKey('NUMPAD9',
  () => v1.playbackRate += 0.1,
  null,
  () => v1.playbackRate += 0.05)
//
k.dir = 1
k.decay = 0.5
k.minV = -1
k.maxV = 1
k.scale = 0.1
keyBinds.bindKey('NUMPAD4',
  () => { k.dir = -1; k.thrust = 4},
  null,
  () => k.thrust = 1)
keyBinds.bindKey('NUMPAD5',
  () => { k.dir = 0; k.thrust = 0, k.v = 0})
keyBinds.bindKey('NUMPAD6',
  () => { k.dir = 1; k.thrust = 4},
  null,
  () => k.thrust = 1)
//
// large flower kaleidoscope
max = 20
src(s1)
.scale(
  () => k.p.map(3, max, 2, 0.2)
)
.kaleid(
  pos(k, vel(k), 3, max, bounce(0.05)),
  0.5, -0.1)
.out(o1)
//
// background kaleidoscope
src(o1).scale(0.5).blend(o2, 0.5).rotate(0,-0.1).repeat(2,2)
.rotate(
  pos(mid, vel(mid), 0, 100, bounce(0.5))
).out(o2)
src(o1).blend(o3, 0.99).contrast(1.003).out(o3)


// READY //
/*
7 slower    8 go/stop   9 faster vid
4 left      5 stop      6 right
1 vid back  2 fade      3 vid forward
*/

// main output
src(o2)
.blend(gradient(0.5).brightness(-0.8),0.6) // 0.07
.modulate(
  noise(10,0.1),
  vel(high)
)
.mult(o3, 2)
.layer(
  src(o1).mask(src(o1).thresh(0.05))
)
.contrast(1.1)
//.blend(o0, 0.98) // blur at end
.blend(solid(), f0(0,1,0.1))
.out(o0)

fadeOut(0,0.003)
