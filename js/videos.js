var video = document.querySelector('#one'),
    video2 = document.querySelector('#two'),
    togglePlay = document.querySelector('#play'),
    position = document.querySelector('#position'),
    ready = false,
    controls = document.querySelector('#controls'),
    scrub = document.querySelector('#scrub');

addEvent(togglePlay, 'click', function () {
  if (ready) {
    video.playbackRate = 0.5;
    if (video.paused) {
      if (video.ended) {
        video.currentTime = 0;
        video2.currentTime = 0;
      }
      video2.currentTime = video.currentTime;
      video.play();
      this.value = "pause";
    } else {
      video.pause();
      this.value = "play";
    }
  }
});

function seek() {
  scrub.value = video2.currentTime = this.currentTime;
}

addEvent(video, 'seeking', seek);
addEvent(video, 'seeked', seek);

addEvent(video, 'play', function () {
  video2.play();
});

addEvent(video, 'pause', function () {
  video2.pause();
})

addEvent(video, 'timeupdate', function () {
  position.innerHTML = asTime(this.currentTime);
  scrub.value = this.currentTime;
});

addEvent(video, 'ended', function () {
  togglePlay.value = "play";
});

addEvent(video, 'canplay', function () {
  video.muted = true;
  ready = true;
  document.querySelector('#duration').innerHTML = asTime(this.duration);

  scrub.setAttribute('max', this.duration);
  addEvent(scrub, 'change', function () {
    video.currentTime = this.value;
    video2.currentTime = this.value;
  });
});

function asTime(t) {
  t = Math.round(t);
  var s = t % 60;
  var m = Math.round(t / 60);
  
  return two(m) + ':' + two(s);
}

function two(s) {
  s += "";
  if (s.length < 2) s = "0" + s;
  return s;
}