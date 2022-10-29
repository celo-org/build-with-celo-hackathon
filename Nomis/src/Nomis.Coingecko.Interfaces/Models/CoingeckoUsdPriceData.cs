using System.Text.Json.Serialization;

namespace Nomis.Coingecko.Interfaces.Models
{
    /// <summary>
    /// Coingecko Hedera USD price data.
    /// </summary>
    public class CoingeckoUsdPriceData
    {
        /// <summary>
        /// Price in USD.
        /// </summary>
        [JsonPropertyName("usd")]
        public decimal Usd { get; set; }
    }
}