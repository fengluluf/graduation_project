import $ from 'jquery'

export function showMsg(title){
    var str = '<div class="el-message el-message--error js_popup" style="z-index: 2002;"><i class="el-message__icon el-icon-error"></i><p class="el-message__content">'
                +title
                +'</p></div>';
    $('body').append(str);
    setTimeout(()=>{
        $('.js_popup').remove();
    },2000)
}