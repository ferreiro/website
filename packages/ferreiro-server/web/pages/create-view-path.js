export const createViewPath = (base, view) => {
    // TODO: Check if view has .pug, if not, add it for safetly
    return `pages/${base}/${view}`;
}