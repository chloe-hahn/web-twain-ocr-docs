$(document).ready(function(){ 
    init();
    // $('h1').append('<p class="subtitle">Last Modified Date: <span id="LastModifiedDate">' + formatDate(document.lastModified) + '</span></p>')
    $('.markdown-body .sample-code-prefix + blockquote > ul > li:first-child').addClass('on')
    $('.markdown-body .sample-code-prefix + blockquote > ol > li:first-child').addClass('on')

    if (document.URL.indexOf("web-twain/docs/faq/") > 0  && document.URL.indexOf("web-twain/docs/faq/?ver") < 0) {
        $("#breadcrumbLastNode").text($("h1").text())
    }

    var sd = $(window).scrollTop()
    if(sd > 0) {
        realFunc()
    } else {
        $('#AutoGenerateSidebar a').eq(0).addClass('active')
    }

    setTimeout(function() {
        var objs = $(".fold-panel-prefix")
        for(var i = 0; i<objs.length; i++) {
            var obj = $(".fold-panel-prefix").eq(i)
            $(obj).next().find('i').css({'width': ($(obj).next().width() - 24) + 'px'})
            $(obj).next().find('i').css({'height': $(obj).next().height() + 'px'})
            $(obj).next().find('i').css({'line-height': $(obj).next().height() + 'px'})
            $(obj).next().find('i').css({'opacity': 1})
        }
    }, 500)

    $(window).resize(function() {
        var objs = $(".fold-panel-prefix")
        for(var i = 0; i<objs.length; i++) {
            var obj = $(".fold-panel-prefix").eq(i)
            $(obj).next().find('i').css({'width': ($(obj).next().width() - 24) + 'px'})
            $(obj).next().find('i').css({'height': $(obj).next().height() + 'px'})
            $(obj).next().find('i').css({'line-height': $(obj).next().height() + 'px'})
            console.log($(obj).next().height(), $(obj).next().width())
        }
        init()
        realFunc()
    })

    window.addEventListener('scroll', realFunc);

    function realFunc() {
        $('.rightSideMenu').css({'padding-top': $('#docHead').outerHeight()+'px'});
        if (breakpoint() == 'lg') {
            var subHeight = 0;
            if ($('.subHeadWrapper').length > 0) {
                subHeight = $('.subHeadWrapper').height();
            } else {
                subHeight = $('.productMenu').height();
            }
            var menuHeight = $('#overall-header').height() + subHeight;
            var sd = $(window).scrollTop();
            var dcHeight = $('.docContainer').height() + menuHeight - sd;
            var clientHeight = document.body.clientHeight;
            if (sd >= $('#overall-header').height()) {
                if ($('#footerWrapper').offset().top - $(document).scrollTop() < $(window).height()) {
                    $('#fullTreeMenuListContainer').css({'max-height': 'calc(100vh - '+(menuHeight + 120) +'px)'});
                } else {
                    $('#fullTreeMenuListContainer').css({'max-height': 'calc(100vh - '+(subHeight + 120) +'px)'});
                }
                // head and sidebar fixed
                if ($('.subHeadWrapper').length > 0) {
                    $('.subHeadWrapper').css({'top': '0px'});
                    $('#docHead').css({'top': ($('.subHeadWrapper').height() + 1) + 'px'});
                    $('.history').css({'top': '119px'})
                } else if ($('.productMenu').length > 0) {
                    $('.productMenu').css({'top': '0px'});
                    $('#docHead').css({'top': ($('.productMenu').height()) + 'px'});
                    $('.history').css({'top': '119px'})
                } else {
                    $('#docHead').css({'top': '0px'});
                    $('.history').css({'top': '30px'})
                }
                $('.sideBar #sideBarCnt').addClass('sidebar-fixed');
                $('.rightSideMenu').addClass('rsm-fixed');
            } else {
                $('#fullTreeMenuListContainer').css({'max-height': 'calc(100vh - '+(menuHeight + 120) +'px)'});
                // head and sidebar fixed
                if ($('.subHeadWrapper').length > 0) {
                    $('.subHeadWrapper').css({'top': ($('#overall-header').height()-sd) + 'px'});
                    $('.sideBar').css({'padding-top': $('.subHeadWrapper').height() + 42 + 'px!important'});
                    $('.history').css({'top': ($('#overall-header').height() + $('.subHeadWrapper').height() + 30 +  - sd) + 'px'})
                } else if ($('.productMenu').length > 0) {
                    $('.productMenu').css({'top': ($('#overall-header').height()-sd) + 'px'});
                    $('.sideBar').css({'padding-top': $('.productMenu').height() + 42 + 'px!important'});
                    $('.history').css({'top': ($('#overall-header').height() + $('.productMenu').height() + 30 +  - sd) + 'px'})
                } else {
                    $('.sideBar').css({'padding-top':  + '42px!important'});
                    $('.history').css({'top': ($('#overall-header').height() + 30 +  - sd) + 'px'})
                }
                $('#docHead').css({'top': (menuHeight-sd)+1 + 'px'});
                $('.sideBar #sideBarCnt').removeClass('sidebar-fixed');
                $('.rightSideMenu').removeClass('rsm-fixed');
            }
        } else {
            $('.subHeadWrapper').css({'top': 'unset'});
            $('.productMenu').css({'top': 'unset'});
            $('#docHead').css({'top': 'unset'});
            $('.sideBar').css({'padding-top': '20px!important'});
        }

        // right menu active link
        var title = document.querySelectorAll('.markdown-body h2');
        if ($('#fullTreeMenuListContainer').hasClass('needh3')) {
            title = document.querySelectorAll('.markdown-body h2, .markdown-body h3');
        }
        var rightNavItem = $('#AutoGenerateSidebar a');
        var flag = false
        for(i=0; i<title.length; i++){
            if($(title[i]).offset().top - 100 <= sd) {
                flag = true
                $('#AutoGenerateSidebar a').removeClass("active");
                $(rightNavItem[i]).addClass("active");
            }
        }
        if (!flag) {
            $('#AutoGenerateSidebar a').removeClass("active");
            $(rightNavItem[0]).addClass("active");
        }
    }

    $('.sideBarIcon').click(function() {
        $(".sideBar").toggleClass('hide-sm');
        $(".sideBar").toggleClass('hide-xs');
        setTimeout(function() {
            $('#sideBarCnt').css({'width': $('.sideBar').width() + 'px'});
        }, 100)
    })

    $(document).click(function(){
        $('.otherVersions').hide();
        $('.fullVersionInfo').hide();
    })

    $('.changeBtn').on('click', function(e) {
        $('.otherVersions').toggle();
        stopPropagation(e);
    })

    $('.fvChange').on('click', function(e) {
        $('.fullVersionInfo').toggle();
        stopPropagation(e);
    })

    $('.history .currentVersion').on('click', function(e) {
        $('.fullVersionInfo').slideToggle();
        stopPropagation(e);
    })

    $('.markdown-body .sample-code-prefix + blockquote ul li').on('click', function() {
        var index = $(this).index()
        var sIndex = $($(this).parent().parent()[0].previousSibling.previousSibling).index('.sample-code-prefix')
        $('.markdown-body .sample-code-prefix').eq(sIndex).find('+ blockquote ul li').removeClass('on')
        $('.markdown-body .sample-code-prefix').eq(sIndex).find('+ blockquote ol li').removeClass('on')
        $('.markdown-body .sample-code-prefix').eq(sIndex).find('+ blockquote ul li').eq(index).addClass('on')
        $('.markdown-body .sample-code-prefix').eq(sIndex).find('+ blockquote ol li').eq(index).addClass('on')
    })

    $('.markdown-body .sample-code-prefix + blockquote ol li a').on('click', function() {
        copy($(this).parent().find('code').text())
    })

    $('.copy-prefix + p a').on('click', function() {
        copy($(this).parent().find('+ div code').text())
    })

    $('.rightMenuControlBtn').on('click', function() {
        $('.docContainer .main, .rightSideMenu, .markdown-body').toggleClass('showRightSideMenu')
    })

    $('.fold-panel-prefix + * i').on('click', function() {
        $(this).parent().find('.fa-caret-down').toggleClass('fa-caret-up')
        if ($(this).parent().next().hasClass('fold-panel-start')) {
            var foldPanel = $(this).parent().next();
            while(!foldPanel.hasClass('fold-panel-end')) {
                if (!foldPanel.hasClass('fold-panel-start')) {
                    $(foldPanel).toggle()
                }
                foldPanel = $(foldPanel).next()
            }
        }
    })
})

