import { signIn } from './auth';
import { getUser, getFiles, uploadFile, downloadFile } from './graph';

export async function displayUI() {
  await signIn();

  // Display info from user profile
  const user = await getUser();
  localStorage.setItem('toUpload', JSON.stringify(user));
  var userName = document.getElementById('userName');
  userName.innerText = user.displayName;
  // Hide login button and initial UI
  var signInButton = document.getElementById('signin');
  signInButton.style = 'display: none';
  var content = document.getElementById('content');
  content.style = 'display: block';

  displayFiles();
}
async function displayFiles() {
  const files = await getFiles();
  const ul = document.getElementById('downloadLinks');
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
  for (let file of files) {
    if (!file.folder && !file.package) {
      let a = document.createElement('a');
      a.href = '#';
      a.onclick = () => {
        downloadFile(file);
      };
      a.appendChild(document.createTextNode(file.name));
      let li = document.createElement('li');
      li.appendChild(a);
      ul.appendChild(li);
    }
  }
}
export function fileSelected(e, folderName, rowId) {
  let success;
  // displayUploadMessage(`Uploading ${e[0].name}...`);
  let note = uploadFile(e, folderName, rowId).then((response) => {
    console.log(response);
    success = response;

    // displayUploadMessage(`File ${response.name} of ${response.size} bytes uploaded`);
    // displayFiles();
  });
  if (success) return success;
}

function displayUploadMessage(message) {
  const messageElement = document.getElementById('uploadMessage');
  messageElement.innerText = message;
}
