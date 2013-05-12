
$(function(){
   $('a[rel=tooltip]').tooltip({ delay: { show: 100, hide: 100 } });
   
   $('a[rel=popover]').popover({ delay: { show: 100, hide: 100 } });
});