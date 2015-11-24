$( document ).ready(function() {

  var r_flag = 0;

  var video = document.querySelector('#one'),
    video2 = document.querySelector('#two'),
    togglePlay = document.querySelector('#play'),
    position = document.querySelector('#position'),
    ready = false,
    controls = document.querySelector('#controls'),
    scrub = document.querySelector('#scrub');

  console.log(ready);
    
  addEvent(togglePlay, 'click', function () {
    

  });

  addEvent(video, 'play', function () {
    video.currentTime = video2.currentTime;
    video2.pause();
  });

  addEvent(video, 'pause', function () {
    video2.currentTime =  video.currentTime;
    video2.play();

  })

  /*addEvent(video, 'timeupdate', function () {
    position.innerHTML = asTime(this.currentTime);
    scrub.value = this.currentTime;
  });*/

  addEvent(video, 'ended', function () {
    togglePlay.value = "play";
  });

  addEvent(video, 'canplay', function () {
    video.muted = false;
    ready = true;
    /*document.querySelector('#duration').innerHTML = asTime(this.duration);

    scrub.setAttribute('max', this.duration);*/
    addEvent(scrub, 'change', function () {
      video.currentTime = this.value;
      video2.currentTime = this.value;
    });
    video.play();
    video2.pause();
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

  $(document).keypress(function(event){
    if(String.fromCharCode(event.which) === "r" || String.fromCharCode(event.which) === "R" ) {
      if (ready) {
        if (video.paused) {
          if (video.ended) {
            video.currentTime = 0;
            video2.currentTime = 0;
          }
          console.log(video2.currentTime);
          video.currentTime = video2.currentTime;
          video.play();
          this.value = "pause";
        } else {
          console.log(video.currentTime);
          video2.currentTime = video.currentTime;
          video.pause();
          this.value = "play";
        }
      }
    }
  });

});

