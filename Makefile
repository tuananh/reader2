build: clean
	GOOS=js GOARCH=wasm go build -o ./html/wasm.wasm ./src/wasm.go
	cp ./src/wasm.js ./html/
	cp ./src/index.html ./html/
	cp $$(go env GOROOT)/misc/wasm/wasm_exec.js ./html/

dev: build
	go run server.go

clean:
	rm -rf ./html
	mkdir ./html