module.exports = async({getNamedAccounts, deployments}) => {
  const {deploy} = deployments;
  const {deployer} = await getNamedAccounts();
  await deploy('Legacies', {
    from: deployer,
    args: [],
    log: true,
  });
};
module.exports.tags = ['Legacies'];
