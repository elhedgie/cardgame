(function(){ 
    let array = []
    let cardsColl = []
    let wonCards = []
    let timer
    // генератор
    function shuffle(arr){
        let j, o;
        for(let i = arr.length - 1; i > 0; i--){
            j = Math.floor(Math.random()*(i + 1));
            o = arr[j];
            arr[j] = arr[i];
            arr[i] = o;
        }
        return arr;
    }
    // создание контейнера
    function createGameContainer() {
        let container = document.querySelector('.container')
        let gameBlock = document.createElement('div')
        gameBlock.classList.add('game-block')
        container.append(gameBlock)
        return gameBlock
    }
    // создание карточки
    function createCard(inputV, num) {
        const card = document.createElement('div')
        const front = document.createElement('span')
        const back = document.createElement('span')
        front.classList.add('front')
        back.classList.add('back')
        card.append(front)
        card.append(back)
        card.classList.add('game-block__card')
        card.style.setProperty('width', 100/(num/4) - 1 + '%')
        card.style.setProperty('height', 100/(num/4) + '%')
        back.textContent = inputV
        card.addEventListener('click', click)
        return card
        // функция кликач
        function click() {
            cardsColl.push(this)
            if(cardsColl.length === 2) {
                check()
            }
            front.style.setProperty('transform', 'rotatey(180deg)')
            back.style.setProperty('transform', 'rotatey(360deg)')
            this.classList.add('disabled')
            if(wonCards.length === num) {
                alert('капец ты умница!')
                wonCards = []
                deleteAll()
            }   
        }
        // функция проверки
        function check() {
            if(cardsColl[0].childNodes[1].textContent === cardsColl[1].childNodes[1].textContent) {
                cardsColl.forEach(ellem => {
                    wonCards.push(ellem)
                    ellem.classList.add('disabled')
                })
                cardsColl = []
            } else {
                setTimeout(flipBack, 1000)
            }
        }
        // функция переворота карточки 
        function flipBack() {
            for(elem of cardsColl) {
                elem.classList.remove('disabled')
                elem.childNodes[0].style.setProperty('transform', 'rotatey(360deg)')
                elem.childNodes[1].style.setProperty('transform', 'rotatey(180deg)')
            }
            cardsColl = []
        }
    }
    function deleteAll() {
        let oldGameBlock = document.querySelector('.game-block')
        let oldGameBlockTwo = document.querySelector('.game-block-2-4')
        let result = (oldGameBlock) ? oldGameBlock.parentNode.removeChild(oldGameBlock) : oldGameBlock
        let resultTwo = (oldGameBlockTwo) ? oldGameBlockTwo.parentNode.removeChild(oldGameBlockTwo) : oldGameBlockTwo
        clearInterval(timer)
    }
    // создание игры
    function createGame() {
        let timerBlock = document.querySelector('.timer-block')
        let timerTime = document.querySelector('.timer__time')
        const selectForm= document.querySelector('#select') 
        const selectButton = document.querySelector('.pair-game__btn_start')
        let heading = document.querySelector('.pair-game__heading_one')
        let form = document.querySelector('.pair-game__form')
        let resetBtn = document.createElement('button')
        resetBtn.classList.add('reset-btn', 'button-reset')
        resetBtn.textContent = 'Начать заново'
        selectButton.addEventListener('click', (e) => {
            e.preventDefault
            deleteAll()
            heading.style.display = 'none'
            form.style.display = 'none'
            timerBlock.append(resetBtn)
            let inputValue = Number(selectForm.value)
            let cont = createGameContainer()
            
            console.log(inputValue)
            let j = 0
                for(let s = 1; s<inputValue/2+ 1; s++) {
                    array.push(s)
                    array.push(s)
                }
            let newArray = shuffle(array)
            for(elem of newArray) {
                let newCard = createCard(elem, inputValue);
                cont.append(newCard)
                j++
                newCard.id=j
            }
            array = []
            timerInterval()
        }) 
        function timerInterval() { 
            
            let h
            h = 60
            clearInterval(timer)
            resetBtn.addEventListener('click', function(e) {
                e.preventDefault()
                heading.style.display = 'block'
                form.style.display = 'flex'
                deleteAll()
                clearInterval(timer)
                resetBtn.remove()
                
            })
            timer = setInterval(() => {
                
                if(h===60 || h<10) {
                    timerTime.textContent = Math.floor(h/60) + ':' + '0' + h%60 
                }
                else {
                    timerTime.textContent = Math.floor(h/60) + ':' + h%60 
                }
                h--
                if(h<0) {
                    alert('Время вышло!')
                    deleteAll()
                    clearInterval(timer)
                }
                
            }, 1000);   
        }
    }
    window.createGame = createGame
}

)()