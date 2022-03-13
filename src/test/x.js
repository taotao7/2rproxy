const axios = require("axios");

axios
	.get("http://tao:8080/test")
	.then((r) => console.log("res", r))
	.catch((e) => console.log("err", e));
