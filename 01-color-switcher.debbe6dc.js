const t={startButton:document.querySelector("[data-start]"),stopButton:document.querySelector("[data-stop]"),body:document.querySelector("body")};let o=null;t.startButton.addEventListener("click",(()=>{t.stopButton.disabled=!1,o=setInterval((()=>{t.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`,t.startButton.disabled=!0}),1e3)})),t.stopButton.addEventListener("click",(()=>{t.startButton.disabled=!1,clearInterval(o),t.stopButton.disabled=!0}));
//# sourceMappingURL=01-color-switcher.debbe6dc.js.map
