document.addEventListener('DOMContentLoaded', function() {
  const root = document.getElementById('cw-root');
  const btn = document.getElementById('cw-button');
  const panel = document.getElementById('cw-panel');
  const close = document.getElementById('cw-close');
  const input = document.getElementById('cw-input');
  const send = document.getElementById('cw-send');
  const messages = document.getElementById('cw-messages');

  if (!root || !btn) return;

  let isOpen = false;
  let isAsking = false;

  function toggle() {
    isOpen = !isOpen;
    root.classList.toggle('cw-open', isOpen);
    if (isOpen) setTimeout(function() { if (input) input.focus(); }, 300);
  }

  btn.addEventListener('click', toggle);
  if (close) close.addEventListener('click', toggle);

  if (input) {
    input.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); ask(); }
    });
  }
  if (send) send.addEventListener('click', ask);

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
    if (!input) return;
    var q = input.value.trim();
    if (!q || isAsking) return;

    isAsking = true;
    input.value = '';
    input.disabled = true;
    if (send) send.disabled = true;

    addMessage(q, true);
    var typingEl = showTyping();

    fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: q }),
    })
    .then(function(res) {
      if (!res.ok) {
        return res.json().then(function(err) {
          removeTyping();
          addMessage('Error: ' + (err.error || 'Failed to get answer'), false);
          throw new Error('Request failed');
        });
      }
      return processStream(res);
    })
    .catch(function(e) {
      if (e.message !== 'Request failed') {
        removeTyping();
        addMessage('Network error. Check your connection and try again.', false);
      }
    })
    .finally(function() {
      isAsking = false;
      if (input) { input.disabled = false; input.focus(); }
      if (send) send.disabled = false;
    });
  }

  function processStream(res) {
    var reader = res.body.getReader();
    var decoder = new TextDecoder();
    var answer = '';
    var sources = [];
    var botMsg = null;

    function readChunk() {
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

        return readChunk();
      });
    }

    return readChunk().catch(function() {
      removeTyping();
      addMessage('Failed to read response.', false);
    });
  }
});
