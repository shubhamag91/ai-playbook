(function() {
  console.log('[ChatWidget] Script loaded');

  function init() {
    console.log('[ChatWidget] Initializing');

    // Inject CSS
    var style = document.createElement('style');
    style.textContent = '.cw-root{position:fixed;bottom:1.5rem;right:1.5rem;z-index:9999;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",system-ui,sans-serif}.cw-button{width:52px;height:52px;border-radius:50%;border:none;background:var(--sl-color-accent,#3b82f6);color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(0,0,0,0.25);transition:transform .2s,opacity .2s}.cw-button:hover{transform:scale(1.05)}.cw-open .cw-button{opacity:0;pointer-events:none}.cw-panel{position:fixed;bottom:1.5rem;right:1.5rem;width:380px;height:520px;max-height:calc(100vh - 3rem);background:var(--sl-color-gray-6,#1a1a2e);border-radius:12px;border:1px solid var(--sl-color-gray-4,#333);box-shadow:0 8px 32px rgba(0,0,0,0.2);display:flex;flex-direction:column;opacity:0;transform:translateY(20px) scale(0.95);pointer-events:none;transition:all .25s ease}.cw-open .cw-panel{opacity:1;transform:translateY(0) scale(1);pointer-events:auto}.cw-header{display:flex;justify-content:space-between;align-items:center;padding:.85rem 1rem;border-bottom:1px solid var(--sl-color-gray-5,#444);font-size:.9rem}.cw-close{background:none;border:none;font-size:1.4rem;cursor:pointer;color:var(--sl-color-gray-3,#888);padding:0 .25rem;line-height:1}.cw-close:hover{color:var(--sl-color-white,#fff)}.cw-messages{flex:1;overflow-y:auto;padding:.75rem;display:flex;flex-direction:column;gap:.6rem}.cw-msg{display:flex;max-width:85%}.cw-user{margin-left:auto;justify-content:flex-end}.cw-bot{margin-right:auto;justify-content:flex-start}.cw-msg-content{padding:.55rem .85rem;border-radius:10px;font-size:.85rem;line-height:1.5;word-wrap:break-word}.cw-user .cw-msg-content{background:var(--sl-color-accent,#3b82f6);color:#fff;border-bottom-right-radius:3px}.cw-bot .cw-msg-content{background:var(--sl-color-gray-5,#333);color:var(--sl-color-white,#fff);border-bottom-left-radius:3px}.cw-sources{margin-top:.4rem;font-size:.75rem;padding:.4rem .7rem;background:var(--sl-color-gray-5,#333);border-radius:6px;color:var(--sl-color-gray-3,#888);line-height:1.5}.cw-sources a{color:var(--sl-color-accent,#3b82f6);text-decoration:none}.cw-sources a:hover{text-decoration:underline}.cw-input-area{display:flex;gap:.5rem;padding:.75rem;border-top:1px solid var(--sl-color-gray-5,#444)}.cw-input{flex:1;padding:.5rem .75rem;border-radius:8px;border:1px solid var(--sl-color-gray-4,#333);background:var(--sl-color-gray-5,#333);color:var(--sl-color-white,#fff);font-size:.85rem;outline:none}.cw-input:focus{border-color:var(--sl-color-accent,#3b82f6)}.cw-input::placeholder{color:var(--sl-color-gray-3,#888)}.cw-send{width:36px;height:36px;border-radius:8px;border:none;background:var(--sl-color-accent,#3b82f6);color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0}.cw-send:disabled{opacity:.4;cursor:not-allowed}.cw-send:hover:not(:disabled){filter:brightness(1.1)}.cw-typing .cw-msg-content{display:flex;gap:4px;align-items:center;padding:.7rem 1rem}.cw-dot{width:7px;height:7px;border-radius:50%;background:var(--sl-color-gray-3,#888);animation:cw-bounce 1.4s ease-in-out both}@keyframes cw-bounce{0%,80%,100%{transform:scale(0)}40%{transform:scale(1)}}.cw-dot:nth-child(1){animation-delay:-.32s}.cw-dot:nth-child(2){animation-delay:-.16s}.cw-dot:nth-child(3){animation-delay:0s}@media(max-width:480px){.cw-panel{right:0;bottom:0;width:100%;height:100vh;max-height:100vh;border-radius:0}}';
    document.head.appendChild(style);

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
