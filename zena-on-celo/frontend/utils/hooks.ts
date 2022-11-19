export type User = {
  name: string;
  avatar: string;
  stats: {
    quiz1: number;
    quiz2: number;
    quiz3: number;
    quiz4: number;
    quiz5: number;
    quiz6: number;
  };
};

export const useSession = () => {
  let localStorageItem;
  if (typeof window !== "undefined") {
    localStorageItem = window.localStorage.getItem("zena-session");
  }

  const session = (localStorageItem && JSON.parse(localStorageItem)) || null;

  return {
    user: session,
    isLoggedIn: !!session,
  };
};
