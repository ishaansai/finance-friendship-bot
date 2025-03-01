
import { NavigateFunction } from "react-router-dom";

/**
 * Navigation utility to provide consistent navigation throughout the app
 */
export const navigateTo = {
  home: (navigate: NavigateFunction) => navigate("/"),
  dashboard: (navigate: NavigateFunction, tab?: string) => {
    if (tab) {
      navigate("/dashboard", { state: { activeTab: tab } });
    } else {
      navigate("/dashboard");
    }
  }
};
