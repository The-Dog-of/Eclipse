document.addEventListener("DOMContentLoaded", () => {
    

    const toggleBtn = document.getElementById('theme-toggle');
    
    if (toggleBtn) {
        const icon = toggleBtn.querySelector('i');
        const body = document.body;

        toggleBtn.addEventListener('click', () => {
            body.classList.toggle('light-theme');
            
            if (body.classList.contains('light-theme')) {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            } else {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            }
        });
    }


    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    const navactions = document.querySelector('.nav-actions');

    if (hamburger && navLinks && navactions) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            const icon = hamburger.querySelector('i');

            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });


        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = hamburger.querySelector('i');
                if(icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }


    const sections = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    }, { threshold: 0.15 });
    sections.forEach(s => observer.observe(s));


    const squadSection = document.querySelector(".squad-stats");
    if(squadSection) {
        const counters = document.querySelectorAll(".counter");
        const counterObserver = new IntersectionObserver((entries) => {
            if(entries[0].isIntersecting) {
                counters.forEach(c => {
                    const target = +c.dataset.target;
                    let count = 0;
                    const update = () => {
                        const increment = Math.ceil(target / 40); 
                        if(count < target) {
                            count += increment;
                            if(count > target) count = target;
                            c.innerText = count;
                            setTimeout(update, 200);
                        }
                    };
                    update();
                });
            }
        });
        counterObserver.observe(squadSection);
    }


    const decodeTextElement = document.querySelector('.cyber-decode-text');
    if (decodeTextElement) {
        const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&?@$<>[]{}';
        const targetWord = decodeTextElement.getAttribute('data-target') || 'ECLIPSE';
        let isAnimating = false;

        const getRandomChar = () => randomChars[Math.floor(Math.random() * randomChars.length)];
        const runDecodeSequence = () => {
            if (isAnimating) return;
            isAnimating = true;
            
            let iterations = 0;
            decodeTextElement.classList.add('scrambled');
            decodeTextElement.classList.remove('success-pulse');

            const intervalId = setInterval(() => {
                decodeTextElement.innerText = targetWord
                    .split("")
                    .map((letter, index) => {

                        if (index < iterations) {
                            return targetWord[index];
                        }

                        return getRandomChar();
                    })
                    .join("");

                iterations += 1 / 3; 

                if (iterations >= targetWord.length) {
                    clearInterval(intervalId);
                    decodeTextElement.innerText = targetWord; 
                    decodeTextElement.classList.remove('scrambled');
                    decodeTextElement.classList.add('success-pulse');

                    setTimeout(() => {
                        let destroyIterations = 0;
                        decodeTextElement.classList.add('scrambled');
                        
                        const destroyInterval = setInterval(() => {
                             decodeTextElement.innerText = targetWord
                                .split("")
                                .map(() => getRandomChar())
                                .join("");
                            
                            destroyIterations++;
                            
                            if(destroyIterations > 15) {
                                clearInterval(destroyInterval);
                                isAnimating = false;

                                setTimeout(runDecodeSequence, 200); 
                            }
                        }, 100);
                    }, 3000);
                }
            }, 140);
  
        };

        runDecodeSequence();
    }

});
