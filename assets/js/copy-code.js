// Adds a "Copy" button to every block code snippet (`<pre><code>`).
// Inline `<code>` is ignored. Runs after the DOM is parsed; the button reads
// the code text at click time, so it is independent of syntax highlighting.
(function () {
  function addButtons() {
    document.querySelectorAll('pre > code').forEach(function (code) {
      var pre = code.parentNode;
      if (pre.parentNode && pre.parentNode.classList.contains('code-block-wrapper')) {
        return; // already processed
      }

      var wrapper = document.createElement('div');
      wrapper.className = 'code-block-wrapper';
      pre.parentNode.insertBefore(wrapper, pre);
      wrapper.appendChild(pre);

      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'copy-code-button';
      button.setAttribute('aria-label', 'Copy code to clipboard');
      button.textContent = 'Copy';

      button.addEventListener('click', function () {
        var text = code.innerText;

        function done() {
          button.textContent = 'Copied!';
          button.classList.add('copied');
          setTimeout(function () {
            button.textContent = 'Copy';
            button.classList.remove('copied');
          }, 1500);
        }

        function fallback() {
          var ta = document.createElement('textarea');
          ta.value = text;
          ta.style.position = 'fixed';
          ta.style.opacity = '0';
          document.body.appendChild(ta);
          ta.select();
          try { document.execCommand('copy'); done(); } catch (e) { /* ignore */ }
          document.body.removeChild(ta);
        }

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(done).catch(fallback);
        } else {
          fallback();
        }
      });

      wrapper.appendChild(button);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addButtons);
  } else {
    addButtons();
  }
})();
