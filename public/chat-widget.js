(function() {
  console.log('[ChatWidget] Script loaded');

  function init() {
    console.log('[ChatWidget] Initializing');

    // Create chat widget HTML
    var root = document.createElement('div');
    root.className = 'cw-root';
    root.id = 'cw-root';

    root.innerHTML = '<button class="cw-button" id="cw-button" aria-label="Open chat">' +
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
      '<path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg></button>' +
      '<div class="cw-panel" id="cw-panel">' +
      '<div class="cw-header"><strong>Ask the Playbook</strong>' +
      '<button class="cw-close" id="cw-close" aria-label="Close chat">&times;</button></div>' +
      '<div class="cw-messages" id="cw-messages">' +
      '<div class="cw-msg cw-bot"><div class="cw-msg-content">Ask me anything about AI tools, models, concepts, or workflows covered in the playbook.</div></div>' +
      '</div>' +
      '<div class="cw-input-area">' +
      '<input type="text" class="cw-input" id="cw-input" placeholder="Ask a question..." />' +
      '<button class="cw-send" id="cw-send" aria-label="Send">' +
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
      '<line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9"/></svg></button></div></div>';

    document.body.appendChild(root);

    var btn = document.getElementById('cw-button');
    var panel = document.getElementById('cw-panel');
    var close = document.getElementById('cw-close');
    var input = document.getElementById('cw-input');
    var send = document.getElementById('cw-send');
    var messages = document.getElementById('cw-messages');

    console.log('[ChatWidget] Elements created, btn:', !!btn);

    if (!root || !btn) return;

    var isOpen = false;
    var isAsking = false;

    function toggle() {
      isOpen = !isOpen;
      root.classList.toggle('cw-open', isOpen);
      if (isOpen) {
        setTimeout(function() { if (input) input.focus(); }, 300);
      }
    }

    btn.addEventListener('click', function(e) {
      console.log('[ChatWidget] Button clicked');
      toggle();
    });

    if (close) {
      close.addEventListener('click', function(e) {
        console.log('[ChatWidget] Close clicked');
        toggle();
      });
    }

    if (input) {
      input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          ask();
        }
      });
    }

    if (send) {
      send.addEventListener('click', function(e) {
        console.log('[ChatWidget] Send clicked');
        ask();
      });
    }

    function addMessage(text, isUser, sources) {
      var div = document.createElement('div');
      div.className = 'cw-msg ' + (isUser ? 'cw-user' : 'cw-bot');
      var content = document.createElement('div');
      content.className = 'cw-msg-content';

      if (isUser) {
        content.textContent = text;
      } else {
        content.innerHTML = text
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/\n\n/g, '<br><br>')
          .replace(/\n/g, '<br>');
      }
      div.appendChild(content);

      if (sources && sources.length > 0) {
        var srcDiv = document.createElement('div');
        srcDiv.className = 'cw-sources';
        srcDiv.innerHTML = '<strong>Sources:</strong><br>' + sources.join('<br>');
        div.appendChild(srcDiv);
      }
      messages.appendChild(div);
      messages.scrollTop = messages.scrollHeight;
      return div;
    }

    function showTyping() {
      var div = document.createElement('div');
      div.className = 'cw-msg cw-bot cw-typing';
      div.id = 'cw-typing';
      div.innerHTML = '<div class="cw-msg-content"><span class="cw-dot"></span><span class="cw-dot"></span><span class="cw-dot"></span></div>';
      messages.appendChild(div);
      messages.scrollTop = messages.scrollHeight;
      return div;
    }

    function removeTyping() {
      var t = document.getElementById('cw-typing');
      if (t) t.remove();
    }

    function ask() {
      var q = input.value.trim();
      if (!q || isAsking) return;
      isAsking = true;
      input.value = '';
      input.disabled = true;
      if (send) send.disabled = true;

      addMessage(q, true);
      showTyping();

      fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q }),
      })
      .then(function(res) {
        if (!res.ok) {
          return res.json().then(function(err) {
            removeTyping();
            addMessage('Error: ' + (err.error || 'Failed'), false);
            throw new Error('fail');
          });
        }
        return readStream(res);
      })
      .catch(function(e) {
        if (e.message !== 'fail') {
          removeTyping();
          addMessage('Network error. Try again.', false);
        }
      })
      .finally(function() {
        isAsking = false;
        input.disabled = false;
        send.disabled = false;
        input.focus();
      });
    }

    function readStream(res) {
      var reader = res.body.getReader();
      var decoder = new TextDecoder();
      var answer = '';
      var sources = [];
      var botMsg = null;

      function read() {
        return reader.read().then(function(result) {
          if (result.done) return;
          var lines = decoder.decode(result.value).trim().split('\n');
          lines.forEach(function(line) {
            try {
              var data = JSON.parse(line);
              if (data.type === 'text') {
                answer += data.content;
                if (!botMsg) {
                  removeTyping();
                  botMsg = addMessage('', false);
                }
                botMsg.querySelector('.cw-msg-content').innerHTML = answer
                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  .replace(/\n\n/g, '<br><br>')
                  .replace(/\n/g, '<br>');
              } else if (data.type === 'sources') {
                sources = data.sources || [];
                if (botMsg && sources.length > 0) {
                  var srcDiv = document.createElement('div');
                  srcDiv.className = 'cw-sources';
                  srcDiv.innerHTML = '<strong>Sources:</strong><br>' + sources.join('<br>');
                  botMsg.appendChild(srcDiv);
                }
              } else if (data.type === 'error') {
                removeTyping();
                addMessage(data.content, false);
              }
            } catch(e) {}
          });
          return read();
        });
      }
      return read();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
