'use strict';

const WASM_URL = 'wasm.wasm';

var wasm;

function updateResult() {
  console.log(wasm.exports);
  // wasm.exports.update();
  loadURL('https://tuananh.net/posts/2021-09-03-using-k8s-kind-rootlessly-without-docker/');
}

function init() {
  document.querySelector('#loadURL').onclick = updateResult;

  const go = new Go();
  if ('instantiateStreaming' in WebAssembly) {
    console.log('instantiateStreaming');
    WebAssembly.instantiateStreaming(fetch(WASM_URL), go.importObject).then(function (obj) {
      wasm = obj.instance;
      go.run(wasm);
    })
  } else {
    console.log('instantiateStreaming not supported');
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
