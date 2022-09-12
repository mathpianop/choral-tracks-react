import { apiUrl } from "../apiUrl";
import makeRequest from "./makeRequest";

async function destroySong(songId, authToken) {
    return await makeRequest(`${apiUrl}/songs/${songId}`, "json", {
      method: "delete",
      headers: { Authorization: `Bearer ${authToken}` },
      timeout: 3000
    });
}

export default destroySong;