'use strict';

let rainSoundPlayer = (function() {
    function audioContextCheck() {
        if (typeof AudioContext !== 'undefined') {
            return new AudioContext();
        } else if (typeof webkitAudioContext !== 'undefined') {
            return new webkitAudioContext();
        } else {
            console.error(`this browser doesn't support the Web Audio API!`);
            return undefined;
        }
    }

    let gainNode, shouldStart, audioData, srcNode;
    let audioContext;

    let src = `https://${location.hostname}/audio/rainloop/rain.wav`;
    let globalVolume = 1;
    let volumeModifier = 1;
    function calculateVolume() {
        return globalVolume * volumeModifier;
    }

    function changeVolume() {
        if (gainNode) {
            gainNode.gain.linearRampToValueAtTime(calculateVolume(), audioContext.currentTime + 0.1);
        }
    }

    function stop() {
        const currentTime = audioContext.currentTime;
        // A 0 value is not allowed!
        gainNode.gain.linearRampToValueAtTime(0.0001, currentTime + 1);
        srcNode.stop(currentTime + 1);
    }

    // Set up a new source node as needed, as stopping will render current invalid
    function playLoop(abuffer) {
        srcNode = audioContext.createBufferSource();
        srcNode.buffer = abuffer;

        // make volume change possible
        gainNode = audioContext.createGain();
        srcNode.connect(gainNode);

        gainNode.connect(audioContext.destination); // create output
        srcNode.loop = true;

        gainNode.gain.setValueAtTime(0.0001, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(
            calculateVolume(),
            audioContext.currentTime + 0.1
        );

        srcNode.start();
    }

    return {
        init: file => {
            fetch(src, { mode: 'cors' })
                .then(function(resp) {
                    return resp.arrayBuffer();
                })
                .then(decode)
                .catch(err => {
                    alert('Failed to fetch the rain and thunder sounds. Please try again.');
                })
                //.then(domUtility.removeLoadingText(globalConfig.labels.loading));

            function decode(buffer) {
                audioContext.decodeAudioData(buffer, decodedData => {
                    audioData = decodedData;
                    if (shouldStart) {
                        playLoop(audioData);
                    }

                    domUtility.removeLoadingText(
                        pageElements.pauseButton.icon,
                        pageElements.pauseButton.loading,
                        globalConfig.labels.loading);

                });
            }
        },
        unlockWebAudioApi: () => {
            audioContext = audioContextCheck();

            // Source: https://stackoverflow.com/a/32840804/5504438
            // create a dummy sound - and play it immediately in same 'thread'
            var oscillator = audioContext.createOscillator();
            oscillator.frequency.value = 400;
            oscillator.connect(audioContext.destination);
            oscillator.start(0);
            oscillator.stop(0);

            // audio context is now 'unlocked' and ready to load and play sounds asynchronously
            // 'context' must be stored for future usage. DON'T recreate more AudioContexts
        },
        pause: function() {
            if (srcNode) {
                stop();
            } else {
                this.changeVolume(0);
            }
        },
        resume: function() {
            this.start();
        },
        start: () => {
            if (audioData) {
                playLoop(audioData);
            } else {
                shouldStart = true;
            }
        },
        setNewGlobalVolume: function(newGlobalVolume) {
            if(newGlobalVolume <= 0) {
                newGlobalVolume = 0.00000000001;
            }
            globalVolume = newGlobalVolume;
            changeVolume();
        },
        changeVolumeModifier: function(newVolumeModifier) {
            if(newVolumeModifier <= 0) {
                newVolumeModifier = 0.00000000001;
            }
            volumeModifier = newVolumeModifier;
            changeVolume();
        },
    };
})();
