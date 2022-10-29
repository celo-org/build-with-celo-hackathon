using Nomis.Utils.Contracts.Common;

namespace Nomis.Coingecko.Interfaces.Settings
{
    /// <summary>
    /// Coingecko settings.
    /// </summary>
    public class CoingeckoSettings :
        ISettings
    {
        /// <summary>
        /// API base URL.
        /// </summary>
        /// <remarks>
        /// <see href="https://www.coingecko.com/en/api/documentation"/>
        /// </remarks>
        public string? ApiBaseUrl { get; set; }
    }
}