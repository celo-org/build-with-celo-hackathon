module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments
  const { deployer } = await getNamedAccounts()

  await deploy('Spaces', {
    from: deployer,
    log: true,
  })
  await deploy('Loans', {
    from: deployer,
    log: true,
  })
}

module.exports.tags = ['Spaces', 'Rosca', 'utils', 'Loans', 'loanONRs', 'P2Ploan']
