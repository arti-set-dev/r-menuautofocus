export default class MenuAutofocus {
  constructor(selector, options) {
    let defaultOptions = {
      duration: 0,
      autoFocusToMenu: false,
      autoFocusToCloseBtn: false,

      menuName: 'data-menu',
      closeBtnName: 'data-close',
      overlayName: 'data-menu-overlay',
      menuItemName: 'data-menu-item',
      menuActiveClass: 'menu--active',
    };

    this.options = Object.assign(defaultOptions, options);

    this.burger = document.querySelector(selector);
    this.menu = document.querySelector(`[${this.options.menuName}]`);
    this.closeBtn = document.querySelector(`[${this.options.closeBtnName}]`);
    this.overlay = document.querySelector(`[${this.options.overlayName}]`);

    this.focusElems = [
      'a[href]',
      'input',
      'button',
      'select',
      'textarea',
      '[tabindex]'
    ]

    this.menuFocusElems = null;

    this.events();
  }

  events() {
    document.addEventListener('DOMContentLoaded', () => {
      if (this.menu && this.burger) {
        setTimeout(() => {
          this.getFocusElems();
          if (getComputedStyle(this.burger).display != 'none' && !this.menu.classList.contains(this.options.menuActiveClass)) {
            this.navitationOff();
          }
        });

        document.addEventListener('click', (e) => {
          if (e.target == this.burger || e.target == this.closeBtn || e.target == this.overlay) {
            if (this.menu.classList.contains(this.options.menuActiveClass)) {
              this.navitationOn();
              this.focusToMenu(e);

              
            } else {
              if (getComputedStyle(this.burger).display != 'none') {
                this.navitationOff();
              }

              if (!e.target.closest(this.options.menuItemName)) {
                this.focusToBurger(e);
              }
            }
          }
          this.menuItems.forEach(menuItemEl => {
            if (e.target == menuItemEl) {
              this.navitationOff();
            }
          })
        })

        document.addEventListener('keydown', (e) => {
          if (e.target == this.burger && e.code === 'Tab' || e.target == this.burger || e.code === 'Tab') {
            if (this.menu.classList.contains(this.options.menuActiveClass)) {
              this.focusToMenu(e);
              this.focusInMenu(e);
            }
          }
        })

        window.addEventListener('resize', () => {
          if (getComputedStyle(this.burger).display != 'none') {
            setTimeout(() => {
              this.getFocusElems();
              if (this.menu.classList.contains(this.options.menuActiveClass)) {
                this.navitationOn();
              } else {
                this.navitationOff();
              }
            });
          } else {
            this.getFocusElems();
            this.navitationOn();
          }
        })
      }
    })
  }

  getFocusElems() {
    this.menuFocusElems = Array.from(this.menu.querySelectorAll(this.focusElems));
  }

  navitationOff() {
    this.menuFocusElems.forEach(menuFocusEl => {
      menuFocusEl.tabIndex = -1;
      menuFocusEl.disabled = true;
    })
  }

  navitationOn() {
    this.menuFocusElems.forEach(menuFocusEl => {
      menuFocusEl.removeAttribute('tabIndex');
      menuFocusEl.removeAttribute('disabled');
    })
  }

  focusToMenu(e) {
    if (this.options.autoFocusToMenu || this.closeBtn) {
      if (!e.shiftKey && e.target == this.burger) {
        setTimeout(() => {
          this.menuFocusElems[0].focus();
          e.preventDefault();
        }, this.options.duration);
      }
    }

    if (this.closeBtn && this.options.autoFocusToCloseBtn) {
      if (!e.shiftKey && e.target == this.burger) {
        setTimeout(() => {
          this.closeBtn.focus();
          e.preventDefault();
        }, this.options.duration);
      }
    }

    if (!e.shiftKey && e.target == this.burger && e.code === 'Tab') {
      this.menuFocusElems[0].focus();
      e.preventDefault();
    }

    if (e.shiftKey && e.code === 'Tab' && e.target == this.burger) {
      this.menuFocusElems[this.menuFocusElems.length - 1].focus();
      e.preventDefault();
    }
  }

  focusInMenu(e) {
    const focusArray = Array.prototype.slice.call(this.menuFocusElems);
    const focusedIndex = focusArray.indexOf(document.activeElement);
    if (this.closeBtn) {
      if (!e.shiftKey && focusedIndex === focusArray.length - 1) {
        this.menuFocusElems[0].focus();
        e.preventDefault();
      }

      if (e.shiftKey && focusedIndex === 0) {
        this.menuFocusElems[this.menuFocusElems.length - 1].focus();
        e.preventDefault();
      }
    } else {
      if (!e.shiftKey && focusedIndex === focusArray.length - 1) {
        this.focusToBurger(e);
      }

      if (e.shiftKey && focusedIndex === 0) {
        this.focusToBurger(e);
      }
    }
  }

  focusToBurger(e) {
    setTimeout(() => {
      this.burger.focus();
    }, this.options.duration);
    e.preventDefault();
  }
}