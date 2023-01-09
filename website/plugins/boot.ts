import { GlobalOptions, authentication } from "@modular-rest/client";

// Styles
import "~/assets/style/style.scss";
import "~/assets/style/fonts.css";
import "boxicons/css/boxicons.min.css";

export default async function() {
  /**
   * Setup mrest-web module
   */
  const baseUrl = process.env.BASE_URL || "";
  GlobalOptions.set({
    host: baseUrl
  });

  localStorage.removeItem("token");
  await authentication.loginAsAnonymous();
}
