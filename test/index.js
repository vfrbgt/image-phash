'use strict';

const should = require('should');
const fs = require('fs');
const util = require('util');
const sharp = require('sharp');
const imageHash = require('../index');

const readFileAsync = util.promisify(fs.readFile);

describe('Test image-phash', () => {

    it('Try get simple hash from buffer pixels', async function() {
        let fileData = await readFileAsync(__dirname+'/files/1.jpg');
        let image = sharp(fileData);
        let bufferOfPixels = await image.resize(64, 64).jpeg({
            quality: 100
        }).raw().toBuffer();
        let hash1 = await imageHash.hashByAverageValueBytes(bufferOfPixels);
        should.exist(hash1);
        should(hash1.length).be.above(0);
    });

    it('Try get simple hash from file', async function() {
        let hash1 = await imageHash.getHashFile(__dirname+'/files/1.jpg');
        should.exist(hash1);
        should(hash1.length).be.above(0);
    });

    it('Try compare 2 files', async function() {
        let hash1 = await imageHash.getHashFile(__dirname+'/files/1.jpg');
        let hash2 = await imageHash.getHashFile(__dirname+'/files/2.jpg');

        let distance = imageHash.hammingDistance(hash1, hash2);
        should.exist(hash1);
        should.exist(hash2);
        should(distance).be.above(0);
    });
});