#  gRPC Code Generation

Now generate Typescript from your proto definitions:
```bash
protoc --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
  -I/usr/local/include \
  -I. \
  -I$GOPATH/src/git.tcncloud.net/m/protos/ \
  -I$GOPATH/src/git.tcncloud.net/m/protos/matrix \
  -I$GOPATH/src \
  -I$GOPATH/src/github.com/grpc-ecosystem/grpc-gateway/third_party/googleapis \
--ts_out=service=true:proto labels.proto
```


## Dog Saga - Redux-Saga Beginner Tutorial
Unfortunately there are no up-to date examples of Typescript with Redux, thus, we have this library.   
>>>>>>> f2eae3f398adce4e6ffe27cd301d5988a732f111

The projects this was derived from:
+ https://hackernoon.com/redux-saga-tutorial-for-beginners-and-dog-lovers-aa69a17db645
+ https://github.com/zposten/Catalyst/
+ https://github.com/piotrwitek/react-redux-typescript-guide

## Compilation
The compilation of this project uses a few steps: 
1. **Transpile** `.ts` and `.tsx` files into `.js` and `.jsx` files respectively into the `tsc_dist` folder.
2. **Copy** the files the tranpiler missed into the `tsc_dist` folder.
3. **Point** your `public/index.html` to the newly generated `tsc_dist/index.js`
4. Use Parcel to **bundle** your `public/index.html` which uses the `tsc_dist` folder into a new directory called `dist`.

## Setup Hot Reloading
First install node modules:   
`npm i`   
Then start both the **typescript compiler** and **parcel bundler** in watch mode:   
`npm run start`   

**TODO** Why does the browser need a reload???

