export const useGetIsAdmin = () => {
    return window.localStorage.getItem("isAdmin");
}