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


async function itsMyGeneration() {
  let no_background_path = "./no_background/"
  let backgrounds_path = "./backgrounds/"
  var backgrounds = []
  var backgrounds_amount = [5,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  fs.readdirSync(backgrounds_path).forEach(file => {
    backgrounds.push(file)
    console.log(file)
  });
  fs.readdirSync(no_background_path).forEach(file => {
    console.log(file);
    var background_index
    do {
      background_index = [Math.floor(Math.random()*backgrounds.length)]
    } while (backgrounds_amount[background_index] <= 0)
    backgrounds_amount[background_index] -= 1
    leMerge(backgrounds_path + backgrounds[background_index], no_background_path + file, "./output/" + file)
  });
}

async function leMerge(a, b, result) {
  const b64 = await mergeImages([a, b], { Canvas: Canvas, Image: Image });
  await ImageDataURI.outputFile(b64, result);
}

itsMyGeneration()