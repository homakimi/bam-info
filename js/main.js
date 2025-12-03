$(function() {
    // for nanshan
    if($('header').length > 0) {
        headerHeight = 55;
    } else {
        headerHeight = 0;
    }

    scrollEffect();
    $(window).scroll(function() {
        scrollEffect();
    })

    urlDetect();

    $()
})


$(document)
.on('click', 'a', function(e) {
    if($(this).attr('href').length == 0) {
        e.preventDefault();
        e.stopPropagation();
    }
})
.on('mousedown', 'img', function(e) {
    e.preventDefault();
})
.on('mousemove', '.bam-info-wrap', function(e) {
    if(window.innerWidth > 1024) {
        $('.bam-info-cursor').show().css('left', e.pageX+10).css('top', e.pageY+10);
    } else {
        $('.bam-info-cursor').hide()
    }
})
.on('click', '.bam-info-wrap', function() {
    $('.bam-info-des').removeClass('active');
})
.on('click', '.kv-ppl', function() {
    $('.bam-info-des').addClass('active');
})
.on('click', '.bam-info-des-close', function() {
    $('.bam-info-des').removeClass('active');
})
.on('click', '[data-say-lightbox]', function() {
    $('.bam-info-lightbox').fadeIn();
    $('[data-say-lightbox-target]').hide();
    $('[data-say-lightbox-target="'+$(this).data('say-lightbox')+'"]').show();
})
.on('click', '.bam-info-lightbox-close, .bam-info-lightbox', function() {
    $('.bam-info-lightbox').fadeOut();
})
.on('click', '[data-main]', function() {
    if(!$(this).hasClass('active')) {
        $('[data-main]').removeClass('active');
        $(this).addClass('active');
        $('.bam-info-short').removeClass('active');
        $('.bam-info-short').removeClass('main-1 main-2').addClass('main-'+$(this).data('main'));
        $('[data-cut], [data-main-target]').hide();
        $('[data-cut="'+$(this).data('main')+'"], [data-main-target="'+$(this).data('main')+'"]').fadeIn();
    }
    $('body, html').animate({ scrollTop: $('[data-main-target="'+$(this).data('main')+'"] .info-block-1 .info-stand').offset().top - window.innerHeight*0.25 }, 1000)
})
.on('click', '[data-cut]', function() {
    $('.bam-info-short').addClass('active');
    $('body, html').animate({ scrollTop: $('[data-main-target="'+$(this).data('cut')+'"] .info-block-3 .info-stand').offset().top - window.innerHeight*0.25 }, 1000)
})
.on('click', '[data-popup]', function() {
    $('.bam-info-lightbox-popup').fadeIn();
    $('[data-popup-target]').hide();
    $('[data-popup-target="'+$(this).data('popup')+'"]').show();
})
.on('click', '.bam-info-lightbox-popup-close, .bam-info-lightbox-popup', function() {
    $('.bam-info-lightbox-popup').fadeOut();
})
.on('click', '[data-yt]', function() {
    $('.bam-info-lightbox-youtube').fadeIn();
    $('[data-yt-target]').hide();
    $('[data-yt-target="'+$(this).data('yt')+'"]').show();
    yplayers[$('[data-yt-target="'+$(this).data('yt')+'"] [data-yt-index]').data('yt-index')].playVideo();
})
.on('click', '.bam-info-lightbox-youtube-close, .bam-info-lightbox-youtube', function() {
    $('.bam-info-lightbox-youtube').fadeOut();
    for(var i=0; i<yplayers.length; i++) {
        yplayers[i].pauseVideo();
    }
})
.on('click', '.info-popup-block, .bam-info-des, .bam-info-lightbox-blue, .bam-info-lightbox-pink, .bam-info-yt-wrap', function(e) {
    e.stopPropagation();
})


function urlDetect() {
    if(window.location.href.indexOf('pin') > 0) {
        var _url = new URL(window.location.href);
        var _searchParams = _url.searchParams.get('pin');
        if($('[data-pin="'+_searchParams+'"]').length > 0) {
            setTimeout(function() {
                $('body, html').animate({ scrollTop: $('[data-pin="'+_searchParams+'"]').offset().top - headerHeight }, 1000);
            }, 250)
        }
    }
}

var videoUrlId;
var yplayers = [];
function onYouTubeIframeAPIReady() {
    $('.ytVideo').each(function(index) {
        $(this).attr('data-yt-index', index);
        videoUrlId = $(this).data('videoid');
        yplayer = new YT.Player( $(this)[0], {
            videoId: videoUrlId,
            host: 'http://www.youtube.com',
            playerVars: {
                playlist: videoUrlId,
                autoplay: 0,
                loop: 1,
                mute: 1,
                controls: 1,
                showinfo: 0,
                playsinline: 1,
                modestbranding: 1,
                fs: 1,
                rel: 0,
                wmode: 'transparent'
            },
            events: {
            }
        })
        yplayers.push(yplayer);
    })
}
function onPlayerReady(e) {
    // e.target.mute(), e.target.seekTo(0), e.target.playVideo();
}
function mainVisualResize() {
    var e = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        t = document.getElementsByClassName('ytVideo')
    1920 > e || (t.style.width = e + 'px', t.style.height = Math.floor(e / 16 * 9) + 'px')
}
var yplayer, ytag = document.createElement('script');
ytag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
window.onload = firstScriptTag.parentNode.insertBefore(ytag, firstScriptTag);
window.addEventListener('load', mainVisualResize);
window.addEventListener('resize', mainVisualResize);
