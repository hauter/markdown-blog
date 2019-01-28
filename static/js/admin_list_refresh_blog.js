$(document).ready(function() {
    $('#refresh-blog').click(function() {
        $.post('/admin/posts/refresh', function(res) {
            alert(res.message)
        }, 'json')
    })
})