const fetch = require("node-fetch");

exports.getCases = async (req, res) => {
  const state = req.body.queryResult.outputContexts[1].parameters["geo-state"];

  let allStates = await fetch("https://corona.lmao.ninja/states");
  allStates = await allStates.json();
  console.log(allStates);

  let selectedData = -1;

  allStates.forEach(data => {
    if (data["state"] == state) {
      selectedData = data;
    }
  });

  res.send(
    JSON.stringify({
      fulfillmentText:
        "There are currently " +
        selectedData["cases"] +
        " cases of COVID-19 in " +
        state +
        ". \n There were " +
        selectedData["todayCases"] +
        " new cases today."
    })
  );
};
