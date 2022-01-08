build: clean
	GOOS=js GOARCH=wasm go build -ldflags="-s -w" -o ./html/reader2.wasm ./src/wasm.go
	cp ./src/reader2.js ./html/
	cp ./src/index.html ./html/
	cp $$(go env GOROOT)/misc/wasm/wasm_exec.js ./html/

dev: build
	go run server.go

clean:
	rm -rf ./html
	mkdir ./html