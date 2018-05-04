//  custom js

var holder = document.getElementById('posts'),
    myHeader =  document.getElementById('header'),
    allPosts = document.getElementsByClassName('post'),
    allDraggables = document.getElementsByClassName('draggable'),
    postImages = document.getElementsByClassName('post-image'),
    menu = document.getElementById('menu'),
    menuBtn = document.getElementById('menu-btn'),
    caption = document.getElementById('large-caption'),
    close = document.getElementById('close'),
    gifHolder = document.getElementById('gif-holder'),
    winHeight = window.innerHeight,
    winWidth = window.innerWidth,
    x = winWidth - 600,
    capLeft = x / 2;
    loader = document.getElementById('spinner'),
    toolTip = document.getElementById('tooltip'),
    pageTitle = document.title,
    menuVisible = false;

if(pageTitle.includes('Burberry Beauty')){  //  if is index page

    //  masonry

    function myMasonry(){
        imagesLoaded( '.post', function() {
            allPosts = document.getElementsByClassName('post');
            for (var i = 0; i < allPosts.length; i++) {
                allPosts[i].style.opacity = '1';
            }
            var msnry = new Masonry( '#posts', {
                columnWidth: 110,
                gutter: 20,
                stagger: 30,
                itemSelector: '.post'
            });
        });
    }
    myMasonry();

    //  infinite scroll

    var elem = document.querySelector('#posts'),
        infScroll = new InfiniteScroll( elem, {
        path: '.pagination__next',
        append: '.post',
        history: false
    });

    infScroll.on('request', function(path) {
        loader.style.opacity = '1';
    })

    infScroll.on('load', function(response, path) {
        myMasonry();
        makeDraggable();
    });

    //  functions to run when new posts are appended

    infScroll.on('append', function(response, path, items) {
        myMasonry();
        makeDraggable();
        captions();
        setTimeout(function(){
            loader.style.opacity = '0';
        }, 1500);
    });

    //  draggabilly

    function makeDraggable() {
        allDraggables = document.getElementsByClassName('draggable');
        var drag = [];
        for (var i = 0; i < allDraggables.length; i++) {
            drag[i] = new Draggabilly(allDraggables[i], {});
        }
    }
    makeDraggable();

    //  menu stuff

    menuBtn.addEventListener('click', showMenu);
    function showMenu(){
        if(menuVisible === false){
            menu.setAttribute('class', 'active');
            menuVisible = true;
        } else{
            menu.setAttribute('class', '');
            menuVisible = false;
        }
    }

    //  caption

    function captions(){
        for (var i = 0; i < postImages.length; i++) {
            postImages[i].addEventListener('mouseover', showCap);
        }
        myHeader.addEventListener('mouseover', showCap);
        function showCap(e){
            if (e.target.tagName === 'IMG'){
                var artCap = e.target.dataset.caption;
                caption.innerHTML = artCap;
            } else{
                caption.innerHTML = '';
            }
        }
    }
    captions();

    //  tooltip

    window.addEventListener('mousemove', track);
    function track(){
        mouseX = event.clientX + document.body.scrollLeft + 20,
        mouseY = event.clientY + document.body.scrollTop + 10;
    	toolTip.setAttribute('style', 'top:' + mouseY + 'px; left:' + mouseX + 'px;');
    }

    menu.addEventListener('mouseover', showTt);
    function showTt(e){
        if (e.target.tagName === 'A'){
            toolTip.setAttribute('class', 'show');
            var ttImage = e.target.dataset.tooltip;
            toolTip.innerHTML = '<img src="' + ttImage + '">';
        } else{
            toolTip.setAttribute('class', '');
            toolTip.innerHTML = '';
        }
    }
    menu.addEventListener('mouseleave', hideTt);
    function hideTt(){
        toolTip.setAttribute('class', '');
        toolTip.innerHTML = '';
    }

}  //  close title condition

//  close permalink

if(pageTitle.includes('Burberry Post')){

    close.addEventListener('click', goBack);
    function goBack(){
        window.history.back();
    }

}
