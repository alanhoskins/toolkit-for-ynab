import Feature from 'core/feature';
import * as toolkitHelper from 'helpers/toolkit';

export default class ShowMultipleMonths extends Feature {
  constructor() {
    super();
    this.showMultiMonthBudget.bind(this);
    this.buildMultiMonthBudgetPage.bind(this);
  }

  shouldInvoke() {
    // console.log('shouldInvoke', !$('.ynabtk-navlink-multi-budget').length);
    // return !$('.ynabtk-navlink-multi-budget').length;
  }

  invoke() {
    this.setupMultiMonthBudgetButton();
  }

  observe(changedNodes) {
    console.log('changedNodes', changedNodes);
    if (!this.shouldInvoke()) return;

    // if (changedNodes.has('layout user-logged-in')) {
    //   if ($('.nav-main').length) {
    //     this.invoke();
    //   }
    // }

    // if (
    //   changedNodes.has('navlink-budget active') || changedNodes.has('navlink-accounts active') ||
    //   changedNodes.has('navlink-reports active') || changedNodes.has('active navlink-reports') ||
    //   changedNodes.has('nav-account-row is-selected')
    // ) {
    //   $('.ynabtk-navlink-multi-budget').removeClass('active');
    //   $('.ynabtk-multi-budget').remove();

    //   // And restore the YNAB stuff we hid earlier
    //   $('.budget-header, .scroll-wrap').show();
    // }

    // if (changedNodes.has('sidebar-contents')) {
    //   this.setupMultiMonthBudgetButton();
    // }
  }

  setupMultiMonthBudgetButton() {
    $('.nav-main > li:eq(1)').after($('<li>').append($('<li>', { class: 'ember-view ynabtk-navlink-multi-budget' }).append($('<a>', { href: '#' }).append($('<span>', { class: 'ember-view flaticon stroke document-4' })).append('Multi-Month Budget'))));

    $('.ynabtk-navlink-multi-budget').on('click', this.showMultiMonthBudget());
  }

  showMultiMonthBudget() {
    if (toolkitHelper.getCurrentRouteName() !== 'budget.select') {
      $('.navlink-budget a').click();
    }

    // toolkitHelper.getAllBudgetMonthsViewModel().then(budgetMonthsViewModel => {
    //   this.buildMultiMonthBudgetPage($('div.scroll-wrap').closest('.ember-view'), budgetMonthsViewModel);
    // });
  }

  buildMultiMonthBudgetPage($pane, budgetMonthsViewModel) {
    if ($('.ynabtk-multi-budget').length) return;

    this.updateNavigation();

    console.log('budgetMonthsViewModel', budgetMonthsViewModel);

    // append the entire page to the .scroll-wrap pane in YNAB (called by showReports)
    $pane.append(
      $('<div class="ynabtk-multi-budget"></div>')
        // TODO  append navigation
        // append the filters and containers for report headers/report data
        .append(
        $('<div class="ynabtk-reports-filters"></div>')
          .append(
          `<h3>${((ynabToolKit.l10nData && ynabToolKit.l10nData['toolkit.filters']) || 'Filters')}</h3>`
          )
        )
    );
  }

  updateNavigation() {
    // remove the active class from all navigation items and add active to our guy
    $('.navlink-budget, .navlink-accounts').removeClass('active');
    $('.nav-account-row').removeClass('is-selected');
    $('.ynabtk-navlink-reports').removeClass('active');
    $('.ynabtk-navlink-multi-budget').addClass('active');

    $('.navlink-budget, .navlink-accounts, .nav-account-row').on('click', function () {
      // They're trying to navigate away.
      // Restore the highlight on whatever they're trying to click on.
      // For example, if they were on the Budget tab, then clicked on Reports, clicking on
      // Budget again wouldn't do anything as YNAB thinks they're already there. This switches
      // the correct classes back on and triggers our .observe below.
      if ($(this).hasClass('navlink-budget') || $(this).hasClass('navlink-accounts')) {
        $(this).addClass('active');
      } else if ($(this).hasClass('nav-account-row')) {
        $(this).addClass('is-selected');
      }
    });
  }

  onRouteChanged() {
    if (!this.shouldInvoke()) return;

    // this.invoke();
  }
}
