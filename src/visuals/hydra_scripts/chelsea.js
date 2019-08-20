u = new Utils()
video_path = '/path/to/videos/' // CONFIGURE
v0 = u.create_video(s0, video_path)
v1 = u.create_video(s1, video_path)
bass = {}
mid = {}
high = {}
vol = {}
s2.initCam(0)


a.show()
a.setBins(9)
a.setSensitivity(0.8) // 0.8
a.setCutoff([2,2,2.6,2.6,2.4,2,2.1,2.2,2.4]) // CONFIGURE
a.setScale(2)
a.setSmooth(0.1)

vol.dir = 1
vol.decay = 0.3
vol.minV = 0
vol.maxV = 0.08
vol.scale = 0.03
vol.thruster = () => {
  return (a.fft[0]+a.fft[1]+a.fft[2]+a.fft[3]+a.fft[4]+a.fft[5]+a.fft[6]+a.fft[7]+a.fft[8])
}
// level dectors
bass.dir = 1
bass.decay = 4
bass.minV = -1
bass.maxV = 1
bass.scale = 0.1
bass.thruster = () => (a.fft[0]*1.5 + a.fft[1]/2)/2
//
mid.dir = 1
mid.decay = 0.2
mid.minV = -0.08
mid.maxV =  0.08
mid.scale = 0.1
mid.thruster = () => (a.fft[2]/2 + a.fft[3] + a.fft[4]/2 +a.fft[5]/2)/2
//
high.dir = 1
high.decay = 1
high.minV = 0
high.maxV = 0.2
high.scale = 1
high.thruster = () => (a.fft[5]/2 + a.fft[6] + a.fft[7] + a.fft[8])/2

// noise
noise(4, 0.3).mask(shape(30,0.3,0.9).invert())
.add(
  noise(30, 0.2).mask(shape(30,0.1,0.9).invert())
  , 0.9
)
.out(o3)

// moving webcam geo
src(s2).gray(0,1,1).contrast(5).invert()
.rotate(
  pos(high, vel(high), 0,3.14, bounce(0.01))
)
.scrollX(
  pos(vol, vel(vol), 0, 1, repeat())
)
.scale(
  pos(mid, vel(mid), 0.5,2, bounce(0.01))
)
// .scale(
//   ({time}) => 1 + Math.sin(time/5)/2 // TODO: bass?
// )
//.blend(o2, 0.99)
.out(o2)



// keybinds for playing a section
fade = 0
keyBinds.bindKey('NUMPAD0', () => {
    console.log("clear")
    fade = 0
    src(o0)
    .blend(solid(), () => fade)
    .out(o0)
    render(o0)
  },
  () => {
    solid().out(o0)
    render(o0)
  },
  () => fade = Math.min(1,fade + 0.001)
)
keyBinds.bindKey('NUMPAD1', () => {
  u.load_video(v0, s0, 'demo.mp4') // CONFIGURE opening
  solid()
  .add(
    src(s0)
      .rotate(3.14)
      .invert()
      .brightness(-0.3)
      .contrast(1.1)
      .blend(o0, 0.9)
    ,f0(0,1,0.1)
  )
  .out(o0)
  v0.currentTime = 0
  v0.playbackRate = 0.33 // negative is backwards
  v0.play()
  fadeIn(0, 0.05)
  render(o0)
})
keyBinds.bindKey('NUMPAD2', () => {
  u.load_video(v1, s1,
    'demo.mp4', // CONFIGURE brown oil texture
    {autoplay: true})
  src(o0)
  .blend(
    src(s1)
      .rotate(1.57)
      .scale(1,1,1.4)
      .blend(o1, 0.97)
      .pixelate(50,30)
    ,f1(0,1,0.008)
    )
  .mask(o2, 0, 0)
  .modulate(src(o3).pixelate(50,30), 0.02)
  .out(o1)
  fadeIn(1)
  render(o1)
})
keyBinds.bindKey('NUMPAD3', () => {
  u.load_video(v0, s0,
    'demo.mp4', // CONFIGURE aggressive road
    {autoplay: true})
  v0.currentTime = 50
  v0.playbackRate = 0.66
  solid()
  .blend(
    src(s0).blend(o1, 0.92)
    ,f2(0,1,0.005)
  )
  .mask(o2, 0, 0)
  .out(o1)
  fadeIn(2)
  render(o1)
})
keyBinds.bindKey('NUMPAD4', () => {
  u.load_video(v0, s0,
    'demo.mp4', // CONFIGURE aggressive city
    {autoplay: true})
  v0.currentTime = 0
  solid()
  .blend(
    src(s0)
      .scale(1.3)
      .modulate(src(o3).pixelate(20,30))
      .add(
        src(s0)
          .pixelate(20,30)
          .posterize(7)
          .mask(src(o3).pixelate(20,30))
        , 0.5
      )
    ,f2(0,1,0.01)
  )
  .mask(o2, 0, 0)
  .out(o1)
  fadeIn(2)
  render(o1)
})
keyBinds.bindKey('NUMPAD5', () => {
  u.load_video(v1, s1,
    'demo.mp4', // CONFIGURE soft pixels
    {autoplay: true})
  v1.playbackRate = 1.4
  src(o0)
  .blend(
    src(s1)
      .blend(o1, 0.97)
      .pixelate(80,50)
    ,f1(0,1,0.008)
    )
  .modulate(src(o3).pixelate(80,50), 0.02)
  .mask(o2, 0, 0)
  .out(o1)
  fadeIn(1)
  render(o1)
})
keyBinds.bindKey('NUMPAD6', () => {
  u.load_video(v0, s0, 'demo.mp4') // CONFIGURE nebula
  v0.playbackRate = 1.0
  v0.currentTime = 30
  src(s0)
  //.pixelate(300, 300)
  .add(osc(10,0.2,0.2), 0.3)
  .scale(1.1, 1, 1.5)
  .rotate(0,0.3)
  .modulate(s0, 0.05)
  .out(o0)
  render(o0)
})
keyBinds.bindKey('NUMPAD7', () => {
})
modulate = false
keyBinds.bindKey('NUMPAD8', () => {
  modulate = !modulate
  if (modulate) {
    // very aggressive modulation
    src(s0)
    .modulateKaleid(osc(11,0.5,0),50)
    .modulate(noise(5,0.1))
    .out(o0)
  } else {
    src(s0).out(o0)
  }
})
keyBinds.bindKey('NUMPAD9', () => {
})

