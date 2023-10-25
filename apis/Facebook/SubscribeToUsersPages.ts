export async function SubscribeUserPages(pages: any, user: string | null) {
  try {
    if (!user) {
      throw new Error("User is not defined");
    }

    const apiUrl = process.env.EXPO_PUBLIC_VALIDSERVER; // Get the API URL from environment

    if (!apiUrl) {
      throw new Error("API URL not defined");
    }

    const response = await fetch(`${apiUrl}/subscribe`, {
      method: "POST",
      headers: {
        // Set any headers required for your API request
        // For example, you might need to set an Authorization header.
        // 'Authorization': 'Bearer YourAccessToken',
        "Content-Type": "application/json", // Add other headers as needed
      },
      // Convert the body to JSON
      body: JSON.stringify({
        pages: pages,
        uuid: user,
      }),
    });

    const responseData = await response.json(); // Parse the response body

    if (!response.ok) {
      throw new Error(
        `Failed to update user ListOfFBPages: ${responseData.error}`
      );
    }

    return responseData;
  } catch (error) {
    // Log the error for debugging purposes
    console.error("SubscribeUserPages Error:", error);
    throw error;
  }
}
