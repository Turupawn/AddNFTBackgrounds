#!/usr/bin/env node

//TODO
//CHECK FOR TRAILING SLASHES ON ALL INPUTS

//IMPORTS
const chalk = require('chalk');
const boxen = require('boxen');
const ora = require('ora');
const inquirer = require('inquirer');
const fs = require('fs');
const { readFile, writeFile, readdir } = require("fs").promises;
const mergeImages = require('merge-images');
const { Image, Canvas } = require('canvas');
const ImageDataURI = require('image-data-uri');


let backgrounds_path = "./backgrounds/"
let no_background_path = "./images/"
let metadata_path = "./metadata/"
var backgrounds = []
// Edit rarities here:
var backgrounds_amount = [5,5,5,5]

async function addBackgounds() {
  fs.mkdirSync("./output/metadata/", { recursive: true })
  fs.readdirSync(backgrounds_path).forEach(file => {
    backgrounds.push(file)
    console.log(file)
  });
  fs.readdirSync(metadata_path).forEach(file => {
    console.log(file);
    var background_index
    do {
      background_index = [Math.floor(Math.random()*backgrounds.length)]
    } while (backgrounds_amount[background_index] <= 0)
    backgrounds_amount[background_index] -= 1
    mergeImage(backgrounds_path + backgrounds[background_index], no_background_path + file + ".png", "./output/" + file)
    mergeJSON(background_index, file)
  });
}

async function mergeImage(a, b, result) {
  const b64 = await mergeImages([a, b], { Canvas: Canvas, Image: Image });
  await ImageDataURI.outputFile(b64, result);
}

async function mergeJSON(background_index, file) {
  try {
    const data = await readFile(metadata_path + file)
    var original_metadata = JSON.parse(data.toString())
    console.log(backgrounds[background_index].replace(/\.[^/.]+$/, ""))
    var background_name = backgrounds[background_index].replace(/\.[^/.]+$/, "")
    original_metadata["attributes"].unshift({background: background_name})
    await writeFile("./output/metadata/"+file, JSON.stringify(original_metadata))
  } catch (error) {}
}

addBackgounds()