import * as MicrosoftGraph from '@microsoft/microsoft-graph-client';
import { getToken, ensureScope } from './auth';

import * as api from './api/index.js';
// Create an authentication provider
const authProvider = {
  getAccessToken: async () => {
    // Call getToken in auth.js
    return await getToken();
  }
};
// Initialize the Graph client
const graphClient = MicrosoftGraph.Client.initWithMiddleware({ authProvider });
//Get user info from Graph
export async function getUser() {
  ensureScope('user.read');
  return await graphClient.api('/me').select('id,displayName').get();
}

// Get files in root of user's OneDrive
export async function getFiles() {
  ensureScope('files.read');
  try {
    const response = await graphClient
      .api('/me/drive/root/children')
      .select('id,name,folder,package')
      .get();
    return response.value;
  } catch (error) {
    console.error(error);
  }
}
export async function downloadFile(file) {
  try {
    const response = await graphClient
      .api(`/me/drive/items/${file.id}`)
      .select('@microsoft.graph.downloadUrl')
      .get();
    const downloadUrl = response['@microsoft.graph.downloadUrl'];
    window.open(downloadUrl, '_self');
  } catch (error) {
    console.error(error);
  }
}
let postData = {
  // selectedFile: []
  uploadedToOneDrive: true
};
const fetchDataAction = async (rowId) => {
  let newPost = await api.updatePost(rowId, { ...postData });
  alert('File Uploaded to One Drive successfully!');
};
export async function uploadFile(file, folderName, rowId) {
  try {
    // const driveItem = {
    //   name: 'New asd1',
    //   folder: {},
    //   '@microsoft.graph.conflictBehavior': 'rename'
    // };

    // const res = await graphClient.api('/me/drive/root/children').post(driveItem);

    // if (res) {
    console.log(file.length);
    if (file.length) {
      ensureScope('files.readwrite');
      let options11 = [];
      file.map((x) => {
        options11.push({
          path: '/',
          fileName: x.name,
          rangeSize: x.size // must be a multiple of 320 KiB
        });
      });
      if (options11.length) {
        for (var i = 0; i < options11.length; i++) {
          const uploadTask = await graphClient
            .api(`/me/drive/root:/${folderName}/${options11[i].fileName}:/content`)
            .put(options11[i]);
          console.log(uploadTask);
          if (uploadTask) fetchDataAction(rowId);
        }
      }
    } else {
      ensureScope('files.readwrite');
      let options11 = {
        path: '/',
        fileName: file.name,
        rangeSize: file.size // must be a multiple of 320 KiB
      };
      const uploadTask = await graphClient
        .api(`/me/drive/root:/${folderName}/${options11.fileName}:/content`)
        .put(options11);
      console.log(uploadTask);
      if (uploadTask) fetchDataAction(rowId);
    }
    // }
    // ensureScope('files.readwrite');
    // let options = {
    //   path: '/',
    //   fileName: file.name,
    //   rangeSize: 1024 * 1024 // must be a multiple of 320 KiB
    // };
    // const uploadTask = await MicrosoftGraph.OneDriveLargeFileUploadTask.create(
    //   graphClient,
    //   file,
    //   options
    // );
    // const response = await uploadTask.upload();
    // console.log(`File ${response.name} of ${response.size} bytes uploaded`);
    // return response;
  } catch (error) {
    console.error(error);
  }
}
