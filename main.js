
class HorrorConsole {
    constructor() {
        this.audioContext = null;
        this.typingSound = null;
        this.consoleContent = document.getElementById('console-content');
        this.cursor = document.getElementById('cursor');
        this.glitchOverlay = document.getElementById('glitch-overlay');
        this.typeSpeed = 50; 
        this.glitchTimeout = 0;
        this.cursorPosition = 0;

        
        this.bioData = {
            name: ["WAQQARE", "Unknown", "[REDACTED]"],
            notes: [
                "WAQQARE SEE YOU",
                "NOT_HUMAN",
                "//:WARNING: Terminal compromised by unknown entity//::"
            ]
        };

        
        this.setupEventListeners();
        this.startSequence();
    }

    setupEventListeners() {
       
        const closeButton = document.querySelector('.control.close');
        closeButton.addEventListener('click', () => {
            this.simulateSystemError();
        });

       
        document.addEventListener('click', () => {
            if (!this.audioContext) {
                this.initAudio();
            }
        });

        
        document.addEventListener('mousemove', () => {
            if (Math.random() < 0.01) {
                this.triggerRandomGlitch();
            }
        });
    }

    initAudio() {
        try {
            
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        catch (e) {
            console.error('Web Audio API not supported');
        }
    }

    makeTypingSound() {
        if (!this.audioContext)
            return;

        if (this.typingSound) {
            this.typingSound.stop();
            this.typingSound.disconnect();
        }

        this.typingSound = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        this.typingSound.type = 'square';
        this.typingSound.frequency.value = 50 + Math.random() * 30;
        gainNode.gain.value = 0.05;

        this.typingSound.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        this.typingSound.start();

        setTimeout(() => {
            if (this.typingSound) {
                this.typingSound.stop();
                this.typingSound.disconnect();
                this.typingSound = null;
            }
        }, 30);
    }

    startSequence() {
        this.typeText('SYSTEM BOOT', 'command');

        setTimeout(() => {
            this.typeText('\nINITIALIZING', 'system-text');

            setTimeout(() => {
                this.typeText('\nACCESSING SECURE DATABASE', 'system-text');

                setTimeout(() => {
                    this.typeText('\nSECURITY BREACH DETECTED!', 'error-text');

                    setTimeout(() => {
                        this.typeText('\nSEE', 'system-text');

                        setTimeout(() => {
                            this.typeText('\nAccessing restricted files', 'command');

                            setTimeout(() => {
                                this.typeText('\nDisplaying Subject Bio', 'system-text');

                                setTimeout(() => {
                                    this.displayBio();
                                }, 1000);
                            }, 1000);
                        }, 1000);
                    }, 1000);
                }, 1500);
            }, 1000);
        }, 1000);
    }

    typeText(text, className = '') {
        const span = document.createElement('span');
        if (className) {
            span.classList.add(className);
        }

        this.consoleContent.insertBefore(span, this.cursor);
        this.cursorPosition = 0;

        const type = () => {
            if (this.cursorPosition < text.length) {
                span.textContent += text.charAt(this.cursorPosition);
                this.cursorPosition++;
                this.makeTypingSound();
                window.setTimeout(type, this.typeSpeed + Math.random() * 50);
            }
        };

        type();
    }

    displayBio() {
        
        const bioContainer = document.createElement('div');
        bioContainer.classList.add('bio-container');
        this.consoleContent.insertBefore(bioContainer, this.cursor);

        
        const accessDiv = document.createElement('div');
        accessDiv.classList.add('error-text');
        accessDiv.style.margin = '20px 0';
        accessDiv.textContent = '>>> ACCESS GRANTED <<<';
        bioContainer.appendChild(accessDiv);

        // Create bio header
        const bioHeader = document.createElement('div');
        bioHeader.classList.add('bio-header');
        bioHeader.innerHTML = `
          <div class="bio-title">CLASSIFIED PERSONNEL FILE</div>
          <div class="system-text">WARNING: Unauthorized access is punishable by termination</div>
        `;
        bioContainer.appendChild(bioHeader);

       
        let delay = 500;
        Object.entries(this.bioData).forEach(([key, values]) => {
            setTimeout(() => {
                const section = document.createElement('div');
                section.classList.add('bio-section');

               
                const title = document.createElement('div');
                title.classList.add('bio-title');
                title.textContent = key.toUpperCase() + ':';
                section.appendChild(title);

              
                const content = document.createElement('div');
                content.classList.add('bio-content');

                values.forEach((value, index) => {
                    if (index > 0) {
                        content.appendChild(document.createElement('br'));
                    }

                    
                    if (Math.random() < 0.3) {
                       
                        const glitchSpan = document.createElement('span');
                        glitchSpan.textContent = value;
                        glitchSpan.classList.add('error-text');
                        content.appendChild(glitchSpan);
                    }
                    else {
                        content.appendChild(document.createTextNode(value));
                    }
                });

                section.appendChild(content);
                bioContainer.appendChild(section);

                
                if (Math.random() < 0.3) {
                    this.triggerRandomGlitch();
                }
            }, delay);

            delay += 800;
        });

       
        setTimeout(() => {
            const footer = document.createElement('div');
            footer.classList.add('error-text');
            footer.style.marginTop = '30px';
            footer.innerHTML = `WARNING: ENTITY_DETECTED_ON_YOUR_SYSTEM<br>DISCONNECT IMMEDIATELY`;
            bioContainer.appendChild(footer);

           
            setTimeout(() => {
                this.typeText('\n\nC:\\>', 'command');

              
                setTimeout(() => {
                    this.typeText('I SEE YOU', 'error-text');
                    this.triggerMajorGlitch();
                }, 3000);
            }, 1000);
        }, delay + 1000);
    }

    triggerRandomGlitch() {
       
        if (this.glitchTimeout) {
            clearTimeout(this.glitchTimeout);
        }

       
        document.body.style.filter = `hue-rotate(${Math.random() * 360}deg)`;
        this.consoleContent.style.transform = `translateX(${(Math.random() - 0.5) * 10}px)`;
        this.glitchOverlay.style.opacity = '0.3';

      
        this.glitchTimeout = window.setTimeout(() => {
            document.body.style.filter = '';
            this.consoleContent.style.transform = '';
            this.glitchOverlay.style.opacity = '0';
        }, 100 + Math.random() * 200);
    }

    triggerMajorGlitch() {
        
        const duration = 2000; 
        const intervalTime = 100; 
        const glitchInterval = window.setInterval(() => {
           
            const filters = [
                `blur(${Math.random() * 5}px)`,
                `hue-rotate(${Math.random() * 360}deg)`,
                `contrast(${100 + Math.random() * 100}%)`,
                `brightness(${100 + Math.random() * 50}%)`
            ];

            document.body.style.filter = filters[Math.floor(Math.random() * filters.length)];

            
            this.consoleContent.style.transform = `
            translateX(${(Math.random() - 0.5) * 20}px)
            translateY(${(Math.random() - 0.5) * 10}px)
            skewX(${(Math.random() - 0.5) * 5}deg)
          `;

            
            this.glitchOverlay.style.opacity = (0.2 + Math.random() * 0.4).toString();
        }, intervalTime);

       
        setTimeout(() => {
            clearInterval(glitchInterval);
            document.body.style.filter = '';
            this.consoleContent.style.transform = '';
            this.glitchOverlay.style.opacity = '0';
        }, duration);
    }

    simulateSystemError() {
        this.typeText('\n\nSYSTEM ERROR: Terminal will shut down in 5 seconds', 'error-text');

        let countdown = 5;
        const countdownInterval = setInterval(() => {
            countdown--;
            if (countdown <= 0) {
                clearInterval(countdownInterval);
                this.triggerMajorGlitch();

                
                setTimeout(() => {
                    const blueScreen = document.createElement('div');
                    blueScreen.style.position = 'fixed';
                    blueScreen.style.top = '0';
                    blueScreen.style.left = '0';
                    blueScreen.style.width = '100%';
                    blueScreen.style.height = '100%';
                    blueScreen.style.backgroundColor = '#000064';
                    blueScreen.style.color = '#ffffff';
                    blueScreen.style.padding = '50px';
                    blueScreen.style.fontFamily = 'monospace';
                    blueScreen.style.fontSize = '18px';
                    blueScreen.style.zIndex = '1000';
                    blueScreen.innerHTML = `
                    <div style="margin-bottom: 30px;">FATAL SYSTEM ERROR</div>
                    <div>The system has been terminated due to an unknown security breach.</div>
                    <div style="margin-top: 10px;">Error code: 0x000000666</div>
                    <div style="margin-top: 40px;">* Press F5 to restart the system *</div>
                  `;
                    document.body.appendChild(blueScreen);
                }, 1000);
            }
            else {
                this.typeText(` ${countdown}...`, 'error-text');
            }
        }, 1000);
    }
}


document.addEventListener('DOMContentLoaded', () => {
    new HorrorConsole();
});