function copy(data) {
    let url = data;
    let oInput = document.createElement('textarea')
    oInput.value = url
    document.body.appendChild(oInput)
    oInput.select()
    document.execCommand("Copy");
    oInput.remove()
}

function init() {
    var subHeight = 0;
    if ($('.subHeadWrapper').length > 0) {
        subHeight = $('.subHeadWrapper').height();
    } else {
        subHeight = $('.productMenu').height();
    }
    var menuHeight = $('#overall-header').height() + subHeight;
    $('#sideBarCnt').css({'width': $('.sideBar').width() + 'px'});
    $('#fullTreeMenuListContainer').css({'min-height': 'calc(100vh - '+(menuHeight + 120) +'px)'});
    $('#fullTreeMenuListContainer').css({'max-height': 'calc(100vh - '+(menuHeight + 100) +'px)'});
    $('.rightSideMenu').css({'padding-top': $('#docHead').outerHeight()+'px'});
    $('.docContainer .markdown-body').css({'margin-top': ($('#docHead').outerHeight() + 0) + 'px'});
    if (breakpoint() == 'lg') {
        $('.history').css({'width': $('#txtSearch').outerWidth() + 'px'});
        $('.history').removeClass('history-absolute');
    } else {
        $('.history').css({'width': '140px'});
        $('.history').addClass('history-absolute');
    }
    if ($(window).outerWidth() > 1680) {
        if (breakpoint() == 'lg') {
            $('.markdown-body h2').css({'padding-top': $('#docHead').outerHeight() + 110 + 'px'})
            $('.markdown-body h2').css({'margin-top': -$('#docHead').outerHeight() - 80 + 'px'})
            $('.markdown-body h3').css({'padding-top': $('#docHead').outerHeight() + 110 + 'px'})
            $('.markdown-body h3').css({'margin-top': -$('#docHead').outerHeight() - 110 + 'px'})
            $('.markdown-body h4').css({'padding-top': $('#docHead').outerHeight() + 110 + 'px'})
            $('.markdown-body h4').css({'margin-top': -$('#docHead').outerHeight() - 110 + 'px'})
            $('.markdown-body h5').css({'padding-top': $('#docHead').outerHeight() + 110 + 'px'})
            $('.markdown-body h5').css({'margin-top': -$('#docHead').outerHeight() - 110 + 'px'})
        }
    } else {
        if (breakpoint() == 'lg') {
            $('.markdown-body h2').css({'padding-top': $('#docHead').outerHeight() + 90 + 'px'})
            $('.markdown-body h2').css({'margin-top': -$('#docHead').outerHeight() - 60 + 'px'})
            $('.markdown-body h3').css({'padding-top': $('#docHead').outerHeight() + 90 + 'px'})
            $('.markdown-body h3').css({'margin-top': -$('#docHead').outerHeight() - 90 + 'px'})
            $('.markdown-body h4').css({'padding-top': $('#docHead').outerHeight() + 90 + 'px'})
            $('.markdown-body h4').css({'margin-top': -$('#docHead').outerHeight() - 90 + 'px'})
            $('.markdown-body h5').css({'padding-top': $('#docHead').outerHeight() + 90 + 'px'})
            $('.markdown-body h5').css({'margin-top': -$('#docHead').outerHeight() - 90 + 'px'})
        } else {
            $('.markdown-body h2').css({'padding-top': '90px'})
            $('.markdown-body h2').css({'margin-top': '-60px'})
            $('.markdown-body h3').css({'padding-top': '90px'})
            $('.markdown-body h3').css({'margin-top': '-60px'})
            $('.markdown-body h4').css({'padding-top': '90px'})
            $('.markdown-body h4').css({'margin-top': '-90px'})
            $('.markdown-body h5').css({'padding-top': '90px'})
            $('.markdown-body h5').css({'margin-top': '-90px'})
        }
    }

}

function initFoldPanel() {
    var objs = $(".fold-panel-prefix")
    for(var i = 0; i<objs.length; i++) {
        var obj = $(".fold-panel-prefix").eq(i)
        $(obj).next().find('i').css({'width': ($(obj).next().width() - 24) + 'px'})
        $(obj).next().find('i').css({'height': $(obj).next().height() + 'px'})
        $(obj).next().find('i').css({'line-height': $(obj).next().height() + 'px'})
    }
    $(".fold-panel-start").nextUntil(".fold-panel-end").hide()
}

function formatDate(date) {
    var weekdayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var newDate = new Date(date)
    var weekday = weekdayList[newDate.getDay()]
    var month = monthList[newDate.getMonth()]
    return weekday + ', ' + month + ' ' + newDate.getDate() + ', ' + newDate.getFullYear()
}

