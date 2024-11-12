async function writeClipboard(text) {
  await navigator.clipboard.writeText(text);
  console.log("写入剪切板成功！", text);
  showCustomAlert(text);

  setTimeout(() => {
    window.close();
  }, 3000);
}

const params = new URLSearchParams(window.location.search);

const sharedName = params.get("name");
const sharedLink = params.get("link") || params.get("text");

// 显示分享的标题
document.getElementById("title").textContent = sharedName || "未获取到标题";
document.getElementById("link").textContent = sharedLink || "未获取到链接";

// 绑定按钮事件
document.getElementById("copyLink").onclick = () => writeClipboard(sharedLink);
document.getElementById("copyTitleAndLink").onclick = () =>
  writeClipboard(`${sharedName}\n${sharedLink}`);
document.getElementById("copyMarkdown").onclick = () =>
  writeClipboard(`[${sharedName}](${sharedLink})`);

const showCustomAlert = (text) => {
  const alertBox = document.createElement("div");
  alertBox.className = "custom-alert";
  alertBox.innerText = `写入剪切板成功！\n\n${text}`;
  // 增加一个关闭页面按钮
  const closeButton = document.createElement("button");
  closeButton.innerText = "关闭页面";
  closeButton.onclick = () => {
    window.close();
  };
  alertBox.appendChild(closeButton);

  document.body.appendChild(alertBox);

  setTimeout(() => {
    alertBox.remove();
  }, 3000); // 3秒后自动消失
};

// CSS 样式
const style = document.createElement("style");
style.innerHTML = `
  .custom-alert {
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: #4caf50;
    color: white;
    padding: 15px;
    border-radius: 5px;
    z-index: 1000;
    animation: fadeIn 0.5s, fadeOut 0.5s 2.5s;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }
`;
document.head.appendChild(style);
