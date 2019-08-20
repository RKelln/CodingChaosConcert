
function queue_videos(playlist, base='', loop=false) {
  vid = document.createElement('video')
  vid.autoplay = false
  vid.loop = false
  vid.muted = true
  vid.playlist = playlist
  vid.current = -1 // start at 0 using playNext()
  // ensure last slash
  if (base.length > 0 && base[base.length-1] != '/') {
    base = base + "/"
  }

  vid.playNext = function(n) {
    vid.current = vid.current + 1
    if (vid.current >= vid.playlist.length) {
      if (loop) {
        vid.current = 0
      } else { // stop
        vid.pause()
        return
      }
    }
    console.log("playing video", base + vid.playlist[vid.current])
    vid.src = base + vid.playlist[vid.current]
    vid.currentTime = 0
    vid.play()
  }

  vid.addEventListener('ended', function() {
    vid.playNext()
  })

  vid.playNext()
  return vid;
}


function stanza(text, color='white') {
  var div = document.getElementById('stanza')
  if (div == null) {
    if (typeof(text) == 'undefined') {
      // remove text
      div.remove()
      return
    }

    // create a new stanza
    var div = document.createElement('div')
    div.id = 'stanza'
    div.style.display = 'flex'
    div.style.height = '100%'
    div.style.width = '100%'
    div.style.position = 'absolute'
    div.style.pointerEvents = 'none'
    div.style.color = color

    var e = document.createElement('h1')
    e.style.fontSize = "18px"
    e.style.textalign = "center"
    e.style.margin = "auto"
    e.style.whitespace = "pre"
    var textNode = document.createTextNode("")
    e.appendChild(textNode)
    div.appendChild(e)

    var parent = document.querySelector('.workspace')
    // document.getElementsByClassName("hydra")[0]
    parent.appendChild(div)
  }
  if (Array.isArray(text)) {
    text = text.join('\n')
  }
  div.childNodes[0].childNodes[0].nodeValue = text
}
