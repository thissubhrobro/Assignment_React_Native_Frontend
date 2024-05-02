/* eslint-disable prettier/prettier */
export const sortChildren = (children, option) => {
  if (option === 'title') {
    children.sort((a, b) => a.title.localeCompare(b.title));
    children.forEach(item => {
      if (item.children && item.children.length > 0) {
        sortChildren(item.children, option);
      }
    });
  }
  return children;
};

export const sortDataByDate = (children, option) => {
  if (option === 'created_on') {
    children.sort((a, b) => new Date(b.created_on) - new Date(a.created_on));
    children.forEach(item => {
      if (item.children && item.children.length > 0) {
        sortDataByDate(item.children, option);
      }
    });
  }
  console.log('children sort by data', children);
  return children;
};
