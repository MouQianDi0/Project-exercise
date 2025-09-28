// document.getElementById：获取标签id
// classList.contains：获得标签样式
// classList.remove：移除样式
// classList.add：增加样式
// style.backgroundColor：给样式加背景色


const p = document.createElement("button");
const btn = document.getElementById("myButton")
const box = document.getElementById("title")

p.textContent = "打开";
p.style.backgroundColor = "";
p.className = "my-button";
p.id = "myButton"

document.getElementById("container").appendChild(p);

// 事件监听只需要加一次
p.addEventListener("click", () => {
  if (p.textContent === "打开" && box.classList.contains("style1")) {
    p.textContent = "关闭";
    p.style.backgroundColor = "red";
    box.classList.remove("style1");
    box.classList.add("style2");
    }
    else {
    p.textContent = "打开";
    p.style.backgroundColor = "";
    box.classList.remove("style2");
    box.classList.add("style1");
  }
});
