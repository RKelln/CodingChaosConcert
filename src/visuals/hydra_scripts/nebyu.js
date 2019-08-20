u = new Utils()
poem = u.load_svg_stanza('/path/to/svg/nebyu', 3) // CONFIGURE
s0.initScreen("Learn", 256, 256) // capture from L2S
//s0.initCam(0) // for testing webcam setup
v1 = u.create_video(s1, '/path/to/videos/') // CONFIGURE
v2 = u.create_video(s2, '/path/to/videos/') // CONFIGURE
//keybinds
keyBinds.bindKey('NUMPAD2', () => { poem.loop() })
keyBinds.bindKey('NUMPAD4', () => { poem.adjustSpeed(-0.1) })
keyBinds.bindKey('NUMPAD5', () => { poem.stopped() ? poem.play() : poem.stop() })
keyBinds.bindKey('NUMPAD6', () => { poem.adjustSpeed(0.1) })
keyBinds.bindKey('NUMPAD7', () => { poem.prev() })
keyBinds.bindKey('NUMPAD8', () => { poem.hide() })
keyBinds.bindKey('NUMPAD9', () => { poem.next() })
keyBinds.bindKey('NUMPAD0',
() => {
  // swtich to sunrise
  u.load_video(v1, s1, 'demo.mp4') // CONFIGURE
  src(s0).scale(1.1).modulate(s2, 0.05).add(s1, 0.3).contrast(1.6).saturate(1.2).out()
  v1.play()
 })

// READY //

// videos
u.load_video(v1, s1, 'demo.mp4') // CONFIGURE rain on window
u.load_video(v2, s2, 'demo.mp4') // CONFIGURE storm clouds
v1.currentTime = 0
v1.play()
v2.play()
// cathedral
src(s0).tileX(1.3,0.8).out(o1)
// sky mask
src(o1).gray(0,0,0.8).contrast(5).out(o2)
// intro and cathedral
src(s1)
.blend(
    src(o1)
    .saturate(1.1)
    .blend(src(s2).mask(o1), 0.7)
  ,f0(0,1,0.002)
)
.contrast(1.1)
.out()
fadeIn(0)


// start with cathedrals
// poem 1 - 4

// then sunrise
u.load_video(v1, s1, 'demo.mp4') // CONFIGURE skin water drops
src(s0).scale(1.1).modulate(s2, 0.05).add(s1, 0.3).contrast(1.6).saturate(1.2).out()
v1.play()

// poem 5 - 14


// TODO:
// -fade out on key
// -shake things up on key
// -switch one keys
