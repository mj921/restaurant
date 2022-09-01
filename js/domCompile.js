const  domComplie = (el, gameData, context) => {
  const parent = document.createElement('div');
  let dom = el.innerHTML;
  dom = dom.replace(/\{\{(.*?)\}\}/g, ($0, $1) => {
    const expression = $1.replace(/(^\s+|\s+$)/g, '');
    return gameData[expression];
  })
  const events = [];
  dom = dom.replace(/\@([a-zA-Z]+)="([a-zA-Z]+)"/g, ($0, $1, $2) => {
    const expression = $2.replace(/(^\s+|\s+$)/g, '');
    events.push({
      event: $1,
      handler: expression
    })
    return $0;
  })
  parent.innerHTML = dom;
  console.log(parent);
  events.forEach(event => {
    console.log(parent.querySelector(`#${event.handler}`), event);
    parent.querySelector(`#${event.handler}`).addEventListener(event.event, () => {
      console.log(111);
      gameData[handler].call(context);
    })
  })
  el.innerHTML = '';
  for (let i = 0; i < parent.childNodes.length; i++) {
    el.appendChild(parent.childNodes[i]);
    console.log(parent.childNodes[i]);
  }
  return dom;
}