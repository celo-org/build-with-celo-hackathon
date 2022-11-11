import { expect } from 'chai';
import hre from 'hardhat';
import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';

describe('Colony', async () => {
  const MAX_PLANKTONS = 5;
  const MAX_ZOOXES = 5;
  const MOCK_PROJECT_ID = 'MOCK-ID';
  const MIN_CONTRIBUTION_AMOUNT = 5000;

  async function deployColonyFixture() {
    const Colony = await hre.ethers.getContractFactory('Colony');
    const colony = await Colony.deploy();
    await colony.initialize('AB Airline', MAX_PLANKTONS, MAX_ZOOXES);

    return { colony };
  }

  describe('planktons', () => {
    describe('#addPlankton', () => {
      it('should add plankton when colony not launched, max planktons not exceeded and caller is polyp', async () => {
        const { colony } = await loadFixture(deployColonyFixture);

        const [_, plankton] = await hre.ethers.getSigners();

        await expect(colony.addPlankton(plankton.address)).to.emit(
          colony,
          'ActionDone'
        );
      });

      it('should not add plankton when max planktons exceeded', async () => {
        const { colony } = await loadFixture(deployColonyFixture);

        const signers = await hre.ethers.getSigners();

        for (let i = 1; i <= MAX_PLANKTONS; i++) {
          await colony.addPlankton(signers[i].address);
        }

        await expect(
          colony.addPlankton(signers[MAX_PLANKTONS + 1].address)
        ).to.be.revertedWith("Colony: can't add any more planktons");
      });

      it('should not add plankton when caller is not polyp', async () => {
        const { colony } = await loadFixture(deployColonyFixture);

        const [_, plankton] = await hre.ethers.getSigners();

        await expect(
          colony.connect(plankton).addPlankton(plankton.address)
        ).to.be.revertedWith('Colony: Only the polyp can perform this action.');
      });

      it('should not add plankton when colony is launched', async () => {
        const { colony } = await loadFixture(deployColonyFixture);
        const [_, plankton] = await hre.ethers.getSigners();

        await colony.launch();

        await expect(colony.addPlankton(plankton.address)).to.be.revertedWith(
          'Modifiable: This system can no longer be modified.'
        );
      });
    });

    describe('#deactivatePlankton', () => {
      it('should deactivate plankton when colony not launched, plankton not deactivated and caller is polyp', async () => {
        const { colony } = await loadFixture(deployColonyFixture);

        const [_, plankton] = await hre.ethers.getSigners();

        await colony.addPlankton(plankton.address);

        await expect(colony.deactivatePlankton(plankton.address)).to.emit(
          colony,
          'ActionDone'
        );
      });

      it('should revert from deactivating when plankton is already deactivated', async () => {
        const { colony } = await loadFixture(deployColonyFixture);

        const [_, plankton] = await hre.ethers.getSigners();

        colony.deactivatePlankton(plankton.address);

        await expect(
          colony.deactivatePlankton(plankton.address)
        ).to.be.revertedWith(
          'Colony: deactivation failed since plankton is inactive.'
        );
      });

      it('should not deactivate plankton when caller is not polyp', async () => {
        const { colony } = await loadFixture(deployColonyFixture);

        const [_, plankton] = await hre.ethers.getSigners();

        await expect(
          colony.connect(plankton).deactivatePlankton(plankton.address)
        ).to.be.revertedWith('Colony: Only the polyp can perform this action.');
      });

      it('should not deactivate plankton when colony is launched', async () => {
        const { colony } = await loadFixture(deployColonyFixture);
        const [_, plankton] = await hre.ethers.getSigners();

        await colony.launch();

        await expect(
          colony.deactivatePlankton(plankton.address)
        ).to.be.revertedWith(
          'Modifiable: This system can no longer be modified.'
        );
      });
    });
  });

  describe('zooxes', () => {
    describe('#addZoox', () => {
      it('should add zoox when colony not launched, max zooxes not exceeded and caller is polyp', async () => {
        const { colony } = await loadFixture(deployColonyFixture);

        const [_, zoox] = await hre.ethers.getSigners();

        await expect(colony.addZoox(zoox.address)).to.emit(
          colony,
          'ActionDone'
        );
      });

      it('should not add zoox when max zooxes exceeded', async () => {
        const { colony } = await loadFixture(deployColonyFixture);

        const signers = await hre.ethers.getSigners();

        for (let i = 1; i <= MAX_PLANKTONS; i++) {
          await colony.addZoox(signers[i].address);
        }

        await expect(
          colony.addZoox(signers[MAX_PLANKTONS + 1].address)
        ).to.be.revertedWith("Colony: can't add any more zooxes");
      });

      it('should not add zoox when caller is not polyp', async () => {
        const { colony } = await loadFixture(deployColonyFixture);

        const [_, zoox] = await hre.ethers.getSigners();

        await expect(
          colony.connect(zoox).addZoox(zoox.address)
        ).to.be.revertedWith('Colony: Only the polyp can perform this action.');
      });

      it('should not add zoox when colony is launched', async () => {
        const { colony } = await loadFixture(deployColonyFixture);
        const [_, zoox] = await hre.ethers.getSigners();

        await colony.launch();

        await expect(colony.addZoox(zoox.address)).to.be.revertedWith(
          'Modifiable: This system can no longer be modified.'
        );
      });
    });

    describe('#deactivateZoox', () => {
      it('should deactivate zoox when colony not launched, zoox not deactivated and caller is polyp', async () => {
        const { colony } = await loadFixture(deployColonyFixture);

        const [_, zoox] = await hre.ethers.getSigners();

        await colony.addZoox(zoox.address);

        await expect(colony.deactivateZoox(zoox.address)).to.emit(
          colony,
          'ActionDone'
        );
      });

      it('should revert from deactivating when zoox is already deactivated', async () => {
        const { colony } = await loadFixture(deployColonyFixture);

        const [_, zoox] = await hre.ethers.getSigners();

        colony.deactivateZoox(zoox.address);

        await expect(colony.deactivateZoox(zoox.address)).to.be.revertedWith(
          'Colony: deactivation failed since zoox is inactive.'
        );
      });

      it('should not deactivate zoox when caller is not polyp', async () => {
        const { colony } = await loadFixture(deployColonyFixture);

        const [_, zoox] = await hre.ethers.getSigners();

        await expect(
          colony.connect(zoox).deactivateZoox(zoox.address)
        ).to.be.revertedWith('Colony: Only the polyp can perform this action.');
      });

      it('should not deactivate zoox when colony is launched', async () => {
        const { colony } = await loadFixture(deployColonyFixture);
        const [_, zoox] = await hre.ethers.getSigners();

        await colony.launch();

        await expect(colony.deactivateZoox(zoox.address)).to.be.revertedWith(
          'Modifiable: This system can no longer be modified.'
        );
      });
    });
  });

  describe('#launch', () => {
    it('should launch colony when called by polyp', async function () {
      const { colony } = await loadFixture(deployColonyFixture);

      await expect(colony.launch()).to.emit(colony, 'ActionDone');
    });

    it('should not launch colony when not called by polyp', async function () {
      const { colony } = await loadFixture(deployColonyFixture);

      const [_, random] = await hre.ethers.getSigners();

      await expect(
        colony.connect(random).launch({
          from: random.address,
        })
      ).to.be.revertedWith('Colony: Only the polyp can perform this action.');
    });
  });

  describe('#setProjectMinContributionAmount', () => {
    it('should set successfully when called by polyp and colony not launched', async function () {
      const { colony } = await loadFixture(deployColonyFixture);

      await expect(
        colony.setProjectMinContributionAmount(
          MIN_CONTRIBUTION_AMOUNT,
          MOCK_PROJECT_ID
        )
      ).to.emit(colony, 'ActionDone');

      expect(await colony.minContributionPerProject(MOCK_PROJECT_ID)).to.equal(
        MIN_CONTRIBUTION_AMOUNT
      );
    });

    it('should fail to set when not called by polyp', async function () {
      const { colony } = await loadFixture(deployColonyFixture);

      const [_, random] = await hre.ethers.getSigners();

      await expect(
        colony
          .connect(random)
          .setProjectMinContributionAmount(
            MIN_CONTRIBUTION_AMOUNT,
            MOCK_PROJECT_ID,
            {
              from: random.address,
            }
          )
      ).to.be.revertedWith('Colony: Only the polyp can perform this action.');
    });

    it('should fail to set when colony is already launched', async function () {
      const { colony } = await loadFixture(deployColonyFixture);

      await colony.launch();

      await expect(
        colony.setProjectMinContributionAmount(
          MIN_CONTRIBUTION_AMOUNT,
          MOCK_PROJECT_ID
        )
      ).to.be.revertedWith(
        'Modifiable: This system can no longer be modified.'
      );
    });
  });

  describe('rewards', () => {
    const MOCK_REWARD_NAME_1 = 'cooking-stove';
    const MOCK_REWARD_LOCATION_1 = 'www.example.com';

    const MOCK_REWARD_NAME_2 = 'solar-panel';
    const MOCK_REWARD_LOCATION_2 = 'www.example-panel.com';

    describe('#addReward', () => {
      it('should add reward when colony is not launched and is called by polyp', async function () {
        const { colony } = await loadFixture(deployColonyFixture);

        await expect(
          colony.addReward(
            MOCK_PROJECT_ID,
            MOCK_REWARD_NAME_1,
            MOCK_REWARD_LOCATION_1
          )
        ).to.emit(colony, 'ActionDone');

        const rewards = await colony.rewards();
        const projectRewards = await colony.projectRewards(MOCK_PROJECT_ID);

        expect(rewards).to.have.lengthOf(1);
        expect(projectRewards).to.have.length.lengthOf(1);
      });

      it('should fail to add when not called by polyp', async function () {
        const { colony } = await loadFixture(deployColonyFixture);

        const [_, random] = await hre.ethers.getSigners();

        await expect(
          colony
            .connect(random)
            .addReward(
              MOCK_PROJECT_ID,
              MOCK_REWARD_NAME_1,
              MOCK_REWARD_LOCATION_1,
              {
                from: random.address,
              }
            )
        ).to.be.revertedWith('Colony: Only the polyp can perform this action.');
      });

      it('should fail to add when colony is already launched', async function () {
        const { colony } = await loadFixture(deployColonyFixture);

        await colony.launch();

        await expect(
          colony.addReward(
            MOCK_PROJECT_ID,
            MOCK_REWARD_NAME_1,
            MOCK_REWARD_LOCATION_1
          )
        ).to.be.revertedWith(
          'Modifiable: This system can no longer be modified.'
        );
      });
    });

    describe('#deactivateReward', () => {
      it('should deactivate reward when colony is not launched and is called by polyp', async function () {
        const { colony } = await loadFixture(deployColonyFixture);

        await colony.addReward(
          MOCK_PROJECT_ID,
          MOCK_REWARD_NAME_1,
          MOCK_REWARD_LOCATION_1
        );

        await colony.addReward(
          MOCK_PROJECT_ID,
          MOCK_REWARD_NAME_2,
          MOCK_REWARD_LOCATION_2
        );

        expect((await colony.totalInactiveRewards()).toNumber()).to.eq(0);

        await expect(colony.deactivateReward(0)).to.emit(colony, 'ActionDone');

        expect((await colony.totalInactiveRewards()).toNumber()).to.eq(1);

        expect(await colony.rewardIsActive(0)).to.be.false;
      });

      it('should fail to deactivate when not called by polyp', async function () {
        const { colony } = await loadFixture(deployColonyFixture);

        await colony.addReward(
          MOCK_PROJECT_ID,
          MOCK_REWARD_NAME_1,
          MOCK_REWARD_LOCATION_1
        );

        const [_, random] = await hre.ethers.getSigners();

        await expect(
          colony.connect(random).deactivateReward(0, {
            from: random.address,
          })
        ).to.be.revertedWith('Colony: Only the polyp can perform this action.');

        expect(await colony.rewards()).to.have.lengthOf(1);
      });

      it('should fail to deactivate when colony is already launched', async function () {
        const { colony } = await loadFixture(deployColonyFixture);

        await colony.addReward(
          MOCK_PROJECT_ID,
          MOCK_REWARD_NAME_1,
          MOCK_REWARD_LOCATION_1
        );

        await colony.launch();

        await expect(colony.deactivateReward(0)).to.be.revertedWith(
          'Modifiable: This system can no longer be modified.'
        );

        expect(await colony.rewards()).to.have.lengthOf(1);
      });
    });

    describe('#contributeToOffset', () => {
      it('should contribute when not in emergency and within max instalments limit', async () => {
        const { colony } = await loadFixture(deployColonyFixture);

        await colony.setProjectMinContributionAmount(
          MIN_CONTRIBUTION_AMOUNT,
          MOCK_PROJECT_ID
        );

        await expect(
          colony.contributeToOffset(MOCK_PROJECT_ID, { value: 2000 })
        ).to.emit(colony, 'ActionDone');
      });

      it('should not contribute when above max instalments limit', async () => {
        const { colony } = await loadFixture(deployColonyFixture);

        await colony.setProjectMinContributionAmount(
          MIN_CONTRIBUTION_AMOUNT,
          MOCK_PROJECT_ID
        );
        await colony.contributeToOffset(MOCK_PROJECT_ID, { value: 2000 });
        await colony.contributeToOffset(MOCK_PROJECT_ID, { value: 2000 });
        await colony.contributeToOffset(MOCK_PROJECT_ID, { value: 2000 });
        await colony.contributeToOffset(MOCK_PROJECT_ID, { value: 2000 });

        await expect(
          colony.contributeToOffset(MOCK_PROJECT_ID, { value: 2000 })
        ).to.be.revertedWith(
          'Colony: Max contributions exceeded for this project.'
        );
      });

      it('should not contribute when in emergency', async () => {
        const { colony } = await loadFixture(deployColonyFixture);

        await colony.setProjectMinContributionAmount(
          MIN_CONTRIBUTION_AMOUNT,
          MOCK_PROJECT_ID
        );

        await colony.stop();

        await expect(
          colony.contributeToOffset(MOCK_PROJECT_ID, { value: 2000 })
        ).not.to.emit(colony, 'ActionDone');
      });
    });

    describe('#claimReward', () => {
      const executePrepareRewards = (
        contribution: number = MIN_CONTRIBUTION_AMOUNT
      ) => {
        return async function prepareRewards() {
          const { colony } = await deployColonyFixture();

          const [_, plankton] = await hre.ethers.getSigners();

          await colony.addPlankton(plankton.address);

          await colony.addReward(
            MOCK_PROJECT_ID,
            MOCK_REWARD_NAME_1,
            MOCK_REWARD_LOCATION_1
          );

          await colony.setProjectMinContributionAmount(
            MIN_CONTRIBUTION_AMOUNT,
            MOCK_PROJECT_ID
          );

          await colony.connect(plankton).contributeToOffset(MOCK_PROJECT_ID, {
            value: contribution,
            from: plankton.address,
          });

          return { colony, plankton };
        };
      };

      it('should claim reward when reward is valid, caller is plankton and contribution sufficient', async () => {
        const { colony, plankton } = await loadFixture(executePrepareRewards());

        await expect(
          colony
            .connect(plankton)
            .claimReward(0, MOCK_PROJECT_ID, { from: plankton.address })
        ).to.emit(colony, 'ActionDone');
      });

      it('should fail to claim reward when reward is invalid', async () => {
        const { colony, plankton } = await loadFixture(executePrepareRewards());

        await expect(
          colony
            .connect(plankton)
            .claimReward(1, MOCK_PROJECT_ID, { from: plankton.address })
        ).to.be.revertedWith(
          'Colony: This action can only be performed on an active reward.'
        );
      });

      it('should fail to claim reward when caller is not plankton', async () => {
        const { colony } = await loadFixture(executePrepareRewards());

        await expect(colony.claimReward(0, MOCK_PROJECT_ID)).to.be.revertedWith(
          'Colony: Only active planktons can perform this action.'
        );
      });

      it('should fail to claim reward when contribution is not sufficient', async () => {
        const { colony, plankton } = await loadFixture(
          executePrepareRewards(MIN_CONTRIBUTION_AMOUNT - 1000)
        );

        await expect(
          colony.connect(plankton).claimReward(0, MOCK_PROJECT_ID)
        ).to.be.revertedWith('Colony: insufficient contribution.');
      });
    });
  });
});
