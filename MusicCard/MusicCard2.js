//最终逻辑简化版
//getAttribute(attributeName)：获取某一元素的确定属性值
//querySelectorAll(className/#id/标签名)：选出所有className/id的标签

const audio = document.getElementById("player");
const toggles = document.querySelectorAll(".song");
const start = document.getElementById("start");
const section = document.getElementById("section");
const rotate = document.getElementById("record");
const turntable = document.getElementById("turntable_arm");
const musicrecord = document.getElementById("music-record")
const names = document.getElementById("name")

const img = document.createElement("img")
img.className = "click-img"
const playlist = Array.from(toggles).map(t => t.getAttribute("href"));//获取歌的url并编入数组，把url用Array转化成数组，才能使用map来遍历数组

let currentUrl = "";
let currentIndex = 0;
let lastTime = 0;//设置暂停的时间初始值

const covers = [
  "/picture/zhongqu.jpg",
  "/picture/rainproof.jpg",
  "/picture/braveshine.jpg",
  "/picture/86.jpg",
  "/picture/lilas.jpg"
];

document.getElementById("music").appendChild(img);



audio.addEventListener("ended", () => {
  playIndex(currentIndex + 1); // 播放下一首
});

function playIndex(index) {
  currentIndex = index % playlist.length; // 循环播放利用取余来循环
  audio.src = playlist[currentIndex];
  img.src = covers[currentIndex];
  document.getElementById("music").innerHTML = ""; // 清空旧的
  document.getElementById("music").appendChild(img);
  
  audio.play()
}


//播放状态：唱片针划入唱片
function playMusic(url) {
  currentUrl = url || currentUrl;
  audio.src = currentUrl;
  rotate.classList.remove("rotate");
  section.classList.remove("music-section2");
  section.classList.add("music-section");

  turntable.classList.remove("turntable_arm2");
  turntable.classList.add("turntable_arm1");
  audio.currentTime = lastTime;
  
  setTimeout(() => {
    rotate.classList.add("rotate");  
    audio.play();
  }, 800);
}

//暂停状态：唱片针滑出唱片
function pauseMusic() {
  lastTime = audio.currentTime;
  rotate.classList.remove("rotate");
  turntable.classList.remove("turntable_arm1");
  turntable.classList.add("turntable_arm2");
  audio.pause();
}

//唱片按钮
musicrecord.addEventListener("click", ()=>{
  if (audio.paused) {
      playMusic()&&playIndex(index)
    } else {
      pauseMusic();
    }
})

//主按钮
start.addEventListener("click", () => {
  if (!audio.paused) {
    section.classList.add("music-section2");
    pauseMusic();
  } else {
    img.src = covers[0];
    document.getElementById("music").appendChild(img);
    section.classList.remove("music-section");
    playMusic("/bgm/eill - フィナーレ。.mp3");
  }
});

//播放列表
toggles.forEach((toggle, index) => {
  toggle.addEventListener("click", e => {
    e.preventDefault();//禁止跳转到播放页面
    const url = toggle.getAttribute("href");
    lastTime = 0;
    if (currentUrl === url) {
      audio.paused ? playMusic()&&playIndex(index) : pauseMusic();
    } else {
      playMusic(url);
      playIndex(index);
    }
  });
});
