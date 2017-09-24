const sharp = require('sharp');
const fs = require('fs');
const util = require('util');

const readFileAsync = util.promisify(fs.readFile);
const resizeBeforeHash = [64, 64];

class ImageHash {

    static hashByAverageValueBytes(buffer) {
        let bytesArray = [];
        let totalAmount = 0;
        if (!util.isBuffer(buffer)) {
            throw new Error('Value is not buffer!');
        }
        for (let i = 0; i < parseInt(buffer.length); i++) {
            bytesArray.push(buffer.readInt8(i));
            totalAmount += buffer.readInt8(i);
        }
        let averageValue = totalAmount / parseInt(buffer.length);
        return bytesArray.map(function (number) {
            if (averageValue > number) {
                return 1;
            }
            else {
                return 0;
            }
        }).join('');
    }

    static hammingDistance(hash1, hash2) {
        let distance = Math.abs(hash1.length - hash2.length);
        for (let i = 0; i < hash1.length; i++) {
            if (hash1[i] !== hash2[i]) {
                distance++;
            }
        }
        return distance;
    }

    static async getHashFile(fileName, options = {}) {
        let resize = options.resizeBeforeHash || resizeBeforeHash;

        let fileData = await readFileAsync(fileName);
        let bufferOfPixels = await sharp(fileData).resize(...resize).jpeg({
            quality: 100
        }).raw().toBuffer();
        return ImageHash.hashByAverageValueBytes(bufferOfPixels);
    }
}

module.exports = {
    hashByAverageValueBytes: ImageHash.hashByAverageValueBytes,
    getHashFile: ImageHash.getHashFile,
    hammingDistance: ImageHash.hammingDistance
};