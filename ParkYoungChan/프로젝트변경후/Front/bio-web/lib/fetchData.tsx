// lib/fetchData.js
export async function fetchData() {
	const response = await fetch("https://rojy53nt54.execute-api.ap-northeast-2.amazonaws.com/Prod/devices/wando01/sensor/oxygen"); // Replace with your actual API endpoint
	if (!response.ok) {
	  throw new Error("Failed to fetch data");
	}
	return response.json();
  }
  