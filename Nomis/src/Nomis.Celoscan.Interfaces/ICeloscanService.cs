using Nomis.Celoscan.Interfaces.Models;
using Nomis.Utils.Contracts.Services;
using Nomis.Utils.Wrapper;

namespace Nomis.Celoscan.Interfaces
{
    /// <summary>
    /// Celoscan service.
    /// </summary>
    public interface ICeloscanService :
        IInfrastructureService
    {
        /// <summary>
        /// Client for interacting with Celoscan API.
        /// </summary>
        public ICeloscanClient Client { get; }

        /// <summary>
        /// Get celo wallet stats by address.
        /// </summary>
        /// <param name="address">Celo wallet address.</param>
        /// <returns>Returns <see cref="CeloWalletScore"/> result.</returns>
        public Task<Result<CeloWalletScore>> GetWalletStatsAsync(string address);
    }
}