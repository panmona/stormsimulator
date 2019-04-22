# Stormsimulator.com

[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/maracuja-juice/stormsimulator/issues)

Simulate a thunderstorm with the exact right amount of thunder/lightning. Thanks to the relaxing sound of heavy rain paired with thunder it helps you to relax, study, meditate and sleep.

![Overview of Website](https://user-images.githubusercontent.com/16801528/47524755-ca474900-d89b-11e8-8395-490501621364.jpg)

## Where can I try it out myself?
Click [here](https://stormsimulator.com) to try it out.

## Description of parameters
There are different parameters that will control your experience:
- amount of rain
- amount of lightning
- distance to thunderstorm
- image
- volume
- play state

### Amount of Rain

This will control how loud the rain sound is and how strong you can see the rain in the image.

### Amount of Lightning

This will control how often lightning appears. Lightning will schedule thunder. (In real life thunder always appears after lightning)

### Distance to Thunderstorm

This will control how much time needs to pass between the lightning and the effective thunder sound.

`kilometers * 3 = amount of seconds from lightning to thunder sound`

This is because sound travels one kilometer every three seconds.

### Image
Changes the images the rain animation is shown on.

### Volume
Controls the overall volume.

### Play State
Controls if rain/thunder sounds should play or not.

## Features

- Different Parameters are controllable by the user
- Current configuration is saved to make it possible to have the same configuration across sessions (localStorage)
- Responsiveness ([even for very small screens](https://user-images.githubusercontent.com/16801528/47529436-15ffef80-d8a8-11e8-8429-9677825539ca.jpg))


## Browser Support
[All browsers that support the Web Audio API, which are all modern browsers.](https://caniuse.com/#search=web%20audio)
For other features like the `fetch` function I included a [polyfill](https://en.m.wikipedia.org/wiki/Polyfill_(programming)).

There are some performance problems with the Mobile Safari browser.

## Run it locally
To run it locally you need to open the `index.html` page.

So that the sounds also play you need to supply the sound files yourself because I only got the permission from the sound creators to use the sound files on my website but not for uploading them onto GitHub.

You need to supply the files here:
```
root
  /audio
    /rainloop
      rain.wav      -> this is the file for the rain sound
    /thunder
      thunder-1.wav -> these are the seven different thunder sounds used
      thunder-2.wav 
      thunder-3.wav
      thunder-4.wav
      thunder-5.wav
      thunder-6.wav
      thunder-7.wav
```

## Can I use the images?
Yes. Feel free to use them for what ever you want as I made them myself. [Some of them are also on Unsplash](https://images.unsplash.com/photo-1510426392066-77bde1359ef1?ixlib=rb-0.3.5&s=e61846ded235d15361a7f9fa9bda5cd7&auto=format&fit=crop&w=1500&q=80)

## Contribute
Any type of feedback, pull request or issue is welcome.

Be advised when poking around in the code that this was one of my first bigger JavaScript applications I made. So not everything is as organised as it should be. (Moving this over to a React Application is planned when I get around to doing it) Feel free to submit PRs to improve this!

## License
[MIT](https://tldrlegal.com/license/mit-license)
