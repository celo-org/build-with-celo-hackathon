using System.Text.Json.Serialization;

using Nomis.Coingecko.Interfaces.Models;

namespace Nomis.Celoscan.Responses
{
    /// <summary>
    /// Coingecko Celo USD price response.
    /// </summary>
    public class CoingeckoCeloUsdPriceResponse :
        ICoingeckoUsdPriceResponse
    {
        /// <inheritdoc cref="CoingeckoUsdPriceData"/>
        [JsonPropertyName("celo")]
        public CoingeckoUsdPriceData? Data { get; set; }
    }
}