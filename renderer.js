async function filePathBtn() {
  document.getElementById("select-destination-btn").addEventListener("click", async () => {
    let dialogObj = await window.functions.getFilePath();
    let localPathName = dialogObj.filePaths[0];
    document.getElementById("destination-path").setAttribute("value", localPathName);
  })
}
filePathBtn();