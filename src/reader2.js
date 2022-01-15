'use strict';

const WASM_URL = 'reader2.wasm';

var wasm;

function getQuerystringByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  const regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
  return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function isValidURL(url) {
  // const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
  //   '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
  //   '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
  //   '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
  //   '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
  //   '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
  // return !!pattern.test(url);
  return true;
}

function copyShareURL() {
  // Change briefly the button text to 'Copied' and then change it back
  const pageURL = document.querySelector('#pageURL').value;
  navigator.clipboard.writeText(window.location.origin + "?url="+pageURL);

  document.querySelector('#copyShareURL').textContent = "Copied!";
  setTimeout(function () {
    document.querySelector('#copyShareURL').textContent = "Copy share URL";
  }, 500)
}

function prettifyPage() {
  const pageURL = document.querySelector('#pageURL').value || getQuerystringByName("url");
  
  if (isValidURL(pageURL)) {
    loadURL('https://cors-proxy.tuananh.workers.dev/?' + pageURL);
  } else {
    console.error('invalid URL: ' + pageURL);
  }
}

function init() {
  const pageURL = getQuerystringByName("url");
  if (isValidURL(pageURL)) {
    document.querySelector('#pageURL').value = getQuerystringByName("url");
  }


  document.querySelector('#copyShareURL').onclick = copyShareURL;
  document.querySelector('#loadURL').onclick = prettifyPage;


  if (!WebAssembly.instantiateStreaming) { // polyfill
    WebAssembly.instantiateStreaming = async (resp, importObject) => {
      const source = await (await resp).arrayBuffer();
      return await WebAssembly.instantiate(source, importObject);
    };
  }

  const go = new Go();
  let mod, inst;
  WebAssembly.instantiateStreaming(fetch(WASM_URL), go.importObject).then(async (result) => {
    mod = result.module;
    inst = result.instance;
    await go.run(inst)
  })

  // TODO: fix this.
  // This is dumb but i dont know how to trigger js function in go/wasm 
  setTimeout(() => {
    if (isValidURL(pageURL)) {
      prettifyPage();
    }
  }, 500);
}

init();
