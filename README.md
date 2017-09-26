# Image Hash

Lib for get unique hash from image for comparison. Using simple algorithm average color of bytes. 

## Install

```bash
npm install image-phash
```

## Usage example

```js
const imageHash = require('image-phash');

let hash1 = await imageHash.getHashFile('1.jpg');
let hash2 = await imageHash.getHashFile('2.jpg');

console.log(ImageHash.hammingDistance(hash1, hash2));
```

### getHashFile(filePath, [options])

Get hash from file path. (Return promise)

options:

```js
{
    resizeBeforeHash: [64, 64] // resize image befaore hashing [64, 64] by default
}
```

### hammingDistance(hash1, hash2)

Calc hamming distance from hash1 and hash2. (It will help to know how much the first picture differs from the second by hash)

### hashByAverageValueBytes(buffer)

Get hash from buffer of the image pixels (Throw error if passed not a buffer)