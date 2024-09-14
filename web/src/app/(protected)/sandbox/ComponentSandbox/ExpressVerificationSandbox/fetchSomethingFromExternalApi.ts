export async function fetchSomethingFromExternalApi(serverIdToken: string) {
    return fetch("http://localhost:4000/api/example", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${serverIdToken}`,
      },
    });
}
  