u = new Utils()
poem = u.load_svg_stanza('/path/to/svg/suzy', 3) // CONFIGURE
v0 = u.create_video(s0, '/path/to/videos/') // CONFIGURE
v1 = u.create_video(s1, '/path/to/videos/') // CONFIGURE
// vj key binds
var markedTime = 0
keyBinds.bindKey('NUMPAD0', () => { markedTime = v0.currentTime })
keyBinds.bindKey('NUMPAD1', () => { v0.currentTime -= 0.8 * v0.playbackRate })
keyBinds.bindKey('NUMPAD2', () => { v0.currentTime = markedTime })
keyBinds.bindKey('NUMPAD3', () => { v0.currentTime += 0.8 * v0.playbackRate })
keyBinds.bindKey('NUMPAD4', () => { v0.playbackRate -= 0.1 })
keyBinds.bindKey('NUMPAD5', () => { v0.playbackRate = 1 })
keyBinds.bindKey('NUMPAD6', () => { v0.playbackRate += 0.1 })
keyBinds.bindKey('NUMPAD7', () => { poem.prev() })
keyBinds.bindKey('NUMPAD8', () => { poem.hide() })
keyBinds.bindKey('NUMPAD9', () => { poem.next() })

// videos
u.queue_videos(v0, s0,
  ['demo.mp4','demo.mp4',], // CONFIGURE dolls, robots
  '/path/to/videos/') // CONFIGURE
v0.playbackRate = 0.7
u.load_video(v1, s1, 'demo.mp4') // CONFIGURE 
bass = {}
mid = {}
high = {}

a.show()
a.setBins(9)
a.setSensitivity(0.7)
a.setCutoff([  2,  2,2.4,2.3,2.3,2,2,2.3,2.3])
a.setScale( [1.5,1.5,1.5,  1.5,1.5,2,2.5,1.5,1.5])
a.setSmooth(0.2)

bass.dir = 1
bass.decay = 0.5
bass.minV = 0
bass.maxV = 0.15
bass.scale = 0.5
bass.thruster = () => a.fft[0] + a.fft[1]/2
//
mid.dir = 1
mid.decay = 0.2
mid.minV = -0.08
mid.maxV =  0.08
mid.scale = 0.1
mid.thruster = () => (a.fft[2]/2 + a.fft[3] + a.fft[4]/2 +a.fft[5]/2)/2
//
high.dir = 1
high.decay = 1.3
high.minV = 0
high.maxV = 1
high.scale = 0.6
high.thruster = () => (a.fft[5]/2 + a.fft[6] + a.fft[7] + a.fft[8])/2

// drips
src(s1).invert().brightness(-0.3).contrast(1.4).out(o1)

// ready!
/*
7 prev poem  8 hide poem   9 next poem
4 slower     5 reset speed 6 faster
1 jump back  2 jump mark   3 jump forward
0 set mark
*/


v0.currentTime = 0
src(s0)
.scale(1.2)
.modulate(o1,
  vel(bass)
)
.add(
  gradient(1)
    .brightness(-0.2)
    .saturate(0.7)
    .rotate(0,0.3)
  ,vel(high)
)
.contrast(1.2)
.out()
v0.play()
v1.play()

// start poem
