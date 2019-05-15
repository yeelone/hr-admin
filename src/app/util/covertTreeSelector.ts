export function toTreeSelectorData(data) {

    let attributes = {
        id: 'id',
        parentId: 'parent',
        name: 'name',
        rootId: 0
      };


    let resData = data.concat();
    let tree = [];
  
    for (let i = 0; i < resData.length; i++) {
      if (resData[i][attributes.parentId] === attributes.rootId) {
        let obj = {
          key: resData[i][attributes.id],
          title: resData[i][attributes.name],
          children: []
          };
        tree.push(obj);
        resData.splice(i, 1);
        i--;
      }
    }
    run(tree);
    function run(chiArr) {
      if (resData.length !== 0) {
        for (let i = 0; i < chiArr.length; i++) {
          for (let j = 0; j < resData.length; j++) {
            if (chiArr[i].key === resData[j][attributes.parentId]) {
              let obj = {
                key: resData[j][attributes.id],
                title: resData[j][attributes.name],
                isLeaf: true,
                children: []
              };
              chiArr[i].children.push(obj);
              resData.splice(j, 1);
              j--;
            }
          }
          run(chiArr[i].children);
        }
      }
    }
  
    return tree;
  
  }