// ready
/*
- 1 slow fade open
- 2 soft squares
- 3 aggressive road
- 4 aggressive city
- 5 soft pixels
- 6 nebula
*/












// OLD CODE for testing effects:

// Section 1 & 6

u.load_video(v0, s0, 'demo.mp4')
solid()
.add(
  src(s0)
    .invert()
    .brightness(-0.3)
    .contrast(1.1)
    .blend(o0, 0.9)
  ,f0(0,1,0.1)
)
.out(o0)
v0.currentTime = 0
v0.playbackRate = 0.33 // negative is backwards
v0.play()
fadeIn(0, 0.05)

// more aggressive
v0.playbackRate = 1.0
src(s0)
//.pixelate(300, 300)
.add(osc(10,0.2,0.2), 0.3)
.scale(1.1, 1, 1.5)
.rotate(0,0.2)
.modulate(s0, 0.05)
.out(o0)

// very aggressive
src(s0)
.modulateKaleid(osc(11,0.5,0),50)
.modulate(noise(5,0.1))
.out(o0)

//
// Section 2 & 5
//
u.load_video(v1, s1,
  'demo.mp4',
  {autoplay: true})
src(o0)
.blend(
  src(s1)
    .rotate(1.57)
    .scale(1,1,1.4)
    .blend(o1, 0.97)
  ,f1(0,1,0.008)
  )
.out(o1)
fadeIn(1)
render(o1)

//
// Section 3
//
u.load_video(v0, s0,
  'demo.mp4',
  {autoplay: true})
v0.currentTime = 50
src(o1)
.blend(
  src(s0)
  ,f2(0,1,0.001)
)
.out(o0)
fadeIn(2)
render(o0)

//
// Section 4
//
u.load_video(v0, s0,
  'demo.mp4',
  {autoplay: true})
v0.currentTime = 0
src(o1)
.blend(
  src(s0)
    .scale(1.3)
    .blend(o0, 0.9)
    .modulate(src(o3).pixelate(20,30))
    .add(
      src(s0)
        .pixelate(20,30)
        .posterize(7)
        .mask(src(o3).pixelate(20,30))
      , 0.5
    )
  ,f2(0,1,0.001)
)
.out(o0)
fadeIn(2)
render(o0)

src(s0)
  .pixelate(20,30)
  .mask(src(o3).pixelate(20,30)
  //.posterize(8)
.out(o1)

src(o3).pixelate(20,30).invert().out(o2)

render()