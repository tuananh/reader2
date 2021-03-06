package main

import (
	"log"
	"net/http"
	nurl "net/url"
	"syscall/js"

	readability "github.com/go-shiori/go-readability"
)

const WIP_MESSAGE string = "<a href=\"#\" aria-busy=\"true\">Generating text, please wait…</a>"
const DONE_MESSAGE string = "<a href=\"#\" aria-busy=\"false\">Done!</a>"
const EMPTY_MESSAGE string = ""
const FAIL_TO_DOWNLOAD_MESSAGE string = "<a href=\"#\" aria-busy=\"true\">Failed to download URL…</a>"
const FAIL_TO_PARSE_MESSAGE string = "<a href=\"#\" aria-busy=\"true\">Failed to parse URL…</a>"

var (
	document js.Value
)

func main() {
	c := make(chan struct{}, 0)
	document = js.Global().Get("document")
	js.Global().Set("loadURL", js.FuncOf(loadURLFunction))
	<-c
}

func updateStatus(message string) {
	document.Call("getElementById", "status").Set("innerHTML", message)
}

func loadURLFunction(this js.Value, args []js.Value) interface{} {
	updateStatus(WIP_MESSAGE)
	url := args[0].String()

	go func() {
		resp, err := http.Get(url)
		if err != nil {
			log.Fatalf("failed to download %s: %v\n", url, err)
			updateStatus(FAIL_TO_DOWNLOAD_MESSAGE)
		}
		defer resp.Body.Close()
		pageURL, _ := nurl.ParseRequestURI(url)
		article, err := readability.FromReader(resp.Body, pageURL)
		if err != nil {
			log.Fatalf("failed to parse %s: %v\n", url, err)
			updateStatus(FAIL_TO_PARSE_MESSAGE)
		}

		document.Call("getElementById", "title").Set("innerHTML", article.Title)
		document.Call("getElementById", "output").Set("innerHTML", article.Content)

		updateStatus(DONE_MESSAGE)

	}()

	return nil
}
