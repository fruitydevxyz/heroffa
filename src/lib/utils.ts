async function uuidToUsername(uuid: string): Promise<string> {
  const response = await fetch(`https://api.ashcon.app/mojang/v2/user/${uuid}`);

  if (!response.ok) throw new Error(`Ashcon API returned ${response.status}`);

  const data = await response.json();

  return data.username;
}

export { uuidToUsername };
