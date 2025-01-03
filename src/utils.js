// 点击后instant跳转锚点，传入id
export const scrollToAnchor = (id) => {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
}

// 将docs中的组件名称作为菜单项
export const getMenu = fileDocs => {
    const menuItems = [];
    for (let i = 0; i < fileDocs.length; i++) {
        const fileDoc = fileDocs[i];
        const docs = fileDoc.docs;
        for (let j = 0; j < docs.length; j++) {
            const doc = docs[j];
            const name = doc.name;
            menuItems.push({
                label: name,
                key: `${i}-${j}`,
                onClick: () => {
                    scrollToAnchor(getComponentId(doc));
                }
            });
        }
    }
    return menuItems;
}

export const getComponentId = doc => {
    return `${doc.name}-${encodeURI(doc.filePath)}`;
}