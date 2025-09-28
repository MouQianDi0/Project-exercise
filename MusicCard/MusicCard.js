const audio = document.getElementById("player")
const toggles = document.querySelectorAll(".song")
const start = document.getElementById("start")
const section = document.getElementById("section")
const rotate = document.getElementById("record")
const turntable = document.getElementById("turntable_arm")


start.addEventListener("click", () => {
    if(audio.played && section.classList.contains("music-section")){
            section.classList.remove("music-section")
            section.classList.add("music-section2")
            rotate.classList.remove("rotate")
            turntable.classList.remove("turntable_arm2")
            turntable.classList.add("turntable_arm1")
            audio.pause();
    }
    else{
        audio.src = "/bgm/eill - フィナーレ。.mp3"
        section.classList.remove("music-section2")
        section.classList.add("music-section")
        turntable.classList.remove("turntable_arm")
        turntable.classList.add("turntable_arm2")
        setTimeout(()=>{
          rotate.classList.add("rotate")
          audio.play();
        },800)
    }
})


let currentUrl = ""; // 记录当前播放歌曲

toggles.forEach(toggle => {
  toggle.addEventListener("click", function(e) {
    e.preventDefault();
    const url = this.getAttribute("href");

    if (currentUrl === url) { 
      // 点击当前歌曲，切换播放/暂停
      if (audio.paused) {
        section.classList.remove("music-section2")         //基本逻辑：                                                         
        section.classList.add("music-section")             //
        turntable.classList.remove("turntable_arm3")
        turntable.classList.add("turntable_arm2")
        setTimeout(()=>{
          rotate.classList.add("rotate")
          audio.play();
        },800)                     //由于currentUrl初始值为空，所以首次播放音乐                               
                                              //为点击新歌曲那个选项
      } else {
        turntable.classList.remove("turntable_arm2")
        turntable.classList.add("turntable_arm3")
        rotate.classList.remove("rotate")                  //第二次currentUrl的值为前一次的url，就可以进行判断了
        // section.classList.remove("music-section")          //所以第二次就可以为暂停或播放                
        // section.classList.add("music-section2")            //                                             
        audio.pause();                                     //                     
      }                                                    //     
    } else {                                               //             
      // 点击新歌曲       
        rotate.classList.remove("rotate")                     //                 
        section.classList.remove("music-section2")         //                                                 
        section.classList.add("music-section")             //                                             
        turntable.classList.remove("turntable_arm3")
        turntable.classList.add("turntable_arm2")                                                           
        setTimeout(()=>{
          currentUrl = url;                                  //                         
          audio.src = url; 
          rotate.classList.add("rotate")
          audio.play();
        },800)                                                           
    }
  });
});
