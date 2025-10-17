const DEFAULT_NAME = "Rakesh T";

export function getCurrentChecker(){
  const name = localStorage.getItem("checkerName") || DEFAULT_NAME;
  const initials = name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase();
  return { name, initials };
}


