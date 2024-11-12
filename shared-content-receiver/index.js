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
  const customAlert = document.querySelector(".custom-alert");
  const alertContent = document.querySelector(".custom-alert-content");
  alertContent.innerText = text;
  customAlert.classList.remove("hidden");

  setTimeout(() => {
    customAlert.classList.add("hidden");
  }, 3000); // 3秒后自动消失
};
