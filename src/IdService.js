/**
 * Represenents an IdService
 * that collects and manipulates
 * with identifiers
 * @constructor
 */
function IdService() {
  this.selectedIds = [];

  this.createOptionId = function (id) {
    return 'option-' + id;
  };

  this.createTagId = function (id, dropdownId) {
    return 'tag-' + id;
  };

  this.extractIdFromOption = function (optionId) {
    return optionId.substring(7);
  };

  this.extractIdFromTag = function (tagId) {
    return tagId.substring(4);
  };
}
