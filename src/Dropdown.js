/**
 * Represents a Dropdown
 * @constructor
 * @param {IdService} idService
 * @param {Node} renderTo Node to render the Dropdown
 * @param {Object[]} items Array of Users that render in the Dropdown
 * @param {string} mode Mode. Can be `single` || `multiple`
 * @param {boolean} showAvatars Flag that represents
 * whether show avatars in the Dropdown or not
 * @param {boolean} block Flag that represents
 * whether Dropdown renders fully-width or not
 * @param {boolean} searchByDomain Flag that represents
 * whether search by domain or not via HTTP request
 */
function Dropdown(
  idService,
  renderTo,
  items,
  mode,
  showAvatars,
  block,
  searchByDomain
) {
  this.idService = idService;
  this.renderTo = renderTo;
  this.items = items;
  this.mode = mode || 'single';
  this.showAvatars = showAvatars;
  this.block = block;
  this.searchByDomain = searchByDomain;

  this.container = undefined;
  this.inputContainer = undefined;
  this.tagsContainer = undefined;
  this.input = undefined;
  this.dropdownList = undefined;
  this.messageEl = undefined;

  this.init();
}

Dropdown.prototype.init = function () {
  var container = document.createElement('div');
  container.classList.add('dropdown', this.block && 'block');
  registerEventListener(
    container,
    'click',
    this.containerClickHandler.bind(this),
    this
  );
  this.container = container;

  var inputContainer = document.createElement('div');
  inputContainer.classList.add('input-container');
  this.inputContainer = inputContainer;

  var tagsContainer = document.createElement('div');
  tagsContainer.classList.add('tags-container');
  this.tagsContainer = tagsContainer;

  var input = document.createElement('input');
  input.classList.add('input');
  var debouncedInputHandler = debounce(this.inputHandler, 500).bind(this);
  input.oninput = debouncedInputHandler;
  this.input = input;

  var dropdownList = document.createElement('ul');
  dropdownList.classList.add('dropdown-list', 'hidden');
  this.dropdownList = dropdownList;

  this.createDropdownListItems(this.items);

  var p = document.createElement('p');
  p.classList.add('message', 'hidden');
  this.messageEl = p;

  this.inputContainer.appendChild(this.tagsContainer);
  this.inputContainer.appendChild(this.input);
  this.container.appendChild(this.inputContainer);
  this.container.appendChild(this.dropdownList);
  this.container.appendChild(this.messageEl);
  this.renderTo.appendChild(this.container);

  registerEventListener(
    document,
    'click',
    this.outOfContainerClickHandler.bind(this),
    this
  );
};

Dropdown.prototype.createDropdownListItems = function (items, clear) {
  if (clear) {
    this.dropdownList.innerHTML = null;
  }

  for (var i = 0; i < items.length; i++) {
    var dropdownListItem = document.createElement('li');
    dropdownListItem.classList.add('dropdown-list-item');
    dropdownListItem.id = this.idService.createOptionId(items[i].id);
    if (!this.showAvatars) {
      dropdownListItem.classList.add('dropdown-list-item--without-avatar');
    } else {
      var avatar = document.createElement('img');
      avatar.classList.add('dropdown-list-item__avatar');
      avatar.src = IMG_PATH + '/avatars/' + items[i].avatar;
    }

    var name = document.createElement('span');
    name.innerText = items[i].name;
    name.classList.add('dropdown-list-item__name');

    var checkMark = document.createElement('img');
    checkMark.classList.add('dropdown-list-item__check-mark');
    checkMark.src = IMG_PATH + '/check-mark.png';

    if (this.showAvatars) {
      dropdownListItem.appendChild(avatar);
    }
    dropdownListItem.appendChild(name);
    dropdownListItem.appendChild(checkMark);

    registerEventListener(
      dropdownListItem,
      'click',
      this.dropdownClickHandler.bind(this),
      this
    );

    if (this.idService.selectedIds.includes(items[i].id.toString())) {
      dropdownListItem.classList.add('dropdown-list-item--selected');
      this.checkMark(
        dropdownListItem.querySelector('.dropdown-list-item__check-mark')
      );
    }

    this.dropdownList.appendChild(dropdownListItem);
  }
};

Dropdown.prototype.showDropdownList = function () {
  this.dropdownList.classList.remove('hidden');
};

Dropdown.prototype.hideDropdownList = function () {
  this.dropdownList.classList.add('hidden');
};

Dropdown.prototype.isDropdownListVisible = function () {
  return !this.dropdownList.classList.contains('hidden');
};

Dropdown.prototype.selectDropdownListItem = function (dropdownListItem) {
  var dropdownListItemId = this.idService.extractIdFromOption(
    dropdownListItem.id
  );

  if (this.idService.selectedIds.includes(dropdownListItemId)) {
    this.unselectDropdownListItem(dropdownListItemId);
    return;
  }

  // If in single-mode already selected some item, unselect it
  if (this.mode === 'single' && this.idService.selectedIds.length) {
    var selectedId = this.idService.selectedIds[0];
    this.unselectDropdownListItem(selectedId);
  }

  dropdownListItem.classList.add('dropdown-list-item--selected');
  this.checkMark(
    dropdownListItem.querySelector('.dropdown-list-item__check-mark')
  );
  this.idService.selectedIds.push(dropdownListItemId);
  var name = dropdownListItem.querySelector(
    '.dropdown-list-item__name'
  ).innerText;

  this.createTag(name, dropdownListItemId);
};

