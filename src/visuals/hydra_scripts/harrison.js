u = new Utils()
s0.initScreen("Learn", 256, 256) // capture from L2S
//s0.initCam(0) // testing
v1 = u.create_video(s1, '/path/to/videos/') // CONFIGURE
u.load_video(v1, s1, 'demo.mp4') // CONFIGURE clouds
v1.autoplay = true
p1 = new P5()
// this takes a long time to load
// control # of images by changing limit
u.create_slideshow(p1, s2,
  '/path/to/images', // CONFIGURE tree images
  {limit: 15})
bass = {}
mid = {}
high = {}

a.show()
a.setBins(9)
a.setSensitivity(0.95)
a.setCutoff([2.2,2.2,2.8,2.8,2.6,2,2.2,2.3,2.3]) // CONFIGURE
a.setScale(2.2)
a.setSmooth(0.2)

bass.dir = 1
bass.decay = 0.5
bass.minV = -0.1
bass.maxV = 0.1
bass.scale = 0.07
bass.thruster = () => a.fft[0] + a.fft[1] / 2
//
mid.dir = 1
mid.decay = 0.2
mid.minV = -0.08
mid.maxV =  0.08
mid.scale = 0.1
mid.thruster = () => (a.fft[2]/2 + a.fft[3] + a.fft[4]/2 +a.fft[5]/2)/2
//
high.dir = 1
high.decay = 0.7
high.minV = 0
high.maxV = 0.2
high.scale = 0.08
high.thruster = () => (a.fft[5]/2 + a.fft[6] + a.fft[7] + a.fft[8])/2

// keybinds
keyBinds.bindKey('NUMPAD0',
() => {
  solid().blend(src(o0), 0.9).out(o0)
})
keyBinds.bindKey('NUMPAD4',
() => { p1.nextImage(0.015,3) } )
keyBinds.bindKey('NUMPAD5',
() => { p1.nextImage(-0.04,1,3.5) } )
keyBinds.bindKey('NUMPAD6',
() => { src(s2).out(o0) } )
keyBinds.bindKey('NUMPAD7',
() => { src(s2).blend(o0,0.9).modulate(o0,0.02).out(o0) } )
keyBinds.bindKey('NUMPAD8',
() => { src(s2).blend(o0,0.8).modulate(o0,0.03).scale(1.2).rotate(0,0.05).out(o0) } )
keyBinds.bindKey('NUMPAD9',
() => { src(s2).blend(o0,0.7).modulate(o0,0.03).scale(1.2).rotate(0,0.3).contrast(1.1).out(o0) } )
keyBinds.bindKey('NUMPAD1',
() => {
  // normal
  src(o1)
  .blend(
    src(o3).mask(src(o2))
    , 0.5
  )
  .add(
      src(o1).mask(noise(50,0.15,0.2).repeatX(1.5).mask(src(o2).invert()))
      ,0.5
  )
  .saturate(1.1)
  .out(o0)
})
keyBinds.bindKey('NUMPAD2',
() => {
  src(s0)
  .tileX(1.4,0.7)
  .out(o1)/
})
keyBinds.bindKey('NUMPAD3',
() => {
  src(s0)
  .tile(2,2)
  .modulateScrollX(
    osc(
      pos(bass, vel(bass), 6, 12, bounce(0.1))
    ),
    vel(high),
    0)
  .scale(
    pos(mid, vel(mid), 1,2, bounce(0.01))
  )
  //.modulateScrollY(osc(10),0.1,0.15)
  .out(o1)
})
// clouds background
src(s1).out(o3)
// L2S
src(s0)
.tileX(1.4,0.7)
.out(o1)
// L2S mask
src(o1).gray(0,0,1).contrast(2).out(o2)
// normal
src(o1)
.blend(
  src(o3).mask(src(o2))
  , 0.5
)
.add(
    src(o1).mask(noise(50,0.15,0.2).repeatX(1.5).mask(src(o2).invert()))
    ,0.5
)
.saturate(1.1)
.out(o0)

// ready!
/*
7 treeFx1   8 treeFX2   9 treeFX3
4 treeIN    5 treeOUT   6 treeNorm
1 L2S       2 L2Snorm   3 funkyTile
0 fade
*/










// OLD ////////////////////////

// funky tile
src(o1)
.add(
    src(o1).mask(noise(50,0.15,0.2).repeatX(1.5).mask(src(o2).invert()))
    ,0.5
)
.saturate(1.1)
.modulateScrollX(osc(7),0.1,0.2)
//.scrollX(0,0.1)
.modulateScrollY(osc(2),0.05,0.1)
.blend(
  src(o3).mask(src(o2))
  , 0.5
)
.out(o0)



src(o1)
.modulateScrollX(osc(7),0.1,0.2)
//.scrollX(0,0.1)
.modulateScrollY(osc(2),0.05,0.1)
//.scrollY(0,0.1)
//.modulateScale(noise(3), 0.01, 0.1)
//.rotate(0,0.1)
.brightness(0.2)
.scale(1)
.saturate(1.1)
.out()


src(s1).mask(o1).out(o2)

// back and forth section
src(s0).scale(1.1).rotate(0, 0.2).out()

src(s0).scale(1.1).rotate(0, -0.2).out()

src(o0).out() /// normal

// da da da ta da

// color change to Bruce

// repeated quatrters on piano into piano solo
// flocking ?

// piano arpeggios?
