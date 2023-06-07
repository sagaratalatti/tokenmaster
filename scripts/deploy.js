const hre = require("hardhat")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

async function main() {
  // Setup accounts & variables
  const [deployer] = await ethers.getSigners()
  const NAME = "TokenMaster"
  const SYMBOL = "TM"

  // Deploy contract
  const TokenMaster = await hre.ethers.getContractFactory("TokenMaster")
  const tokenMaster = await TokenMaster.deploy(NAME, SYMBOL)
  await tokenMaster.deployed()

  console.log(`Deployed TokenMaster Contract at: ${tokenMaster.address}\n`)

  // List 6 events
  const occasions = [
    {
      name: "Tomorrow Land",
      cost: tokens(3),
      tickets: 3,
      date: "Dec 31",
      time: "6:00PM EST",
      location: "PRC de Schorre Schommelei - Boom, Belgium"
    },
    {
      name: "BACARDÍ NH7 WEEKENDER",
      cost: tokens(1),
      tickets: 125,
      date: "Nov 2",
      time: "1:00PM IST",
      location: "Mahalaxmi Lawns - Pune, Maharashtra"
    },
    {
      name: "Sunburn Festival Goa",
      cost: tokens(0.25),
      tickets: 200,
      date: "Oct 9",
      time: "10:00AM IST",
      location: "Hill View Eco Hotel - Vagator, Goa"
    },
    {
      name: "Dallas Mavericks vs. San Antonio Spurs",
      cost: tokens(5),
      tickets: 0,
      date: "Jun 11",
      time: "2:30PM CST",
      location: "American Airlines Center - Dallas, TX"
    },
    {
      name: "ETH Global Toronto",
      cost: tokens(1.5),
      tickets: 125,
      date: "Jun 23",
      time: "11:00AM EST",
      location: "Toronto, Canada"
    }
  ]

  for (var i = 0; i < 5; i++) {
    const transaction = await tokenMaster.connect(deployer).list(
      occasions[i].name,
      occasions[i].cost,
      occasions[i].tickets,
      occasions[i].date,
      occasions[i].time,
      occasions[i].location,
    )

    await transaction.wait()

    console.log(`Listed Event ${i + 1}: ${occasions[i].name}`)
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});