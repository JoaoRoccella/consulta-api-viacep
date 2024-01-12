const request = new Request("https://viacep.com.br/ws/09810390/json/", {
  method: "GET",
});

fetch(request)
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error("Something went wrong on API server!");
    }
  })
  .then((response) => {
    console.log(response);
    // ...
  })
  .catch((error) => {
    console.error(error);
    // ...
  });