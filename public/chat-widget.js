(function() {
  function init() {
    // Inject CSS
    var style = document.createElement('style');
    style.textContent = '.cw-root{position:fixed;bottom:1.5rem;right:1.5rem;z-index:9999;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",system-ui,sans-serif}.cw-button{width:52px;height:52px;border-radius:50%;border:none;background:var(--sl-color-accent,#3b82f6);color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(0,0,0,0.25);transition:transform .2s,opacity .2s}.cw-button:hover{transform:scale(1.05)}.cw-open .cw-button{opacity:0;pointer-events:none}.cw-panel{position:fixed;bottom:1.5rem;right:1.5rem;width:380px;height:520px;max-height:calc(100vh - 3rem);background:var(--sl-color-gray-6,#1a1a2e);border-radius:12px;border:1px solid var(--sl-color-gray-4,#333);box-shadow:0 8px 32px rgba(0,0,0,0.2);display:flex;flex-direction:column;opacity:0;transform:translateY(20px) scale(0.95);pointer-events:none;transition:all .25s ease}.cw-open .cw-panel{opacity:1;transform:translateY(0) scale(1);pointer-events:auto}.cw-header{display:flex;justify-content:space-between;align-items:center;padding:.85rem 1rem;border-bottom:1px solid var(--sl-color-gray-5,#444);font-size:.9rem}.cw-close{background:none;border:none;font-size:1.4rem;cursor:pointer;color:var(--sl-color-gray-3,#888);padding:0 .25rem;line-height:1}.cw-close:hover{color:var(--sl-color-white,#fff)}.cw-messages{flex:1;overflow-y:auto;padding:.75rem;display:flex;flex-direction:column;gap:.6rem}.cw-msg{display:flex;max-width:85%}.cw-user{margin-left:auto;justify-content:flex-end}.cw-bot{margin-right:auto;justify-content:flex-start}.cw-msg-content{padding:.55rem .85rem;border-radius:10px;font-size:.85rem;line-height:1.5;word-wrap:break-word}.cw-user .cw-msg-content{background:var(--sl-color-accent,#3b82f6);color:#fff;border-bottom-right-radius:3px}.cw-bot .cw-msg-content{background:var(--sl-color-gray-5,#333);color:var(--sl-color-white,#fff);border-bottom-left-radius:3px}.cw-bot .cw-short{border-bottom-left-radius:0}.cw-bot .cw-full{border-bottom-left-radius:0}.cw-readmore{font-size:.75rem;color:var(--sl-color-accent,#3b82f6);cursor:pointer;padding:.2rem 0 0 .85rem;user-select:none}.cw-readmore:hover{text-decoration:underline}.cw-suggestions{display:flex;flex-direction:column;gap:6px;padding:4px 8px 8px 8px}.cw-suggestion{text-align:left;padding:8px 12px;border-radius:8px;border:1px solid var(--sl-color-gray-4,#444);background:var(--sl-color-gray-6,#1a1a2e);color:var(--sl-color-gray-2,#ccc);cursor:pointer;font-size:.8rem;transition:all .15s}.cw-suggestion:hover{border-color:var(--sl-color-accent,#3b82f6);background:var(--sl-color-gray-5,#333)}.cw-suggestion.hidden{display:none}.cw-input-area{display:flex;gap:.5rem;padding:.75rem;border-top:1px solid var(--sl-color-gray-5,#444)}.cw-input{flex:1;padding:.5rem .75rem;border-radius:8px;border:1px solid var(--sl-color-gray-4,#333);background:var(--sl-color-gray-5,#333);color:var(--sl-color-white,#fff);font-size:.85rem;outline:none}.cw-input:focus{border-color:var(--sl-color-accent,#3b82f6)}.cw-input::placeholder{color:var(--sl-color-gray-3,#888)}.cw-send{width:36px;height:36px;border-radius:8px;border:none;background:var(--sl-color-accent,#3b82f6);color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0}.cw-send:disabled{opacity:.4;cursor:not-allowed}.cw-send:hover:not(:disabled){filter:brightness(1.1)}.cw-typing .cw-msg-content{display:flex;gap:4px;align-items:center;padding:.7rem 1rem}.cw-dot{width:7px;height:7px;border-radius:50%;background:var(--sl-color-gray-3,#888);animation:cw-bounce 1.4s ease-in-out both}@keyframes cw-bounce{0%,80%,100%{transform:scale(0)}40%{transform:scale(1)}}.cw-dot:nth-child(1){animation-delay:-.32s}.cw-dot:nth-child(2){animation-delay:-.16s}.cw-dot:nth-child(3){animation-delay:0s}@media(max-width:480px){.cw-panel{right:0;bottom:0;width:100%;height:100vh;max-height:100vh;border-radius:0}}';
    document.head.appendChild(style);

    // Create HTML
    var root = document.createElement('div');
    root.className = 'cw-root';
    root.id = 'cw-root';
    root.innerHTML = '<button class="cw-button" id="cw-button" aria-label="Open chat"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg></button><div class="cw-panel" id="cw-panel"><div class="cw-header"><strong>Ask the Playbook</strong><button class="cw-close" id="cw-close">&times;</button></div><div class="cw-messages" id="cw-messages"><div class="cw-msg cw-bot"><div class="cw-msg-content">Ask me anything about AI tools, models, concepts, or workflows covered in the playbook.</div></div></div><div class="cw-suggestions" id="cw-suggestions"><button class="cw-suggestion" data-q="What is the difference between RAG and fine-tuning?">What is the difference between RAG and fine-tuning?</button><button class="cw-suggestion" data-q="Which model should I use for coding?">Which model should I use for coding?</button><button class="cw-suggestion" data-q="Explain how transformers work">Explain how transformers work</button></div><div class="cw-input-area"><input type="text" class="cw-input" id="cw-input" placeholder="Ask a question..."/><button class="cw-send" id="cw-send"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9"/></svg></button></div></div>';
    document.body.appendChild(root);

    var btn = document.getElementById('cw-button');
    var panel = document.getElementById('cw-panel');
    var close = document.getElementById('cw-close');
    var input = document.getElementById('cw-input');
    var send = document.getElementById('cw-send');
    var messages = document.getElementById('cw-messages');

    var isOpen = false;
    var isAsking = false;
    var conversation = [];
    var started = false;
    var suggestions = document.getElementById('cw-suggestions');

    function hideSuggestions() {
      if (suggestions) suggestions.classList.add('hidden');
    }

    function toggle() {
      isOpen = !isOpen;
      root.classList.toggle('cw-open', isOpen);
      if (isOpen) setTimeout(function() { input.focus(); }, 300);
    }

    btn.onclick = toggle;
    if (close) close.onclick = toggle;

    // Suggested questions
    if (suggestions) {
      suggestions.querySelectorAll('.cw-suggestion').forEach(function(s) {
        s.addEventListener('click', function() {
          var q = this.getAttribute('data-q');
          if (q) {
            input.value = q;
            hideSuggestions();
            ask();
          }
        });
      });
    }

    function addMsg(text, isUser) {
      if (!started) {
        started = true;
        hideSuggestions();
      }
      var div = document.createElement('div');
      div.className = 'cw-msg ' + (isUser ? 'cw-user' : 'cw-bot');
      var content = document.createElement('div');
      content.className = 'cw-msg-content';
      if (isUser) {
        content.textContent = text;
        div.appendChild(content);
      } else {
        // Collapsible long responses
        var MAX_SHORT = 200;
        if (text.length > MAX_SHORT) {
          var breakAt = text.lastIndexOf('. ', MAX_SHORT);
          if (breakAt < 100) breakAt = text.lastIndexOf(' ', MAX_SHORT);
          if (breakAt < 80) breakAt = MAX_SHORT;

          var shortText = text.substring(0, breakAt + 1);

          // Short content (visible initially)
          content.innerHTML = shortText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
          content.className = 'cw-msg-content cw-short';
          div.appendChild(content);

          // Full content (hidden initially)
          var fullDiv = document.createElement('div');
          fullDiv.className = 'cw-msg-content cw-full';
          fullDiv.style.display = 'none';
          fullDiv.innerHTML = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
          div.appendChild(fullDiv);

          // Read more toggle
          var toggle = document.createElement('div');
          toggle.className = 'cw-readmore';
          toggle.textContent = '+ Read more';
          toggle.onclick = function() {
            if (fullDiv.style.display === 'none') {
              content.style.display = 'none';
              fullDiv.style.display = 'block';
              toggle.textContent = '- Show less';
            } else {
              content.style.display = 'block';
              fullDiv.style.display = 'none';
              toggle.textContent = '+ Read more';
            }
          };
          div.appendChild(toggle);
        } else {
          content.innerHTML = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
          div.appendChild(content);
        }
      }
      messages.appendChild(div);
      messages.scrollTop = messages.scrollHeight;

      // Track conversation history (keep last 10 messages)
      conversation.push({ role: isUser ? 'user' : 'assistant', content: text });
      if (conversation.length > 10) conversation.splice(0, conversation.length - 10);
    }

    function showTyping() {
      var d = document.createElement('div');
      d.className = 'cw-msg cw-bot cw-typing';
      d.id = 'cw-typing';
      d.innerHTML = '<div class="cw-msg-content"><span class="cw-dot"></span><span class="cw-dot"></span><span class="cw-dot"></span></div>';
      messages.appendChild(d);
      messages.scrollTop = messages.scrollHeight;
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
      send.disabled = true;
      addMsg(q, true);
      showTyping();

      fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q, history: conversation }),
      })
      .then(function(r) { return r.json(); })
      .then(function(data) {
        removeTyping();
        if (data.error) {
          addMsg('Error: ' + data.error, false);
        } else if (data.answer && data.answer.trim()) {
          addMsg(data.answer, false);
        } else {
          addMsg('No response received.', false);
        }
      })
      .catch(function(e) {
        removeTyping();
        addMsg('Network error: ' + e.message, false);
      })
      .finally(function() {
        isAsking = false;
        input.disabled = false;
        send.disabled = false;
        input.focus();
      });
    }

    input.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') { e.preventDefault(); ask(); }
    });
    send.addEventListener('click', ask);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
