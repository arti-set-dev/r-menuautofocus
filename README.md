# MenuAutoFocus
---
## Описание плагина

Данный плагин позволяет пользователю перемещаться с клавиатуры при открытии меню без лишних нажатий на клавишу `tab`, т. к. фокус автоматически переключается к меню когда оно отрыто и не переключается к меню, когда оно закрыто. Такой функционал позволяет удобно перемещаться по странице сайта при помощи клавиатуры и не наводится фокусом на те элементы страницы, которые скрыты от пользователя. 

Для наглядной демонстрации работы плагина, смотрите демо 1: https://codepen.io/arti-set-dev/pen/zYLPNYY и демо 2: https://codepen.io/arti-set-dev/pen/JjBOEKK.

## Загрузка и инициализация

Для загрузки плагина введите следующую команду: `npm i r-menuautofocus`

После загрузки перед инициализацией пропишите необходимые атрибуты для работы плагина: 

Кнопке вызова меню (бургеру) задайте атрибут `data-burger`. 

Для меню задайте атрибут `data-menu`. 

Если на вашем сайте присутствует обертка (overlay), закрывающая меню -  задайте ей атрибут `data-menu-overlay`. 

Если внутри меню сайта присутствует кнопка "закрыть меню" - задайте ей атрибут `data-close`. 

Если по нажатию на какую-либо кнопку внутри меню, оно должно закрываться, задайте такой кнопке (кнопкам) атрибут `data-menu-item`.

### *примечание:*

Для корректной работы плагина обязательны атрибуты: `data-burger` и `data-menu`. Остальные атрибуты вносятся в зависимости от наличия определённых элементов на странице.

После внесения атрибутов для инициализации пропишите следующее: 
```js
const menuAutofocus = new MenuAutofocus('[data-burger]');
```
## Настройки плагина

### Задержка фокуса. 
По умолчанию 0.
```js
const menuAutofocus = new MenuAutofocus('[data-burger]', {
  duration: 300,
});
```
### Автопереключение фокуса к меню. 
При открытии меню, фокус переключится к первому фокусируемому элементу меню. По умолчанию `false`. 
```js
const menuAutofocus = new MenuAutofocus('[data-burger]', {
  autoFocusToMenu: true,
});
```
### Автопереключение фокуса к кнопке "закрыть меню". 
При открытии меню, фокус переместится к кнопке "закрыть меню" По умолчанию `false`. 
```js
const menuAutofocus = new MenuAutofocus('[data-burger]', {
  autoFocusToCloseBtn: true,
});
```
### Изменение атрибутов и селекторов. 
Если нужно изменить название атрибутов и (или) классов - делайте это следующим образом: 
```js
const menuAutofocus = new MenuAutofocus('[data-burger]', {
  menuName: 'data-menu',  // ваш атрибут...
  closeBtnName: 'data-close', // ваш атрибут...
  overlayName: 'data-menu-overlay', // ваш атрибут...
  menuItemName: 'data-menu-item', // ваш атрибут...
  menuActiveClass: 'menu--active', // ваш класс...
});
```