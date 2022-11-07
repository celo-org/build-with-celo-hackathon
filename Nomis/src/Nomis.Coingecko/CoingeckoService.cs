using System.Net.Http.Json;

using Microsoft.Extensions.Options;
using Nomis.Coingecko.Interfaces;
using Nomis.Coingecko.Interfaces.Models;
using Nomis.Coingecko.Interfaces.Settings;
using Nomis.Utils.Contracts.Services;

namespace Nomis.Coingecko
{
    /// <inheritdoc cref="ICoingeckoService"/>
    internal sealed class CoingeckoService :
        ICoingeckoService,
        ISingletonService
    {
        private readonly CoingeckoSettings _coingeckoSettings;
        public HttpClient CoingeckoV3Client { get; }

        public CoingeckoService(
            IOptions<CoingeckoSettings> coingeckoOptions)
        {
            _coingeckoSettings = coingeckoOptions.Value;
            CoingeckoV3Client = new()
            {
                BaseAddress = new(_coingeckoSettings.ApiBaseUrl ?? throw new ArgumentNullException(nameof(_coingeckoSettings.ApiBaseUrl)))
            };
        }

        /// <inheritdoc />
        public async Task<decimal> GetUsdBalanceAsync<TResponse>(decimal balance, string tokenId)
            where TResponse : ICoingeckoUsdPriceResponse
        {
            if (balance == default)
            {
                return 0;
            }

            var response = await CoingeckoV3Client.GetAsync($"/api/v3/simple/price?ids={tokenId}&vs_currencies=usd");
            if (!response.IsSuccessStatusCode)
            {
                return 0;
            }

            var data = await response.Content.ReadFromJsonAsync<TResponse>();
            return balance * (data?.Data?.Usd ?? 0);
        }
    }
}