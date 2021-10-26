/*---------------------------------------------------- 
Theme Name: Portifolio
Version:    1.0.1
 
| ----------------------------------------------------------------------------------
| TABLE OF CONTENT
| ----------------------------------------------------------------------------------
-Fullpage js  
-Home  
-Accolades
-Projects
-clients
-Gallery
-Ask Us
-Loader
-Menu
-Blog Page
-About Page
-Window Resize

*/
// Dom Ready Function
$(function() {
    'use strict';
    var windowWidth;
    var windowHeight;
    /* Fullpage js initialise
    /*---------------------------------------------------- */
    var scrollingSpeed = 700;
    var fittextHome = $('#fittext-home'); //home page 2
    var logoBackground = $('#top-logo');
    var themeMenu = $('#menu-button'); //Home page menu
    var themeMainMenu = $('#main-menu'); //Main menu
    var projectBack = $('#project_back'); //Project back button
    var homePage = $('#home-fullpage'); //Home Page
    var followSection = $('.follow-section'); //Follow Us section
    var blogPage = $('#blog-fullpage'); //Blog Page
    var parallaxHome = $('#parallax-home'); //About Page
    var blogBack = $('#blog_back'); //blog popup back button
    var teamCarousel = $('#team-carousel'); //Team Carousel
    var homeQuotes = $('#fade-quote-carousel'); //Quotes Carousel



    function createFullpage(Overflow) {
        $('#home-fullpage').fullpage({
            anchors: ['home-section', 'accolades-section', 'skills-section', 'project-section', 'client-section', 'gallery-section', 'askus-section', 'contact-section', 'follow-section'],
            menu: '#menu',
            navigationTooltips: ['Home', 'Conhecimentos', 'Skills', 'Projetos', 'Clientes', 'Galeria', 'Perguntas', 'Contatos', 'REdes Sociais'],
            showActiveTooltip: false,
            scrollingSpeed: scrollingSpeed,
            'navigation': true,
            sectionSelector: '.l-screen',
            slideSelector: '.l-slide',
            css3: true,
            responsiveWidth: 1200,
            scrollOverflow: Overflow,
            afterRender: function() {},
            controlArrows: false,
            'afterLoad': function(anchorLink, index) {

                var loadedSection = $(this);
                $(loadedSection).addClass('animated');

                logoBackground.addClass("menu_color_" + index);
                themeMenu.addClass("menu_color_" + index);
                themeMainMenu.addClass("menu_color_" + index);
                windowWidth = $(window).width();
                windowHeight = $(window).height();
            },
            'onLeave': function(index, nextIndex, direction) {

                setTimeout(function() {
                    if (classie.has(menu, 'bt-menu-open')) {
                        resetMenu(); /* Close the menu if open while scroling */
                    }
                }, 500);
                logoBackground.removeClass(function(index, css) {
                    return (css.match(/(^|\s)menu_color_\S+/g) || []).join(' ');
                });
                themeMenu.removeClass(function(index, css) {
                    return (css.match(/(^|\s)menu_color_\S+/g) || []).join(' ');
                });
                themeMainMenu.removeClass(function(index, css) {
                    return (css.match(/(^|\s)menu_color_\S+/g) || []).join(' ');
                });

                //Follow us- project counter animation
                if (followSection.length) {

                    setTimeout(function() {

                        if (followSection.hasClass('active') && !followSection.hasClass('animated')) {
                            $('.count').each(function() {
                                $(this).prop('Counter', 0).animate({
                                    Counter: $(this).attr("data-count")
                                }, {
                                    duration: 1000,
                                    easing: 'swing',
                                    step: function(now) {
                                        $(this).text(Math.ceil(now));
                                    }
                                });
                            });
                        }
                    }, 100);
                }

            },

            onSlideLeave: function(anchorLink, index, slideIndex, direction) {
                barStart(direction); //Start project line-up bars animation on slide leave 
                $.fn.fullpage.setScrollingSpeed(0);
                if (projectBack.hasClass('active')) {
                    projectBack.removeClass('active'); //hide project project close button 
                }
            },
            // Display the slides container by fading it in after the next slide has been loaded.
            afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex) {
                $.fn.fullpage.setScrollingSpeed(scrollingSpeed);
                if (Overflow && anchorLink === "project-section") {
                    if (slideIndex !== 0) {

                        setTimeout(function() {
                            // $('#project_head').hide();//show project close button 
                        }, 500);
                        setTimeout(function() {
                            projectBack.addClass('active'); //show project close button 
                        }, 1500);
                    } else {
                        setTimeout(function() {
                            // $('#project_head').show();//show project close button 
                        }, 500);
                        if (projectBack.hasClass('active')) {
                            projectBack.removeClass('active'); //hide project close button 
                        }
                        if (logoBackground.hasClass('hide_logo')) {
                            setTimeout(function() {
                                logoBackground.removeClass("hide_logo"); //show right logo
                            }, 1500);
                        }
                        if (themeMenu.hasClass('hide_logo')) {
                            setTimeout(function() {
                                themeMenu.removeClass("hide_logo"); //show right logo
                            }, 1500);
                        }
                        if (themeMainMenu.hasClass('hide_logo')) {
                            setTimeout(function() {
                                themeMainMenu.removeClass("hide_logo"); //show right logo
                            }, 1500);
                        }

                    }

                }
            },

        });

    }
    if (document.documentElement.clientWidth > 1200) {
        var Overflow = true; //Enable each section overflow for desktop
    } else {
        var Overflow = false;
    }
    //Fullpage js initialising
    if (homePage.length) {
        createFullpage(Overflow);
        if (!Overflow)
            $.fn.fullpage.setAllowScrolling(false);
    }
    //Quotes Carousel
    if (homeQuotes.length) {
        homeQuotes.carousel({
            interval: 8000
        })
    }


    /* Home
    /*---------------------------------------------------- */
    if (fittextHome.length) {
        $('.tlt').textillate({
            loop: true,
            out: {
                effect: 'flipInY',
                delayScale: 1.5,
                delay: 50,
                sync: false,
                shuffle: false,
                reverse: false,
                callback: function() {}
            },
        });
    }

    /* Accolades
    /*---------------------------------------------------- */
    var accolades = $('#accolades-wrap');
    if (accolades.length) {
        var numItems = accolades.find('.time-wrap ').length; //count circle
    }
    if (numItems < 5) {
        var ll = $('#column-one').css("left").replace(/[^-\d\.]/g, '');
        ll = ll / 2;
        $('#accolades-wrap  .wrap-container').css("right", ll + "px"); //Adjust accolades with window size
        if (numItems < 4) $('#accolades-wrap  .wrap-container').css("top", ll + "px");
    }

    /* Projects
    /*---------------------------------------------------- */
    /* project bar animation */
    var projectDescription = $('#project-description');
    var barStart = function(direction) {
        projectDescription.addClass("active");
        setTimeout(
            function() {
                projectDescription.removeClass('active');
            }, 2000);
        logoBackground.addClass("hide_logo"); //hide logo on project click
        themeMenu.addClass("hide_logo"); //hide menu on project click
        themeMainMenu.addClass("hide_logo"); //hide main menu on project click

    };
    //initialise project project previous click event
    $(".project-slide-prev", '#project_all_container').on("click", function() {
        $.fn.fullpage.moveSlideLeft();
    });
    //initialise project project next click event
    $(".project-slide-next", '#project_all_container').on("click", function() {
        $.fn.fullpage.moveSlideRight();
    });

    //projects grid
    if ($('.project_grid').length) {
        (function() {
            /* initialize video project */
            $("area[data-gal^='prettyPhoto']").prettyPhoto();
            $(".project_grid:first a[data-gal^='prettyPhoto']").prettyPhoto({
                animation_speed: 'normal',
                theme: 'light_square',
                slideshow: 3000,
                autoplay_slideshow: false
            });
        })();
    }

    /* Clients
    /*---------------------------------------------------- */
    var contentHeight = $("#clients_details").height();
    var windowHeight = $(window).height();
    if (contentHeight > windowHeight) {
        $(".client-section .vertical-center").css("height", "auto");
    }

    /* Gallery
    /*---------------------------------------------------- */
    galleryReset();
    if ($('.gallery-section').length) {
        var galleryHolder = $('#galleryHolder');
        (function() {
            /* initialize prettyPhoto */
            $("area[data-gal^='prettyPhoto']").prettyPhoto();
            $(".gallery:first a[data-gal^='prettyPhoto']").prettyPhoto({
                animation_speed: 'normal',
                theme: 'light_square',
                slideshow: 3000,
                autoplay_slideshow: false
            });
        })();
        $("#filterOptions li a").on("click", function() {
            // fetch the class of the clicked item
            var galleryClass = $(this).attr('class');
            // remove the active class from all gallery filter buttons
            $('#filterOptions li .hi-icon').removeClass('active');
            // update the active state on our clicked button
            $(this).children("#filterOptions .hi-icon").addClass('active');
            if (galleryClass === 'all') {
                // animate all gallery items
                galleryHolder.children('div').removeClass("animate");
                galleryHolder.children('div.item').fadeIn(500, 'swing', function() {
                    galleryHolder.children('div').addClass("animate");
                });;

            } else {
                var cnt = 0;
                var tot = galleryHolder.children('div:not(.' + galleryClass + ')').length;
                // hide all elements that don't share galleryClass
                galleryHolder.children('div:not(.' + galleryClass + ')').fadeOut(0, 'swing', function() {
                    galleryHolder.children('div.' + galleryClass).removeClass("animate");
                    //callback function after animation finished
                    cnt++;
                    if (cnt >= tot) {
                        galleryHolder.children('div.' + galleryClass).fadeIn(500);
                        galleryHolder.children('div.' + galleryClass).addClass("animate");
                    }
                });
            }
            return false;
        });
    }

    function galleryReset() {
        var galleryHolder = $('#galleryHolder');
        galleryHolder.children('div').removeClass("animate");
        // show all our items
        galleryHolder.children('div.item').fadeIn(500, '', function() {
            galleryHolder.children('div').addClass("animate");
            //Reset gallery filterOptions 
            $('#filterOptions li .hi-icon').removeClass('active').first().addClass('active');

        });
    }

    /* Ask Us
    /*----------------------------------------------------  */
    //Replace answer on ask us bar click
    var replaceAnswer = function(text, title) {
        $('#askus-answers-inner').removeClass('active');
        setTimeout(function() {
            $('#askus-answers .askus-show-answer').html(text);
            $('#askus-answers #askus-answers-inner h3').html(title);
            $('#askus-answers-inner').addClass('active');
        }, 650);
    };
    var questionNumber = 1;
    var questionCount = $('.askusbar', '#askus-container').length;
    //Ask us bar click event
    var askusbarClick = function(el) {
        themeMainMenu.addClass("hide_logo"); //hide main menu on  click
        $('.askusbar', '#askus-container').off('click');
        $('#askus .fp-scroller').addClass("show-answer");
        $('#askus-container').addClass("noScroll");
        if (Overflow)
            $.fn.fullpage.reBuild();


        setTimeout(function() {
            $('#askus').toggleClass('showing-answer');
            $('#askus-answers').addClass('active');
        }, 0);
        replaceAnswer($(el).find('.askus-questions__answer-text').html(), $(el).find('h3').html());
        questionNumber = $(el).attr('data-askus-number');
        questionNumber = parseInt(questionNumber);
    };
    $('.askusbar', '#askus-container').on('click', function() {
        askusbarClick(this);
    });
    //Ask us bar close button event
    $('#askus_close').on('click', function() {
        if (themeMainMenu.hasClass('hide_logo')) {

            themeMainMenu.removeClass("hide_logo"); //show right logo

        }

        $('#askus-container').removeClass("noScroll");
        $('.askusbar', '#askus-container').on("click", function() {
            askusbarClick(this);
        });
        $('#askus .fp-scroller').removeClass("show-answer");
        $.fn.fullpage.reBuild();
        $('#askus').toggleClass('showing-answer');
        $('.askus-show-answer', '#askus-answers').removeClass('active');
        $('#askus-answers').removeClass('active');
    });
    //Ask us previous click event
    $('a.askus-prev-button').on('click', function() {
        if (questionNumber !== 1) {
            questionNumber = parseInt(questionNumber, 10) - 1;
        } else {
            questionNumber = questionCount;
        }

        replaceAnswer($('.askus_content_bar').find('[data-answer-number="' + (questionNumber) + '"]').html(), $('.askus_content_bar').find('[data-askus-number="' + (questionNumber) + '"] h3').html());
    });
    //Ask us next click event
    $('a.askus-next-button').on('click', function() {
        if (questionNumber !== questionCount) {
            questionNumber = parseInt(questionNumber, 10) + 1;
        } else {
            questionNumber = 1;
        }
        replaceAnswer($('.askus_content_bar').find('[data-answer-number="' + (questionNumber) + '"]').html(), $('.askus_content_bar').find('[data-askus-number="' + (questionNumber) + '"] h3').html());
    });
    jQuery('.control-bar').children().hide();




    /* Follow us - Counter
    /*---------------------------------------------------- */
    $('.count').each(function() {
        $(this).prop('Counter', 0).animate({
            Counter: $(this).text()
        }, {
            duration: 1000,
            easing: 'swing',
            step: function(now) {
                $(this).text(Math.ceil(now));
            }
        });
    });




    /* Menu
    /*---------------------------------------------------- */
    var eventType = 'click';
    var menu = document.getElementById('bt-menu'),
        trigger = menu.querySelector('a.bt-menu-trigger'),
        trigger_link = menu.querySelectorAll('ul.menu-options li a'),
        resetMenu = function() {

            setTimeout(function() {
                classie.remove(menu, 'show');

            }, 400);
            classie.remove(menu, 'bt-menu-open');
            classie.add(menu, 'bt-menu-close');
        },
        closeClickFn = function(ev) {
            resetMenu();
            overlay.removeEventListener(eventType, closeClickFn);
        };
    var overlay = document.createElement('div');
    overlay.className = 'bt-overlay';
    menu.appendChild(overlay);
    trigger.addEventListener(eventType, function(ev) {
        ev.stopPropagation();
        ev.preventDefault();
        if (classie.has(menu, 'bt-menu-open')) {
            resetMenu();
        } else {
            classie.remove(menu, 'bt-menu-close');
            classie.add(menu, 'bt-menu-open');
            classie.add(menu, 'show');
            overlay.addEventListener(eventType, closeClickFn);
        }
    });

    function init() {
        $('#bt-menu ul.menu-options li a').each(function(index) {
            $(this).on("click", function(ev) {
                $(this).next('ul').toggleClass('active-sub-menu');
                setTimeout(function() {
                    if (classie.has(menu, 'bt-menu-open')) {

                        resetMenu();
                    } else {
                        classie.remove(menu, 'bt-menu-close');
                        classie.add(menu, 'bt-menu-open');
                        classie.add(menu, 'show');
                        overlay.addEventListener(eventType, closeClickFn);
                    }
                }, 500);
            });
        });
    }
    init();

    /*  Blog Page */
    function createFullpageBlog() {
        $('#blog-fullpage').fullpage({
            anchors: ['blog-section'],
            menu: '#menu',
            sectionSelector: '.l-screen',
            slideSelector: '.l-slide',
            css3: true,
            scrollOverflowOptions: {
                click: true

            },
            scrollOverflow: true,


            normalScrollElements: '.blog-slider-content,.m-blogs-container',
            autoScrolling: false,
            fitToSection: false,
            afterRender: function() {
                $.fn.fullpage.setAutoScrolling(true);

            },
            controlArrows: false,
            onSlideLeave: function(anchorLink, index, slideIndex, direction) {

                blogBarStart(direction); //Start blog line-up bars animation on slide leave 
                $.fn.fullpage.setScrollingSpeed(0);
                if (blogBack.hasClass('active')) {
                    blogBack.removeClass('active'); //hide blog blog close button 
                }
            },
            // Display the slides container by fading it in after the next slide has been loaded.
            afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex) {
                $.fn.fullpage.setScrollingSpeed(scrollingSpeed);
                if (anchorLink === "blog-section") {
                    if (slideIndex !== 0) {
                        setTimeout(function() {
                            blogBack.addClass('active'); //show blog close button 
                        }, 1500);
                    } else {
                        if (blogBack.hasClass('active')) {
                            blogBack.removeClass('active'); //hide blog close button 
                        }


                    }

                }
            },

        });

    }


    var blogBarStart = function(direction) {

        $.fn.fullpage.reBuild();

        $('#blog-description').addClass("active");
        setTimeout(
            function() {
                $('#blog-description').removeClass('active');
            }, 2000);


    };
    //Fullpage js initialising for blog page
    if (blogPage.length)
        createFullpageBlog();




    /* About Page */

    function carouselInit(windowWidth) {

        teamCarousel.carousel({
            interval: 4000
        })

        if (windowWidth > 768) {
            $('.fdi-Carousel .item').each(function() {
                $(this).children('.col-md-4').not('.col-md-4:first').remove();
                var next = $(this).next();
                if (!next.length) {
                    next = $(this).siblings(':first');
                }
                next.children(':first-child').clone().appendTo($(this));

                if (next.next().length > 0) {
                    next.next().children(':first-child').clone().appendTo($(this));
                } else {
                    $(this).siblings(':first').children(':first-child').clone().appendTo($(this));
                }
            });
        } else {
            $('.fdi-Carousel .item').each(function() {
                $(this).children('.col-md-4').not('.col-md-4:first').remove();
            });
        }
    }
    windowWidth = $(window).width();
    if (teamCarousel.length)
        carouselInit(windowWidth);

    /* Window Resize
    /*---------------------------------------------------- */
    var waitForFinalEvent = (function() {
        var timers = {};
        return function(callback, ms, uniqueId) {
            if (!uniqueId) {
                uniqueId = "uniqueId";
            }
            if (timers[uniqueId]) {
                clearTimeout(timers[uniqueId]);
            }
            timers[uniqueId] = setTimeout(callback, ms);
        };
    })();
    $(window).resize(function() {
        // Check window width has actually changed and it's not just iOS triggering a resize event on scroll
        if ($(window).width() !== windowWidth || $(window).height() !== windowHeight) {
            // Update the window width for next resize
            windowWidth = $(window).width();
            windowHeight = $(window).height();
            waitForFinalEvent(function() {
                if (homePage.length) {

                    var contentHeight = $("#clients_details").height();

                    if (contentHeight > windowHeight)
                        $(".client-section .vertical-center").css("height", "auto"); //Reset clients 

                    var resetOverflow = Overflow;
                    if (document.documentElement.clientWidth > 1200) {
                        Overflow = true;
                    } else {
                        Overflow = false;
                    }
                    if (resetOverflow !== Overflow && homePage.length) {
                        $.fn.fullpage.destroy('all');
                        createFullpage(Overflow);
                        setTimeout(function() {
                            $.fn.fullpage.scrollDefault("project-section", "0");

                            if (projectBack.hasClass('active')) {
                                projectBack.removeClass('active'); //hide project close button 
                            }

                        }, 700);

                    } else
                        $.fn.fullpage.reBuild();
                    if (!Overflow)
                        $.fn.fullpage.setAllowScrolling(false);

                }

                if (teamCarousel.length)
                    carouselInit(windowWidth);


            }, 1000, "some unique string");


        }
    });

});

$(window).on('load', function(e) {

    //Remove loader
    $('body').addClass('loaded');

    setTimeout(function() {

        $("#loader-wrapper").remove("#loader-wrapper");
    }, 1500);
});