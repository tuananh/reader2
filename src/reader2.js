'use strict';

const WASM_URL = 'reader2.wasm';

var wasm;

function getQuerystringByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
  return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function isValidURL(url) {
  // TODO: 
  return true;
}

function prettifyPage() {
  const pageURL = document.querySelector('#pageURL').value;
  if (isValidURL(pageURL)) {
    console.log('valid URL. Printing reader mode for ' + pageURL) 
    loadURL('https://cors-proxy.tuananh.workers.dev/?' + pageURL);
  } else {
    console.error('invalid URL');
  }
}

function init() {
  const pageURL = getQuerystringByName("url");
  if (isValidURL(pageURL)) {
    document.querySelector('#pageURL').value = getQuerystringByName("url");
  }
  
  document.querySelector('#loadURL').onclick = prettifyPage;

  const go = new Go();
  if ('instantiateStreaming' in WebAssembly) {
    WebAssembly.instantiateStreaming(fetch(WASM_URL), go.importObject).then(function (obj) {
      wasm = obj.instance;
      go.run(wasm);
    })
  } else {
    fetch(WASM_URL).then(resp =>
      resp.arrayBuffer()
    ).then(bytes =>
      WebAssembly.instantiate(bytes, go.importObject).then(function (obj) {
        wasm = obj.instance;
        go.run(wasm);
      })
    )
  }
}

init();
