using Nomis.Celoscan.Interfaces;
using Nomis.Celoscan.Interfaces.Models;
using Nomis.Utils.Contracts.Services;
using Nomis.Utils.Wrapper;

namespace Nomis.Celoscan
{
    /// <inheritdoc cref="ICeloscanService"/>
    internal sealed class CeloscanService :
        ICeloscanService,
        ITransientService
    {
        /// <summary>
        /// Initialize <see cref="CeloscanService"/>.
        /// </summary>
        /// <param name="client"><see cref="ICeloscanClient"/>.</param>
        public CeloscanService(
            ICeloscanClient client)
        {
            Client = client;
        }

        /// <inheritdoc/>
        public ICeloscanClient Client { get; }

        /// <inheritdoc/>
        public async Task<Result<CeloWalletScore>> GetWalletStatsAsync(string address)
        {
            // TODO - implement

            return new();
        }
    }
}