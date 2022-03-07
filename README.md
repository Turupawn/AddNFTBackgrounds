# Add NFT Background 

This project is inteded as an addon to the [NFT Art Generator](https://github.com/FilosofiaCodigo/nft-art-generator). Solves the problem of having backgound images counted as unique traits.

## Dependencies

```
npm install
```

## Usage

1. Place NFT images without background in `./images/`
2. Place NFT metadata corresponding to images in `./metadata/`
3. Place backgrounds in `./backgrounds/`, make sure the filename corresponds to the `background` metadata trait
4. Edit the rarities in the `backgrounds_amount` array in `add_backgrounds.js`
5. Run `node add_backgrounds.js`

The images and metadata should be exported now to `./output/`.