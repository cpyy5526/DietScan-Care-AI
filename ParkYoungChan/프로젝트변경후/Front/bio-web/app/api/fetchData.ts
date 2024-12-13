// app/api/fetchData.ts
export async function fetchData(device_id: string, value: string, day: number) {
  const baseUrl = 'https://rojy53nt54.execute-api.ap-northeast-2.amazonaws.com/Prod/';
  const oneDayAgo = day - 24 * 60 * 60 * 1000;
  // 최종 URL 생성
  const url = `${baseUrl}/devices/${device_id}/sensors/${value}?b_time=${oneDayAgo}&a_time=${day}&size=10000`;

  // Fetch 요청
  const response = await fetch(url);

  return await response.json();
}

// // 토큰 가져오기
// export async function fetchData() {
//   const url = 'https://auth.odn.us/auth/login';
//   const data = new URLSearchParams({
//     username: '01084837725',
//     password: '!Bigwave1234',
//   });

//   fetch(url, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//     body: data,
//   })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error('Failed to fetch data');
//       }
//       return response.json();
//     })
//     .then((data) => console.log(data))
//     .then((error) => console.log(error));
// }
