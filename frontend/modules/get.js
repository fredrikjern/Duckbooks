let getBooks = async () => {
  try {
    let response = await axios.get(
      "http://localhost:1337/api/books?populate=*"
    );
    renderBooks(await response.data.data);
  } catch (error) {
    console.log(error);
  }
};
