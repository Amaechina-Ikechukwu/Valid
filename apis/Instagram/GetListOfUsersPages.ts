export async function GetListOfUsersPages(token: string | null) {
  try {
    const apiUrl = process.env.EXPO_PUBLIC_VALIDSERVER; // Get the API URL from environment

    if (!apiUrl) {
      throw new Error("API URL not defined");
    }

    const response = await fetch(`${apiUrl}/instagram/pages`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const responseData = await response.json(); // Parse the response body
    if (!response.ok) {
      throw new Error(
        `Failed to update user Instagram Profile: ${responseData}`
      );
    }

    return responseData;
  } catch (error) {
    throw error;
  }
}
