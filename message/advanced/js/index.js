$('.chat[data-chat=person2]').addClass('active-chat');
$('.person[data-chat=person2]').addClass('active');

var applozicUI = new ApplozicUI();

$('body').on('mousedown', '.left .person', function(event) {
    if ($(this).hasClass('.active')) {
        return false;
    } else {
        var findChat = $(this).attr('data-chat');
        var personName = $(this).find('.name').text();
        $('.right .top .name').html(personName);
        $('.chat').removeClass('active-chat');
        $('.left .person').removeClass('active');
        $(this).addClass('active');
        $('.chat[data-chat ="'+findChat+'"]').addClass('active-chat');
        applozicUI.loadConversation(findChat);
    }
});

function ApplozicUI() {

  var _this = this;
  var chatTemplate = '<div class="bubble ${youMeExpr}">${msgTextExpr}</div>';

  _this.loadConversation = function(contactId) {
      $applozic.fn.applozic('messageList',
        {
          'id': contactId,
          'isGroup': false,
          'callback': function(response) {
            //console.log(response);
            var messages = response.messages;
            var chats = "";
            for (var key in messages) {
              var message = messages[key];
                chats += chatTemplate.replace("${youMeExpr}", (message.type == 'outbox' ? "you" : "me"))
                  .replace("${msgTextExpr}", message.message);
              }
              $(".chat[data-chat='" + contactId + "']").append(chats);
          }
        });
  }


}
