export default async function GetUserMediaObjects(
  userid: string,
  accessToken: string | null
): Promise<any> {
 
  try {
    const response = await fetch(`https://graph.facebook.com/v18.0/${userid}/media?access_token=${accessToken}`);


    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
