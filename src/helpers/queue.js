const initQueue = function (maxSize, compressSize) {
  const storage = [];
  this.maxSize = maxSize;
  this.getClone = () => {
    return JSON.parse(JSON.stringify(storage));
  };
  this.getLast = () => {
    const l = storage.length;
    if (l) {
      return storage[l - 1];
    }
    return null;
  };
  this.push = (elem) => {
    if (storage.length === this.maxSize) {
      compressSize();
    }
    storage.push(elem);
    return true;
  };
  this.getLength = () => storage.length;
};
