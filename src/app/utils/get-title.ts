export const getTitle = () => {
    return document.querySelector("#title") instanceof HTMLInputElement && document.querySelector<HTMLInputElement>("#title")!.value || '';
}