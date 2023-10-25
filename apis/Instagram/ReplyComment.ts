export async function ReplyComment(
  comment_id: string,
  message: string,
  token: string | null
) {
  try {
    const apiUrl = process.env.EXPO_PUBLIC_VALIDSERVER; // Get the API URL from environment

    if (!apiUrl) {
      throw new Error("API URL not defined");
    }

    const response = await fetch(`${apiUrl}/instagram/mediareplycomment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        comment_id,
        message,
      }),
    });
    const responseData = await response.json(); // Parse the response body
    if (!response.ok) {
      throw new Error(`Failed to reply to the comment: ${responseData}`);
    }

    return responseData;
  } catch (error) {
    throw error;
  }
}
