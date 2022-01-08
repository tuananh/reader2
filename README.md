reader2
=======

This is successor to the [old reader project](https://github.com/tuananh/reader) of mine written in JS and deployed on CloudFlare workers.

This is just a weekend project for me to learn Go and WebAssembly. Pardon the beginner mistakes you may find in this repo :)

The end goal is same as v1. Nothing change. In the end, you get a sharable URL like below:

```
https://<this-website.com>/?url=https://www.theverge.com/xyz
```


![](./assets/preview.png)


## TODO

- [ ] Reduce wasm binary size. Look more into TinyGo.
- [ ] Find out how to trigger a `js.Func` at init.

## License

Copyright 2022 Tuan Anh Tran https://tuananh.org

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.