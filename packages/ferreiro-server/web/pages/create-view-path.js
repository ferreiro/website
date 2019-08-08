export const createViewPath = (pageName, view) => {
    // TODO: Check if view has .pug, if not, add it for safetly
    return `pages/${pageName}/${view}`
}