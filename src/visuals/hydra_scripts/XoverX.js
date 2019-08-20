// notes for X/X

s = 1
keyBinds.bindKey("NUMPAD0",
() => { scale = 2 },
() => scale = 1 )

osc(1, 0.1, 1)
  .out(o0)
render(o0)

osc(3, 0.1, 1)
  .modulateRotate(noise())
  .out(o1)
render(o1)

osc(5, 0.4, 1)
  //.modulateRotate(noise())
  .scale(s)
  .modulateRotate(
    osc(16,0.5,1)
    .rotate(1.6, 0.1)
  )
.out(o2)
render(o2)

shape(2)
  .add(src(o2).scale(0.5))
  .rotate(0, 0.3)
  .modulateRotate(o0)
  .diff(o1)
  .out(o2)
render(o2)