Dropdown.prototype.unselectDropdownListItem = function (dropdownListItemId) {
  var dropdownListItem = this.dropdownList.querySelector(
    '#option-' + dropdownListItemId
  );
  if (dropdownListItem) {
    dropdownListItem.classList.remove('dropdown-list-item--selected');
    dropdownListItem.querySelector('.dropdown-list-item__check-mark').src =
      IMG_PATH + '/check-mark.png';
  }
  this.idService.selectedIds = this.idService.selectedIds.filter(
    (id) => id !== dropdownListItemId
  );
  this.removeTag(dropdownListItemId);
};

Dropdown.prototype.createTag = function (text, id) {
  var tag = document.createElement('div');
  tag.classList.add('tag');
  tag.id = this.idService.createTagId(id);

  var name = document.createElement('span');
  name.classList.add('tag__name');
  name.innerText = text;

  var removeIcon = document.createElement('img');
  removeIcon.classList.add('tag__remove-icon');
  removeIcon.src = IMG_PATH + '/close.png';
  registerEventListener(
    removeIcon,
    'click',
    this.tagRemoveIconClickHandler.bind(this),
    this
  );

  tag.appendChild(name);
  tag.appendChild(removeIcon);

  this.tagsContainer.appendChild(tag);
};

Dropdown.prototype.removeTag = function (id) {
  var tag = this.tagsContainer.querySelector('#tag-' + id);
  if (tag) {
    var removeIcon = tag.querySelector('.tag__remove-icon');
    unregisterEventListener(
      removeIcon,
      'click',
      this.tagRemoveIconClickHandler.bind(this)
    );
    tag.parentNode.removeChild(tag);
  }
};

Dropdown.prototype.checkMark = function (mark) {
  mark.src = IMG_PATH + '/check-mark--checked.png';
};

Dropdown.prototype.isDropdownListItem = function (element) {
  return element.classList.contains('dropdown-list-item');
};

Dropdown.prototype.isTagRemoveIcon = function (element) {
  return element.classList.contains('tag__remove-icon');
};

Dropdown.prototype.search = function (value) {
  if (this.isMessageVisible()) {
    this.hideMessage();
  }

  var searchTerm = value.trim();

  var variants = [searchTerm, transliterate(searchTerm)];

  if (isCyrillic(searchTerm)) {
    variants.push(mapToLatinKeyboard(searchTerm));
  }

  if (isLatin(searchTerm)) {
    variants.push(mapToCyrillicKeyboard(searchTerm));
  }

  if (this.searchByDomain) {
    this.showMessage('Выполняю поиск 👩‍💻...');
    getUsers(
      function (response) {
        this.hideMessage();
        var users = JSON.parse(response).body;

        var filteredItems = users.filter((item) => {
          var name = item.name.toLowerCase();
          var translitName = transliterate(name);
          var domain = item.domain;
          var translitDomain = transliterate(domain);

          return [name, translitName, domain, translitDomain].some((name) =>
            variants.some((variant) => name.includes(variant))
          );
        });

        this.processSearchResult(filteredItems);
      }.bind(this)
    );
  } else {
    var filteredItems = this.items.filter((item) => {
      var name = item.name.toLowerCase();
      var translitName = transliterate(name);

      return [name, translitName].some((name) =>
        variants.some((variant) => name.includes(variant))
      );
    });

    this.processSearchResult(filteredItems);
  }
};

Dropdown.prototype.processSearchResult = function (result) {
  if (result.length) {
    if (!this.isDropdownListVisible()) {
      this.showDropdownList();
    }
    this.hideMessage();
    this.createDropdownListItems(result, true);
  } else {
    this.hideDropdownList();
    this.showMessage('Ничего не найдено 😢.');
  }
};

Dropdown.prototype.containerClickHandler = function (event) {
  var target = getEventTarget(event);

  if (
    !this.isTagRemoveIcon(target) &&
    !this.isDropdownListVisible() &&
    !this.isMessageVisible()
  ) {
    this.showDropdownList();
  }
};

Dropdown.prototype.outOfContainerClickHandler = function (event) {
  var target = getEventTarget(event);

  if (
    target !== this.container &&
    !this.container.contains(target) &&
    !this.isTagRemoveIcon(target) &&
    this.isDropdownListVisible()
  ) {
    this.hideDropdownList();
  }
};

Dropdown.prototype.dropdownClickHandler = function (event) {
  var target = getEventTarget(event);

  var dropdownListItem = target;
  if (!this.isDropdownListItem(dropdownListItem)) {
    dropdownListItem = target.parentNode;
  }
  this.selectDropdownListItem(dropdownListItem);
};

Dropdown.prototype.tagRemoveIconClickHandler = function (event) {
  var target = getEventTarget(event);

  var removeIcon = target;
  var tag = removeIcon.parentNode;
  var id = this.idService.extractIdFromTag(tag.id);
  this.unselectDropdownListItem(id);
};

Dropdown.prototype.inputHandler = function (event) {
  var target = getEventTarget(event);

  this.search(target.value);
};

Dropdown.prototype.showMessage = function (message) {
  this.messageEl.classList.remove('hidden');
  this.messageEl.innerText = message;
};

Dropdown.prototype.hideMessage = function () {
  this.messageEl.classList.add('hidden');
};

Dropdown.prototype.isMessageVisible = function () {
  return !this.messageEl.classList.contains('hidden');
};
