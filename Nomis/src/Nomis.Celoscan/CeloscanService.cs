using System.Net;

using Nethereum.Util;
using Nomis.Celoscan.Calculators;
using Nomis.Celoscan.Interfaces;
using Nomis.Celoscan.Interfaces.Extensions;
using Nomis.Celoscan.Interfaces.Models;
using Nomis.Celoscan.Responses;
using Nomis.Coingecko.Interfaces;
using Nomis.Utils.Contracts.Services;
using Nomis.Utils.Exceptions;
using Nomis.Utils.Wrapper;

namespace Nomis.Celoscan
{
    /// <inheritdoc cref="ICeloscanService"/>
    internal sealed class CeloscanService :
        ICeloscanService,
        ITransientService
    {
        private readonly ICoingeckoService _coingeckoService;

        /// <summary>
        /// Initialize <see cref="CeloscanService"/>.
        /// </summary>
        /// <param name="client"><see cref="ICeloscanClient"/>.</param>
        /// <param name="coingeckoService"><see cref="ICoingeckoService"/>.</param>
        public CeloscanService(
            ICeloscanClient client,
            ICoingeckoService coingeckoService)
        {
            _coingeckoService = coingeckoService;
            Client = client;
        }

        /// <inheritdoc/>
        public ICeloscanClient Client { get; }

        /// <inheritdoc/>
        public async Task<Result<CeloWalletScore>> GetWalletStatsAsync(string address)
        {
            if (!new AddressUtil().IsValidAddressLength(address) || !new AddressUtil().IsValidEthereumAddressHexFormat(address))
            {
                throw new CustomException("Invalid address", statusCode: HttpStatusCode.BadRequest);
            }

            var balanceWei = (await Client.GetBalanceAsync(address)).Balance;
            var usdBalance = await _coingeckoService.GetUsdBalanceAsync<CoingeckoCeloUsdPriceResponse>(balanceWei?.ToCelo() ?? 0, "celo");
            var transactions = (await Client.GetTransactionsAsync<CeloscanAccountNormalTransactions, CeloscanAccountNormalTransaction>(address)).ToList();
            var internalTransactions = (await Client.GetTransactionsAsync<CeloscanAccountInternalTransactions, CeloscanAccountInternalTransaction>(address)).ToList();
            var erc20Tokens = (await Client.GetTransactionsAsync<CeloscanAccountERC20TokenEvents, CeloscanAccountERC20TokenEvent>(address)).ToList();
            var tokens = (await Client.GetTransactionsAsync<CeloscanAccountERC721TokenEvents, CeloscanAccountERC721TokenEvent>(address)).ToList();

            var walletStats = new CeloStatCalculator(
                    address,
                    decimal.TryParse(balanceWei, out var wei) ? wei : 0,
                    usdBalance,
                    transactions,
                    internalTransactions,
                    tokens,
                    erc20Tokens)
                .GetStats();

            var score = walletStats.GetScore();
            return await Result<CeloWalletScore>.SuccessAsync(new()
            {
                Address = address,
                Stats = walletStats,
                Score = score
            }, "Got celo wallet score.");
        }
    }
}