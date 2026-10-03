(function () {
  'use strict';
  var root = document.documentElement;
  var theme;
  try { theme = localStorage.getItem('company-theme'); } catch (e) { /* session-only theme */ }
  if (theme === 'dark' || theme === 'light') root.dataset.theme = theme;
  var toggle = document.querySelector('.theme-control');
  function themeLabel() {
    if (toggle) {
      var dark = root.dataset.theme === 'dark';
      toggle.textContent = dark ? 'Light' : 'Dark';
      toggle.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
    }
  }
  themeLabel();
  if (toggle) toggle.addEventListener('click', function () {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('company-theme', root.dataset.theme); } catch (e) { /* session-only */ }
    themeLabel();
  });
  var menu = document.querySelector('.menu-control');
  var links = document.querySelector('.site-links');
  function closeMenu() {
    if (!menu || !links) return;
    links.classList.remove('is-open'); menu.setAttribute('aria-expanded', 'false');
  }
  if (menu && links) {
    menu.addEventListener('click', function () {
      var opened = links.classList.toggle('is-open');
      menu.setAttribute('aria-expanded', String(opened));
    });
    links.addEventListener('click', function (event) { if (event.target.closest('a')) closeMenu(); });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && links.classList.contains('is-open')) { closeMenu(); menu.focus(); }
    });
  }
  document.querySelectorAll('[role=tablist]').forEach(function (list) {
    var tabs = Array.from(list.querySelectorAll('[role=tab]'));
    function select(tab) {
      tabs.forEach(function (item) {
        var on = item === tab;
        item.setAttribute('aria-selected', String(on)); item.tabIndex = on ? 0 : -1;
        var panel = document.getElementById(item.getAttribute('aria-controls'));
        if (panel) panel.hidden = !on;
      });
    }
    tabs.forEach(function (tab, index) {
      tab.addEventListener('click', function () { select(tab); });
      tab.addEventListener('keydown', function (event) {
        var next;
        if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
        if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = tabs.length - 1;
        if (next !== undefined) { event.preventDefault(); select(tabs[next]); tabs[next].focus(); }
      });
    });
  });
})();
