async function writeClipboard(link) {
  await navigator.clipboard.writeText(link);
  console.log("写入剪切板成功！", link);
  window.close();
  alert(`写入剪切板成功！\n\n${link}`);
}

const params = new URL(location + "").searchParams;
const sharedName = params.get("name");
const sharedText = params.get("text");
const sharedLink = params.get("link");

if (sharedText) writeClipboard(sharedText);
