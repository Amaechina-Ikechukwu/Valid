export async function GetMediaComments(
  media_id: string | any,
  token: string | null
) {
  try {
    const apiUrl = process.env.EXPO_PUBLIC_VALIDSERVER; // Get the API URL from environment

    if (!apiUrl) {
      throw new Error("API URL not defined");
    }

    const response = await fetch(
      `${apiUrl}/instagram/mediacomments?media_id=${media_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const responseData = await response.json(); // Parse the response body
    if (!response.ok) {
      throw new Error(
        `Failed to update user Facebook Profile: ${responseData}`
      );
    }

    return responseData;
  } catch (error) {
    throw error;
  }
}
