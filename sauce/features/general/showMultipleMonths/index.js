import Feature from 'core/feature';
import * as toolkitHelper from 'helpers/toolkit';

export default class ShowMultipleMonths extends Feature {
  constructor() {
    super();
  }

  shouldInvoke() {
    return true;
  }

  invoke() {
    this.setupMultiMonthBudgetButton();
  }

  observe(changedNodes) {
    console.log('changedNodes', changedNodes);
    if (!this.shouldInvoke()) return;

    if (changedNodes.has('layout user-logged-in')) {
      if ($('.nav-main').length) {
        this.invoke();
      }
    }

    if (
      changedNodes.has('navlink-budget active') || changedNodes.has('navlink-accounts active') ||
      changedNodes.has('navlink-reports active') || changedNodes.has('active navlink-reports') ||
      changedNodes.has('nav-account-row is-selected')
    ) {
      $('.ynabtk-navlink-multi-budget').removeClass('active');
      $('.ynabtk-multi-budget').remove();

      // And restore the YNAB stuff we hid earlier
      $('.budget-header, .scroll-wrap').show();
    }

    if (changedNodes.has('sidebar-contents')) {
      this.setupMultiMonthBudgetButton();
    }
  }

  setupMultiMonthBudgetButton() {
    const $this = this;
    $('.nav-main > li:eq(1)').after($('<li>').append($('<li>', { class: 'ember-view ynabtk-navlink-multi-budget' }).append($('<a>', { href: '#' }).append($('<span>', { class: 'ember-view flaticon stroke document-4' })).append('Multi-Month Budget'))));

    $('.ynabtk-navlink-multi-budget').on('click', $this.showMultiMonthBudget);
  }

  showMultiMonthBudget() {
    if (toolkitHelper.getCurrentRouteName() !== 'budget.select') {
      $('.navlink-budget a').click();
    }
    toolkitHelper.getAllBudgetMonthsViewModel().then(budgetMonthsViewModel => {
      console.log('budgetMonthsViewModel', budgetMonthsViewModel);
    });
  }

  onRouteChanged() {
    if (!this.shouldInvoke()) return;

    // this.invoke();
  }
}
