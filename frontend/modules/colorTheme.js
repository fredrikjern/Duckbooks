let setColorTheme = async () => {
  try {
    let response = await axios.get("http://localhost:1337/api/theme");
    if (!response.data.data.attributes.Lightmode) {
      document.querySelector("header").style.background = "green";
    }
  } catch (error) {
    console.log(error);
  }
};
