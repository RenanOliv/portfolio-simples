class Typewriter {
    constructor(elementSelector, typingSpeed = 50, waitSpeed = 2000) {
        this.element = document.querySelector(elementSelector)
        this.typingSpeed = typingSpeed
        this.waitSpeed = waitSpeed
        this.waiting = false
        this.wordList = [
            'Contabilizei',
            'Swap',
            'Localiza',
            'Senac', 
            'Dale Carnegie',
        ].map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)

        this.currentWordIndex = 0
        this.removeLetter = true
    }

    remove() {
        var content = this.element.textContent.replace('_', '').substring(
            0,
            this.element.textContent.replace('_', '').length - 1
        )

        
        this.element.textContent = content == 0
            ? '_'
            : content + '_'

        return content.length
    }

    add(newWord) {
        var content = this.element.textContent = newWord.substring(
            0,
            this.element.textContent.length + 1
        )
    
        this.element.textContent = content == 0
            ? '_'
            : content

        return content.length
    }

    setupNextWord() {
        this.removeLetter = true
        this.waiting = false
    }

    typewriter() {
        const word = this.wordList[this.currentWordIndex]
        const wordPos = this.removeLetter
            ? this.remove()
            : this.add(word)

        if (wordPos <= 0) {
            this.removeLetter = false
            this.currentWordIndex = (this.currentWordIndex + 1) % this.wordList.length
        }        

        if (wordPos >= word.length && !this.waiting) {
            this.waiting = true
            setTimeout(() => { this.setupNextWord() }, this.waitSpeed)
        }
    }

    start() {
        setInterval(() => {
            this.typewriter()
        }, this.typingSpeed)
    }
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM is ready!');

    const typist = new Typewriter('[data-typewriter]', 80, 4000)
    typist.start()    
});