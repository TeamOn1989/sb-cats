(function() {
    const CONTAINER = document.getElementById('cats-container');
    CONTAINER.classList.add('container');
    const SHOW_NAV = document.querySelector('.show__nav');
    const ADD_CAT = "https://sb-cats.herokuapp.com/api/2/teamon1989/add";
    const SHOW_CAT = "https://sb-cats.herokuapp.com/api/2/teamon1989/show";
    const UPDATE_CAT = "https://sb-cats.herokuapp.com/api/2/teamon1989/update/";
    const DELETE_CAT = "https://sb-cats.herokuapp.com/api/2/teamon1989/delete/";
    const ADD_CAT_BTN = document.getElementById('add');
    ADD_CAT_BTN.addEventListener('click', createCat);

    const ARRAY_iDS = fetch("https://sb-cats.herokuapp.com/api/2/teamon1989/ids")
        .then(res => res.json())
        .then(data => 
            data.data);

    function createId(arr) {
        let max = 10000;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].id > max) {
                max = arr[i].id
            }
        }
        return max + 1000
    }

    const ADD__CAT__MENU = document.querySelector('#menu_add')
    ADD__CAT__MENU.addEventListener('click', function() {
        let catForm = document.querySelector('.add__cat__wrapper')
        catForm.classList.add('active')
    })

    const CHANCEL_ADD_CAT = document.getElementById('chancel').addEventListener('click', function() {
        let catForm = document.querySelector('.add__cat__wrapper')
        catForm.classList.remove('active')
    })
    /*==================Рендеринг картоек==================*//*==========================================================================================*/
    function renderingCards(arr, cont) {
        arr.forEach(element => {
            let card = document.createElement('div');
            card.classList.add('card');

            let photo = document.createElement('div');
            photo.classList.add('photo');
            photo.style.backgroundImage = `url('${element.img_link}')`

            photo.addEventListener('click', function() {
                let name = element.name
                let descr = element.description
                let photoopup = element.img_link
                let raitingin = element.rate
                console.log(raitingin)
                console.log(element.img_link)
                fetch(SHOW_CAT)
                    .then(resp => resp.json())
                    .then(data => {                    
                        createPopupDescription(name, descr, photoopup, raitingin, document.body)                       
                    })                
            })            

            let name = document.createElement('h2');
            name.textContent = element.name
            name.classList.add('name')

            let raiting = document.createElement('div');
            let raitingDescr = document.createElement('p');
            

            raiting.classList.add('raitng')

            raitingDescr.textContent = 'Рейтинг:'
            raitingDescr.classList.add('raiting__desc');

            let like = document.createElement('span');
            like.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 512 512"><path d="M244 84L255.1 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 0 232.4 0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84C243.1 84 244 84.01 244 84L244 84zM255.1 163.9L210.1 117.1C188.4 96.28 157.6 86.4 127.3 91.44C81.55 99.07 48 138.7 48 185.1V190.9C48 219.1 59.71 246.1 80.34 265.3L256 429.3L431.7 265.3C452.3 246.1 464 219.1 464 190.9V185.1C464 138.7 430.4 99.07 384.7 91.44C354.4 86.4 323.6 96.28 301.9 117.1L255.1 163.9z"/></svg>`
            like.classList.add('like')

            let liked = document.createElement('span');
            liked.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 512 512"><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg>`
            liked.classList.add('liked')

            let res;
            if (element.favourite == true) {
                res = liked
            } else res = like

            raiting.append(raitingDescr)
            for (let i = 0; i < element.rate; i++) {
                let raitingIcon = document.createElement('span');
                raitingIcon.classList.add('raiting__icon')
                raitingIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 512 512"><path d="M256 352C293.2 352 319.2 334.5 334.4 318.1C343.3 308.4 358.5 307.7 368.3 316.7C378 325.7 378.6 340.9 369.6 350.6C347.7 374.5 309.7 400 256 400C202.3 400 164.3 374.5 142.4 350.6C133.4 340.9 133.1 325.7 143.7 316.7C153.5 307.7 168.7 308.4 177.6 318.1C192.8 334.5 218.8 352 256 352zM208.4 208C208.4 225.7 194 240 176.4 240C158.7 240 144.4 225.7 144.4 208C144.4 190.3 158.7 176 176.4 176C194 176 208.4 190.3 208.4 208zM304.4 208C304.4 190.3 318.7 176 336.4 176C354 176 368.4 190.3 368.4 208C368.4 225.7 354 240 336.4 240C318.7 240 304.4 225.7 304.4 208zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z"/></svg>'
                raiting.append(raitingIcon)
            }

            card.append(photo, name, raiting, res)
            cont.append(card)
        });
    }

