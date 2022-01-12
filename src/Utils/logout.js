import { url } from "./form-submit"

export function logout() {
  return fetch(url + "?action=logout", {
      credentials: "include"
  })
}