async function writeClipboard(text) {
  await navigator.clipboard.writeText(text);
  console.log("写入剪切板成功！", text);
  showCustomAlert(text);

  setTimeout(() => {
    window.close();
  }, 3000);
}

// 发起一个网络请求获取 website title meta
const fetchWebsiteTitle = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("网络请求失败");
    }

    const text = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "text/html");
    const title = doc.querySelector("title")?.innerText || "未找到标题";

    return title;
  } catch (error) {
    console.error("获取标题时出错:", error);
    return "";
  }
};

const params = new URLSearchParams(window.location.search);

const sharedLink = params.get("link") || params.get("text");
let sharedName = params.get("name");

if (sharedLink && !sharedName) {
  document.getElementById("copyTitleAndLink").disabled = true;
  fetchWebsiteTitle(sharedLink).then((title) => {
    sharedName = title;
    document.getElementById("title").textContent = sharedName || "未获取到标题";

    document.getElementById("copyTitleAndLink").disabled = !title;
  });
}

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
