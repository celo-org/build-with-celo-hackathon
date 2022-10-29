namespace Nomis.Coingecko.Interfaces.Models
{
    /// <summary>
    /// Coingecko USD price response.
    /// </summary>
    public interface ICoingeckoUsdPriceResponse
    {
        /// <inheritdoc cref="CoingeckoUsdPriceData"/>
        public CoingeckoUsdPriceData? Data { get; set; }
    }
}