export function setLocalState(data: any) {
  Object.keys(data).forEach((key) => {
    localStorage.setItem(key, JSON.stringify(data[key]));
  });
};