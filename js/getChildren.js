(function () {
  function getChildren(parent, captions) {
    return captions.filter(function (caption) {
      return caption.get('parent_id') === parent.get('id');
    });
  }
  
  window.getChildren = getChildren;
})();
