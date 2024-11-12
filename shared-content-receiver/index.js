async function writeClipboard(text) {
  await navigator.clipboard.writeText(text);
  console.log("写入剪切板成功！", text);
  alert(`写入剪切板成功！\n\n${text}`);
  window.close();
}

const params = new URL(location + "").searchParams;
const sharedName = params.get("name");
const sharedText = params.get("text");
const sharedLink = params.get("link");

// 显示分享的标题
document.getElementById('title').textContent = sharedName || '未获取到标题';

// 绑定按钮事件
document.getElementById('copyLink').onclick = () => writeClipboard(sharedLink);
document.getElementById('copyTitleAndLink').onclick = () => writeClipboard(`${sharedName}\n${sharedLink}`);
document.getElementById('copyMarkdown').onclick = () => writeClipboard(`[${sharedName}](${sharedLink})`);
