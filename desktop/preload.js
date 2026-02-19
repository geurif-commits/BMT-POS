const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('bmPosDesktop', { platform: process.platform });
