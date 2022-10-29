using Nomis.Coingecko.Interfaces.Models;
using Nomis.Utils.Contracts.Services;

namespace Nomis.Coingecko.Interfaces
{
    /// <summary>
    /// Coingecko service.
    /// </summary>
    public interface ICoingeckoService :
        IInfrastructureService
    {
        /// <summary>
        /// Client for interacting with Coingecko API.
        /// </summary>
        public HttpClient CoingeckoV3Client { get; }

        /// <summary>
        /// Get USD balance oh the token.
        /// </summary>
        /// <param name="balance">The token balance in native currency.</param>
        /// <param name="tokenId">The token id.</param>
        /// <returns>Returns USD balance oh the token.</returns>
        public Task<decimal> GetUsdBalanceAsync<TResponse>(decimal balance, string tokenId)
            where TResponse : ICoingeckoUsdPriceResponse;
    }
}