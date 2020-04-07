import { pathOr } from 'ramda';

const getAddWidgetState = state => pathOr(false, ['widgets', 'openAddWidget'], state);

const getEditWidgetState = state => pathOr(false, ['widgets', 'openEditWidget'], state);

const getTruncateWidgetState = state => pathOr(false, ['widgets', 'openTruncateWidget'], state);

const selectors = {
  getAddWidgetState,
  getEditWidgetState,
  getTruncateWidgetState,
};

export default selectors;
