export const setPlan = (plan) => localStorage.setItem("plan", plan || "BINARY");
export const getPlan = () => localStorage.getItem("plan");
