function format(command, value = null) {
    document.execCommand(command, false, value);
    updateToolbar();
}

const boldBtn = document.getElementById('bold-btn');
const italicBtn = document.getElementById('italic-btn');
const underlineBtn = document.getElementById('underline-btn');
const colorBtn = document.getElementById('color-btn');
const colorPicker = document.getElementById('color-picker');

const alignLeftBtn = document.getElementById('align-left-btn');
const alignCenterBtn = document.getElementById('align-center-btn');
const alignRightBtn = document.getElementById('align-right-btn');
const alignJustifyBtn = document.getElementById('align-justify-btn');

const undoBtn = document.getElementById('undo-btn');
const redoBtn = document.getElementById('redo-btn');

const editor = document.getElementById('editor');

boldBtn.onclick = () => format('bold');
italicBtn.onclick = () => format('italic');
underlineBtn.onclick = () => format('underline');

colorBtn.onclick = () => colorPicker.click();
colorPicker.oninput = e => format('foreColor', e.target.value);

alignLeftBtn.onclick = () => format('justifyLeft');
alignCenterBtn.onclick = () => format('justifyCenter');
alignRightBtn.onclick = () => format('justifyRight');
alignJustifyBtn.onclick = () => format('justifyFull');

undoBtn.onclick = () => format('undo');
redoBtn.onclick = () => format('redo');

function updateToolbar() {
    boldBtn.classList.toggle('selected', document.queryCommandState('bold'));
    italicBtn.classList.toggle('selected', document.queryCommandState('italic'));
    underlineBtn.classList.toggle('selected', document.queryCommandState('underline'));
}

editor.addEventListener('keyup', updateToolbar);
editor.addEventListener('mouseup', updateToolbar);
editor.addEventListener('focus', updateToolbar);
editor.addEventListener('blur', updateToolbar);

editor.addEventListener('paste', e => {
    e.preventDefault();
    const text = (e.clipboardData || window.clipboardData).getData('text/plain');
    document.execCommand('insertText', false, text);
});
