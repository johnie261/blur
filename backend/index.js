const express = require("express");
const Moralis = require("moralis").default;
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const MORALIS_API_KEY = process.env.MORALIS_API_KEY;

Moralis.start({
  apiKey: MORALIS_API_KEY,
  }).then(() => {
    app.listen(port, () => {
      console.log(`Listening for API calls`)
    })
})

app.get(("/getnftData", async (req, res) => {
  try {
    const { query } = req;

    if(typeof query.contractAddress === "string") {
      const response = await Moralis.EvmApi.nft.getNFTTrades({
        address: query.contractAddress,
        chain: "0x1"
      });

      return res.status(200).json(response)
    } else {
      const nftData = []

      for(let i = 0; i < query.contractAddress.length; i++) {
        const response = await Moralis.EvmApi.nft.getNFTTrades({
          address: query.contractAddress[i],
          chain: "0x1"
        });

        nftData.push(response)
      }

      const response = { nftData }
      return res.status(200).json(response)
    }
  } catch (error) {
    console.log(`Something went wrong ${error}`);
    return res.status(400).json()
  }
}))

app.get('/getcontractnft', async(req, res) => {
  try {
    const { query } = req;

    const chain = query.chain == "11155111" ? "11155111" : "0x1";

    const response = Moralis.EvmApi.nft.getContractNFTs({
      chain,
      format: "decimal",
      address: query.contractAddress
    })
    
    return res.status(200).json(response)
  } catch (error) {
    console.log(`Something went wrong ${error}`);
    return res.status(400).json()
  }
})

app.get('/getnfts', async(req, res) => {
  try {
    const { query } = req;

    const response = await Moralis.EvmApi.nft.getWalletNFTs({
      address: query.address,
      chain: query.chain
    })

    return res.status(200).json(response)
  } catch (error) {
    console.log(`Something went wrong ${error}`);
    return res.status(400).json()
  }
})