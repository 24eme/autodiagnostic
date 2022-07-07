const buttonClass = '.button-clipboard'
const iconCopied  = 'bi-clipboard-check'
const iconClip    = 'bi-clipboard'
const timeout     = 5

function copypaste(target) {
  const input_id = target.dataset.input
  const input = document.getElementById(input_id)

  if (input === null) {
    return false;
  }

  input.focus()
  input.select()
  navigator.clipboard.writeText(input.value)
  changeIcon(target, iconCopied)
  window.setTimeout(function () { changeIcon(target, iconClip) }, timeout*1000)
}

function changeIcon(target, icon) {
  target.firstElementChild.classList.remove(iconCopied, iconClip)
  target.firstElementChild.classList.add(icon)
}

document.addEventListener('click', function (e) {
  for (var target = e.target; target && target != this; target = target.parentNode) {
    if (target.matches(buttonClass)) {
      copypaste(target)
      break
    }
  }
});
