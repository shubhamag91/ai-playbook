(function() {
  function init() {
    // Key AI terms to highlight (A)
    var keyTerms = ['Claude','GPT','Gemini','DeepSeek','RAG','LLM','Fine-tuning','Fine tuning','Embedding','Token','Hallucination','Quantization','Ollama','vLLM','Llama','Mistral','Qwen','Phi','Haiku','Sonnet','Opus','MATH','MMLU','GPQA','HumanEval','SWE-bench','RLHF','LoRA','R1','V4'];

    // Inject CSS
    var style = document.createElement('style');
    style.textContent = '.cw-root{position:fixed;bottom:1.5rem;right:1.5rem;z-index:9999;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",system-ui,sans-serif}.cw-button{width:52px;height:52px;border-radius:50%;border:none;background:var(--sl-color-accent,#3b82f6);color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(0,0,0,0.25);transition:transform .2s,opacity .2s}.cw-button:hover{transform:scale(1.05)}.cw-open .cw-button{opacity:0;pointer-events:none}.cw-panel{position:fixed;bottom:1.5rem;right:1.5rem;width:640px;height:640px;max-height:calc(100vh - 3rem);background:var(--sl-color-gray-6,#1a1a2e);border-radius:12px;border:1px solid var(--sl-color-gray-4,#333);box-shadow:0 8px 32px rgba(0,0,0,0.2);display:flex;flex-direction:column;opacity:0;transform:translateY(20px) scale(0.95);pointer-events:none;transition:all .25s ease}.cw-open .cw-panel{opacity:1;transform:translateY(0) scale(1);pointer-events:auto}.cw-header{display:flex;justify-content:space-between;align-items:center;padding:.85rem 1rem;border-bottom:1px solid var(--sl-color-gray-5,#444);font-size:.9rem}.cw-header div{display:flex;gap:.3rem;align-items:center}.cw-newchat{background:none;border:none;font-size:1rem;cursor:pointer;color:var(--sl-color-gray-3,#888);padding:.2rem;line-height:1;display:flex;align-items:center;border-radius:4px}.cw-newchat:hover{color:var(--sl-color-white,#fff);background:var(--sl-color-gray-5,#333)}.cw-close{background:none;border:none;font-size:1.4rem;cursor:pointer;color:var(--sl-color-gray-3,#888);padding:0 .25rem;line-height:1}.cw-close:hover{color:var(--sl-color-white,#fff)}.cw-messages{flex:1;overflow-y:auto;padding:.75rem;display:flex;flex-direction:column}.cw-scroll-btn{position:absolute;bottom:5rem;right:1rem;width:32px;height:32px;border-radius:50%;border:1px solid var(--sl-color-gray-4,#444);background:var(--sl-color-gray-6,#1a1a2e);color:var(--sl-color-gray-2,#ccc);cursor:pointer;display:none;align-items:center;justify-content:center;font-size:.8rem;z-index:5;box-shadow:0 2px 8px rgba(0,0,0,0.2);transition:opacity .2s}.cw-scroll-btn:hover{background:var(--sl-color-gray-5,#333)}.cw-msg{display:flex;max-width:92%;position:relative}.cw-user{margin-left:auto;justify-content:flex-end}.cw-bot{margin-right:auto;justify-content:flex-start}.cw-msg-content{padding:.55rem .85rem;border-radius:10px;font-size:.85rem;line-height:1.5;word-wrap:break-word}.cw-user .cw-msg-content{background:var(--sl-color-accent,#3b82f6);color:#fff;border-bottom-right-radius:3px}.cw-bot .cw-msg-content{background:var(--sl-color-gray-5,#333);color:var(--sl-color-white,#fff);border-bottom-left-radius:3px}.cw-term{color:var(--sl-color-accent,#3b82f6);font-weight:500}.cw-time{font-size:.62rem;color:var(--sl-color-gray-4,#555);padding:0 .85rem;margin-top:.1rem;user-select:none}.cw-msg-divider{height:1px;background:var(--sl-color-gray-5,#444);margin:4px 0 2px 0}.cw-copy{position:absolute;top:.3rem;right:.3rem;width:24px;height:24px;border-radius:4px;border:none;background:var(--sl-color-gray-5,#333);color:var(--sl-color-gray-3,#888);cursor:pointer;display:none;align-items:center;justify-content:center;font-size:.65rem;opacity:.7;z-index:2}.cw-msg:hover .cw-copy{display:flex}.cw-copy:hover{opacity:1;color:var(--sl-color-accent,#3b82f6)}.cw-bot .cw-msg-content code{background:var(--sl-color-gray-6,#1a1a2e);padding:.1rem .3rem;border-radius:3px;font-size:.8rem;font-family:monospace}.cw-bot .cw-msg-content pre{background:var(--sl-color-gray-6,#1a1a2e);padding:.5rem;border-radius:6px;overflow-x:auto;margin:.3rem 0;font-size:.78rem}.cw-bot .cw-msg-content pre code{background:none;padding:0;border-radius:0}.cw-bot .cw-msg-content blockquote{border-left:none;margin:.25rem 0;padding:.25rem .55rem;background:rgba(34,197,94,0.12);border-radius:6px;color:var(--sl-color-gray-2,#ccc);font-size:.82rem;line-height:1.5}.cw-bot .cw-msg-content blockquote+blockquote{margin-top:-.1rem}.cw-highlight{color:#22c55e;font-weight:500}.cw-bot .cw-msg-content ol,.cw-bot .cw-msg-content ul{margin:.2rem 0;padding-left:1.2rem;font-size:.85rem;line-height:1.5}.cw-bot .cw-msg-content li{margin-bottom:0}.cw-suggestions{display:flex;flex-direction:column;gap:6px;padding:4px 8px 8px 8px;user-select:none}.cw-suggestion{text-align:left;padding:8px 12px;border-radius:8px;border:1px solid var(--sl-color-gray-4,#444);background:var(--sl-color-gray-6,#1a1a2e);color:var(--sl-color-gray-2,#ccc);cursor:pointer;font-size:.8rem;transition:all .15s}.cw-suggestion:hover{border-color:var(--sl-color-accent,#3b82f6);background:var(--sl-color-gray-5,#333)}.cw-suggestions.hidden{display:none}.cw-input-area{display:flex;flex-direction:column;gap:2px;padding:.6rem .75rem .45rem;border-top:1px solid var(--sl-color-gray-5,#444)}.cw-input-row{display:flex;gap:.35rem}.cw-input{flex:1;padding:.5rem .75rem;border-radius:8px;border:1px solid var(--sl-color-gray-4,#333);background:var(--sl-color-gray-5,#333);color:var(--sl-color-white,#fff);font-size:.85rem;outline:none;resize:none;font-family:inherit;min-height:36px;max-height:120px;line-height:1.4}.cw-input:focus{border-color:var(--sl-color-accent,#3b82f6)}.cw-input::placeholder{color:var(--sl-color-gray-3,#888)}.cw-send{width:36px;height:36px;border-radius:8px;border:none;background:var(--sl-color-accent,#3b82f6);color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;align-self:flex-end}.cw-send:disabled{opacity:.4;cursor:not-allowed}.cw-send:hover:not(:disabled){filter:brightness(1.1)}.cw-hint{font-size:.6rem;color:var(--sl-color-gray-4,#555);text-align:right;padding:0 4px}.cw-typing .cw-msg-content{display:flex;gap:4px;align-items:center;padding:.7rem 1rem}.cw-dot{width:7px;height:7px;border-radius:50%;background:var(--sl-color-gray-3,#888);animation:cw-bounce 1.4s ease-in-out both}@keyframes cw-bounce{0%,80%,100%{transform:scale(0)}40%{transform:scale(1)}}.cw-dot:nth-child(1){animation-delay:-.32s}.cw-dot:nth-child(2){animation-delay:-.16s}.cw-dot:nth-child(3){animation-delay:0s}@media(max-width:480px){.cw-panel{right:0;bottom:0;width:100%;height:100vh;max-height:100vh;border-radius:0}}';
    document.head.appendChild(style);

    // Create HTML
    var root = document.createElement('div');
    root.className = 'cw-root';
    root.id = 'cw-root';
    root.innerHTML = '<button class="cw-button" id="cw-button" aria-label="Open chat"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg></button><div class="cw-panel" id="cw-panel"><div class="cw-header"><strong>Ask the Playbook</strong><div><button class="cw-newchat" id="cw-newchat" title="New chat"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg></button><button class="cw-close" id="cw-close" aria-label="Close chat">&times;</button></div></div><div class="cw-messages" id="cw-messages"><div class="cw-msg cw-bot"><div class="cw-msg-content">Ask me anything about AI tools, models, concepts, or workflows covered in the playbook.</div></div></div><button class="cw-scroll-btn" id="cw-scroll-btn">&#x25BC;</button><div class="cw-suggestions" id="cw-suggestions"><button class="cw-suggestion" data-q="What is the difference between RAG and fine-tuning?">What is the difference between RAG and fine-tuning?</button><button class="cw-suggestion" data-q="Which model should I use for coding?">Which model should I use for coding?</button><button class="cw-suggestion" data-q="Explain how transformers work">Explain how transformers work</button></div><div class="cw-input-area"><div class="cw-input-row"><textarea class="cw-input" id="cw-input" placeholder="Ask a question..." rows="1"></textarea><button class="cw-send" id="cw-send"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9"/></svg></button></div><span class="cw-hint">Enter to send</span></div></div>';
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
    var newChatBtn = document.getElementById('cw-newchat');
    var scrollBtn = document.getElementById('cw-scroll-btn');
    var welcomeMsg = messages.querySelector('.cw-msg');

    // New Chat button
    if (newChatBtn) {
      newChatBtn.onclick = function() { resetChat(); };
    }

    // Scroll-to-bottom button
    if (scrollBtn) {
      scrollBtn.style.display = 'none';
      messages.addEventListener('scroll', function() {
        var atBottom = messages.scrollHeight - messages.scrollTop - messages.clientHeight < 100;
        scrollBtn.style.display = atBottom ? 'none' : 'flex';
      });
      scrollBtn.onclick = function() {
        messages.scrollTop = messages.scrollHeight;
      };
    }

    // Auto-resize textarea
    if (input) {
      input.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 120) + 'px';
      });
    }

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

    function highlightTerms(html) {
      for (var t = 0; t < keyTerms.length; t++) {
        var regex = new RegExp('\\b(' + keyTerms[t].replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')\\b', 'gi');
        html = html.replace(regex, '<span class="cw-term">$1</span>');
      }
      return html;
    }

    function renderMarkdown(text) {
      // Escape HTML special chars first, then apply markdown
      var html = text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

      // Code blocks (```code```)
      html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');

      // Inline code (`code`)
      html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

      // Bold (**text**)
      html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

      // Highlighted text (> text)
      html = html.split('\n').map(function(line) {
        if (line.indexOf('&gt;') === 0 || line.indexOf('> ') === 0) {
          return '<span class="cw-highlight">' + line.replace(/^(&gt;|>)\s*/, '') + '</span>';
        }
        return line;
      }).join('\n');

      // Ordered lists (1. item)
      var inList = false;
      var lines = html.split('\n');
      for (var i = 0; i < lines.length; i++) {
        var match = lines[i].match(/^(\d+)\.\s+(.*)/);
        if (match) {
          if (!inList) { lines[i] = '<ol><li>' + match[2] + '</li>'; inList = 'ol'; }
          else { lines[i] = '<li>' + match[2] + '</li>'; }
        } else {
          if (inList === 'ol') { lines[i - 1] += '</ol>'; inList = false; }
        }
      }
      if (inList === 'ol') lines[lines.length - 1] += '</ol>';

      // Unordered lists (- item or * item)
      inList = false;
      var lines2 = lines.join('\n').split('\n');
      for (var j = 0; j < lines2.length; j++) {
        var match2 = lines2[j].match(/^[\-\*]\s+(.*)/);
        if (match2) {
          if (!inList) { lines2[j] = '<ul><li>' + match2[1] + '</li>'; inList = 'ul'; }
          else { lines2[j] = '<li>' + match2[1] + '</li>'; }
        } else {
          if (inList === 'ul') { lines2[j - 1] += '</ul>'; inList = false; }
        }
      }
      if (inList === 'ul') lines2[lines2.length - 1] += '</ul>';

      html = lines2.join('\n');

      // Line breaks: only convert newlines that are NOT inside HTML tags
      html = html.replace(/\n\n/g, '<br><br>');
      html = html.replace(/\n/g, function() { return '<br>'; });
      // Fix: remove <br> that ended up inside block-level tags
      html = html.replace(/<(ul|ol|pre|blockquote)[^>]*>\s*<br>/g, '<$1>');
      html = html.replace(/<br>\s*<\/(ul|ol|pre|blockquote)>/g, '</$1>');
      html = html.replace(/(<\/li>)<br>/g, '$1');
      html = html.replace(/<br>(<li>)/g, '$1');

      return html;
    }

    function resetChat() {
      // Clear messages, keep the welcome message
      while (messages.firstChild) messages.removeChild(messages.firstChild);
      var welcome = document.createElement('div');
      welcome.className = 'cw-msg cw-bot';
      welcome.innerHTML = '<div class="cw-msg-content">Ask me anything about AI tools, models, concepts, or workflows covered in the playbook.</div>';
      messages.appendChild(welcome);
      conversation = [];
      started = false;
      suggestions.classList.remove('hidden');
    }

    function addMsg(text, isUser) {
      if (!started) {
        started = true;
        hideSuggestions();
      }

      // C: Add divider between messages
      if (messages.children.length > 0 && started) {
        var divider = document.createElement('div');
        divider.className = 'cw-msg-divider';
        messages.appendChild(divider);
      }

      var div = document.createElement('div');
      div.className = 'cw-msg ' + (isUser ? 'cw-user' : 'cw-bot');
      var content = document.createElement('div');
      content.className = 'cw-msg-content';

      if (isUser) {
        content.textContent = text;
      } else {
        // Convert markdown to HTML
        var html = renderMarkdown(text);

        // A: Highlight key AI terms
        html = highlightTerms(html);

        content.innerHTML = html;
      }

      div.appendChild(content);

      // D: Timestamp
      var time = document.createElement('div');
      time.className = 'cw-time';
      time.textContent = 'just now';
      div.appendChild(time);

      // F: Copy button (bot messages only)
      if (!isUser) {
        var copyBtn = document.createElement('button');
        copyBtn.className = 'cw-copy';
        copyBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>';
        copyBtn.title = 'Copy to clipboard';
        copyBtn.onclick = function(originalText) {
          return function() {
            navigator.clipboard.writeText(originalText).then(function() {
              copyBtn.innerHTML = '<span style="color:#10b981">&#10003;</span>';
              setTimeout(function() {
                copyBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>';
              }, 2000);
            });
          };
        }(text);
        div.appendChild(copyBtn);
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
      input.style.height = 'auto';
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
