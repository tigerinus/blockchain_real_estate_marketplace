var SolnSquareVerifier = artifacts.require("SolnSquareVerifier");

const PROOF = {
  "proof": {
    "a": [
      "0x02ef0b6b26029deb9daae23272bbe5809bb088268b0dcf1b507da14534a5d428",
      "0x2b88668d1e1571d57b3c80927f7deb684422bf1b2ef3d4db99012e02b26d5db9"
    ],
    "b": [
      [
        "0x1e307404ed8a2c9d9e63de6564c70f38b872766abe342bb52032bc0c863921e9",
        "0x2c9a82073be90b1531d37fd71ebc228ec0e8654205acbda41e0d019a9c4201e8"
      ],
      [
        "0x0b770ca9084280551d5c417b3ce8a7a9b54b39eadf68d76c799c62a5dfbd104f",
        "0x02019e689b90a7b16d27d837132012308535cbc629d4df96df30cbe333a9bd68"
      ]
    ],
    "c": [
      "0x133c0ce9669be05c3d4b6d4f3b21cb30d7fcba946cc9f37a22c19cd1444dcd94",
      "0x2b058bf415caad9288c7d999194b1d70c45163a76f16a317f711b5a1718fb65c"
    ]
  },
  "inputs": [
    "0x0000000000000000000000000000000000000000000000000000000000000001",
    "0x0000000000000000000000000000000000000000000000000000000000000001"
  ]
}

contract('SolnSquareVerifier', (accounts) => {

  describe('test', () => {

    before(async () => {
      this.contract = await SolnSquareVerifier.deployed();
    });

    // Test if a new solution can be added for contract - SolnSquareVerifier
    it('should add a new solution', async () => {
      let result = await this.contract.addSolution({ index: 0, addr: accounts[1] });
      assert.equal("SolutionAdded", result.logs[0].event);
    });

    // Test if an ERC721 token can be minted for contract - SolnSquareVerifier
    it('should mint a new ERC721 token', async () => {
      let result = await this.contract.mint(accounts[1], 1, PROOF.proof.a, PROOF.proof.b, PROOF.proof.c, PROOF.inputs);

      assert.equal("SolutionAdded", result.logs[0].event);
      assert.equal("Transfer", result.logs[1].event);
    });
  });
});