//=================================================================Рендеринг попапа========================================================================
    function createPopupDescription(name, descr, photo, raiting, cont = document.body) {
        let popupWrapper = document.createElement('div');
        popupWrapper.classList.add('popup-wrapper');

        let popup = document.createElement('article');
        popup.classList.add('popup');

        let popupContent = document.createElement('div');
        popupContent.classList.add('popup__content');

        let popupPhoto = document.createElement('div');
        popupPhoto.classList.add('popup__photo');
        popupPhoto.style.backgroundImage = `url('${photo}')`;

        let popupDescription = document.createElement('div');
        popupDescription.classList.add('popup__desc__wrapper');

        let popupName = document.createElement('div');
        popupName.classList.add('popup__name');
        popupName.textContent = name

        let popupText = document.createElement('p');
        popupText.classList.add('popup__decr__text');
        popupText.textContent = descr

        let popupAge = document.createElement('p');
        popupAge.classList.add('popup__age');

        popupDescription.append(popupName, popupText, popupAge);
        popupContent.append(popupPhoto, popupDescription);


        let popupRaitingWrapper = document.createElement('div')
        popupRaitingWrapper.classList.add('popup__raiting__wrapper')
        let popupRating = document.createElement('p');

        popupRating.classList.add('popup__rate');
        popupRating.textContent = 'Рейтинг:'
        popupRaitingWrapper.append(popupRating)
        for (let i = 0; i < raiting; i++) {
            let popupRatingIcon = document.createElement('span');
            popupRatingIcon.classList.add('popup__rate__icon')
            popupRatingIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 512 512"><path d="M256 352C293.2 352 319.2 334.5 334.4 318.1C343.3 308.4 358.5 307.7 368.3 316.7C378 325.7 378.6 340.9 369.6 350.6C347.7 374.5 309.7 400 256 400C202.3 400 164.3 374.5 142.4 350.6C133.4 340.9 133.1 325.7 143.7 316.7C153.5 307.7 168.7 308.4 177.6 318.1C192.8 334.5 218.8 352 256 352zM208.4 208C208.4 225.7 194 240 176.4 240C158.7 240 144.4 225.7 144.4 208C144.4 190.3 158.7 176 176.4 176C194 176 208.4 190.3 208.4 208zM304.4 208C304.4 190.3 318.7 176 336.4 176C354 176 368.4 190.3 368.4 208C368.4 225.7 354 240 336.4 240C318.7 240 304.4 225.7 304.4 208zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z"/></svg>'
            console.log('star')
            popupRaitingWrapper.append(popupRatingIcon)
        }
        
    

        let popupBtnWrapper = document.createElement('div');
        popupBtnWrapper.classList.add('popup__btn__wrapper');

        let popupBtnClose = document.createElement('button');
        let popupBtnChange = document.createElement('button');
        popupBtnChange.classList.add('popup__btn');
        popupBtnChange.textContent = 'Изменить'        
        popupBtnClose.classList.add('popup__btn');
        popupBtnClose.textContent = 'Закрыть'
        popupBtnClose.addEventListener('click', function() {
            document.body.removeChild(popupWrapper)
        })
        popupWrapper.addEventListener('click', function() {
            document.body.removeChild(popupWrapper)
        })

        popupBtnWrapper.append(popupBtnClose, popupBtnChange);

        popup.append(popupContent, popupRaitingWrapper, popupBtnWrapper)
        popupWrapper.append(popup)
        cont.append(popupWrapper)
    }
    

    fetch(SHOW_CAT)
        .then(resp => resp.json())
        .then(data => {
            renderingCards(data.data, CONTAINER);                      
        })
        
    
    //================МЕНЮ====================================================================================================================================
    SHOW_NAV.addEventListener('click', function() {
        let  nav = document.querySelector('.nav');
        let navIcon = document.querySelector('.nav svg')
        
        if (SHOW_NAV && !SHOW_NAV.hasAttribute('data-set')) {
            SHOW_NAV.setAttribute('data-set', 'active');
            nav.classList.add('nav-show');
            nav.classList.remove('show__nav__icon');
            nav.classList.remove('nav-hide');
            navIcon.classList.add('show__nav__icon-back');
            
            
        } else if (SHOW_NAV && SHOW_NAV.hasAttribute('data-set')) {
            nav.classList.add('nav-hide');
            nav.classList.remove('nav-show');
            SHOW_NAV.removeAttribute('data-set')
            navIcon.classList.add('show__nav__icon')
            navIcon.classList.remove('show__nav__icon-back')
        }
    })

    //========================================================ADD-CAT========================================================================================
    function addCat(body) {
        return fetch(ADD_CAT, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(body)
        })
    }
    
    //==============================================================CREATE-NEW-CAT===========================================================
    function createCat(e) {
        e.preventDefault()
        let nameInput = document.getElementById('name');
        let check = document.getElementById('checkbox');
        let ratingInput = document.querySelector('#raiting');
        let ageInput = document.getElementById('age');
        let descrInput = document.getElementById('descr');
        let imgInput = document.getElementById('img')
        let imgLink;
        if (imgInput.value.endsWith('jpg') || imgInput.value.endsWith('png')) {
            imgLink = imgInput.value
        } else {
            alert('Введите корректный URL картинки')
            return
        }
        
        let card = {
            "id": createId(ARRAY_iDS),
            "name": nameInput.value,
            "favourite": check.checked,
            "rate": ratingInput.value,
            "age": ageInput.value,
            "description": descrInput.value,
            "img_link": imgLink
        }
        
        addCat(card)
    }
    
    


})();